(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    hours: document.querySelector("[data-hours]"),
    energy: document.querySelector("[data-energy]"),
    curiosity: document.querySelector("[data-curiosity]"),
    movement: document.querySelector("[data-movement]"),
    rest: document.querySelector("[data-rest]"),
    photo: document.querySelector("[data-photo]"),
    food: document.querySelector("[data-food]"),
    party: document.querySelector("[data-party]")
  };

  function value(key) {
    return Number(fields[key].value || 0);
  }

  function slowRatio() {
    let ratio = value("rest") * 0.35 + value("movement") * 0.28 + (100 - value("energy")) * 0.22;
    if (fields.party.value === "family") ratio += 14;
    if (fields.food.value === "two") ratio += 8;
    if (fields.photo.value === "high") ratio += 5;
    ratio -= value("curiosity") * 0.16;
    return Math.round(Math.max(25, Math.min(85, ratio)));
  }

  function stopCount(slow) {
    const hours = value("hours");
    let count = Math.round(hours / 2.1);
    if (slow > 70) count -= 1;
    if (slow < 40) count += 1;
    if (fields.party.value === "group") count -= 1;
    if (fields.photo.value === "high") count -= 1;
    return Math.max(2, Math.min(6, count));
  }

  function profile(slow, stops) {
    if (slow >= 70) return {
      title: "慢旅主線",
      body: `今天建議只排 ${stops} 個主點，把空白當成行程的一部分。`,
      rule: "每個主點之間至少留 35 分鐘緩衝。"
    };
    if (slow <= 42) return {
      title: "快旅衝刺",
      body: `你今天可以排 ${stops} 個點，但要把交通線拉直，不要任性跨區。`,
      rule: "每三站插入一次吃喝或坐下來的段落。"
    };
    return {
      title: "剛剛好混合",
      body: `今天適合排 ${stops} 個主點，用一個慢段落把整天接住。`,
      rule: "上午快一點，下午放慢，晚上不要再加硬景點。"
    };
  }

  function cards(slow, stops) {
    const fast = 100 - slow;
    return [
      ["slow", "慢旅比例", `${slow}%`, slow >= 65 ? "留白、咖啡、散步都算正式行程。" : "不用整天慢，但要保留至少一段休息。"],
      ["fast", "快旅比例", `${fast}%`, fast >= 55 ? "可以多看幾個點，但動線要直。" : "今天不適合用景點數證明旅行有價值。"],
      ["stops", "建議主點", `${stops} 個`, "主點不含吃飯、交通、買水、坐下來休息。"]
    ];
  }

  function flow(plan, stops) {
    if (plan.title === "慢旅主線") {
      return ["第一站選最想去的地方，不加前菜景點。", "中段安排吃飯或咖啡，坐下來至少 45 分鐘。", "最後一站選回住宿順路的景點或街區。"];
    }
    if (plan.title === "快旅衝刺") {
      return ["把所有點排成同一條交通線。", `最多 ${stops} 個主點，超過就讓 ChillOut 放進備案。`, "晚餐後不要再排遠距離移動。"];
    }
    return ["上午排兩個高興趣點。", "下午保留一段慢咖啡或公園散步。", "晚上只留吃飯、夜景或回憶錄素材整理。"];
  }

  function promptFor(plan, slow, stops, steps) {
    return `請用 ChillOut 幫我安排「${fields.city.value.trim() || "目的地"}」一日行程。我的慢旅比例是 ${slow}%，快旅比例是 ${100 - slow}%，建議主點 ${stops} 個。可用時間 ${fields.hours.value} 小時，體力 ${fields.energy.value}/100，好奇心 ${fields.curiosity.value}/100，討厭移動 ${fields.movement.value}/100，休息需求 ${fields.rest.value}/100，拍照需求 ${fields.photo.options[fields.photo.selectedIndex].textContent}，餐廳錨點 ${fields.food.options[fields.food.selectedIndex].textContent}，旅伴狀態 ${fields.party.options[fields.party.selectedIndex].textContent}。請依照「${plan.title}」安排，規則：${plan.rule}；流程：${steps.join("；")}。請輸出順路路線、每站停留時間、刪掉哪些多餘點、雨天備案和旅遊手冊標題。`;
  }

  function render() {
    ["energy", "curiosity", "movement", "rest"].forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const slow = slowRatio();
    const stops = stopCount(slow);
    const plan = profile(slow, stops);
    const cardData = cards(slow, stops);
    const steps = flow(plan, stops);
    const prompt = promptFor(plan, slow, stops, steps);
    const share = `我的 ChillOut 慢旅快旅比例是慢旅 ${slow}% / 快旅 ${100 - slow}%，今天建議排 ${stops} 個主點。`;

    result.innerHTML = `
      <div class="sb-head">
        <div>
          <small>T017 density meter</small>
          <h2>${escapeHtml(plan.title)}</h2>
          <p>${escapeHtml(plan.body)} ${escapeHtml(plan.rule)}</p>
        </div>
        <div class="sb-ratio" aria-label="慢快比例">${slow}<span>慢旅 %</span></div>
      </div>
      <div class="sb-cards">
        ${cardData.map((item) => `
          <article class="sb-card">
            <span>${escapeHtml(item[0])}</span>
            <h3>${escapeHtml(item[1])} · ${escapeHtml(item[2])}</h3>
            <p>${escapeHtml(item[3])}</p>
          </article>
        `).join("")}
      </div>
      <div class="sb-flow">
        <h3>今天的節奏流程</h3>
        <ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      </div>
      <div class="sb-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="sb-result-actions">
        <button class="sb-button" type="button" data-copy-share>複製分享文案</button>
        <button class="sb-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="sb-button sb-primary" data-app-link href="${appStore}?ct=tool_slow_fast_balance_manual_${slow}_${stops}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1300);
  }

  document.querySelector("[data-sample]").addEventListener("click", () => {
    fields.city.value = "大阪";
    fields.hours.value = "7";
    fields.energy.value = "62";
    fields.curiosity.value = "74";
    fields.movement.value = "66";
    fields.rest.value = "70";
    fields.photo.value = "mid";
    fields.food.value = "one";
    fields.party.value = "couple";
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
