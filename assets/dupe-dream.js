(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
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

  function worthScore() {
    const raw =
      value("expectation") * 0.52 +
      value("crowd") * 0.2 +
      value("detour") * 0.14 -
      value("wait") * 0.24 +
      20;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }

  function verdict(score) {
    if (score >= 76) {
      return {
        code: "GO OFF-PEAK",
        title: "值得去，但不要黃金時段去",
        body: "這個點符合你的核心期待。它可以排進行程，但要避開人潮高峰，否則整段旅行會被等待時間吃掉。"
      };
    }
    if (score >= 52) {
      return {
        code: "SIDE QUEST",
        title: "可以去，但只能當順路點",
        body: "它還有價值，但不適合當主軸。把它放在附近路線裡，去不了也不會毀掉整天。"
      };
    }
    return {
      code: "FIND A DUPE",
      title: "先不要排，找同氛圍替代點",
      body: "你想要的其實不是這個地標本身，而是照片、味道或氛圍。替代點會更適合你的旅行。"
    };
  }

  function bestWindow() {
    if (value("wait") > 72) return "開門前 30 分鐘，或閉店前 90 分鐘";
    if (value("crowd") < 45) return "平日上午，避開 14:00-17:00";
    return "下午茶前後，保留可撤退備案";
  }

  function alternatives() {
    const goal = els.goal.value;
    if (goal === "拍照") {
      return ["找同色系街區或小巷", "排一個可坐下的咖啡備案", "把熱門點只留 20 分鐘拍照任務"];
    }
    if (goal === "美食") {
      return ["找同菜系但不用排隊的店", "先訂附近第二選擇", "把名店改成外帶或非尖峰時段"];
    }
    if (goal === "故事感") {
      return ["找同歷史脈絡的小眾點", "加一間書店或展覽中繼", "用 ChillOut 補一段在地背景"];
    }
    return ["找公園、河岸或安靜咖啡", "把移動距離壓低", "保留 60 分鐘不排行程"];
  }

  function actionPlan(score) {
    if (score >= 76) {
      return ["把它排在第一站或最後一站", "現場停留上限 90 分鐘", "先查附近 2 個可坐下備案"];
    }
    if (score >= 52) {
      return ["只在同區域順路時安排", "現場停留上限 45 分鐘", "如果排隊超過 20 分鐘就切換備案"];
    }
    return ["不要為了它跨區移動", "把想要的元素拆成照片、美食或氛圍", "用替代點生成半日路線"];
  }

  function buildPrompt(score, decision) {
    const place = els.place.value.trim() || "這個爆紅景點";
    return `請用 ChillOut 幫我安排「${place}」附近的半日行程。我真正想得到的是「${els.goal.value}」。值不值得分數 ${score}/100，判斷是「${decision.title}」。請避開人潮高峰，建議最佳到達時間是 ${bestWindow()}。請提供 2 個同氛圍替代點、交通順序、附近餐廳或咖啡、雨天備案，以及一個適合分享的行程標題。`;
  }

  function render() {
    const score = worthScore();
    const decision = verdict(score);
    const prompt = buildPrompt(score, decision);
    const share = `我用 ChillOut「爆紅景點值不值得」測了 ${els.place.value.trim() || "一個景點"}：${score}/100，結論是「${decision.title}」。`;

    resultNode().innerHTML = `
      <div class="dd-verdict">
        <div>
          <small>${decision.code}</small>
          <h2>${decision.title}</h2>
          <p>${decision.body}</p>
        </div>
        <div class="dd-score">${score}</div>
      </div>

      <div class="dd-grid">
        <section class="dd-card">
          <h3>怎麼去比較不浪費</h3>
          <ul>${actionPlan(score).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section class="dd-card">
          <h3>替代玩法</h3>
          <ul>${alternatives().map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </div>

      <div class="dd-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="dd-actions">
        <button class="dd-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="dd-button" type="button" data-copy-share>複製分享文案</button>
        <a class="dd-button dd-primary" href="${appStore}?ct=tool_dupe_dream_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function resultNode() {
    return els.result;
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
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    window.setTimeout(() => els.toast.classList.remove("is-visible"), 1300);
  }

  for (const key of ["expectation", "crowd", "wait", "detour"]) {
    const label = document.querySelector(`[data-${key}-label]`);
    els[key].addEventListener("input", () => {
      label.textContent = els[key].value;
      render();
    });
  }

  [els.place, els.goal].forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  render();
})();
