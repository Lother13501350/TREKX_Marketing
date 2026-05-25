(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const stopsNode = document.querySelector("[data-stops]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    wake: document.querySelector("[data-wake]"),
    sunrise: document.querySelector("[data-sunrise]"),
    theme: document.querySelector("[data-theme]"),
    energy: document.querySelector("[data-energy]"),
    sleep: document.querySelector("[data-sleep]"),
    safety: document.querySelector("[data-safety]"),
    solo: document.querySelector("[data-solo]")
  };
  const labels = {
    energy: document.querySelector("[data-energy-label]"),
    sleep: document.querySelector("[data-sleep-label]"),
    safety: document.querySelector("[data-safety-label]")
  };

  let stops = [
    stop("hm-1", "鴨川河岸", "water", 315, 12, 88, 78),
    stop("hm-2", "早開豆腐早餐", "breakfast", 390, 7, 72, 92),
    stop("hm-3", "清晨神社參道", "temple", 330, 15, 94, 64),
    stop("hm-4", "開場市場小攤", "market", 420, 10, 70, 86)
  ];

  function stop(id, name, type, open, walk, empty, breakfast) {
    return { id, name, type, open, walk, empty, breakfast };
  }

  function typeOptions() {
    return [["photo", "空景"], ["breakfast", "早餐"], ["temple", "寺廟"], ["market", "市場"], ["water", "水邊"]];
  }

  function typeLabel(value) {
    const found = typeOptions().find((item) => item[0] === value);
    return found ? found[1] : "早晨點";
  }

  function renderStops() {
    stopsNode.innerHTML = stops.map((item) => `
      <article class="hm-stop" data-stop-id="${escapeAttr(item.id)}">
        <label>早晨點<input data-key="name" value="${escapeAttr(item.name)}" placeholder="例如：河岸、市場、神社、早餐店"></label>
        <label>類型<select data-key="type">${typeOptions().map(([value, label]) => `<option value="${value}"${value === item.type ? " selected" : ""}>${label}</option>`).join("")}</select></label>
        <label>開放時間<select data-key="open">${timeOptions().map((time) => `<option value="${time.value}"${time.value === item.open ? " selected" : ""}>${time.label}</option>`).join("")}</select></label>
        ${rangeControl("walk", "步行", item.walk, 3, 35, "分")}
        ${rangeControl("empty", "空城", item.empty, 1, 100, "")}
        <button type="button" class="hm-remove" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function timeOptions() {
    return [
      { value: 300, label: "05:00" },
      { value: 330, label: "05:30" },
      { value: 360, label: "06:00" },
      { value: 390, label: "06:30" },
      { value: 420, label: "07:00" },
      { value: 450, label: "07:30" },
      { value: 480, label: "08:00" }
    ];
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `<label><span class="hm-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}"></label>`;
  }

  function scoreStop(item) {
    const wake = Number(fields.wake.value);
    const waitPenalty = Math.max(0, item.open - wake - 35) * 0.3;
    const darkPenalty = fields.solo.checked && item.open < Number(fields.sunrise.value) && Number(fields.safety.value) > 70 ? 10 : 0;
    const walkPenalty = Math.max(0, item.walk - Math.round(Number(fields.energy.value) * 0.24 + 6)) * 1.2;
    const themeBonus = fields.theme.value === item.type || (fields.theme.value === "photo" && item.empty >= 86) ? 14 : 0;
    const breakfastBonus = fields.theme.value === "breakfast" && item.breakfast > 70 ? 12 : 0;
    return Math.max(1, Math.min(99, Math.round(item.empty * 0.58 + item.breakfast * 0.16 + themeBonus + breakfastBonus - waitPenalty - darkPenalty - walkPenalty)));
  }

  function rankedStops() {
    return stops.map((item) => ({ ...item, score: scoreStop(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const wake = Number(fields.wake.value);
    const sleepPenalty = Number(fields.sleep.value) * 0.34;
    const energyGain = Number(fields.energy.value) * 0.38;
    const safetyPenalty = fields.solo.checked ? Math.max(0, Number(fields.safety.value) - 65) * 0.22 : 0;
    const startScore = Math.max(1, Math.min(99, Math.round(48 + energyGain - sleepPenalty - safetyPenalty + (wake <= 360 ? 8 : 0))));
    const ranked = rankedStops();
    const picked = [];
    const used = new Set();
    const first = ranked.find((item) => item.open <= wake + 45) || ranked[0];
    if (first) { picked.push(first); used.add(first.id); }
    const breakfast = ranked.find((item) => !used.has(item.id) && (item.type === "breakfast" || item.breakfast >= 82));
    if (breakfast) { picked.push(breakfast); used.add(breakfast.id); }
    const final = ranked.find((item) => !used.has(item.id));
    if (final) picked.push(final);
    const routeScore = Math.max(1, Math.min(99, Math.round((startScore + picked.reduce((sum, item) => sum + item.score, 0) / Math.max(1, picked.length)) / 2)));
    return { wake, startScore, picked, routeScore };
  }

  function verdict(plan) {
    if (plan.routeScore >= 80) return ["這是值得早起的早晨", "你的起床能力、候選點和空城價值都夠好。只要前一晚準備好，這段會是旅行記憶點。"];
    if (plan.routeScore >= 60) return ["可以早起，但不要貪心", "這趟早晨玩法可行，但只排三段：空景、早餐、第一景點。睡過頭就切備案。"];
    return ["改成舒服早晨比較好", "睡眠債或安全條件讓清晨出門不划算。把路線延後 60 分鐘，保留早餐和第一景點即可。"];
  }

  function timeline(plan) {
    const firstTime = plan.wake + 25;
    const secondTime = firstTime + 55;
    const thirdTime = secondTime + 70;
    const backTime = thirdTime + 65;
    return [
      [formatTime(plan.wake), "起床與離開住宿", "水、外套、行動電源、交通卡先放口袋。不在清晨臨時找東西。"],
      [formatTime(firstTime), plan.picked[0]?.name || "第一段空景", plan.picked[0] ? `${typeLabel(plan.picked[0].type)}，步行 ${plan.picked[0].walk} 分。先拿到人少畫面。` : "先走住宿附近最安全的主街。"],
      [formatTime(secondTime), plan.picked[1]?.name || "早餐補能量", plan.picked[1] ? `把早餐放在第二段，避免餓著做決策。預估空城值 ${plan.picked[1].empty}/100。` : "找已確認營業的早餐或咖啡。"],
      [formatTime(thirdTime), plan.picked[2]?.name || "第一景點", plan.picked[2] ? `在人潮進城前完成第一景點，${formatTime(backTime)} 前回到主路線。` : "只保留一個主景點，不加碼。"]
    ];
  }

  function backupRule(plan) {
    if (Number(fields.sleep.value) > 70) return "睡過頭備案：不要懲罰自己。直接刪掉第一段空景，保留早餐和第一景點，路線延後 60 分鐘。";
    if (fields.solo.checked && Number(fields.safety.value) > 75) return "安全規則：日出前只走大路、河岸主路或車站半徑。任何暗巷、山路、空地下道都不進。";
    if (plan.routeScore >= 80) return "執行規則：前一晚先買水、查好第一段導航，起床後 10 分鐘內出門，不滑手機。";
    return "調整規則：把早晨當成 bonus，不要排不可取消的任務。起不來也不會毀掉整天。";
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 早晨空城玩法排了 ${fields.city.value}：${title}，分數 ${plan.routeScore}/100。路線是 ${timeline(plan).map((item) => `${item[0]} ${item[1]}`).join(" → ")}。規則：${backupRule(plan)}`;
  }

  function promptFor(plan, title) {
    const stopText = stops.map((item) => `${item.name}，類型 ${typeLabel(item.type)}，開放 ${formatTime(item.open)}，步行 ${item.walk} 分，空城 ${item.empty}/100，早餐價值 ${item.breakfast}/100`).join("；");
    return `請用 ChillOut 幫我把「早晨空城玩法」排成可執行行程。城市/住宿區是 ${fields.city.value}，願意起床 ${formatTime(Number(fields.wake.value))}，日出 ${formatTime(Number(fields.sunrise.value))}，主題 ${themeLabel(fields.theme.value)}，早晨能量 ${fields.energy.value}/100，睡眠債 ${fields.sleep.value}/100，安全感要求 ${fields.safety.value}/100，${fields.solo.checked ? "一個人出門" : "有人同行"}。候選點：${stopText}。工具判斷是「${title}」，分數 ${plan.routeScore}/100。請補上清晨動線、早餐、第一景點、睡過頭備案、安全提醒和可分享標題。`;
  }

  function themeLabel(value) {
    if (value === "breakfast") return "早餐優先";
    if (value === "temple") return "神社寺廟";
    if (value === "market") return "市場開場";
    if (value === "water") return "河岸/海邊散步";
    return "空景照片";
  }

  function renderOutput() {
    if (!stops.length) {
      outputNode.innerHTML = `<div class="hm-empty"><p class="hm-kicker">Result</p><h2>至少需要一個早晨點。</h2><p>新增候選點後再生成路線。</p></div>`;
      return;
    }
    const plan = buildPlan();
    const [title, description] = verdict(plan);
    const steps = timeline(plan);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title);
    outputNode.innerHTML = `
      <div class="hm-result-head">
        <div><p class="hm-kicker">T049 手寫版 / hidden morning route</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="hm-score" aria-label="早晨空城可行度">${plan.routeScore}</div>
      </div>
      <div class="hm-timeline">
        ${steps.map((step, index) => `<article class="hm-step"><span>${escapeHtml(step[0])} / ${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(step[1])}</h3><p>${escapeHtml(step[2])}</p><ul><li>起床可行度 ${plan.startScore}/100</li><li>空城主題：${escapeHtml(themeLabel(fields.theme.value))}</li></ul></article>`).join("")}
      </div>
      <div class="hm-copy-grid">
        <section class="hm-rule"><h3>睡過頭備案</h3><p>${escapeHtml(backupRule(plan))}</p></section>
        <section class="hm-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="hm-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="hm-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="hm-primary" data-app-link href="${appStore}?ct=tool_hidden_morning_manual_${plan.routeScore}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateStop(id, key, value) {
    stops = stops.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addStop() {
    if (stops.length >= 8) {
      showToast("最多先比較 8 個早晨點");
      return;
    }
    stops.push(stop(`hm-${Date.now()}`, "新的早晨點", "photo", 360, 10, 76, 60));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "首爾鐘路";
    fields.wake.value = "330";
    fields.sunrise.value = "345";
    fields.theme.value = "market";
    fields.energy.value = "74";
    fields.sleep.value = "28";
    fields.safety.value = "68";
    fields.solo.checked = true;
    stops = [
      stop("hm-a", "清溪川空景", "water", 315, 9, 88, 45),
      stop("hm-b", "廣藏市場第一輪", "market", 420, 12, 72, 94),
      stop("hm-c", "北村上坡街", "photo", 360, 16, 92, 52),
      stop("hm-d", "早開湯飯店", "breakfast", 390, 8, 70, 88)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.energy.textContent = `${fields.energy.value}/100`;
    labels.sleep.textContent = `${fields.sleep.value}/100`;
    labels.safety.textContent = `${fields.safety.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label")?.querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "walk" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function formatTime(minutes) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-stop]").addEventListener("click", addStop);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    stopsNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-stop-id]");
      if (!row || !event.target.dataset.key) return;
      updateStop(row.dataset.stopId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    stopsNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-stop-id]");
      if (!row || !event.target.dataset.key) return;
      updateStop(row.dataset.stopId, event.target.dataset.key, event.target.value);
      renderPlacesAfterStopChange();
    });
    stopsNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-stop-id]");
      stops = stops.filter((item) => item.id !== row.dataset.stopId);
      renderAll();
    });
  }

  function renderPlacesAfterStopChange() {
    renderStops();
    renderOutput();
  }

  function renderAll() {
    updateLabels();
    renderStops();
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
