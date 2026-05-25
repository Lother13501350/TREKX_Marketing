(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const peopleNode = document.querySelector("[data-people]");
  const expensesNode = document.querySelector("[data-expenses]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    days: document.querySelector("[data-days]"),
    currency: document.querySelector("[data-currency]"),
    sensitivity: document.querySelector("[data-sensitivity]")
  };

  const kinds = ["住宿", "餐飲", "交通", "門票", "購物", "備用金"];

  let people = [
    traveler("Mia", 2800, 4200),
    traveler("阿哲", 2400, 3600),
    traveler("小雨", 1800, 2800),
    traveler("我", 2600, 4000)
  ];

  let expenses = [
    expense("住宿每人每晚", "住宿", 1200, 1700),
    expense("三餐與咖啡每日", "餐飲", 900, 1400),
    expense("市區交通每日", "交通", 280, 500),
    expense("門票與體驗每日", "門票", 450, 900),
    expense("共同備用金每日", "備用金", 200, 400)
  ];

  function traveler(name, comfort, maximum) {
    return { id: crypto.randomUUID(), name, comfort, maximum };
  }

  function expense(title, kind, basic, stretch) {
    return { id: crypto.randomUUID(), title, kind, basic, stretch };
  }

  function renderPeople() {
    peopleNode.innerHTML = people.map((item) => `
      <article class="bt-person" data-person-id="${escapeAttr(item.id)}">
        <label class="bt-person-field">
          <span>旅伴</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="旅伴名稱">
        </label>
        ${moneySlider("comfort", "舒服花", item.comfort, 800, 8000)}
        ${moneySlider("maximum", "最多可接受", item.maximum, 1200, 12000)}
        <button class="bt-remove" type="button" data-remove-person aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderExpenses() {
    expensesNode.innerHTML = expenses.map((item) => `
      <article class="bt-expense" data-expense-id="${escapeAttr(item.id)}">
        <label class="bt-expense-field">
          <span>支出項目</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="支出項目">
        </label>
        <label class="bt-expense-select">
          <span>類型</span>
          <select data-key="kind" aria-label="支出類型">
            ${kinds.map((kind) => `<option value="${escapeAttr(kind)}"${kind === item.kind ? " selected" : ""}>${escapeHtml(kind)}</option>`).join("")}
          </select>
        </label>
        ${moneySlider("basic", "基本", item.basic, 0, 5000)}
        ${moneySlider("stretch", "升級", item.stretch, 0, 8000)}
        <button class="bt-remove" type="button" data-remove-expense aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function moneySlider(key, label, value, min, max) {
    return `
      <label class="bt-person-slider bt-expense-slider">
        <span>${label} <strong>${money(value)}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" step="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function plannedDaily(mode) {
    const key = mode === "stretch" ? "stretch" : "basic";
    return expenses.reduce((sum, item) => sum + Number(item[key]), 0);
  }

  function lowestMaximum() {
    return [...people].sort((a, b) => Number(a.maximum) - Number(b.maximum))[0];
  }

  function lowestComfort() {
    return [...people].sort((a, b) => Number(a.comfort) - Number(b.comfort))[0];
  }

  function averageComfort() {
    return Math.round(people.reduce((sum, item) => sum + Number(item.comfort), 0) / Math.max(1, people.length));
  }

  function treatyScore() {
    const basic = plannedDaily("basic");
    const stretch = plannedDaily("stretch");
    const limit = lowestMaximum().maximum;
    const comfort = averageComfort();
    const pressure = Math.max(0, basic - comfort) * 0.016 + Math.max(0, stretch - limit) * 0.012;
    const sensitivityPenalty = Number(fields.sensitivity.value) > 70 ? 7 : 0;
    return Math.max(1, Math.min(99, Math.round(94 - pressure - sensitivityPenalty)));
  }

  function profile(score) {
    if (score >= 78) return ["預算可以先公告", "共同支出落在多數人的舒適範圍內，只要把自費與升級項目切開就不容易尷尬。"];
    if (score >= 58) return ["要先劃清共同上限", "基本款可以成行，但升級款會碰到部分旅伴的上限，需要先談哪些算共同支出。"];
    return ["需要重排支出", "目前預算壓力偏高，建議把住宿或餐飲降一級，否則旅途中很容易累積不舒服。"];
  }

  function rules(score) {
    const basic = plannedDaily("basic");
    const stretch = plannedDaily("stretch");
    const limitPerson = lowestMaximum();
    const comfortPerson = lowestComfort();
    const list = [
      `共同支出先以每日 ${money(basic)} 為公告版本，不要用升級款當預設。`,
      `${limitPerson.name} 的最高上限最低，任何超過每日 ${money(limitPerson.maximum)} 的安排都要先問。`,
      `${comfortPerson.name} 的舒適預算最低，餐飲與交通要保留平價替代選項。`
    ];
    if (stretch > limitPerson.maximum) list.push(`升級款每日 ${money(stretch)} 已超過最低上限，請改成「想升級的人自費」。`);
    if (Number(fields.sensitivity.value) > 65) list.push("分帳敏感度偏高，請先約定誰先付款、多久結清、用哪個分帳 App。");
    if (score < 58) list.push("如果要保留體驗或門票，就先從住宿或餐飲降級，不要每一項都升級。");
    return list;
  }

  function shareCopy(score, title, rulesList) {
    return `我用 ChillOut 預算和平協議算過了：${fields.trip.value || "這趟旅行"} 是「${title}」，預算安全分 ${score}/100。共同支出先用每日 ${money(plannedDaily("basic"))}，升級或購物各自自費。重點規則：${rulesList.slice(0, 2).join(" / ")}`;
  }

  function promptFor(score, title, rulesList) {
    const peopleText = people.map((item) => `${item.name} 舒服花 ${money(item.comfort)}、最多 ${money(item.maximum)}`).join("；");
    const expenseText = expenses.map((item) => `${item.title} 基本 ${money(item.basic)}、升級 ${money(item.stretch)}`).join("；");
    return `請用 ChillOut 幫我們規劃 ${fields.trip.value || "多人旅行"}，天數 ${fields.days.value} 天。旅伴預算：${peopleText}。共同支出估算：${expenseText}。預算協議結果是「${title}」，安全分 ${score}/100。請依照這些規則排路線與餐廳：${rulesList.join("；")}。請輸出基本版行程、可升級自費項目、每天預算表、分帳提醒，以及如果有人覺得太貴時的替代方案。`;
  }

  function renderOutput() {
    if (!people.length || !expenses.length) {
      outputNode.innerHTML = `<div class="bt-empty">先加入旅伴與共同支出，這裡會生成預算協議、分帳規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = treatyScore();
    const [title, description] = profile(score);
    const rulesList = rules(score);
    const share = shareCopy(score, title, rulesList);
    const prompt = promptFor(score, title, rulesList);
    const days = Math.max(1, Number(fields.days.value || 1));

    outputNode.innerHTML = `
      <div class="bt-summary">
        <div>
          <small>T026 budget peace treaty</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這份協議的目的不是限制玩法，而是讓共同支出和自費升級分得清楚。</p>
        </div>
        <div class="bt-score" aria-label="預算安全分">${score}</div>
      </div>

      <div class="bt-budget-line">
        <article class="bt-budget-cell">
          <span>Basic daily</span>
          <h3>${money(plannedDaily("basic"))}</h3>
          <p>建議公告給所有人的每日共同支出。</p>
        </article>
        <article class="bt-budget-cell">
          <span>Stretch daily</span>
          <h3>${money(plannedDaily("stretch"))}</h3>
          <p>想升級時的每日版本，適合改成自費。</p>
        </article>
        <article class="bt-budget-cell">
          <span>Trip base</span>
          <h3>${money(plannedDaily("basic") * days)}</h3>
          <p>${days} 天共同支出基本估算。</p>
        </article>
        <article class="bt-budget-cell">
          <span>Protected person</span>
          <h3>${escapeHtml(lowestMaximum().name)}</h3>
          <p>用他的最高上限當作共同支出的天花板。</p>
        </article>
      </div>

      <div class="bt-rules">
        <section>
          <h3>協議規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="bt-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="bt-result-actions">
        <button type="button" class="bt-button" data-copy-share>複製群組公告</button>
        <button type="button" class="bt-button" data-copy-prompt>複製 Prompt</button>
        <a class="bt-button bt-primary" data-app-link href="${appStore}?ct=tool_budget_peace_treaty_manual_${score}">丟進 ChillOut</a>
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

  function updateExpense(id, key, value) {
    expenses = expenses.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "kind") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addPerson() {
    if (people.length >= 8) {
      showToast("最多先放 8 位旅伴");
      return;
    }
    people.push(traveler("新旅伴", 2200, 3400));
    renderPeople();
    renderOutput();
  }

  function addExpense() {
    if (expenses.length >= 10) {
      showToast("最多先放 10 個支出項目");
      return;
    }
    expenses.push(expense("新共同支出", "備用金", 300, 600));
    renderExpenses();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "東京朋友四日";
    fields.days.value = "4";
    fields.currency.value = "NT$";
    fields.sensitivity.value = "72";
    people = [
      traveler("Mia", 3000, 4600),
      traveler("阿哲", 2600, 3800),
      traveler("小雨", 1900, 3000),
      traveler("Leo", 2400, 3600),
      traveler("我", 2800, 4200)
    ];
    expenses = [
      expense("住宿每人每晚", "住宿", 1300, 2100),
      expense("三餐與咖啡每日", "餐飲", 1000, 1600),
      expense("市區交通每日", "交通", 320, 520),
      expense("展覽與體驗每日", "門票", 550, 950),
      expense("共同備用金每日", "備用金", 250, 500)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-sensitivity-value]").textContent = fields.sensitivity.value;
    renderPeople();
    renderExpenses();
    renderOutput();
  }

  function money(value) {
    const number = Number(value || 0);
    return `${fields.currency.value} ${number.toLocaleString("en-US")}`;
  }

  function updateSliderLabel(input) {
    const label = input.previousElementSibling;
    if (!label) return;
    label.innerHTML = `${label.textContent.replace(/\s(?:NT\\$|JPY|KRW|USD)?\\s?[\\d,]+$/, "")} <strong>${money(input.value)}</strong>`;
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

  expensesNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-expense-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateExpense(row.dataset.expenseId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  expensesNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-expense-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateExpense(row.dataset.expenseId, key, event.target.value);
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

  expensesNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-expense]");
    if (!remove) return;
    if (expenses.length <= 2) {
      showToast("至少保留 2 個支出項目");
      return;
    }
    const row = remove.closest("[data-expense-id]");
    expenses = expenses.filter((item) => item.id !== row.dataset.expenseId);
    renderExpenses();
    renderOutput();
  });

  document.querySelector("[data-add-person]").addEventListener("click", addPerson);
  document.querySelector("[data-add-expense]").addEventListener("click", addExpense);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.sensitivity) document.querySelector("[data-sensitivity-value]").textContent = fields.sensitivity.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
