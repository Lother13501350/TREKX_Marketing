(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const peopleNode = document.querySelector("[data-people]");
  const wishesNode = document.querySelector("[data-wishes]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    policy: document.querySelector("[data-policy]"),
    late: document.querySelector("[data-late]")
  };

  let people = [
    person("Mia", 8, 82, 38),
    person("阿哲", 10, 52, 76),
    person("小雨", 9, 64, 58),
    person("我", 7, 88, 42)
  ];

  let wishes = [
    wish("清水寺空景", "早上", 86),
    wish("咖啡店早餐", "早上", 58),
    wish("錦市場午餐", "中午", 78),
    wish("鴨川夜散步", "晚上", 72)
  ];

  function person(name, wake, morning, night) {
    return { id: crypto.randomUUID(), name, wake, morning, night };
  }

  function wish(title, time, importance) {
    return { id: crypto.randomUUID(), title, time, importance };
  }

  function renderPeople() {
    peopleNode.innerHTML = people.map((item) => `
      <article class="mt-person" data-person-id="${escapeAttr(item.id)}">
        <label class="mt-person-field">
          <span>旅伴</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="旅伴名稱">
        </label>
        ${slider("wake", "可起床", item.wake, 5, 12, "點")}
        ${slider("morning", "早晨精神", item.morning, 0, 100, "")}
        ${slider("night", "夜間精神", item.night, 0, 100, "")}
        <button class="mt-remove" type="button" data-remove-person aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderWishes() {
    wishesNode.innerHTML = wishes.map((item) => `
      <article class="mt-wish" data-wish-id="${escapeAttr(item.id)}">
        <label class="mt-wish-field">
          <span>必做項目</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="必做項目">
        </label>
        <label class="mt-wish-select">
          <span>適合時段</span>
          <select data-key="time" aria-label="適合時段">
            ${["早上", "中午", "晚上"].map((time) => `<option value="${time}"${time === item.time ? " selected" : ""}>${time}</option>`).join("")}
          </select>
        </label>
        ${wishSlider("importance", "重要", item.importance)}
        <button class="mt-remove" type="button" data-remove-wish aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value, min, max, suffix) {
    return `
      <label class="mt-person-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function wishSlider(key, label, value) {
    return `
      <label class="mt-wish-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function average(key) {
    return Math.round(people.reduce((sum, item) => sum + Number(item[key]), 0) / Math.max(1, people.length));
  }

  function earliest() {
    return [...people].sort((a, b) => Number(a.wake) - Number(b.wake))[0];
  }

  function latest() {
    return [...people].sort((a, b) => Number(b.wake) - Number(a.wake))[0];
  }

  function scheduleScore() {
    const wakeGap = latest().wake - earliest().wake;
    const energyGap = Math.abs(average("morning") - average("night"));
    const latePenalty = Number(fields.late.value) < 40 ? 8 : 0;
    return Math.max(1, Math.min(99, Math.round(96 - wakeGap * 9 - energyGap * 0.12 - latePenalty)));
  }

  function profile(score) {
    if (score >= 78) return ["可以同線同行", "作息差不算大，只要把早晨第一站設成可選就能共存。"];
    if (score >= 55) return ["需要分流時段", "早鳥和夜貓都有人，請把上午與晚間拆開，中午後再合流。"];
    return ["不要硬綁整天", "作息差距太大，如果全程同行很容易互相消耗。"];
  }

  function wishByTime(time) {
    return wishes
      .filter((item) => item.time === time)
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 3);
  }

  function timeline() {
    const early = earliest();
    const late = latest();
    return [
      {
        time: `${Math.max(7, Number(early.wake))}:30`,
        title: "早鳥自走線",
        lead: `${early.name} 可以先出門，不等所有人起床。`,
        items: wishByTime("早上")
      },
      {
        time: `${Math.max(11, Number(late.wake) + 1)}:30`,
        title: "共同核心時段",
        lead: "中午到下午是唯一強制共同時段，主景點放這裡。",
        items: wishByTime("中午")
      },
      {
        time: "19:30",
        title: "夜貓延伸線",
        lead: fields.policy.value === "dinner" ? "晚餐一定集合，之後夜貓可續攤。" : "晚餐後想回飯店的人可先退場。",
        items: wishByTime("晚上")
      }
    ];
  }

  function rules(score) {
    const early = earliest();
    const late = latest();
    const list = [
      `${early.name} 是早鳥代表，可先走早上自走線，但不能要求其他人跟上。`,
      `${late.name} 是最晚啟動者，集合前要自己處理早餐或交通。`,
      `共同核心時段只放 1 到 2 個不可錯過的主景點，不把整天都設成團體行動。`
    ];
    if (Number(fields.late.value) < 45) list.push("遲到容忍度偏低，集合時間要寫明「超過 10 分鐘就各自前往」。");
    if (score < 55) list.push("如果有人前一晚續攤，隔天早上不要排不可取消的預約。");
    return list;
  }

  function shareCopy(title, score, rulesList) {
    return `我用 ChillOut 早鳥夜貓停戰協議排好了：${fields.trip.value || "這天行程"} 是「${title}」，共存分 ${score}/100。規則：${rulesList.slice(0, 2).join(" / ")}。早上可分流，中午後再合流。`;
  }

  function promptFor(title, score, rulesList) {
    const peopleText = people.map((item) => `${item.name} 可起床 ${item.wake} 點，早晨精神 ${item.morning}，夜間精神 ${item.night}`).join("；");
    const wishText = wishes.map((item) => `${item.title} 適合${item.time}，重要 ${item.importance}`).join("；");
    return `請用 ChillOut 幫我們規劃 ${fields.trip.value || "一天旅行"}。作息資料：${peopleText}。必做項目：${wishText}。協議結果是「${title}」，共存分 ${score}/100。請依照這些規則排一天行程：${rulesList.join("；")}。請輸出早鳥自走線、共同核心時段、夜貓延伸線、集合點、遲到處理方式、以及有人想睡晚一點時的替代路線。`;
  }

  function renderOutput() {
    if (!people.length || !wishes.length) {
      outputNode.innerHTML = `<div class="mt-empty">先加入旅伴與必做項目，這裡會生成分流時段、停戰規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = scheduleScore();
    const [title, description] = profile(score);
    const blocks = timeline();
    const rulesList = rules(score);
    const share = shareCopy(title, score, rulesList);
    const prompt = promptFor(title, score, rulesList);

    outputNode.innerHTML = `
      <div class="mt-summary">
        <div>
          <small>T028 morning night truce</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 停戰的重點不是誰配合誰，而是把一定要一起的時間縮到最有價值。</p>
        </div>
        <div class="mt-score" aria-label="作息共存分">${score}</div>
      </div>

      <div class="mt-timeline">
        ${blocks.map((block) => `
          <article class="mt-block">
            <span>${escapeHtml(block.time)}</span>
            <h3>${escapeHtml(block.title)}</h3>
            <p>${escapeHtml(block.lead)}</p>
            <ul>${block.items.length ? block.items.map((item) => `<li>${escapeHtml(item.title)} · ${item.importance}</li>`).join("") : "<li>這個時段先保留彈性。</li>"}</ul>
          </article>
        `).join("")}
      </div>

      <div class="mt-rules">
        <section>
          <h3>停戰規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="mt-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="mt-result-actions">
        <button type="button" class="mt-button" data-copy-share>複製群組公告</button>
        <button type="button" class="mt-button" data-copy-prompt>複製 Prompt</button>
        <a class="mt-button mt-primary" data-app-link href="${appStore}?ct=tool_morning_night_truce_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updatePerson(id, key, value) {
    people = people.map((item) => {
      if (item.id !== id) return item;
      if (key === "name") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function updateWish(id, key, value) {
    wishes = wishes.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "time") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addPerson() {
    if (people.length >= 8) {
      showToast("最多先放 8 位旅伴");
      return;
    }
    people.push(person("新旅伴", 9, 60, 60));
    renderPeople();
    renderOutput();
  }

  function addWish() {
    if (wishes.length >= 10) {
      showToast("最多先放 10 個必做項目");
      return;
    }
    wishes.push(wish("新必做項目", "中午", 60));
    renderWishes();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "東京第三天";
    fields.policy.value = "core";
    fields.late.value = "28";
    people = [
      person("Mia", 7, 88, 40),
      person("阿哲", 10, 48, 82),
      person("小雨", 9, 62, 58),
      person("Leo", 11, 38, 88),
      person("我", 8, 76, 50)
    ];
    wishes = [
      wish("築地早餐", "早上", 78),
      wish("美術館主展", "中午", 88),
      wish("代官山咖啡", "中午", 62),
      wish("澀谷夜景", "晚上", 82),
      wish("居酒屋續攤", "晚上", 64)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-late-value]").textContent = fields.late.value;
    renderPeople();
    renderWishes();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    const suffix = input.dataset.key === "wake" ? "點" : "";
    label.innerHTML = `${label.textContent.replace(/\s\d+(點)?$/, "")} <strong>${input.value}${suffix}</strong>`;
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

  wishesNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-wish-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateWish(row.dataset.wishId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  wishesNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-wish-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateWish(row.dataset.wishId, key, event.target.value);
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

  wishesNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-wish]");
    if (!remove) return;
    if (wishes.length <= 2) {
      showToast("至少保留 2 個必做項目");
      return;
    }
    const row = remove.closest("[data-wish-id]");
    wishes = wishes.filter((item) => item.id !== row.dataset.wishId);
    renderWishes();
    renderOutput();
  });

  document.querySelector("[data-add-person]").addEventListener("click", addPerson);
  document.querySelector("[data-add-wish]").addEventListener("click", addWish);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.late) document.querySelector("[data-late-value]").textContent = fields.late.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
