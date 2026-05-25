(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const checkListNode = document.querySelector("[data-checks]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const cautionLabel = document.querySelector("[data-caution-label]");
  const fields = {
    city: document.querySelector("[data-city]"),
    zone: document.querySelector("[data-zone]"),
    start: document.querySelector("[data-start]"),
    returnBy: document.querySelector("[data-return]"),
    group: document.querySelector("[data-group]"),
    transport: document.querySelector("[data-transport]"),
    caution: document.querySelector("[data-caution]")
  };

  let checks = [
    check("回程方式已確認", "return", 94, true),
    check("手機電量超過 45%", "battery", 78, true),
    check("住宿地址已離線保存", "address", 88, true),
    check("同行者集合點說好", "group", 72, true),
    check("只走明亮主路線", "route", 86, true),
    check("保留現金或備用卡", "money", 64, false)
  ];

  function check(label, category, weight, done) {
    return {
      id: crypto.randomUUID(),
      label,
      category,
      weight,
      done
    };
  }

  function categories() {
    return [
      { value: "return", label: "回程" },
      { value: "battery", label: "電量" },
      { value: "address", label: "住宿" },
      { value: "group", label: "同行" },
      { value: "route", label: "路線" },
      { value: "money", label: "金錢" },
      { value: "weather", label: "天氣" }
    ];
  }

  function categoryLabel(value) {
    const found = categories().find((item) => item.value === value);
    return found ? found.label : "安全";
  }

  function renderChecks() {
    checkListNode.innerHTML = checks.map((item) => `
      <article class="ns-check-row" data-check-id="${escapeAttr(item.id)}">
        <input data-key="done" type="checkbox" ${item.done ? "checked" : ""} aria-label="${escapeAttr(item.label)} 是否完成">
        <label>
          檢核項目
          <input data-key="label" value="${escapeAttr(item.label)}" aria-label="檢核項目">
        </label>
        <label>
          類別
          <select data-key="category" aria-label="檢核類別">
            ${categories().map((category) => `<option value="${category.value}"${category.value === item.category ? " selected" : ""}>${category.label}</option>`).join("")}
          </select>
        </label>
        <label>
          <span class="ns-mini">重要度<strong>${item.weight}</strong></span>
          <input data-key="weight" type="range" min="10" max="100" value="${item.weight}" aria-label="重要度">
        </label>
        <button class="ns-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.label)}">×</button>
      </article>
    `).join("");
  }

  function scorePass() {
    const total = checks.reduce((sum, item) => sum + Number(item.weight), 0) || 1;
    const checked = checks.reduce((sum, item) => sum + (item.done ? Number(item.weight) : 0), 0);
    const completion = checked / total * 100;
    const groupBonus = Number(fields.group.value) >= 2 ? 8 : -5;
    const transportScore = transportBonus(fields.transport.value);
    const latePenalty = minutesBetween(fields.start.value, fields.returnBy.value) > 240 ? 8 : 0;
    const cautionBoost = Number(fields.caution.value) > 70 ? 5 : 0;
    return Math.max(1, Math.min(99, Math.round(completion * 0.72 + groupBonus + transportScore + cautionBoost - latePenalty + 18)));
  }

  function transportBonus(value) {
    if (value === "taxi") return 10;
    if (value === "metro") return 4;
    if (value === "walk") return -2;
    return -16;
  }

  function toMinutes(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }

  function minutesBetween(start, end) {
    let diff = toMinutes(end) - toMinutes(start);
    if (diff < 0) diff += 24 * 60;
    return diff;
  }

  function addMinutes(time, minutes) {
    const total = toMinutes(time) + minutes;
    const nextHour = Math.floor(total / 60) % 24;
    const nextMinute = total % 60;
    return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
  }

  function profile(score) {
    if (score >= 82) return ["可通行", "今晚條件完整，可以夜遊，但只在設定好的區域內移動。"];
    if (score >= 62) return ["限制通行", "可以出門，但需要縮短範圍，避免臨時改點和人少小路。"];
    return ["暫停夜遊", "回程或基礎安全還不夠明確，建議改成室內、近住宿或直接休息。"];
  }

  function missingChecks() {
    return checks.filter((item) => !item.done).sort((a, b) => b.weight - a.weight);
  }

  function zoneCards(score) {
    const missing = missingChecks();
    const hardLimit = score < 62 || fields.transport.value === "unknown";
    return [
      {
        title: "可活動區域",
        tag: "GO",
        body: hardLimit ? "只保留住宿附近或大型室內點。" : `${fields.zone.value} 的主街、商場、河岸主路與人多交通節點。`,
        bullets: [`${fields.start.value} 出門`, `${fields.returnBy.value} 前回程`]
      },
      {
        title: "不要去區域",
        tag: "NO-GO",
        body: missing.length ? `先避開和「${missing[0].label}」相關的風險情境。` : "避開臨時聽說的小巷、無照交通、需要現場議價的移動方式。",
        bullets: ["不為拍照鑽小路", "不追最後一班不確定的車"]
      },
      {
        title: "回程規則",
        tag: "RETURN",
        body: returnRule(),
        bullets: [`同行人數：${fields.group.value}`, `回程方式：${transportLabel(fields.transport.value)}`]
      }
    ];
  }

  function returnRule() {
    if (fields.transport.value === "taxi") return "先把住宿地址與叫車 App 準備好，離開前 20 分鐘就叫車或確認車資。";
    if (fields.transport.value === "metro") return "用末班車往前推 30 分鐘做回程線，不把末班車當保底。";
    if (fields.transport.value === "walk") return "只走明亮主路線，任何人少捷徑都視為不可用。";
    return "回程未確定前，不要離開住宿附近一公里。";
  }

  function transportLabel(value) {
    if (value === "taxi") return "計程車 / 叫車";
    if (value === "metro") return "大眾運輸";
    if (value === "walk") return "步行回住宿";
    return "尚未確定";
  }

  function passId(score) {
    const city = (fields.city.value || "CITY").replace(/\s+/g, "").slice(0, 3).toUpperCase();
    return `${city}-${score}-${checks.filter((item) => item.done).length}${checks.length}`;
  }

  function announcement(score, title) {
    return `今晚夜遊安全通行證：${fields.city.value}「${title}」${score}/100。活動區域限 ${fields.zone.value}，${fields.returnBy.value} 前回程。回程方式：${transportLabel(fields.transport.value)}。未完成檢核：${missingChecks().map((item) => item.label).join("、") || "無"}。`;
  }

  function promptFor(score, title, zones) {
    const checkText = checks.map((item) => `${item.done ? "已完成" : "未完成"}：${item.label}（${categoryLabel(item.category)}，重要度 ${item.weight}）`).join("；");
    const zoneText = zones.map((zone) => `${zone.tag} ${zone.title}：${zone.body}`).join("；");
    return `請用 ChillOut 幫我把「夜遊安全通行證」轉成今晚 ${fields.city.value} 的安全夜遊路線。我想去的區域是 ${fields.zone.value}，${fields.start.value} 出門，${fields.returnBy.value} 前回程，同行 ${fields.group.value} 人，回程方式是 ${transportLabel(fields.transport.value)}，保守程度 ${fields.caution.value}/100。安全檢核：${checkText}。工具結果是「${title}」，安全分數 ${score}/100，通行證邊界：${zoneText}。請幫我排一條只走明亮主路線、包含回程備案、不要去區域、集合點、雨備與緊急訊息模板的路線。`;
  }

  function renderOutput() {
    if (!checks.length) {
      outputNode.innerHTML = `
        <div class="ns-empty">
          <p class="ns-kicker">Result</p>
          <h2>至少保留一個安全檢核。</h2>
          <p>夜遊要先有底線，才能生成通行證。</p>
        </div>
      `;
      return;
    }

    const score = scorePass();
    const [title, description] = profile(score);
    const zones = zoneCards(score);
    const share = announcement(score, title);
    const prompt = promptFor(score, title, zones);

    outputNode.innerHTML = `
      <div class="ns-pass">
        <div class="ns-pass-copy">
          <p class="ns-kicker">T036 night safety pass · ${escapeHtml(passId(score))}</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這張通行證的重點不是把夜晚變無聊，而是先把能走和不能走分清楚。</p>
        </div>
        <div class="ns-stamp" aria-label="安全通行分數">
          <div><strong>${score}</strong><span>safety pass</span></div>
        </div>
      </div>
      <div class="ns-zones">
        ${zones.map((zone) => `
          <article class="ns-zone">
            <span>${escapeHtml(zone.tag)}</span>
            <h3>${escapeHtml(zone.title)}</h3>
            <p>${escapeHtml(zone.body)}</p>
            <ul>${zone.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
      <div class="ns-copy-grid">
        <section class="ns-copy-box">
          <h3>群組公告</h3>
          <p>${escapeHtml(share)}</p>
        </section>
        <section class="ns-copy-box">
          <h3>出門前最後檢查</h3>
          <p>${escapeHtml(missingChecks().length ? `先補齊：${missingChecks().map((item) => item.label).join("、")}。` : "全部核心檢核已完成；不要臨時擴大夜遊範圍。")}</p>
        </section>
      </div>
      <section class="ns-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="ns-result-actions">
        <button type="button" data-copy-share>複製群組公告</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="ns-primary" data-app-link href="${appStore}?ct=tool_night_safety_pass_manual_${score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateCheck(id, key, value, type) {
    checks = checks.map((item) => {
      if (item.id !== id) return item;
      if (key === "done") return { ...item, done: type === "checkbox" ? value : Boolean(value) };
      if (key === "label" || key === "category") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addCheck() {
    if (checks.length >= 10) {
      showToast("最多先檢核 10 項");
      return;
    }
    checks.push(check("新安全檢核", "route", 60, false));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "台北";
    fields.zone.value = "中山站到雙連主路線";
    fields.start.value = "21:10";
    fields.returnBy.value = "23:30";
    fields.group.value = "3";
    fields.transport.value = "taxi";
    fields.caution.value = "82";
    checks = [
      check("叫車 App 與住宿地址已設定", "return", 96, true),
      check("手機電量 60% 以上", "battery", 86, true),
      check("三人集合點已說好", "group", 80, true),
      check("只走中山北路與捷運站周邊", "route", 88, true),
      check("備用現金與信用卡分開放", "money", 66, true),
      check("雨備室內點已選好", "weather", 58, false)
    ];
    renderAll();
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (strong) strong.textContent = input.value;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-check]").addEventListener("click", addCheck);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        cautionLabel.textContent = `${fields.caution.value}/100`;
        renderOutput();
      });
      field.addEventListener("change", renderOutput);
    });

    checkListNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-check-id]");
      if (!row || !event.target.dataset.key) return;
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      updateCheck(row.dataset.checkId, event.target.dataset.key, value, event.target.type);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    checkListNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-check-id]");
      if (!row || !event.target.dataset.key) return;
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      updateCheck(row.dataset.checkId, event.target.dataset.key, value, event.target.type);
      renderOutput();
    });

    checkListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-check-id]");
      checks = checks.filter((item) => item.id !== row.dataset.checkId);
      renderAll();
    });
  }

  function renderAll() {
    cautionLabel.textContent = `${fields.caution.value}/100`;
    renderChecks();
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
