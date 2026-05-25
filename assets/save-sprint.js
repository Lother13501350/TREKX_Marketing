(() => {
  const appUrl = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sampleInput = [
    "弘大 rooftop bar 晚上拍照很漂亮",
    "延南洞小巷咖啡店，朋友說甜點必吃",
    "聖水洞選物店和香氛店，下午逛",
    "漢江野餐，但怕天氣不好",
    "明洞換錢和逛街，可能太觀光",
    "景福宮韓服拍照，早上去比較少人",
    "益善洞傳統茶屋，下雨也能坐",
    "東大門設計廣場夜景",
    "廣藏市場綠豆煎餅和生拌牛肉",
    "首爾林散步，想放空"
  ].join("\n");

  const typeRules = [
    { type: "咖啡甜點", icon: "CAFE", words: ["咖啡", "甜點", "茶", "蛋糕", "brunch", "cafe"] },
    { type: "夜景酒吧", icon: "NIGHT", words: ["夜", "bar", "酒", "rooftop", "霓虹", "晚"] },
    { type: "美食市場", icon: "FOOD", words: ["市場", "餐", "吃", "煎餅", "牛肉", "拉麵", "小吃"] },
    { type: "拍照景點", icon: "PHOTO", words: ["拍照", "韓服", "景", "宮", "漂亮", "打卡"] },
    { type: "購物小店", icon: "SHOP", words: ["選物", "逛街", "香氛", "店", "購物", "明洞"] },
    { type: "放空自然", icon: "SLOW", words: ["散步", "公園", "森林", "海", "放空", "野餐"] }
  ];

  const lanes = [
    { key: "must", title: "必排核心", hint: "最能代表這趟旅行" },
    { key: "route", title: "動線補強", hint: "順路、可串接、好安排" },
    { key: "backup", title: "備案雨天", hint: "天氣或體力不佳時使用" },
    { key: "drop", title: "先刪掉", hint: "觀光感重或成本太高" }
  ];

  const els = {
    raw: document.querySelector("[data-raw-input]"),
    city: document.querySelector("[data-city]"),
    days: document.querySelector("[data-days]"),
    budget: document.querySelector("[data-budget]"),
    pace: document.querySelector("[data-pace]"),
    addName: document.querySelector("[data-add-name]"),
    board: document.querySelector("[data-board]"),
    metrics: document.querySelector("[data-metrics]"),
    timeline: document.querySelector("[data-timeline]"),
    result: document.querySelector("[data-result]"),
    toast: document.querySelector("[data-toast]")
  };

  const state = {
    mood: "好拍",
    items: [],
    lastPrompt: "",
    lastShare: ""
  };

  function normalize(text) {
    return text.trim().replace(/^[-*•\d.\s]+/, "").replace(/\s+/g, " ");
  }

  function classify(text) {
    const lower = text.toLowerCase();
    const hit = typeRules.find((rule) => rule.words.some((word) => lower.includes(word.toLowerCase())));
    return hit || { type: "城市靈感", icon: "CITY" };
  }

  function scoreItem(text, index) {
    const lower = text.toLowerCase();
    let score = 42;
    if (lower.includes("必") || lower.includes("漂亮") || lower.includes("朋友")) score += 16;
    if (lower.includes("早上") || lower.includes("下午") || lower.includes("晚上")) score += 9;
    if (lower.includes("怕") || lower.includes("可能") || lower.includes("太觀光")) score -= 18;
    if (lower.includes("下雨") || lower.includes("室內")) score += 4;
    if (state.mood === "好拍" && /拍照|景|漂亮|韓服|夜/.test(text)) score += 12;
    if (state.mood === "美食" && /吃|餐|市場|甜點|咖啡/.test(text)) score += 12;
    if (state.mood === "放空" && /散步|公園|茶|海|森林|放空/.test(text)) score += 12;
    if (state.mood === "在地" && /市場|小巷|傳統|朋友/.test(text)) score += 10;
    score += Math.max(0, 9 - index);
    return Math.max(8, Math.min(98, score));
  }

  function laneFor(item) {
    if (/怕|可能|下雨|室內/.test(item.text) && item.score < 68) return "backup";
    if (/太觀光|排隊|很遠|不確定/.test(item.text) || item.score < 36) return "drop";
    if (item.score >= 72) return "must";
    return "route";
  }

  function parseInput() {
    const raw = (els.raw.value || "").trim() || sampleInput;
    els.raw.value = raw;
    const seen = new Set();
    state.items = raw.split(/\n+/)
      .map(normalize)
      .filter(Boolean)
      .filter((line) => {
        const key = line.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((text, index) => {
        const type = classify(text);
        const score = scoreItem(text, index);
        return {
          id: `spot-${index}-${text.length}`,
          text,
          type: type.type,
          icon: type.icon,
          score,
          lane: laneFor({ text, score })
        };
      });
    render();
    toast("已整理成救援看板");
  }

  function addSpot() {
    const text = normalize(els.addName.value || "");
    if (!text) return toast("先輸入一個景點或店名");
    const type = classify(text);
    const score = scoreItem(text, state.items.length);
    state.items.unshift({
      id: `custom-${Date.now()}`,
      text,
      type: type.type,
      icon: type.icon,
      score,
      lane: laneFor({ text, score })
    });
    els.addName.value = "";
    render();
    toast("已新增靈感");
  }

  function cycleLane(id) {
    const item = state.items.find((entry) => entry.id === id);
    if (!item) return;
    const index = lanes.findIndex((lane) => lane.key === item.lane);
    item.lane = lanes[(index + 1) % lanes.length].key;
    render();
  }

  function getLaneItems(key) {
    return state.items.filter((item) => item.lane === key).sort((a, b) => b.score - a.score);
  }

  function chaosScore() {
    if (!state.items.length) return 0;
    const uniqueTypes = new Set(state.items.map((item) => item.type)).size;
    const dropCount = getLaneItems("drop").length;
    const backupCount = getLaneItems("backup").length;
    return Math.max(10, Math.min(99, Math.round(state.items.length * 6 + uniqueTypes * 7 + dropCount * 5 + backupCount * 3)));
  }

  function buildTimeline() {
    const must = getLaneItems("must");
    const route = getLaneItems("route");
    const backup = getLaneItems("backup");
    const picks = [...must.slice(0, 3), ...route.slice(0, 3)];
    const slots = ["10:00", "11:30", "13:00", "15:00", "17:30", "20:00"];
    const labels = ["第一站先定錨", "同區散步補強", "午餐或咖啡中繼", "下午主行程", "晚餐與轉場", "夜景收尾"];
    const fallback = backup[0];
    return slots.map((time, index) => {
      const item = picks[index] || fallback || { text: "打開 ChillOut 生成附近替代點", type: "ChillOut", score: 50 };
      return { time, label: labels[index], item };
    });
  }

  function buildPrompt() {
    const city = els.city.value || "目的地";
    const days = els.days.value;
    const budget = els.budget.value;
    const pace = els.pace.value;
    const must = getLaneItems("must").slice(0, 4).map((item) => item.text).join("、") || "還沒有必排核心";
    const route = getLaneItems("route").slice(0, 4).map((item) => item.text).join("、") || "請補順路點";
    const backup = getLaneItems("backup").slice(0, 3).map((item) => item.text).join("、") || "請準備雨天備案";
    return `請用 ChillOut 幫我把 IG 收藏整理成 ${city} ${days} 天行程。旅行風格：${state.mood}，預算：${budget}，步調：${pace}。必排核心：${must}。順路補強：${route}。備案：${backup}。請輸出每天路線、每站停留時間、餐廳/咖啡建議、交通順序、雨天替代方案，以及可分享的行程標題。`;
  }

  function buildShare(score) {
    const city = els.city.value || "下一趟旅行";
    return `我用 ChillOut 的 IG 靈感急救室整理了 ${state.items.length} 個收藏，混亂指數 ${score}/100。已經切出必排核心、順路補強、雨天備案和先刪掉清單，下一步要丟進 ChillOut 生成 ${city} 行程。`;
  }

  function renderMetrics(score) {
    const data = [
      ["收藏數", state.items.length],
      ["必排", getLaneItems("must").length],
      ["備案", getLaneItems("backup").length],
      ["混亂", `${score}/100`]
    ];
    els.metrics.innerHTML = data.map(([label, value]) => `<div class="ss-metric"><strong>${value}</strong><span>${label}</span></div>`).join("");
  }

  function renderBoard() {
    if (!state.items.length) {
      els.board.innerHTML = `<div class="ss-empty">貼上 IG 收藏或按「載入示範」，這裡會變成四欄救援看板。</div>`;
      return;
    }
    els.board.innerHTML = lanes.map((lane) => {
      const cards = getLaneItems(lane.key).map((item) => `
        <article class="ss-card" data-card-id="${item.id}" title="點一下可移到下一欄">
          <strong>${escapeHtml(item.text)}</strong>
          <p>${lane.hint}</p>
          <footer><span class="ss-type">${item.icon} · ${item.type}</span><span class="ss-score">${item.score}</span></footer>
        </article>
      `).join("");
      return `<section class="ss-lane"><h3>${lane.title}<small>${getLaneItems(lane.key).length}</small></h3>${cards || `<div class="ss-empty">暫無項目</div>`}</section>`;
    }).join("");
  }

  function renderTimeline() {
    const rows = buildTimeline();
    els.timeline.innerHTML = `
      <h2>${els.city.value || "目的地"} 第一版救援路線</h2>
      ${rows.map((row) => `
        <div class="ss-time-item">
          <div class="ss-time">${row.time}</div>
          <div><strong>${escapeHtml(row.item.text)}</strong><small>${row.label} · ${row.item.type}</small></div>
        </div>
      `).join("")}
    `;
  }

  function renderResult(score) {
    state.lastPrompt = buildPrompt();
    state.lastShare = buildShare(score);
    const appLink = `${appUrl}?ct=tool_save_sprint_route_${score}`;
    els.result.innerHTML = `
      <h2>救援結果卡</h2>
      <div class="ss-result-score">${score}</div>
      <p>${score >= 76 ? "靈感很多，但已經可以收斂成路線。" : "資料還有點散，先用看板把出發版本整理出來。"}</p>
      <div class="ss-prompt">${escapeHtml(state.lastPrompt)}</div>
      <div class="ss-actions">
        <button class="ss-button" data-copy-prompt>複製 ChillOut Prompt</button>
        <button class="ss-button" data-copy-share>複製分享文案</button>
        <a class="ss-button primary" href="${appLink}">丟進 ChillOut</a>
      </div>
    `;
  }

  function render() {
    const score = chaosScore();
    renderMetrics(score);
    renderBoard();
    renderTimeline();
    renderResult(score);
    document.querySelector("[data-hero-score]").textContent = score || "--";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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
    window.setTimeout(() => els.toast.classList.remove("show"), 1500);
  }

  document.querySelector("[data-load-sample]").addEventListener("click", () => {
    els.raw.value = sampleInput;
    parseInput();
  });
  document.querySelector("[data-analyze]").addEventListener("click", parseInput);
  document.querySelector("[data-add-spot]").addEventListener("click", addSpot);
  document.querySelector("[data-reset]").addEventListener("click", () => {
    els.raw.value = "";
    state.items = [];
    render();
    toast("已清空");
  });
  document.querySelectorAll("[data-mood]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mood = button.dataset.mood;
      document.querySelectorAll("[data-mood]").forEach((item) => item.classList.toggle("active", item === button));
      if (state.items.length) {
        state.items = state.items.map((item, index) => {
          const score = scoreItem(item.text, index);
          return { ...item, score, lane: laneFor({ text: item.text, score }) };
        });
      }
      render();
    });
  });
  [els.city, els.days, els.budget, els.pace].forEach((input) => input.addEventListener("input", render));
  els.board.addEventListener("click", (event) => {
    const card = event.target.closest("[data-card-id]");
    if (card) cycleLane(card.dataset.cardId);
  });
  els.result.addEventListener("click", (event) => {
    if (event.target.matches("[data-copy-prompt]")) copy(state.lastPrompt);
    if (event.target.matches("[data-copy-share]")) copy(state.lastShare);
  });

  els.raw.value = sampleInput;
  parseInput();
})();
