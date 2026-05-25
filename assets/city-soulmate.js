(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const controls = {
    pace: document.querySelector("[data-pace]"),
    anchor: document.querySelector("[data-anchor]"),
    noise: document.querySelector("[data-noise]"),
    season: document.querySelector("[data-season]")
  };

  const cities = [
    {
      name: "福岡",
      traits: { pace: "slow", anchor: "food", noise: "quiet", season: "cool" },
      reason: "城市尺度剛好，食物密度高，不需要把自己丟進過度觀光的節奏。",
      route: ["藥院咖啡", "柳橋市場午餐", "大濠公園散步"]
    },
    {
      name: "東京",
      traits: { pace: "dense", anchor: "design", noise: "middle", season: "cool" },
      reason: "它可以很滿，也可以很精準。適合把展覽、小店、街區和晚餐排成主題日。",
      route: ["清澄白河咖啡", "表參道設計小店", "中目黑晚餐"]
    },
    {
      name: "清邁",
      traits: { pace: "slow", anchor: "nature", noise: "quiet", season: "warm" },
      reason: "慢、暖、好放空。適合想把旅行變成恢復體力的人，而不是追清單的人。",
      route: ["古城早餐", "近郊綠意散步", "夜市簡單收尾"]
    },
    {
      name: "首爾",
      traits: { pace: "balanced", anchor: "design", noise: "middle", season: "cool" },
      reason: "街區轉換清楚，咖啡、選物、夜景都好接。適合想要漂亮但不想太冒險的人。",
      route: ["延南洞咖啡", "聖水洞選物", "漢江傍晚"]
    },
    {
      name: "香港",
      traits: { pace: "dense", anchor: "night", noise: "loud", season: "rain" },
      reason: "高密度、好吃、雨天也能成立。適合喜歡城市聲音和快速移動的人。",
      route: ["茶餐廳早餐", "中上環街景", "維港夜色"]
    },
    {
      name: "沖繩",
      traits: { pace: "slow", anchor: "nature", noise: "middle", season: "warm" },
      reason: "不用把景點塞滿，海邊、開車、咖啡和日落就能撐起一趟旅行。",
      route: ["海邊咖啡", "北谷散步", "日落晚餐"]
    }
  ];

  const label = {
    pace: { slow: "慢慢晃", balanced: "有主題", dense: "高密度" },
    anchor: { food: "食物", design: "設計", nature: "自然", night: "夜景" },
    noise: { quiet: "安靜", middle: "剛好", loud: "熱鬧" },
    season: { cool: "涼爽", warm: "溫暖", rain: "雨天友善" }
  };

  function scoreCity(city) {
    return ["pace", "anchor", "noise", "season"].reduce((sum, key) => (
      sum + (city.traits[key] === controls[key].value ? 25 : 5)
    ), 0);
  }

  function rankCities() {
    return cities
      .map((city) => ({ ...city, score: scoreCity(city) }))
      .sort((a, b) => b.score - a.score);
  }

  function buildPrompt(city) {
    return `請用 ChillOut 幫我規劃「${city.name}」3 天 2 夜旅行。我的城市偏好是：節奏 ${label.pace[controls.pace.value]}、快樂來源 ${label.anchor[controls.anchor.value]}、熱鬧程度 ${label.noise[controls.noise.value]}、季節感 ${label.season[controls.season.value]}。我被配對到 ${city.name}，原因是：${city.reason}。請先用 ${city.route.join("、")} 做第一天起手路線，再補上第二天與第三天的順路安排、餐廳、備案、交通注意事項和可分享的旅遊手冊標題。`;
  }

  function render() {
    const ranked = rankCities();
    const winner = ranked[0];
    const runners = ranked.slice(1, 3).map((city) => city.name).join(" / ");
    const prompt = buildPrompt(winner);
    const share = `我的 ChillOut 城市靈魂伴侶是「${winner.name}」，匹配度 ${winner.score}/100。下一站可以不是最紅，而是最像我。`;

    result.innerHTML = `
      <div class="cs-passport">
        <div>
          <small>T012 city soulmate</small>
          <h2>${escapeHtml(winner.name)}</h2>
        </div>
        <div class="cs-score" aria-label="城市匹配度">${winner.score}</div>
      </div>
      <section class="cs-reason">
        <h3>為什麼是它</h3>
        <p>${escapeHtml(winner.reason)} 備選城市：${escapeHtml(runners)}。</p>
      </section>
      <div class="cs-route">
        ${winner.route.map((stop, index) => `
          <article class="cs-stop">
            <span>step ${index + 1}</span>
            <h3>${escapeHtml(stop)}</h3>
            <p>${escapeHtml(lineFor(index, winner.name))}</p>
          </article>
        `).join("")}
      </div>
      <div class="cs-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="cs-result-actions">
        <button class="cs-button" type="button" data-copy-share>複製分享文案</button>
        <button class="cs-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="cs-button cs-primary" data-app-link href="${appStore}?ct=tool_city_soulmate_manual_${encodeURIComponent(winner.name)}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function lineFor(index, city) {
    if (index === 0) return `先用低壓點進入 ${city}，不要一開始就把體力花光。`;
    if (index === 1) return "中段安排最能代表你偏好的主軸，讓這趟旅行有自己的理由。";
    return "最後用好收束的地點結尾，方便回去整理照片與生成手冊。";
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

  document.querySelector("[data-random]").addEventListener("click", () => {
    Object.values(controls).forEach((select) => {
      const index = Math.floor(Math.random() * select.options.length);
      select.selectedIndex = index;
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  Object.values(controls).forEach((select) => {
    select.addEventListener("change", render);
  });

  render();
})();
