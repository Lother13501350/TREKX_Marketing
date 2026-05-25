(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    arrival: document.querySelector("[data-arrival]"),
    sleepDebt: document.querySelector("[data-sleep-debt]"),
    transfer: document.querySelector("[data-transfer]"),
    luggage: document.querySelector("[data-luggage]"),
    hunger: document.querySelector("[data-hunger]"),
    checkin: document.querySelector("[data-checkin]"),
    wish: document.querySelector("[data-wish]"),
    meal: document.querySelector("[data-meal]")
  };

  function value(key) {
    return Number(fields[key].value || 0);
  }

  function stabilityScore() {
    let score = 100 - value("sleepDebt") * 0.24 - value("transfer") * 0.18 - value("luggage") * 0.16 - value("hunger") * 0.16;
    if (fields.checkin.value !== "ready") score -= 10;
    if (fields.arrival.value === "night") score -= 8;
    if (fields.wish.value === "rest") score += 8;
    return Math.round(Math.max(20, Math.min(96, score)));
  }

  function ritual(score) {
    if (score < 45) return {
      name: "先回血儀式",
      truth: "第一天不要證明自己很會玩，先把身體和行李安頓好。",
      dont: "不要排跨區景點、排隊名店或需要預約壓力的活動。"
    };
    if (fields.wish.value === "scene") return {
      name: "城市開機儀式",
      truth: "你需要先看到城市，才會真的覺得旅行開始了。",
      dont: "不要第一站就進商場或太封閉的室內點。"
    };
    if (fields.wish.value === "food" || value("hunger") > 70) return {
      name: "第一餐定錨儀式",
      truth: "你今天的旅行情緒會被第一餐決定，先吃穩再談景點。",
      dont: "不要把第一餐押在需要久等或交通複雜的店。"
    };
    return {
      name: "低壓起步儀式",
      truth: "你可以開始玩，但要用短距離、低承諾的方式進入城市。",
      dont: "不要把第一天排成正式滿版行程。"
    };
  }

  function startTimes() {
    if (fields.arrival.value === "morning") return ["10:30", "12:00", "14:00"];
    if (fields.arrival.value === "night") return ["19:30", "20:30", "21:40"];
    return ["15:30", "16:40", "18:00"];
  }

  function steps(profile) {
    const city = fields.city.value.trim() || "目的地";
    const meal = fields.meal.value.trim() || "第一餐";
    const times = startTimes();
    const first = fields.checkin.value === "ready" ? "先到住宿放行李" : "找可寄物或坐下來的地方";
    const second = profile.name === "第一餐定錨儀式" ? `吃 ${meal}` : profile.name === "城市開機儀式" ? `${city} 低難度街區散步` : "咖啡、熱食或補水";
    const third = fields.wish.value === "scene" ? "看一個容易抵達的城市畫面" : "回住宿附近整理明天";
    return [
      [times[0], first, "先讓交通、行李和手機電量穩住，不要急著打卡。"],
      [times[1], second, "用一個低風險選擇打開旅行，不用追求完美。"],
      [times[2], third, "最後一段只負責建立安全感，保留體力給明天。"]
    ];
  }

  function promptFor(profile, score, stepList) {
    return `請用 ChillOut 幫我安排「${fields.city.value.trim() || "目的地"}」落地第一天 180 分鐘開場。第一日儀式是「${profile.name}」，穩定分數 ${score}/100。抵達時段 ${fields.arrival.options[fields.arrival.selectedIndex].textContent}，睡眠債 ${fields.sleepDebt.value}/100，交通壓力 ${fields.transfer.value}/100，行李負擔 ${fields.luggage.value}/100，飢餓程度 ${fields.hunger.value}/100，住宿 check-in ${fields.checkin.options[fields.checkin.selectedIndex].textContent}，第一天期待 ${fields.wish.options[fields.wish.selectedIndex].textContent}。請依照 ${stepList.map((step) => `${step[0]} ${step[1]}`).join("；")} 排出順路動線、第一餐建議、不要做的事、雨天備案與旅遊手冊開場標題。`;
  }

  function render() {
    ["sleepDebt", "transfer", "luggage", "hunger"].forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const score = stabilityScore();
    const profile = ritual(score);
    const stepList = steps(profile);
    const prompt = promptFor(profile, score, stepList);
    const share = `我的 ChillOut 第一日儀式是「${profile.name}」，穩定分數 ${score}/100。第一天的任務，是讓旅行順利開始。`;

    result.innerHTML = `
      <div class="fr-card">
        <div>
          <small>T019 first day ritual</small>
          <h2>${escapeHtml(profile.name)}</h2>
          <p>${escapeHtml(profile.truth)}</p>
        </div>
        <div class="fr-score" aria-label="穩定分數">${score}</div>
      </div>
      <div class="fr-steps">
        ${stepList.map((step) => `
          <article class="fr-step">
            <time>${escapeHtml(step[0])}</time>
            <h3>${escapeHtml(step[1])}</h3>
            <p>${escapeHtml(step[2])}</p>
          </article>
        `).join("")}
      </div>
      <div class="fr-dont">
        <h3>第一天不要做</h3>
        <p>${escapeHtml(profile.dont)}</p>
      </div>
      <div class="fr-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="fr-result-actions">
        <button class="fr-button" type="button" data-copy-share>複製分享文案</button>
        <button class="fr-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="fr-button fr-primary" data-app-link href="${appStore}?ct=tool_first_day_ritual_manual_${score}">丟進 ChillOut</a>
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
    fields.city.value = "曼谷";
    fields.arrival.value = "afternoon";
    fields.sleepDebt.value = "68";
    fields.transfer.value = "62";
    fields.luggage.value = "54";
    fields.hunger.value = "76";
    fields.checkin.value = "later";
    fields.wish.value = "food";
    fields.meal.value = "舒服的熱食或在地小吃";
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
