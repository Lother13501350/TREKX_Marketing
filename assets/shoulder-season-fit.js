(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    destination: document.querySelector("[data-destination]"),
    month: document.querySelector("[data-month]"),
    days: document.querySelector("[data-days]"),
    seasonRisk: document.querySelector("[data-season-risk]"),
    budget: document.querySelector("[data-budget]"),
    crowd: document.querySelector("[data-crowd]"),
    weather: document.querySelector("[data-weather]"),
    flex: document.querySelector("[data-flex]")
  };
  const labels = {
    budget: document.querySelector("[data-budget-label]"),
    crowd: document.querySelector("[data-crowd-label]"),
    weather: document.querySelector("[data-weather-label]"),
    flex: document.querySelector("[data-flex-label]")
  };
  const contracts = [...document.querySelectorAll("[data-contract]")];

  const monthProfiles = {
    march: { label: "3 月", price: 76, crowd: 62, weatherRisk: 58, closure: 38, season: "早春淡季" },
    april: { label: "4 月", price: 58, crowd: 72, weatherRisk: 44, closure: 28, season: "春季轉場" },
    may: { label: "5 月", price: 64, crowd: 52, weatherRisk: 38, closure: 25, season: "初夏前段" },
    september: { label: "9 月", price: 72, crowd: 48, weatherRisk: 68, closure: 34, season: "暑後低潮" },
    october: { label: "10 月", price: 68, crowd: 56, weatherRisk: 46, closure: 28, season: "秋季肩峰" },
    november: { label: "11 月", price: 70, crowd: 54, weatherRisk: 52, closure: 36, season: "秋末淡季" }
  };

  const riskProfiles = {
    mild: { label: "人少一點", weather: 4, closure: 4, transport: 2 },
    weather: { label: "天氣不穩", weather: 18, closure: 5, transport: 5 },
    closure: { label: "店休多", weather: 6, closure: 20, transport: 6 },
    remote: { label: "班次少", weather: 7, closure: 8, transport: 22 }
  };

  function checked(id) {
    return contracts.some((input) => input.dataset.contract === id && input.checked);
  }

  function calculate() {
    const month = monthProfiles[fields.month.value];
    const risk = riskProfiles[fields.seasonRisk.value];
    const weatherPenalty = Math.max(0, month.weatherRisk + risk.weather - Number(fields.weather.value)) * 0.68;
    const closurePenalty = (month.closure + risk.closure) * (checked("food") ? 0.38 : 0.18);
    const elderPenalty = checked("elder") ? Math.max(0, month.weatherRisk - 35) * 0.42 : 0;
    const photoPenalty = checked("photo") ? Math.max(0, month.weatherRisk - 42) * 0.32 : 0;
    const eventBonus = checked("event") ? 8 : 0;
    const driveBonus = checked("drive") ? Math.min(14, risk.transport * 0.7) : 0;
    const indoorBonus = checked("indoor") ? 10 : 0;
    const priceGain = month.price * Number(fields.budget.value) / 100;
    const crowdGain = (100 - month.crowd) * Number(fields.crowd.value) / 100;
    const flexGain = Number(fields.flex.value) * 0.26;
    const dayBuffer = Number(fields.days.value) >= 6 ? 8 : Number(fields.days.value) <= 2 ? -7 : 2;
    const score = Math.max(1, Math.min(99, Math.round(35 + priceGain * 0.26 + crowdGain * 0.32 + flexGain + eventBonus + driveBonus + indoorBonus + dayBuffer - weatherPenalty - closurePenalty - elderPenalty - photoPenalty)));
    const metrics = {
      price: Math.round(priceGain),
      crowd: Math.round(crowdGain),
      weather: Math.max(1, Math.min(99, Math.round(100 - month.weatherRisk - risk.weather + Number(fields.weather.value) * 0.24))),
      closure: Math.max(1, Math.min(99, Math.round(100 - month.closure - risk.closure))),
      flex: Number(fields.flex.value)
    };
    return { month, risk, score, metrics };
  }

  function verdict(score) {
    if (score >= 78) return ["你是淡季玩家", "你能把便宜、人少和不確定轉成優勢。這趟可以淡季出發，但仍要保留雙路線。"];
    if (score >= 58) return ["可以淡季，但要簽旅行合約", "淡季對你有吸引力，但不能用旺季期待去玩。訂房、交通和雨備要先鎖好。"];
    if (score >= 40) return ["只適合半淡季", "你可以選肩峰或旺季尾端，不建議挑最冷清、班次最少或店休最多的週期。"];
    return ["等旺季比較誠實", "你在意的東西剛好是淡季最容易犧牲的東西。省下的錢可能換來失望。"];
  }

  function sunnyRoute(result) {
    if (checked("event")) return ["好天路線：追季節訊號", `把 ${fields.destination.value} 的季節景或活動排在第一天早上，午後只排附近散步與餐廳，不把運氣用到最後一天。`];
    if (checked("photo")) return ["好天路線：先拍代表畫面", "第一個晴天直接去最需要光線的景點，其他餐廳和室內點都往後移，避免天氣反轉。"];
    return ["好天路線：人少慢走", "利用淡季人少的優勢，把熱門區拆成慢速散步，不排隊、不趕場，讓空景變成主角。"];
  }

  function rainyRoute(result) {
    if (checked("indoor")) return ["壞天路線：室內也完整", "把博物館、書店、咖啡、商店街和溫泉排成一條線，雨天不是備胎，而是另一版主線。"];
    if (checked("food")) return ["壞天路線：用吃喝補回來", "先確認營業日，再把餐廳、甜點和市場排在同一區。雨天不跨區，只做低移動美食路線。"];
    return ["壞天路線：降低期待值", "保留一個室內核心點，再加一段短散步。只要風雨變大，就回住宿或車站半徑。"];
  }

  function ruleText(result) {
    if (result.score >= 78) return "規則：可以訂淡季，但不要把每一天都排滿。至少保留一天可交換，讓好天氣去戶外、壞天氣進室內。";
    if (result.score >= 58) return "規則：訂房選可取消，餐廳先查營業日，交通先截圖末班車。沒有備案前，不要為了便宜先付款。";
    if (result.score >= 40) return "規則：避開最冷清的週中，選旺季前後一週或假日前後，讓淡季折扣和基本開放度同時存在。";
    return "規則：不要硬買淡季票。除非目的地有明確室內主線，否則等天氣、店家與交通都比較穩的時段。";
  }

  function shareCopy(result, title) {
    return `我用 ChillOut 淡季適配測驗算了 ${fields.destination.value} ${result.month.label}：${title}，分數 ${result.score}/100。最重要規則是：${ruleText(result)}`;
  }

  function promptFor(result, title) {
    const selected = contracts.filter((input) => input.checked).map((input) => contractLabel(input.dataset.contract)).join("、") || "沒有特別不能犧牲的條件";
    return `請用 ChillOut 幫我把「淡季適配測驗」結果排成旅行計畫。目的地是 ${fields.destination.value}，月份 ${result.month.label}，旅行 ${fields.days.value} 天，淡季風險是 ${result.risk.label}，預算敏感 ${fields.budget.value}/100，怕人潮 ${fields.crowd.value}/100，天氣容忍 ${fields.weather.value}/100，臨時改行程能力 ${fields.flex.value}/100。不能犧牲的條件：${selected}。工具判斷是「${title}」，分數 ${result.score}/100。請安排好天路線、壞天路線、店休日檢查、交通備案、訂房規則、打包提醒和可分享標題。`;
  }

  function contractLabel(id) {
    if (id === "photo") return "照片與景色要漂亮";
    if (id === "food") return "餐廳不能店休太多";
    if (id === "elder") return "同行者不適合受凍或淋雨";
    if (id === "event") return "想碰運氣看活動或季節景";
    if (id === "drive") return "可自駕或接受繞路";
    return "室內備案也能開心";
  }

  function metric(label, value) {
    return `<div class="sf-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    const result = calculate();
    const [title, description] = verdict(result.score);
    const sunny = sunnyRoute(result);
    const rainy = rainyRoute(result);
    const share = shareCopy(result, title);
    const prompt = promptFor(result, title);
    outputNode.innerHTML = `
      <div class="sf-result-head">
        <div><p class="sf-kicker">T047 手寫版 / shoulder season decision</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="sf-score" aria-label="淡季適配分數">${result.score}</div>
      </div>
      <div class="sf-meter">
        ${metric("省錢誘因", `${result.metrics.price}/100`)}
        ${metric("避開人潮", `${result.metrics.crowd}/100`)}
        ${metric("天氣安全", `${result.metrics.weather}/100`)}
        ${metric("開放穩定", `${result.metrics.closure}/100`)}
        ${metric("彈性能力", `${result.metrics.flex}/100`)}
      </div>
      <div class="sf-routes">
        <article class="sf-route"><span>01 / good weather</span><h3>${escapeHtml(sunny[0])}</h3><p>${escapeHtml(sunny[1])}</p><ul><li>${escapeHtml(result.month.season)}</li><li>${escapeHtml(fields.destination.value)} ${escapeHtml(result.month.label)}</li></ul></article>
        <article class="sf-route"><span>02 / bad weather</span><h3>${escapeHtml(rainy[0])}</h3><p>${escapeHtml(rainy[1])}</p><ul><li>店休風險 ${result.month.closure + result.risk.closure}</li><li>天氣風險 ${result.month.weatherRisk + result.risk.weather}</li></ul></article>
      </div>
      <div class="sf-copy-grid">
        <section class="sf-rule"><h3>出發規則</h3><p>${escapeHtml(ruleText(result))}</p></section>
        <section class="sf-copy"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="sf-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="sf-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="sf-primary" data-app-link href="${appStore}?ct=tool_shoulder_season_fit_manual_${result.score}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function loadSample() {
    fields.destination.value = "冰島";
    fields.month.value = "march";
    fields.days.value = "6";
    fields.seasonRisk.value = "weather";
    fields.budget.value = "88";
    fields.crowd.value = "76";
    fields.weather.value = "62";
    fields.flex.value = "82";
    contracts.forEach((input) => {
      input.checked = ["photo", "event", "drive", "indoor"].includes(input.dataset.contract);
    });
    renderAll();
  }

  function updateLabels() {
    labels.budget.textContent = `${fields.budget.value}/100`;
    labels.crowd.textContent = `${fields.crowd.value}/100`;
    labels.weather.textContent = `${fields.weather.value}/100`;
    labels.flex.textContent = `${fields.flex.value}/100`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", renderAll);
      field.addEventListener("change", renderAll);
    });
    contracts.forEach((input) => input.addEventListener("change", renderOutput));
  }

  function renderAll() {
    updateLabels();
    renderOutput();
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
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
