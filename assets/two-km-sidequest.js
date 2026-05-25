(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const questListNode = document.querySelector("[data-quests]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    main: document.querySelector("[data-main]"),
    window: document.querySelector("[data-window]"),
    move: document.querySelector("[data-move]"),
    distance: document.querySelector("[data-distance]"),
    energy: document.querySelector("[data-energy]"),
    surprise: document.querySelector("[data-surprise]")
  };
  const labels = {
    distance: document.querySelector("[data-distance-label]"),
    energy: document.querySelector("[data-energy-label]"),
    surprise: document.querySelector("[data-surprise-label]")
  };

  let quests = [
    quest("山腳咖啡窗", "coffee", 0.7, 78, 24, 18),
    quest("河岸五分鐘小路", "walk", 1.2, 64, 42, 24),
    quest("無人小展間", "indoor", 1.6, 82, 58, 36),
    quest("市場邊甜點", "food", 0.9, 70, 34, 22)
  ];

  function quest(name, type, distance, surprise, quiet, minutes) {
    return { id: crypto.randomUUID(), name, type, distance, surprise, quiet, minutes };
  }

  function types() {
    return [
      { value: "coffee", label: "咖啡" },
      { value: "walk", label: "散步" },
      { value: "indoor", label: "室內" },
      { value: "food", label: "小吃" },
      { value: "view", label: "觀景" }
    ];
  }

  function typeLabel(value) {
    const found = types().find((item) => item.value === value);
    return found ? found.label : "支線";
  }

  function renderQuests() {
    questListNode.innerHTML = quests.map((item) => `
      <article class="sq-quest" data-quest-id="${escapeAttr(item.id)}">
        <label>支線名稱<input data-key="name" value="${escapeAttr(item.name)}" aria-label="支線名稱"></label>
        <label>類型<select data-key="type" aria-label="支線類型">${types().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}</select></label>
        ${rangeControl("distance", "距離", item.distance, 0.1, 2, "km", "0.1")}
        ${rangeControl("surprise", "驚喜", item.surprise, 1, 100, "", "1")}
        ${rangeControl("minutes", "耗時", item.minutes, 5, 90, "分", "1")}
        <button class="sq-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix, step) {
    return `<label><span class="sq-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}"></label>`;
  }

  function scoreQuest(item) {
    const distancePenalty = Math.max(0, Number(item.distance) - Number(fields.distance.value)) * 26;
    const timePenalty = Math.max(0, Number(item.minutes) - Number(fields.window.value) * 0.75) * 0.8;
    const energyPenalty = Number(item.distance) * Math.max(0, 70 - Number(fields.energy.value)) * 0.12;
    const surpriseMatch = Math.min(Number(item.surprise), Number(fields.surprise.value)) * 0.34;
    const moveBonus = fields.move.value !== "walk" && Number(item.distance) > 1.3 ? 7 : 0;
    return Math.max(1, Math.min(99, Math.round(36 + surpriseMatch + Number(item.quiet) * 0.22 + moveBonus - distancePenalty - timePenalty - energyPenalty)));
  }

  function rankedQuests() {
    return quests.map((item) => ({ ...item, score: scoreQuest(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const selected = rankedQuests().slice(0, 3);
    const score = Math.round(selected.reduce((sum, item) => sum + item.score, 0) / Math.max(1, selected.length));
    return { selected, score };
  }

  function profile(score) {
    if (score >= 78) return ["支線很值得", "這些點離主景點夠近，驚喜感也夠，適合直接加進今天。"];
    if (score >= 55) return ["選一個就好", "有支線值得去，但不要貪多，選一個最順路的就好。"];
    return ["先別支線", "距離、時間或體力不划算，主景點結束後直接休息比較好。"];
  }

  function questNote(item) {
    if (item.type === "coffee") return "當作重新整理體力的停靠點，不要久坐到拖延主線。";
    if (item.type === "walk") return "只走一段，不把支線變成第二個主景點。";
    if (item.type === "indoor") return "天氣或人潮失控時，這個點可以當安全備案。";
    if (item.type === "food") return "買小份分食，讓支線保留輕盈感。";
    return "拍完就走，讓驚喜留在剛剛好的長度。";
  }

  function ruleText(plan) {
    if (Number(fields.energy.value) < 45) return "體力偏低，只選距離最近的支線。";
    if (Number(fields.window.value) <= 30) return "時間很短，不要安排需要入場、排隊或久坐的點。";
    if (plan.score < 55) return "支線分數不夠，別為了填滿行程硬繞。";
    return "支線最多一個主點加一個路過點，保留回主線的彈性。";
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 2 公里支線任務幫 ${fields.main.value} 找了旁邊的小冒險：「${title}」${plan.score}/100。候選：${plan.selected.map((item) => item.name).join(" → ")}。規則：${ruleText(plan)}`;
  }

  function promptFor(plan, title) {
    const questText = quests.map((item) => `${item.name}：${typeLabel(item.type)}，距離 ${item.distance}km，驚喜 ${item.surprise}，安靜 ${item.quiet}，耗時 ${item.minutes}分`).join("；");
    const selectedText = plan.selected.map((item, index) => `${index + 1}. ${item.name}：${questNote(item)}`).join("；");
    return `請用 ChillOut 幫我把「2 公里支線任務」排成 ${fields.main.value} 旁邊的微行程。可用時間 ${fields.window.value} 分鐘，移動方式 ${moveLabel(fields.move.value)}，距離上限 ${fields.distance.value}km，體力餘裕 ${fields.energy.value}/100，驚喜偏好 ${fields.surprise.value}/100。候選支線：${questText}。工具結果是「${title}」，支線分數 ${plan.score}/100，建議支線：${selectedText}。請補步行順序、停留時間、放棄條件、雨備與回到主景點或下一站的方式。`;
  }

  function moveLabel(value) {
    if (value === "walk") return "步行";
    if (value === "bike") return "腳踏車";
    if (value === "bus") return "公車";
    return "叫車";
  }

  function renderOutput() {
    if (!quests.length) {
      outputNode.innerHTML = `<div class="sq-empty"><p class="sq-kicker">Result</p><h2>至少保留一個候選支線。</h2><p>沒有支線就沒有小冒險。</p></div>`;
      return;
    }
    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title);

    outputNode.innerHTML = `
      <div class="sq-result-head">
        <div><p class="sq-kicker">T043 two kilometer sidequest</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)} 這不是把行程塞滿，而是給今天多一個可選的出口。</p></div>
        <div class="sq-score" aria-label="支線分數">${plan.score}</div>
      </div>
      <div class="sq-map">
        ${plan.selected.map((item, index) => `<article class="sq-card"><span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(typeLabel(item.type))}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(questNote(item))}</p><ul><li>距離 ${item.distance}km / 耗時 ${item.minutes} 分</li><li>驚喜 ${item.surprise} / 安靜 ${item.quiet}</li></ul></article>`).join("")}
      </div>
      <div class="sq-copy-grid">
        <section class="sq-copy-box"><h3>放棄條件</h3><p>${escapeHtml(ruleText(plan))}</p></section>
        <section class="sq-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="sq-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="sq-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="sq-primary" data-app-link href="${appStore}?ct=tool_two_km_sidequest_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateQuest(id, key, value) {
    quests = quests.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addQuest() {
    if (quests.length >= 9) {
      showToast("最多先比較 9 個支線");
      return;
    }
    quests.push(quest("新支線點", "walk", 0.8, 60, 60, 20));
    renderAll();
  }

  function loadSample() {
    fields.main.value = "清水寺";
    fields.window.value = "45";
    fields.move.value = "walk";
    fields.distance.value = "1.4";
    fields.energy.value = "58";
    fields.surprise.value = "82";
    quests = [
      quest("二年坂後段小路", "walk", 0.6, 76, 62, 18),
      quest("小茶屋窗口", "coffee", 0.8, 84, 70, 24),
      quest("石塀小路邊線", "walk", 1.2, 88, 58, 32),
      quest("小型器皿店", "indoor", 1.0, 72, 78, 25)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.distance.textContent = `${Number(fields.distance.value).toFixed(1)} km`;
    labels.energy.textContent = `${fields.energy.value}/100`;
    labels.surprise.textContent = `${fields.surprise.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "distance" ? "km" : input.dataset.key === "minutes" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-quest]").addEventListener("click", addQuest);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    questListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-quest-id]");
      if (!row || !event.target.dataset.key) return;
      updateQuest(row.dataset.questId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    questListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-quest-id]");
      if (!row || !event.target.dataset.key) return;
      updateQuest(row.dataset.questId, event.target.dataset.key, event.target.value);
      renderOutput();
    });
    questListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-quest-id]");
      quests = quests.filter((item) => item.id !== row.dataset.questId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderQuests();
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
