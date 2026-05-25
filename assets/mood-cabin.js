(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = [
    "景福宮韓服拍照",
    "延南洞安靜咖啡",
    "弘大深夜酒吧",
    "廣藏市場小吃",
    "漢江散步",
    "聖水洞選物店",
    "首爾林放空",
    "東大門夜景"
  ].join("\n");
  const cabins = [
    { key: "excited", name: "興奮", hint: "主行程、第一次去、很期待" },
    { key: "slow", name: "放空", hint: "散步、安靜、恢復體力" },
    { key: "photo", name: "拍照", hint: "好看、可分享、值得停留" },
    { key: "food", name: "吃喝", hint: "餐廳、咖啡、夜市、甜點" }
  ];
  const state = { items: [], index: 0, buckets: {}, days: 3 };
  const listInput = document.querySelector("[data-list]");
  const daysSelect = document.querySelector("[data-days]");
  const current = document.querySelector("[data-current]");
  const output = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");

  function parseList() {
    return (listInput.value || sample)
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 18);
  }

  function resetBuckets() {
    state.buckets = Object.fromEntries(cabins.map((cabin) => [cabin.key, []]));
  }

  function guess(item) {
    if (/咖啡|市場|小吃|餐|甜|酒吧|夜市/i.test(item)) return "food";
    if (/拍照|夜景|韓服|景|展|美術/i.test(item)) return "photo";
    if (/散步|放空|林|公園|河|海/i.test(item)) return "slow";
    return "excited";
  }

  function start() {
    state.items = parseList();
    state.index = 0;
    state.days = Number(daysSelect.value || 3);
    resetBuckets();
    render();
  }

  function assign(key) {
    const item = state.items[state.index];
    if (!item) return;
    state.buckets[key].push(item);
    state.index += 1;
    render();
  }

  function autoSort() {
    state.items.slice(state.index).forEach((item) => state.buckets[guess(item)].push(item));
    state.index = state.items.length;
    render();
    showToast("已自動分完剩下景點");
  }

  function dayPlans() {
    const order = ["photo", "food", "slow", "excited"];
    const pool = order.flatMap((key) => state.buckets[key].map((item) => ({ item, key })));
    return Array.from({ length: state.days }, (_, index) => {
      const picks = pool.filter((_, pickIndex) => pickIndex % state.days === index).slice(0, 4);
      const main = picks[0]?.key || order[index % order.length];
      return { day: index + 1, main, items: picks.map((pick) => pick.item) };
    });
  }

  function buildPrompt() {
    const cabinText = cabins.map((cabin) => `${cabin.name}: ${state.buckets[cabin.key].join("、") || "無"}`).join("；");
    return `請用 ChillOut 幫我把景點依心情分艙排成 ${state.days} 天行程。${cabinText}。請讓每天都有清楚主旋律，輸出順路動線、每站停留時間、附近餐廳或咖啡、雨天備案，以及適合分享的行程標題。`;
  }

  function render() {
    const item = state.items[state.index];
    if (!state.items.length) {
      current.innerHTML = `<p class="mc-hint">先載入示範或貼上景點清單。</p>`;
      renderOutput();
      return;
    }

    if (!item) {
      current.innerHTML = `
        <p class="mc-progress">分艙完成</p>
        <h2 class="mc-place">你的行程已經有情緒節奏。</h2>
        <p class="mc-hint">現在把這份分艙結果丟進 ChillOut，讓 App 補交通與備案。</p>
        <button class="mc-button" type="button" data-reset>重新分艙</button>
      `;
      document.querySelector("[data-reset]").addEventListener("click", start);
      renderOutput();
      return;
    }

    current.innerHTML = `
      <p class="mc-progress">${state.index + 1} / ${state.items.length}</p>
      <h2 class="mc-place">${escapeHtml(item)}</h2>
      <p class="mc-hint">這個點最像哪一種旅行心情？</p>
      <div class="mc-cabin-grid">
        ${cabins.map((cabin) => `<button class="mc-cabin-button" type="button" data-cabin="${cabin.key}"><strong>${cabin.name}</strong><span>${cabin.hint}</span></button>`).join("")}
      </div>
      <button class="mc-button" type="button" data-auto>自動分完剩下的</button>
    `;
    document.querySelectorAll("[data-cabin]").forEach((button) => {
      button.addEventListener("click", () => assign(button.dataset.cabin));
    });
    document.querySelector("[data-auto]").addEventListener("click", autoSort);
    renderOutput();
  }

  function renderOutput() {
    const prompt = buildPrompt();
    const share = `我用 ChillOut 景點心情分艙，把 ${state.items.length || 0} 個景點分成興奮、放空、拍照、吃喝，再排成 ${state.days} 天主旋律。`;
    const plans = dayPlans();
    output.innerHTML = `
      <div class="mc-cabins">
        ${cabins.map((cabin) => `<section class="mc-cabin"><strong>${cabin.name}</strong><small>${state.buckets[cabin.key]?.length || 0} 個點</small><ul>${listHtml(state.buckets[cabin.key])}</ul></section>`).join("")}
      </div>
      <div class="mc-days">
        ${plans.map((plan) => `<article class="mc-day"><b>Day ${plan.day}</b><div><strong>${cabinName(plan.main)}日</strong><span>${escapeHtml(plan.items.join(" → ") || "等分艙完成後產生")}</span></div></article>`).join("")}
      </div>
      <div class="mc-prompt"><small>ChillOut prompt</small><p>${escapeHtml(prompt)}</p></div>
      <div class="mc-actions">
        <button class="mc-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="mc-button" type="button" data-copy-share>複製分享文案</button>
        <a class="mc-button mc-primary" href="${appStore}?ct=tool_mood_cabin_result">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function cabinName(key) {
    return cabins.find((cabin) => cabin.key === key)?.name || "混合";
  }

  function listHtml(list = []) {
    return list.length ? list.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>還沒有</li>";
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
    listInput.value = sample;
    start();
  });
  document.querySelector("[data-start]").addEventListener("click", start);
  daysSelect.addEventListener("input", () => {
    state.days = Number(daysSelect.value || 3);
    renderOutput();
  });

  listInput.value = sample;
  start();
})();
