(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const missionListNode = document.querySelector("[data-missions]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    format: document.querySelector("[data-format]"),
    subject: document.querySelector("[data-subject]"),
    title: document.querySelector("[data-title]"),
    emotion: document.querySelector("[data-emotion]"),
    safety: document.querySelector("[data-safety]")
  };
  const labels = {
    emotion: document.querySelector("[data-emotion-label]"),
    safety: document.querySelector("[data-safety-label]")
  };

  let missions = [
    mission("招牌字光", "sign", 72, 82, 38),
    mission("地面倒影", "reflection", 86, 64, 46),
    mission("路口等待", "crossing", 68, 74, 54),
    mission("人物剪影", "portrait", 78, 58, 62),
    mission("收尾細節", "detail", 56, 88, 28)
  ];

  function mission(name, type, neon, safety, difficulty) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      neon,
      safety,
      difficulty
    };
  }

  function shotTypes() {
    return [
      { value: "sign", label: "招牌" },
      { value: "reflection", label: "倒影" },
      { value: "crossing", label: "路口" },
      { value: "portrait", label: "人物" },
      { value: "detail", label: "細節" },
      { value: "food", label: "宵夜" }
    ];
  }

  function typeLabel(value) {
    const found = shotTypes().find((item) => item.value === value);
    return found ? found.label : "照片";
  }

  function renderMissions() {
    missionListNode.innerHTML = missions.map((item) => `
      <article class="np-mission" data-mission-id="${escapeAttr(item.id)}">
        <label>
          任務名稱
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="任務名稱">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="任務類型">
            ${shotTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("neon", "光感", item.neon)}
        ${rangeControl("safety", "安全", item.safety)}
        ${rangeControl("difficulty", "難度", item.difficulty)}
        <button class="np-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value) {
    return `
      <label>
        <span class="np-mini">${label}<strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="1" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function scoreMission(item) {
    const emotion = Number(fields.emotion.value);
    const safetyNeed = Number(fields.safety.value);
    const subjectBonus = subjectBonusFor(item.type);
    const formatBonus = formatBonusFor(item.type);
    const neonScore = Number(item.neon) * 0.35;
    const safetyScore = Number(item.safety) * (safetyNeed > 70 ? 0.34 : 0.22);
    const difficultyPenalty = Number(item.difficulty) * (safetyNeed > 70 ? 0.30 : 0.18);
    const emotionBoost = item.type === "portrait" || item.type === "reflection" ? emotion * 0.10 : emotion * 0.05;
    return Math.max(1, Math.min(99, Math.round(38 + neonScore + safetyScore + subjectBonus + formatBonus + emotionBoost - difficultyPenalty)));
  }

  function subjectBonusFor(type) {
    if (fields.subject.value === "street" && type !== "portrait") return 10;
    if (fields.subject.value === "solo" && (type === "portrait" || type === "reflection")) return 10;
    if (fields.subject.value === "couple" && (type === "portrait" || type === "crossing")) return 9;
    if (fields.subject.value === "friends" && (type === "crossing" || type === "food")) return 9;
    return 0;
  }

  function formatBonusFor(type) {
    if (fields.format.value === "story" && (type === "detail" || type === "food")) return 7;
    if (fields.format.value === "post" && (type === "sign" || type === "reflection")) return 8;
    if (fields.format.value === "reel" && (type === "crossing" || type === "portrait")) return 8;
    if (fields.format.value === "memoir") return 4;
    return 0;
  }

  function rankedMissions() {
    return missions.map((item) => ({ ...item, score: scoreMission(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const ranked = rankedMissions();
    const selected = [];
    preferredOrder().forEach((type) => {
      const found = ranked.find((item) => item.type === type && !selected.some((picked) => picked.id === item.id));
      if (found) selected.push(found);
    });
    ranked.forEach((item) => {
      if (selected.length < 5 && !selected.some((picked) => picked.id === item.id)) selected.push(item);
    });
    const shots = selected.slice(0, 5);
    const score = Math.round(shots.reduce((sum, item) => sum + item.score, 0) / Math.max(1, shots.length));
    return { shots, score };
  }

  function preferredOrder() {
    if (fields.format.value === "reel") return ["sign", "crossing", "portrait", "reflection", "detail"];
    if (fields.format.value === "story") return ["sign", "detail", "food", "portrait", "reflection"];
    if (fields.subject.value === "street") return ["sign", "reflection", "crossing", "detail", "food"];
    return ["sign", "reflection", "portrait", "crossing", "detail"];
  }

  function profile(score) {
    if (score >= 80) return ["這組可以直接拍", "任務順序完整，光感、安全與難度平衡，適合照著拍完一組夜晚照片。"];
    if (score >= 60) return ["先拍主線，放掉高難度", "有幾張會很漂亮，但不要為了構圖走進人少區域或停太久。"];
    return ["改成短任務", "目前難度或安全壓力偏高，建議只拍招牌、主路與近站細節。"];
  }

  function shotNote(item) {
    if (item.type === "sign") return "站遠一點，讓招牌和街道一起入鏡，不要只拍字。";
    if (item.type === "reflection") return "找玻璃、地面水光或車窗，讓城市變成第二層畫面。";
    if (item.type === "crossing") return "等人群自然通過，拍出方向感；不要站到車道。";
    if (item.type === "portrait") return fields.subject.value === "street" ? "人物不用入鏡，改拍路人的影子或背影。" : "人物站在光源邊緣，臉不要被霓虹直接打爆。";
    if (item.type === "food") return "把宵夜拿到有光的桌邊，拍手、包裝和街景，而不只拍食物。";
    return "拍票根、路牌、手上的飲料或鞋尖，讓回憶有收尾。";
  }

  function frameTitle(item, index) {
    const labels = ["開場", "轉場", "主角", "城市", "收尾"];
    return `${labels[index] || "補拍"} · ${item.name}`;
  }

  function storyCaption(plan, title) {
    const format = formatLabel(fields.format.value);
    return `我用 ChillOut 霓虹拍照任務排了一組 ${fields.city.value} 夜拍：${title}，分享格式是 ${format}，完成度 ${plan.score}/100。順序：${plan.shots.map((item) => item.name).join(" → ")}。`;
  }

  function formatLabel(value) {
    if (value === "story") return "限動九宮格";
    if (value === "post") return "IG 貼文";
    if (value === "reel") return "短影音封面";
    return "旅行回憶錄";
  }

  function promptFor(plan, title) {
    const missionText = missions.map((item) => `${item.name}：${typeLabel(item.type)}，光感 ${item.neon}，安全 ${item.safety}，難度 ${item.difficulty}`).join("；");
    const shotText = plan.shots.map((item, index) => `${index + 1}. ${frameTitle(item, index)}：${shotNote(item)}`).join("；");
    return `請用 ChillOut 幫我把「霓虹拍照任務」變成 ${fields.city.value} 的夜間拍照路線與回憶錄素材。我想做的格式是 ${formatLabel(fields.format.value)}，拍攝對象是 ${subjectLabel(fields.subject.value)}，照片標題感是「${fields.title.value}」，情緒濃度 ${fields.emotion.value}/100，安全保守 ${fields.safety.value}/100。候選任務：${missionText}。工具結果是「${title}」，完成度 ${plan.score}/100，建議拍攝順序：${shotText}。請幫我補每張照片的位置類型、構圖、站位、安全提醒、限動標題與回憶錄段落。`;
  }

  function subjectLabel(value) {
    if (value === "solo") return "自己一人";
    if (value === "couple") return "兩人同行";
    if (value === "friends") return "朋友群";
    return "只拍街景";
  }

  function renderOutput() {
    if (!missions.length) {
      outputNode.innerHTML = `
        <div class="np-empty">
          <p class="np-kicker">Result</p>
          <h2>至少保留一個拍照任務。</h2>
          <p>新增任務後，這裡會產生照片順序與文案。</p>
        </div>
      `;
      return;
    }

    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const share = storyCaption(plan, title);
    const prompt = promptFor(plan, title);

    outputNode.innerHTML = `
      <div class="np-result-head">
        <div>
          <p class="np-kicker">T037 neon photo mission</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 主題句：「${escapeHtml(fields.title.value)}」。</p>
        </div>
        <div class="np-score" aria-label="拍照任務完成度">${plan.score}</div>
      </div>
      <div class="np-contact-sheet">
        ${plan.shots.map((shot, index) => `
          <article class="np-frame">
            <span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(typeLabel(shot.type))}</span>
            <h3>${escapeHtml(frameTitle(shot, index))}</h3>
            <p>${escapeHtml(shotNote(shot))}</p>
            <ul>
              <li>光感 ${shot.neon}</li>
              <li>安全 ${shot.safety} / 難度 ${shot.difficulty}</li>
            </ul>
          </article>
        `).join("")}
      </div>
      <div class="np-copy-grid">
        <section class="np-copy-box">
          <h3>限動標題</h3>
          <p>${escapeHtml(fields.title.value)}。${escapeHtml(title)}，先拍光，再拍人，最後拍細節。</p>
        </section>
        <section class="np-copy-box">
          <h3>社群分享文</h3>
          <p>${escapeHtml(share)}</p>
        </section>
      </div>
      <section class="np-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="np-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="np-primary" data-app-link href="${appStore}?ct=tool_neon_photo_mission_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateMission(id, key, value) {
    missions = missions.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addMission() {
    if (missions.length >= 9) {
      showToast("最多先放 9 個拍照任務");
      return;
    }
    missions.push(mission("新霓虹任務", "detail", 60, 70, 40));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "台北西門町";
    fields.format.value = "story";
    fields.subject.value = "friends";
    fields.title.value = "今晚每一格都像電影截圖";
    fields.emotion.value = "80";
    fields.safety.value = "74";
    missions = [
      mission("紅樓招牌開場", "sign", 78, 86, 32),
      mission("雨後地面倒影", "reflection", 90, 72, 48),
      mission("朋友等紅燈", "crossing", 76, 78, 42),
      mission("手上的宵夜袋", "food", 64, 88, 26),
      mission("捷運出口收尾", "detail", 58, 92, 24)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.emotion.textContent = `${fields.emotion.value}/100`;
    labels.safety.textContent = `${fields.safety.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (strong) strong.textContent = input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-shot]").addEventListener("click", addMission);
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

    missionListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-mission-id]");
      if (!row || !event.target.dataset.key) return;
      updateMission(row.dataset.missionId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    missionListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-mission-id]");
      if (!row || !event.target.dataset.key) return;
      updateMission(row.dataset.missionId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    missionListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-mission-id]");
      missions = missions.filter((item) => item.id !== row.dataset.missionId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderMissions();
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
