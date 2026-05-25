(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const segmentsNode = document.querySelector("[data-segments]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    start: document.querySelector("[data-start]"),
    limit: document.querySelector("[data-limit]"),
    safety: document.querySelector("[data-safety]")
  };

  let segments = [
    segment("鴨川河岸", "河岸", 86, 82, 1.2),
    segment("祇園小巷外圈", "老街", 74, 68, 0.9),
    segment("書店咖啡收尾", "室內", 62, 92, 0.4),
    segment("飯店附近主路", "返程", 58, 88, 0.6)
  ];

  function segment(title, type, quiet, safety, distance) {
    return { id: crypto.randomUUID(), title, type, quiet, safety, distance };
  }

  function renderSegments() {
    segmentsNode.innerHTML = segments.map((item) => `
      <article class="mw-segment" data-segment-id="${escapeAttr(item.id)}">
        <label class="mw-segment-field">
          <span>散步段</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="散步段">
        </label>
        <label class="mw-segment-select">
          <span>類型</span>
          <select data-key="type" aria-label="類型">
            ${["河岸", "老街", "公園", "室內", "返程", "海邊"].map((type) => `<option value="${type}"${type === item.type ? " selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        ${slider("quiet", "安靜", item.quiet, 0, 100, "")}
        ${slider("safety", "安全", item.safety, 0, 100, "")}
        ${slider("distance", "距離", item.distance, 0.2, 3, "km")}
        <button class="mw-remove" type="button" data-remove-segment aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value, min, max, suffix) {
    return `
      <label class="mw-segment-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" step="${key === "distance" ? "0.1" : "1"}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreSegment(item) {
    const safetyWeight = Number(fields.safety.value) / 100;
    const distancePenalty = Number(item.distance) > Number(fields.limit.value) / 2 ? 8 : 0;
    return Math.max(1, Math.min(99, Math.round(item.quiet * (1 - safetyWeight * 0.35) + item.safety * safetyWeight * 0.55 - distancePenalty)));
  }

  function ranked() {
    return segments.map((item) => ({ ...item, score: scoreSegment(item) })).sort((a, b) => b.score - a.score);
  }

  function selectedRoute() {
    const limit = Number(fields.limit.value);
    const chosen = [];
    let total = 0;
    ranked().forEach((item) => {
      if (chosen.length < 3 && total + Number(item.distance) <= limit + 0.2) {
        chosen.push(item);
        total += Number(item.distance);
      }
    });
    while (chosen.length < Math.min(3, segments.length)) {
      const next = ranked().find((item) => !chosen.some((chosenItem) => chosenItem.id === item.id));
      if (!next) break;
      chosen.push(next);
      total += Number(next.distance);
    }
    return { chosen, total: Math.round(total * 10) / 10 };
  }

  function routeScore(route) {
    const avg = Math.round(route.chosen.reduce((sum, item) => sum + item.score, 0) / Math.max(1, route.chosen.length));
    const distancePenalty = route.total > Number(fields.limit.value) ? 12 : 0;
    return Math.max(1, Math.min(99, avg - distancePenalty));
  }

  function profile(score) {
    if (score >= 78) return ["適合慢慢走", "路線安靜、安全且距離可控，適合把夜晚留給散步。"];
    if (score >= 55) return ["要保留返程點", "散步氣氛足夠，但需要把回程和休息點排清楚。"];
    return ["先縮短路線", "距離或安全壓力偏高，建議改成飯店附近短散步。"];
  }

  function addMinutes(time, minutes) {
    const [hour, minute] = time.split(":").map(Number);
    const total = hour * 60 + minute + minutes;
    const nextHour = Math.floor(total / 60) % 24;
    const nextMinute = total % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function blocks(route) {
    return route.chosen.slice(0, 3).map((item, index) => ({
      time: addMinutes(fields.start.value, index * 35),
      title: index === 0 ? "暖身散步" : index === 1 ? "月光主段" : "低壓回程",
      item
    }));
  }

  function rules(score, route) {
    const safest = ranked().sort((a, b) => b.safety - a.safety)[0];
    const list = [
      `全程控制在 ${fields.limit.value} km 內，目前估計 ${route.total} km。`,
      `${safest.title} 是安全最高的回程備案，太晚或太累就切過去。`,
      "散步段只走主路與明亮路線，不為了拍照鑽小巷。"
    ];
    if (Number(fields.safety.value) > 75) list.push("安全保守度高，避免人少路段，優先選河岸主路或室內收尾。");
    if (score < 55) list.push("今晚不要硬走完整路線，保留第一段和返程點就好。");
    return list;
  }

  function shareCopy(title, score, route, rulesList) {
    return `我用 ChillOut 月光散步地圖排好了：${fields.city.value || "這座城市"} 是「${title}」，散步安全分 ${score}/100，全程約 ${route.total} km。規則：${rulesList.slice(0, 2).join(" / ")}`;
  }

  function promptFor(title, score, route, blocksList, rulesList) {
    const segmentText = segments.map((item) => `${item.title} ${item.type}，安靜 ${item.quiet}，安全 ${item.safety}，距離 ${item.distance}km`).join("；");
    const blockText = blocksList.map((block) => `${block.time} ${block.title}：${block.item.title}`).join("；");
    return `請用 ChillOut 幫我規劃 ${fields.city.value || "城市"} 的月光散步。開始 ${fields.start.value}，步行上限 ${fields.limit.value}km，安全保守度 ${fields.safety.value}/100。候選散步段：${segmentText}。建議路線：${blockText}。結果是「${title}」，散步安全分 ${score}/100，全程約 ${route.total}km。請依照這些規則安排步行順序、休息點、回程方式與雨備室內點：${rulesList.join("；")}。`;
  }

  function renderOutput() {
    if (!segments.length) {
      outputNode.innerHTML = `<div class="mw-empty">先加入散步段，這裡會生成月光路線、安全規則與 ChillOut prompt。</div>`;
      return;
    }

    const route = selectedRoute();
    const score = routeScore(route);
    const [title, description] = profile(score);
    const blockList = blocks(route);
    const rulesList = rules(score, route);
    const share = shareCopy(title, score, route, rulesList);
    const prompt = promptFor(title, score, route, blockList, rulesList);

    outputNode.innerHTML = `
      <div class="mw-summary">
        <div>
          <small>T033 moonwalk map</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 散步路線的好壞，不只看漂亮，也看能不能舒服地回來。</p>
        </div>
        <div class="mw-score" aria-label="散步安全分">${score}</div>
      </div>

      <div class="mw-map">
        ${blockList.map((block) => `
          <article class="mw-block">
            <span>${escapeHtml(block.time)}</span>
            <h3>${escapeHtml(block.title)}</h3>
            <p>${escapeHtml(block.item.title)} · ${escapeHtml(block.item.type)}</p>
            <ul><li>安靜 ${block.item.quiet} / 安全 ${block.item.safety} / ${block.item.distance}km</li></ul>
          </article>
        `).join("")}
      </div>

      <div class="mw-rules">
        <section>
          <h3>散步規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="mw-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="mw-result-actions">
        <button type="button" class="mw-button" data-copy-share>複製群組公告</button>
        <button type="button" class="mw-button" data-copy-prompt>複製 Prompt</button>
        <a class="mw-button mw-primary" data-app-link href="${appStore}?ct=tool_moonwalk_map_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateSegment(id, key, value) {
    segments = segments.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addSegment() {
    if (segments.length >= 10) {
      showToast("最多先放 10 段路線");
      return;
    }
    segments.push(segment("新散步段", "河岸", 60, 60, 0.8));
    renderSegments();
    renderOutput();
  }

  function loadSample() {
    fields.city.value = "台南";
    fields.start.value = "20:00";
    fields.limit.value = "3";
    fields.safety.value = "82";
    segments = [
      segment("運河河岸", "河岸", 84, 82, 1.1),
      segment("神農街外圈", "老街", 78, 70, 0.7),
      segment("書店咖啡收尾", "室內", 68, 92, 0.4),
      segment("飯店主路回程", "返程", 58, 88, 0.5)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-safety-value]").textContent = fields.safety.value;
    renderSegments();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    const suffix = input.dataset.key === "distance" ? "km" : "";
    label.innerHTML = `${label.textContent.replace(/\s[\\d.]+(km)?$/, "")} <strong>${input.value}${suffix}</strong>`;
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

  segmentsNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-segment-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateSegment(row.dataset.segmentId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  segmentsNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-segment-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateSegment(row.dataset.segmentId, key, event.target.value);
    renderOutput();
  });

  segmentsNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-segment]");
    if (!remove) return;
    if (segments.length <= 2) {
      showToast("至少保留 2 段路線");
      return;
    }
    const row = remove.closest("[data-segment-id]");
    segments = segments.filter((item) => item.id !== row.dataset.segmentId);
    renderSegments();
    renderOutput();
  });

  document.querySelector("[data-add-segment]").addEventListener("click", addSegment);
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
