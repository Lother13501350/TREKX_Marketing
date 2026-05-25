(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const examples = {
    spot: "南山塔夜景角度",
    expect: "想拍到像 Reels 一樣乾淨的夜景照片",
    source: "reels",
    risk: "crowd",
    party: "friends"
  };

  const form = document.querySelector("[data-form]");
  const spotInput = document.querySelector("[data-spot]");
  const expectInput = document.querySelector("[data-expect]");
  const sourceSelect = document.querySelector("[data-source]");
  const riskSelect = document.querySelector("[data-risk]");
  const partySelect = document.querySelector("[data-party]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");

  const sourceText = {
    reels: "IG / Reels",
    xiaohongshu: "小紅書",
    friend: "朋友推薦",
    blog: "部落格 / Google"
  };

  const riskText = {
    crowd: "人潮太多",
    queue: "排隊太久",
    transport: "交通太繞",
    photo: "照片落差"
  };

  const partyText = {
    couple: "情侶 / 兩人",
    friends: "朋友小團",
    family: "親子 / 長輩",
    solo: "一個人"
  };

  function riskScore() {
    let score = 58;
    if (sourceSelect.value === "reels") score += 17;
    if (sourceSelect.value === "xiaohongshu") score += 14;
    if (sourceSelect.value === "friend") score -= 4;
    if (riskSelect.value === "crowd") score += 12;
    if (riskSelect.value === "queue") score += 10;
    if (riskSelect.value === "transport") score += 8;
    if (riskSelect.value === "photo") score += 11;
    if (partySelect.value === "family") score += 8;
    if (partySelect.value === "solo") score -= 6;
    return Math.max(18, Math.min(96, score));
  }

  function verdict(score) {
    if (score >= 82) return {
      title: "不要照原圖去，換時段或換玩法",
      body: "它不是不能去，而是不能用爆紅內容的期待去。你需要避開人潮高峰，並準備同區替代點。"
    };
    if (score >= 66) return {
      title: "值得去，但要先降低期待",
      body: "把它當成路線中的一站，不要把整天押在這裡。現場條件通常會比照片更吵、更擠或更花時間。"
    };
    return {
      title: "可以排，但別排太滿",
      body: "風險不算高，適合放進半日動線。仍建議準備一個下雨或排隊過久的替代點。"
    };
  }

  function timingAdvice() {
    if (riskSelect.value === "crowd") return "平日上午或開門後 60 分鐘內";
    if (riskSelect.value === "queue") return "開門前到，或晚餐尖峰結束後";
    if (riskSelect.value === "transport") return "接在同區行程中，不單獨跨區";
    return "日落前 60 到 90 分鐘，現場先試拍備用角度";
  }

  function alternatePlay() {
    const spot = spotInput.value.trim() || "這個景點";
    if (riskSelect.value === "crowd") return `把 ${spot} 當 20 分鐘快閃點，主要時間留給附近街區散步。`;
    if (riskSelect.value === "queue") return `先排附近可預約的餐廳或咖啡，${spot} 只做順路加分項。`;
    if (riskSelect.value === "transport") return `只在同區有兩個以上想去點時才排 ${spot}，否則改放備案。`;
    return `先找 ${spot} 的側面、遠景或高低差角度，不要只追同一張網紅構圖。`;
  }

  function buildPrompt(score, truth) {
    const spot = spotInput.value.trim() || "爆紅景點";
    const expectation = expectInput.value.trim() || "想拍出漂亮照片";
    return `請用 ChillOut 幫我判斷「${spot}」要怎麼排進旅行。我的期待是：${expectation}。來源：${sourceText[sourceSelect.value]}。最怕踩雷：${riskText[riskSelect.value]}。同行狀態：${partyText[partySelect.value]}。真相風險分數：${score}/100。建議結論：${truth.title}。請幫我輸出適合時段、停留多久、同區替代點、雨天備案、交通注意事項，最後排成一段不繞路的半日行程。`;
  }

  function render() {
    const score = riskScore();
    const truth = verdict(score);
    const prompt = buildPrompt(score, truth);
    const spot = spotInput.value.trim() || "爆紅景點";
    const share = `我用 ChillOut 爆紅景點真相卡測了「${spot}」，踩雷風險 ${score}/100：${truth.title}`;

    result.innerHTML = `
      <div class="vt-card-head">
        <div>
          <small>T009 truth card</small>
          <h2>${escapeHtml(spot)} 真相卡</h2>
        </div>
        <div class="vt-risk-meter" aria-label="踩雷風險">
          <div>
            <strong>${score}</strong>
            <span>踩雷風險</span>
          </div>
        </div>
      </div>
      <section class="vt-verdict">
        <h3>${escapeHtml(truth.title)}</h3>
        <p>${escapeHtml(truth.body)}</p>
      </section>
      <div class="vt-grid-result">
        <article class="vt-fact">
          <span>best time</span>
          <h3>${escapeHtml(timingAdvice())}</h3>
          <p>不要跟熱門貼文的發布時間走，改用現場壓力最低的時間切入。</p>
        </article>
        <article class="vt-fact">
          <span>truth gap</span>
          <h3>${escapeHtml(riskText[riskSelect.value])}</h3>
          <p>你被燒到的點是「${escapeHtml(expectInput.value.trim() || "漂亮照片")}」，現場最需要先管理這個期待。</p>
        </article>
        <article class="vt-fact">
          <span>better play</span>
          <h3>替代玩法</h3>
          <p>${escapeHtml(alternatePlay())}</p>
        </article>
      </div>
      <div class="vt-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="vt-result-actions">
        <button class="vt-button" type="button" data-copy-share>複製分享文案</button>
        <button class="vt-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="vt-button vt-primary" data-app-link href="${appStore}?ct=tool_viral_spot_truth_manual_${score}">丟進 ChillOut</a>
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
    spotInput.value = examples.spot;
    expectInput.value = examples.expect;
    sourceSelect.value = examples.source;
    riskSelect.value = examples.risk;
    partySelect.value = examples.party;
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  [spotInput, expectInput, sourceSelect, riskSelect, partySelect].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
