(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const membersNode = document.querySelector("[data-members]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    days: document.querySelector("[data-days]"),
    city: document.querySelector("[data-city]"),
    goal: document.querySelector("[data-goal]"),
    weather: document.querySelector("[data-weather]")
  };

  const roles = ["長輩", "小孩", "年輕人", "爸媽", "需要照顧者"];

  let members = [
    member("阿公", "長輩", 52, 42, 70, 64, 38),
    member("媽媽", "爸媽", 72, 66, 55, 54, 74),
    member("小安", "小孩", 68, 74, 62, 82, 58),
    member("我", "年輕人", 84, 80, 44, 50, 86)
  ];

  function member(name, role, stamina, walk, rest, heat, flexibility) {
    return { id: crypto.randomUUID(), name, role, stamina, walk, rest, heat, flexibility };
  }

  function renderMembers() {
    membersNode.innerHTML = members.map((item) => `
      <article class="fe-member" data-id="${escapeAttr(item.id)}">
        <label class="fe-name">
          <span>成員</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="成員名稱">
        </label>
        <label class="fe-role">
          <span>角色</span>
          <select data-key="role" aria-label="角色">
            ${roles.map((role) => `<option value="${escapeAttr(role)}"${role === item.role ? " selected" : ""}>${escapeHtml(role)}</option>`).join("")}
          </select>
        </label>
        ${slider("stamina", "體力", item.stamina)}
        ${slider("walk", "步行", item.walk)}
        ${slider("rest", "午休需求", item.rest)}
        ${slider("heat", "耐熱", item.heat)}
        ${slider("flexibility", "彈性", item.flexibility)}
        <button class="fe-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    return `
      <label class="fe-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function lowest(key) {
    return [...members].sort((a, b) => Number(a[key]) - Number(b[key]))[0];
  }

  function highest(key) {
    return [...members].sort((a, b) => Number(b[key]) - Number(a[key]))[0];
  }

  function average(key) {
    return Math.round(members.reduce((sum, item) => sum + Number(item[key]), 0) / Math.max(1, members.length));
  }

  function groupScore() {
    const stamina = average("stamina");
    const walk = average("walk");
    const heat = average("heat");
    const restPressure = average("rest");
    const weatherPenalty = Number(fields.weather.value) > 65 ? 8 : 0;
    const score = stamina * 0.28 + walk * 0.24 + heat * 0.18 + (100 - restPressure) * 0.18 + average("flexibility") * 0.12 - weatherPenalty;
    return Math.max(1, Math.min(99, Math.round(score)));
  }

  function rhythm(score) {
    const weakest = lowest("stamina");
    const walkLimit = lowest("walk");
    const restNeed = highest("rest");
    const heatRisk = Number(fields.weather.value) > 66 || average("heat") < 58;
    const morningPower = Math.min(92, Math.round((average("stamina") + average("walk")) / 2 + 8));
    const noonPower = Math.max(24, Math.round(100 - restNeed.rest - (heatRisk ? 8 : 0)));
    const eveningPower = Math.max(30, Math.round((average("flexibility") + average("stamina")) / 2 - 6));

    return {
      weakest,
      walkLimit,
      restNeed,
      heatRisk,
      parts: [
        {
          time: "上午",
          title: morningPower >= 70 ? "主景點放上午" : "上午也要輕量",
          value: morningPower,
          copy: `${walkLimit.name} 的步行耐受最低，上午只放一個主景點，並把交通轉乘控制在兩次內。`
        },
        {
          time: "午後",
          title: restNeed.rest >= 65 ? "必排室內休息" : "低強度慢逛",
          value: noonPower,
          copy: `${restNeed.name} 午休需求最高，午後安排咖啡廳、飯店回房、商場或短距離室內點。`
        },
        {
          time: "晚間",
          title: eveningPower >= 62 ? "保留一段回憶點" : "晚餐後收尾",
          value: eveningPower,
          copy: `晚間以吃飯和散步收尾，不再追加需要排隊或長時間站立的景點。`
        }
      ]
    };
  }

  function profile(score) {
    if (score >= 72) return ["可安排一主一輔", "這團整體體力足夠，但仍需要把休息點寫進行程，不要臨場硬撐。"];
    if (score >= 52) return ["要用低壓節奏", "行程可以成行，但每天只能有一個真正的主線，其餘用短距離備案補足。"];
    return ["需要保守設計", "這團的體力落差大，建議先以舒適移動、室內休息和短景點作為核心。"];
  }

  function careRules(map) {
    const rules = [
      `${map.weakest.name} 是體力下限，任何需要連續走 40 分鐘以上的點都要有計程車或室內備案。`,
      `${map.walkLimit.name} 是步行下限，每天的主景點之間要留至少 30 分鐘移動緩衝。`,
      `${map.restNeed.name} 午休需求最高，午後不要安排不可取消的預約。`
    ];
    if (map.heatRisk) rules.push("天氣壓力偏高，12:00 到 15:00 優先放室內、冷氣、坐著的行程。");
    if (fields.goal.value === "memory") rules.push("如果要拍照，把漂亮景點排在上午，大家精神最好也比較不會煩。");
    if (fields.goal.value === "kids") rules.push("小孩放電點要靠近休息點，避免放完電之後還要長距離移動。");
    return rules;
  }

  function shareCopy(score, title, map) {
    return `我用 ChillOut 家族體力地圖排過了：${fields.trip.value || "這趟家庭旅行"} 是「${title}」，體力安全分 ${score}/100。上午放主景點，午後照顧 ${map.restNeed.name} 的休息需求，晚間用吃飯和散步收尾。`;
  }

  function promptFor(score, title, map, rules) {
    const memberText = members.map((item) => `${item.name}（${item.role}，體力 ${item.stamina}，步行 ${item.walk}，午休 ${item.rest}，耐熱 ${item.heat}）`).join("、");
    return `請用 ChillOut 幫我規劃 ${fields.trip.value || "家庭旅行"}。城市：${fields.city.value || "尚未決定"}，天數 ${fields.days.value} 天，同行成員：${memberText}。體力地圖結果是「${title}」，安全分 ${score}/100。請遵守這些規則：${rules.join("；")}。每天安排上午主景點、午後休息或室內點、晚間低壓收尾，並提供雨天或太累時的備案。`;
  }

  function renderOutput() {
    if (!members.length) {
      outputNode.innerHTML = `<div class="fe-empty">先加入同行成員，這裡會生成家庭旅遊的強弱節奏、照顧規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = groupScore();
    const map = rhythm(score);
    const [title, description] = profile(score);
    const rules = careRules(map);
    const prompt = promptFor(score, title, map, rules);
    const share = shareCopy(score, title, map);

    outputNode.innerHTML = `
      <div class="fe-summary">
        <div>
          <small>T024 family energy map</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 這張表的基準不是最多景點，而是最容易累的成員也能走完。</p>
        </div>
        <div class="fe-score" aria-label="體力安全分">${score}</div>
      </div>

      <div class="fe-dayparts">
        ${map.parts.map((part) => `
          <article class="fe-daypart">
            <span>${escapeHtml(part.time)}</span>
            <h3>${escapeHtml(part.title)}</h3>
            <p>${escapeHtml(part.copy)}</p>
            <div class="fe-bar" aria-label="${escapeAttr(part.time)}強度 ${part.value}">
              <i style="--value:${part.value}%"></i>
            </div>
          </article>
        `).join("")}
      </div>

      <div class="fe-care">
        <section>
          <h3>照顧規則</h3>
          <ul>${rules.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>家庭群組訊息</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="fe-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="fe-result-actions">
        <button type="button" class="fe-button" data-copy-share>複製群組訊息</button>
        <button type="button" class="fe-button" data-copy-prompt>複製 Prompt</button>
        <a class="fe-button fe-primary" data-app-link href="${appStore}?ct=tool_family_energy_map_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateMember(id, key, value) {
    members = members.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "role") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addMember() {
    if (members.length >= 8) {
      showToast("最多先放 8 位成員");
      return;
    }
    members.push(member("新成員", "年輕人", 60, 60, 50, 60, 60));
    renderMembers();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "暑假三代同堂九州行";
    fields.days.value = "5";
    fields.city.value = "福岡、由布院";
    fields.goal.value = "comfort";
    fields.weather.value = "64";
    members = [
      member("阿嬤", "長輩", 46, 38, 78, 42, 34),
      member("爸爸", "爸媽", 74, 70, 48, 58, 72),
      member("媽媽", "爸媽", 68, 62, 56, 54, 70),
      member("小恩", "小孩", 66, 72, 60, 70, 52),
      member("我", "年輕人", 86, 82, 38, 66, 88)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-weather-value]").textContent = fields.weather.value;
    renderMembers();
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
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1300);
  }

  membersNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateMember(row.dataset.id, key, event.target.value);
    const label = event.target.previousElementSibling;
    if (event.target.type === "range" && label) {
      label.innerHTML = `${label.textContent.replace(/\s\d+$/, "")} <strong>${event.target.value}</strong>`;
    }
    renderOutput();
  });

  membersNode.addEventListener("change", (event) => {
    const row = event.target.closest("[data-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateMember(row.dataset.id, key, event.target.value);
    renderOutput();
  });

  membersNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove]");
    if (!remove) return;
    if (members.length <= 2) {
      showToast("至少保留 2 位成員");
      return;
    }
    const row = remove.closest("[data-id]");
    members = members.filter((item) => item.id !== row.dataset.id);
    renderMembers();
    renderOutput();
  });

  document.querySelector("[data-add]").addEventListener("click", addMember);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.weather) document.querySelector("[data-weather-value]").textContent = fields.weather.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
