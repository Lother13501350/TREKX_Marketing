(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const dupeListNode = document.querySelector("[data-dupes]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    target: document.querySelector("[data-target]"),
    vibe: document.querySelector("[data-vibe]"),
    crowd: document.querySelector("[data-crowd]"),
    effort: document.querySelector("[data-effort]"),
    photo: document.querySelector("[data-photo]")
  };
  const labels = {
    crowd: document.querySelector("[data-crowd-label]"),
    effort: document.querySelector("[data-effort-label]"),
    photo: document.querySelector("[data-photo-label]")
  };

  let dupes = [
    dupe("二年坂後段小路", "oldstreet", 18, 72, 42, 82),
    dupe("高台寺外圍", "view", 24, 64, 48, 88),
    dupe("住宅區甜點店", "food", 16, 82, 28, 56),
    dupe("鴨川旁慢走", "slow", 20, 76, 12, 70)
  ];

  function dupe(name, vibe, minutes, quiet, cost, photo) {
    return { id: crypto.randomUUID(), name, vibe, minutes, quiet, cost, photo };
  }

  function vibes() {
    return [
      { value: "oldstreet", label: "老街文化" },
      { value: "view", label: "景觀拍照" },
      { value: "food", label: "美食密度" },
      { value: "slow", label: "慢逛安靜" },
      { value: "shopping", label: "逛店選物" }
    ];
  }

  function vibeLabel(value) {
    const found = vibes().find((item) => item.value === value);
    return found ? found.label : "氛圍";
  }

  function renderDupes() {
    dupeListNode.innerHTML = dupes.map((item) => `
      <article class="dd-dupe" data-dupe-id="${escapeAttr(item.id)}">
        <label>
          替代點
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="替代點">
        </label>
        <label>
          氛圍
          <select data-key="vibe" aria-label="替代點氛圍">
            ${vibes().map((vibe) => `<option value="${vibe.value}"${vibe.value === item.vibe ? " selected" : ""}>${vibe.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("minutes", "繞路", item.minutes, 0, 90, "分")}
        ${rangeControl("quiet", "少人", item.quiet, 1, 100, "")}
        ${rangeControl("photo", "拍照", item.photo, 1, 100, "")}
        <button class="dd-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `<label><span class="dd-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}"></label>`;
  }

  function scoreDupe(item) {
    const vibeBonus = item.vibe === fields.vibe.value ? 22 : 5;
    const crowdNeed = 100 - Number(fields.crowd.value);
    const effortPenalty = Math.max(0, Number(item.minutes) - Number(fields.effort.value) * 0.7) * 0.75;
    const photoBonus = Math.min(Number(item.photo), Number(fields.photo.value)) * 0.18;
    return Math.max(1, Math.min(99, Math.round(28 + vibeBonus + Number(item.quiet) * 0.34 + photoBonus - effortPenalty)));
  }

  function rankedDupes() {
    return dupes.map((item) => ({ ...item, score: scoreDupe(item) })).sort((a, b) => b.score - a.score);
  }

  function originalScore() {
    const crowdPenalty = Math.max(0, 80 - Number(fields.crowd.value)) * 0.55;
    const photoScore = Number(fields.photo.value) * 0.24;
    return Math.max(1, Math.min(99, Math.round(58 + photoScore - crowdPenalty)));
  }

  function buildDecision() {
    const ranked = rankedDupes();
    const best = ranked[0];
    const second = ranked[1] || best;
    const original = originalScore();
    const gap = best.score - original;
    const action = gap >= 10 ? "change" : original >= 72 ? "go" : best.score >= 55 ? "change" : "skip";
    const score = Math.max(1, Math.min(99, Math.round(Math.max(original, best.score))));
    return { best, second, original, action, score };
  }

  function actionTitle(action) {
    if (action === "go") return "原景點可去";
    if (action === "change") return "改去替代點";
    return "跳過這一帶";
  }

  function actionDescription(decision) {
    if (decision.action === "go") return `${fields.target.value} 仍然符合期待，替代點只當人潮爆掉時的備案。`;
    if (decision.action === "change") return `${decision.best.name} 保留了 ${vibeLabel(fields.vibe.value)}，但少掉更多人潮和等待。`;
    return "原景點與替代點都不夠划算，先把時間留給下一段行程。";
  }

  function reasonText(decision) {
    return `原景點分數 ${decision.original}/100，最佳 dupe ${decision.best.name} 是 ${decision.best.score}/100。你真正要的是「${vibeLabel(fields.vibe.value)}」，不是排隊本身。`;
  }

  function shareCopy(decision) {
    return `我用 ChillOut 替代目的地選擇器判斷：${fields.target.value} 這次建議「${actionTitle(decision.action)}」${decision.score}/100。最佳替代是 ${decision.best.name}，理由：${reasonText(decision)}`;
  }

  function promptFor(decision) {
    const dupeText = dupes.map((item) => `${item.name}：${vibeLabel(item.vibe)}，繞路 ${item.minutes} 分，少人 ${item.quiet}，費用 ${item.cost}，拍照 ${item.photo}`).join("；");
    return `請用 ChillOut 幫我把「替代目的地選擇器」結果排成行程。我原本想去 ${fields.target.value}，最想保留的氛圍是 ${vibeLabel(fields.vibe.value)}，可忍受人潮 ${fields.crowd.value}/100，願意繞路 ${fields.effort.value}/100，拍照期待 ${fields.photo.value}/100。候選替代點：${dupeText}。工具判斷是「${actionTitle(decision.action)}」，總分 ${decision.score}/100，最佳替代 ${decision.best.name}，第二選 ${decision.second.name}。請幫我排一條保留同氛圍、避開人潮、包含交通與拍照點的替代路線。`;
  }

  function renderOutput() {
    if (!dupes.length) {
      outputNode.innerHTML = `<div class="dd-empty"><p class="dd-kicker">Result</p><h2>至少保留一個替代點。</h2><p>沒有替代就無法比較。</p></div>`;
      return;
    }
    const decision = buildDecision();
    const share = shareCopy(decision);
    const prompt = promptFor(decision);

    outputNode.innerHTML = `
      <div class="dd-result-head">
        <div><p class="dd-kicker">T042 destination dupe</p><h2>${escapeHtml(actionTitle(decision.action))}</h2><p>${escapeHtml(actionDescription(decision))} ${escapeHtml(reasonText(decision))}</p></div>
        <div class="dd-score" aria-label="目的地決策分數">${decision.score}</div>
      </div>
      <div class="dd-table">
        <article class="dd-cell"><span>ORIGINAL</span><h3>${escapeHtml(fields.target.value)}</h3><p>保留原本想像，但需要承擔人潮、排隊和拍照卡位。</p><ul><li>原景點分數 ${decision.original}</li><li>期待氛圍：${escapeHtml(vibeLabel(fields.vibe.value))}</li></ul></article>
        <article class="dd-cell"><span>BEST DUPE</span><h3>${escapeHtml(decision.best.name)}</h3><p>最接近期待，但壓力更低。</p><ul><li>少人 ${decision.best.quiet}</li><li>繞路 ${decision.best.minutes} 分 / 拍照 ${decision.best.photo}</li></ul></article>
        <article class="dd-cell"><span>SECOND PICK</span><h3>${escapeHtml(decision.second.name)}</h3><p>如果第一替代也滿，直接切這個。</p><ul><li>分數 ${decision.second.score}</li><li>氛圍：${escapeHtml(vibeLabel(decision.second.vibe))}</li></ul></article>
      </div>
      <div class="dd-copy-grid">
        <section class="dd-copy-box"><h3>比較理由</h3><p>${escapeHtml(reasonText(decision))}</p></section>
        <section class="dd-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="dd-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="dd-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="dd-primary" data-app-link href="${appStore}?ct=tool_dupe_destination_manual_${decision.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateDupe(id, key, value) {
    dupes = dupes.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "vibe") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addDupe() {
    if (dupes.length >= 9) {
      showToast("最多先比較 9 個替代點");
      return;
    }
    dupes.push(dupe("新替代點", fields.vibe.value, 20, 70, 0, 60));
    renderAll();
  }

  function loadSample() {
    fields.target.value = "九份老街";
    fields.vibe.value = "oldstreet";
    fields.crowd.value = "28";
    fields.effort.value = "62";
    fields.photo.value = "76";
    dupes = [
      dupe("金瓜石山城", "oldstreet", 22, 78, 0, 74),
      dupe("祈堂老街", "oldstreet", 18, 82, 0, 68),
      dupe("水湳洞海景", "view", 26, 86, 0, 82),
      dupe("瑞芳咖啡小店", "slow", 15, 76, 160, 52)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.crowd.textContent = `${fields.crowd.value}/100`;
    labels.effort.textContent = `${fields.effort.value}/100`;
    labels.photo.textContent = `${fields.photo.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    strong.textContent = input.dataset.key === "minutes" ? `${input.value}分` : input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-dupe]").addEventListener("click", addDupe);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    dupeListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-dupe-id]");
      if (!row || !event.target.dataset.key) return;
      updateDupe(row.dataset.dupeId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    dupeListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-dupe-id]");
      if (!row || !event.target.dataset.key) return;
      updateDupe(row.dataset.dupeId, event.target.dataset.key, event.target.value);
      renderOutput();
    });
    dupeListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-dupe-id]");
      dupes = dupes.filter((item) => item.id !== row.dataset.dupeId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderDupes();
    renderOutput();
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
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
