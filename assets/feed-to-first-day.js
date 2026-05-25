(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sampleFeed = [
    "IG 收藏：延南洞奶油咖啡廳",
    "Reels：弘大傍晚街拍巷",
    "小紅書：廣藏市場綠豆煎餅",
    "朋友傳：漢江便利店泡麵野餐",
    "截圖：明洞換錢與晚餐",
    "夜景口袋：南山塔不用排隊角度"
  ].join("\n");

  const form = document.querySelector("[data-form]");
  const cityInput = document.querySelector("[data-city]");
  const arrivalSelect = document.querySelector("[data-arrival]");
  const energySelect = document.querySelector("[data-energy]");
  const mealInput = document.querySelector("[data-meal]");
  const feedInput = document.querySelector("[data-feed]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");

  const timeMap = {
    morning: ["10:30", "12:10", "14:20", "17:10", "19:30"],
    afternoon: ["15:20", "16:20", "18:00", "20:00"],
    night: ["19:00", "20:10", "21:30"]
  };

  const arrivalText = {
    morning: "上午抵達",
    afternoon: "下午抵達",
    night: "晚上抵達"
  };

  const energyText = {
    gentle: "低壓，只想順",
    normal: "正常，可以走",
    photo: "想拍照，有精神"
  };

  function parseFeed() {
    return feedInput.value
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 8);
  }

  function classify(item) {
    if (/咖啡|甜|店|選物|巷|街拍|Reels|IG/i.test(item)) return "輕鬆開始";
    if (/市場|小吃|餐|晚餐|泡麵|烤肉|煎餅|吃/i.test(item)) return "第一餐";
    if (/夜景|塔|河|漢江|傍晚|夕陽/i.test(item)) return "收尾景";
    if (/換錢|飯店|交通|機場|車站|明洞/i.test(item)) return "落地任務";
    return "靈感點";
  }

  function bestMatch(items, label, fallback) {
    const found = items.find((item) => classify(item) === label);
    return found || fallback;
  }

  function buildStops(items) {
    const city = cityInput.value.trim() || "目的地";
    const meal = mealInput.value.trim() || "第一餐";
    const arrival = arrivalSelect.value;
    const energy = energySelect.value;
    const times = timeMap[arrival];
    const task = bestMatch(items, "落地任務", `${city} 車站到住宿區`);
    const softStart = bestMatch(items, "輕鬆開始", items[0] || `${city} 住宿附近散步`);
    const firstMeal = bestMatch(items, "第一餐", meal);
    const ending = bestMatch(items, "收尾景", items[items.length - 1] || `${city} 安靜夜景點`);
    const extra = items.find((item) => ![task, softStart, firstMeal, ending].includes(item));

    const base = [
      {
        time: times[0],
        title: arrival === "night" ? "先把行李和交通處理掉" : "抵達後先做一件落地任務",
        reason: `用「${task}」當第一站，不急著衝熱門點，先讓手機、交通與行李穩住。`,
        tags: ["落地任務", arrivalText[arrival]]
      },
      {
        time: times[1],
        title: `第一個有感地點：${softStart}`,
        reason: "挑一個從動態牆來的輕鬆點，讓第一天有記憶點，但不要把體力花光。",
        tags: ["低壓開場", classify(softStart)]
      },
      {
        time: times[2],
        title: `第一餐：${firstMeal}`,
        reason: `照你設定的「${meal}」方向安排，吃飯點要能接下一站，避免第一天為了餐廳繞路。`,
        tags: ["第一餐", "順路"]
      }
    ];

    if (energy !== "gentle" && extra) {
      base.push({
        time: times[3] || "20:00",
        title: `加一站：${extra}`,
        reason: "只有在體力還夠時才加入，這站可以拍照或採買，但不影響回住宿節奏。",
        tags: [energyText[energy], classify(extra)]
      });
    }

    base.push({
      time: times[Math.min(times.length - 1, base.length)] || "21:30",
      title: `收尾：${ending}`,
      reason: "最後一站只負責收束心情，不排長排隊、不跨太遠，留時間回去整理明天。",
      tags: ["收尾", classify(ending)]
    });

    return base;
  }

  function score(items, stops) {
    let value = 68 + Math.min(14, items.length * 2);
    if (arrivalSelect.value === "night") value -= 4;
    if (energySelect.value === "gentle") value += 8;
    if (stops.length > 4) value -= 3;
    return Math.max(55, Math.min(96, value));
  }

  function buildPrompt(stops) {
    const city = cityInput.value.trim() || "目的地";
    return `請用 ChillOut 幫我把「${city} 第一天下午到晚上」排成低壓行程。抵達時段：${arrivalText[arrivalSelect.value]}。體力：${energyText[energySelect.value]}。我滑到的靈感包含：${parseFeed().join("、") || "尚未整理"}。請以這個順序為基礎：${stops.map((stop) => `${stop.time} ${stop.title}`).join("；")}。請補上順路動線、每站停留時間、附近可替換店家、雨天備案，最後給我一段可以分享給旅伴的行程標題。`;
  }

  function render() {
    const items = parseFeed();
    if (!items.length) {
      result.innerHTML = `
        <div class="fd-empty">
          <div>
            <h2>先貼上今天滑到的靈感</h2>
            <p>至少放 3 個店名、截圖文字或 Reels 主題。按下生成後，這裡會變成第一天行程板。</p>
          </div>
        </div>
      `;
      return;
    }

    const stops = buildStops(items);
    const readiness = score(items, stops);
    const city = cityInput.value.trim() || "目的地";
    const prompt = buildPrompt(stops);
    const share = `我用 ChillOut「動態牆第一天行程」把 ${items.length} 個靈感排成 ${city} 落地第一天，順暢度 ${readiness}/100。`;

    result.innerHTML = `
      <div class="fd-ticket">
        <div>
          <small>T008 first day ticket</small>
          <h2>${city} 落地第一天</h2>
        </div>
        <div class="fd-score" aria-label="落地順暢度">${readiness}</div>
      </div>
      <div class="fd-route">
        ${stops.map((stop) => `
          <article class="fd-stop">
            <time>${escapeHtml(stop.time)}</time>
            <div>
              <h3>${escapeHtml(stop.title)}</h3>
              <p>${escapeHtml(stop.reason)}</p>
              <div class="fd-tags">${stop.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="fd-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="fd-result-actions">
        <button class="fd-button" type="button" data-copy-share>複製分享文案</button>
        <button class="fd-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="fd-button fd-primary" data-app-link href="${appStore}?ct=tool_feed_to_first_day_manual_${readiness}">丟進 ChillOut</a>
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
    feedInput.value = sampleFeed;
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  [cityInput, arrivalSelect, energySelect, mealInput, feedInput].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  feedInput.value = sampleFeed;
  render();
})();
