(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = [
    "弘大 rooftop bar 晚上拍照",
    "延南洞咖啡甜點",
    "景福宮韓服拍照",
    "廣藏市場晚餐",
    "漢江散步"
  ].join("\n");

  const els = {
    input: document.querySelector("[data-places]"),
    city: document.querySelector("[data-city]"),
    mood: document.querySelector("[data-mood]"),
    result: document.querySelector("[data-result]"),
    count: document.querySelector("[data-count]"),
    toast: document.querySelector("[data-toast]")
  };

  function lines() {
    return (els.input.value || "")
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.\s]+/, ""))
      .filter(Boolean)
      .slice(0, 12);
  }

  function typeOf(text) {
    if (/咖啡|甜點|茶|早餐/.test(text)) return "休息點";
    if (/晚餐|市場|吃|餐/.test(text)) return "吃飯";
    if (/夜|bar|酒/.test(text)) return "晚上";
    if (/拍照|景|韓服/.test(text)) return "主景點";
    return "順路點";
  }

  function pickRoute(items) {
    const main = items.find((item) => typeOf(item) === "主景點") || items[0];
    const rest = items.find((item) => typeOf(item) === "休息點") || items[1] || main;
    const food = items.find((item) => typeOf(item) === "吃飯") || items[2] || rest;
    const night = items.find((item) => typeOf(item) === "晚上") || items[3] || food;
    return [main, rest, food, night].filter((item, index, arr) => item && arr.indexOf(item) === index).slice(0, 4);
  }

  function buildPrompt(route, keep, later) {
    return `請用 ChillOut 幫我把這些 IG 收藏整理成 ${els.city.value || "目的地"} 一日行程。旅行氛圍是「${els.mood.value}」。必排路線：${route.join(" → ")}。可備用：${later.join("、") || "無"}。請輸出順路動線、每站停留時間、附近餐廳/咖啡、雨天備案和可分享標題。`;
  }

  function render() {
    const items = lines();
    els.count.textContent = items.length;
    if (!items.length) {
      els.result.innerHTML = `<div class="ss-empty">貼上收藏後，這裡會產生一條最簡單的第一版路線。</div>`;
      return;
    }
    const route = pickRoute(items);
    const later = items.filter((item) => !route.includes(item)).slice(0, 5);
    const prompt = buildPrompt(route, route, later);
    const share = `我用 ChillOut 的 IG 靈感急救室，把 ${items.length} 個收藏整理成一條 ${els.city.value} 路線：${route.join(" → ")}。`;
    const slots = ["10:00", "13:00", "16:00", "20:00"];
    els.result.innerHTML = `
      <section class="ss-card">
        <h2>你的第一版路線</h2>
        <p class="ss-help">先照這條走，剩下的收藏放備用，不用再卡在選擇障礙。</p>
        <div class="ss-route">
          ${route.map((item, index) => `
            <article class="ss-stop">
              <div class="ss-time">${slots[index] || "備用"}</div>
              <div><strong>${escapeHtml(item)}</strong><small>${typeOf(item)}</small></div>
            </article>
          `).join("")}
        </div>
      </section>
      <div class="ss-output-grid">
        <section class="ss-mini"><strong>先不要排</strong><ul>${later.length ? later.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>沒有多餘收藏</li>"}</ul></section>
        <section class="ss-mini"><strong>下一步</strong><ul><li>把 prompt 丟進 ChillOut</li><li>讓 App 補交通與備案</li></ul></section>
      </div>
      <section class="ss-card">
        <h2>ChillOut Prompt</h2>
        <div class="ss-prompt">${escapeHtml(prompt)}</div>
        <div class="ss-actions">
          <button class="ss-button" data-copy-prompt>複製 Prompt</button>
          <button class="ss-button" data-copy-share>複製分享文案</button>
          <a class="ss-button primary" href="${appStore}?ct=tool_save_sprint_simple">丟進 ChillOut</a>
        </div>
      </section>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(prompt));
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
    els.input.value = sample;
    render();
  });
  document.querySelector("[data-generate]").addEventListener("click", render);
  [els.input, els.city, els.mood].forEach((node) => node.addEventListener("input", render));

  els.input.value = sample;
  render();
})();
