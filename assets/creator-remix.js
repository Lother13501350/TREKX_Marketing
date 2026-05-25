(() => {
  const appUrl = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sample = [
    "09:30 明洞早餐與換錢",
    "11:00 景福宮韓服拍照",
    "13:30 北村韓屋村散步",
    "15:30 延南洞咖啡店",
    "18:00 弘大逛街",
    "21:00 rooftop bar 夜景"
  ].join("\n");

  const els = {
    raw: document.querySelector("[data-creator-route]"),
    creator: document.querySelector("[data-creator]"),
    city: document.querySelector("[data-city]"),
    budget: document.querySelector("[data-budget]"),
    pace: document.querySelector("[data-pace]"),
    avoid: document.querySelector("[data-avoid]"),
    summary: document.querySelector("[data-summary]"),
    board: document.querySelector("[data-board]"),
    route: document.querySelector("[data-route]"),
    card: document.querySelector("[data-card]"),
    toast: document.querySelector("[data-toast]")
  };

  const state = {
    keepPhotos: true,
    reduceCrowds: true,
    foodUpgrade: false,
    stops: []
  };

  function parseStop(line, index) {
    const clean = line.trim().replace(/^[-*•]\s*/, "");
    const timeMatch = clean.match(/(\d{1,2}:\d{2})/);
    const time = timeMatch ? timeMatch[1] : `${String(9 + index * 2).padStart(2, "0")}:00`;
    const title = clean.replace(time, "").trim() || `創作者點位 ${index + 1}`;
    return {
      id: `${index}-${title.length}`,
      originalTime: time,
      title,
      category: classify(title),
      friction: friction(title),
      creatorOrder: index + 1
    };
  }

  function classify(text) {
    if (/咖啡|甜點|早餐|餐|bar|酒/.test(text)) return "food";
    if (/拍照|韓服|景|夜景|韓屋/.test(text)) return "photo";
    if (/逛|店|明洞|弘大|選物/.test(text)) return "shop";
    return "culture";
  }

  function friction(text) {
    let score = 30;
    if (/明洞|景福宮|北村|弘大/.test(text)) score += 28;
    if (/夜景|bar/.test(text)) score += 10;
    if (/咖啡|散步/.test(text)) score -= 8;
    if (els.avoid.value && text.includes(els.avoid.value)) score += 30;
    return Math.max(5, Math.min(95, score));
  }

  function actionFor(stop) {
    if (state.reduceCrowds && stop.friction >= 58) return "替換";
    if (!state.keepPhotos && stop.category === "photo") return "降級";
    if (els.budget.value === "低預算" && /bar|酒|韓服/.test(stop.title)) return "替換";
    if (state.foodUpgrade && stop.category === "food") return "升級";
    return "保留";
  }

  function remixTitle(stop) {
    const action = actionFor(stop);
    if (action === "保留") return stop.title;
    if (action === "升級") return `${stop.title}，改成預約制版本`;
    if (action === "降級") return `${stop.title}，改成路過拍攝`;
    if (/明洞/.test(stop.title)) return "乙支路小店與咖啡替代";
    if (/景福宮/.test(stop.title)) return "昌德宮周邊安靜拍照點";
    if (/北村/.test(stop.title)) return "西村巷弄散步替代";
    if (/弘大/.test(stop.title)) return "延南洞選物街替代";
    if (/bar|夜景/.test(stop.title)) return "漢江夜景散步替代";
    return `${stop.title} 的低人潮版本`;
  }

  function parseRoute() {
    const raw = (els.raw.value || "").trim() || sample;
    els.raw.value = raw;
    state.stops = raw.split(/\n+/).filter(Boolean).map(parseStop);
    render();
    toast("已 Remix 創作者路線");
  }

  function orderedRemix() {
    const pace = els.pace.value;
    const sorted = [...state.stops].sort((a, b) => {
      const order = { culture: 1, photo: 2, shop: 3, food: 4 };
      return (order[a.category] || 3) - (order[b.category] || 3);
    });
    if (pace === "慢旅") return sorted.slice(0, 4);
    if (pace === "緊湊") return sorted;
    return sorted.slice(0, 5);
  }

  function score() {
    if (!state.stops.length) return 0;
    const replacements = state.stops.filter((stop) => actionFor(stop) !== "保留").length;
    const frictionDrop = replacements * 10;
    const density = els.pace.value === "緊湊" ? -6 : els.pace.value === "慢旅" ? 8 : 3;
    return Math.max(20, Math.min(99, 62 + frictionDrop + density));
  }

  function buildPrompt(scoreValue) {
    const city = els.city.value || "目的地";
    const creator = els.creator.value || "創作者";
    const route = orderedRemix().map((stop, index) => `${index + 1}. ${remixTitle(stop)}（原本：${stop.title}，策略：${actionFor(stop)}）`).join("；");
    return `請用 ChillOut 幫我把 ${creator} 的 ${city} 路線 Remix 成我的版本。預算：${els.budget.value}，步調：${els.pace.value}，想避開：${els.avoid.value || "人潮與高成本"}。Remix 路線：${route}。請輸出每天動線、替代理由、餐廳/咖啡建議、拍照任務、交通順序與可分享標題。`;
  }

  function buildShare(scoreValue) {
    return `我把創作者路線丟進 ChillOut Remix，保留靈感但避開人潮和不適合我的點，個人化分數 ${scoreValue}/100。`;
  }

  function renderSummary(scoreValue) {
    const changed = state.stops.filter((stop) => actionFor(stop) !== "保留").length;
    const data = [
      ["原路線", state.stops.length],
      ["已替換", changed],
      ["保留", state.stops.length - changed],
      ["適配", `${scoreValue}/100`]
    ];
    els.summary.innerHTML = data.map(([label, value]) => `<div class="cr-metric"><strong>${value}</strong><span>${label}</span></div>`).join("");
  }

  function renderBoard() {
    const originals = state.stops.map((stop) => `
      <article class="cr-stop">
        <header><strong>${escapeHtml(stop.title)}</strong><span class="cr-label">${stop.originalTime}</span></header>
        <p>類型：${label(stop.category)} · 摩擦度 ${stop.friction}</p>
      </article>
    `).join("");
    const remixed = orderedRemix().map((stop, index) => `
      <article class="cr-stop">
        <header><strong>${escapeHtml(remixTitle(stop))}</strong><span class="cr-label">${actionFor(stop)}</span></header>
        <p>第 ${index + 1} 站 · ${reason(stop)}</p>
      </article>
    `).join("");
    els.board.innerHTML = `
      <section class="cr-column"><h3>創作者原路線</h3>${originals}</section>
      <section class="cr-column"><h3>你的 Remix 版本</h3>${remixed}</section>
    `;
  }

  function renderRoute(scoreValue) {
    const route = orderedRemix();
    els.route.innerHTML = `
      <h2>${els.city.value || "目的地"} Remix 時間線</h2>
      ${route.map((stop, index) => `
        <div class="cr-step">
          <div class="cr-time">${String(10 + index * 2).padStart(2, "0")}:00</div>
          <div><strong>${escapeHtml(remixTitle(stop))}</strong><small>${actionFor(stop)} · ${reason(stop)}</small></div>
        </div>
      `).join("")}
    `;
    const prompt = buildPrompt(scoreValue);
    els.card.innerHTML = `
      <h2>Remix 結果卡</h2>
      <div class="cr-score">${scoreValue}</div>
      <p>${scoreValue >= 82 ? "這條路線已經很適合你，可以進 ChillOut 生成完整版本。" : "這條路線還需要再刪一點，避免照抄創作者版本。"}</p>
      <div class="cr-prompt">${escapeHtml(prompt)}</div>
      <div class="cr-actions">
        <button class="cr-button" data-copy-prompt>複製 Prompt</button>
        <button class="cr-button" data-copy-share>複製分享文案</button>
        <a class="cr-button primary" href="${appUrl}?ct=tool_creator_remix_${scoreValue}">丟進 ChillOut</a>
      </div>
    `;
    els.card.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(prompt));
    els.card.querySelector("[data-copy-share]").addEventListener("click", () => copy(buildShare(scoreValue)));
  }

  function reason(stop) {
    const action = actionFor(stop);
    if (action === "保留") return "符合你的限制，保留創作者精華";
    if (action === "升級") return "把吃喝點變成這趟的主記憶";
    if (action === "降級") return "降低拍照壓力，避免整天被打卡綁架";
    return "降低人潮或預算摩擦，保留同類型體驗";
  }

  function label(category) {
    return { food: "吃喝", photo: "拍照", shop: "購物", culture: "文化" }[category] || "城市";
  }

  function render() {
    const scoreValue = score();
    renderSummary(scoreValue);
    renderBoard();
    renderRoute(scoreValue);
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
    setTimeout(() => els.toast.classList.remove("show"), 1400);
  }

  document.querySelector("[data-demo]").addEventListener("click", () => {
    els.raw.value = sample;
    parseRoute();
  });
  document.querySelector("[data-remix]").addEventListener("click", parseRoute);
  ["keepPhotos", "reduceCrowds", "foodUpgrade"].forEach((key) => {
    document.querySelector(`[data-${key}]`).addEventListener("change", (event) => {
      state[key] = event.target.checked;
      render();
    });
  });
  [els.creator, els.city, els.budget, els.pace, els.avoid].forEach((input) => input.addEventListener("input", render));

  els.raw.value = sample;
  parseRoute();
})();
