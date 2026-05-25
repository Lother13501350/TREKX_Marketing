/*
 * ChillOut standalone microtool
 * Tool: T010 旅行美學轉行程
 * Slug: aesthetic-to-itinerary
 * Mode: sorter
 * This file is generated as an independent runnable tool script.
 */
(() => {
  const tool = {
  "slug": "aesthetic-to-itinerary",
  "category": "social",
  "name": "旅行美學轉行程",
  "tagline": "從一種美學直接生出一天路線。",
  "audience": "先被風格吸引、後面才想目的地的人",
  "mechanic": "選擇奶油、霓虹、復古、森林或海風等美學，輸出對應路線。",
  "result": "你的旅行可以先有風格，再找地點。",
  "chips": [
    "美學路線",
    "拍照任務",
    "ChillOut 生成"
  ],
  "mode": "sorter",
  "modeLabel": "靈感整理器",
  "modeVariant": "時間線",
  "interfaceTitle": "旅行美學轉行程操作台",
  "actionLabel": "整理成可出發清單",
  "resultName": "出發清單",
  "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
  "shareLead": "我把一堆旅遊靈感整理成可出發清單",
  "sampleItems": [
    "小紅書截圖",
    "咖啡廳名單",
    "夜景口袋清單",
    "想去但沒排的景點",
    "朋友群組連結",
    "IG 收藏店家",
    "朋友丟的 Reels"
  ],
  "scoreSeed": 67,
  "executionPack": {
    "actions": [
      "把「美學路線」拆成 3 個桶：今天必排、可備用、先刪掉。",
      "把 小紅書截圖 與 咖啡廳名單 合併成第一版路線。",
      "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
    ],
    "hooks": [
      "我用 旅行美學轉行程 把群組靈感整理成可出發清單。",
      "收藏不是問題，沒有整理才是問題。",
      "留言你的 美學路線，我幫你丟進 ChillOut 變行程。"
    ],
    "qa": [
      "至少輸入 3 個素材",
      "結果要出現三桶分類",
      "分享文案要含 ChillOut 導流"
    ]
  },
  "playSteps": [
    "輸入 小紅書截圖 或這次最想解決的旅行條件。",
    "調整 美學路線、拍照任務 與 ChillOut 生成 的優先順序。",
    "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
  ],
  "inputs": [
    {
      "type": "text",
      "key": "rawList",
      "label": "美學路線素材",
      "placeholder": "貼上或輸入：小紅書截圖、咖啡廳名單、夜景口袋清單"
    },
    {
      "type": "range",
      "key": "urgency",
      "label": "這次真的想去的程度",
      "min": 1,
      "max": 100,
      "value": 71,
      "left": "只是收藏",
      "right": "馬上想排"
    },
    {
      "type": "choice",
      "key": "filter",
      "label": "整理優先規則",
      "choices": [
        "小紅書截圖",
        "咖啡廳名單",
        "夜景口袋清單",
        "想去但沒排的景點",
        "朋友群組連結"
      ]
    },
    {
      "type": "range",
      "key": "shareNeed",
      "label": "想分享給朋友的程度",
      "min": 1,
      "max": 100,
      "value": 64,
      "left": "自己用",
      "right": "想發限動"
    }
  ],
  "id": "T010",
  "categoryLabel": "社群靈感轉行程",
  "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
  "primary": "#08A7A0",
  "accent": "#08A7A0",
  "deep": "#1C1915",
  "appUrl": "https://apps.apple.com/tw/app/chillout/id6760571567?ct=tool_aesthetic-to-itinerary",
  "pageUrl": "https://chillout-marketing-dashboard.vercel.app/tools/aesthetic-to-itinerary.html"
};
  const consoleNode = document.querySelector("[data-tool-console]");
  const resultCard = document.querySelector("[data-result-card]");
  if (!consoleNode || !resultCard) return;

  const state = {};

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const escapeAttr = (value) => escapeHtml(value).replaceAll("'", "&#39;");

  const sampleItems = tool.sampleItems?.length ? tool.sampleItems : (tool.chips || []);

  function initState() {
    tool.inputs.forEach((input) => {
      if (input.type === "range") state[input.key] = Number(input.value ?? 50);
      if (input.type === "choice") state[input.key] = input.choices?.[0] || "";
      if (input.type === "text") state[input.key] = "";
    });
  }

  function fieldHtml(input) {
    if (input.type === "text") {
      return `
        <label class="console-field text-field">
          <span>${escapeHtml(input.label)}</span>
          <input type="text" data-input-key="${escapeAttr(input.key)}" placeholder="${escapeAttr(input.placeholder || "")}" autocomplete="off">
        </label>`;
    }

    if (input.type === "choice") {
      return `
        <div class="console-field choice-field">
          <span>${escapeHtml(input.label)}</span>
          <div class="choice-grid">
            ${(input.choices || []).map((choice, index) => `
              <button type="button" class="${index === 0 ? "active" : ""}" data-choice-key="${escapeAttr(input.key)}" data-choice-value="${escapeAttr(choice)}">${escapeHtml(choice)}</button>
            `).join("")}
          </div>
        </div>`;
    }

    const value = Number(input.value ?? 50);
    return `
      <label class="console-field range-field">
        <span>${escapeHtml(input.label)} <strong data-range-value="${escapeAttr(input.key)}">${value}</strong></span>
        <input type="range" min="${input.min}" max="${input.max}" value="${value}" data-input-key="${escapeAttr(input.key)}">
        <small><em>${escapeHtml(input.left || "")}</em><em>${escapeHtml(input.right || "")}</em></small>
      </label>`;
  }

  function renderConsole() {
    consoleNode.innerHTML = `
      <div class="console-head mode-head">
        <div>
          <p>${escapeHtml(tool.modeLabel || tool.categoryLabel)}</p>
          <h2>${escapeHtml(tool.interfaceTitle || tool.name)}</h2>
        </div>
        <button type="button" data-randomize>隨機試玩</button>
      </div>
      <div class="mode-brief">
        <strong>${escapeHtml(tool.modeVariant || "互動工具")}</strong>
        <span>${escapeHtml(tool.modePromise || tool.mechanic)}</span>
      </div>
      <div class="sample-strip" aria-label="範例素材">
        ${sampleItems.slice(0, 7).map((item) => `<button type="button" data-sample="${escapeAttr(item)}">${escapeHtml(item)}</button>`).join("")}
      </div>
      <div class="console-fields mode-fields mode-${escapeAttr(tool.mode)}">
        ${tool.inputs.map(fieldHtml).join("")}
      </div>
      <button type="button" class="product-button primary wide" data-generate>${escapeHtml(tool.actionLabel || "生成結果")}</button>
    `;
  }

  function numberValues() {
    return Object.values(state).map((value, index) => {
      if (typeof value === "number") return value;
      if (!value) return 34 + index * 6;
      return Math.min(96, 36 + String(value).length * 3 + index * 5);
    });
  }

  function scoreFromState() {
    const values = numberValues();
    const average = values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
    const seed = Number(tool.scoreSeed || 62) - 62;
    return Math.max(12, Math.min(99, Math.round(average + seed)));
  }

  function listFromText(key) {
    const textValue = String(state[key] || "").trim();
    const parts = textValue
      .split(/[\n,，、;；/]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    return parts.length ? parts : sampleItems.slice(0, 6);
  }

  function primaryText() {
    const entry = Object.values(state).find((value) => typeof value === "string" && value.trim());
    return entry || sampleItems[0] || tool.name;
  }

  function bucketHtml(labels, items) {
    return `
      <div class="mode-buckets">
        ${labels.map((label, labelIndex) => `
          <section>
            <h3>${escapeHtml(label)}</h3>
            <ul>
              ${items.filter((_, itemIndex) => itemIndex % labels.length === labelIndex).slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || `<li>${escapeHtml(sampleItems[labelIndex] || tool.name)}</li>`}
            </ul>
          </section>
        `).join("")}
      </div>`;
  }

  function timelineHtml(rows) {
    return `
      <div class="mode-timeline">
        ${rows.map((row) => `
          <article>
            <span>${escapeHtml(row.time)}</span>
            <div>
              <h3>${escapeHtml(row.title)}</h3>
              <p>${escapeHtml(row.copy)}</p>
            </div>
          </article>
        `).join("")}
      </div>`;
  }

  function metricHtml(rows) {
    return `
      <div class="mode-metrics">
        ${rows.map((row) => `
          <section>
            <strong>${escapeHtml(row.label)}</strong>
            <div><span style="width:${Math.max(8, Math.min(100, row.value))}%"></span></div>
            <em>${escapeHtml(row.note)}</em>
          </section>
        `).join("")}
      </div>`;
  }

  function executionPackHtml(result) {
    const pack = tool.executionPack || {};
    const actions = pack.actions || tool.playSteps || [];
    const hooks = pack.hooks || [`我剛完成 ${tool.name}，結果是 ${result.title}`];
    const qa = pack.qa || ["結果可理解", "Prompt 可複製", "App 導流可追蹤"];
    return `
      <div class="execution-pack">
        <section>
          <h3>下一步行動</h3>
          <ol>${actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        </section>
        <section>
          <h3>社群鉤子</h3>
          <ul>${hooks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>檢核</h3>
          <ul>${qa.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </div>`;
  }

  function buildSorter(score) {
    const items = listFromText("rawList");
    return {
      score,
      title: score >= 72 ? "可以直接排第一版行程" : "先把靈感減量再出發",
      body: `${tool.name} 已把素材分成三種處理方式：先排、備用、刪除。`,
      chips: ["今天必排", "可備用", "先刪掉"],
      prompt: `請用 ChillOut 把「${tool.name}」整理成 1 天旅行：先安排 ${items.slice(0, 3).join("、")}，並保留低壓備案。`,
      detailHtml: bucketHtml(["今天必排", "可備用", "先刪掉"], items)
    };
  }

  function buildQuiz(score) {
    const roles = ["城市慢熟者", "路線掌控者", "味覺雷達", "風景收藏家", "即興冒險家"];
    const role = roles[score % roles.length];
    return {
      score,
      title: `你的結果是：${role}`,
      body: `${tool.name} 顯示你適合以「${state.anchor || sampleItems[0]}」當作行程核心。`,
      chips: [role, state.pace || "自訂節奏", state.anchor || sampleItems[0]],
      prompt: `請用 ChillOut 幫「${role}」安排 1 天行程。我的偏好是 ${state.pace}、重視 ${state.anchor}、社交能量 ${state.social}/100。`,
      detailHtml: metricHtml([
        { label: "行程密度", value: score, note: state.pace || "看心情" },
        { label: "即興彈性", value: state.risk === "越即興越好" ? 86 : state.risk === "可接受一點" ? 58 : 28, note: state.risk || "待測" },
        { label: "社交能量", value: Number(state.social || 50), note: Number(state.social || 50) > 60 ? "適合互動點" : "保留安靜角落" }
      ])
    };
  }

  function buildPact(score) {
    const people = listFromText("people").slice(0, 4);
    const conflict = state.conflict || sampleItems[0];
    return {
      score,
      title: score >= 66 ? "旅伴共識可先成立" : "需要先談好底線",
      body: `這份協議先處理「${conflict}」這個高風險吵點。`,
      chips: ["預算共識", "放風時間", conflict],
      prompt: `請用 ChillOut 幫 ${people.join("、")} 安排旅伴友善行程：最容易吵的是 ${conflict}，預算差距 ${state.budgetGap}/100，各自放風需求 ${state.aloneTime}/100。`,
      detailHtml: `
        <div class="mode-contract">
          ${[
            `所有人每天只能有 1 個非去不可的點。`,
            `遇到 ${conflict} 分歧時，以當天體力最低的人優先。`,
            `預算超過共識時，必須有平價替代方案。`,
            `每天保留 ${Number(state.aloneTime || 50) > 55 ? "90" : "45"} 分鐘各自行動。`
          ].map((clause, index) => `<p><strong>${index + 1}</strong>${escapeHtml(clause)}</p>`).join("")}
        </div>`
    };
  }

  function buildNightRoute(score) {
    const city = state.city || "這座城市";
    const mood = state.nightMood || sampleItems[0];
    return {
      score,
      title: `${city}夜晚可以這樣走`,
      body: `先用 ${mood} 定調，再把返程安全放進路線。`,
      chips: [state.time || "晚餐後", mood, "安全返程"],
      prompt: `請用 ChillOut 幫我在 ${city} 排一條夜遊路線：出門時段 ${state.time}，主題 ${mood}，安全保守度 ${state.safety}/100。`,
      detailHtml: timelineHtml([
        { time: "18:30", title: "低壓集合", copy: `${city} 先選好抵達容易的晚餐或散步入口。` },
        { time: "20:30", title: mood, copy: "安排一個主要夜景或夜生活點，不連續硬塞行程。" },
        { time: "22:30", title: "安全收尾", copy: "保留宵夜備案與返程路線，避免最後一段失控。" }
      ])
    };
  }

  function buildDecision(score) {
    const target = state.target || primaryText();
    const status = score >= 72 ? "值得去" : score >= 48 ? "改成替代玩法" : "這次先跳過";
    return {
      score,
      title: `${target}：${status}`,
      body: `判斷核心是人潮耐受 ${state.crowd}/100 與移動成本 ${state.effort}/100。`,
      chips: [status, state.backup || sampleItems[2], "備案先排"],
      prompt: `請用 ChillOut 幫我處理「${target}」：如果值得去，排最佳時段；如果不值得，改成 ${state.backup} 類型替代玩法。`,
      detailHtml: bucketHtml(["去", "改", "跳過"], [target, state.backup || sampleItems[2], sampleItems[3], sampleItems[4], sampleItems[5], "附近低壓點"])
    };
  }

  function buildWellness(score) {
    const energy = state.energy || "想慢慢來";
    const comfort = state.comfort || sampleItems[0];
    return {
      score,
      title: "今天要先保護能量",
      body: `${tool.name} 建議用 ${comfort} 當作恢復核心，不要把行程排滿。`,
      chips: [energy, comfort, "低壓節奏"],
      prompt: `請用 ChillOut 幫我安排低壓旅行：目前能量 ${energy}，恢復來源 ${comfort}，離線程度 ${state.screen}/100，活動量 ${state.activity}/100。`,
      detailHtml: metricHtml([
        { label: "上午", value: 42, note: "只放一個主行程" },
        { label: "下午", value: Number(state.activity || 40), note: `${comfort} 作為恢復點` },
        { label: "晚上", value: 30, note: "提早收尾，不追滿" }
      ])
    };
  }

  function buildCultureMission(score) {
    const ref = state.reference || primaryText();
    const scene = state.scene || sampleItems[1];
    return {
      score,
      title: `${ref}已變成城市任務`,
      body: `這趟不是打卡清單，而是用 ${scene} 進入故事。`,
      chips: [ref, scene, state.souvenir || "照片"],
      prompt: `請用 ChillOut 把「${ref}」變成旅行任務：場景 ${scene}，沉浸程度 ${state.immersion}/100，想帶走 ${state.souvenir}。`,
      detailHtml: `
        <div class="mission-grid">
          ${["找一個開場鏡頭", "拍一張角色視角", "收集一句城市台詞", "用一餐做結尾"].map((mission, index) => `
            <article><span>Mission ${index + 1}</span><h3>${escapeHtml(mission)}</h3><p>${escapeHtml(index === 0 ? scene : sampleItems[index])}</p></article>
          `).join("")}
        </div>`
    };
  }

  function buildFoodRoute(score) {
    const craving = state.craving || primaryText();
    return {
      score,
      title: `今天的味覺主線是 ${craving}`,
      body: `用排隊耐受 ${state.queue}/100 與預算 ${state.budget}/100 控制節奏。`,
      chips: [craving, state.flavor || sampleItems[0], "吃走平衡"],
      prompt: `請用 ChillOut 幫我排美食路線：想吃 ${craving}，味覺主題 ${state.flavor}，排隊耐受 ${state.queue}/100，預算 ${state.budget}/100。`,
      detailHtml: timelineHtml([
        { time: "09:30", title: "第一口", copy: `${sampleItems[0]}，先讓身體進入城市。` },
        { time: "12:30", title: "主餐", copy: `${craving} 放在最有精神的時段。` },
        { time: "16:00", title: "散步甜點", copy: `${sampleItems[3]} 搭配一段不趕路的移動。` },
        { time: "21:00", title: "收尾", copy: `${sampleItems[5]} 或低壓宵夜備案。` }
      ])
    };
  }

  function buildMicroPlanner(score) {
    const windowText = state.window || "半天";
    return {
      score,
      title: `${windowText}也能成行`,
      body: `這張短逃卡把交通、預算與即興程度先鎖住。`,
      chips: [windowText, state.transport || "走路", "快閃"],
      prompt: `請用 ChillOut 幫我安排 ${windowText} 快閃旅行：交通 ${state.transport}，預算彈性 ${state.budget}/100，即興程度 ${state.spontaneous}/100。`,
      detailHtml: timelineHtml([
        { time: "0:00", title: "出發入口", copy: `用 ${state.transport || "走路"} 到最容易抵達的第一站。` },
        { time: "1:20", title: "主體驗", copy: `${sampleItems[1]} 作為這趟最重要的一件事。` },
        { time: "2:30", title: "收尾帶走", copy: `${sampleItems[4]} 或一張可分享照片。` }
      ])
    };
  }

  function buildMemoryMaker(score) {
    const memory = state.memory || primaryText();
    const format = state.format || "IG 貼文";
    return {
      score,
      title: `標題：${memory}之後`,
      body: `${tool.name} 已整理出適合 ${format} 的開場與下一趟線索。`,
      chips: [format, state.next || sampleItems[2], "回憶卡"],
      prompt: `請用 ChillOut 把「${memory}」做成 ${format}：情緒濃度 ${state.emotion}/100，下一趟線索 ${state.next}。`,
      detailHtml: `
        <div class="memory-card">
          <strong>${escapeHtml(memory)}</strong>
          <p>這趟旅行最值得留下的不是景點數，而是這一幕讓我想再出發。</p>
          <span>${escapeHtml(format)} · ${escapeHtml(state.next || sampleItems[2])}</span>
        </div>`
    };
  }

  function buildResult() {
    const score = scoreFromState();
    const builders = {
      sorter: buildSorter,
      quiz: buildQuiz,
      pact: buildPact,
      nightRoute: buildNightRoute,
      decision: buildDecision,
      wellnessPlan: buildWellness,
      cultureMission: buildCultureMission,
      foodRoute: buildFoodRoute,
      microPlanner: buildMicroPlanner,
      memoryMaker: buildMemoryMaker
    };
    return (builders[tool.mode] || buildSorter)(score);
  }

  function updateResult() {
    const result = buildResult();
    const scoreNode = document.querySelector("[data-result-score]");
    const titleNode = document.querySelector("[data-result-title]");
    const copyNode = document.querySelector("[data-result-copy]");
    const promptNode = document.querySelector("[data-result-prompt]");
    const chipsNode = document.querySelector("[data-result-chips]");
    let outputNode = document.querySelector("[data-mode-output]");
    if (!outputNode) {
      outputNode = document.createElement("div");
      outputNode.className = "mode-output";
      outputNode.dataset.modeOutput = "";
      document.querySelector(".result-prompt")?.before(outputNode);
    }

    scoreNode.textContent = result.score;
    titleNode.textContent = result.title;
    copyNode.textContent = result.body;
    promptNode.textContent = result.prompt;
    chipsNode.innerHTML = result.chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("");
    outputNode.innerHTML = result.detailHtml + executionPackHtml(result);

    const shareText = `${tool.shareLead || "我完成了一個旅行小工具"}：${result.title}（${result.score}/100）\n${result.body}\n\n我會丟到 ChillOut 生成完整行程：${tool.appUrl}`;
    const copyButton = document.querySelector("[data-copy-result]");
    const appLink = document.querySelector("[data-app-link]");
    if (copyButton) copyButton.dataset.copy = shareText;
    if (appLink) appLink.href = `${tool.appUrl}_${tool.mode}_${result.score}`;
  }

  function syncRangeLabel(key, value) {
    const output = document.querySelector(`[data-range-value="${CSS.escape(key)}"]`);
    if (output) output.textContent = value;
  }

  function setTextSample(sample) {
    const firstText = tool.inputs.find((input) => input.type === "text");
    if (!firstText) return;
    const current = String(state[firstText.key] || "").trim();
    state[firstText.key] = current ? `${current}、${sample}` : sample;
    const inputNode = consoleNode.querySelector(`[data-input-key="${CSS.escape(firstText.key)}"]`);
    if (inputNode) inputNode.value = state[firstText.key];
  }

  function randomize() {
    tool.inputs.forEach((input, index) => {
      if (input.type === "range") {
        const value = Math.floor(Number(input.min) + Math.random() * (Number(input.max) - Number(input.min)));
        state[input.key] = value;
        const range = consoleNode.querySelector(`[data-input-key="${CSS.escape(input.key)}"]`);
        if (range) range.value = value;
        syncRangeLabel(input.key, value);
      }
      if (input.type === "choice") {
        const value = input.choices[Math.floor(Math.random() * input.choices.length)];
        state[input.key] = value;
        consoleNode.querySelectorAll(`[data-choice-key="${CSS.escape(input.key)}"]`).forEach((button) => {
          button.classList.toggle("active", button.dataset.choiceValue === value);
        });
      }
      if (input.type === "text") {
        const value = sampleItems[(index + Math.floor(Math.random() * sampleItems.length)) % sampleItems.length];
        state[input.key] = value;
        const text = consoleNode.querySelector(`[data-input-key="${CSS.escape(input.key)}"]`);
        if (text) text.value = value;
      }
    });
    updateResult();
  }

  function bindEvents() {
    consoleNode.addEventListener("input", (event) => {
      const key = event.target.dataset.inputKey;
      if (!key) return;
      const input = tool.inputs.find((item) => item.key === key);
      state[key] = input?.type === "range" ? Number(event.target.value) : event.target.value;
      if (input?.type === "range") syncRangeLabel(key, state[key]);
      updateResult();
    });

    consoleNode.addEventListener("click", (event) => {
      const sample = event.target.closest("[data-sample]");
      if (sample) {
        setTextSample(sample.dataset.sample);
        updateResult();
        return;
      }

      const choice = event.target.closest("[data-choice-key]");
      if (choice) {
        const key = choice.dataset.choiceKey;
        state[key] = choice.dataset.choiceValue;
        consoleNode.querySelectorAll(`[data-choice-key="${CSS.escape(key)}"]`).forEach((button) => button.classList.remove("active"));
        choice.classList.add("active");
        updateResult();
        return;
      }

      if (event.target.matches("[data-randomize]")) randomize();
      if (event.target.matches("[data-generate]")) updateResult();
    });

    document.querySelector("[data-copy-result]")?.addEventListener("click", async (event) => {
      const text = event.currentTarget.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
        event.currentTarget.textContent = "已複製";
        setTimeout(() => { event.currentTarget.textContent = "複製分享文案"; }, 1400);
      } catch {
        window.prompt("複製分享文案", text);
      }
    });
  }

  initState();
  renderConsole();
  bindEvents();
  updateResult();
})();

