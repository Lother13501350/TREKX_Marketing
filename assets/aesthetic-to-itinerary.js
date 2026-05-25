(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sampleElements = ["咖啡廳", "獨立書店", "安靜巷弄", "下午甜點", "小型展覽"].join("\n");

  const form = document.querySelector("[data-form]");
  const cityInput = document.querySelector("[data-city]");
  const aestheticSelect = document.querySelector("[data-aesthetic]");
  const paceSelect = document.querySelector("[data-pace]");
  const startSelect = document.querySelector("[data-start]");
  const elementsInput = document.querySelector("[data-elements]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");

  const aesthetics = {
    cream: {
      label: "奶油咖啡感",
      mood: "乾淨、柔軟、適合慢慢拍，行程重點是光線、咖啡與安靜街區。",
      mission: "拍三張沒有雜物的桌面、窗邊與街角照片。",
      stops: ["窗邊咖啡開場", "小店與巷弄散步", "甜點或書店收尾"]
    },
    neon: {
      label: "霓虹夜拍感",
      mood: "把白天留給休息，重點放在傍晚後的燈牌、街景與宵夜。",
      mission: "拍一張人走過招牌前的動態照片，再拍一張便利店收尾。",
      stops: ["傍晚街區暖身", "燈牌主街拍照", "宵夜與夜景收尾"]
    },
    retro: {
      label: "復古街區感",
      mood: "用老店、招牌、二手店與傳統市場做主軸，走路比打卡重要。",
      mission: "找三個舊招牌、老門面或手寫菜單，做成回憶錄封面素材。",
      stops: ["老街入口", "二手店或市場", "老派餐館收尾"]
    },
    forest: {
      label: "森林慢走感",
      mood: "把節奏放慢，避開太多室內點，讓步道、樹影和茶點成為主線。",
      mission: "錄 10 秒環境聲，再拍一張沒有人的樹影照片。",
      stops: ["公園或步道", "茶點休息", "低噪音晚餐"]
    },
    sea: {
      label: "海風空白感",
      mood: "留白比塞滿重要。用海邊、車站、日落和簡單餐食組成一日。",
      mission: "拍一張水平線、一張車窗、一張沒有人的座位。",
      stops: ["靠海交通段", "海邊停留", "日落後簡單晚餐"]
    }
  };

  const startTimes = {
    morning: ["10:00", "13:30", "16:30"],
    afternoon: ["14:00", "16:30", "19:00"],
    night: ["18:00", "20:00", "22:00"]
  };

  const paceText = {
    slow: "慢慢走",
    balanced: "剛剛好",
    full: "想多拍一點"
  };

  function parseElements() {
    return elementsInput.value
      .split(/\n+/)
      .map((line) => line.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 8);
  }

  function buildStops(elements, aesthetic) {
    const city = cityInput.value.trim() || "目的地";
    const times = startTimes[startSelect.value];
    const selected = aesthetics[aesthetic];
    const fallback = selected.stops;
    const picks = [
      elements[0] || fallback[0],
      elements[1] || fallback[1],
      elements[2] || fallback[2]
    ];

    return picks.map((pick, index) => ({
      time: times[index],
      title: `${city} · ${pick}`,
      body: lineForStop(index, selected, pick)
    }));
  }

  function lineForStop(index, selected, pick) {
    if (index === 0) return `用「${pick}」建立這趟旅行的第一個畫面，不急著跑點，先抓到 ${selected.label} 的基調。`;
    if (index === 1) return `中段安排最像這個風格的素材，讓路線有主題，而不是只把收藏硬塞在一起。`;
    return `最後一站負責收束情緒，留時間把照片、路線和手冊素材整理進 ChillOut。`;
  }

  function buildPrompt(stops, selected) {
    const city = cityInput.value.trim() || "目的地";
    const elements = parseElements();
    return `請用 ChillOut 幫我把「${city}」排成一日行程。旅行美學是「${selected.label}」，節奏是「${paceText[paceSelect.value]}」。我想放進去的元素：${elements.join("、") || "由你建議"}。請以這三段為主：${stops.map((stop) => `${stop.time} ${stop.title}`).join("；")}。請補上順路動線、每站停留時間、餐廳或咖啡建議、拍照任務、雨天替代點，以及可生成旅遊手冊的標題。`;
  }

  function aestheticScore(elements) {
    let score = 72 + Math.min(16, elements.length * 3);
    if (paceSelect.value === "slow") score += 5;
    if (paceSelect.value === "full") score -= 4;
    if (startSelect.value === "night" && aestheticSelect.value !== "neon") score -= 5;
    return Math.max(58, Math.min(96, score));
  }

  function render() {
    const selected = aesthetics[aestheticSelect.value];
    const elements = parseElements();
    const stops = buildStops(elements, aestheticSelect.value);
    const prompt = buildPrompt(stops, selected);
    const score = aestheticScore(elements);
    const city = cityInput.value.trim() || "目的地";
    const share = `我用 ChillOut 旅行美學轉行程，把「${selected.label}」變成 ${city} 一日路線，美學完成度 ${score}/100。`;

    result.innerHTML = `
      <div class="ai-cover">
        <small>T010 aesthetic route</small>
        <h2>${escapeHtml(selected.label)} · ${escapeHtml(city)}</h2>
        <p>${escapeHtml(selected.mood)} 美學完成度 ${score}/100。</p>
      </div>
      <div class="ai-route">
        ${stops.map((stop) => `
          <article class="ai-stop">
            <time>${escapeHtml(stop.time)}</time>
            <h3>${escapeHtml(stop.title)}</h3>
            <p>${escapeHtml(stop.body)}</p>
          </article>
        `).join("")}
      </div>
      <div class="ai-mission">
        <strong>拍照任務</strong>
        <p>${escapeHtml(selected.mission)}</p>
      </div>
      <div class="ai-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="ai-result-actions">
        <button class="ai-button" type="button" data-copy-share>複製分享文案</button>
        <button class="ai-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ai-button ai-primary" data-app-link href="${appStore}?ct=tool_aesthetic_to_itinerary_manual_${score}">丟進 ChillOut</a>
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
    cityInput.value = "東京";
    aestheticSelect.value = "cream";
    paceSelect.value = "slow";
    startSelect.value = "morning";
    elementsInput.value = sampleElements;
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  [cityInput, aestheticSelect, paceSelect, startSelect, elementsInput].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  elementsInput.value = sampleElements;
  render();
})();
