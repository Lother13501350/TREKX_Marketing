(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const itemsNode = document.querySelector("[data-items]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    route: document.querySelector("[data-route]"),
    mode: document.querySelector("[data-mode]"),
    party: document.querySelector("[data-party]"),
    offline: document.querySelector("[data-offline]"),
    anxiety: document.querySelector("[data-anxiety]"),
    safety: document.querySelector("[data-safety]"),
    roaming: document.querySelector("[data-roaming]")
  };
  const labels = {
    offline: document.querySelector("[data-offline-label]"),
    anxiety: document.querySelector("[data-anxiety-label]"),
    safety: document.querySelector("[data-safety-label]")
  };

  let items = [
    item("dp-1", "下載離線地圖", "map", 92, 10, 78),
    item("dp-2", "票券截圖到相簿", "ticket", 88, 8, 82),
    item("dp-3", "住宿地址紙本備份", "safety", 74, 12, 90),
    item("dp-4", "翻譯常用句", "language", 62, 18, 66),
    item("dp-5", "集合點與回程站", "meet", 80, 14, 86)
  ];

  function item(id, name, type, ready, effort, safety) {
    return { id, name, type, ready, effort, safety };
  }

  function typeOptions() {
    return [["map", "地圖"], ["ticket", "票券"], ["safety", "安全"], ["language", "翻譯"], ["meet", "集合"]];
  }

  function typeLabel(value) {
    const found = typeOptions().find((type) => type[0] === value);
    return found ? found[1] : "準備";
  }

  function renderItems() {
    itemsNode.innerHTML = items.map((entry) => `
      <article class="dp-item" data-item-id="${escapeAttr(entry.id)}">
        <label>準備項<input data-key="name" value="${escapeAttr(entry.name)}" placeholder="例如：離線地圖、票券、集合點"></label>
        <label>類型<select data-key="type">${typeOptions().map(([value, label]) => `<option value="${value}"${entry.type === value ? " selected" : ""}>${label}</option>`).join("")}</select></label>
        ${rangeControl("ready", "完成", entry.ready)}
        ${rangeControl("effort", "麻煩", entry.effort)}
        ${rangeControl("safety", "安全", entry.safety)}
        <button type="button" class="dp-remove" data-remove aria-label="移除 ${escapeAttr(entry.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value) {
    return `<label><span class="dp-mini">${label}<strong>${value}</strong></span><input data-key="${key}" type="range" min="1" max="100" value="${value}" aria-label="${label}"></label>`;
  }

  function modeWeight() {
    if (fields.mode.value === "paper") return 1.18;
    if (fields.mode.value === "deep") return 1;
    return 0.72;
  }

  function scoreItem(entry) {
    const anxietyBonus = Number(fields.anxiety.value) * entry.safety / 1000;
    const safetyBonus = Number(fields.safety.value) * entry.safety / 1100;
    const roamingBonus = fields.roaming.checked && (entry.type === "map" || entry.type === "ticket" || entry.type === "meet") ? 12 : 0;
    const partyBonus = fields.party.value === "family" && (entry.type === "meet" || entry.type === "safety") ? 10 : 0;
    return Math.max(1, Math.min(99, Math.round(entry.ready * 0.58 + entry.safety * 0.28 + anxietyBonus + safetyBonus + roamingBonus + partyBonus - entry.effort * 0.18)));
  }

  function buildPass() {
    const scored = items.map((entry) => ({ ...entry, score: scoreItem(entry) })).sort((a, b) => b.score - a.score);
    const mustDo = scored.filter((entry) => entry.score < 76 || entry.ready < 72).slice(0, 4);
    const readyAverage = Math.round(scored.reduce((sum, entry) => sum + entry.score, 0) / Math.max(1, scored.length));
    const offlineFit = Math.max(1, Math.min(99, Math.round(readyAverage * 0.62 + Number(fields.offline.value) * 0.24 + (100 - Number(fields.anxiety.value)) * 0.08 - (modeWeight() - 1) * 12)));
    return { scored, mustDo, readyAverage, offlineFit };
  }

  function verdict(pass) {
    if (pass.offlineFit >= 82) return ["可以安心離線", "你的地圖、票券、安全備案都夠完整，手機可以退到工具角色，不用一直抓在手上。"];
    if (pass.offlineFit >= 62) return ["可以半離線", "大方向可以少滑手機，但還有幾個準備項要補齊。先完成必做清單，再進入深離線。"];
    return ["先不要硬離線", "目前備份不足或迷路焦慮偏高。今天先做輕離線，把安全感補好再說。"];
  }

  function phoneRule(pass) {
    if (fields.mode.value === "paper") return "手機規則：飛航模式加白名單。只在整點、迷路、付款、票券、緊急聯絡時拿出來。";
    if (fields.mode.value === "deep") return "手機規則：只允許導航、票券、翻譯與緊急聯絡。社群和相簿整理留到回住宿。";
    return "手機規則：社群延後發，路上只拍不修圖。每個點最多查看手機 2 分鐘。";
  }

  function mission(pass) {
    if (Number(fields.offline.value) >= 80) return "現場任務：用眼睛記三個細節，不拍也不查資料。回住宿後再把感覺寫進 ChillOut 回憶錄。";
    if (fields.party.value === "solo") return "現場任務：每換一區就確認一次回程站與住宿方向，其他時間把手機收起來。";
    return "現場任務：同行者各自選一個不用手機的觀察題，晚餐時交換答案。";
  }

  function shareCopy(pass, title) {
    return `我用 ChillOut 離線旅行通行證檢查了 ${fields.route.value}：${title}，離線分數 ${pass.offlineFit}/100。手機規則：${phoneRule(pass)} 必做：${(pass.mustDo.length ? pass.mustDo : pass.scored.slice(0, 2)).map((entry) => entry.name).join("、")}`;
  }

  function promptFor(pass, title) {
    const detail = items.map((entry) => `${entry.name}，類型 ${typeLabel(entry.type)}，完成 ${entry.ready}/100，麻煩 ${entry.effort}/100，安全 ${entry.safety}/100`).join("；");
    return `請用 ChillOut 幫我把「離線旅行通行證」轉成可執行半日行程。路線是 ${fields.route.value}，離線模式 ${modeLabel(fields.mode.value)}，同行狀態 ${partyLabel(fields.party.value)}，想離線 ${fields.offline.value}/100，迷路焦慮 ${fields.anxiety.value}/100，安全需求 ${fields.safety.value}/100，${fields.roaming.checked ? "網路可能不穩" : "網路正常"}。準備項：${detail}。工具判斷是「${title}」，離線分數 ${pass.offlineFit}/100。請補上出門前必做清單、手機使用規則、現場離線任務、緊急備案、集合點、回程站和分享標題。`;
  }

  function modeLabel(value) {
    if (value === "paper") return "紙本模式";
    if (value === "deep") return "深離線";
    return "輕離線";
  }

  function partyLabel(value) {
    if (value === "friend") return "朋友同行";
    if (value === "family") return "家人/長輩同行";
    return "一個人";
  }

  function metric(label, value) {
    return `<div class="dp-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    if (!items.length) {
      outputNode.innerHTML = `<div class="dp-empty"><p class="dp-kicker">Result</p><h2>至少需要一個準備項。</h2><p>新增準備項後再生成通行證。</p></div>`;
      return;
    }
    const pass = buildPass();
    const [title, description] = verdict(pass);
    const share = shareCopy(pass, title);
    const prompt = promptFor(pass, title);
    const mustDo = pass.mustDo.length ? pass.mustDo : pass.scored.slice(0, 3);
    outputNode.innerHTML = `
      <div class="dp-result-head">
        <div><p class="dp-kicker">T052 手寫版 / digital detox pass</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="dp-score" aria-label="離線通行分數">${pass.offlineFit}</div>
      </div>
      <div class="dp-metrics">
        ${metric("準備完整", `${pass.readyAverage}/100`)}
        ${metric("離線模式", modeLabel(fields.mode.value))}
        ${metric("必補項", `${mustDo.length} 個`)}
        ${metric("安全需求", `${fields.safety.value}/100`)}
      </div>
      <div class="dp-pass">
        <article class="dp-card"><span>01 / before leaving</span><h3>出門前必做</h3><ul>${mustDo.map((entry) => `<li>${escapeHtml(entry.name)}：${entry.score} 分</li>`).join("")}</ul></article>
        <article class="dp-card"><span>02 / phone rule</span><h3>手機規則</h3><p>${escapeHtml(phoneRule(pass))}</p></article>
        <article class="dp-card"><span>03 / offline mission</span><h3>現場任務</h3><p>${escapeHtml(mission(pass))}</p></article>
      </div>
      <div class="dp-copy-grid">
        <section class="dp-rule"><h3>緊急備案</h3><p>${escapeHtml(fields.party.value === "solo" ? "把住宿地址、回程站、緊急電話和一張現金放在同一個小袋。迷路時先回到最近的大路或車站。" : "先約定集合點和失散等待時間。任何人手機沒電時，直接回集合點，不臨時改地點。")}</p></section>
        <section class="dp-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="dp-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="dp-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="dp-primary" data-app-link href="${appStore}?ct=tool_digital_detox_pass_manual_${pass.offlineFit}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateItem(id, key, value) {
    items = items.map((entry) => {
      if (entry.id !== id) return entry;
      if (key === "name" || key === "type") return { ...entry, [key]: value };
      return { ...entry, [key]: Number(value) };
    });
  }

  function addItem() {
    if (items.length >= 9) {
      showToast("最多先檢查 9 個準備項");
      return;
    }
    items.push(item(`dp-${Date.now()}`, "新的離線準備", "safety", 60, 20, 72));
    renderAll();
  }

  function loadSample() {
    fields.route.value = "京都東山散步";
    fields.mode.value = "paper";
    fields.party.value = "solo";
    fields.offline.value = "92";
    fields.anxiety.value = "58";
    fields.safety.value = "78";
    fields.roaming.checked = true;
    items = [
      item("dp-a", "Google Maps 離線區域", "map", 94, 12, 88),
      item("dp-b", "巴士站與回程站截圖", "meet", 82, 18, 92),
      item("dp-c", "寺院門票與營業時間截圖", "ticket", 72, 16, 74),
      item("dp-d", "住宿地址紙本小卡", "safety", 90, 10, 96),
      item("dp-e", "日文求助句", "language", 64, 22, 70)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.offline.textContent = `${fields.offline.value}/100`;
    labels.anxiety.textContent = `${fields.anxiety.value}/100`;
    labels.safety.textContent = `${fields.safety.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label")?.querySelector("strong");
    if (strong) strong.textContent = input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-item]").addEventListener("click", addItem);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    itemsNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-item-id]");
      if (!row || !event.target.dataset.key) return;
      updateItem(row.dataset.itemId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    itemsNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-item-id]");
      if (!row || !event.target.dataset.key) return;
      updateItem(row.dataset.itemId, event.target.dataset.key, event.target.value);
      renderAll();
    });
    itemsNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-item-id]");
      items = items.filter((entry) => entry.id !== row.dataset.itemId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderItems();
    renderOutput();
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
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
    toastNode.textContent = message;
    toastNode.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toastNode.classList.remove("is-visible"), 1600);
  }

  bindEvents();
  renderAll();
})();
