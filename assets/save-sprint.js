(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const samplePlaces = [
    "延南洞咖啡廳",
    "景福宮韓服拍照",
    "弘大 rooftop bar",
    "廣藏市場晚餐",
    "漢江散步",
    "聖水洞選物店",
    "明洞換錢"
  ].join("\n");

  const state = { strictness: "balanced" };
  const form = document.querySelector("[data-form]");
  const placesInput = document.querySelector("[data-places]");
  const cityInput = document.querySelector("[data-city]");
  const moodSelect = document.querySelector("[data-mood]");
  const resultNode = document.querySelector("[data-result]");
  const toastNode = document.querySelector("[data-toast]");

  function cleanLines() {
    return placesInput.value
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 18);
  }

  function placeType(text) {
    if (/咖啡|茶|甜|蛋糕|早午餐|cafe/i.test(text)) return "休息點";
    if (/市場|晚餐|午餐|早餐|餐|小吃|拉麵|酒/i.test(text)) return "吃飯";
    if (/bar|夜景|屋頂|rooftop|漢江|河/i.test(text)) return "晚上";
    if (/拍|宮|美術|博物|韓服|展|街區/i.test(text)) return "主景點";
    if (/換錢|車站|飯店|機場/i.test(text)) return "雜務";
    return "順路點";
  }

  function scorePlace(text, index) {
    const type = placeType(text);
    const mood = moodSelect.value;
    let score = 72 - index * 3;
    if (mood === "好拍" && /拍|宮|美術|展|街區|夜景/i.test(text)) score += 14;
    if (mood === "美食" && /咖啡|甜|市場|餐|小吃|酒/i.test(text)) score += 14;
    if (mood === "放空" && /漢江|咖啡|公園|河|散步/i.test(text)) score += 12;
    if (mood === "在地" && /市場|洞|街|小吃|選物/i.test(text)) score += 10;
    if (type === "雜務") score -= state.strictness === "sharp" ? 20 : 10;
    if (state.strictness === "loose") score += 6;
    if (state.strictness === "sharp") score -= index > 5 ? 10 : 0;
    return Math.max(12, Math.min(98, score));
  }

  function buildBuckets(items) {
    const ranked = items
      .map((name, index) => ({ name, index, type: placeType(name), score: scorePlace(name, index) }))
      .sort((a, b) => b.score - a.score);
    const mustCount = state.strictness === "sharp" ? 3 : 4;
    const maybeCount = state.strictness === "loose" ? 6 : 4;
    return {
      must: ranked.slice(0, mustCount),
      maybe: ranked.slice(mustCount, mustCount + maybeCount),
      cut: ranked.slice(mustCount + maybeCount)
    };
  }

  function routeFrom(bucket) {
    const firstPhoto = bucket.must.find((item) => item.type === "主景點") || bucket.must[0];
    const rest = bucket.must.find((item) => item.type === "休息點") || bucket.must[1] || firstPhoto;
    const food = bucket.must.find((item) => item.type === "吃飯") || bucket.must[2] || rest;
    const night = bucket.must.find((item) => item.type === "晚上") || bucket.must[3] || food;
    return [firstPhoto, rest, food, night]
      .filter(Boolean)
      .filter((item, index, array) => array.findIndex((candidate) => candidate.name === item.name) === index)
      .slice(0, 4);
  }

  function buildPrompt(route, bucket) {
    const city = cityInput.value.trim() || "目的地";
    const backup = bucket.maybe.map((item) => item.name).join("、") || "附近咖啡廳或雨天室內點";
    return `請用 ChillOut 幫我把這批 IG 收藏整理成 ${city} 一日行程。旅行感覺是「${moodSelect.value}」。必排行程順序：${route.map((item) => item.name).join(" → ")}。備用點：${backup}。請補上移動順序、每站停留時間、附近餐廳或咖啡、雨天備案，以及適合分享到 IG 限動的標題。`;
  }

  function render() {
    const items = cleanLines();
    if (!items.length) {
      resultNode.innerHTML = `
        <div class="ss-empty">
          <span>02</span>
          <h2>等你貼上收藏</h2>
          <p>這裡會產生一條最小可出發路線、三桶分類、分享文案與 ChillOut prompt。</p>
        </div>
      `;
      return;
    }

    const bucket = buildBuckets(items);
    const route = routeFrom(bucket);
    const prompt = buildPrompt(route, bucket);
    const score = Math.round(route.reduce((sum, item) => sum + item.score, 0) / Math.max(1, route.length));
    const city = cityInput.value.trim() || "這座城市";
    const share = `我用 ChillOut 的 IG 收藏急救室，把 ${items.length} 個收藏整理成 ${city} 第一版路線：${route.map((item) => item.name).join(" → ")}。先走得出去，再慢慢微調。`;

    resultNode.innerHTML = `
      <div class="ss-scoreline">
        <div>
          <small>可出發分數</small>
          <strong>${score}</strong>
        </div>
        <div>
          <small>建議</small>
          <h2>${score >= 76 ? "今天可以直接走" : "先減量，再出發"}</h2>
        </div>
      </div>

      <div class="ss-route">
        ${route.map((item, index) => `
          <article class="ss-stop">
            <div class="ss-time">${["10:30","13:00","16:00","20:00"][index] || "備用"}</div>
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <small>收藏分數 ${item.score}/100</small>
            </div>
            <span class="ss-kind">${escapeHtml(item.type)}</span>
          </article>
        `).join("")}
      </div>

      <div class="ss-buckets">
        ${bucketHtml("必排", bucket.must)}
        ${bucketHtml("備用", bucket.maybe)}
        ${bucketHtml("先刪", bucket.cut)}
      </div>

      <div class="ss-copybox">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="ss-result-actions">
        <button class="ss-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="ss-button" type="button" data-copy-share>複製分享文案</button>
        <a class="ss-button ss-primary" href="${appStore}?ct=tool_save_sprint_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function bucketHtml(title, items) {
    const list = items.length ? items.map((item) => `<li>${escapeHtml(item.name)}</li>`).join("") : "<li>沒有多餘收藏</li>";
    return `<section class="ss-bucket"><h3>${title}</h3><ul>${list}</ul></section>`;
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
    placesInput.value = samplePlaces;
    render();
  });

  document.querySelector("[data-strictness]").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;
    state.strictness = button.dataset.value;
    document.querySelectorAll("[data-strictness] button").forEach((node) => {
      node.classList.toggle("is-active", node === button);
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  [placesInput, cityInput, moodSelect].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  placesInput.value = samplePlaces;
  render();
})();
