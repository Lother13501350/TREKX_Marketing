(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const stopListNode = document.querySelector("[data-stops]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    hotel: document.querySelector("[data-hotel]"),
    leave: document.querySelector("[data-leave]"),
    returnBy: document.querySelector("[data-return]"),
    mood: document.querySelector("[data-mood]"),
    walk: document.querySelector("[data-walk]"),
    line: document.querySelector("[data-line]"),
    rain: document.querySelector("[data-rain]")
  };
  const labels = {
    walk: document.querySelector("[data-walk-label]"),
    line: document.querySelector("[data-line-label]")
  };

  let stops = [
    stop("延南深夜布丁", "cream", 24, 72, 86, 11, 8),
    stop("弘大可麗露窗口", "bakery", 23.5, 80, 74, 7, 16),
    stop("望遠水果冰室", "fruit", 23, 66, 90, 18, 10),
    stop("合井熱甜湯小店", "warm", 24, 92, 62, 13, 4)
  ];

  function stop(name, type, openUntil, warmth, photo, walk, line) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      openUntil,
      warmth,
      photo,
      walk,
      line
    };
  }

  function renderStops() {
    stopListNode.innerHTML = stops.map((item) => `
      <article class="ld-stop" data-stop-id="${escapeAttr(item.id)}">
        <label>
          店名或想吃的東西
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="店名或想吃的東西">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="甜點類型">
            ${dessertTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("openUntil", "營業到", item.openUntil, 21, 26, "點")}
        ${rangeControl("walk", "步行", item.walk, 2, 35, "分")}
        ${rangeControl("line", "排隊", item.line, 0, 45, "分")}
        <button class="ld-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="ld-mini">${label}<strong>${displayRangeValue(key, value, suffix)}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" step="${key === "openUntil" ? "0.5" : "1"}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function dessertTypes() {
    return [
      { value: "cream", label: "奶油蛋糕" },
      { value: "fruit", label: "水果清爽" },
      { value: "warm", label: "熱甜湯" },
      { value: "bakery", label: "烘焙麵包" },
      { value: "ice", label: "冰品" }
    ];
  }

  function typeLabel(value) {
    const found = dessertTypes().find((type) => type.value === value);
    return found ? found.label : "甜點";
  }

  function displayRangeValue(key, value, suffix) {
    if (key === "openUntil") return formatHour(value);
    return `${value}${suffix}`;
  }

  function formatHour(value) {
    const normalized = Number(value);
    const hour = Math.floor(normalized) % 24;
    const minute = normalized % 1 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, "0")}:${minute}`;
  }

  function updateGlobalLabels() {
    labels.walk.textContent = `${fields.walk.value} 分鐘`;
    labels.line.textContent = `${fields.line.value} 分鐘`;
  }

  function scoreStop(item) {
    const moodBonus = item.type === fields.mood.value ? 18 : 0;
    const openBonus = Number(item.openUntil) >= hourDecimal(fields.returnBy.value) ? 14 : -18;
    const walkPenalty = Math.max(0, Number(item.walk) - Number(fields.walk.value)) * 1.4;
    const linePenalty = Math.max(0, Number(item.line) - Number(fields.line.value)) * 1.2;
    const rainBonus = fields.rain.checked && (item.type === "warm" || Number(item.walk) <= 10) ? 10 : 0;
    const vibeScore = item.warmth * 0.28 + item.photo * 0.24;
    return Math.round(Math.max(1, Math.min(99, 48 + moodBonus + openBonus + rainBonus + vibeScore - walkPenalty - linePenalty)));
  }

  function hourDecimal(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour + minute / 60;
  }

  function rankedStops() {
    return stops.map((item) => ({ ...item, score: scoreStop(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const ranked = rankedStops();
    const primary = ranked[0];
    const second = ranked.find((item) => item.id !== primary.id && item.type !== primary.type) || ranked[1] || primary;
    const backup = ranked.find((item) => item.id !== primary.id && item.id !== second.id && Number(item.openUntil) >= hourDecimal(fields.returnBy.value)) || ranked[2] || second;
    const score = Math.round((primary.score * 0.52 + second.score * 0.30 + backup.score * 0.18));
    return { primary, second, backup, score };
  }

  function profile(score) {
    if (score >= 82) return ["今晚值得出門", "候選點距離、排隊與營業時間都夠漂亮，可以把甜點當作夜晚主行程。"];
    if (score >= 62) return ["可以吃，但要保留備案", "主甜點有吸引力，不過排隊或回程需要控制，適合排成一主一備。"];
    return ["先縮短路線", "甜點慾望很明確，但現在的距離、排隊或打烊時間太緊，建議改成近站短路線。"];
  }

  function radarSvg(plan) {
    const points = [
      { label: "營業", value: Math.min(99, Number(plan.primary.openUntil) >= hourDecimal(fields.returnBy.value) ? 92 : 48), angle: -90 },
      { label: "步行", value: Math.max(10, 100 - Math.max(0, Number(plan.primary.walk) - Number(fields.walk.value)) * 5), angle: -18 },
      { label: "排隊", value: Math.max(10, 100 - Math.max(0, Number(plan.primary.line) - Number(fields.line.value)) * 4), angle: 54 },
      { label: "拍照", value: plan.primary.photo, angle: 126 },
      { label: "療癒", value: plan.primary.warmth, angle: 198 }
    ];
    const center = 150;
    const rings = [44, 76, 108];
    const polygon = points.map((point) => polar(center, center, point.angle, point.value * 1.08)).join(" ");
    return `
      <svg viewBox="0 0 300 300" role="img" aria-label="深夜甜點雷達圖">
        <rect x="1" y="1" width="298" height="298" rx="16" fill="#fffdf9" stroke="#ded8d0"></rect>
        ${rings.map((ring) => `<circle cx="150" cy="150" r="${ring}" fill="none" stroke="#ded8d0"></circle>`).join("")}
        ${points.map((point) => {
          const lineEnd = polar(center, center, point.angle, 116).split(",");
          const label = polar(center, center, point.angle, 132).split(",");
          return `<line x1="150" y1="150" x2="${lineEnd[0]}" y2="${lineEnd[1]}" stroke="#ded8d0"></line><text x="${label[0]}" y="${label[1]}" text-anchor="middle" font-size="11" fill="#6f6a63">${point.label}</text>`;
        }).join("")}
        <polygon points="${polygon}" fill="rgba(122, 92, 67, 0.16)" stroke="#7a5c43" stroke-width="3"></polygon>
        ${points.map((point) => {
          const dot = polar(center, center, point.angle, point.value * 1.08).split(",");
          return `<circle cx="${dot[0]}" cy="${dot[1]}" r="5" fill="#7a5c43"></circle>`;
        }).join("")}
        <text x="150" y="156" text-anchor="middle" font-size="42" font-weight="900" fill="#7a5c43">${plan.score}</text>
        <text x="150" y="178" text-anchor="middle" font-size="12" fill="#6f6a63">dessert fit</text>
      </svg>
    `;
  }

  function polar(cx, cy, angle, distance) {
    const radian = angle * Math.PI / 180;
    const x = Math.round((cx + Math.cos(radian) * distance) * 10) / 10;
    const y = Math.round((cy + Math.sin(radian) * distance) * 10) / 10;
    return `${x},${y}`;
  }

  function addMinutes(time, minutes) {
    const [hour, minute] = time.split(":").map(Number);
    const total = hour * 60 + minute + minutes;
    const nextHour = Math.floor(total / 60) % 24;
    const nextMinute = total % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function taskCards(plan) {
    return [
      {
        time: fields.leave.value,
        title: "主甜點",
        stop: plan.primary,
        note: `先吃 ${typeLabel(plan.primary.type)}，可接受步行 ${plan.primary.walk} 分、排隊 ${plan.primary.line} 分。`
      },
      {
        time: addMinutes(fields.leave.value, 38),
        title: "散步消化",
        stop: plan.second,
        note: `第二站選 ${plan.second.name}，讓口味換成 ${typeLabel(plan.second.type)}，比較不膩。`
      },
      {
        time: addMinutes(fields.leave.value, 72),
        title: "保底收尾",
        stop: plan.backup,
        note: `${plan.backup.name} 是備案；太晚、下雨或排隊爆掉就直接切換。`
      }
    ];
  }

  function orderLine(plan) {
    const mood = typeLabel(fields.mood.value);
    if (plan.primary.type === "cream") return `點一份招牌蛋糕，搭配無糖飲料，今晚目標是「吃到舒服但不膩」。`;
    if (plan.primary.type === "fruit") return `點水果系或酸甜款，適合晚餐後收尾，拍照也比較清爽。`;
    if (plan.primary.type === "warm") return `點熱甜湯或溫甜品，雨天與夜風強時優先。`;
    if (plan.primary.type === "bakery") return `點可外帶的烘焙款，排隊太久就帶回住宿慢慢吃。`;
    return `今晚想吃 ${mood}，請選最小份量，留一點空間給散步與回程。`;
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 深夜甜點雷達排好了：${fields.city.value} 今晚是「${title}」。主甜點 ${plan.primary.name}，備案 ${plan.backup.name}，甜點適配 ${plan.score}/100。我的規則：步行不超過 ${fields.walk.value} 分、排隊不超過 ${fields.line.value} 分、${fields.returnBy.value} 前回到 ${fields.hotel.value}。`;
  }

  function promptFor(plan, title, tasks) {
    const stopText = stops.map((item) => `${item.name}：${typeLabel(item.type)}，營業到 ${formatHour(item.openUntil)}，步行 ${item.walk} 分，排隊 ${item.line} 分，療癒 ${item.warmth}，拍照 ${item.photo}`).join("；");
    const taskText = tasks.map((task) => `${task.time} ${task.title} ${task.stop.name}`).join("；");
    return `請用 ChillOut 幫我把「深夜甜點雷達」結果排成今晚 ${fields.city.value} 的可執行路線。我住在 ${fields.hotel.value}，${fields.leave.value} 出發，${fields.returnBy.value} 前回到住宿，今晚想吃 ${typeLabel(fields.mood.value)}，步行上限 ${fields.walk.value} 分鐘，排隊忍耐 ${fields.line.value} 分鐘，${fields.rain.checked ? "可能下雨，要優先近站與室內" : "天氣正常，可以安排短散步"}。候選點是：${stopText}。工具結果是「${title}」，甜點適配 ${plan.score}/100，建議節奏：${taskText}。請幫我補交通方式、雨備、點餐提醒、拍照時間與回程方式。`;
  }

  function renderOutput() {
    if (!stops.length) {
      outputNode.innerHTML = `
        <div class="ld-empty">
          <p class="ld-kicker">Result</p>
          <h2>至少保留一個甜點候選點。</h2>
          <p>新增甜點點後，雷達才有資料可以計算。</p>
        </div>
      `;
      return;
    }
    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const tasks = taskCards(plan);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title, tasks);

    outputNode.innerHTML = `
      <div class="ld-result-head">
        <div>
          <p class="ld-kicker">T034 late night dessert</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這張卡不是推薦名單，而是今晚可以照著走的甜點任務。</p>
        </div>
        <div class="ld-score" aria-label="甜點適配分數">${plan.score}</div>
      </div>
      <div class="ld-result-grid">
        <div class="ld-radar">${radarSvg(plan)}</div>
        <div class="ld-plan">
          ${tasks.map((task) => `
            <article class="ld-task">
              <span>${escapeHtml(task.time)} · ${escapeHtml(task.title)}</span>
              <h3>${escapeHtml(task.stop.name)}</h3>
              <p>${escapeHtml(task.note)}</p>
              <ul>
                <li>營業到 ${escapeHtml(formatHour(task.stop.openUntil))}</li>
                <li>類型：${escapeHtml(typeLabel(task.stop.type))}</li>
              </ul>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="ld-copy-zone">
        <section class="ld-copy-box">
          <h3>點餐句子</h3>
          <p>${escapeHtml(orderLine(plan))}</p>
        </section>
        <section class="ld-copy-box">
          <h3>社群分享文</h3>
          <p>${escapeHtml(share)}</p>
        </section>
      </div>
      <section class="ld-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="ld-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ld-primary" data-app-link href="${appStore}?ct=tool_late_night_dessert_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateStop(id, key, value) {
    stops = stops.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addStop() {
    if (stops.length >= 9) {
      showToast("最多先比較 9 個甜點點");
      return;
    }
    stops.push(stop("新甜點點", fields.mood.value, 23.5, 68, 68, 12, 8));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "台南";
    fields.hotel.value = "中西區民宿";
    fields.leave.value = "20:50";
    fields.returnBy.value = "23:20";
    fields.mood.value = "warm";
    fields.walk.value = "16";
    fields.line.value = "10";
    fields.rain.checked = true;
    stops = [
      stop("神農街杏仁茶", "warm", 23.5, 94, 70, 9, 6),
      stop("巷口布丁店", "cream", 22.5, 78, 84, 6, 12),
      stop("赤崁水果冰", "fruit", 23, 72, 88, 14, 9),
      stop("民宿旁手作麵包", "bakery", 24, 68, 62, 4, 2)
    ];
    renderAll();
  }

  function updateMiniLabel(input) {
    const key = input.dataset.key;
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = key === "openUntil" ? "點" : key === "walk" || key === "line" ? "分" : "";
    strong.textContent = displayRangeValue(key, input.value, suffix);
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-stop]").addEventListener("click", addStop);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        updateGlobalLabels();
        renderOutput();
      });
      field.addEventListener("change", renderOutput);
    });

    stopListNode.addEventListener("input", (event) => {
      const stopNode = event.target.closest("[data-stop-id]");
      if (!stopNode || !event.target.dataset.key) return;
      updateStop(stopNode.dataset.stopId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    stopListNode.addEventListener("change", (event) => {
      const stopNode = event.target.closest("[data-stop-id]");
      if (!stopNode || !event.target.dataset.key) return;
      updateStop(stopNode.dataset.stopId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    stopListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const stopNode = button.closest("[data-stop-id]");
      stops = stops.filter((item) => item.id !== stopNode.dataset.stopId);
      renderAll();
    });
  }

  function renderAll() {
    updateGlobalLabels();
    renderStops();
    renderOutput();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
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
    toastNode.textContent = message;
    toastNode.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toastNode.classList.remove("is-visible"), 1600);
  }

  bindEvents();
  renderAll();
})();
