(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const placesNode = document.querySelector("[data-places]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    area: document.querySelector("[data-area]"),
    flavor: document.querySelector("[data-flavor]"),
    slots: document.querySelector("[data-slots]"),
    queue: document.querySelector("[data-queue]"),
    budget: document.querySelector("[data-budget]"),
    walk: document.querySelector("[data-walk]"),
    offpeak: document.querySelector("[data-offpeak]"),
    avoidHype: document.querySelector("[data-avoid-hype]"),
    rain: document.querySelector("[data-rain]")
  };
  const labels = {
    budget: document.querySelector("[data-budget-label]"),
    walk: document.querySelector("[data-walk-label]"),
    offpeak: document.querySelector("[data-offpeak-label]")
  };

  let places = [
    place("nf-1", "市場牛肉湯", "local", 18, 42, 9, 86),
    place("nf-2", "老宅咖啡甜點", "coffee", 8, 58, 12, 78),
    place("nf-3", "巷口米糕", "local", 4, 28, 6, 80),
    place("nf-4", "排隊名店替代麵", "comfort", 12, 46, 11, 83),
    place("nf-5", "夜市邊緣炸物", "market", 6, 34, 8, 74)
  ];

  function place(id, name, type, queue, price, walk, joy) {
    return { id, name, type, queue, price, walk, joy };
  }

  function typeOptions() {
    return [
      ["local", "小吃"],
      ["coffee", "咖啡"],
      ["market", "市場"],
      ["comfort", "正餐"],
      ["sweet", "甜點"]
    ];
  }

  function typeLabel(value) {
    const found = typeOptions().find((item) => item[0] === value);
    return found ? found[1] : "吃喝";
  }

  function renderPlaces() {
    placesNode.innerHTML = places.map((item) => `
      <article class="nf-place" data-place-id="${escapeAttr(item.id)}">
        <label>店家 / 食物<input data-key="name" value="${escapeAttr(item.name)}" placeholder="例如：市場飯糰、巷口麵店"></label>
        <label>類型<select data-key="type">${typeOptions().map(([value, label]) => `<option value="${value}"${value === item.type ? " selected" : ""}>${label}</option>`).join("")}</select></label>
        ${rangeControl("queue", "排隊", item.queue, 0, 80, "分")}
        ${rangeControl("price", "價格", item.price, 1, 100, "")}
        ${rangeControl("walk", "距離", item.walk, 1, 35, "分")}
        ${rangeControl("joy", "滿足", item.joy, 1, 100, "")}
        <button type="button" class="nf-remove" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `<label><span class="nf-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}"></label>`;
  }

  function scorePlace(item) {
    const queueLimit = Number(fields.queue.value);
    const queuePenalty = Math.max(0, item.queue - queueLimit) * (fields.avoidHype.checked ? 1.35 : 0.82);
    const pricePenalty = Math.max(0, item.price - Number(fields.budget.value)) * 0.32;
    const walkPenalty = Math.max(0, item.walk - walkLimit()) * 1.45;
    const flavorBonus = fields.flavor.value === "mixed" || fields.flavor.value === item.type ? 12 : 0;
    const rainBonus = fields.rain.checked && (item.type === "coffee" || item.type === "comfort") ? 8 : 0;
    const offpeakBonus = Number(fields.offpeak.value) > 70 && item.queue > queueLimit ? 8 : 0;
    return Math.max(1, Math.min(99, Math.round(item.joy + flavorBonus + rainBonus + offpeakBonus - queuePenalty - pricePenalty - walkPenalty)));
  }

  function walkLimit() {
    return Math.round(5 + Number(fields.walk.value) * 0.24);
  }

  function rankedPlaces() {
    return places.map((item) => ({ ...item, score: scorePlace(item) })).sort((a, b) => b.score - a.score);
  }

  function buildRoute() {
    const slotCount = Number(fields.slots.value);
    const timeTemplates = {
      3: ["10:20", "13:40", "17:30"],
      4: ["09:40", "11:30", "14:40", "17:40"],
      5: ["09:20", "11:10", "13:50", "16:20", "19:10"]
    };
    const labelsByCount = {
      3: ["早午餐", "咖啡/甜點", "早晚餐"],
      4: ["早餐", "午餐錯峰", "下午補糖", "早晚餐"],
      5: ["早餐", "午餐前", "下午主食", "甜點", "夜間收尾"]
    };
    const chosen = [];
    const used = new Set();
    const ranked = rankedPlaces();
    for (let index = 0; index < slotCount; index += 1) {
      const targetType = targetTypeFor(index, slotCount);
      const found = ranked.find((item) => !used.has(item.id) && (targetType === "any" || item.type === targetType)) || ranked.find((item) => !used.has(item.id));
      if (!found) break;
      used.add(found.id);
      chosen.push({ ...found, time: timeTemplates[slotCount][index], slotLabel: labelsByCount[slotCount][index] });
    }
    const totalQueue = chosen.reduce((sum, item) => sum + Number(item.queue), 0);
    const totalPrice = chosen.reduce((sum, item) => sum + Number(item.price), 0);
    const totalWalk = chosen.reduce((sum, item) => sum + Number(item.walk), 0);
    const avgJoy = Math.round(chosen.reduce((sum, item) => sum + Number(item.joy), 0) / Math.max(1, chosen.length));
    const routeScore = Math.max(1, Math.min(99, Math.round(avgJoy + Number(fields.offpeak.value) * 0.14 - Math.max(0, totalQueue - Number(fields.queue.value) * chosen.length) * 0.7 - Math.max(0, totalPrice - Number(fields.budget.value) * chosen.length) * 0.12)));
    return { chosen, totalQueue, totalPrice, totalWalk, avgJoy, routeScore };
  }

  function targetTypeFor(index, slotCount) {
    if (fields.flavor.value !== "mixed") {
      if (index === 0 && fields.flavor.value !== "coffee") return fields.flavor.value;
      if (index === 1 && slotCount >= 4) return fields.flavor.value;
    }
    const sequence = slotCount === 5 ? ["local", "comfort", "market", "coffee", "sweet"] : slotCount === 4 ? ["local", "comfort", "coffee", "market"] : ["local", "coffee", "comfort"];
    return sequence[index] || "any";
  }

  function verdict(route) {
    if (route.routeScore >= 82) return ["不排隊也吃得很漂亮", "這條路線有足夠滿足度，又沒有讓排隊變成旅行主角。可以直接丟進 ChillOut 補地圖與雨備。"];
    if (route.routeScore >= 62) return ["好吃，但要守住錯峰", "路線可行，但其中幾站需要靠早到、晚吃或替代店來避免排隊膨脹。"];
    return ["先刪掉一個名店慾望", "目前排隊、距離或價格吃掉太多體力。先刪掉最爆紅的一站，改成同味型替代。"];
  }

  function strategy(route) {
    const queueLimit = Number(fields.queue.value);
    if (route.totalQueue <= queueLimit * route.chosen.length) return "規則：每一站都在排隊上限內，不要臨時加爆紅店。看到隊伍超過上限就直接切下一站。";
    if (Number(fields.offpeak.value) >= 75) return "規則：把最可能排隊的店放在 11:30 前或 17:40 前，過了錯峰窗口就改替代店。";
    if (fields.rain.checked) return "規則：雨天不要為了名店站在戶外排隊。優先選能坐下、能避雨、能充電的店。";
    return "規則：不要讓一間店決定整天心情。排隊超過上限時，用同類型、同區域、少 15 分鐘等待的替代店補上。";
  }

  function shareCopy(route, title) {
    return `我用 ChillOut 零排隊美食路線排了 ${fields.area.value}：${title}，分數 ${route.routeScore}/100。今天順序是 ${route.chosen.map((item) => `${item.time} ${item.name}`).join(" → ")}。我的排隊規則：${strategy(route)}`;
  }

  function promptFor(route, title) {
    const placesText = places.map((item) => `${item.name}，類型 ${typeLabel(item.type)}，排隊 ${item.queue} 分，價格 ${item.price}/100，步行 ${item.walk} 分，滿足 ${item.joy}/100`).join("；");
    const routeText = route.chosen.map((item) => `${item.time} ${item.slotLabel}：${item.name}`).join("；");
    return `請用 ChillOut 幫我把「零排隊美食路線」排成可走的一日行程。區域是 ${fields.area.value}，味覺主題 ${flavorLabel(fields.flavor.value)}，餐點數 ${fields.slots.value}，排隊上限 ${fields.queue.value} 分，預算 ${fields.budget.value}/100，步行半徑約 ${walkLimit()} 分，錯峰意願 ${fields.offpeak.value}/100，${fields.avoidHype.checked ? "避開社群爆紅店" : "可以接受名店"}，${fields.rain.checked ? "可能下雨" : "天氣正常"}。候選店家：${placesText}。工具結果是「${title}」，路線分數 ${route.routeScore}/100，建議順序：${routeText}。請補上步行動線、雨天座位備案、排隊超過上限的替代店、每站停留時間和社群分享標題。`;
  }

  function flavorLabel(value) {
    if (value === "local") return "在地小吃";
    if (value === "coffee") return "咖啡甜點";
    if (value === "market") return "市場掃街";
    if (value === "comfort") return "舒服正餐";
    return "什麼都想吃一點";
  }

  function metric(label, value) {
    return `<div class="nf-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    if (!places.length) {
      outputNode.innerHTML = `<div class="nf-empty"><p class="nf-kicker">Result</p><h2>至少需要一個候選店家。</h2><p>請新增店家後再生成路線。</p></div>`;
      return;
    }
    const route = buildRoute();
    const [title, description] = verdict(route);
    const share = shareCopy(route, title);
    const prompt = promptFor(route, title);
    outputNode.innerHTML = `
      <div class="nf-result-head">
        <div><p class="nf-kicker">T048 手寫版 / no-line food route</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="nf-score" aria-label="零排隊美食路線分數">${route.routeScore}</div>
      </div>
      <div class="nf-metrics">
        ${metric("總排隊", `${route.totalQueue} 分`)}
        ${metric("價格總量", `${route.totalPrice} 點`)}
        ${metric("步行總量", `${route.totalWalk} 分`)}
        ${metric("味覺滿足", `${route.avgJoy}/100`)}
      </div>
      <div class="nf-timeline count-${route.chosen.length}">
        ${route.chosen.map((item) => `<article class="nf-stop"><span>${escapeHtml(item.time)} / ${escapeHtml(item.slotLabel)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(typeLabel(item.type))}，預估排隊 ${item.queue} 分。${item.queue > Number(fields.queue.value) ? "這站要錯峰或準備替代。" : "這站在排隊上限內。"}</p><ul><li>價格 ${item.price}/100</li><li>步行 ${item.walk} 分 / 滿足 ${item.joy}</li></ul></article>`).join("")}
      </div>
      <div class="nf-copy-grid">
        <section class="nf-rule"><h3>替代規則</h3><p>${escapeHtml(strategy(route))}</p></section>
        <section class="nf-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="nf-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="nf-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="nf-primary" data-app-link href="${appStore}?ct=tool_no_line_food_route_manual_${route.routeScore}">丟進 ChillOut</a>
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
      showToast("最多先比較 8 間");
      return;
    }
    places.push(place(`nf-${Date.now()}`, "新的候選店", "local", 8, 45, 10, 72));
    renderAll();
  }

  function loadSample() {
    fields.area.value = "東京下北澤";
    fields.flavor.value = "mixed";
    fields.slots.value = "5";
    fields.queue.value = "10";
    fields.budget.value = "74";
    fields.walk.value = "58";
    fields.offpeak.value = "84";
    fields.avoidHype.checked = true;
    fields.rain.checked = true;
    places = [
      place("nf-a", "車站旁飯糰", "local", 3, 24, 4, 72),
      place("nf-b", "老屋咖啡布丁", "coffee", 9, 58, 8, 86),
      place("nf-c", "劇場前咖哩", "comfort", 14, 66, 9, 88),
      place("nf-d", "市場炸物小攤", "market", 5, 34, 7, 74),
      place("nf-e", "名店替代拉麵", "comfort", 10, 62, 12, 82),
      place("nf-f", "深夜甜甜圈", "sweet", 6, 42, 11, 76)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.budget.textContent = `${fields.budget.value}/100`;
    labels.walk.textContent = `${fields.walk.value}/100`;
    labels.offpeak.textContent = `${fields.offpeak.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label")?.querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "queue" || input.dataset.key === "walk" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
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
      renderPlaces();
      renderOutput();
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
