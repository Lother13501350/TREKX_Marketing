(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const optionListNode = document.querySelector("[data-options]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    place: document.querySelector("[data-place]"),
    area: document.querySelector("[data-area]"),
    window: document.querySelector("[data-window]"),
    transport: document.querySelector("[data-transport]"),
    crowd: document.querySelector("[data-crowd]"),
    tolerance: document.querySelector("[data-tolerance]"),
    budget: document.querySelector("[data-budget]")
  };
  const labels = {
    crowd: document.querySelector("[data-crowd-label]"),
    tolerance: document.querySelector("[data-tolerance-label]"),
    budget: document.querySelector("[data-budget-label]")
  };

  let options = [
    option("巷內咖啡站", "coffee", 8, 82, 180, 18),
    option("河岸主路散步", "walk", 12, 74, 0, 32),
    option("小型美術館", "indoor", 18, 68, 220, 48),
    option("站前書店", "shop", 10, 88, 0, 28),
    option("下一站公園", "park", 22, 80, 0, 52)
  ];

  function option(name, type, minutes, quiet, cost, richness) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      minutes,
      quiet,
      cost,
      richness
    };
  }

  function optionTypes() {
    return [
      { value: "coffee", label: "咖啡" },
      { value: "walk", label: "散步" },
      { value: "indoor", label: "室內" },
      { value: "shop", label: "小店" },
      { value: "park", label: "公園" },
      { value: "food", label: "小吃" }
    ];
  }

  function typeLabel(value) {
    const found = optionTypes().find((item) => item.value === value);
    return found ? found.label : "備案";
  }

  function renderOptions() {
    optionListNode.innerHTML = options.map((item) => `
      <article class="ce-option" data-option-id="${escapeAttr(item.id)}">
        <label>
          備案名稱
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="備案名稱">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="備案類型">
            ${optionTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("minutes", "移動", item.minutes, 1, 60, "分")}
        ${rangeControl("quiet", "安靜", item.quiet, 1, 100, "")}
        ${rangeControl("richness", "可玩", item.richness, 1, 100, "")}
        <button class="ce-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="ce-mini">${label}<strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreOption(item, windowSize) {
    const crowdPressure = Number(fields.crowd.value) - Number(fields.tolerance.value);
    const timePenalty = Math.max(0, Number(item.minutes) - windowSize * 0.45) * 1.2;
    const budgetPenalty = Math.max(0, Number(item.cost) / 8 - Number(fields.budget.value)) * 0.25;
    const quietBonus = crowdPressure > 30 ? Number(item.quiet) * 0.35 : Number(item.richness) * 0.24;
    const transportBonus = fields.transport.value === "walk" && Number(item.minutes) <= 15 ? 10 : fields.transport.value === "taxi" ? -3 : 0;
    return Math.max(1, Math.min(99, Math.round(36 + quietBonus + Number(item.richness) * 0.22 + transportBonus - timePenalty - budgetPenalty)));
  }

  function rankedFor(windowSize) {
    return options.map((item) => ({ ...item, score: scoreOption(item, windowSize) })).sort((a, b) => b.score - a.score);
  }

  function buildPlans() {
    return [15, 30, 60].map((size) => {
      const best = rankedFor(size)[0];
      const second = rankedFor(size).find((item) => item.id !== best.id) || best;
      const score = Math.round(best.score * 0.72 + second.score * 0.18 + escapeUrgencyBonus(size));
      return { size, best, second, score: Math.max(1, Math.min(99, score)) };
    });
  }

  function escapeUrgencyBonus(size) {
    const pressure = Number(fields.crowd.value) - Number(fields.tolerance.value);
    if (pressure > 45 && size <= 15) return 8;
    if (pressure < 20 && size >= 60) return 6;
    return 0;
  }

  function overallScore(plans) {
    const selected = plans.find((plan) => plan.size === Number(fields.window.value)) || plans[1];
    return selected.score;
  }

  function profile(score) {
    if (score >= 78) return ["立刻切走", "附近備案足夠好，不需要把時間耗在人潮裡。"];
    if (score >= 55) return ["先短逃再回來", "人潮壓力偏高，可以離開 30 分鐘，等主景點稍微退潮再判斷。"];
    return ["改室內備案", "現場與備案條件都不漂亮，直接改室內或下一站會比較舒服。"];
  }

  function planNote(plan) {
    if (plan.size === 15) return "只做止血，不追求完整體驗。";
    if (plan.size === 30) return "適合喝一杯、走一段、重新整理體力。";
    return "可以把主景點改掉，變成一段真的有內容的替代路線。";
  }

  function ruleText() {
    const pressure = Number(fields.crowd.value) - Number(fields.tolerance.value);
    if (pressure > 50) return "人潮已經超過耐受，不要再拍照硬撐；先離開主入口。";
    if (fields.transport.value === "walk") return "只選步行 15 分鐘內備案，不跨區。";
    if (Number(fields.budget.value) < 35) return "預算彈性低，優先免費散步、公園、書店。";
    return "離開後先休息，再決定要不要回主景點。";
  }

  function shareCopy(score, title, plans) {
    const selected = plans.find((plan) => plan.size === Number(fields.window.value)) || plans[1];
    return `我用 ChillOut 人潮逃生路線做了備案：${fields.area.value} 的 ${fields.place.value} 太擠，現在狀態是「${title}」${score}/100。${selected.size} 分鐘方案：${selected.best.name}，備案 ${selected.second.name}。規則：${ruleText()}`;
  }

  function promptFor(score, title, plans) {
    const optionText = options.map((item) => `${item.name}：${typeLabel(item.type)}，移動 ${item.minutes} 分，安靜 ${item.quiet}，費用 ${item.cost}，可玩 ${item.richness}`).join("；");
    const planText = plans.map((plan) => `${plan.size} 分鐘：${plan.best.name}，次選 ${plan.second.name}`).join("；");
    return `請用 ChillOut 幫我把「人潮逃生路線」排成 ${fields.area.value} 的即時備案。我現在卡在 ${fields.place.value}，可用時間 ${fields.window.value} 分鐘，交通方式 ${transportLabel(fields.transport.value)}，現場人潮 ${fields.crowd.value}/100，人群耐受 ${fields.tolerance.value}/100，預算彈性 ${fields.budget.value}/100。附近備案：${optionText}。工具結果是「${title}」，逃生分數 ${score}/100，建議方案：${planText}。請幫我補實際動線、停留時間、如果回主景點的判斷點、雨備、廁所與集合點。`;
  }

  function transportLabel(value) {
    if (value === "walk") return "走路";
    if (value === "metro") return "捷運 / 地鐵";
    if (value === "bike") return "腳踏車";
    return "叫車";
  }

  function renderOutput() {
    if (!options.length) {
      outputNode.innerHTML = `<div class="ce-empty"><p class="ce-kicker">Result</p><h2>至少保留一個附近備案。</h2><p>逃生路線需要出口。</p></div>`;
      return;
    }
    const plans = buildPlans();
    const score = overallScore(plans);
    const [title, description] = profile(score);
    const share = shareCopy(score, title, plans);
    const prompt = promptFor(score, title, plans);

    outputNode.innerHTML = `
      <div class="ce-result-head">
        <div>
          <p class="ce-kicker">T041 crowd escape</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 現在人潮差值是 ${Number(fields.crowd.value) - Number(fields.tolerance.value)}，不要把情緒耗在排隊裡。</p>
        </div>
        <div class="ce-score" aria-label="逃生分數">${score}</div>
      </div>
      <div class="ce-plans">
        ${plans.map((plan) => `
          <article class="ce-plan">
            <span>${plan.size} 分鐘方案</span>
            <h3>${escapeHtml(plan.best.name)}</h3>
            <p>${escapeHtml(planNote(plan))}</p>
            <ul>
              <li>類型：${escapeHtml(typeLabel(plan.best.type))}</li>
              <li>移動 ${plan.best.minutes} 分 / 安靜 ${plan.best.quiet}</li>
              <li>次選：${escapeHtml(plan.second.name)}</li>
            </ul>
          </article>
        `).join("")}
      </div>
      <div class="ce-copy-grid">
        <section class="ce-copy-box"><h3>不要做的事</h3><p>${escapeHtml(ruleText())}</p></section>
        <section class="ce-copy-box"><h3>群組公告</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="ce-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="ce-result-actions">
        <button type="button" data-copy-share>複製群組公告</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ce-primary" data-app-link href="${appStore}?ct=tool_crowd_escape_plan_manual_${score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateOption(id, key, value) {
    options = options.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addOption() {
    if (options.length >= 10) {
      showToast("最多先比較 10 個備案");
      return;
    }
    options.push(option("新備案點", "walk", 10, 70, 0, 35));
    renderAll();
  }

  function loadSample() {
    fields.place.value = "九份老街入口";
    fields.area.value = "九份山城";
    fields.window.value = "30";
    fields.transport.value = "walk";
    fields.crowd.value = "92";
    fields.tolerance.value = "28";
    fields.budget.value = "38";
    options = [
      option("基山街後段茶店", "coffee", 9, 78, 180, 42),
      option("觀景平台邊線", "walk", 12, 74, 0, 52),
      option("小巷芋圓店", "food", 7, 58, 80, 40),
      option("公車站旁書店", "shop", 14, 86, 0, 32),
      option("山城階梯短走", "walk", 16, 70, 0, 45)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.crowd.textContent = `${fields.crowd.value}/100`;
    labels.tolerance.textContent = `${fields.tolerance.value}/100`;
    labels.budget.textContent = `${fields.budget.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "minutes" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-option]").addEventListener("click", addOption);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        updateLabels();
        renderOutput();
      });
      field.addEventListener("change", renderOutput);
    });

    optionListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-option-id]");
      if (!row || !event.target.dataset.key) return;
      updateOption(row.dataset.optionId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    optionListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-option-id]");
      if (!row || !event.target.dataset.key) return;
      updateOption(row.dataset.optionId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    optionListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-option-id]");
      options = options.filter((item) => item.id !== row.dataset.optionId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderOptions();
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
