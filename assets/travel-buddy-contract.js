(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    people: document.querySelector("[data-people]"),
    budget: document.querySelector("[data-budget]"),
    wake: document.querySelector("[data-wake]"),
    food: document.querySelector("[data-food]"),
    split: document.querySelector("[data-split]"),
    photo: document.querySelector("[data-photo]"),
    alone: document.querySelector("[data-alone]"),
    decision: document.querySelector("[data-decision]"),
    conflict: document.querySelector("[data-conflict]")
  };

  function people() {
    return fields.people.value
      .split(/[、,，\s]+/)
      .map((name) => name.trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  function clauseData() {
    const names = people();
    const lead = names[0] || "主揪";
    const clauses = [
      ["預算", budgetClause()],
      ["作息", wakeClause()],
      ["吃飯", foodClause()],
      ["拍照", Number(fields.photo.value) >= 70 ? "拍照點每站最多 15 分鐘，想重拍要先問旅伴。" : "拍照不是主線，看到好畫面再停。"],
      ["放風", Number(fields.alone.value) >= 60 ? "每天保留一段各自行動，集合點和時間先講好。" : "行程以一起行動為主，有需要獨處要提前說。"],
      ["決策", decisionClause(lead)],
      ["分帳", splitClause()],
      ["雷點", conflictClause()]
    ];
    return clauses;
  }

  function budgetClause() {
    if (fields.budget.value === "large") return "高低預算分開列：必花、可選、奢侈三層，不用每一餐都一起。";
    if (fields.budget.value === "some") return "共同項目先抓上限，超過就投票或各付各的。";
    return "預算一致，可以先決定每日共同支出上限。";
  }

  function wakeClause() {
    if (fields.wake.value === "early") return "早起行程只排給願意早起的人，其他人可自行會合。";
    if (fields.wake.value === "late") return "上午不排不可錯過行程，第一個硬行程放中午後。";
    return "出門時間以前一晚確認為準，遲到超過 15 分鐘可先走。";
  }

  function foodClause() {
    if (fields.food.value === "splurge") return "想吃好的餐先訂位，其他餐用輕食或小吃平衡預算。";
    if (fields.food.value === "budget") return "以平價餐與市場小吃為主，高價餐需全員同意。";
    return "一天最多一餐需要排隊或訂位，其餘以順路方便為主。";
  }

  function decisionClause(lead) {
    if (fields.decision.value === "owner") return `${lead} 是今日主揪，分歧超過 5 分鐘就由主揪定案。`;
    if (fields.decision.value === "rotate") return "每天輪流一位主揪，當天主揪有最後決策權。";
    return "重大分歧投票，平手時選交通最順或預算最低的方案。";
  }

  function splitClause() {
    if (fields.split.value === "each") return "吃飯與購物各付各的，共用交通和住宿才平均。";
    if (fields.split.value === "record") return "一人先記帳，每晚 5 分鐘對帳，避免回國後算不清。";
    return "共同支出平均分，個人升級或加點自己付。";
  }

  function conflictClause() {
    const map = {
      late: "遲到先道歉再處理；不讓全團等一個人超過 15 分鐘。",
      money: "任何超過共同預算的項目先講清楚，不用不好意思。",
      photo: "拍照需求明講，耐心用完就換下一站。",
      solo: "想放風不是不合群，但集合時間和地點要明確。"
    };
    return map[fields.conflict.value];
  }

  function pactScore() {
    let score = 72;
    if (fields.budget.value === "same") score += 8;
    if (fields.budget.value === "large") score -= 10;
    if (Number(fields.alone.value) > 75) score -= 4;
    if (fields.decision.value !== "vote") score += 5;
    if (fields.split.value === "record") score += 6;
    return Math.max(45, Math.min(98, score));
  }

  function promptFor(clauses, score) {
    return `請用 ChillOut 幫我們依照旅行搭子合約安排一趟共識版行程。旅伴：${people().join("、") || "尚未填寫"}。共識分數 ${score}/100。條款包含：${clauses.map((item) => `${item[0]}：${item[1]}`).join("；")}。請輸出適合我們的每日節奏、可一起行動的主線、各自放風段落、共同預算提醒、分帳提醒、容易吵架時的替代方案，以及可貼到群組的行前確認訊息。`;
  }

  function render() {
    document.querySelector('[data-value="photo"]').textContent = fields.photo.value;
    document.querySelector('[data-value="alone"]').textContent = fields.alone.value;

    const names = people();
    const clauses = clauseData();
    const score = pactScore();
    const prompt = promptFor(clauses, score);
    const share = `我們的 ChillOut 旅行搭子合約完成，共識分數 ${score}/100。好旅伴不是不吵架，是有事先說清楚。`;

    result.innerHTML = `
      <div class="bc-contract">
        <small>T021 travel buddy pact</small>
        <h2>出發前共識合約</h2>
        <p>共識分數 ${score}/100。這張不是要控制旅伴，是把最容易吵的點先講清楚。</p>
        <div class="bc-people">${(names.length ? names : ["我", "旅伴"]).map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div>
      </div>
      <div class="bc-clauses">
        ${clauses.map((item, index) => `
          <article class="bc-clause">
            <span>clause ${index + 1}</span>
            <h3>${escapeHtml(item[0])}</h3>
            <p>${escapeHtml(item[1])}</p>
          </article>
        `).join("")}
      </div>
      <div class="bc-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="bc-result-actions">
        <button class="bc-button" type="button" data-copy-share>複製分享文案</button>
        <button class="bc-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="bc-button bc-primary" data-app-link href="${appStore}?ct=tool_travel_buddy_contract_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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

  document.querySelector("[data-sample]").addEventListener("click", () => {
    fields.people.value = "我、阿哲、小雨、Mia";
    fields.budget.value = "some";
    fields.wake.value = "normal";
    fields.food.value = "balanced";
    fields.split.value = "equal";
    fields.photo.value = "55";
    fields.alone.value = "64";
    fields.decision.value = "vote";
    fields.conflict.value = "money";
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  render();
})();
