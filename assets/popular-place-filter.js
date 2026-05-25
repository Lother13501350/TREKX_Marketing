(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const placesNode = document.querySelector("[data-places]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    hours: document.querySelector("[data-hours]"),
    style: document.querySelector("[data-style]"),
    delete: document.querySelector("[data-delete]"),
    crowd: document.querySelector("[data-crowd]"),
    transit: document.querySelector("[data-transit]"),
    fomo: document.querySelector("[data-fomo]"),
    rain: document.querySelector("[data-rain]"),
    elder: document.querySelector("[data-elder]")
  };
  const labels = {
    crowd: document.querySelector("[data-crowd-label]"),
    transit: document.querySelector("[data-transit-label]"),
    fomo: document.querySelector("[data-fomo-label]")
  };

  let places = [
    place("pf-1", "淺草寺雷門", "classic", 88, 78, 45, 32, 76, 54),
    place("pf-2", "澀谷十字路口", "photo", 92, 55, 28, 22, 68, 72),
    place("pf-3", "晴空塔觀景台", "view", 80, 62, 70, 38, 82, 45),
    place("pf-4", "下町小巷散步", "local", 42, 72, 8, 18, 58, 86)
  ];

  function place(id, name, type, hype, desire, queue, transit, unique, alternative) {
    return { id, name, type, hype, desire, queue, transit, unique, alternative };
  }

  function typeOptions() {
    return [["classic", "代表景點"], ["photo", "拍照點"], ["view", "觀景"], ["museum", "展館"], ["local", "在地替代"]];
  }

  function typeLabel(value) {
    const found = typeOptions().find((item) => item[0] === value);
    return found ? found[1] : "景點";
  }

  function renderPlaces() {
    placesNode.innerHTML = places.map((item) => `
      <article class="pf-place" data-place-id="${escapeAttr(item.id)}">
        <label>景點<input data-key="name" value="${escapeAttr(item.name)}" placeholder="例如：熱門景點、觀景台、老街"></label>
        <label>類型<select data-key="type">${typeOptions().map(([value, label]) => `<option value="${value}"${value === item.type ? " selected" : ""}>${label}</option>`).join("")}</select></label>
        ${rangeControl("hype", "熱門", item.hype)}
        ${rangeControl("desire", "期待", item.desire)}
        ${rangeControl("queue", "排隊", item.queue)}
        ${rangeControl("transit", "交通", item.transit)}
        ${rangeControl("unique", "獨特", item.unique)}
        ${rangeControl("alternative", "替代", item.alternative)}
        <button type="button" class="pf-remove" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value) {
    return `<label><span class="pf-mini">${label}<strong>${value}</strong></span><input data-key="${key}" type="range" min="1" max="100" value="${value}" aria-label="${label}"></label>`;
  }

  function scorePlace(item) {
    const styleBonus = styleMatch(item);
    const crowdPenalty = Math.max(0, item.hype - Number(fields.crowd.value)) * 0.15 + Math.max(0, item.queue - Number(fields.crowd.value)) * 0.22;
    const transitPenalty = Math.max(0, item.transit - Number(fields.transit.value)) * 0.28;
    const elderPenalty = fields.elder.checked ? (item.queue * 0.18 + item.transit * 0.16) : 0;
    const rainPenalty = fields.rain.checked && item.type !== "museum" ? Math.max(0, item.hype - 45) * 0.08 : 0;
    const fomoBonus = Number(fields.fomo.value) * item.hype / 900;
    const deletePressure = Number(fields.delete.value) * item.alternative / 900;
    const firstTripCredit = fields.style.value === "first" && (item.type === "classic" || item.type === "view") ? 8 : 0;
    return Math.max(1, Math.min(99, Math.round(item.desire * 0.45 + item.unique * 0.38 + styleBonus + firstTripCredit + fomoBonus - crowdPenalty - transitPenalty - elderPenalty - rainPenalty - deletePressure)));
  }

  function styleMatch(item) {
    if (fields.style.value === "first" && item.type === "classic") return 12;
    if (fields.style.value === "photo" && item.type === "photo") return 14;
    if (fields.style.value === "local" && item.type === "local") return 16;
    if (fields.style.value === "slow" && item.queue < 25 && item.transit < 35) return 12;
    return 0;
  }

  function decisions() {
    return places.map((item) => {
      const score = scorePlace(item);
      let action = "drop";
      if (score >= 68) action = "keep";
      else if (score >= 45) action = "remix";
      return { ...item, score, action };
    }).sort((a, b) => b.score - a.score);
  }

  function buildResult() {
    const rows = decisions();
    const keep = rows.filter((item) => item.action === "keep");
    const remix = rows.filter((item) => item.action === "remix");
    const drop = rows.filter((item) => item.action === "drop");
    const savedMinutes = drop.reduce((sum, item) => sum + Math.round(item.queue * 0.75 + item.transit * 0.9), 0) + remix.reduce((sum, item) => sum + Math.round(item.queue * 0.28), 0);
    const timeLoad = rows.reduce((sum, item) => sum + item.queue + item.transit, 0);
    const avgScore = Math.round(rows.reduce((sum, item) => sum + item.score, 0) / Math.max(1, rows.length));
    const routeFit = Math.max(1, Math.min(99, Math.round(avgScore + savedMinutes / 8 - Math.max(0, timeLoad - Number(fields.hours.value) * 60) * 0.06)));
    return { rows, keep, remix, drop, savedMinutes, timeLoad, avgScore, routeFit };
  }

  function verdict(result) {
    if (result.routeFit >= 78) return ["清單變乾淨了", "你保留的是有理由的景點，不是被必去清單拖著走。把保留和改造點丟進 ChillOut，就能重排順路動線。"];
    if (result.routeFit >= 56) return ["再改造一個", "目前清單已經變好，但仍有景點的排隊或交通成本偏高。選一個改成低壓替代。"];
    return ["必去清單太重了", "這一天被熱門景點綁住了。先刪掉最低分的點，不然交通和排隊會吃掉旅行心情。"];
  }

  function reason(item) {
    if (item.action === "keep") return `${item.name} 的期待和獨特性撐得住成本，保留但要安排在低人潮時段。`;
    if (item.action === "remix") return `${item.name} 不一定要照原版玩，改成外圍拍照、附近散步或錯峰進場。`;
    return `${item.name} 的排隊/交通成本超過它帶來的旅行價值，建議刪掉或換附近替代。`;
  }

  function lane(items, label, title) {
    const list = items.length ? items.map((item) => `<li>${escapeHtml(item.name)}：${item.score} 分。${escapeHtml(reason(item))}</li>`).join("") : "<li>目前沒有景點落在這一類。</li>";
    return `<article class="pf-lane"><span>${escapeHtml(label)}</span><h3>${escapeHtml(title)}</h3><ul>${list}</ul></article>`;
  }

  function routeRule(result) {
    if (result.drop.length) return `先刪 ${result.drop[0].name}。省下的時間不要再塞新熱門點，拿去補一段附近咖啡、散步或回飯店休息。`;
    if (result.remix.length) return `把 ${result.remix[0].name} 改造成錯峰或外圍玩法：不完整進場，也不硬排隊。`;
    return "清單可以保留，但熱門點之間要用休息段隔開，不要連續排三個高刺激景點。";
  }

  function shareCopy(result, title) {
    return `我用 ChillOut 熱門景點過濾器整理了 ${fields.city.value}：${title}，路線分數 ${result.routeFit}/100。保留 ${result.keep.map((item) => item.name).join("、") || "無"}；改造 ${result.remix.map((item) => item.name).join("、") || "無"}；刪掉 ${result.drop.map((item) => item.name).join("、") || "無"}。規則：${routeRule(result)}`;
  }

  function promptFor(result, title) {
    const detail = result.rows.map((item) => `${item.name}，類型 ${typeLabel(item.type)}，分數 ${item.score}，決策 ${item.action}，熱門 ${item.hype}，期待 ${item.desire}，排隊 ${item.queue}，交通 ${item.transit}，獨特 ${item.unique}`).join("；");
    return `請用 ChillOut 幫我把「熱門景點過濾器」結果重排成一天行程。城市/日期是 ${fields.city.value}，可用時間 ${fields.hours.value} 小時，旅行風格 ${styleLabel(fields.style.value)}，刪景點勇氣 ${fields.delete.value}/100，人潮忍受 ${fields.crowd.value}/100，交通忍受 ${fields.transit.value}/100，FOMO 壓力 ${fields.fomo.value}/100，${fields.rain.checked ? "可能下雨" : "天氣正常"}，${fields.elder.checked ? "同行者不適合久站或多轉乘" : "同行者體力正常"}。景點評估：${detail}。工具判斷是「${title}」，路線分數 ${result.routeFit}/100。請保留值得的景點、改造中間分數景點、刪掉低分點，補上附近替代玩法、休息段、交通順序和分享標題。`;
  }

  function styleLabel(value) {
    if (value === "slow") return "慢慢走，不想趕";
    if (value === "photo") return "照片與畫面優先";
    if (value === "local") return "在地感優先";
    return "第一次來，想保留代表性";
  }

  function metric(label, value) {
    return `<div class="pf-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    if (!places.length) {
      outputNode.innerHTML = `<div class="pf-empty"><p class="pf-kicker">Result</p><h2>至少需要一個候選景點。</h2><p>新增景點後再過濾。</p></div>`;
      return;
    }
    const result = buildResult();
    const [title, description] = verdict(result);
    const share = shareCopy(result, title);
    const prompt = promptFor(result, title);
    outputNode.innerHTML = `
      <div class="pf-result-head">
        <div><p class="pf-kicker">T050 手寫版 / popular place filter</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="pf-score" aria-label="熱門景點過濾分數">${result.routeFit}</div>
      </div>
      <div class="pf-metrics">
        ${metric("保留", `${result.keep.length} 個`)}
        ${metric("改造", `${result.remix.length} 個`)}
        ${metric("刪掉", `${result.drop.length} 個`)}
        ${metric("省下", `${result.savedMinutes} 分`)}
      </div>
      <div class="pf-lanes">
        ${lane(result.keep, "Keep", "保留")}
        ${lane(result.remix, "Remix", "改造玩法")}
        ${lane(result.drop, "Drop", "刪掉或替代")}
      </div>
      <div class="pf-copy-grid">
        <section class="pf-rule"><h3>路線重排規則</h3><p>${escapeHtml(routeRule(result))}</p></section>
        <section class="pf-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="pf-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="pf-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="pf-primary" data-app-link href="${appStore}?ct=tool_popular_place_filter_manual_${result.routeFit}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updatePlace(id, key, value) {
    places = places.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addPlace() {
    if (places.length >= 8) {
      showToast("最多先比較 8 個景點");
      return;
    }
    places.push(place(`pf-${Date.now()}`, "新的熱門景點", "classic", 70, 60, 40, 35, 62, 60));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "巴黎第一天";
    fields.hours.value = "6";
    fields.style.value = "first";
    fields.delete.value = "60";
    fields.crowd.value = "38";
    fields.transit.value = "58";
    fields.fomo.value = "82";
    fields.rain.checked = true;
    fields.elder.checked = false;
    places = [
      place("pf-a", "羅浮宮外圍", "classic", 94, 82, 75, 38, 92, 42),
      place("pf-b", "蒙馬特坡道", "photo", 86, 76, 44, 32, 78, 64),
      place("pf-c", "塞納河散步", "local", 48, 70, 4, 16, 68, 88),
      place("pf-d", "艾菲爾塔登頂", "view", 96, 58, 90, 44, 86, 52)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.crowd.textContent = `${fields.crowd.value}/100`;
    labels.transit.textContent = `${fields.transit.value}/100`;
    labels.fomo.textContent = `${fields.fomo.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label")?.querySelector("strong");
    if (strong) strong.textContent = input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-place]").addEventListener("click", addPlace);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    placesNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-place-id]");
      if (!row || !event.target.dataset.key) return;
      updatePlace(row.dataset.placeId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    placesNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-place-id]");
      if (!row || !event.target.dataset.key) return;
      updatePlace(row.dataset.placeId, event.target.dataset.key, event.target.value);
      renderAll();
    });
    placesNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-place-id]");
      places = places.filter((item) => item.id !== row.dataset.placeId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderPlaces();
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
