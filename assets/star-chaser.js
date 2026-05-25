(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const spotListNode = document.querySelector("[data-spots]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    start: document.querySelector("[data-start]"),
    returnBy: document.querySelector("[data-return]"),
    returnMode: document.querySelector("[data-return-mode]"),
    cloud: document.querySelector("[data-cloud]"),
    moon: document.querySelector("[data-moon]"),
    drive: document.querySelector("[data-drive]")
  };
  const labels = {
    cloud: document.querySelector("[data-cloud-label]"),
    moon: document.querySelector("[data-moon-label]"),
    drive: document.querySelector("[data-drive-label]")
  };

  let spots = [
    spot("海邊觀星平台", "coast", 38, 82, 76, 42),
    spot("山腰停車場", "mountain", 52, 92, 68, 58),
    spot("市郊夜景台", "cityview", 24, 58, 88, 24),
    spot("民宿屋頂備案", "backup", 4, 36, 94, 12)
  ];

  function spot(name, type, drive, darkness, safety, horizon) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      drive,
      darkness,
      safety,
      horizon
    };
  }

  function spotTypes() {
    return [
      { value: "coast", label: "海邊" },
      { value: "mountain", label: "山區" },
      { value: "cityview", label: "夜景台" },
      { value: "park", label: "公園" },
      { value: "backup", label: "住宿備案" }
    ];
  }

  function typeLabel(value) {
    const found = spotTypes().find((item) => item.value === value);
    return found ? found.label : "觀星點";
  }

  function renderSpots() {
    spotListNode.innerHTML = spots.map((item) => `
      <article class="sc-spot" data-spot-id="${escapeAttr(item.id)}">
        <label>
          觀星點
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="觀星點">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="觀星點類型">
            ${spotTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("drive", "車程", item.drive, 0, 120, "分")}
        ${rangeControl("darkness", "暗度", item.darkness, 1, 100, "")}
        ${rangeControl("safety", "安全", item.safety, 1, 100, "")}
        <button class="sc-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="sc-mini">${label}<strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreSpot(item) {
    const skyPenalty = Number(fields.cloud.value) * 0.34 + Number(fields.moon.value) * 0.23;
    const drivePenalty = Math.max(0, Number(item.drive) - Number(fields.drive.value)) * 0.65;
    const returnPenalty = fields.returnMode.value === "unknown" ? 18 : fields.returnMode.value === "taxi" ? 8 : 0;
    const typeBonus = item.type === "mountain" ? 8 : item.type === "coast" ? 6 : item.type === "backup" ? -5 : 0;
    return Math.max(1, Math.min(99, Math.round(32 + Number(item.darkness) * 0.42 + Number(item.safety) * 0.28 + Number(item.horizon) * 0.16 + typeBonus - skyPenalty - drivePenalty - returnPenalty)));
  }

  function rankedSpots() {
    return spots.map((item) => ({ ...item, score: scoreSpot(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const ranked = rankedSpots();
    const primary = ranked[0];
    const fallback = ranked.find((item) => item.id !== primary.id && Number(item.drive) <= 20) || ranked[1] || primary;
    const cityPlan = ranked.find((item) => item.type === "cityview" || item.type === "backup") || fallback;
    const score = Math.max(1, Math.min(99, Math.round(primary.score * 0.72 + fallback.score * 0.18 + transportBonus() - weatherDrag())));
    return { primary, fallback, cityPlan, score };
  }

  function transportBonus() {
    if (fields.returnMode.value === "car" || fields.returnMode.value === "tour") return 8;
    if (fields.returnMode.value === "taxi") return -2;
    return -12;
  }

  function weatherDrag() {
    return Number(fields.cloud.value) > 70 ? 14 : Number(fields.cloud.value) > 50 ? 8 : 0;
  }

  function profile(score) {
    if (score >= 76) return ["值得追星", "天空條件與候選點夠好，可以出城，但仍要設定回程時間。"];
    if (score >= 52) return ["改成夜景加備案", "今晚不是完全沒機會，但不要賭太遠；選近一點的點，保留市區備案。"];
    return ["留市區比較聰明", "雲量、月光、交通或安全條件不夠漂亮，今晚把浪漫留給夜景或室內。"];
  }

  function toMinutes(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }

  function addMinutes(time, minutes) {
    const total = (toMinutes(time) + minutes + 24 * 60) % (24 * 60);
    const nextHour = Math.floor(total / 60) % 24;
    const nextMinute = total % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function orbitSvg(plan) {
    const values = [
      { label: "暗度", value: plan.primary.darkness, angle: -90 },
      { label: "安全", value: plan.primary.safety, angle: -18 },
      { label: "視野", value: plan.primary.horizon, angle: 54 },
      { label: "雲少", value: 100 - Number(fields.cloud.value), angle: 126 },
      { label: "月暗", value: 100 - Number(fields.moon.value), angle: 198 }
    ];
    const pointString = values.map((item) => polar(150, 150, item.angle, item.value)).join(" ");
    return `
      <svg viewBox="0 0 300 300" role="img" aria-label="追星可行度雷達">
        <rect x="1" y="1" width="298" height="298" rx="16" fill="#fffef9" stroke="#deddd1"></rect>
        <circle cx="150" cy="150" r="44" fill="none" stroke="#deddd1"></circle>
        <circle cx="150" cy="150" r="76" fill="none" stroke="#deddd1"></circle>
        <circle cx="150" cy="150" r="108" fill="none" stroke="#deddd1"></circle>
        ${values.map((item) => {
          const line = polar(150, 150, item.angle, 116).split(",");
          const label = polar(150, 150, item.angle, 132).split(",");
          return `<line x1="150" y1="150" x2="${line[0]}" y2="${line[1]}" stroke="#deddd1"></line><text x="${label[0]}" y="${label[1]}" text-anchor="middle" font-size="11" fill="#6b6a5d">${item.label}</text>`;
        }).join("")}
        <polygon points="${pointString}" fill="rgba(98, 96, 74, 0.16)" stroke="#62604a" stroke-width="3"></polygon>
        <text x="150" y="156" text-anchor="middle" font-size="42" font-weight="900" fill="#62604a">${plan.score}</text>
        <text x="150" y="178" text-anchor="middle" font-size="12" fill="#6b6a5d">star chance</text>
      </svg>
    `;
  }

  function polar(cx, cy, angle, value) {
    const distance = Math.max(8, Math.min(108, value * 1.08));
    const radian = angle * Math.PI / 180;
    const x = Math.round((cx + Math.cos(radian) * distance) * 10) / 10;
    const y = Math.round((cy + Math.sin(radian) * distance) * 10) / 10;
    return `${x},${y}`;
  }

  function planSteps(plan) {
    return [
      {
        time: fields.start.value,
        title: "先看天空",
        spot: plan.primary,
        body: `雲量 ${fields.cloud.value}/100、月亮 ${fields.moon.value}/100。先用肉眼確認 10 分鐘，不對就切備案。`
      },
      {
        time: addMinutes(fields.start.value, Number(plan.primary.drive)),
        title: "追星主點",
        spot: plan.primary,
        body: `${plan.primary.name} 暗度 ${plan.primary.darkness}，安全 ${plan.primary.safety}，適合當今晚主點。`
      },
      {
        time: addMinutes(fields.returnBy.value, -35),
        title: "回程或備案",
        spot: plan.fallback,
        body: `如果雲進來或太累，改去 ${plan.fallback.name}，不要硬等銀河。`
      }
    ];
  }

  function ruleText(plan) {
    const rules = [];
    if (Number(fields.cloud.value) > 55) rules.push("雲量偏高，現場 10 分鐘看不到星就改夜景。");
    if (Number(fields.moon.value) > 55) rules.push("月亮太亮，不追銀河，改拍月光輪廓。");
    if (fields.returnMode.value === "unknown") rules.push("回程未確定，不離開住宿 20 分鐘車程以外。");
    if (Number(plan.primary.drive) > Number(fields.drive.value)) rules.push("主點超過移動上限，除非有包車，不要硬衝。");
    if (!rules.length) rules.push("只要雲層變厚或同行者疲累，立即改備案。");
    return rules.join(" ");
  }

  function shareCopy(plan, title) {
    return `我用 ChillOut 星空追逐卡判斷：${fields.city.value} 今晚是「${title}」${plan.score}/100。主點 ${plan.primary.name}，備案 ${plan.fallback.name}，規則：${ruleText(plan)}`;
  }

  function promptFor(plan, title, steps) {
    const spotsText = spots.map((item) => `${item.name}：${typeLabel(item.type)}，車程 ${item.drive} 分，暗度 ${item.darkness}，安全 ${item.safety}，視野 ${item.horizon}`).join("；");
    const stepsText = steps.map((step) => `${step.time} ${step.title} ${step.spot.name}`).join("；");
    return `請用 ChillOut 幫我把「星空追逐卡」排成今晚從 ${fields.city.value} 出發的夜間行程。我 ${fields.start.value} 可以出發，${fields.returnBy.value} 前要回到住宿，回程方式是 ${returnModeLabel(fields.returnMode.value)}，雲量 ${fields.cloud.value}/100，月亮亮度 ${fields.moon.value}/100，最多移動 ${fields.drive.value} 分鐘。候選觀星點：${spotsText}。工具結果是「${title}」，追星可行度 ${plan.score}/100，建議節奏：${stepsText}。請補交通、停留時間、拍照角度、雲量備案、回程安全提醒與如果看不到星星的替代夜景行程。`;
  }

  function returnModeLabel(value) {
    if (value === "car") return "自駕 / 包車";
    if (value === "taxi") return "叫車";
    if (value === "tour") return "當地行程接送";
    return "尚未確定";
  }

  function renderOutput() {
    if (!spots.length) {
      outputNode.innerHTML = `
        <div class="sc-empty">
          <p class="sc-kicker">Result</p>
          <h2>至少保留一個候選觀星點。</h2>
          <p>追星要有主點，也要有備案。</p>
        </div>
      `;
      return;
    }

    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const steps = planSteps(plan);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title, steps);

    outputNode.innerHTML = `
      <div class="sc-result-head">
        <div>
          <p class="sc-kicker">T038 star chaser</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這張卡的目的不是硬追，而是幫你在浪漫和現實之間做決策。</p>
        </div>
        <div class="sc-score" aria-label="追星可行度">${plan.score}</div>
      </div>
      <div class="sc-route-grid">
        <div class="sc-orbit">${orbitSvg(plan)}</div>
        <div class="sc-plan">
          ${steps.map((step) => `
            <article class="sc-step">
              <span>${escapeHtml(step.time)} · ${escapeHtml(step.title)}</span>
              <h3>${escapeHtml(step.spot.name)}</h3>
              <p>${escapeHtml(step.body)}</p>
              <ul>
                <li>類型：${escapeHtml(typeLabel(step.spot.type))}</li>
                <li>車程 ${step.spot.drive} 分 / 安全 ${step.spot.safety}</li>
              </ul>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="sc-copy-grid">
        <section class="sc-copy-box">
          <h3>今晚規則</h3>
          <p>${escapeHtml(ruleText(plan))}</p>
        </section>
        <section class="sc-copy-box">
          <h3>社群分享文</h3>
          <p>${escapeHtml(share)}</p>
        </section>
      </div>
      <section class="sc-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="sc-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="sc-primary" data-app-link href="${appStore}?ct=tool_star_chaser_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateSpot(id, key, value) {
    spots = spots.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addSpot() {
    if (spots.length >= 9) {
      showToast("最多先比較 9 個觀星點");
      return;
    }
    spots.push(spot("新觀星點", "park", 30, 60, 70, 55));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "花蓮市區";
    fields.start.value = "21:00";
    fields.returnBy.value = "00:00";
    fields.returnMode.value = "car";
    fields.cloud.value = "22";
    fields.moon.value = "18";
    fields.drive.value = "55";
    spots = [
      spot("七星潭海邊", "coast", 18, 72, 84, 78),
      spot("遠雄夜景停車點", "cityview", 24, 58, 90, 62),
      spot("山邊觀景平台", "mountain", 48, 88, 70, 82),
      spot("民宿屋頂", "backup", 2, 34, 96, 28)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.cloud.textContent = `${fields.cloud.value}/100`;
    labels.moon.textContent = `${fields.moon.value}/100`;
    labels.drive.textContent = `${fields.drive.value} 分鐘`;
  }

  function updateMiniLabel(input) {
    const key = input.dataset.key;
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    strong.textContent = key === "drive" ? `${input.value}分` : input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-spot]").addEventListener("click", addSpot);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        updateLabels();
        renderOutput();
      });
      field.addEventListener("change", renderOutput);
    });

    spotListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-spot-id]");
      if (!row || !event.target.dataset.key) return;
      updateSpot(row.dataset.spotId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    spotListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-spot-id]");
      if (!row || !event.target.dataset.key) return;
      updateSpot(row.dataset.spotId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    spotListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-spot-id]");
      spots = spots.filter((item) => item.id !== row.dataset.spotId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderSpots();
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
