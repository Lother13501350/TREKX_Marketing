(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const stallListNode = document.querySelector("[data-stalls]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    market: document.querySelector("[data-market]"),
    people: document.querySelector("[data-people]"),
    budget: document.querySelector("[data-budget]"),
    hunger: document.querySelector("[data-hunger]"),
    line: document.querySelector("[data-line]"),
    spice: document.querySelector("[data-spice]")
  };
  const labels = {
    hunger: document.querySelector("[data-hunger-label]"),
    line: document.querySelector("[data-line-label]"),
    spice: document.querySelector("[data-spice-label]")
  };

  let stalls = [
    stall("炭烤雞排", "main", 85, 18, 40, 110),
    stall("牛肉湯小碗", "main", 68, 10, 20, 120),
    stall("青草茶", "drink", 42, 4, 0, 45),
    stall("白糖粿", "sweet", 54, 8, 0, 50),
    stall("彈珠台", "game", 22, 2, 0, 30)
  ];

  function stall(name, type, fullness, line, spice, cost) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      fullness,
      line,
      spice,
      cost
    };
  }

  function stallTypes() {
    return [
      { value: "main", label: "主食" },
      { value: "snack", label: "小吃" },
      { value: "drink", label: "飲料" },
      { value: "sweet", label: "甜點" },
      { value: "game", label: "遊戲" }
    ];
  }

  function typeLabel(value) {
    const found = stallTypes().find((item) => item.value === value);
    return found ? found.label : "攤位";
  }

  function renderStalls() {
    stallListNode.innerHTML = stalls.map((item) => `
      <article class="nb-stall" data-stall-id="${escapeAttr(item.id)}">
        <label>
          攤位 / 食物
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="攤位或食物名稱">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="攤位類型">
            ${stallTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("fullness", "飽足", item.fullness, 0, 100, "")}
        ${rangeControl("line", "排隊", item.line, 0, 45, "分")}
        ${rangeControl("cost", "價格", item.cost, 10, 300, "元")}
        <button class="nb-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="nb-mini">${label}<strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreStall(item) {
    const hunger = Number(fields.hunger.value);
    const lineLimit = Number(fields.line.value);
    const spiceLimit = Number(fields.spice.value);
    const budgetPerItem = Number(fields.budget.value) / 4;
    const typeBonus = item.type === "main" && hunger > 60 ? 18 : item.type === "drink" && hunger > 50 ? 10 : item.type === "game" && hunger < 70 ? 8 : 0;
    const linePenalty = Math.max(0, Number(item.line) - lineLimit) * 1.25;
    const spicePenalty = Math.max(0, Number(item.spice) - spiceLimit) * 0.8;
    const costPenalty = Math.max(0, Number(item.cost) - budgetPerItem) * 0.08;
    return Math.max(1, Math.min(99, Math.round(42 + typeBonus + Number(item.fullness) * 0.26 - linePenalty - spicePenalty - costPenalty)));
  }

  function rankedStalls() {
    return stalls.map((item) => ({ ...item, score: scoreStall(item) })).sort((a, b) => b.score - a.score);
  }

  function pickByType(type, used) {
    return rankedStalls().find((item) => item.type === type && !used.has(item.id));
  }

  function buildPlan() {
    const used = new Set();
    const order = Number(fields.hunger.value) > 70 ? ["main", "drink", "snack", "sweet", "game"] : ["snack", "drink", "main", "game", "sweet"];
    const picks = [];
    order.forEach((type) => {
      const found = pickByType(type, used) || rankedStalls().find((item) => !used.has(item.id));
      if (found) {
        used.add(found.id);
        picks.push(found);
      }
    });
    const selected = picks.slice(0, 5);
    const total = selected.reduce((sum, item) => sum + Number(item.cost), 0);
    const score = Math.round(selected.reduce((sum, item) => sum + item.score, 0) / Math.max(1, selected.length) - Math.max(0, total - Number(fields.budget.value)) * 0.05);
    return { selected, total, score: Math.max(1, Math.min(99, score)) };
  }

  function profile(score) {
    if (score >= 78) return ["Boss 級點餐路線", "順序、預算與排隊壓力都夠穩，可以照著吃，不需要全夜市掃一圈。"];
    if (score >= 56) return ["能吃，但要跳過長隊", "主線成立，不過排隊或預算要控制，看到爆隊就直接換下一站。"];
    return ["先縮小胃口", "目前候選攤位太撐、太貴或太會排隊，建議少吃兩站，保留散步和回程。"];
  }

  function stepTitle(item, index) {
    const labels = ["開胃", "解膩", "主攻", "轉場", "收尾"];
    if (item.type === "main") return `${labels[index]}主食`;
    if (item.type === "drink") return `${labels[index]}飲料`;
    if (item.type === "sweet") return `${labels[index]}甜點`;
    if (item.type === "game") return `${labels[index]}遊戲`;
    return `${labels[index]}小吃`;
  }

  function stepNote(item, index) {
    if (item.type === "main") return Number(fields.hunger.value) > 70 ? "先吃主食穩住胃，後面才不會亂買。" : "主食只吃分食份量，不要一開始就塞滿。";
    if (item.type === "drink") return "飲料放在前半段，排隊時可以解膩，也能延長耐心。";
    if (item.type === "sweet") return "甜點當收尾，不要夾在油炸主食中間。";
    if (item.type === "game") return "用遊戲當走路空檔，讓胃有時間處理上一站。";
    return index === 0 ? "先用小份量試水溫。" : "只買一份分食，避免點餐失控。";
  }

  function ruleText(plan) {
    const rules = [];
    if (plan.total > Number(fields.budget.value)) rules.push(`目前估算 ${plan.total} 元，超過人均預算 ${fields.budget.value} 元，甜點或遊戲擇一。`);
    if (Number(fields.line.value) < 10) rules.push("排隊忍耐偏低，超過 10 分鐘直接換攤。");
    if (Number(fields.hunger.value) > 80) rules.push("很餓時先吃主食，不要先排甜點或遊戲。");
    if (Number(fields.spice.value) < 45) rules.push("辣度上限偏低，辣味攤只買小份或跳過。");
    if (!rules.length) rules.push("每站只買一個單位分食，吃完再決定下一站。");
    return rules.join(" ");
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 夜市點餐 Boss 排好了：${fields.market.value} 今晚是「${title}」${plan.score}/100。順序：${plan.selected.map((item) => item.name).join(" → ")}，估算 ${plan.total} 元。規則：${ruleText(plan)}`;
  }

  function promptFor(plan, title) {
    const stallsText = stalls.map((item) => `${item.name}：${typeLabel(item.type)}，飽足 ${item.fullness}，排隊 ${item.line} 分，辣度 ${item.spice}，價格 ${item.cost}`).join("；");
    const routeText = plan.selected.map((item, index) => `${index + 1}. ${stepTitle(item, index)} ${item.name}`).join("；");
    return `請用 ChillOut 幫我把「夜市點餐 Boss」結果排成 ${fields.market.value} 的夜市路線。同行 ${fields.people.value} 人，人均預算 ${fields.budget.value} 元，飢餓程度 ${fields.hunger.value}/100，排隊忍耐 ${fields.line.value} 分鐘，吃辣上限 ${fields.spice.value}/100。候選攤位：${stallsText}。工具結果是「${title}」，點餐分數 ${plan.score}/100，建議順序：${routeText}。請補實際動線、分食建議、排隊替代、飲料與甜點時間、廁所和回程提醒。`;
  }

  function renderOutput() {
    if (!stalls.length) {
      outputNode.innerHTML = `
        <div class="nb-empty">
          <p class="nb-kicker">Result</p>
          <h2>至少保留一個候選攤位。</h2>
          <p>夜市要有候選，才排得出順序。</p>
        </div>
      `;
      return;
    }

    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title);

    outputNode.innerHTML = `
      <div class="nb-result-head">
        <div>
          <p class="nb-kicker">T039 night market boss</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 估算總額 ${plan.total} 元；多人同行時，先分食再加點。</p>
        </div>
        <div class="nb-score" aria-label="點餐路線分數">${plan.score}</div>
      </div>
      <div class="nb-route">
        ${plan.selected.map((item, index) => `
          <article class="nb-ticket">
            <span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(typeLabel(item.type))}</span>
            <h3>${escapeHtml(stepTitle(item, index))}：${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(stepNote(item, index))}</p>
            <ul>
              <li>排隊 ${item.line} 分 / 價格 ${item.cost} 元</li>
              <li>飽足 ${item.fullness} / 辣度 ${item.spice}</li>
            </ul>
          </article>
        `).join("")}
      </div>
      <div class="nb-copy-grid">
        <section class="nb-copy-box">
          <h3>Boss 規則</h3>
          <p>${escapeHtml(ruleText(plan))}</p>
        </section>
        <section class="nb-copy-box">
          <h3>社群分享文</h3>
          <p>${escapeHtml(share)}</p>
        </section>
      </div>
      <section class="nb-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="nb-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="nb-primary" data-app-link href="${appStore}?ct=tool_night_market_boss_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateStall(id, key, value) {
    stalls = stalls.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addStall() {
    if (stalls.length >= 10) {
      showToast("最多先比較 10 個攤位");
      return;
    }
    stalls.push(stall("新攤位", "snack", 45, 8, 20, 60));
    renderAll();
  }

  function loadSample() {
    fields.market.value = "士林夜市";
    fields.people.value = "2";
    fields.budget.value = "520";
    fields.hunger.value = "68";
    fields.line.value = "12";
    fields.spice.value = "38";
    stalls = [
      stall("大香腸分食", "snack", 46, 8, 18, 70),
      stall("蚵仔煎", "main", 78, 14, 12, 95),
      stall("青蛙下蛋", "drink", 36, 5, 0, 55),
      stall("雪花冰小碗", "sweet", 58, 10, 0, 90),
      stall("射氣球", "game", 18, 3, 0, 50)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.hunger.textContent = `${fields.hunger.value}/100`;
    labels.line.textContent = `${fields.line.value} 分鐘`;
    labels.spice.textContent = `${fields.spice.value}/100`;
  }

  function updateMiniLabel(input) {
    const key = input.dataset.key;
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = key === "line" ? "分" : key === "cost" ? "元" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-stall]").addEventListener("click", addStall);
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

    stallListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-stall-id]");
      if (!row || !event.target.dataset.key) return;
      updateStall(row.dataset.stallId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    stallListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-stall-id]");
      if (!row || !event.target.dataset.key) return;
      updateStall(row.dataset.stallId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    stallListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-stall-id]");
      stalls = stalls.filter((item) => item.id !== row.dataset.stallId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderStalls();
    renderOutput();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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
