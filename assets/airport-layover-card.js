(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const interestsNode = document.querySelector("[data-interests]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    airport: document.querySelector("[data-airport]"),
    layover: document.querySelector("[data-layover]"),
    buffer: document.querySelector("[data-buffer]"),
    entry: document.querySelector("[data-entry]"),
    luggage: document.querySelector("[data-luggage]"),
    transport: document.querySelector("[data-transport]"),
    immigration: document.querySelector("[data-immigration]"),
    risk: document.querySelector("[data-risk]")
  };
  const labels = {
    immigration: document.querySelector("[data-immigration-label]"),
    risk: document.querySelector("[data-risk-label]")
  };

  let interests = [
    option("city-bite", "城市第一口", "用一碗麵、一杯咖啡或一個甜點，確認自己真的到過這座城市。", 55, 84, 24, true),
    option("landmark-proof", "一個地標證明", "只拍一個最有辨識度的點，不追景點清單，把故事留給下一次。", 50, 78, 32, false),
    option("quiet-reset", "安靜補血", "找浴室、躺椅、書店或安靜咖啡座，把下一段航班的精神補回來。", 42, 72, 12, true),
    option("souvenir-sprint", "伴手禮快掃", "只買一個小物或零食，不讓採購吃掉回程時間。", 36, 66, 17, true),
    option("neighborhood-walk", "機場線散步", "只走一小段最靠近交通線的街區，讓身體重新醒來。", 48, 74, 28, false),
    option("airport-only", "不出境也像旅行", "把機場裡的餐廳、展區、觀景台與休息點串成一條低風險路線。", 38, 64, 5, true)
  ];

  function option(id, name, description, minutes, value, risk, selected) {
    return { id, name, description, minutes, value, risk, selected };
  }

  const transportMap = {
    rail: { label: "機場快線", roundTrip: 90, reliability: 86 },
    metro: { label: "地鐵轉乘", roundTrip: 125, reliability: 70 },
    taxi: { label: "計程車", roundTrip: 95, reliability: 62 },
    airport: { label: "不離開機場", roundTrip: 0, reliability: 96 }
  };

  const entryMap = {
    free: { label: "確定可入境", gate: 100, delay: 28 },
    document: { label: "文件已準備", gate: 82, delay: 42 },
    unclear: { label: "規則不確定", gate: 42, delay: 60 },
    blocked: { label: "不可入境", gate: 12, delay: 0 }
  };

  function renderInterests() {
    interestsNode.innerHTML = interests.map((item) => `
      <article class="al-interest">
        <label>
          <input type="checkbox" data-interest="${escapeAttr(item.id)}"${item.selected ? " checked" : ""}>
          <span>
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.description)}</p>
            <small>${item.minutes} 分鐘 / 體驗值 ${item.value} / 風險 ${item.risk}</small>
          </span>
        </label>
      </article>
    `).join("");
  }

  function selectedInterests() {
    return interests.filter((item) => item.selected);
  }

  function numbers() {
    const layoverMinutes = Math.round(Number(fields.layover.value) * 60);
    const transport = transportMap[fields.transport.value];
    const entry = entryMap[fields.entry.value];
    const immigrationMinutes = Math.round(entry.delay + Number(fields.immigration.value) * 0.38);
    const luggagePenalty = fields.luggage.value === "large" ? 34 : fields.luggage.value === "carry" ? 18 : 0;
    const fixedSafety = Number(fields.buffer.value) + immigrationMinutes + luggagePenalty + transport.roundTrip;
    const usable = Math.max(0, layoverMinutes - fixedSafety);
    return { layoverMinutes, transport, entry, immigrationMinutes, luggagePenalty, fixedSafety, usable };
  }

  function buildPlan() {
    const data = numbers();
    const chosen = selectedInterests();
    const airportOnly = fields.transport.value === "airport" || fields.entry.value === "blocked";
    const pool = chosen.length ? chosen : interests.filter((item) => item.id === "airport-only" || item.id === "quiet-reset");
    const ranked = pool
      .filter((item) => airportOnly ? item.id === "airport-only" || item.id === "quiet-reset" || item.id === "souvenir-sprint" : true)
      .map((item) => ({ ...item, fit: item.value - item.risk * 0.42 + Number(fields.risk.value) * 0.16 - Math.max(0, item.minutes - data.usable) * 1.2 }))
      .sort((a, b) => b.fit - a.fit);
    const selected = [];
    let used = 0;
    ranked.forEach((item) => {
      if (selected.length >= 3) return;
      if (used + item.minutes <= Math.max(40, data.usable) || selected.length === 0) {
        selected.push(item);
        used += item.minutes;
      }
    });
    if (!selected.length) selected.push(interests.find((item) => item.id === "airport-only"));
    const interestValue = selected.reduce((sum, item) => sum + item.value, 0) / selected.length;
    const riskLoad = selected.reduce((sum, item) => sum + item.risk, 0) / selected.length;
    const timeFit = Math.min(100, Math.round(data.usable / Math.max(1, used) * 64));
    let score = Math.round(entryMap[fields.entry.value].gate * 0.28 + data.transport.reliability * 0.18 + timeFit * 0.28 + interestValue * 0.18 + Number(fields.risk.value) * 0.08 - riskLoad * 0.18);
    if (fields.entry.value === "blocked") score = Math.min(score, 34);
    if (fields.entry.value === "unclear") score = Math.min(score, 58);
    if (data.usable < 55) score = Math.min(score, 45);
    if (fields.luggage.value === "large") score -= 10;
    score = Math.max(1, Math.min(99, score));
    return { ...data, selected, used, score };
  }

  function verdict(plan) {
    if (fields.entry.value === "blocked") return ["留在機場比較漂亮", "入境條件直接卡住，這次把機場裡的餐食、觀景、休息與登機前整理做好，會比硬闖城市更像一趟好旅行。"];
    if (fields.entry.value === "unclear") return ["先查清規則再出境", "不是完全不能玩，但簽證或入境規則不確定。這張卡會建議機場半徑或單點快閃，不安排多點奔跑。"];
    if (plan.score >= 76) return ["城市快閃可行", "時間、入境與交通都還算健康，可以把轉機換成一小段真正的城市記憶，但只排一條線，不做貪心清單。"];
    if (plan.score >= 56) return ["只做一件事", "可以離開機場，但建議把目標壓到一件事：吃一口、看一眼、買一樣，完成就回程。"];
    return ["機場半徑最穩", "可用時間被通關、行李或交通吃掉太多。把體力留給下一段航班，改做機場內的低風險旅行。"];
  }

  function timeline(plan) {
    const first = fields.transport.value === "airport" || fields.entry.value === "blocked"
      ? ["整理登機狀態", "先確認登機門、下一段航班、充電與補水。這一步不是浪費，是把後面的焦慮先拿掉。"]
      : ["通關與移動", `抓 ${plan.immigrationMinutes} 分鐘給通關，再用 ${plan.transport.label} 往返。不要在第一段就壓線。`];
    const main = plan.selected[0] || interests[5];
    const second = [main.name, `${main.description} 建議實際停留 ${main.minutes} 分鐘，完成就開始回程，不再臨時加點。`];
    const third = fields.transport.value === "airport" || fields.entry.value === "blocked"
      ? ["登機前補血", "回到登機口附近，補水、整理包包、準備下一段航班。"]
      : ["回程安全線", `最晚保留 ${fields.buffer.value} 分鐘在登機前回到機場控制區。任何排隊超過 15 分鐘的店都直接放棄。`];
    return [first, second, third];
  }

  function redLine(plan) {
    if (fields.entry.value === "unclear") return "紅線：入境規則沒有查到官方答案前，不要離開管制區。這張卡只給你機場半徑與單點快閃，不給多點城市路線。";
    if (fields.luggage.value === "large") return "紅線：大行李在身邊時，不做樓梯多、轉乘多、排隊久的方案。先找寄物或直接留機場。";
    if (plan.usable < plan.used + 35) return "紅線：可用分鐘剛好貼邊，不准臨時多加景點。完成第一個目標就回頭。";
    return `紅線：只要交通預估往返超過 ${plan.transport.roundTrip + 25} 分鐘，就把城市快閃降級成機場半徑玩法。`;
  }

  function shareCopy(plan, title) {
    const route = plan.selected.map((item) => item.name).join(" → ");
    return `我用 ChillOut 轉機城市卡算了一下：${fields.airport.value} 這次是「${title}」，可行度 ${plan.score}/100。實際可用約 ${plan.usable} 分鐘，我只排 ${route}。規則：${redLine(plan)}`;
  }

  function promptFor(plan, title) {
    const route = plan.selected.map((item, index) => `${index + 1}. ${item.name}，停留 ${item.minutes} 分鐘，${item.description}`).join("；");
    return `請用 ChillOut 幫我把「轉機城市卡」排成可執行的短行程。機場是 ${fields.airport.value}，轉機總時數 ${fields.layover.value} 小時，下段登機前緩衝 ${fields.buffer.value} 分鐘，入境狀態是 ${entryMap[fields.entry.value].label}，行李狀態是 ${luggageLabel(fields.luggage.value)}，交通方式偏好 ${plan.transport.label}，通關摩擦 ${fields.immigration.value}/100，冒險意願 ${fields.risk.value}/100。工具判斷是「${title}」，可行度 ${plan.score}/100，可用分鐘約 ${plan.usable}，建議順序：${route}。請補上往返交通、最晚回機場時間、備案餐廳/休息點、不可踩紅線與可分享標題。`;
  }

  function luggageLabel(value) {
    if (value === "checked") return "行李直掛，身上很輕";
    if (value === "carry") return "只有登機箱";
    return "大行李在身邊";
  }

  function metric(title, value) {
    return `<div class="al-metric"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    const plan = buildPlan();
    const [title, description] = verdict(plan);
    const steps = timeline(plan);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title);
    outputNode.innerHTML = `
      <div class="al-result-head">
        <div><p class="al-kicker">T045 手寫版 / layover decision</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="al-score" aria-label="轉機城市卡可行度">${plan.score}</div>
      </div>
      <div class="al-metrics">
        ${metric("轉機總窗", `${plan.layoverMinutes} 分`)}
        ${metric("安全成本", `${plan.fixedSafety} 分`)}
        ${metric("實際可用", `${plan.usable} 分`)}
        ${metric("建議停留", `${plan.used} 分`)}
      </div>
      <div class="al-timeline">
        ${steps.map((step, index) => `<article class="al-step"><span>${String(index + 1).padStart(2, "0")} / ${index === 0 ? "Gate" : index === 1 ? "City" : "Return"}</span><h3>${escapeHtml(step[0])}</h3><p>${escapeHtml(step[1])}</p><ul>${plan.selected.slice(0, index + 1).map((item) => `<li>${escapeHtml(item.name)}：${item.minutes} 分鐘</li>`).join("")}</ul></article>`).join("")}
      </div>
      <div class="al-rules">
        <section class="al-rule"><h3>不可踩紅線</h3><p>${escapeHtml(redLine(plan))}</p></section>
        <section class="al-copy"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="al-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="al-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="al-primary" data-app-link href="${appStore}?ct=tool_airport_layover_card_manual_${plan.score}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function loadSample() {
    fields.airport.value = "新加坡 SIN";
    fields.layover.value = "8";
    fields.buffer.value = "120";
    fields.entry.value = "free";
    fields.luggage.value = "checked";
    fields.transport.value = "rail";
    fields.immigration.value = "38";
    fields.risk.value = "72";
    interests = interests.map((item) => ({ ...item, selected: ["city-bite", "quiet-reset", "landmark-proof"].includes(item.id) }));
    renderAll();
  }

  function resetInterests() {
    interests = interests.map((item) => ({ ...item, selected: false }));
    renderAll();
  }

  function updateLabels() {
    labels.immigration.textContent = `${fields.immigration.value}/100`;
    labels.risk.textContent = `${fields.risk.value}/100`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-reset]").addEventListener("click", resetInterests);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    interestsNode.addEventListener("change", (event) => {
      const checkbox = event.target.closest("[data-interest]");
      if (!checkbox) return;
      interests = interests.map((item) => item.id === checkbox.dataset.interest ? { ...item, selected: checkbox.checked } : item);
      renderOutput();
    });
  }

  function renderAll() {
    updateLabels();
    renderInterests();
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
