(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    nights: document.querySelector("[data-nights]"),
    sleep: document.querySelector("[data-sleep]"),
    location: document.querySelector("[data-location]"),
    view: document.querySelector("[data-view]"),
    bath: document.querySelector("[data-bath]"),
    intensity: document.querySelector("[data-intensity]"),
    budget: document.querySelector("[data-budget]"),
    work: document.querySelector("[data-work]"),
    luggage: document.querySelector("[data-luggage]"),
    noise: document.querySelector("[data-noise]")
  };

  function value(key) {
    return Number(fields[key].value || 0);
  }

  function roomScores() {
    const scores = {
      sleep: value("sleep") + (fields.noise.checked ? 18 : 0) + (fields.intensity.value === "high" ? 12 : 0),
      location: value("location") + (fields.luggage.checked ? 8 : 0) + (fields.intensity.value === "high" ? 10 : 0),
      recovery: value("bath") + value("sleep") * 0.25 + (fields.budget.value === "invest" ? 10 : 0),
      view: value("view") + (fields.work.checked ? 8 : 0) + (fields.budget.value === "save" ? -10 : 0)
    };
    return Object.fromEntries(Object.entries(scores).map(([key, score]) => [key, Math.round(Math.max(0, Math.min(100, score)))]));
  }

  function profile(topKey) {
    const data = {
      sleep: ["深睡防禦型", "你這趟最需要的是安靜與好睡，不是漂亮大廳。", "隔音、床、遮光、空調穩定度要排在第一。"],
      location: ["機能回血型", "你需要住得順，少走冤枉路才有體力玩。", "車站距離、電梯、附近餐食和回程便利度最重要。"],
      recovery: ["房內恢復型", "你不是奢侈，是需要用房間把體力補回來。", "浴缸、空間、房內休息品質值得多分配預算。"],
      view: ["景觀靈感型", "你會被房間的光線與窗景影響整趟旅行心情。", "景觀、設計、桌面和可停留感比坪數更重要。"]
    };
    return { key: topKey, name: data[topKey][0], truth: data[topKey][1], rule: data[topKey][2] };
  }

  function priorities(scores) {
    const labels = {
      sleep: ["睡眠", "選高樓層、非電梯旁、遮光好、評價提到安靜的房。"],
      location: ["位置", "優先車站 8 分鐘內或主要動線旁，少一段轉乘就是多一段體力。"],
      recovery: ["恢復", "看浴缸、沙發、房內空間與可放鬆設備，不只看星級。"],
      view: ["景觀", "選窗景、採光、桌面與設計感，適合回房整理照片。"]
    };
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([key, score], index) => ({ key, score, rank: index + 1, label: labels[key][0], note: labels[key][1] }));
  }

  function budgetRules(profileData, prioritiesData) {
    const nights = Number(fields.nights.value || 1);
    const rules = [];
    if (fields.budget.value === "save") rules.push("不要升等景觀房，把錢留給交通便利與早餐。");
    if (fields.budget.value === "invest") rules.push("可以把總住宿預算提高 15-25%，但只花在第一順位需求。");
    if (fields.intensity.value === "high") rules.push("行程很滿時，住宿離交通越近越值得加價。");
    if (nights >= 3) rules.push("連住 3 晚以上時，房內舒適比單晚景觀更重要。");
    rules.push(`第一順位是「${profileData.name}」，訂房頁先檢查：${prioritiesData[0].note}`);
    return rules;
  }

  function promptFor(profileData, prioritiesData, rules) {
    return `請用 ChillOut 幫我挑「${fields.city.value.trim() || "目的地"}」住宿區域與房型。住宿晚數 ${fields.nights.value} 晚，房型能量是「${profileData.name}」。我的需求分數：睡眠 ${fields.sleep.value}/100，位置 ${fields.location.value}/100，景觀/設計 ${fields.view.value}/100，浴缸/放鬆 ${fields.bath.value}/100。行程強度 ${fields.intensity.options[fields.intensity.selectedIndex].textContent}，預算策略 ${fields.budget.options[fields.budget.selectedIndex].textContent}。優先順序是：${prioritiesData.map((item) => `${item.rank}.${item.label} ${item.score}`).join("；")}。請依照這些規則：${rules.join("；")}，輸出推薦住宿區域、房型條件、訂房篩選字、避雷條件、以及落地第一晚的低壓行程。`;
  }

  function render() {
    ["sleep", "location", "view", "bath"].forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const scores = roomScores();
    const topKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const profileData = profile(topKey);
    const prioritiesData = priorities(scores);
    const rules = budgetRules(profileData, prioritiesData);
    const prompt = promptFor(profileData, prioritiesData, rules);
    const share = `我的 ChillOut 房型能量是「${profileData.name}」。住宿不是配角，它會決定我有沒有力氣玩。`;

    result.innerHTML = `
      <div class="hr-keycard">
        <div>
          <small>T018 room energy keycard</small>
          <h2>${escapeHtml(profileData.name)}</h2>
          <p>${escapeHtml(profileData.truth)} ${escapeHtml(profileData.rule)}</p>
        </div>
        <div class="hr-score" aria-label="最高需求分數">${scores[topKey]}</div>
      </div>
      <div class="hr-priority">
        ${prioritiesData.map((item) => `
          <article>
            <span>rank ${item.rank}</span>
            <h3>${escapeHtml(item.label)} · ${item.score}</h3>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `).join("")}
      </div>
      <div class="hr-budget">
        <h3>預算分配規則</h3>
        <ul>${rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
      </div>
      <div class="hr-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="hr-result-actions">
        <button class="hr-button" type="button" data-copy-share>複製分享文案</button>
        <button class="hr-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="hr-button hr-primary" data-app-link href="${appStore}?ct=tool_hotel_room_energy_manual_${profileData.key}_${scores[topKey]}">丟進 ChillOut</a>
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
    fields.city.value = "台北";
    fields.nights.value = "3";
    fields.sleep.value = "86";
    fields.location.value = "78";
    fields.view.value = "48";
    fields.bath.value = "62";
    fields.intensity.value = "mid";
    fields.budget.value = "balance";
    fields.work.checked = false;
    fields.luggage.checked = true;
    fields.noise.checked = true;
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
