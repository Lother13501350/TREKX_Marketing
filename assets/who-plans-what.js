(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const peopleNode = document.querySelector("[data-people]");
  const tasksNode = document.querySelector("[data-tasks]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    countdown: document.querySelector("[data-countdown]"),
    pressure: document.querySelector("[data-pressure]"),
    reply: document.querySelector("[data-reply]")
  };

  const categories = ["餐廳", "交通", "住宿", "拍照", "預算", "備案"];

  let people = [
    person("Mia", "餐廳", 70, 82),
    person("阿哲", "交通", 64, 76),
    person("小雨", "拍照", 58, 68),
    person("我", "備案", 78, 86)
  ];

  let tasks = [
    task("找三間晚餐候選", "餐廳", 66, 72),
    task("確認機場到市區交通", "交通", 78, 64),
    task("住宿比價與取消規則", "住宿", 72, 70),
    task("整理拍照點與雨天備案", "拍照", 54, 84),
    task("估每人預算上限", "預算", 82, 62),
    task("做一天太累時的替代路線", "備案", 68, 76)
  ];

  function person(name, strength, capacity, decisiveness) {
    return { id: crypto.randomUUID(), name, strength, capacity, decisiveness };
  }

  function task(title, category, difficulty, urgency) {
    return { id: crypto.randomUUID(), title, category, difficulty, urgency };
  }

  function renderPeople() {
    peopleNode.innerHTML = people.map((item) => `
      <article class="wp-person" data-person-id="${escapeAttr(item.id)}">
        <label class="wp-person-field">
          <span>成員</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="成員名稱">
        </label>
        <label class="wp-person-select">
          <span>擅長</span>
          <select data-key="strength" aria-label="擅長項目">
            ${categories.map((category) => `<option value="${escapeAttr(category)}"${category === item.strength ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}
          </select>
        </label>
        ${slider("capacity", "可投入", item.capacity)}
        ${slider("decisiveness", "決斷力", item.decisiveness)}
        <button class="wp-remove" type="button" data-remove-person aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderTasks() {
    tasksNode.innerHTML = tasks.map((item) => `
      <article class="wp-task" data-task-id="${escapeAttr(item.id)}">
        <label class="wp-task-field">
          <span>任務</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="任務名稱">
        </label>
        <label class="wp-task-select">
          <span>類型</span>
          <select data-key="category" aria-label="任務類型">
            ${categories.map((category) => `<option value="${escapeAttr(category)}"${category === item.category ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}
          </select>
        </label>
        ${taskSlider("difficulty", "難度", item.difficulty)}
        ${taskSlider("urgency", "急迫", item.urgency)}
        <button class="wp-remove" type="button" data-remove-task aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    return `
      <label class="wp-person-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function taskSlider(key, label, value) {
    return `
      <label class="wp-task-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function assignTasks() {
    const loads = new Map(people.map((item) => [item.id, { person: item, tasks: [], load: 0 }]));
    const orderedTasks = [...tasks].sort((a, b) => b.urgency + b.difficulty - (a.urgency + a.difficulty));

    orderedTasks.forEach((taskItem, taskIndex) => {
      const candidates = people.map((personItem) => {
        const current = loads.get(personItem.id);
        const match = personItem.strength === taskItem.category ? 28 : 0;
        const capacity = personItem.capacity * 0.32;
        const decisiveness = personItem.decisiveness * 0.22;
        const loadPenalty = current.load * 0.52;
        const tieBreak = stableTie(`${personItem.name}-${taskItem.title}-${taskIndex}`);
        return { person: personItem, fit: match + capacity + decisiveness - loadPenalty + tieBreak };
      }).sort((a, b) => b.fit - a.fit);

      const winner = loads.get(candidates[0].person.id);
      winner.tasks.push(taskItem);
      winner.load += Math.round((taskItem.difficulty + taskItem.urgency) / 2);
    });

    return [...loads.values()];
  }

  function stableTie(text) {
    let total = 0;
    for (let index = 0; index < text.length; index += 1) total += text.charCodeAt(index) * (index + 1);
    return (total % 9) / 10;
  }

  function fairnessScore(assignments) {
    const loads = assignments.map((item) => item.load);
    const max = Math.max(...loads);
    const min = Math.min(...loads);
    const replyPenalty = Number(fields.reply.value) < 40 ? 8 : 0;
    const pressurePenalty = fields.pressure.value === "high" ? 6 : 0;
    return Math.max(1, Math.min(99, Math.round(96 - (max - min) * 0.45 - replyPenalty - pressurePenalty)));
  }

  function profile(score) {
    if (score >= 78) return ["分工可以直接公告", "任務負載接近平均，主揪只需要設定回報期限，不必再自己全包。"];
    if (score >= 58) return ["需要指定回報節點", "分工大致可行，但有幾個任務較重，建議設中途檢查點。"];
    return ["主揪仍有過載風險", "任務分配落差偏大，請減少任務或把最重的任務拆成兩段。"];
  }

  function riskList(assignments) {
    const sorted = [...assignments].sort((a, b) => b.load - a.load);
    const heaviest = sorted[0];
    const emptiest = sorted[sorted.length - 1];
    const risks = [
      `${heaviest.person.name} 負載最高，請把他的任務回報期限設得更早。`,
      `${emptiest.person.name} 負載最低，可以當備援或提醒大家回覆。`,
      `出發倒數 ${fields.countdown.value} 天，所有高急迫任務應該在一週內確認。`
    ];
    if (Number(fields.reply.value) < 45) risks.push("群組回覆偏慢，公告要用可以直接回覆的格式，不要開放長篇討論。");
    if (fields.pressure.value === "high") risks.push("主揪壓力已經偏高，請把預算、住宿或交通其中一項交出去，不要再自己確認。");
    return risks;
  }

  function shareCopy(score, title, assignments) {
    const lines = assignments
      .filter((item) => item.tasks.length)
      .map((item) => `${item.person.name}：${item.tasks.map((taskItem) => taskItem.title).join("、")}`)
      .join(" / ");
    return `我用 ChillOut 旅行分工抽籤排好了：${fields.trip.value || "這趟旅行"} 是「${title}」，公平分 ${score}/100。分工：${lines}。大家只要照自己負責的項目回覆進度就好。`;
  }

  function promptFor(score, title, assignments, risks) {
    const assignmentText = assignments
      .filter((item) => item.tasks.length)
      .map((item) => `${item.person.name} 負責 ${item.tasks.map((taskItem) => taskItem.title).join("、")}`)
      .join("；");
    return `請用 ChillOut 幫我們整理 ${fields.trip.value || "多人旅行"} 的行前分工與行程生成任務。出發倒數 ${fields.countdown.value} 天，分工結果是「${title}」，公平分 ${score}/100。分工如下：${assignmentText}。請把每個人的任務轉成可執行清單、回報期限、需要的資料，以及最後要丟進 ChillOut 生成完整行程的資料格式。注意事項：${risks.join("；")}。`;
  }

  function renderOutput() {
    if (!people.length || !tasks.length) {
      outputNode.innerHTML = `<div class="wp-empty">先加入成員與任務，這裡會生成分工表、負載風險、群組公告與 ChillOut prompt。</div>`;
      return;
    }

    const assignments = assignTasks();
    const score = fairnessScore(assignments);
    const [title, description] = profile(score);
    const risks = riskList(assignments);
    const share = shareCopy(score, title, assignments);
    const prompt = promptFor(score, title, assignments, risks);

    outputNode.innerHTML = `
      <div class="wp-summary">
        <div>
          <small>T025 who plans what</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這份分工表會盡量把高難度任務交給擅長且可投入的人，同時避免同一個人被塞滿。</p>
        </div>
        <div class="wp-score" aria-label="分工公平分">${score}</div>
      </div>

      <div class="wp-assignments">
        ${assignments.map((item) => `
          <article class="wp-assignee">
            <span>Load ${item.load}</span>
            <h3>${escapeHtml(item.person.name)}</h3>
            <ul>${item.tasks.length ? item.tasks.map((taskItem) => `<li>${escapeHtml(taskItem.title)} · ${escapeHtml(taskItem.category)}</li>`).join("") : "<li>擔任備援與提醒</li>"}</ul>
          </article>
        `).join("")}
      </div>

      <div class="wp-brief">
        <section>
          <h3>負載風險</h3>
          <ul>${risks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="wp-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="wp-result-actions">
        <button type="button" class="wp-button" data-copy-share>複製群組公告</button>
        <button type="button" class="wp-button" data-copy-prompt>複製 Prompt</button>
        <a class="wp-button wp-primary" data-app-link href="${appStore}?ct=tool_who_plans_what_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updatePerson(id, key, value) {
    people = people.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "strength") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function updateTask(id, key, value) {
    tasks = tasks.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "category") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addPerson() {
    if (people.length >= 8) {
      showToast("最多先放 8 位成員");
      return;
    }
    people.push(person("新成員", "備案", 55, 55));
    renderPeople();
    renderOutput();
  }

  function addTask() {
    if (tasks.length >= 12) {
      showToast("最多先放 12 個任務");
      return;
    }
    tasks.push(task("新任務", "備案", 55, 55));
    renderTasks();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "五人首爾生日旅行";
    fields.countdown.value = "18";
    fields.pressure.value = "mid";
    fields.reply.value = "52";
    people = [
      person("Mia", "餐廳", 74, 82),
      person("阿哲", "交通", 68, 78),
      person("小雨", "拍照", 62, 72),
      person("Leo", "預算", 70, 76),
      person("我", "備案", 82, 88)
    ];
    tasks = [
      task("晚餐候選與訂位", "餐廳", 72, 80),
      task("機場快線與市區交通", "交通", 76, 70),
      task("住宿取消規則確認", "住宿", 68, 78),
      task("生日拍照點路線", "拍照", 58, 82),
      task("每人預算試算", "預算", 82, 68),
      task("雨天與太累備案", "備案", 64, 76)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-reply-value]").textContent = fields.reply.value;
    renderPeople();
    renderTasks();
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

  peopleNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-person-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updatePerson(row.dataset.personId, key, event.target.value);
    renderOutput();
  });

  tasksNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-task-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateTask(row.dataset.taskId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
    renderOutput();
  });

  tasksNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-task-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateTask(row.dataset.taskId, key, event.target.value);
    renderOutput();
  });

  peopleNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-person]");
    if (!remove) return;
    if (people.length <= 2) {
      showToast("至少保留 2 位成員");
      return;
    }
    const row = remove.closest("[data-person-id]");
    people = people.filter((item) => item.id !== row.dataset.personId);
    renderPeople();
    renderOutput();
  });

  tasksNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-task]");
    if (!remove) return;
    if (tasks.length <= 2) {
      showToast("至少保留 2 個任務");
      return;
    }
    const row = remove.closest("[data-task-id]");
    tasks = tasks.filter((item) => item.id !== row.dataset.taskId);
    renderTasks();
    renderOutput();
  });

  document.querySelector("[data-add-person]").addEventListener("click", addPerson);
  document.querySelector("[data-add-task]").addEventListener("click", addTask);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.reply) document.querySelector("[data-reply-value]").textContent = fields.reply.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
