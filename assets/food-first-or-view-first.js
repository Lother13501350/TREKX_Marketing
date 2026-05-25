(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    craving: document.querySelector("[data-craving]"),
    hunger: document.querySelector("[data-hunger]"),
    queue: document.querySelector("[data-queue]"),
    view: document.querySelector("[data-view]"),
    walk: document.querySelector("[data-walk]"),
    budget: document.querySelector("[data-budget]"),
    photo: document.querySelector("[data-photo]"),
    mealtime: document.querySelector("[data-mealtime]")
  };

  function number(key) {
    return Number(fields[key].value || 0);
  }

  function foodScore() {
    let score = number("hunger") + (100 - number("queue")) * 0.32;
    if (fields.budget.value === "high") score += 10;
    if (fields.mealtime.value === "early") score += 12;
    if (fields.photo.value === "high") score -= 4;
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  function viewScore() {
    let score = number("view") + number("walk") * 0.22;
    if (fields.photo.value === "high") score += 14;
    if (fields.mealtime.value === "late") score += 8;
    if (fields.budget.value === "low") score += 4;
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  function decision(food, view) {
    if (food - view >= 12) return {
      key: "food",
      title: "先鎖餐廳",
      body: "今天的飢餓與排隊風險比景色更會影響心情。先把餐廳位置固定，再把景點接在附近。"
    };
    if (view - food >= 12) return {
      key: "view",
      title: "先鎖風景",
      body: "今天的畫面感和步行意願比較高。先決定光線與景色，再找順路、低等待的餐點。"
    };
    return {
      key: "hybrid",
      title: "混合排序",
      body: "你不是單純美食派或風景派。今天要用餐廳當節點、景色當連線，避免任何一邊壓過另一邊。"
    };
  }

  function timeline(plan) {
    const city = fields.city.value.trim() || "目的地";
    const craving = fields.craving.value.trim() || "想吃的東西";
    if (plan.key === "food") {
      return [
        ["10:30", "先到餐廳同區", `把 ${craving} 附近設成起點，先降低餓壞風險。`],
        ["12:00", "主餐優先", "排隊耐受不高，午餐不要賭太熱門的現場候位。"],
        ["14:30", "附近風景散步", `${city} 的景點接在餐廳後面，走得順比硬跨區重要。`],
        ["17:30", "甜點或夜景收尾", "用低等待的咖啡、甜點或夕陽點收束。"]
      ];
    }
    if (plan.key === "view") {
      return [
        ["09:30", "先追光線", `${city} 的漂亮畫面放在體力最好、光線最穩的時段。`],
        ["12:30", "順路吃飯", `用 ${craving} 當中繼，不為了吃飯繞太遠。`],
        ["15:00", "第二個視覺點", "把拍照需求集中處理，不要每站都重新進入拍攝模式。"],
        ["18:00", "晚餐補體力", "晚餐選交通好回住宿的區域。"]
      ];
    }
    return [
      ["10:00", "咖啡或輕食開場", `先用 ${craving} 的其中一項當緩衝，避免空腹開始。`],
      ["12:30", "主景點", `${city} 的主畫面放在午餐前後，減少來回移動。`],
      ["15:30", "甜點與街區", "把吃喝和散步合併，形成不累的下午段。"],
      ["18:30", "晚餐或夜景二選一", "看當天體力選一個，不要兩個都硬塞。"]
    ];
  }

  function rules(plan) {
    const base = [];
    if (number("queue") < 45) base.push("不要把不能訂位的名店放在主線，最多當備案。");
    if (number("walk") < 45) base.push("每兩站之間加一個坐下來的吃喝點。");
    if (fields.photo.value === "high") base.push("拍照點一次集中處理，避免每一站都拖慢節奏。");
    if (fields.budget.value === "low") base.push("把高預算餐留給一餐，其他用市場、小吃或咖啡平衡。");
    if (!base.length) base.push("每段移動控制在 25 分鐘內，讓吃與看都不互相拖累。");
    base.push(plan.key === "food" ? "主餐位置先固定，再用 ChillOut 補順路景點。" : "主景色先固定，再用 ChillOut 補附近餐廳。");
    return base;
  }

  function promptFor(plan, food, view, slots, planRules) {
    return `請用 ChillOut 幫我安排「${fields.city.value.trim() || "目的地"}」一日行程。判斷結果是「${plan.title}」，美食分 ${food}/100，風景分 ${view}/100。今天想吃：${fields.craving.value.trim() || "由你建議"}。排隊耐受 ${number("queue")}/100，步行耐受 ${number("walk")}/100，預算 ${fields.budget.options[fields.budget.selectedIndex].textContent}，拍照需求 ${fields.photo.options[fields.photo.selectedIndex].textContent}。請依照這個順序：${slots.map((slot) => `${slot[0]} ${slot[1]}`).join("；")}，並遵守：${planRules.join("；")}。請補上店家/景點類型、替代方案、雨天版本和可分享標題。`;
  }

  function render() {
    ["hunger", "queue", "view", "walk"].forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const food = foodScore();
    const view = viewScore();
    const plan = decision(food, view);
    const slots = timeline(plan);
    const planRules = rules(plan);
    const prompt = promptFor(plan, food, view, slots, planRules);
    const share = `我的 ChillOut 旅行排序是「${plan.title}」：美食 ${food}/100，風景 ${view}/100。順序對了，整天都會輕鬆很多。`;

    result.innerHTML = `
      <div class="fv-decision">
        <div>
          <small>T016 priority verdict</small>
          <h2>${escapeHtml(plan.title)}</h2>
          <p>${escapeHtml(plan.body)}</p>
        </div>
        <div class="fv-score" aria-label="排序信心">${Math.abs(food - view) + 70}</div>
      </div>
      <div class="fv-timeline">
        ${slots.map((slot) => `
          <article class="fv-slot">
            <time>${escapeHtml(slot[0])}</time>
            <h3>${escapeHtml(slot[1])}</h3>
            <p>${escapeHtml(slot[2])}</p>
          </article>
        `).join("")}
      </div>
      <div class="fv-rules">
        <h3>今天的排序規則</h3>
        <ul>${planRules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
      </div>
      <div class="fv-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="fv-result-actions">
        <button class="fv-button" type="button" data-copy-share>複製分享文案</button>
        <button class="fv-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="fv-button fv-primary" data-app-link href="${appStore}?ct=tool_food_first_or_view_first_manual_${plan.key}_${food}_${view}">丟進 ChillOut</a>
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
    fields.city.value = "京都";
    fields.craving.value = "咖啡、鰻魚飯、抹茶甜點";
    fields.hunger.value = "72";
    fields.queue.value = "38";
    fields.view.value = "68";
    fields.walk.value = "55";
    fields.budget.value = "mid";
    fields.photo.value = "mid";
    fields.mealtime.value = "normal";
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
