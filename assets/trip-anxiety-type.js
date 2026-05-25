(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    days: document.querySelector("[data-days]"),
    transport: document.querySelector("[data-transport]"),
    weather: document.querySelector("[data-weather]"),
    budget: document.querySelector("[data-budget]"),
    language: document.querySelector("[data-language]"),
    data: document.querySelector("[data-data]"),
    schedule: document.querySelector("[data-schedule]"),
    food: document.querySelector("[data-food]"),
    safety: document.querySelector("[data-safety]"),
    party: document.querySelector("[data-party]")
  };

  const sources = {
    transport: ["交通失控型", "先準備機場到住宿、住宿到第一站、末班車三個交通備案。"],
    weather: ["天氣變臉型", "每一天都要有室內替代點，雨天不是刪行程，而是換行程。"],
    budget: ["預算警報型", "先把每日上限、可刷卡比例、現金和緊急預算分開。"],
    language: ["語言卡關型", "先存好地址、點餐句、求助句和住宿電話截圖。"],
    data: ["網路斷線型", "離線地圖、eSIM 備案、住宿 Wi-Fi 和集合點要先準備。"],
    schedule: ["行程失控型", "每天只鎖三個不可動點，其餘全部進備案池。"],
    food: ["吃不安心型", "先準備附近安全餐、便利店備案和不踩雷的第一餐。"],
    safety: ["安全感巡邏型", "晚上路線、回住宿方式、緊急聯絡與同行定位要先確定。"]
  };

  function value(key) {
    return Number(fields[key].value || 0);
  }

  function ranked() {
    return Object.keys(sources)
      .map((key) => ({ key, score: value(key), name: sources[key][0], advice: sources[key][1] }))
      .sort((a, b) => b.score - a.score);
  }

  function anxietyLevel(top) {
    let score = Math.round(top.score);
    if (fields.party.value === "solo") score += 8;
    if (fields.party.value === "family") score += 6;
    return Math.max(0, Math.min(100, score));
  }

  function backupCards(ranks) {
    return ranks.slice(0, 3).map((item, index) => ({
      label: `backup ${index + 1}`,
      title: item.name,
      body: item.advice
    }));
  }

  function actionList(ranks) {
    const city = fields.city.value.trim() || "目的地";
    const topKeys = ranks.slice(0, 4).map((item) => item.key);
    const actions = [];
    if (topKeys.includes("transport")) actions.push(`下載 ${city} 離線地圖，截圖機場到住宿與住宿到第一站。`);
    if (topKeys.includes("weather")) actions.push("每一天準備一個室內備案，不要等下雨才找。");
    if (topKeys.includes("budget")) actions.push("把每日可花、交通、餐費與緊急預算分開記。");
    if (topKeys.includes("language")) actions.push("把住宿地址、餐廳地址和求助句做成手機相簿。");
    if (topKeys.includes("data")) actions.push("設定 eSIM / 漫遊，另存住宿 Wi-Fi 與集合點。");
    if (topKeys.includes("schedule")) actions.push("每天只保留三個不可動點，其餘交給 ChillOut 排備案。");
    if (topKeys.includes("food")) actions.push("抵達第一餐選低風險餐廳，不用第一天挑戰排隊名店。");
    if (topKeys.includes("safety")) actions.push("晚上只排交通清楚的區域，先設好回住宿路線。");
    return actions.slice(0, 5);
  }

  function promptFor(top, ranks, actions) {
    return `請用 ChillOut 幫我把「${fields.city.value.trim() || "目的地"}」${fields.days.value} 天旅行做成安心版行程。我的主要旅行焦慮是「${top.name}」，分數 ${top.score}/100。八項分數：交通 ${fields.transport.value}、天氣 ${fields.weather.value}、預算 ${fields.budget.value}、語言 ${fields.language.value}、網路 ${fields.data.value}、行程失控 ${fields.schedule.value}、食物 ${fields.food.value}、安全感 ${fields.safety.value}。同行狀態：${fields.party.options[fields.party.selectedIndex].textContent}。請先處理這三個備案：${ranks.slice(0, 3).map((item) => `${item.name}: ${item.advice}`).join("；")}。行前動作：${actions.join("；")}。請輸出每日不可動點、備案池、雨天版本、交通截圖清單、緊急聯絡資訊欄位和可以分享給旅伴的安心版行程標題。`;
  }

  function render() {
    Object.keys(sources).forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const ranks = ranked();
    const top = ranks[0];
    const level = anxietyLevel(top);
    const backups = backupCards(ranks);
    const actions = actionList(ranks);
    const prompt = promptFor(top, ranks, actions);
    const share = `我的 ChillOut 旅行焦慮類型是「${top.name}」，安心備案優先度 ${level}/100。焦慮不是敵人，它是在提醒我需要備案。`;

    result.innerHTML = `
      <div class="ta-card">
        <div>
          <small>T020 backup card</small>
          <h2>${escapeHtml(top.name)}</h2>
          <p>${escapeHtml(top.advice)}</p>
        </div>
        <div class="ta-score" aria-label="安心備案優先度">${level}</div>
      </div>
      <div class="ta-backups">
        ${backups.map((item) => `
          <article class="ta-backup">
            <span>${escapeHtml(item.label)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `).join("")}
      </div>
      <div class="ta-list">
        <h3>出發前先做這些</h3>
        <ul>${actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul>
      </div>
      <div class="ta-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="ta-result-actions">
        <button class="ta-button" type="button" data-copy-share>複製分享文案</button>
        <button class="ta-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ta-button ta-primary" data-app-link href="${appStore}?ct=tool_trip_anxiety_type_manual_${top.key}_${level}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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

  document.querySelector("[data-sample]").addEventListener("click", () => {
    fields.city.value = "釜山";
    fields.days.value = "4";
    fields.transport.value = "72";
    fields.weather.value = "58";
    fields.budget.value = "46";
    fields.language.value = "64";
    fields.data.value = "70";
    fields.schedule.value = "82";
    fields.food.value = "36";
    fields.safety.value = "60";
    fields.party.value = "couple";
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
