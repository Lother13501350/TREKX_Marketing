(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    me: document.querySelector("[data-me]"),
    partner: document.querySelector("[data-partner]"),
    wake: document.querySelector("[data-wake]"),
    photo: document.querySelector("[data-photo]"),
    food: document.querySelector("[data-food]"),
    budget: document.querySelector("[data-budget]"),
    alone: document.querySelector("[data-alone]"),
    decision: document.querySelector("[data-decision]"),
    romance: document.querySelector("[data-romance]"),
    pace: document.querySelector("[data-pace]"),
    goal: document.querySelector("[data-goal]")
  };

  const labels = {
    wake: ["起床", "早晚型不同時，上午不要排不可取消活動。"],
    photo: ["拍照", "先講好每個拍照點上限，想重拍要問對方。"],
    food: ["吃飯", "先決定一天哪一餐是重點，其他餐以順路為主。"],
    budget: ["預算", "把必花、可選、浪漫升級分開，不要臨場猜對方。"],
    alone: ["放風", "各自行動不是冷淡，是讓旅行不過熱。"],
    decision: ["決策", "分歧超過 5 分鐘就用事先規則定案。"],
    romance: ["浪漫", "浪漫要安排，但不要用驚喜取代溝通。"],
    pace: ["節奏", "快慢不同時，每天只固定一段共同主線。"]
  };

  function value(key) {
    return Number(fields[key].value || 0);
  }

  function rankedZones() {
    return Object.keys(labels)
      .map((key) => ({ key, label: labels[key][0], advice: labels[key][1], score: value(key) }))
      .sort((a, b) => b.score - a.score);
  }

  function heatScore(zones) {
    const topThree = zones.slice(0, 3).reduce((sum, zone) => sum + zone.score, 0) / 3;
    if (fields.goal.value === "mood") return Math.round(Math.min(98, topThree + 6));
    return Math.round(Math.min(98, topThree));
  }

  function agreements(zones) {
    const top = zones.slice(0, 4);
    const base = top.map((zone) => zone.advice);
    if (fields.goal.value === "photo") base.push("至少安排一段雙方都願意拍照的時間，其餘景點不強迫。");
    if (fields.goal.value === "food") base.push("先訂一餐真正期待的餐，避免餓的時候討論。");
    if (fields.goal.value === "rest") base.push("每天安排一段回房或坐下來的休息。");
    if (fields.goal.value === "mood") base.push("吵起來時先暫停 10 分鐘，不在路邊做重大決定。");
    return Array.from(new Set(base)).slice(0, 6);
  }

  function profile(score) {
    if (score >= 78) return ["高溫雷區", "這趟不能靠默契硬撐，要先把規則說清楚。"];
    if (score >= 58) return ["可控雷區", "有幾個明顯爆點，但只要提前約定就能避開。"];
    return ["低溫雷區", "你們的旅行期待接近，重點是保留彈性。"];
  }

  function promptFor(zones, agreementsList, score) {
    return `請用 ChillOut 幫我們安排一趟情侶旅行的不吵架路線。旅伴是 ${fields.me.value || "我"} 和 ${fields.partner.value || "另一半"}。雷區熱度 ${score}/100。最高雷區：${zones.slice(0, 4).map((zone) => `${zone.label} ${zone.score}`).join("、")}。這趟最想保住：${fields.goal.options[fields.goal.selectedIndex].textContent}。請遵守這些避雷協議：${agreementsList.join("；")}。請輸出一日或兩日路線、共同主線、各自放風段、拍照時間上限、吃飯安排、吵架時備案，以及可以傳給對方確認的溝通卡。`;
  }

  function render() {
    Object.keys(labels).forEach((key) => {
      document.querySelector(`[data-value="${key}"]`).textContent = fields[key].value;
    });

    const zones = rankedZones();
    const score = heatScore(zones);
    const [title, body] = profile(score);
    const agreementsList = agreements(zones);
    const prompt = promptFor(zones, agreementsList, score);
    const share = `我們的 ChillOut 情侶旅行雷區是「${title}」，熱度 ${score}/100。浪漫不是不規劃，是把爆點移除。`;

    result.innerHTML = `
      <div class="cm-map">
        <div>
          <small>T022 couple conflict map</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(body)} ${escapeHtml(fields.me.value || "我")} × ${escapeHtml(fields.partner.value || "另一半")}。</p>
        </div>
        <div class="cm-score" aria-label="雷區熱度">${score}</div>
      </div>
      <div class="cm-zones">
        ${zones.slice(0, 4).map((zone) => `
          <article class="cm-zone">
            <span>${escapeHtml(zone.key)}</span>
            <h3>${escapeHtml(zone.label)} · ${zone.score}</h3>
            <p>${escapeHtml(zone.advice)}</p>
          </article>
        `).join("")}
      </div>
      <div class="cm-agreement">
        <h3>避雷協議</h3>
        <ul>${agreementsList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div class="cm-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="cm-result-actions">
        <button class="cm-button" type="button" data-copy-share>複製分享文案</button>
        <button class="cm-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="cm-button cm-primary" data-app-link href="${appStore}?ct=tool_couple_conflict_map_manual_${score}">丟進 ChillOut</a>
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
    fields.me.value = "我";
    fields.partner.value = "另一半";
    fields.wake.value = "66";
    fields.photo.value = "74";
    fields.food.value = "58";
    fields.budget.value = "52";
    fields.alone.value = "48";
    fields.decision.value = "64";
    fields.romance.value = "70";
    fields.pace.value = "62";
    fields.goal.value = "mood";
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
