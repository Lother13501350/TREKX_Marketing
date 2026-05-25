(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = [
    "朋友丟的 Reels：弘大夜景酒吧",
    "IG 收藏：延南洞咖啡廳",
    "小紅書截圖：景福宮韓服拍照",
    "地圖連結：廣藏市場小吃",
    "朋友說想去：漢江野餐",
    "備案：聖水洞選物店"
  ].join("\n");

  const form = document.querySelector("[data-form]");
  const linksInput = document.querySelector("[data-links]");
  const peopleInput = document.querySelector("[data-people]");
  const styleSelect = document.querySelector("[data-style]");
  const result = document.querySelector("[data-result]");
  const toastNode = document.querySelector("[data-toast]");

  function parseItems() {
    return linksInput.value
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 18);
  }

  function people() {
    return peopleInput.value
      .split(/[、,，\s]+/)
      .map((name) => name.trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  function typeOf(item) {
    if (/咖啡|甜|酒|市場|小吃|餐/i.test(item)) return "吃喝";
    if (/拍|景|夜景|韓服|Reels|IG/i.test(item)) return "拍照";
    if (/野餐|散步|公園|漢江|河/i.test(item)) return "放空";
    if (/備案|也可|候補/i.test(item)) return "備用";
    return "探索";
  }

  function scoreItem(item, index) {
    let score = 76 - index * 3;
    if (/朋友|想去|一定|必/i.test(item)) score += 10;
    if (/備案|候補/i.test(item)) score -= 18;
    if (styleSelect.value === "低壓" && /酒|夜|排隊|市場/i.test(item)) score -= 8;
    if (styleSelect.value === "效率" && /地圖|連結|店/i.test(item)) score += 6;
    if (styleSelect.value === "公平" && /朋友|小紅書|IG|Reels/i.test(item)) score += 4;
    return Math.max(12, Math.min(98, score));
  }

  function buckets(items) {
    const ranked = items.map((item, index) => ({
      name: item,
      score: scoreItem(item, index),
      type: typeOf(item)
    })).sort((a, b) => b.score - a.score);
    return {
      must: ranked.slice(0, 4),
      maybe: ranked.slice(4, 8),
      drop: ranked.slice(8)
    };
  }

  function assignments(mustItems, peopleList) {
    const safePeople = peopleList.length ? peopleList : ["我"];
    return mustItems.map((item, index) => ({
      owner: safePeople[index % safePeople.length],
      task: item.name,
      type: item.type
    }));
  }

  function buildPrompt(bucket, assigned) {
    return `請用 ChillOut 幫我把朋友群組丟來的旅行素材整理成一日行程。必排：${bucket.must.map((item) => item.name).join("、") || "無"}。備用：${bucket.maybe.map((item) => item.name).join("、") || "無"}。負責人分配：${assigned.map((item) => `${item.owner} 負責 ${item.task}`).join("；") || "由我統整"}。整理策略是「${styleSelect.value}」。請輸出順路動線、每站停留時間、附近餐廳或咖啡、雨天備案，以及可丟回群組的分享標題。`;
  }

  function render() {
    const items = parseItems();
    if (!items.length) {
      result.innerHTML = `<div class="fi-card" style="padding:20px">貼上群組素材後，這裡會整理成可出發清單。</div>`;
      return;
    }

    const bucket = buckets(items);
    const assigned = assignments(bucket.must, people());
    const score = Math.round(bucket.must.reduce((sum, item) => sum + item.score, 0) / Math.max(1, bucket.must.length));
    const prompt = buildPrompt(bucket, assigned);
    const share = `我用 ChillOut 朋友丟連結收件箱，把 ${items.length} 個群組素材整理成必排 ${bucket.must.length} 個、備用 ${bucket.maybe.length} 個。`;

    result.innerHTML = `
      <div class="fi-score">
        <div>
          <small>群組整理分數</small>
          <h2>${score >= 76 ? "可以拿回群組投票" : "先刪掉一點再投票"}</h2>
          <p>先讓每個人看到同一張整理表，再進 ChillOut 生成完整路線。</p>
        </div>
        <strong>${score}</strong>
      </div>
      <div class="fi-buckets">
        ${bucketHtml("必排", bucket.must)}
        ${bucketHtml("備用", bucket.maybe)}
        ${bucketHtml("先刪掉", bucket.drop)}
      </div>
      <div class="fi-owners">
        ${assigned.map((item) => `<article class="fi-owner"><strong>${escapeHtml(item.owner)}</strong><span>${escapeHtml(item.type)}：${escapeHtml(item.task)}</span></article>`).join("") || "<article class=\"fi-owner\"><strong>我</strong><span>先統整清單</span></article>"}
      </div>
      <div class="fi-prompt"><small>ChillOut prompt</small><p>${escapeHtml(prompt)}</p></div>
      <div class="fi-result-actions">
        <button class="fi-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="fi-button" type="button" data-copy-share>複製分享文案</button>
        <a class="fi-button fi-primary" data-app-link href="${appStore}?ct=tool_friend_link_inbox_manual_${score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function bucketHtml(title, items) {
    const list = items.length ? items.map((item) => `<li>${escapeHtml(item.name)} <small>${item.score}</small></li>`).join("") : "<li>沒有</li>";
    return `<section class="fi-bucket"><h3>${title}</h3><ul>${list}</ul></section>`;
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
    linksInput.value = sample;
    render();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });
  [linksInput, peopleInput, styleSelect].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  linksInput.value = sample;
  render();
})();
