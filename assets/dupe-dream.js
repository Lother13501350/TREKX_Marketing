(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const els = {
    place: document.querySelector("[data-place]"),
    goal: document.querySelector("[data-goal]"),
    expectation: document.querySelector("[data-expectation]"),
    crowd: document.querySelector("[data-crowd]"),
    wait: document.querySelector("[data-wait]"),
    detour: document.querySelector("[data-detour]"),
    result: document.querySelector("[data-result]"),
    toast: document.querySelector("[data-toast]")
  };

  function value(key) {
    return Number(els[key].value || 0);
  }

  function score() {
    return Math.max(0, Math.min(100, Math.round(
      value("expectation") * .55 +
      value("crowd") * .22 +
      value("detour") * .13 -
      value("wait") * .22 +
      18
    )));
  }

  function verdict(scoreValue) {
    if (scoreValue >= 72) return { title: "值得去，但要排對時段", tag: "GO OFF-PEAK", copy: "這個點符合你的旅行任務，不過不要把黃金時段全部押在排隊上。" };
    if (scoreValue >= 48) return { title: "可以去，但只能當順路點", tag: "SIDE QUEST", copy: "它還不值得主導整天行程。把它放在附近路線裡，去不了也不會毀掉一天。" };
    return { title: "先不要排，找同氛圍替代點", tag: "SKIP FOR NOW", copy: "你想要的其實不是這個地標本身，而是照片、食物或氛圍。替代點更適合。" };
  }

  function bestWindow() {
    if (value("wait") > 70) return "開門前 30 分鐘或閉店前 90 分鐘";
    if (value("crowd") < 45) return "平日早上，避開 14:00-17:00";
    return "下午茶前後，保留可撤退備案";
  }

  function alternative() {
    const goal = els.goal.value;
    if (goal === "拍照") return ["找同色系街區或小巷", "排一個可坐下的咖啡備案", "把熱門點只當 20 分鐘拍照任務"];
    if (goal === "美食") return ["找同菜系但不用排隊的店", "先訂附近第二選擇", "把名店改成外帶或非尖峰時段"];
    if (goal === "故事感") return ["找同歷史脈絡的小眾點", "加一個書店或展覽中繼", "用 ChillOut 補一段在地背景"];
    return ["找公園、河岸或安靜咖啡", "把移動距離壓低", "保留 60 分鐘不排行程"];
  }

  function prompt(scoreValue, decision) {
    return `請用 ChillOut 幫我安排「${els.place.value || "這個爆紅景點"}」附近的半日行程。我的目標是「${els.goal.value}」，值得去分數 ${scoreValue}/100，判斷是「${decision.title}」。請避開人潮高峰，建議最佳到達時間是 ${bestWindow()}，並提供 2 個同氛圍替代點、交通順序、附近餐廳/咖啡和雨天備案。`;
  }

  function render() {
    const currentScore = score();
    const decision = verdict(currentScore);
    const alt = alternative();
    const routePrompt = prompt(currentScore, decision);
    const share = `我用 ChillOut「爆紅景點值得嗎」測了 ${els.place.value}：${currentScore}/100，結論是「${decision.title}」。`;
    els.result.innerHTML = `
      <div class="dd-verdict">
        <div>
          <span>${decision.tag}</span>
          <h2>${decision.title}</h2>
        </div>
        <div class="dd-score">${currentScore}</div>
      </div>
      <p>${decision.copy}</p>
      <div class="dd-plan">
        <section>
          <h3>怎麼去比較不浪費</h3>
          <ul>
            <li>最佳時段：${bestWindow()}</li>
            <li>停留上限：${currentScore >= 72 ? "90 分鐘" : "45 分鐘"}</li>
            <li>先查附近可坐下的備案</li>
          </ul>
        </section>
        <section>
          <h3>替代玩法</h3>
          <ul>${alt.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </div>
      <div class="dd-prompt">${escapeHtml(routePrompt)}</div>
      <div class="dd-actions">
        <button class="dd-button" data-copy-prompt>複製 Prompt</button>
        <button class="dd-button" data-copy-share>複製分享文案</button>
        <a class="dd-button primary" href="${appStore}?ct=tool_dupe_dream_simple_${currentScore}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(routePrompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copy(share));
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("已複製");
    } catch {
      window.prompt("複製文字", text);
    }
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    setTimeout(() => els.toast.classList.remove("show"), 1300);
  }

  for (const key of ["expectation", "crowd", "wait", "detour"]) {
    const label = document.querySelector(`[data-${key}-label]`);
    els[key].addEventListener("input", () => {
      label.textContent = els[key].value;
      render();
    });
  }
  [els.place, els.goal].forEach((node) => node.addEventListener("input", render));
  document.querySelector("[data-calc]").addEventListener("click", render);
  render();
})();
