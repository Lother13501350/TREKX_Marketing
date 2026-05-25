(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = ["景福宮韓服拍照", "益善洞傳統茶屋", "廣藏市場晚餐"];
  const form = document.querySelector("[data-form]");
  const shotInputs = Array.from(document.querySelectorAll("[data-shot]"));
  const cityInput = document.querySelector("[data-city]");
  const startSelect = document.querySelector("[data-start]");
  const paceSelect = document.querySelector("[data-pace]");
  const resultNode = document.querySelector("[data-result]");
  const toastNode = document.querySelector("[data-toast]");

  function values() {
    return shotInputs
      .map((input) => input.value.trim())
      .filter(Boolean)
      .slice(0, 3);
  }

  function kind(text) {
    if (/咖啡|茶|甜|書店|選物/i.test(text)) return "休息";
    if (/市場|晚餐|午餐|早餐|餐|小吃|酒/i.test(text)) return "吃飯";
    if (/拍|宮|美術|博物|韓服|展|街區/i.test(text)) return "拍照";
    if (/公園|河|海|山|散步/i.test(text)) return "散步";
    return "景點";
  }

  function routeOrder(list) {
    const weightByPace = {
      "輕鬆": { "拍照": 1, "景點": 2, "休息": 3, "散步": 4, "吃飯": 5 },
      "拍照優先": { "拍照": 1, "景點": 2, "休息": 3, "散步": 4, "吃飯": 5 },
      "吃喝優先": { "休息": 1, "吃飯": 2, "拍照": 3, "景點": 4, "散步": 5 },
      "少走路": { "景點": 1, "休息": 2, "吃飯": 3, "拍照": 4, "散步": 5 }
    };
    const weights = weightByPace[paceSelect.value] || weightByPace["輕鬆"];
    return list
      .map((name, index) => ({ name, index, type: kind(name), weight: weights[kind(name)] || 9 }))
      .sort((a, b) => a.weight - b.weight || a.index - b.index);
  }

  function timeAt(index) {
    const hour = Number((startSelect.value || "10:00").slice(0, 2)) + index * 2;
    return `${String(hour).padStart(2, "0")}:00`;
  }

  function friction(route) {
    const hasRest = route.some((item) => item.type === "休息");
    const hasFood = route.some((item) => item.type === "吃飯");
    const base = 82 - route.length * 5;
    return Math.max(42, Math.min(96, base + (hasRest ? 8 : 0) + (hasFood ? 8 : 0)));
  }

  function buildPrompt(route, score) {
    const city = cityInput.value.trim() || "目的地";
    return `請用 ChillOut 幫我把三張截圖排成 ${city} 半日行程。開始時間 ${startSelect.value}，節奏偏好「${paceSelect.value}」。三個點依建議順序是：${route.map((item) => item.name).join(" → ")}。請補上實際移動順序、每站停留時間、附近餐廳或咖啡、雨天備案、拍照角度，以及一段可分享的行程標題。這條路線的順路分數是 ${score}/100。`;
  }

  function render() {
    const list = values();
    if (!list.length) {
      resultNode.innerHTML = `<div class="sr-empty">填入三張截圖代表的地點，就會得到一條半日路線。</div>`;
      return;
    }

    const route = routeOrder(list);
    const score = friction(route);
    const prompt = buildPrompt(route, score);
    const share = `我用 ChillOut 三張截圖路線工坊，把 ${route.map((item) => item.name).join(" → ")} 排成一條半日路線。順路分數 ${score}/100。`;

    resultNode.innerHTML = `
      <section class="sr-result-panel">
        <h2>${score >= 76 ? "這三張可以直接排" : "建議補一個休息點"}</h2>
        <p>工具先用截圖語意判斷類型，再依你的節奏排出半日順序。</p>
        <div class="sr-route">
          ${route.map((item, index) => `
            <article class="sr-step">
              <div class="sr-time">${timeAt(index)}</div>
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <small>${index === 0 ? "開場點" : index === route.length - 1 ? "收尾點" : "中段轉場"}</small>
              </div>
              <span class="sr-kind">${escapeHtml(item.type)}</span>
            </article>
          `).join("")}
        </div>
      </section>

      <aside class="sr-side">
        <section class="sr-meter">
          <small>順路分數</small>
          <strong>${score}</strong>
          <p>${score >= 76 ? "移動壓力合理，可以交給 ChillOut 補交通。" : "路線成立，但建議再加一個低壓備案。"}</p>
        </section>
        <section class="sr-prompt">
          <small>ChillOut prompt</small>
          <p>${escapeHtml(prompt)}</p>
        </section>
        <div class="sr-result-actions">
          <button class="sr-button" type="button" data-copy-prompt>複製 Prompt</button>
          <button class="sr-button" type="button" data-copy-share>複製分享文案</button>
          <a class="sr-button sr-primary" href="${appStore}?ct=tool_screenshot_route_manual_${score}">丟進 ChillOut</a>
        </div>
      </aside>
    `;

    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
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
    toastNode.textContent = message;
    toastNode.classList.add("is-visible");
    window.setTimeout(() => toastNode.classList.remove("is-visible"), 1300);
  }

  document.querySelector("[data-sample]").addEventListener("click", () => {
    shotInputs.forEach((input, index) => {
      input.value = sample[index] || "";
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  [...shotInputs, cityInput, startSelect, paceSelect].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
