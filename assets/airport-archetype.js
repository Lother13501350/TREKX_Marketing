(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const progressText = document.querySelector("[data-progress-text]");
  const progressBar = document.querySelector("[data-progress-bar]");

  const state = {
    arrival: "control",
    checkin: "comfort",
    security: "control",
    dutyfree: "control",
    gate: "comfort",
    delay: "comfort",
    boarding: "comfort",
    landing: "comfort"
  };

  const dimensions = {
    control: "掌控",
    comfort: "舒適",
    social: "社交",
    chaos: "即興"
  };

  const archetypes = {
    control: {
      name: "登機門指揮官",
      code: "GATE-C",
      truth: "你不是焦慮，你只是不能忍受出發日沒有備案。",
      firstMove: "出發前一天完成線上報到、交通截圖、行李重量與第一晚住宿確認。",
      airportPlan: "機場內先確認登機門，再安排咖啡和免稅店，所有移動保留 20 分鐘緩衝。",
      landingPlan: "落地後先去住宿放行李，再排一個不用預約的晚餐或散步點。"
    },
    comfort: {
      name: "候機艙補電師",
      code: "REST-A",
      truth: "你旅行前最需要的不是刺激，是不要在起飛前耗盡電量。",
      firstMove: "出發日不要排太早的集合與拍照任務，先確保吃飯、補水、充電。",
      airportPlan: "安檢後直接找穩定座位，附近要有水、洗手間和登機資訊螢幕。",
      landingPlan: "落地第一站先吃或咖啡，再開始城市探索。"
    },
    social: {
      name: "出發限動製作人",
      code: "STORY-S",
      truth: "你會把機場變成旅行的第一個內容場景。",
      firstMove: "先約好集合照片、登機口素材和機上窗景，不要拍到忘記登機。",
      airportPlan: "把拍照放在報到後、安檢前後各一次，其他時間留給同行者休息。",
      landingPlan: "落地後直接排一個有畫面感但低難度的街區。"
    },
    chaos: {
      name: "壓線起飛冒險家",
      code: "LAST-M",
      truth: "你很會活在當下，但機場不一定欣賞你的浪漫。",
      firstMove: "前一天把證件、充電線、外幣與交通卡放進同一個小包，減少臨場翻找。",
      airportPlan: "只保留一件事：準時過安檢。免稅、咖啡、拍照全部排在完成後。",
      landingPlan: "落地第一天只排兩站，留空白給你即興，但交通要先固定。"
    }
  };

  function counts() {
    return Object.values(state).reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, { control: 0, comfort: 0, social: 0, chaos: 0 });
  }

  function winner() {
    const totals = counts();
    const key = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
    return { key, count: totals[key], totals, ...archetypes[key] };
  }

  function confidence(match) {
    const unique = new Set(Object.values(state)).size;
    return Math.min(98, 62 + match.count * 7 + (4 - unique) * 5);
  }

  function promptFor(match, score) {
    return `請用 ChillOut 幫我規劃出發日與落地第一天。我的機場人格是「${match.name}」，代碼 ${match.code}，準確度 ${score}/100。人格真相：${match.truth} 請依照這三個原則安排：出發前 ${match.firstMove}；機場內 ${match.airportPlan}；落地後 ${match.landingPlan}。請輸出出發前檢查表、機場時間表、落地第一晚低壓行程、備案和可分享的旅遊手冊標題。`;
  }

  function render() {
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.classList.toggle("is-active", state[button.dataset.key] === button.dataset.value);
    });

    const selectedCount = Object.keys(state).length;
    progressText.textContent = `${selectedCount} / 8 已選`;
    progressBar.style.width = `${selectedCount / 8 * 100}%`;

    const match = winner();
    const score = confidence(match);
    const prompt = promptFor(match, score);
    const share = `我的 ChillOut 機場人格是「${match.name}」(${match.code})，準確度 ${score}/100。${match.truth}`;

    result.innerHTML = `
      <div class="aa-ticket">
        <div>
          <small>T014 boarding profile</small>
          <h2>${escapeHtml(match.name)}</h2>
          <p>${escapeHtml(match.truth)} 準確度 ${score}/100。</p>
        </div>
        <div class="aa-code" aria-label="人格代碼">${escapeHtml(match.code)}</div>
      </div>
      <div class="aa-bars">
        ${Object.entries(match.totals).map(([key, value]) => `
          <article class="aa-bar">
            <span>${escapeHtml(dimensions[key])}</span>
            <div class="aa-meter"><i style="width:${Math.max(8, value / 8 * 100)}%"></i></div>
          </article>
        `).join("")}
      </div>
      <div class="aa-plan">
        <article>
          <h3>出發前</h3>
          <p>${escapeHtml(match.firstMove)}</p>
        </article>
        <article>
          <h3>機場內</h3>
          <p>${escapeHtml(match.airportPlan)}</p>
        </article>
        <article>
          <h3>落地後</h3>
          <p>${escapeHtml(match.landingPlan)}</p>
        </article>
      </div>
      <div class="aa-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="aa-result-actions">
        <button class="aa-button" type="button" data-copy-share>複製分享文案</button>
        <button class="aa-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="aa-button aa-primary" data-app-link href="${appStore}?ct=tool_airport_archetype_manual_${match.code}">丟進 ChillOut</a>
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

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.key] = button.dataset.value;
      render();
    });
  });

  document.querySelector("[data-sample]").addEventListener("click", () => {
    Object.assign(state, {
      arrival: "control",
      checkin: "control",
      security: "control",
      dutyfree: "control",
      gate: "comfort",
      delay: "control",
      boarding: "control",
      landing: "control"
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  render();
})();
