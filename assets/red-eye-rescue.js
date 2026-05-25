(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const moduleListNode = document.querySelector("[data-modules]");
  const outputNode = document.querySelector("[data-output]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    city: document.querySelector("[data-city]"),
    mode: document.querySelector("[data-mode]"),
    flightTime: document.querySelector("[data-flight-time]"),
    roomTime: document.querySelector("[data-room-time]"),
    firstThing: document.querySelector("[data-first-thing]"),
    luggage: document.querySelector("[data-luggage]"),
    fatigue: document.querySelector("[data-fatigue]"),
    shower: document.querySelector("[data-shower]"),
    locker: document.querySelector("[data-locker]")
  };
  const fatigueLabel = document.querySelector("[data-fatigue-label]");

  let modules = [
    module("先寄物", "locker", 25, 78, 18),
    module("淋浴換衣", "shower", 45, 92, 28),
    module("低咖啡因補醒", "caffeine", 18, 54, 12),
    module("90 分鐘補眠", "nap", 90, 96, 36),
    module("近站早餐", "breakfast", 40, 66, 18)
  ];

  function module(name, type, duration, recovery, friction) {
    return {
      id: crypto.randomUUID(),
      name,
      type,
      duration,
      recovery,
      friction
    };
  }

  function moduleTypes() {
    return [
      { value: "locker", label: "寄物" },
      { value: "shower", label: "淋浴" },
      { value: "nap", label: "補眠" },
      { value: "caffeine", label: "咖啡" },
      { value: "transit", label: "交通" },
      { value: "breakfast", label: "早餐" }
    ];
  }

  function typeLabel(value) {
    const found = moduleTypes().find((item) => item.value === value);
    return found ? found.label : "救援";
  }

  function renderModules() {
    moduleListNode.innerHTML = modules.map((item) => `
      <article class="rr-module" data-module-id="${escapeAttr(item.id)}">
        <label>
          模組名稱
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="模組名稱">
        </label>
        <label>
          類型
          <select data-key="type" aria-label="救援類型">
            ${moduleTypes().map((type) => `<option value="${type.value}"${type.value === item.type ? " selected" : ""}>${type.label}</option>`).join("")}
          </select>
        </label>
        ${rangeControl("duration", "耗時", item.duration, 10, 120, "分")}
        ${rangeControl("recovery", "恢復", item.recovery, 0, 100, "")}
        ${rangeControl("friction", "麻煩", item.friction, 0, 100, "")}
        <button class="rr-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function rangeControl(key, label, value, min, max, suffix) {
    return `
      <label>
        <span class="rr-mini">${label}<strong>${value}${suffix}</strong></span>
        <input data-key="${key}" type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function moduleScore(item) {
    const fatigue = Number(fields.fatigue.value);
    const luggageNeed = fields.luggage.value === "large" || fields.luggage.value === "carry";
    const lockerBonus = item.type === "locker" && luggageNeed && fields.locker.checked ? 20 : 0;
    const showerBonus = item.type === "shower" && fields.shower.checked ? 18 : 0;
    const napBonus = item.type === "nap" && fatigue > 62 ? 24 : 0;
    const caffeinePenalty = item.type === "caffeine" && fields.mode.value === "arrival" && fatigue > 78 ? 12 : 0;
    const durationPenalty = Number(item.duration) > availableWindow() / 3 ? 8 : 0;
    const base = Number(item.recovery) * 0.55 - Number(item.friction) * 0.32;
    return Math.max(1, Math.min(99, Math.round(42 + base + lockerBonus + showerBonus + napBonus - caffeinePenalty - durationPenalty)));
  }

  function availableWindow() {
    if (fields.mode.value === "arrival") return minutesBetween(fields.flightTime.value, fields.roomTime.value);
    return Math.max(120, 24 * 60 - toMinutes(fields.flightTime.value) + toMinutes(fields.roomTime.value));
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

  function rankedModules() {
    return modules.map((item) => ({ ...item, score: moduleScore(item) })).sort((a, b) => b.score - a.score);
  }

  function buildPlan() {
    const ranked = rankedModules();
    const mustHave = preferredTypes().map((type) => ranked.find((item) => item.type === type)).filter(Boolean);
    const filled = [...mustHave];
    ranked.forEach((item) => {
      if (filled.length < 3 && !filled.some((picked) => picked.id === item.id)) filled.push(item);
    });
    const chosen = filled.slice(0, 3);
    const recovery = chosen.reduce((sum, item) => sum + item.recovery, 0) / Math.max(1, chosen.length);
    const friction = chosen.reduce((sum, item) => sum + item.friction, 0) / Math.max(1, chosen.length);
    const totalDuration = chosen.reduce((sum, item) => sum + Number(item.duration), 0);
    const pressure = Math.max(0, totalDuration - availableWindow() * 0.66) / 4;
    const score = Math.max(1, Math.min(99, Math.round(52 + recovery * 0.42 - friction * 0.28 - pressure - Number(fields.fatigue.value) * 0.08)));
    return { chosen, score, totalDuration };
  }

  function preferredTypes() {
    if (fields.mode.value === "arrival") {
      const list = [];
      if (fields.locker.checked && fields.luggage.value !== "none") list.push("locker");
      if (fields.shower.checked) list.push("shower");
      list.push("nap");
      return list;
    }
    return ["locker", "transit", Number(fields.fatigue.value) > 70 ? "nap" : "caffeine"];
  }

  function profile(score) {
    if (score >= 78) return ["救援包完整", "你已經把紅眼航班最容易崩掉的三件事先處理：行李、恢復與下一段移動。"];
    if (score >= 56) return ["可以撐過，但要少貪心", "這份安排能保住狀態，不過行程應該留白，別把清晨當正常白天使用。"];
    return ["高風險紅眼", "目前疲勞、等待或行李壓力偏高，建議砍掉非必要景點，先解決睡眠和洗漱。"];
  }

  function meterText(score, plan) {
    const windowHours = Math.round(availableWindow() / 6) / 10;
    return `可用緩衝約 ${windowHours} 小時，救援模組合計 ${plan.totalDuration} 分鐘。分數越高，代表你越不需要靠意志力硬撐。`;
  }

  function timeline(plan) {
    let cursor = fields.mode.value === "arrival" ? fields.flightTime.value : addMinutes(fields.flightTime.value, -plan.totalDuration - 90);
    return plan.chosen.map((item, index) => {
      const time = index === 0 ? cursor : addMinutes(cursor, plan.chosen.slice(0, index).reduce((sum, previous) => sum + Number(previous.duration), 0));
      return {
        time,
        item,
        title: index === 0 ? "先止血" : index === 1 ? "恢復狀態" : "接回行程",
        note: stepNote(item)
      };
    });
  }

  function stepNote(item) {
    if (item.type === "locker") return "先讓手空下來，後面所有決策都會變簡單。";
    if (item.type === "shower") return "洗掉飛機上的黏與累，換衣後再進城市。";
    if (item.type === "nap") return "補眠不要超時，醒來直接接交通或第一件事。";
    if (item.type === "caffeine") return "咖啡只用來穩住清醒，不要把它當睡眠替代品。";
    if (item.type === "transit") return "先確認第一段交通，避免疲勞時臨場查路線。";
    return "選近站、好坐、不排隊的店，吃完直接回到主線。";
  }

  function noHeroics(plan) {
    const warnings = [];
    if (Number(fields.fatigue.value) > 70) warnings.push("不要安排需要大量步行或排隊的景點。");
    if (fields.luggage.value === "large" && !fields.locker.checked) warnings.push("大行李不要拖進市區亂晃，先找寄物或提早放行李。");
    if (!fields.shower.checked) warnings.push("沒有淋浴點時，至少安排換衣、洗臉與安靜早餐。");
    if (plan.score < 60) warnings.push("這趟紅眼不要追求效率，先保住下午以前的狀態。");
    if (!warnings.length) warnings.push("不要臨時加景點；多出來的時間拿來坐著、補水、整理行李。");
    return warnings.join(" ");
  }

  function shareCopy(plan, title) {
    const names = plan.chosen.map((item) => item.name).join(" → ");
    return `我用 ChillOut 紅眼航班救援包排好了：${fields.city.value} ${fields.mode.value === "arrival" ? "清晨抵達" : "深夜出發"}，救援分數 ${plan.score}/100。我的順序是 ${names}。規則：先處理行李，再恢復狀態，最後才接回 ${fields.firstThing.value}。`;
  }

  function promptFor(plan, title, steps) {
    const modulesText = modules.map((item) => `${item.name}：${typeLabel(item.type)}，耗時 ${item.duration} 分，恢復 ${item.recovery}，麻煩 ${item.friction}`).join("；");
    const stepText = steps.map((step) => `${step.time} ${step.title} ${step.item.name}`).join("；");
    return `請用 ChillOut 幫我把「紅眼航班救援包」排成可執行行程。我在 ${fields.city.value}，模式是 ${fields.mode.value === "arrival" ? "清晨抵達" : "深夜出發"}，班機時間 ${fields.flightTime.value}，住宿可進房 ${fields.roomTime.value}，隔天第一件事是 ${fields.firstThing.value}。行李狀態：${luggageLabel(fields.luggage.value)}，疲勞敏感度 ${fields.fatigue.value}/100，${fields.shower.checked ? "有淋浴點" : "沒有確定淋浴點"}，${fields.locker.checked ? "可寄物或提早放行李" : "尚未確認寄物"}。救援模組：${modulesText}。工具結果是「${title}」，救援分數 ${plan.score}/100，建議節奏：${stepText}。請補交通、寄物位置、淋浴或換衣備案、咖啡時機、補眠上限、不要硬撐的提醒。`;
  }

  function luggageLabel(value) {
    if (value === "large") return "大行李箱";
    if (value === "carry") return "登機箱";
    if (value === "backpack") return "背包";
    return "幾乎無行李";
  }

  function renderOutput() {
    if (!modules.length) {
      outputNode.innerHTML = `
        <div class="rr-empty">
          <p class="rr-kicker">Result</p>
          <h2>至少保留一個救援模組。</h2>
          <p>紅眼航班最怕空等；新增模組後才有救援節奏。</p>
        </div>
      `;
      return;
    }

    const plan = buildPlan();
    const [title, description] = profile(plan.score);
    const steps = timeline(plan);
    const share = shareCopy(plan, title);
    const prompt = promptFor(plan, title, steps);

    outputNode.innerHTML = `
      <div class="rr-result-head">
        <div>
          <p class="rr-kicker">T035 red-eye rescue</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} ${escapeHtml(meterText(plan.score, plan))}</p>
        </div>
        <div class="rr-score" aria-label="紅眼救援分數">${plan.score}</div>
      </div>
      <div class="rr-result-grid">
        <aside class="rr-meter">
          <h3>體力保留槽</h3>
          <div class="rr-meter-track" aria-hidden="true">
            <div class="rr-meter-fill" style="height: ${plan.score}%"></div>
          </div>
          <p class="rr-meter-note">${escapeHtml(noHeroics(plan))}</p>
        </aside>
        <div class="rr-timeline">
          ${steps.map((step) => `
            <article class="rr-step">
              <span>${escapeHtml(step.time)} · ${escapeHtml(step.title)}</span>
              <h3>${escapeHtml(step.item.name)}</h3>
              <p>${escapeHtml(step.note)}</p>
              <ul>
                <li>類型：${escapeHtml(typeLabel(step.item.type))}</li>
                <li>耗時 ${step.item.duration} 分 / 恢復 ${step.item.recovery}</li>
              </ul>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="rr-notes">
        <section class="rr-note-box">
          <h3>不可硬撐清單</h3>
          <p>${escapeHtml(noHeroics(plan))}</p>
        </section>
        <section class="rr-note-box">
          <h3>社群分享文</h3>
          <p>${escapeHtml(share)}</p>
        </section>
      </div>
      <section class="rr-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </section>
      <div class="rr-result-actions">
        <button type="button" data-copy-share>複製分享文</button>
        <button type="button" data-copy-prompt>複製 Prompt</button>
        <a class="rr-primary" data-app-link href="${appStore}?ct=tool_red_eye_rescue_manual_${plan.score}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateModule(id, key, value) {
    modules = modules.map((item) => {
      if (item.id !== id) return item;
      if (key === "name" || key === "type") return { ...item, [key]: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addModule() {
    if (modules.length >= 9) {
      showToast("最多先比較 9 個救援模組");
      return;
    }
    modules.push(module("新救援模組", "transit", 30, 50, 20));
    renderAll();
  }

  function loadSample() {
    fields.city.value = "東京羽田";
    fields.mode.value = "arrival";
    fields.flightTime.value = "05:10";
    fields.roomTime.value = "15:00";
    fields.firstThing.value = "12:30 表參道午餐";
    fields.luggage.value = "large";
    fields.fatigue.value = "84";
    fields.shower.checked = true;
    fields.locker.checked = true;
    modules = [
      module("機場淋浴換衣", "shower", 45, 94, 24),
      module("羽田寄物", "locker", 20, 76, 12),
      module("單人膠囊補眠", "nap", 90, 98, 34),
      module("低咖啡因早餐", "breakfast", 38, 62, 14),
      module("直達市區交通", "transit", 42, 58, 18)
    ];
    renderAll();
  }

  function updateMiniLabel(input) {
    const strong = input.closest("label").querySelector("strong");
    if (!strong) return;
    const suffix = input.dataset.key === "duration" ? "分" : "";
    strong.textContent = `${input.value}${suffix}`;
  }

  function bindEvents() {
    document.querySelector("[data-sample]").addEventListener("click", loadSample);
    document.querySelector("[data-add-module]").addEventListener("click", addModule);
    document.querySelector("[data-generate]").addEventListener("click", () => {
      renderOutput();
      outputNode.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        fatigueLabel.textContent = `${fields.fatigue.value}/100`;
        renderOutput();
      });
      field.addEventListener("change", renderOutput);
    });

    moduleListNode.addEventListener("input", (event) => {
      const moduleNode = event.target.closest("[data-module-id]");
      if (!moduleNode || !event.target.dataset.key) return;
      updateModule(moduleNode.dataset.moduleId, event.target.dataset.key, event.target.value);
      if (event.target.type === "range") updateMiniLabel(event.target);
      renderOutput();
    });

    moduleListNode.addEventListener("change", (event) => {
      const moduleNode = event.target.closest("[data-module-id]");
      if (!moduleNode || !event.target.dataset.key) return;
      updateModule(moduleNode.dataset.moduleId, event.target.dataset.key, event.target.value);
      renderOutput();
    });

    moduleListNode.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      const moduleNode = button.closest("[data-module-id]");
      modules = modules.filter((item) => item.id !== moduleNode.dataset.moduleId);
      renderAll();
    });
  }

  function renderAll() {
    fatigueLabel.textContent = `${fields.fatigue.value}/100`;
    renderModules();
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
