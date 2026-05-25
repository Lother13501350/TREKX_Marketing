(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const ritualsNode = document.querySelector("[data-rituals]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    energy: document.querySelector("[data-energy]"),
    anchor: document.querySelector("[data-anchor]"),
    screen: document.querySelector("[data-screen]"),
    activity: document.querySelector("[data-activity]"),
    social: document.querySelector("[data-social]"),
    earlyHome: document.querySelector("[data-early-home]")
  };
  const labels = {
    screen: document.querySelector("[data-screen-label]"),
    activity: document.querySelector("[data-activity-label]"),
    social: document.querySelector("[data-social-label]")
  };

  let rituals = [
    ritual("jd-1", "慢早餐咖啡", "food", 24, 36, 78),
    ritual("jd-2", "公園樹蔭散步", "nature", 32, 28, 86),
    ritual("jd-3", "安靜書店", "indoor", 22, 18, 74),
    ritual("jd-4", "泡湯或按摩", "care", 44, 30, 92),
    ritual("jd-5", "提早回住宿", "rest", 12, 8, 88)
  ];

  function ritual(id, name, type, minutes, cost, recover) {
    return { id, name, type, minutes, cost, recover };
  }

  function typeOptions() {
    return [["food", "吃喝"], ["nature", "自然"], ["indoor", "室內"], ["care", "照顧"], ["rest", "休息"]];
  }

  function typeLabel(value) {
    const found = typeOptions().find((item) => item[0] === value);
    return found ? found[1] : "恢復";
  }

  function renderRituals() {
    ritualsNode.innerHTML = rituals.map((item) => `
      <article class="jd-ritual" data-ritual-id="${escapeAttr(item.id)}">
        <label>恢復點<input data-key="name" value="${escapeAttr(item.name)}" placeholder="例如：咖啡、公園、泡湯、早回飯店"></label>
        <label>類型<select data-key="type">${typeOptions().map(([value, label]) => `<option value="${value}"${value === item.type ? " selected" : ""}>${label}</option>`).join("")}</select></label>
        ${rangeControl("minutes", "停留", item.minutes, 10, 120, "分")}
        ${rangeControl("cost", "耗電", item.cost, 1, 100, "")}
        ${rangeControl("recover", "回血", item.recover, 1, 100, "")}
        <button type="button" class="jd-remove" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `<label><span class="jd-mini">${label}<strong>${value}${suffix}</strong></span><input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}"></label>`;
  }

  function scoreRitual(item) {
    const energy = Number(fields.energy.value);
    const lowEnergyBonus = energy < 45 && (item.type === "rest" || item.type === "care") ? 14 : 0;
    const offlineBonus = Number(fields.screen.value) > 70 && (item.type === "nature" || item.type === "indoor") ? 10 : 0;
    const socialPenalty = Number(fields.social.value) < 35 && item.type === "food" ? 8 : 0;
    const activityPenalty = Math.max(0, item.cost - Number(fields.activity.value)) * 0.42;
    return Math.max(1, Math.min(99, Math.round(item.recover * 0.68 - item.cost * 0.2 + lowEnergyBonus + offlineBonus - socialPenalty - activityPenalty)));
  }

  function rankedRituals() {
    return rituals.map((item) => ({ ...item, score: scoreRitual(item) })).sort((a, b) => b.score - a.score);
  }

  function buildDay() {
    const ranked = rankedRituals();
    const count = fields.anchor.value === "one" ? 3 : fields.anchor.value === "two" ? 4 : fields.anchor.value === "half" ? 4 : 5;
    const picked = [];
    const used = new Set();
    ranked.forEach((item) => {
      if (picked.length >= count) return;
      if (!used.has(item.type) || picked.length < 2) {
        picked.push(item);
        used.add(item.type);
      }
    });
    while (picked.length < Math.min(count, ranked.length)) {
      const next = ranked.find((item) => !picked.some((pickedItem) => pickedItem.id === item.id));
      if (!next) break;
      picked.push(next);
    }
    const spend = picked.reduce((sum, item) => sum + item.cost, 0);
    const recover = picked.reduce((sum, item) => sum + item.recover, 0);
    const startEnergy = Number(fields.energy.value);
    const endEnergy = Math.max(1, Math.min(100, Math.round(startEnergy - spend * 0.22 + recover * 0.18 - Math.max(0, picked.length - 3) * 4)));
    const score = Math.max(1, Math.min(99, Math.round(endEnergy * 0.5 + Number(fields.screen.value) * 0.16 + (100 - Number(fields.activity.value)) * 0.12 + picked.reduce((sum, item) => sum + item.score, 0) / Math.max(1, picked.length) * 0.22)));
    return { picked, spend, recover, startEnergy, endEnergy, score };
  }

  function verdict(day) {
    if (day.score >= 78) return ["這是會回血的一天", "行程有內容，但沒有把你榨乾。今天的重點不是完成很多，而是晚上還想活著。"];
    if (day.score >= 58) return ["低壓可行，但要刪掉一點", "日程方向對了，但活動量還是偏滿。把最低回血的一段改成住宿休息。"];
    return ["先休息，不要硬排", "目前能量太低或活動上限太緊。今天只保留一件重要的事，其餘交給明天。"];
  }

  function blocks(day) {
    const fallbackRest = ritual("jd-fallback", "提早回住宿", "rest", 60, 4, 82);
    const morning = day.picked.find((item) => item.type === "food") || day.picked.find((item) => item.type === "nature") || day.picked[0] || rituals[0];
    const afternoon = day.picked.find((item) => item.id !== morning.id && (item.type === "care" || item.type === "indoor" || item.type === "nature")) || day.picked.find((item) => item.id !== morning.id) || rituals[1];
    const evening = fields.earlyHome.checked
      ? (day.picked.find((item) => item.id !== morning.id && item.id !== afternoon.id && item.type === "rest") || fallbackRest)
      : (day.picked.find((item) => item.id !== morning.id && item.id !== afternoon.id) || rituals[2]);
    return [
      ["10:00 / morning", morning.name, `${typeLabel(morning.type)}。停留 ${morning.minutes} 分鐘，先做最不耗電但能把身體叫回來的事。`],
      ["14:00 / afternoon", afternoon.name, `${typeLabel(afternoon.type)}。這段只排一個主活動，移動後直接坐下，不連續趕場。`],
      [fields.earlyHome.checked ? "18:00 / early close" : "19:00 / evening", evening.name, `${typeLabel(evening.type)}。晚上不追加第二攤，讓今天留下餘裕。`]
    ];
  }

  function ruleText(day) {
    if (Number(fields.screen.value) >= 75) return "離線規則：每個點只拍一張代表照，導航完成後手機進包包。晚上再整理照片，不邊走邊滑。";
    if (day.endEnergy < 45) return "收尾規則：只要下午開始煩躁，就直接跳到最後一段恢復點。低電量旅行不需要硬撐。";
    if (fields.earlyHome.checked) return "收尾規則：晚餐後回住宿，不臨時加夜景。把舒服感留到明天早上。";
    return "節奏規則：每完成一個活動，至少留 30 分鐘空白。JOMO 的空白不是浪費，是防止旅程變成待辦清單。";
  }

  function shareCopy(day, title) {
    return `我用 ChillOut JOMO 一日排程做了 ${fields.city.value} 的低壓旅行：${title}，舒服度 ${day.score}/100。今天只排 ${blocks(day).map((item) => item[1]).join(" → ")}。規則：${ruleText(day)}`;
  }

  function promptFor(day, title) {
    const ritualText = rituals.map((item) => `${item.name}，類型 ${typeLabel(item.type)}，停留 ${item.minutes} 分，耗電 ${item.cost}/100，回血 ${item.recover}/100`).join("；");
    return `請用 ChillOut 幫我把「JOMO 一日排程」排成低壓旅行。城市/住宿區是 ${fields.city.value}，目前能量 ${fields.energy.value}/100，今天只想完成 ${anchorLabel(fields.anchor.value)}，想離線 ${fields.screen.value}/100，活動上限 ${fields.activity.value}/100，社交能量 ${fields.social.value}/100，${fields.earlyHome.checked ? "希望提早回住宿" : "晚上可以留一點活動"}。恢復點：${ritualText}。工具結果是「${title}」，舒服度 ${day.score}/100，預估結束電量 ${day.endEnergy}/100。請排早午晚低壓日程、交通距離、離線規則、提早收尾方案和分享標題。`;
  }

  function anchorLabel(value) {
    if (value === "two") return "兩件舒服的事";
    if (value === "half") return "半天慢旅";
    if (value === "full") return "完整但低壓的一天";
    return "一件重要的事";
  }

  function metric(label, value) {
    return `<div class="jd-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderOutput() {
    if (!rituals.length) {
      outputNode.innerHTML = `<div class="jd-empty"><p class="jd-kicker">Result</p><h2>至少需要一個恢復點。</h2><p>新增恢復點後再生成日程。</p></div>`;
      return;
    }
    const day = buildDay();
    const [title, description] = verdict(day);
    const share = shareCopy(day, title);
    const prompt = promptFor(day, title);
    outputNode.innerHTML = `
      <div class="jd-result-head">
        <div><p class="jd-kicker">T051 手寫版 / JOMO day planner</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <div class="jd-score" aria-label="JOMO 舒服度">${day.score}</div>
      </div>
      <div class="jd-energy">
        ${metric("開始電量", `${day.startEnergy}/100`)}
        ${metric("耗電總量", `${day.spend} 點`)}
        ${metric("回血總量", `${day.recover} 點`)}
        ${metric("結束電量", `${day.endEnergy}/100`)}
      </div>
      <div class="jd-day">
        ${blocks(day).map((item) => `<article class="jd-block"><span>${escapeHtml(item[0])}</span><h3>${escapeHtml(item[1])}</h3><p>${escapeHtml(item[2])}</p><ul><li>今天只做必要的事</li><li>不為打卡臨時加點</li></ul></article>`).join("")}
      </div>
      <div class="jd-copy-grid">
        <section class="jd-rule"><h3>離線與收尾規則</h3><p>${escapeHtml(ruleText(day))}</p></section>
        <section class="jd-copy-box"><h3>社群分享文</h3><p>${escapeHtml(share)}</p></section>
      </div>
      <section class="jd-prompt"><h3>ChillOut prompt</h3><p>${escapeHtml(prompt)}</p></section>
      <div class="jd-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="jd-primary" data-app-link href="${appStore}?ct=tool_jomo_day_planner_manual_${day.score}">丟進 ChillOut</a>
      </div>`;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateRitual(id, key, value) {
    rituals = rituals.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addRitual() {
    if (rituals.length >= 8) {
      showToast("最多先比較 8 個恢復點");
      return;
    }
    rituals.push(ritual(`jd-${Date.now()}`, "新的恢復點", "rest", 30, 18, 70));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "京都東山";
    fields.energy.value = "22";
    fields.anchor.value = "one";
    fields.screen.value = "88";
    fields.activity.value = "30";
    fields.social.value = "18";
    fields.earlyHome.checked = true;
    rituals = [
      ritual("jd-a", "旅館附近早餐", "food", 35, 22, 72),
      ritual("jd-b", "白川小路散步", "nature", 42, 26, 86),
      ritual("jd-c", "安靜茶屋", "indoor", 50, 18, 84),
      ritual("jd-d", "回房間午睡", "rest", 70, 6, 92),
      ritual("jd-e", "傍晚泡湯", "care", 60, 24, 94)
    ];
    renderAll();
  }

  function updateLabels() {
    labels.screen.textContent = `${fields.screen.value}/100`;
    labels.activity.textContent = `${fields.activity.value}/100`;
    labels.social.textContent = `${fields.social.value}/100`;
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label")?.querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "minutes" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-ritual]").addEventListener("click", addRitual);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => { updateLabels(); renderOutput(); });
      field.addEventListener("change", renderOutput);
    });
    ritualsNode.addEventListener("input", (event) => {
      const row = event.target.closest("[data-ritual-id]");
      if (!row || !event.target.dataset.key) return;
      updateRitual(row.dataset.ritualId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });
    ritualsNode.addEventListener("change", (event) => {
      const row = event.target.closest("[data-ritual-id]");
      if (!row || !event.target.dataset.key) return;
      updateRitual(row.dataset.ritualId, event.target.dataset.key, event.target.value);
      renderAll();
    });
    ritualsNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const row = button.closest("[data-ritual-id]");
      rituals = rituals.filter((item) => item.id !== row.dataset.ritualId);
      renderAll();
    });
  }

  function renderAll() {
    updateLabels();
    renderRituals();
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
