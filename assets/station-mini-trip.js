(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const stopListNode = document.querySelector("[data-stops]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    station: document.querySelector("[data-station]"),
    window: document.querySelector("[data-window]"),
    buffer: document.querySelector("[data-buffer]"),
    luggage: document.querySelector("[data-luggage]"),
    rain: document.querySelector("[data-rain]"),
    walk: document.querySelector("[data-walk]"),
    curiosity: document.querySelector("[data-curiosity]")
  };
  const labels = {
    walk: document.querySelector("[data-walk-label]"),
    curiosity: document.querySelector("[data-curiosity-label]")
  };

  let stops = [
    stop("第二市場小吃", "eat", 10, 34, 78, 70),
    stop("舊城選物店", "shop", 12, 30, 64, 82),
    stop("有座位咖啡", "rest", 7, 40, 88, 52),
    stop("綠川短散步", "walk", 9, 24, 72, 58)
  ];

  function stop(name, type, walk, minutes, comfort, local) {
    return { id: crypto.randomUUID(), name, type, walk, minutes, comfort, local };
  }

  function types() {
    return [
      { value: "eat", label: "吃" },
      { value: "shop", label: "逛" },
      { value: "rest", label: "休息" },
      { value: "walk", label: "散步" },
      { value: "culture", label: "文化" }
    ];
  }

  function typeLabel(value) {
    const found = types().find((item) => item.value === value);
    return found ? found.label : "停靠點";
  }

  function renderStops() {
    stopListNode.innerHTML = stops.map((item) => `
      <article class="sm-stop" data-stop-id="${escapeAttr(item.id)}">
        <label>停靠點<input data-key="name" value="${escapeAttr(item.name)}" aria-label="停靠點"></label>
        <label>類型<select data-key="type" aria-label="停靠類型">${types().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}</select></label>
        ${rangeControl("walk", "步行", item.walk, 1, 35, "分")}
        ${rangeControl("minutes", "停留", item.minutes, 10, 90, "分")}
        ${rangeControl("comfort", "舒服", item.comfort, 1, 100, "")}
        <button class="sm-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `<label><span class="sm-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}"></label>`;
  }

  function scoreStop(item) {
    const walkPenalty = Math.max(0, Number(item.walk) - Number(fields.walk.value)) * 1.8;
    const luggagePenalty = fields.luggage.value === "large" && Number(item.walk) > 10 ? 14 : fields.luggage.value === "carry" && Number(item.walk) > 14 ? 8 : 0;
    const rainBonus = fields.rain.checked && (item.type === "rest" || item.type === "shop" || item.type === "culture") ? 12 : 0;
    const curiosityBonus = Number(item.local) * Number(fields.curiosity.value) / 500;
    return Math.max(1, Math.min(99, Math.round(38 + Number(item.comfort) * 0.34 + curiosityBonus + rainBonus - walkPenalty - luggagePenalty)));
  }

  function rankedStops() {
    return stops.map((item) => ({ ...item, score: scoreStop(item) })).sort((a, b) => b.score - a.score);
  }

  function pick(type, used) {
    return rankedStops().find((item) => item.type === type && !used.has(item.id));
  }

  function buildPlan() {
    const used = new Set();
    const order = ["eat", "shop", "rest"];
    if (Number(fields.window.value) < 60) order.splice(1, 1);
    if (Number(fields.curiosity.value) > 75) order[1] = "culture";
    const selected = [];
    order.forEach((type) => {
      const found = pick(type, used) || rankedStops().find((item) => !used.has(item.id));
      if (found) {
        used.add(found.id);
        selected.push(found);
      }
    });
    const total = selected.reduce((sum, item) => sum + Number(item.minutes) + Number(item.walk), Number(fields.buffer.value));
    const score = Math.round(selected.reduce((sum, item) => sum + item.score, 0) / Math.max(1, selected.length) - Math.max(0, total - Number(fields.window.value)) * 0.7);
    return { selected, total, score: Math.max(1, Math.min(99, score)) };
  }

  function profile(score) {
    if (score >= 78) return ["車站就能玩", "這個空檔足夠排成一段完整微旅行，不只是消磨時間。"];
    if (score >= 55) return ["做短版剛好", "可以安排吃和休息，但不要硬塞太多店。"];
    return ["留在站內比較穩", "時間、行李或天氣壓力偏高，建議站內吃喝休息。"];
  }

  function note(item) {
    if (item.type === "eat") return "先補能量，後面才不會用疲勞做決策。";
    if (item.type === "shop") return "只逛一間，不把空檔變成採購壓力。";
    if (item.type === "rest") return "坐下、充電、整理下一段票券。";
    if (item.type === "walk") return "走一小段看城市，不離車站太遠。";
    return "用一個小文化點讓車站空檔變得有記憶。";
  }

  function ruleText(plan) {
    if (plan.total > Number(fields.window.value)) return "總時間偏緊，刪掉中段，只保留吃與回站。";
    if (fields.luggage.value === "large") return "大行李狀態不要上坡、不要進小巷，先找可坐可放行李的點。";
    if (fields.rain.checked) return "下雨時不要安排無遮蔽散步，優先室內點。";
    return `至少保留 ${fields.buffer.value} 分鐘回站緩衝，不壓線進月台。`;
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 車站微旅行排好了：${fields.station.value} 空檔是「${title}」${plan.score}/100。順序：${plan.selected.map((item) => item.name).join(" → ")}。規則：${ruleText(plan)}`;
  }

  function promptFor(plan, title) {
    const stopText = stops.map((item) => `${item.name}：${typeLabel(item.type)}，步行 ${item.walk} 分，停留 ${item.minutes} 分，舒服 ${item.comfort}，在地感 ${item.local}`).join("；");
    const routeText = plan.selected.map((item, index) => `${index + 1}. ${item.name}：${note(item)}`).join("；");
    return `請用 ChillOut 幫我把「車站微旅行」排成 ${fields.station.value} 周邊的短行程。可用時間 ${fields.window.value} 分鐘，回站緩衝 ${fields.buffer.value} 分鐘，行李狀態 ${luggageLabel(fields.luggage.value)}，${fields.rain.checked ? "可能下雨" : "天氣正常"}，步行上限 ${fields.walk.value} 分鐘，探索慾望 ${fields.curiosity.value}/100。候選點：${stopText}。工具結果是「${title}」，分數 ${plan.score}/100，建議順序：${routeText}。請補實際動線、回站時間、雨備、廁所、置物與下一班交通提醒。`;
  }

  function luggageLabel(value) {
    if (value === "large") return "大行李";
    if (value === "carry") return "登機箱";
    if (value === "light") return "輕便背包";
    return "無行李";
  }

  function renderOutput() {
    if (!stops.length) {
      outputNode.innerHTML = `<div class="sm-empty"><p class="sm-kicker">Result</p><h2>至少保留一個車站周邊點。</h2><p>微旅行需要停靠點。</p></div>`;
      return;
    }
    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title);
    outputNode.innerHTML = `
      <div class="sm-result-head">
        <div><p class="sm-kicker">T044 station mini trip</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)} 估算含回站緩衝 ${plan.total} 分鐘。</p></div>
        <div class="sm-score" aria-label="車站微旅行分數">${plan.score}</div>
      </div>
      <div class="sm-route">${plan.selected.map((item, index) => `<article class="sm-card"><span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(typeLabel(item.type))}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(note(item))}</p><ul><li>步行 ${item.walk} 分 / 停留 ${item.minutes} 分</li><li>舒服 ${item.comfort} / 在地感 ${item.local}</li></ul></article>`).join("")}</div>
      <div class="sm-copy-grid">
        <section class="sm-copy-box"><h3>回站規則</h3><p>${escapeHtml(ruleText(plan))}</p></section>
        <section class="sm-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="sm-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="sm-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="sm-primary" data-app-link href="${appStore}?ct=tool_station_mini_trip_manual_${plan.score}">丟進 ChillOut</a>
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
    if (stops.length >= 9) {
      showToast("最多先比較 9 個點");
      return;
    }
    stops.push(stop("新車站點", "rest", 8, 30, 70, 50));
    renderAll();
  }

  function loadSample() {
    fields.station.value = "京都站";
    fields.window.value = "90";
    fields.buffer.value = "15";
    fields.luggage.value = "carry";
    fields.rain.checked = true;
    fields.walk.value = "12";
    fields.curiosity.value = "72";
    stops = [
      stop("地下街拉麵小碗", "eat", 5, 28, 80, 50),
      stop("伊勢丹屋上", "walk", 8, 22, 78, 68),
      stop("車站書店", "shop", 6, 24, 86, 60),
      stop("咖啡充電座", "rest", 4, 32, 92, 40)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.walk.textContent = `${fields.walk.value} 分鐘`;
    labels.curiosity.textContent = `${fields.curiosity.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "walk" || input.dataset.key === "minutes" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
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
    stopListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-stop-id]");
      if (!row || !event.target.dataset.key) return;
      updateStop(row.dataset.stopId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    stopListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-stop-id]");
      if (!row || !event.target.dataset.key) return;
      updateStop(row.dataset.stopId, event.target.dataset.key, event.target.value);
      renderOutput();
    });
    stopListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-stop-id]");
      stops = stops.filter((item) => item.id !== row.dataset.stopId);
      renderAll();
    });
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
