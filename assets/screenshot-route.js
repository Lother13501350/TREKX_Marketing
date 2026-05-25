(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = ["景福宮韓服拍照", "益善洞傳統茶屋", "廣藏市場晚餐"];
  const els = {
    shots: Array.from(document.querySelectorAll("[data-shot]")),
    city: document.querySelector("[data-city]"),
    start: document.querySelector("[data-start]"),
    result: document.querySelector("[data-result]"),
    toast: document.querySelector("[data-toast]")
  };

  function values() {
    return els.shots.map((input) => input.value.trim()).filter(Boolean);
  }

  function kind(text) {
    if (/茶|咖啡|甜點/.test(text)) return "休息";
    if (/市場|晚餐|吃|餐/.test(text)) return "吃飯";
    if (/拍照|景|宮|美術/.test(text)) return "拍照";
    return "景點";
  }

  function order(list) {
    const weight = { "拍照": 1, "景點": 2, "休息": 3, "吃飯": 4 };
    return [...list].sort((a, b) => weight[kind(a)] - weight[kind(b)]);
  }

  function prompt(route) {
    return `請用 ChillOut 幫我把三張截圖排成 ${els.city.value || "目的地"} 半日行程。起始時間 ${els.start.value}。三個點是：${route.join(" → ")}。請補交通順序、每站停留時間、附近餐廳/咖啡、雨天備案和可分享標題。`;
  }

  function render() {
    const list = values();
    if (!list.length) {
      els.result.innerHTML = `<div class="sr-empty">填入三張截圖代表的地點，就會得到一條簡單路線。</div>`;
      return;
    }
    const route = order(list);
    const start = Number((els.start.value || "10:00").slice(0, 2));
    const routePrompt = prompt(route);
    const share = `我用 ChillOut 三張截圖路線工坊，把 ${route.join(" → ")} 拼成一條半日路線。`;
    els.result.innerHTML = `
      <section class="sr-card">
        <h2>你的截圖路線</h2>
        <p class="sr-help">先照這個順序走，ChillOut 可以再幫你補交通與備案。</p>
        <div class="sr-route">
          ${route.map((item, index) => `
            <article class="sr-step">
              <div class="sr-time">${String(start + index * 2).padStart(2, "0")}:00</div>
              <div><strong>${escapeHtml(item)}</strong><small>${kind(item)}</small></div>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="sr-card">
        <h2>ChillOut Prompt</h2>
        <div class="sr-prompt">${escapeHtml(routePrompt)}</div>
        <div class="sr-actions">
          <button class="sr-button" data-copy-prompt>複製 Prompt</button>
          <button class="sr-button" data-copy-share>複製分享文案</button>
          <a class="sr-button primary" href="${appStore}?ct=tool_screenshot_route_simple">丟進 ChillOut</a>
        </div>
      </section>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(routePrompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copy(share));
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("已複製");
    } catch {
      window.prompt("複製文字", text);
    }
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    setTimeout(() => els.toast.classList.remove("show"), 1300);
  }

  document.querySelector("[data-sample]").addEventListener("click", () => {
    els.shots.forEach((input, index) => { input.value = sample[index] || ""; });
    render();
  });
  document.querySelector("[data-generate]").addEventListener("click", render);
  [...els.shots, els.city, els.start].forEach((node) => node.addEventListener("input", render));

  els.shots.forEach((input, index) => { input.value = sample[index] || ""; });
  render();
})();
