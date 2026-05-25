(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const townsNode = document.querySelector("[data-towns]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    origin: document.querySelector("[data-origin]"),
    goal: document.querySelector("[data-goal]"),
    maxTransfer: document.querySelector("[data-max-transfer]"),
    weather: document.querySelector("[data-weather]")
  };

  let towns = [
    town("st-1", "九份旁邊的瑞芳", 48, 63, 78, 82, 58, 42, "山城漂亮，但人潮與天氣要控管。"),
    town("st-2", "宜蘭頭城", 72, 70, 74, 80, 68, 35, "海邊、咖啡與老街都能輕鬆串起來。"),
    town("st-3", "新竹內灣", 84, 72, 69, 76, 54, 48, "老街明確，適合慢慢走，但回程要留意。")
  ];

  function town(id, name, transfer, quiet, food, scenery, rain, lateRisk, note) {
    return { id, name, transfer, quiet, food, scenery, rain, lateRisk, note };
  }

  const goalWeights = {
    quiet: { quiet: 0.38, food: 0.12, scenery: 0.18, rain: 0.14, transfer: 0.12, lateRisk: 0.06, label: "安靜補血" },
    food: { quiet: 0.12, food: 0.40, scenery: 0.14, rain: 0.12, transfer: 0.14, lateRisk: 0.08, label: "食物小旅行" },
    visual: { quiet: 0.14, food: 0.12, scenery: 0.40, rain: 0.10, transfer: 0.16, lateRisk: 0.08, label: "漂亮散步" },
    culture: { quiet: 0.22, food: 0.18, scenery: 0.22, rain: 0.18, transfer: 0.12, lateRisk: 0.08, label: "書店與老街" },
    family: { quiet: 0.24, food: 0.16, scenery: 0.12, rain: 0.26, transfer: 0.14, lateRisk: 0.08, label: "親子低壓" }
  };

  function renderTowns() {
    townsNode.innerHTML = towns.map((item) => `
      <article class="st-town" data-town-id="${escapeAttr(item.id)}">
        <div class="st-town-top">
          <h3>${escapeHtml(item.name || "未命名小鎮")}</h3>
          <button type="button" class="st-remove" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
        </div>
        <label>小鎮名稱<input data-key="name" value="${escapeAttr(item.name)}" placeholder="例如：鎌倉、由布院、鹿港"></label>
        <label>單程交通分鐘<input data-key="transfer" type="number" min="10" max="220" value="${item.transfer}"></label>
        ${rangeControl("quiet", "安靜度", item.quiet)}
        ${rangeControl("food", "食物密度", item.food)}
        ${rangeControl("scenery", "散步風景", item.scenery)}
        ${rangeControl("rain", "雨天備案", item.rain)}
        ${rangeControl("lateRisk", "末班車風險", item.lateRisk)}
        <label>備註<input data-key="note" value="${escapeAttr(item.note)}" placeholder="例如：老街明確、店休多、海邊漂亮"></label>
        <div class="st-town-note">${escapeHtml(shortDiagnosis(item))}</div>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value) {
    return `<label class="st-range"><span>${label}<strong>${value}/100</strong></span><input data-key="${key}" type="range" min="1" max="100" value="${value}" aria-label="${label}"></label>`;
  }

  function shortDiagnosis(item) {
    const transferText = item.transfer > Number(fields.maxTransfer.value) ? "交通偏遠，必須有非常明確的目的。" : "交通在可接受範圍內。";
    const weatherText = fields.weather.value === "rain" && item.rain < 60 ? "雨天備案不足。" : "天氣彈性可控。";
    const moodText = bestTrait(item);
    return `${transferText} ${weatherText} 最強項是${moodText}。`;
  }

  function bestTrait(item) {
    const traits = [
      ["安靜度", item.quiet],
      ["食物密度", item.food],
      ["散步風景", item.scenery],
      ["雨天備案", item.rain]
    ].sort((a, b) => b[1] - a[1]);
    return traits[0][0];
  }

  function scoreTown(item) {
    const weights = goalWeights[fields.goal.value];
    const maxTransfer = Number(fields.maxTransfer.value);
    const transferFit = Math.max(0, 100 - Math.max(0, item.transfer - maxTransfer) * 1.35 - item.transfer * 0.18);
    const weatherPenalty = fields.weather.value === "rain" ? Math.max(0, 72 - item.rain) * 0.38 : fields.weather.value === "hot" ? Math.max(0, 62 - item.quiet) * 0.24 : fields.weather.value === "cold" ? Math.max(0, 58 - item.food) * 0.22 : 0;
    const raw = item.quiet * weights.quiet + item.food * weights.food + item.scenery * weights.scenery + item.rain * weights.rain + transferFit * weights.transfer + (100 - item.lateRisk) * weights.lateRisk - weatherPenalty;
    return Math.max(1, Math.min(99, Math.round(raw)));
  }

  function rankedTowns() {
    return towns.map((item) => ({ ...item, score: scoreTown(item) })).sort((a, b) => b.score - a.score);
  }

  function reasonFor(item) {
    const goal = goalWeights[fields.goal.value].label;
    const strengths = [
      item.quiet >= 70 ? "安靜度夠高" : "",
      item.food >= 70 ? "吃喝密度夠用" : "",
      item.scenery >= 72 ? "散步畫面漂亮" : "",
      item.rain >= 65 ? "雨天也有備案" : ""
    ].filter(Boolean);
    const transfer = item.transfer > Number(fields.maxTransfer.value) ? "但交通超過你設定的上限，需要把行程排得更鬆。" : "交通沒有壓過旅行本身。";
    return `你這次想要的是「${goal}」，${item.name} 的 ${strengths.join("、") || "整體平衡"}，${transfer}`;
  }

  function planSteps(item) {
    const first = fields.goal.value === "food" ? ["先吃一口", "抵達後不要急著跑景點，先找一間在地早餐、麵店或咖啡，把旅行的味道定下來。"] : ["先慢慢進鎮", "抵達後先走到鎮中心，不急著打卡，用 20 分鐘觀察街道節奏、店家開門狀態和回程位置。"];
    const second = item.scenery >= item.food ? ["散步主線", "挑一條不超過 90 分鐘的街道、河岸、海邊或老屋線，保持單一路徑，不切太多支線。"] : ["食物主線", "把正餐、點心和飲料排在同一個半徑內，用吃喝串起小鎮，不讓交通變主角。"];
    const third = item.lateRisk > 55 ? ["提早離開", "末班車或班距風險偏高，回程時間直接提前一班，不要把最後一小時壓在等待上。"] : ["留一段空白", "回程前留 40 分鐘給書店、伴手禮或坐著發呆，讓小鎮不是只有完成任務。"];
    return [first, second, third];
  }

  function avoidRule(item) {
    if (fields.weather.value === "rain" && item.rain < 60) return "避雷：如果抵達前兩小時確定下雨，就不要選戶外散步，把它改成有屋簷、咖啡、書店或車站周邊版本。";
    if (item.transfer > Number(fields.maxTransfer.value)) return "避雷：單程交通已經超過你的上限，不能再排跨鎮移動，也不要把晚餐放在小鎮裡。";
    if (item.lateRisk > 60) return "避雷：末班車風險高，先查回程班次並截圖。只要第一個點延誤，就刪掉最後一個點。";
    return "避雷：不要同時追老街、景點、餐廳和夕陽。小鎮旅行最怕貪心，這次只保留一條主線。";
  }

  function shareCopy(best, ranking) {
    return `我用 ChillOut 小鎮氛圍雷達選出了 ${best.name}，適配度 ${best.score}/100。這次想要「${goalWeights[fields.goal.value].label}」，排名是 ${ranking.map((item) => `${item.name} ${item.score}`).join(" / ")}。我的規則：${avoidRule(best)}`;
  }

  function promptFor(best, ranking) {
    const townsText = ranking.map((item) => `${item.name}：分數 ${item.score}，單程 ${item.transfer} 分，安靜 ${item.quiet}，食物 ${item.food}，風景 ${item.scenery}，雨備 ${item.rain}，末班車風險 ${item.lateRisk}，備註 ${item.note}`).join("；");
    return `請用 ChillOut 幫我把「小鎮氛圍雷達」結果排成一日小旅行。出發地是 ${fields.origin.value}，今天想要 ${goalWeights[fields.goal.value].label}，可接受單程交通 ${fields.maxTransfer.value} 分鐘，天氣是 ${weatherLabel(fields.weather.value)}。候選小鎮：${townsText}。工具選出 ${best.name}，原因是：${reasonFor(best)}。請安排從出發、抵達、散步/吃飯、雨天備案、回程班次提醒到分享標題的完整行程，風格要慢、清楚、不貪心。`;
  }

  function weatherLabel(value) {
    if (value === "rain") return "可能下雨";
    if (value === "hot") return "很熱";
    if (value === "cold") return "偏冷";
    return "天氣穩定";
  }

  function bar(label, value) {
    return `<div class="st-bar"><span>${escapeHtml(label)}</span><div class="st-bar-line"><i style="--value:${Math.max(1, Math.min(100, value))}%"></i></div><strong>${value}</strong></div>`;
  }

  function renderOutput() {
    if (towns.length < 2) {
      outputNode.innerHTML = `<div class="st-empty"><p class="st-kicker">Result</p><h2>至少需要兩個小鎮才能比較。</h2><p>請新增一個候選小鎮，再產生雷達結果。</p></div>`;
      return;
    }
    const ranking = rankedTowns();
    const best = ranking[0];
    const steps = planSteps(best);
    const share = shareCopy(best, ranking);
    const prompt = promptFor(best, ranking);
    outputNode.innerHTML = `
      <div class="st-result-hero">
        <div><p class="st-kicker">T046 手寫版 / mood radar</p><h2>${escapeHtml(best.name)} 最適合這次</h2><p>${escapeHtml(reasonFor(best))}</p></div>
        <div class="st-score" aria-label="小鎮適配分數">${best.score}</div>
      </div>
      <div class="st-ranking">
        ${ranking.slice(0, 3).map((item, index) => `<article class="st-rank"><span>${String(index + 1).padStart(2, "0")} / ${item.score} 分</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note || reasonFor(item))}</p><div class="st-bars">${bar("安靜", item.quiet)}${bar("食物", item.food)}${bar("風景", item.scenery)}${bar("雨備", item.rain)}</div></article>`).join("")}
      </div>
      <div class="st-plan">
        ${steps.map((step, index) => `<article class="st-step"><span>${String(index + 1).padStart(2, "0")} / plan</span><h3>${escapeHtml(step[0])}</h3><p>${escapeHtml(step[1])}</p></article>`).join("")}
      </div>
      <div class="st-copy-grid">
        <section class="st-rule"><h3>避雷規則</h3><p>${escapeHtml(avoidRule(best))}</p></section>
        <section class="st-copy"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="st-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="st-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="st-primary" data-app-link href="${appStore}?ct=tool_small_town_mood_manual_${best.score}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateTown(id, key, value) {
    towns = towns.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "note") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addTown() {
    if (towns.length >= 5) {
      showToast("最多先比較 5 個小鎮");
      return;
    }
    const id = `st-${Date.now()}`;
    towns.push(town(id, "新的小鎮", 65, 65, 60, 68, 58, 42, "先填一個你真的會考慮的地方。"));
    renderAll();
  }

  function loadSample() {
    fields.origin.value = "福岡";
    fields.goal.value = "culture";
    fields.maxTransfer.value = "100";
    fields.weather.value = "rain";
    towns = [
      town("st-a", "太宰府", 42, 62, 76, 78, 72, 25, "交通簡單，老街與甜點明確，雨天也能走。"),
      town("st-b", "門司港", 88, 70, 72, 88, 64, 34, "港邊漂亮，建築感強，但交通時間較長。"),
      town("st-c", "柳川", 76, 82, 68, 80, 52, 45, "水鄉很慢，適合放空，雨天玩法需要備案。")
    ];
    renderAll();
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-town]").addEventListener("click", addTown);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", renderAll);
      field.addEventListener("change", renderAll);
    });
    townsNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-town-id]");
      if (!row || !event.target.dataset.key) return;
      updateTown(row.dataset.townId, event.target.dataset.key, event.target.value);
      refreshTownRow(row, event.target);
      renderOutput();
    });
    townsNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-town-id]");
      if (!row || !event.target.dataset.key) return;
      updateTown(row.dataset.townId, event.target.dataset.key, event.target.value);
      renderAll();
    });
    townsNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-town-id]");
      towns = towns.filter((item) => item.id !== row.dataset.townId);
      renderAll();
    });
  }

  function renderAll() {
    renderTowns();
    renderOutput();
  }

  function refreshTownRow(row, input) {
    const item = towns.find((townItem) => townItem.id === row.dataset.townId);
    if (!item) return;
    if (input.type === "range") {
      const strong = input.closest("label")?.querySelector("strong");
      if (strong) strong.textContent = `${input.value}/100`;
    }
    if (input.dataset.key === "name") {
      row.querySelector("h3").textContent = input.value || "未命名小鎮";
    }
    const note = row.querySelector(".st-town-note");
    if (note) note.textContent = shortDiagnosis(item);
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
