(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const peopleNode = document.querySelector("[data-people]");
  const activitiesNode = document.querySelector("[data-activities]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    policy: document.querySelector("[data-policy]"),
    safety: document.querySelector("[data-safety]")
  };

  let people = [
    person("Mia", 72, 54, 68),
    person("阿哲", 38, 82, 46),
    person("小雨", 84, 42, 74),
    person("我", 62, 60, 52)
  ];

  let activities = [
    activity("美術館主展", "一起", 86, 70),
    activity("自由逛街", "分開", 72, 34),
    activity("晚餐訂位", "一起", 88, 58),
    activity("咖啡店休息", "彈性", 58, 42)
  ];

  function person(name, solo, social, fomo) {
    return { id: crypto.randomUUID(), name, solo, social, fomo };
  }

  function activity(title, mode, importance, pressure) {
    return { id: crypto.randomUUID(), title, mode, importance, pressure };
  }

  function renderPeople() {
    peopleNode.innerHTML = people.map((item) => `
      <article class="ss-person" data-person-id="${escapeAttr(item.id)}">
        <label class="ss-person-field">
          <span>旅伴</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="旅伴名稱">
        </label>
        ${slider("solo", "獨處需求", item.solo)}
        ${slider("social", "社交電量", item.social)}
        ${slider("fomo", "錯過焦慮", item.fomo)}
        <button class="ss-remove" type="button" data-remove-person aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderActivities() {
    activitiesNode.innerHTML = activities.map((item) => `
      <article class="ss-activity" data-activity-id="${escapeAttr(item.id)}">
        <label class="ss-activity-field">
          <span>活動</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="活動名稱">
        </label>
        <label class="ss-activity-select">
          <span>模式</span>
          <select data-key="mode" aria-label="活動模式">
            ${["一起", "分開", "彈性"].map((mode) => `<option value="${mode}"${mode === item.mode ? " selected" : ""}>${mode}</option>`).join("")}
          </select>
        </label>
        ${activitySlider("importance", "重要", item.importance)}
        ${activitySlider("pressure", "壓力", item.pressure)}
        <button class="ss-remove" type="button" data-remove-activity aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    return `
      <label class="ss-person-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function activitySlider(key, label, value) {
    return `
      <label class="ss-activity-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function average(key) {
    return Math.round(people.reduce((sum, item) => sum + Number(item[key]), 0) / Math.max(1, people.length));
  }

  function highest(key) {
    return [...people].sort((a, b) => Number(b[key]) - Number(a[key]))[0];
  }

  function lowest(key) {
    return [...people].sort((a, b) => Number(a[key]) - Number(b[key]))[0];
  }

  function balanceScore() {
    const soloNeed = average("solo");
    const social = average("social");
    const fomo = average("fomo");
    const activityPressure = Math.round(activities.reduce((sum, item) => sum + Number(item.pressure), 0) / Math.max(1, activities.length));
    const safetyBonus = Number(fields.safety.value) > 70 ? 6 : 0;
    return Math.max(1, Math.min(99, Math.round(72 + social * 0.12 - soloNeed * 0.10 - fomo * 0.08 - activityPressure * 0.05 + safetyBonus)));
  }

  function profile(score) {
    if (score >= 78) return ["可以自然分合", "這團的社交電量與安全感足夠，分開行動不太會被解讀成拒絕。"];
    if (score >= 55) return ["要明確留白", "有人需要獨處，也有人怕錯過，請把分開行動寫成正式時段。"];
    return ["不要整天綁一起", "獨處需求和活動壓力偏高，如果全程同行會快速耗電。"];
  }

  function activityGroups() {
    return {
      together: activities.filter((item) => item.mode === "一起").sort((a, b) => b.importance - a.importance),
      solo: activities.filter((item) => item.mode === "分開").sort((a, b) => b.importance - a.importance),
      flexible: activities.filter((item) => item.mode === "彈性").sort((a, b) => b.importance - a.importance)
    };
  }

  function rules(score) {
    const soloPerson = highest("solo");
    const fomoPerson = highest("fomo");
    const socialLow = lowest("social");
    const list = [
      `${soloPerson.name} 的獨處需求最高，行程中要明確保留一段不用解釋的自由時間。`,
      `${fomoPerson.name} 的錯過焦慮最高，分開前要講清楚集合時間與主線活動。`,
      `${socialLow.name} 的社交電量最低，晚餐後不要再強迫續攤。`
    ];
    if (fields.policy.value === "pair") list.push("分開行動採至少兩人一組，想完全獨處的人要先報備目的地。");
    if (Number(fields.safety.value) < 55) list.push("集合安全感偏低，請固定集合點、定位分享與最晚回覆時間。");
    if (score < 55) list.push("共同活動只保留最高重要的兩個，其餘都改成可選。");
    return list;
  }

  function shareCopy(title, score, rulesList) {
    return `我用 ChillOut 獨處社交排程器排好了：${fields.trip.value || "這天行程"} 是「${title}」，分合舒適分 ${score}/100。規則：${rulesList.slice(0, 2).join(" / ")}。分開一下不是不想一起玩，是為了大家都玩得久。`;
  }

  function promptFor(title, score, rulesList, groups) {
    const peopleText = people.map((item) => `${item.name} 獨處 ${item.solo}，社交 ${item.social}，錯過焦慮 ${item.fomo}`).join("；");
    const activityText = activities.map((item) => `${item.title} ${item.mode}，重要 ${item.importance}，壓力 ${item.pressure}`).join("；");
    return `請用 ChillOut 幫我們規劃 ${fields.trip.value || "一天旅行"}。旅伴狀態：${peopleText}。活動：${activityText}。結果是「${title}」，分合舒適分 ${score}/100。請依照這些規則排路線：${rulesList.join("；")}。請輸出共同核心活動、可分開行動時段、彈性休息點、集合點、定位與回覆規則，以及有人臨時想獨處時的替代方案。`;
  }

  function renderOutput() {
    if (!people.length || !activities.length) {
      outputNode.innerHTML = `<div class="ss-empty">先加入旅伴與活動，這裡會生成獨處社交排程、集合規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = balanceScore();
    const [title, description] = profile(score);
    const groups = activityGroups();
    const rulesList = rules(score);
    const share = shareCopy(title, score, rulesList);
    const prompt = promptFor(title, score, rulesList, groups);

    outputNode.innerHTML = `
      <div class="ss-summary">
        <div>
          <small>T030 solo social scheduler</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這張表讓「我想自己走一下」變成行程設計，而不是臨場尷尬。</p>
        </div>
        <div class="ss-score" aria-label="分合舒適分">${score}</div>
      </div>

      <div class="ss-plan">
        ${blockHtml("共同核心", groups.together)}
        ${blockHtml("分開行動", groups.solo)}
        ${blockHtml("彈性緩衝", groups.flexible)}
      </div>

      <div class="ss-rules">
        <section>
          <h3>分合規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="ss-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="ss-result-actions">
        <button type="button" class="ss-button" data-copy-share>複製群組公告</button>
        <button type="button" class="ss-button" data-copy-prompt>複製 Prompt</button>
        <a class="ss-button ss-primary" data-app-link href="${appStore}?ct=tool_solo_or_social_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function blockHtml(label, items) {
    return `
      <article class="ss-block">
        <span>${escapeHtml(label)}</span>
        <h3>${items.length ? `${items.length} 個活動` : "保留空白"}</h3>
        <ul>${items.length ? items.map((item) => `<li>${escapeHtml(item.title)} · ${item.importance}</li>`).join("") : "<li>這裡先不要塞行程。</li>"}</ul>
      </article>
    `;
  }

  function updatePerson(id, key, value) {
    people = people.map((item) => {
      if (item.id !== id) return item;
      if (key === "name") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function updateActivity(id, key, value) {
    activities = activities.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "mode") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addPerson() {
    if (people.length >= 8) {
      showToast("最多先放 8 位旅伴");
      return;
    }
    people.push(person("新旅伴", 55, 55, 55));
    renderPeople();
    renderOutput();
  }

  function addActivity() {
    if (activities.length >= 10) {
      showToast("最多先放 10 個活動");
      return;
    }
    activities.push(activity("新活動", "彈性", 55, 45));
    renderActivities();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "大阪最後一天";
    fields.policy.value = "announce";
    fields.safety.value = "76";
    people = [
      person("Mia", 78, 48, 72),
      person("阿哲", 42, 82, 44),
      person("小雨", 88, 36, 78),
      person("Leo", 54, 68, 50),
      person("我", 64, 58, 62)
    ];
    activities = [
      activity("黑門市場早餐", "一起", 78, 58),
      activity("心齋橋自由逛", "分開", 84, 38),
      activity("咖啡廳休息", "彈性", 62, 30),
      activity("最後晚餐", "一起", 90, 62),
      activity("藥妝補貨", "分開", 70, 42)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-safety-value]").textContent = fields.safety.value;
    renderPeople();
    renderActivities();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    label.innerHTML = `${label.textContent.replace(/\s\d+$/, "")} <strong>${input.value}</strong>`;
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
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1300);
  }

  peopleNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-person-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updatePerson(row.dataset.personId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  activitiesNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-activity-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateActivity(row.dataset.activityId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  activitiesNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-activity-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateActivity(row.dataset.activityId, key, event.target.value);
    renderOutput();
  });

  peopleNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-person]");
    if (!remove) return;
    if (people.length <= 2) {
      showToast("至少保留 2 位旅伴");
      return;
    }
    const row = remove.closest("[data-person-id]");
    people = people.filter((item) => item.id !== row.dataset.personId);
    renderPeople();
    renderOutput();
  });

  activitiesNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-activity]");
    if (!remove) return;
    if (activities.length <= 2) {
      showToast("至少保留 2 個活動");
      return;
    }
    const row = remove.closest("[data-activity-id]");
    activities = activities.filter((item) => item.id !== row.dataset.activityId);
    renderActivities();
    renderOutput();
  });

  document.querySelector("[data-add-person]").addEventListener("click", addPerson);
  document.querySelector("[data-add-activity]").addEventListener("click", addActivity);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.safety) document.querySelector("[data-safety-value]").textContent = fields.safety.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
