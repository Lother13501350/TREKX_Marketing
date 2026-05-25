(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const stopsNode = document.querySelector("[data-stops]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    start: document.querySelector("[data-start]"),
    returnTime: document.querySelector("[data-return]"),
    safety: document.querySelector("[data-safety]")
  };

  let stops = [
    stop("南山夜景", "夜景", 86, 72, 28),
    stop("乙支路酒吧街", "散步", 74, 58, 42),
    stop("深夜湯飯", "宵夜", 80, 76, 18),
    stop("室內展演備案", "室內", 64, 82, 12)
  ];

  function stop(title, type, vibe, safety, move) {
    return { id: crypto.randomUUID(), title, type, vibe, safety, move };
  }

  function renderStops() {
    stopsNode.innerHTML = stops.map((item) => `
      <article class="nr-stop" data-stop-id="${escapeAttr(item.id)}">
        <label class="nr-stop-field">
          <span>夜晚點</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="夜晚點">
        </label>
        <label class="nr-stop-select">
          <span>類型</span>
          <select data-key="type" aria-label="類型">
            ${["晚餐", "夜景", "散步", "宵夜", "室內", "返程"].map((type) => `<option value="${type}"${type === item.type ? " selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        ${slider("vibe", "氣氛", item.vibe)}
        ${slider("safety", "安全", item.safety)}
        ${slider("move", "移動", item.move)}
        <button class="nr-remove" type="button" data-remove-stop aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    const suffix = key === "move" ? "分" : "";
    return `
      <label class="nr-stop-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${key === "move" ? "0" : "0"}" max="${key === "move" ? "80" : "100"}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function ranked(type) {
    return stops
      .filter((item) => type ? item.type === type : true)
      .map((item) => ({ ...item, score: scoreStop(item) }))
      .sort((a, b) => b.score - a.score);
  }

  function scoreStop(item) {
    const safetyWeight = Number(fields.safety.value) / 100;
    const movePenalty = Number(item.move) * (Number(fields.safety.value) > 70 ? 0.45 : 0.25);
    return Math.max(1, Math.min(99, Math.round(item.vibe * (1 - safetyWeight * 0.35) + item.safety * (safetyWeight * 0.55) - movePenalty)));
  }

  function routeScore() {
    const avg = Math.round(stops.reduce((sum, item) => sum + scoreStop(item), 0) / Math.max(1, stops.length));
    const latePenalty = fields.returnTime.value === "00:30" && Number(fields.safety.value) > 70 ? 8 : 0;
    return Math.max(1, Math.min(99, avg - latePenalty));
  }

  function profile(score) {
    if (score >= 78) return ["可以排完整夜線", "候選點安全與移動成本都可控，可以安排三段式夜遊。"];
    if (score >= 55) return ["要保守收尾", "夜晚氣氛不錯，但返程與移動需要先鎖定，不要臨時加點。"];
    return ["先縮短夜遊", "安全或移動壓力偏高，建議只保留一個主夜景和一個返程點。"];
  }

  function routeBlocks() {
    const dinner = ranked("晚餐")[0] || ranked("宵夜")[0] || ranked()[0];
    const main = ranked("夜景")[0] || ranked("散步")[0] || ranked()[1] || ranked()[0];
    const finish = ranked("宵夜")[0] || ranked("室內")[0] || ranked("返程")[0] || ranked()[2] || ranked()[0];
    return [
      { time: fields.start.value, title: "低壓集合", lead: "先吃或先散步，不一開始就衝最難移動的點。", item: dinner },
      { time: addMinutes(fields.start.value, 90), title: "主夜景段", lead: "把最想看的夜景或街區放在精神還夠的時候。", item: main },
      { time: fields.returnTime.value, title: "安全收尾", lead: "先決定回程，再決定要不要宵夜續攤。", item: finish }
    ];
  }

  function addMinutes(time, minutes) {
    const [hour, minute] = time.split(":").map(Number);
    const total = hour * 60 + minute + minutes;
    const nextHour = Math.floor(total / 60) % 24;
    const nextMinute = total % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function rules(score) {
    const safest = [...stops].sort((a, b) => b.safety - a.safety)[0];
    const list = [
      `最晚 ${fields.returnTime.value} 要開始回程，不把交通留到最後一刻。`,
      `${safest.title} 是安全係數最高的備案，臨時下雨或太累就切換。`,
      "每一段移動前先確認回程方式與集合點。"
    ];
    if (Number(fields.safety.value) > 75) list.push("安全保守度高，避免巷弄太深或需要多次轉乘的點。");
    if (score < 55) list.push("這晚只留一個主點，宵夜改成飯店附近。");
    return list;
  }

  function shareCopy(title, score, rulesList) {
    return `我用 ChillOut 夜貓城市路線排好了：${fields.city.value || "這座城市"} 晚上是「${title}」，夜遊安全分 ${score}/100。規則：${rulesList.slice(0, 2).join(" / ")}。先決定回程，再決定浪漫。`;
  }

  function promptFor(title, score, blocks, rulesList) {
    const stopText = stops.map((item) => `${item.title} ${item.type}，氣氛 ${item.vibe}，安全 ${item.safety}，移動 ${item.move} 分`).join("；");
    const blockText = blocks.map((block) => `${block.time} ${block.title}：${block.item?.title}`).join("；");
    return `請用 ChillOut 幫我規劃 ${fields.city.value || "城市"} 的夜遊路線。出門 ${fields.start.value}，最晚回程 ${fields.returnTime.value}，安全保守度 ${fields.safety.value}/100。候選點：${stopText}。建議路線：${blockText}。結果是「${title}」，夜遊安全分 ${score}/100。請依照這些規則安排交通、步行順序、宵夜、雨備室內點與安全返程：${rulesList.join("；")}。`;
  }

  function renderOutput() {
    if (!stops.length) {
      outputNode.innerHTML = `<div class="nr-empty">先加入夜晚候選點，這裡會生成三段夜遊、安全規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = routeScore();
    const [title, description] = profile(score);
    const blocks = routeBlocks();
    const rulesList = rules(score);
    const share = shareCopy(title, score, rulesList);
    const prompt = promptFor(title, score, blocks, rulesList);

    outputNode.innerHTML = `
      <div class="nr-summary">
        <div>
          <small>T031 noctourism route</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 夜遊的核心是有節奏地走，而不是一直加點加到回不了家。</p>
        </div>
        <div class="nr-score" aria-label="夜遊安全分">${score}</div>
      </div>

      <div class="nr-timeline">
        ${blocks.map((block) => `
          <article class="nr-block">
            <span>${escapeHtml(block.time)}</span>
            <h3>${escapeHtml(block.title)}</h3>
            <p>${escapeHtml(block.lead)}</p>
            <ul><li>${escapeHtml(block.item?.title || "保留彈性")} · ${escapeHtml(block.item?.type || "備案")}</li></ul>
          </article>
        `).join("")}
      </div>

      <div class="nr-rules">
        <section>
          <h3>安全規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="nr-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="nr-result-actions">
        <button type="button" class="nr-button" data-copy-share>複製群組公告</button>
        <button type="button" class="nr-button" data-copy-prompt>複製 Prompt</button>
        <a class="nr-button nr-primary" data-app-link href="${appStore}?ct=tool_night_owl_route_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateStop(id, key, value) {
    stops = stops.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addStop() {
    if (stops.length >= 10) {
      showToast("最多先放 10 個夜晚點");
      return;
    }
    stops.push(stop("新夜晚點", "散步", 60, 60, 20));
    renderStops();
    renderOutput();
  }

  function loadSample() {
    fields.city.value = "曼谷";
    fields.start.value = "19:30";
    fields.returnTime.value = "23:30";
    fields.safety.value = "78";
    stops = [
      stop("河岸夜景", "夜景", 88, 72, 24),
      stop("老城區散步", "散步", 76, 58, 36),
      stop("船麵宵夜", "宵夜", 82, 74, 16),
      stop("百貨室內備案", "室內", 64, 86, 12),
      stop("飯店附近酒吧", "返程", 70, 80, 8)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-safety-value]").textContent = fields.safety.value;
    renderStops();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    const suffix = input.dataset.key === "move" ? "分" : "";
    label.innerHTML = `${label.textContent.replace(/\s\d+(分)?$/, "")} <strong>${input.value}${suffix}</strong>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("已複製");
    } catch {
      window.prompt("複製文字", text);
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1300);
  }

  stopsNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-stop-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateStop(row.dataset.stopId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  stopsNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-stop-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateStop(row.dataset.stopId, key, event.target.value);
    renderOutput();
  });

  stopsNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-stop]");
    if (!remove) return;
    if (stops.length <= 2) {
      showToast("至少保留 2 個夜晚點");
      return;
    }
    const row = remove.closest("[data-stop-id]");
    stops = stops.filter((item) => item.id !== row.dataset.stopId);
    renderStops();
    renderOutput();
  });

  document.querySelector("[data-add-stop]").addEventListener("click", addStop);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.safety) document.querySelector("[data-safety-value]").textContent = fields.safety.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
