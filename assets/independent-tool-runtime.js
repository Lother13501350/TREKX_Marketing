(() => {
  const dataNode = document.getElementById("tool-data");
  const consoleNode = document.querySelector("[data-tool-console]");
  if (!dataNode || !consoleNode) return;

  const tool = JSON.parse(dataNode.textContent);
  const state = {};

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function inputHtml(input, index) {
    if (input.type === "text") {
      state[input.key] = "";
      return `
        <label class="console-field text-field">
          <span>${escapeHtml(input.label)}</span>
          <input type="text" data-input-key="${input.key}" placeholder="${escapeHtml(input.placeholder || "")}" autocomplete="off">
        </label>`;
    }
    if (input.type === "choice") {
      state[input.key] = input.choices[0];
      return `
        <div class="console-field choice-field">
          <span>${escapeHtml(input.label)}</span>
          <div class="choice-grid">
            ${input.choices.map((choice, choiceIndex) => `
              <button type="button" class="${choiceIndex === 0 ? "active" : ""}" data-choice-key="${input.key}" data-choice-value="${escapeHtml(choice)}">${escapeHtml(choice)}</button>
            `).join("")}
          </div>
        </div>`;
    }
    const value = input.value ?? Math.round((input.min + input.max) / 2);
    state[input.key] = value;
    return `
      <label class="console-field range-field">
        <span>${escapeHtml(input.label)} <strong data-range-value="${input.key}">${value}</strong></span>
        <input type="range" min="${input.min}" max="${input.max}" value="${value}" data-input-key="${input.key}">
        <small><em>${escapeHtml(input.left || "")}</em><em>${escapeHtml(input.right || "")}</em></small>
      </label>`;
  }

  function scoreFromState() {
    const values = Object.entries(state).map(([key, value], index) => {
      if (typeof value === "number") return value;
      if (!value) return 28 + index * 8;
      return Math.min(96, 35 + String(value).length * 4 + index * 7);
    });
    const seed = Number(tool.id.replace("T", "")) % 17;
    return Math.max(18, Math.min(99, Math.round(values.reduce((sum, value) => sum + value, 0) / values.length + seed - 6)));
  }

  function resultTitle(score) {
    if (score >= 86) return "爆發型靈感，可以直接出發";
    if (score >= 68) return "高潛力玩法，適合做成第一版行程";
    if (score >= 48) return "需要整理，但已經有清楚方向";
    return "低壓版本更適合你現在的狀態";
  }

  function buildPrompt(score) {
    const readableState = Object.entries(state)
      .map(([key, value]) => `${key}: ${value || "未填"}`)
      .join("；");
    return `請用 ChillOut 幫我把「${tool.name}」的結果排成 1 天旅行：${tool.result} 我的條件是 ${readableState}。請給我路線、餐廳/景點類型、備案與可分享標題。`;
  }

  function updateResult() {
    const score = scoreFromState();
    const prompt = buildPrompt(score);
    const copy = `${tool.name} 測出我的旅行結果：${score}/100，${resultTitle(score)}。${tool.result} 我準備丟進 ChillOut 生成完整行程：${tool.appUrl}`;
    document.querySelector("[data-result-score]").textContent = score;
    document.querySelector("[data-result-title]").textContent = resultTitle(score);
    document.querySelector("[data-result-copy]").textContent = tool.result;
    document.querySelector("[data-result-prompt]").textContent = prompt;
    document.querySelector("[data-result-chips]").innerHTML = tool.chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("");
    document.querySelector("[data-copy-result]").dataset.copy = copy;
    document.querySelector("[data-app-link]").href = `${tool.appUrl}_score_${score}`;
  }

  consoleNode.innerHTML = `
    <div class="console-head">
      <div>
        <p>${tool.categoryLabel}</p>
        <h2>30 秒生成你的結果卡</h2>
      </div>
      <button type="button" data-randomize>隨機試玩</button>
    </div>
    <div class="console-fields">
      ${tool.inputs.map(inputHtml).join("")}
    </div>
    <button type="button" class="product-button primary wide" data-generate>生成結果卡</button>
  `;

  consoleNode.addEventListener("input", (event) => {
    const key = event.target.dataset.inputKey;
    if (!key) return;
    const input = tool.inputs.find((item) => item.key === key);
    state[key] = input?.type === "range" ? Number(event.target.value) : event.target.value;
    const output = document.querySelector(`[data-range-value="${key}"]`);
    if (output) output.textContent = state[key];
    updateResult();
  });

  consoleNode.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-choice-key]");
    if (choice) {
      const key = choice.dataset.choiceKey;
      state[key] = choice.dataset.choiceValue;
      consoleNode.querySelectorAll(`[data-choice-key="${key}"]`).forEach((button) => button.classList.remove("active"));
      choice.classList.add("active");
      updateResult();
      return;
    }
    if (event.target.matches("[data-randomize]")) {
      tool.inputs.forEach((input) => {
        if (input.type === "range") {
          const value = Math.floor(input.min + Math.random() * (input.max - input.min));
          state[input.key] = value;
          const range = consoleNode.querySelector(`[data-input-key="${input.key}"]`);
          const output = document.querySelector(`[data-range-value="${input.key}"]`);
          if (range) range.value = value;
          if (output) output.textContent = value;
        } else if (input.type === "choice") {
          const value = input.choices[Math.floor(Math.random() * input.choices.length)];
          state[input.key] = value;
          consoleNode.querySelectorAll(`[data-choice-key="${input.key}"]`).forEach((button) => {
            button.classList.toggle("active", button.dataset.choiceValue === value);
          });
        } else {
          const sample = ["首爾咖啡店", "東京夜景", "台南巷弄", "曼谷週末", "京都書店"][Math.floor(Math.random() * 5)];
          state[input.key] = sample;
          const text = consoleNode.querySelector(`[data-input-key="${input.key}"]`);
          if (text) text.value = sample;
        }
      });
      updateResult();
    }
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

  updateResult();
})();
