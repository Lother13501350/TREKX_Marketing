(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const spotsNode = document.querySelector("[data-spots]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    sunset: document.querySelector("[data-sunset]"),
    dinner: document.querySelector("[data-dinner]"),
    weather: document.querySelector("[data-weather]")
  };

  let spots = [
    spot("漁光島沙灘", "海邊", 88, 72, 30),
    spot("安平夕照平台", "觀景台", 82, 82, 20),
    spot("咖啡店窗邊", "室內", 64, 90, 12),
    spot("運河步道", "散步", 70, 76, 18)
  ];

  function spot(title, type, view, weatherSafe, travel) {
    return { id: crypto.randomUUID(), title, type, view, weatherSafe, travel };
  }

  function renderSpots() {
    spotsNode.innerHTML = spots.map((item) => `
      <article class="sc-spot" data-spot-id="${escapeAttr(item.id)}">
        <label class="sc-spot-field">
          <span>觀景點</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="觀景點">
        </label>
        <label class="sc-spot-select">
          <span>類型</span>
          <select data-key="type" aria-label="類型">
            ${["海邊", "山景", "觀景台", "河岸", "室內", "散步"].map((type) => `<option value="${type}"${type === item.type ? " selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        ${slider("view", "景色", item.view)}
        ${slider("weatherSafe", "天氣備援", item.weatherSafe)}
        ${slider("travel", "交通", item.travel)}
        <button class="sc-remove" type="button" data-remove-spot aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    const suffix = key === "travel" ? "分" : "";
    return `
      <label class="sc-spot-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="0" max="${key === "travel" ? "90" : "100"}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreSpot(item) {
    const weatherRisk = 100 - Number(fields.weather.value);
    const weatherWeight = weatherRisk / 100;
    const travelPenalty = Number(item.travel) * 0.35;
    return Math.max(1, Math.min(99, Math.round(item.view * (1 - weatherWeight * 0.35) + item.weatherSafe * weatherWeight * 0.45 - travelPenalty)));
  }

  function ranked() {
    return spots.map((item) => ({ ...item, score: scoreSpot(item) })).sort((a, b) => b.score - a.score);
  }

  function routeScore() {
    const top = ranked()[0];
    const weatherPenalty = Number(fields.weather.value) < 45 ? 10 : 0;
    return Math.max(1, Math.min(99, Math.round((top?.score || 50) - weatherPenalty)));
  }

  function profile(score) {
    if (score >= 78) return ["可以衝主日落", "天氣和交通條件足夠，適合提早卡位並拍完整黃金時段。"];
    if (score >= 55) return ["要保留備案", "日落仍值得排，但要準備室內或低移動備案。"];
    return ["不要硬追夕陽", "天氣或交通壓力偏高，建議改成晚餐前散步或室內窗景。"];
  }

  function addMinutes(time, minutes) {
    const [hour, minute] = time.split(":").map(Number);
    const total = hour * 60 + minute + minutes;
    const nextHour = Math.floor((total + 24 * 60) / 60) % 24;
    const nextMinute = (total + 24 * 60) % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function countdownBlocks(top, backup) {
    return [
      { time: addMinutes(fields.sunset.value, -90), title: "出發緩衝", copy: "先移動到觀景點附近，不把交通壓到最後。", item: top },
      { time: addMinutes(fields.sunset.value, -45), title: "抵達卡位", copy: "找視野、買水、確認風向與拍照角度。", item: top },
      { time: addMinutes(fields.sunset.value, -10), title: "黃金拍照", copy: "先拍人，再拍空景，最後補短影片。", item: top },
      { time: addMinutes(fields.sunset.value, 35), title: "晚餐收尾", copy: fields.dinner.value === "special" ? "保留訂位交通時間，不在景點拖太久。" : "選附近晚餐或小吃，不再跨區移動。", item: backup }
    ];
  }

  function rules(score, top, backup) {
    const list = [
      `主觀景點是 ${top.title}，至少日落前 45 分鐘抵達。`,
      `備案是 ${backup.title}，如果雲層太厚或交通延誤就直接切換。`,
      "日落前 10 分鐘不再換點，避免最漂亮的時間在路上。"
    ];
    if (Number(fields.weather.value) < 50) list.push("天氣信心偏低，請把室內窗景或河岸散步當成正式備案。");
    if (score < 55) list.push("不要為了日落跨太遠，晚餐前的低壓散步比硬追夕陽更穩。");
    return list;
  }

  function shareCopy(title, score, top, rulesList) {
    return `我用 ChillOut 日落倒數排程排好了：${fields.city.value || "這座城市"} 是「${title}」，日落成功分 ${score}/100。主點 ${top.title}，規則：${rulesList.slice(0, 2).join(" / ")}。`;
  }

  function promptFor(title, score, blocks, rulesList) {
    const spotText = spots.map((item) => `${item.title} ${item.type}，景色 ${item.view}，天氣備援 ${item.weatherSafe}，交通 ${item.travel} 分`).join("；");
    const blockText = blocks.map((block) => `${block.time} ${block.title}：${block.item?.title}`).join("；");
    return `請用 ChillOut 幫我規劃 ${fields.city.value || "城市"} 的日落倒數行程。日落時間 ${fields.sunset.value}，天氣信心 ${fields.weather.value}/100，晚餐偏好 ${fields.dinner.options[fields.dinner.selectedIndex].textContent}。候選點：${spotText}。倒數節奏：${blockText}。結果是「${title}」，日落成功分 ${score}/100。請依照這些規則安排交通、卡位、拍照、雨備與晚餐收尾：${rulesList.join("；")}。`;
  }

  function renderOutput() {
    if (!spots.length) {
      outputNode.innerHTML = `<div class="sc-empty">先加入觀景點，這裡會生成日落倒數、備案規則與 ChillOut prompt。</div>`;
      return;
    }

    const rankedSpots = ranked();
    const top = rankedSpots[0];
    const backup = rankedSpots.find((item) => item.id !== top.id && item.weatherSafe >= 70) || rankedSpots[1] || top;
    const score = routeScore();
    const [title, description] = profile(score);
    const blocks = countdownBlocks(top, backup);
    const rulesList = rules(score, top, backup);
    const share = shareCopy(title, score, top, rulesList);
    const prompt = promptFor(title, score, blocks, rulesList);

    outputNode.innerHTML = `
      <div class="sc-summary">
        <div>
          <small>T032 sunset countdown</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 日落行程要從太陽下山往回排，不是看心情出門。</p>
        </div>
        <div class="sc-score" aria-label="日落成功分">${score}</div>
      </div>

      <div class="sc-countdown">
        ${blocks.map((block) => `
          <article class="sc-block">
            <span>${escapeHtml(block.time)}</span>
            <h3>${escapeHtml(block.title)}</h3>
            <p>${escapeHtml(block.copy)}</p>
            <ul><li>${escapeHtml(block.item?.title || "保留彈性")} · ${escapeHtml(block.item?.type || "備案")}</li></ul>
          </article>
        `).join("")}
      </div>

      <div class="sc-rules">
        <section>
          <h3>倒數規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="sc-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="sc-result-actions">
        <button type="button" class="sc-button" data-copy-share>複製群組公告</button>
        <button type="button" class="sc-button" data-copy-prompt>複製 Prompt</button>
        <a class="sc-button sc-primary" data-app-link href="${appStore}?ct=tool_sunset_countdown_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateSpot(id, key, value) {
    spots = spots.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addSpot() {
    if (spots.length >= 10) {
      showToast("最多先放 10 個觀景點");
      return;
    }
    spots.push(spot("新觀景點", "觀景台", 60, 60, 20));
    renderSpots();
    renderOutput();
  }

  function loadSample() {
    fields.city.value = "淡水";
    fields.sunset.value = "18:31";
    fields.dinner.value = "snack";
    fields.weather.value = "58";
    spots = [
      spot("漁人碼頭", "海邊", 88, 68, 30),
      spot("紅毛城坡道", "觀景台", 76, 78, 18),
      spot("河岸咖啡窗邊", "室內", 62, 92, 10),
      spot("老街河岸", "散步", 70, 82, 12)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-weather-value]").textContent = fields.weather.value;
    renderSpots();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    const suffix = input.dataset.key === "travel" ? "分" : "";
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

  spotsNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-spot-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateSpot(row.dataset.spotId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  spotsNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-spot-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateSpot(row.dataset.spotId, key, event.target.value);
    renderOutput();
  });

  spotsNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-spot]");
    if (!remove) return;
    if (spots.length <= 2) {
      showToast("至少保留 2 個觀景點");
      return;
    }
    const row = remove.closest("[data-spot-id]");
    spots = spots.filter((item) => item.id !== row.dataset.spotId);
    renderSpots();
    renderOutput();
  });

  document.querySelector("[data-add-spot]").addEventListener("click", addSpot);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.weather) document.querySelector("[data-weather-value]").textContent = fields.weather.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
