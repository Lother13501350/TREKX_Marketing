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
  const listInput = document.querySelector("[data-list]");
  const card = document.querySelector("[data-card]");
  const summary = document.querySelector("[data-summary]");
  const toastNode = document.querySelector("[data-toast]");

  function parseList() {
    return (listInput.value || sample)
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 16);
  }

  function reason(item) {
    if (/觀光|熱門|排隊|名店/i.test(item)) return "可能只是大家說必去，但不一定適合你的旅行。";
    if (/咖啡|香氛|選物|野餐|散步/i.test(item)) return "適合保留成舒服的中繼點，行程壓力比較低。";
    if (/酒吧|市場|小吃|夜/i.test(item)) return "適合當晚上備案，不必硬塞進白天。";
    return "先判斷它是主行程、備用，還是只是一時心動。";
  }

  function start() {
    state.items = parseList();
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
    return `請用 ChillOut 幫我把旅行收藏清單整理成一日行程。必排：${state.keep.join("、") || "無"}。備用：${state.later.join("、") || "無"}。先刪：${state.drop.join("、") || "無"}。請輸出順路動線、每站停留時間、附近餐廳或咖啡、雨天備案，以及適合分享的行程標題。`;
  }

  function render() {
    if (!state.items.length) {
      card.innerHTML = `<p class="sc-reason">先載入示範或貼上收藏清單。</p>`;
      renderSummary();
      return;
    }

    const item = state.items[state.index];
    if (!item) {
      card.innerHTML = `
        <p class="sc-progress">清理完成</p>
        <h2 class="sc-place">留下 ${state.keep.length} 個真正想去的點。</h2>
        <p class="sc-reason">現在可以把保留與備用清單丟進 ChillOut，生成第一版路線。</p>
        <a class="sc-button sc-primary" href="${appStore}?ct=tool_saved_cleanse_done">丟進 ChillOut</a>
      `;
      renderSummary();
      return;
    }

    card.innerHTML = `
      <p class="sc-progress">${state.index + 1} / ${state.items.length}</p>
      <h2 class="sc-place">${escapeHtml(item)}</h2>
      <p class="sc-reason">${escapeHtml(reason(item))}</p>
      <div class="sc-actions">
        <button class="sc-choice" type="button" data-choice="keep">保留</button>
        <button class="sc-choice" type="button" data-choice="later">備用</button>
        <button class="sc-choice" type="button" data-choice="drop">刪掉</button>
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
    summary.innerHTML = `
      <div class="sc-buckets">
        ${bucketHtml("保留", state.keep)}
        ${bucketHtml("備用", state.later)}
        ${bucketHtml("刪掉", state.drop)}
      </div>
      <div class="sc-prompt"><small>ChillOut prompt</small><p>${escapeHtml(prompt)}</p></div>
      <div class="sc-summary-actions">
        <button class="sc-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="sc-button" type="button" data-copy-share>複製分享文案</button>
        <a class="sc-button sc-primary" href="${appStore}?ct=tool_saved_cleanse_prompt">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function bucketHtml(title, list) {
    const items = list.length ? list.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>還沒有</li>";
    return `<section class="sc-bucket"><strong>${title}</strong><small>${list.length} 個</small><ul>${items}</ul></section>`;
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

  listInput.value = sample;
  start();
})();
