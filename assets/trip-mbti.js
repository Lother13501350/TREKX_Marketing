(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const state = {
    pace: "slow",
    anchor: "food",
    flex: "planned",
    social: "quiet"
  };

  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");

  const labels = {
    pace: { slow: "留白型", dense: "滿版型" },
    anchor: { food: "食物錨點", scene: "場景錨點" },
    flex: { planned: "有條件彈性", wild: "即興派" },
    social: { quiet: "低社交", open: "高社交" }
  };

  const codeMap = {
    pace: { slow: "S", dense: "D" },
    anchor: { food: "F", scene: "V" },
    flex: { planned: "P", wild: "W" },
    social: { quiet: "Q", open: "O" }
  };

  function role() {
    if (state.anchor === "food" && state.pace === "slow") return {
      name: "慢食地圖收藏家",
      route: "你適合把餐廳、咖啡和散步區排成鬆鬆的一天。不要一天塞滿景點，你的旅行記憶會從一張桌子開始。",
      firstTrip: "第一趟推薦：咖啡廳、書店、街區散步與一間需要預約的晚餐。"
    };
    if (state.anchor === "scene" && state.pace === "dense") return {
      name: "場景狩獵建築師",
      route: "你需要清楚路線和高密度畫面。適合用地鐵線或街區把景點串起來，但每三站要安排一次休息。",
      firstTrip: "第一趟推薦：晨間地標、午後展覽、黃昏街景與夜景收尾。"
    };
    if (state.flex === "wild" && state.social === "open") return {
      name: "即興社交發電機",
      route: "你會因為朋友一句話改變行程。適合先做半天骨架，保留兩個空格給現場推薦和臨時邀約。",
      firstTrip: "第一趟推薦：市場、酒吧街、活動展演與能認識人的在地體驗。"
    };
    if (state.social === "quiet") return {
      name: "安靜漫遊校準師",
      route: "你需要低噪音、可退出、可自己消化的路線。熱門點可以去，但要排在精神最穩的時段。",
      firstTrip: "第一趟推薦：公園、獨立店、早午餐與不用排隊的展覽。"
    };
    return {
      name: "彈性同行協調者",
      route: "你可以跟大家一起玩，但需要一條主線避免討論太久。適合先決定錨點，再讓其他人插入想去的點。",
      firstTrip: "第一趟推薦：一間餐廳、一個主景點、兩個可替換備案。"
    };
  }

  function code() {
    return [codeMap.pace[state.pace], codeMap.anchor[state.anchor], codeMap.flex[state.flex], codeMap.social[state.social]].join("");
  }

  function promptFor(currentRole) {
    return `請用 ChillOut 幫我依照旅行人格「${currentRole.name}」排一趟 1 天行程。我的旅行設定是：節奏 ${labels.pace[state.pace]}、錨點 ${labels.anchor[state.anchor]}、改行程接受度 ${labels.flex[state.flex]}、社交能量 ${labels.social[state.social]}。請輸出適合我的每日密度、早午晚路線、餐廳與景點比例、可替換備案，以及適合做成旅遊手冊的標題。`;
  }

  function render() {
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.classList.toggle("is-active", state[button.dataset.key] === button.dataset.value);
    });

    const currentRole = role();
    const currentCode = code();
    const prompt = promptFor(currentRole);
    const share = `我的 ChillOut 旅行 MBTI 不是 MBTI 結果是「${currentRole.name}」(${currentCode})。你不是難搞，你只是旅行設定很明確。`;

    result.innerHTML = `
      <div class="tm-id-card">
        <div>
          <small>T011 trip type card</small>
          <h2>${escapeHtml(currentRole.name)}</h2>
        </div>
        <div class="tm-code" aria-label="旅行人格代碼">${escapeHtml(currentCode)}</div>
      </div>
      <div class="tm-traits">
        ${traitHtml("節奏", labels.pace[state.pace])}
        ${traitHtml("錨點", labels.anchor[state.anchor])}
        ${traitHtml("彈性", labels.flex[state.flex])}
        ${traitHtml("社交", labels.social[state.social])}
      </div>
      <section class="tm-route">
        <h3>適合你的第一趟旅行</h3>
        <p>${escapeHtml(currentRole.route)}</p>
        <p>${escapeHtml(currentRole.firstTrip)}</p>
      </section>
      <div class="tm-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="tm-result-actions">
        <button class="tm-button" type="button" data-copy-share>複製分享文案</button>
        <button class="tm-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="tm-button tm-primary" data-app-link href="${appStore}?ct=tool_trip_mbti_manual_${currentCode}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function traitHtml(label, value) {
    return `<article class="tm-trait"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
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

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.key] = button.dataset.value;
      render();
    });
  });

  document.querySelector("[data-random]").addEventListener("click", () => {
    const options = {
      pace: ["slow", "dense"],
      anchor: ["food", "scene"],
      flex: ["planned", "wild"],
      social: ["quiet", "open"]
    };
    Object.keys(options).forEach((key) => {
      const list = options[key];
      state[key] = list[Math.floor(Math.random() * list.length)];
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  render();
})();
