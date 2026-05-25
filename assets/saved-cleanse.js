(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = [
    "聖水洞香氛選物店",
    "明洞觀光逛街",
    "延南洞安靜咖啡",
    "景福宮韓服拍照",
    "弘大深夜酒吧",
    "漢江野餐",
    "廣藏市場小吃"
  ].join("\n");
  const state = { items: [], index: 0, keep: [], later: [], drop: [] };
  const els = {
    list: document.querySelector("[data-list]"),
    card: document.querySelector("[data-card]"),
    summary: document.querySelector("[data-summary]"),
    toast: document.querySelector("[data-toast]")
  };

  function parse() {
    return (els.list.value || sample)
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.\s]+/, ""))
      .filter(Boolean)
      .slice(0, 12);
  }

  function reason(item) {
    if (/觀光|排隊|熱門/.test(item)) return "可能是別人說必去，但不一定適合你的旅行。";
    if (/咖啡|香氛|選物|野餐/.test(item)) return "很適合保留成舒服的中繼點。";
    if (/夜|酒吧|市場/.test(item)) return "適合當作晚上備用，不必硬塞白天。";
    return "先判斷它是主行程、備用，還是只是一時心動。";
  }

  function start() {
    state.items = parse();
    state.index = 0;
    state.keep = [];
    state.later = [];
    state.drop = [];
    render();
  }

  function choose(bucket) {
    const item = state.items[state.index];
    if (!item) return;
    state[bucket].push(item);
    state.index += 1;
    render();
  }

  function buildPrompt() {
    return `請用 ChillOut 幫我把旅行收藏清單整理成一日行程。必排：${state.keep.join("、") || "無"}。備用：${state.later.join("、") || "無"}。先刪掉：${state.drop.join("、") || "無"}。請輸出順路動線、每站停留時間、附近餐廳/咖啡、雨天備案和可分享標題。`;
  }

  function render() {
    const item = state.items[state.index];
    const done = state.index >= state.items.length;
    if (!state.items.length) {
      els.card.innerHTML = `<p class="sc-reason">先載入示範或貼上收藏清單。</p>`;
      renderSummary();
      return;
    }
    if (done) {
      els.card.innerHTML = `
        <p class="sc-progress">清理完成</p>
        <h2 class="sc-place">留下 ${state.keep.length} 個真正想去的點。</h2>
        <p class="sc-reason">現在可以把保留與備用清單丟進 ChillOut，生成第一版行程。</p>
        <a class="sc-button primary" href="${appStore}?ct=tool_saved_cleanse_done">丟進 ChillOut</a>
      `;
      renderSummary();
      return;
    }
    els.card.innerHTML = `
      <p class="sc-progress">${state.index + 1} / ${state.items.length}</p>
      <h2 class="sc-place">${escapeHtml(item)}</h2>
      <p class="sc-reason">${reason(item)}</p>
      <div class="sc-actions">
        <button class="sc-choice" data-choice="keep">保留</button>
        <button class="sc-choice" data-choice="later">備用</button>
        <button class="sc-choice" data-choice="drop">刪掉</button>
      </div>
    `;
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => choose(button.dataset.choice));
    });
    renderSummary();
  }

  function renderSummary() {
    const prompt = buildPrompt();
    const share = `我用 ChillOut 收藏斷捨離清掉旅行收藏：保留 ${state.keep.length} 個、備用 ${state.later.length} 個、刪掉 ${state.drop.length} 個。`;
    els.summary.innerHTML = `
      <div class="sc-buckets">
        ${bucketHtml("保留", state.keep)}
        ${bucketHtml("備用", state.later)}
        ${bucketHtml("刪掉", state.drop)}
      </div>
      <div class="sc-prompt">${escapeHtml(prompt)}</div>
      <div class="sc-actions">
        <button class="sc-button" data-copy-prompt>複製 Prompt</button>
        <button class="sc-button" data-copy-share>複製分享文案</button>
        <a class="sc-button primary" href="${appStore}?ct=tool_saved_cleanse_prompt">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copy(share));
  }

  function bucketHtml(title, list) {
    return `<section class="sc-bucket"><strong>${title}</strong><ul>${list.length ? list.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>還沒有</li>"}</ul></section>`;
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
    els.list.value = sample;
    start();
  });
  document.querySelector("[data-start]").addEventListener("click", start);
  els.list.value = sample;
  start();
})();
