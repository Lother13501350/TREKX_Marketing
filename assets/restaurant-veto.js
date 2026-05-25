(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const dinersNode = document.querySelector("[data-diners]");
  const placesNode = document.querySelector("[data-places]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    count: document.querySelector("[data-count]"),
    policy: document.querySelector("[data-policy]"),
    hunger: document.querySelector("[data-hunger]")
  };

  let diners = [
    diner("Mia", "海鮮", "韓式烤肉", 42, 900),
    diner("阿哲", "太辣", "湯飯", 54, 700),
    diner("小雨", "內臟", "咖啡甜點", 38, 600),
    diner("我", "排隊太久", "炸雞", 62, 800)
  ];

  let places = [
    place("弘大烤肉店", "韓式烤肉", 760, 35, 82),
    place("老店湯飯", "湯飯", 520, 18, 78),
    place("辣炒雞排", "韓式辣味", 640, 28, 62),
    place("市場海鮮鍋", "海鮮", 820, 42, 55)
  ];

  function diner(name, avoid, craving, spice, budget) {
    return { id: crypto.randomUUID(), name, avoid, craving, spice, budget };
  }

  function place(name, cuisine, price, wait, fit) {
    return { id: crypto.randomUUID(), name, cuisine, price, wait, fit };
  }

  function renderDiners() {
    dinersNode.innerHTML = diners.map((item) => `
      <article class="rv-diner" data-diner-id="${escapeAttr(item.id)}">
        <label class="rv-diner-field">
          <span>旅伴</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="旅伴名稱">
        </label>
        <label class="rv-diner-field">
          <span>不能吃</span>
          <input data-key="avoid" value="${escapeAttr(item.avoid)}" aria-label="不能吃">
        </label>
        <label class="rv-diner-field">
          <span>想吃</span>
          <input data-key="craving" value="${escapeAttr(item.craving)}" aria-label="想吃">
        </label>
        ${slider("spice", "辣度", item.spice, 0, 100)}
        ${slider("budget", "預算", item.budget, 200, 2000)}
        <button class="rv-remove" type="button" data-remove-diner aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderPlaces() {
    placesNode.innerHTML = places.map((item) => `
      <article class="rv-place" data-place-id="${escapeAttr(item.id)}">
        <label class="rv-place-field">
          <span>餐廳</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="餐廳名稱">
        </label>
        <label class="rv-place-field">
          <span>料理</span>
          <input data-key="cuisine" value="${escapeAttr(item.cuisine)}" aria-label="料理類型">
        </label>
        ${placeSlider("price", "人均", item.price, 200, 2500)}
        ${placeSlider("wait", "等候", item.wait, 0, 120)}
        ${placeSlider("fit", "適配", item.fit, 0, 100)}
        <button class="rv-remove" type="button" data-remove-place aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value, min, max) {
    const suffix = key === "budget" ? "元" : "";
    return `
      <label class="rv-diner-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" step="${key === "budget" ? 50 : 1}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function placeSlider(key, label, value, min, max) {
    const suffix = key === "price" ? "元" : key === "wait" ? "分" : "";
    return `
      <label class="rv-place-slider">
        <span>${label} <strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" step="${key === "price" ? 50 : 1}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function tokenize(text) {
    return String(text || "")
      .split(/[、，,\s/]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function placeScore(item) {
    const cuisineText = `${item.name} ${item.cuisine}`.toLowerCase();
    let score = Number(item.fit);
    const conflicts = [];
    const matches = [];

    diners.forEach((person) => {
      tokenize(person.avoid).forEach((word) => {
        if (word && cuisineText.includes(word.toLowerCase())) {
          score -= fields.policy.value === "allergy" ? 42 : 28;
          conflicts.push(`${person.name} 不吃 ${word}`);
        }
      });

      tokenize(person.craving).forEach((word) => {
        if (word && cuisineText.includes(word.toLowerCase())) {
          score += 12;
          matches.push(`${person.name} 想吃 ${word}`);
        }
      });

      if (Number(item.price) > Number(person.budget)) {
        score -= 8;
        conflicts.push(`${person.name} 預算壓力`);
      }
    });

    if (Number(item.wait) > 40) score -= Number(fields.hunger.value) > 60 ? 20 : 12;
    if (String(item.cuisine).includes("辣") && average("spice") < 50) score -= 16;
    return {
      ...item,
      score: Math.max(1, Math.min(99, Math.round(score))),
      conflicts: Array.from(new Set(conflicts)),
      matches: Array.from(new Set(matches))
    };
  }

  function average(key) {
    return Math.round(diners.reduce((sum, item) => sum + Number(item[key]), 0) / Math.max(1, diners.length));
  }

  function rankedPlaces() {
    return places.map(placeScore).sort((a, b) => b.score - a.score);
  }

  function groups(items) {
    return {
      safe: items.filter((item) => item.score >= 72),
      check: items.filter((item) => item.score >= 48 && item.score < 72),
      veto: items.filter((item) => item.score < 48)
    };
  }

  function profile(top) {
    if (!top) return ["先補候選餐廳", "目前沒有可以判斷的餐廳。"];
    if (top.score >= 78) return ["可以直接訂位", "第一名沒有踩到明顯忌口，價格與等待時間也在可接受範圍。"];
    if (top.score >= 55) return ["先問一次否決權", "有可行候選，但仍需要確認忌口、預算或等待時間。"];
    return ["不要硬選", "候選餐廳踩到太多地雷，建議重新找兩間安全備案。"];
  }

  function rulesFor(items) {
    const top = items[0];
    const rules = [
      "每個人只能否決一次，否決時要說明忌口、預算或等待時間原因。",
      "如果是過敏、宗教或明確忌口，優先於想吃清單。",
      `飢餓風險 ${fields.hunger.value}/100，等候超過 40 分鐘的店要有附近備案。`
    ];
    if (top) rules.unshift(`目前主方案是 ${top.name}，但仍要保留一間不用排隊的備案。`);
    if (fields.policy.value === "majority") rules.push("多數決時，少數人的硬忌口仍不可被覆蓋。");
    return rules;
  }

  function shareCopy(title, top, rules) {
    const choice = top ? `${top.name}（${top.score}/100）` : "還沒有主方案";
    return `我用 ChillOut 餐廳否決權整理好了：${fields.trip.value || "這餐"} 是「${title}」，主方案 ${choice}。規則：${rules.slice(0, 2).join(" / ")}。大家如果要否決，請直接說原因，不要只說都可以。`;
  }

  function promptFor(title, items, rules) {
    const dinerText = diners.map((item) => `${item.name} 不能吃 ${item.avoid}，想吃 ${item.craving}，預算 ${item.budget}`).join("；");
    const placeText = items.map((item) => `${item.name} ${item.score} 分，料理 ${item.cuisine}，人均 ${item.price}，等候 ${item.wait} 分`).join("；");
    return `請用 ChillOut 幫我們規劃 ${fields.trip.value || "旅行餐局"} 的美食路線。用餐人數 ${fields.count.value} 人。旅伴條件：${dinerText}。候選餐廳評分：${placeText}。結果是「${title}」。請依照這些規則安排餐廳與備案：${rules.join("；")}。輸出主餐廳、附近備案、適合點的菜、需要避開的食材、排隊過久時的替代路線。`;
  }

  function renderOutput() {
    if (!diners.length || !places.length) {
      outputNode.innerHTML = `<div class="rv-empty">先加入旅伴和候選餐廳，這裡會生成餐廳否決表、群組規則與 ChillOut prompt。</div>`;
      return;
    }

    const items = rankedPlaces();
    const buckets = groups(items);
    const top = items[0];
    const [title, description] = profile(top);
    const rules = rulesFor(items);
    const share = shareCopy(title, top, rules);
    const prompt = promptFor(title, items, rules);

    outputNode.innerHTML = `
      <div class="rv-summary">
        <div>
          <small>T027 restaurant veto</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 否決權不是讓大家更難約，是讓真正不能接受的點被提前看見。</p>
        </div>
        <div class="rv-score" aria-label="餐廳安全分">${top ? top.score : "--"}</div>
      </div>

      <div class="rv-columns">
        ${columnHtml("安全候選", buckets.safe)}
        ${columnHtml("需確認", buckets.check)}
        ${columnHtml("應否決", buckets.veto)}
      </div>

      <div class="rv-rules">
        <section>
          <h3>用餐規則</h3>
          <ul>${rules.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="rv-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="rv-result-actions">
        <button type="button" class="rv-button" data-copy-share>複製群組公告</button>
        <button type="button" class="rv-button" data-copy-prompt>複製 Prompt</button>
        <a class="rv-button rv-primary" data-app-link href="${appStore}?ct=tool_restaurant_veto_manual_${top ? top.score : 0}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function columnHtml(label, items) {
    return `
      <article class="rv-column">
        <span>${escapeHtml(label)}</span>
        <h3>${items.length ? `${items.length} 間` : "暫無"}</h3>
        <ul>${items.length ? items.map((item) => `<li>${escapeHtml(item.name)} · ${item.score} 分${item.conflicts.length ? `（${escapeHtml(item.conflicts[0])}）` : ""}</li>`).join("") : "<li>目前沒有餐廳落在這一區。</li>"}</ul>
      </article>
    `;
  }

  function updateDiner(id, key, value) {
    diners = diners.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "avoid" || key === "craving") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function updatePlace(id, key, value) {
    places = places.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "cuisine") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addDiner() {
    if (diners.length >= 8) {
      showToast("最多先放 8 位旅伴");
      return;
    }
    diners.push(diner("新旅伴", "不吃", "想吃", 50, 700));
    renderDiners();
    renderOutput();
  }

  function addPlace() {
    if (places.length >= 10) {
      showToast("最多先放 10 間餐廳");
      return;
    }
    places.push(place("新候選餐廳", "料理類型", 600, 20, 60));
    renderPlaces();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "釜山第一晚晚餐";
    fields.count.value = "5";
    fields.policy.value = "one";
    fields.hunger.value = "66";
    diners = [
      diner("Mia", "海鮮", "烤肉", 42, 900),
      diner("阿哲", "太辣", "湯飯", 48, 700),
      diner("小雨", "內臟", "甜點", 35, 650),
      diner("Leo", "排隊太久", "炸雞", 58, 850),
      diner("我", "生食", "韓式小菜", 52, 800)
    ];
    places = [
      place("西面烤肉店", "烤肉", 780, 32, 86),
      place("老市場湯飯", "湯飯", 520, 14, 82),
      place("辣炒章魚", "海鮮 太辣", 720, 28, 48),
      place("人氣炸雞", "炸雞", 650, 46, 76),
      place("海雲台生魚片", "海鮮 生食", 950, 35, 42)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-hunger-value]").textContent = fields.hunger.value;
    renderDiners();
    renderPlaces();
    renderOutput();
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    const suffix = input.dataset.key === "price" || input.dataset.key === "budget" ? "元" : input.dataset.key === "wait" ? "分" : "";
    label.innerHTML = `${label.textContent.replace(/\s\\d+(元|分)?$/, "")} <strong>${input.value}${suffix}</strong>`;
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

  dinersNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-diner-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateDiner(row.dataset.dinerId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  placesNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-place-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updatePlace(row.dataset.placeId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  dinersNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-diner]");
    if (!remove) return;
    if (diners.length <= 2) {
      showToast("至少保留 2 位旅伴");
      return;
    }
    const row = remove.closest("[data-diner-id]");
    diners = diners.filter((item) => item.id !== row.dataset.dinerId);
    renderDiners();
    renderOutput();
  });

  placesNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-place]");
    if (!remove) return;
    if (places.length <= 2) {
      showToast("至少保留 2 間餐廳");
      return;
    }
    const row = remove.closest("[data-place-id]");
    places = places.filter((item) => item.id !== row.dataset.placeId);
    renderPlaces();
    renderOutput();
  });

  document.querySelector("[data-add-diner]").addEventListener("click", addDiner);
  document.querySelector("[data-add-place]").addEventListener("click", addPlace);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.hunger) document.querySelector("[data-hunger-value]").textContent = fields.hunger.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
