(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const momentListNode = document.querySelector("[data-moments]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    stage: document.querySelector("[data-stage]"),
    budget: document.querySelector("[data-budget]"),
    talk: document.querySelector("[data-talk]"),
    soft: document.querySelector("[data-soft]"),
    walk: document.querySelector("[data-walk]")
  };
  const labels = {
    talk: document.querySelector("[data-talk-label]"),
    soft: document.querySelector("[data-soft-label]"),
    walk: document.querySelector("[data-walk-label]")
  };

  let moments = [
    moment("餐後慢走", "walk", 20, 82, 10, 0),
    moment("高樓夜景", "view", 38, 70, 16, 300),
    moment("安靜咖啡", "talk", 55, 88, 6, 260),
    moment("甜點收尾", "dessert", 34, 76, 8, 220),
    moment("雨備書店", "indoor", 46, 92, 4, 0)
  ];

  function moment(name, type, intimacy, comfort, walk, cost) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      intimacy,
      comfort,
      walk,
      cost
    };
  }

  function momentTypes() {
    return [
      { value: "walk", label: "散步" },
      { value: "view", label: "夜景" },
      { value: "talk", label: "聊天" },
      { value: "dessert", label: "甜點" },
      { value: "indoor", label: "室內" },
      { value: "play", label: "輕活動" }
    ];
  }

  function typeLabel(value) {
    const found = momentTypes().find((item) => item.value === value);
    return found ? found.label : "約會段";
  }

  function renderMoments() {
    momentListNode.innerHTML = moments.map((item) => `
      <article class="ad-moment" data-moment-id="${escapeAttr(item.id)}">
        <label>
          約會段
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="約會段名稱">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="約會段類型">
            ${momentTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("intimacy", "親密", item.intimacy, 0, 100, "")}
        ${rangeControl("comfort", "舒服", item.comfort, 0, 100, "")}
        ${rangeControl("walk", "步行", item.walk, 0, 45, "分")}
        <button class="ad-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="ad-mini">${label}<strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreMoment(item) {
    const softNeed = Number(fields.soft.value);
    const talkNeed = Number(fields.talk.value);
    const walkLimit = Number(fields.walk.value);
    const stagePenalty = fields.stage.value === "first" && Number(item.intimacy) > 60 ? 15 : 0;
    const talkBonus = item.type === "talk" && talkNeed > 55 ? 12 : item.type === "play" && talkNeed < 45 ? 10 : 0;
    const walkPenalty = Math.max(0, Number(item.walk) - walkLimit) * 1.1;
    const costPenalty = Math.max(0, Number(item.cost) - Number(fields.budget.value) / 4) * 0.05;
    return Math.max(1, Math.min(99, Math.round(38 + Number(item.comfort) * 0.34 + Number(item.intimacy) * 0.18 + softNeed * 0.12 + talkBonus - stagePenalty - walkPenalty - costPenalty)));
  }

  function rankedMoments() {
    return moments.map((item) => ({ ...item, score: scoreMoment(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const used = new Set();
    const sequence = ["talk", "walk", "view", "dessert"];
    if (fields.stage.value === "first") sequence.splice(2, 0, "indoor");
    if (fields.stage.value === "anniversary") sequence[0] = "view";
    const selected = [];
    sequence.forEach((type) => {
      const found = rankedMoments().find((item) => item.type === type && !used.has(item.id)) || rankedMoments().find((item) => !used.has(item.id));
      if (found && selected.length < 4) {
        used.add(found.id);
        selected.push(found);
      }
    });
    const total = selected.reduce((sum, item) => sum + Number(item.cost), 0);
    const score = Math.round(selected.reduce((sum, item) => sum + item.score, 0) / Math.max(1, selected.length) - Math.max(0, total - Number(fields.budget.value)) * 0.04);
    return { selected, total, score: Math.max(1, Math.min(99, score)) };
  }

  function profile(score) {
    if (score >= 78) return ["舒服又有記憶點", "約會段落有留白，聊天、移動與收尾都不會太用力。"];
    if (score >= 56) return ["可以約，但要降低密度", "主線成立，不過需要刪掉一個高壓段，避免整晚都在趕。"];
    return ["先改成短約會", "目前步行、預算或親密度壓力偏高，建議只保留一個主段和一個收尾。"];
  }

  function stepTitle(item, index) {
    const labels = ["暖場", "轉場", "記憶點", "收尾"];
    return `${labels[index] || "補充"} · ${item.name}`;
  }

  function stepNote(item) {
    if (item.type === "walk") return "散步不要太久，留一點沉默也沒關係。";
    if (item.type === "view") return "夜景只當記憶點，不要在那裡硬聊太久。";
    if (item.type === "talk") return "選安靜但不正式的地方，讓對話自然開始。";
    if (item.type === "dessert") return "用甜點做輕收尾，不把約會拉成加班。";
    if (item.type === "play") return "輕活動可以降低尷尬，但不要變成競賽。";
    return "室內備案讓天氣和疲勞都有退路。";
  }

  function inviteCopy(plan, title) {
    const first = plan.selected[0];
    const last = plan.selected[plan.selected.length - 1];
    return `我想了一個很低壓的晚上：先在 ${fields.city.value} ${first.name}，中間散步一下，最後用 ${last.name} 收尾。不會排太滿，大概就是「${title}」那種節奏。你覺得可以嗎？`;
  }

  function ruleText(plan) {
    const rules = [];
    if (fields.stage.value === "first") rules.push("第一次約會不要安排太偏僻或太長的路線。");
    if (Number(fields.talk.value) < 45) rules.push("聊天能量偏低，安排一段輕活動降低空白。");
    if (plan.total > Number(fields.budget.value)) rules.push(`目前估算 ${plan.total} 元，超過預算 ${fields.budget.value} 元，刪掉一個付費段。`);
    if (Number(fields.walk.value) < 12) rules.push("走路上限偏低，夜景點和甜點要靠近。");
    if (!rules.length) rules.push("不要臨時加第三個大點；舒服結束比硬續攤重要。");
    return rules.join(" ");
  }

  function promptFor(plan, title) {
    const momentText = moments.map((item) => `${item.name}：${typeLabel(item.type)}，親密 ${item.intimacy}，舒服 ${item.comfort}，步行 ${item.walk} 分，價格 ${item.cost}`).join("；");
    const routeText = plan.selected.map((item, index) => `${index + 1}. ${stepTitle(item, index)}：${stepNote(item)}`).join("；");
    return `請用 ChillOut 幫我把「夜景約會生成器」結果排成 ${fields.city.value} 的低壓晚間約會。我們的關係階段是 ${stageLabel(fields.stage.value)}，人均預算 ${fields.budget.value}，聊天能量 ${fields.talk.value}/100，親密低壓度 ${fields.soft.value}/100，走路上限 ${fields.walk.value} 分鐘。候選約會段：${momentText}。工具結果是「${title}」，約會舒服度 ${plan.score}/100，建議節奏：${routeText}。請補實際動線、停留時間、雨備、自然話題、收尾方式與可以傳給對方的邀約訊息。`;
  }

  function stageLabel(value) {
    if (value === "first") return "第一次約會";
    if (value === "early") return "曖昧初期";
    if (value === "partner") return "穩定交往";
    return "紀念日";
  }

  function renderOutput() {
    if (!moments.length) {
      outputNode.innerHTML = `
        <div class="ad-empty">
          <p class="ad-kicker">Result</p>
          <h2>至少保留一個約會段。</h2>
          <p>約會要有主段，也要有收尾。</p>
        </div>
      `;
      return;
    }

    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const invite = inviteCopy(plan, title);
    const prompt = promptFor(plan, title);

    outputNode.innerHTML = `
      <div class="ad-result-head">
        <div>
          <p class="ad-kicker">T040 after dark date</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 估算 ${plan.total} 元；真正重要的是留一段可以自然結束的空間。</p>
        </div>
        <div class="ad-score" aria-label="約會舒服度">${plan.score}</div>
      </div>
      <div class="ad-sequence">
        ${plan.selected.map((item, index) => `
          <article class="ad-card">
            <span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(typeLabel(item.type))}</span>
            <h3>${escapeHtml(stepTitle(item, index))}</h3>
            <p>${escapeHtml(stepNote(item))}</p>
            <ul>
              <li>親密 ${item.intimacy} / 舒服 ${item.comfort}</li>
              <li>步行 ${item.walk} 分 / 估算 ${item.cost} 元</li>
            </ul>
          </article>
        `).join("")}
      </div>
      <div class="ad-copy-grid">
        <section class="ad-copy-box">
          <h3>低壓邀約訊息</h3>
          <p>${escapeHtml(invite)}</p>
        </section>
        <section class="ad-copy-box">
          <h3>今晚規則</h3>
          <p>${escapeHtml(ruleText(plan))}</p>
        </section>
      </div>
      <section class="ad-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="ad-result-actions">
        <button type="button" data-copy-invite>複製邀約訊息</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ad-primary" data-app-link href="${appStore}?ct=tool_after_dark_date_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-invite]").addEventListener("click", () => copyText(invite));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateMoment(id, key, value) {
    moments = moments.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addMoment() {
    if (moments.length >= 9) {
      showToast("最多先比較 9 個約會段");
      return;
    }
    moments.push(moment("新約會段", "walk", 35, 70, 8, 0));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "首爾漢江";
    fields.stage.value = "early";
    fields.budget.value = "900";
    fields.talk.value = "62";
    fields.soft.value = "82";
    fields.walk.value = "16";
    moments = [
      moment("便利商店飲料", "talk", 24, 88, 4, 90),
      moment("漢江邊慢走", "walk", 36, 84, 14, 0),
      moment("橋邊夜景", "view", 48, 78, 12, 0),
      moment("小甜點收尾", "dessert", 42, 80, 8, 180),
      moment("雨備室內書店", "indoor", 32, 92, 6, 0)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.talk.textContent = `${fields.talk.value}/100`;
    labels.soft.textContent = `${fields.soft.value}/100`;
    labels.walk.textContent = `${fields.walk.value} 分鐘`;
  }

  function updateMiniLabel(input) {
    const key = input.dataset.key;
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    strong.textContent = key === "walk" ? `${input.value}分` : input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-moment]").addEventListener("click", addMoment);
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

    momentListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-moment-id]");
      if (!row || !event.target.dataset.key) return;
      updateMoment(row.dataset.momentId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    momentListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-moment-id]");
      if (!row || !event.target.dataset.key) return;
      updateMoment(row.dataset.momentId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    momentListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-moment-id]");
      moments = moments.filter((item) => item.id !== row.dataset.momentId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderMoments();
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
