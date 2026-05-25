(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const peopleNode = document.querySelector("[data-people]");
  const spotsNode = document.querySelector("[data-spots]");
  const outputNode = document.querySelector("[data-output]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    trip: document.querySelector("[data-trip]"),
    policy: document.querySelector("[data-policy]"),
    retake: document.querySelector("[data-retake]")
  };

  let people = [
    person("Mia", 78, 62, 84),
    person("阿哲", 64, 74, 46),
    person("小雨", 52, 48, 88),
    person("我", 82, 70, 66)
  ];

  let spots = [
    spot("海雲台海邊", "廣角風景", 82, 70),
    spot("膠囊列車", "動態側拍", 68, 78),
    spot("咖啡廳窗邊", "人像", 74, 62),
    spot("夜景天台", "限動素材", 86, 58)
  ];

  function person(name, camera, patience, appear) {
    return { id: crypto.randomUUID(), name, camera, patience, appear };
  }

  function spot(title, style, importance, difficulty) {
    return { id: crypto.randomUUID(), title, style, importance, difficulty };
  }

  function renderPeople() {
    peopleNode.innerHTML = people.map((item) => `
      <article class="pr-person" data-person-id="${escapeAttr(item.id)}">
        <label class="pr-person-field">
          <span>旅伴</span>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="旅伴名稱">
        </label>
        ${slider("camera", "掌鏡", item.camera)}
        ${slider("patience", "耐心", item.patience)}
        ${slider("appear", "出鏡", item.appear)}
        <button class="pr-remove" type="button" data-remove-person aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function renderSpots() {
    spotsNode.innerHTML = spots.map((item) => `
      <article class="pr-spot" data-spot-id="${escapeAttr(item.id)}">
        <label class="pr-spot-field">
          <span>拍照點</span>
          <input data-key="title" value="${escapeAttr(item.title)}" aria-label="拍照點">
        </label>
        <label class="pr-spot-field">
          <span>風格</span>
          <input data-key="style" value="${escapeAttr(item.style)}" aria-label="拍照風格">
        </label>
        ${spotSlider("importance", "重要", item.importance)}
        ${spotSlider("difficulty", "難度", item.difficulty)}
        <button class="pr-remove" type="button" data-remove-spot aria-label="移除 ${escapeAttr(item.title)}">×</button>
      </article>
    `).join("");
  }

  function slider(key, label, value) {
    return `
      <label class="pr-person-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function spotSlider(key, label, value) {
    return `
      <label class="pr-spot-slider">
        <span>${label} <strong>${value}</strong></span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function sortedBy(key, reverse = true) {
    return [...people].sort((a, b) => reverse ? Number(b[key]) - Number(a[key]) : Number(a[key]) - Number(b[key]));
  }

  function rotateFor(index, sorted) {
    return sorted[index % sorted.length];
  }

  function assignments() {
    const cameraPool = sortedBy("camera");
    const directorPool = sortedBy("patience");
    const appearPool = sortedBy("appear");
    const restPool = sortedBy("patience", false);

    return spots.map((item, index) => {
      const photographer = fields.policy.value === "skill" ? cameraPool[index % Math.min(2, cameraPool.length)] : rotateFor(index, cameraPool);
      const director = rotateFor(index + 1, directorPool);
      const subject = rotateFor(index, appearPool);
      const publisher = rotateFor(index + 2, people);
      const rest = fields.policy.value === "rest" ? restPool[index % Math.min(2, restPool.length)] : rotateFor(index + 3, restPool);
      return { spot: item, photographer, director, subject, publisher, rest };
    });
  }

  function average(key) {
    return Math.round(people.reduce((sum, item) => sum + Number(item[key]), 0) / Math.max(1, people.length));
  }

  function harmonyScore() {
    const patience = average("patience");
    const retakePenalty = Number(fields.retake.value) < 45 ? 10 : 0;
    const hardSpotPenalty = spots.filter((item) => Number(item.difficulty) > 78).length * 4;
    return Math.max(1, Math.min(99, Math.round(patience * 0.55 + average("camera") * 0.25 + average("appear") * 0.20 - retakePenalty - hardSpotPenalty)));
  }

  function profile(score) {
    if (score >= 78) return ["可以拍完整素材包", "大家的耐心與掌鏡能力足夠，適合把每站分工做滿。"];
    if (score >= 55) return ["要限制重拍次數", "可以拍，但每個拍點要設定張數與時間上限，避免拍到有人不耐煩。"];
    return ["先減少拍照點", "目前拍照負擔偏高，建議只保留兩個重點拍照點。"];
  }

  function rules(score) {
    const lowPatience = sortedBy("patience", false)[0];
    const bestCamera = sortedBy("camera")[0];
    const list = [
      `${bestCamera.name} 可以優先掌鏡高難度拍點，但不能連續兩站都當攝影師。`,
      `${lowPatience.name} 的拍照耐心最低，每站最多重拍 ${Number(fields.retake.value) < 45 ? "2" : "4"} 次。`,
      "每一站先拍團照，再拍個人照，最後才拍限動素材。"
    ];
    if (score < 55) list.push("把低重要性的拍照點改成路過側拍，不要停留。");
    if (fields.policy.value === "skill") list.push("會拍的人多掌鏡時，其他人要負責找角度、拿包或整理限動。");
    return list;
  }

  function shareCopy(title, score, rulesList) {
    return `我用 ChillOut 拍照任務輪盤排好了：${fields.trip.value || "這趟拍照日"} 是「${title}」，拍照和諧分 ${score}/100。規則：${rulesList.slice(0, 2).join(" / ")}。每站照分工拍，不要互相嫌棄。`;
  }

  function promptFor(title, score, rotation, rulesList) {
    const peopleText = people.map((item) => `${item.name} 掌鏡 ${item.camera}，耐心 ${item.patience}，出鏡 ${item.appear}`).join("；");
    const spotText = rotation.map((item) => `${item.spot.title}：攝影 ${item.photographer.name}，導演 ${item.director.name}，出鏡 ${item.subject.name}，發布 ${item.publisher.name}`).join("；");
    return `請用 ChillOut 幫我們規劃 ${fields.trip.value || "旅行拍照路線"}。旅伴資料：${peopleText}。拍照任務：${spotText}。結果是「${title}」，拍照和諧分 ${score}/100。請依照這些規則安排路線：${rulesList.join("；")}。請輸出拍照點順序、每站停留時間、建議構圖、限動素材清單、太累時要刪掉的拍點。`;
  }

  function renderOutput() {
    if (!people.length || !spots.length) {
      outputNode.innerHTML = `<div class="pr-empty">先加入旅伴與拍照點，這裡會生成任務輪盤、拍照規則與 ChillOut prompt。</div>`;
      return;
    }

    const score = harmonyScore();
    const [title, description] = profile(score);
    const rotation = assignments();
    const rulesList = rules(score);
    const share = shareCopy(title, score, rulesList);
    const prompt = promptFor(title, score, rotation, rulesList);

    outputNode.innerHTML = `
      <div class="pr-summary">
        <div>
          <small>T029 photo duty roulette</small>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)} 好照片不是靠一個人一直拍，而是每一站都有清楚角色。</p>
        </div>
        <div class="pr-score" aria-label="拍照和諧分">${score}</div>
      </div>

      <div class="pr-rotation">
        ${rotation.map((item, index) => `
          <article class="pr-stop">
            <span>Stop ${index + 1}</span>
            <h3>${escapeHtml(item.spot.title)}</h3>
            <ul>
              <li>攝影師：${escapeHtml(item.photographer.name)}</li>
              <li>導演：${escapeHtml(item.director.name)}</li>
              <li>主要出鏡：${escapeHtml(item.subject.name)}</li>
              <li>限動發布：${escapeHtml(item.publisher.name)}</li>
              <li>休息者：${escapeHtml(item.rest.name)}</li>
            </ul>
          </article>
        `).join("")}
      </div>

      <div class="pr-rules">
        <section>
          <h3>拍照規則</h3>
          <ul>${rulesList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>群組公告</h3>
          <ul><li>${escapeHtml(share)}</li></ul>
        </section>
      </div>

      <div class="pr-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="pr-result-actions">
        <button type="button" class="pr-button" data-copy-share>複製群組公告</button>
        <button type="button" class="pr-button" data-copy-prompt>複製 Prompt</button>
        <a class="pr-button pr-primary" data-app-link href="${appStore}?ct=tool_photo_duty_roulette_manual_${score}">丟進 ChillOut</a>
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

  function updateSpot(id, key, value) {
    spots = spots.map((item) => {
      if (item.id !== id) return item;
      if (key === "title" || key === "style") return { ...item, [key]: value };
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

  function addSpot() {
    if (spots.length >= 12) {
      showToast("最多先放 12 個拍照點");
      return;
    }
    spots.push(spot("新拍照點", "照片風格", 60, 60));
    renderSpots();
    renderOutput();
  }

  function loadSample() {
    fields.trip.value = "東京街拍半日";
    fields.policy.value = "fair";
    fields.retake.value = "38";
    people = [
      person("Mia", 82, 62, 88),
      person("阿哲", 70, 74, 42),
      person("小雨", 54, 46, 92),
      person("Leo", 76, 58, 64),
      person("我", 86, 68, 70)
    ];
    spots = [
      spot("代官山街角", "街拍", 78, 62),
      spot("咖啡店窗邊", "人像", 72, 58),
      spot("天橋夜景", "夜景", 86, 82),
      spot("唱片行門口", "限動素材", 64, 48)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-retake-value]").textContent = fields.retake.value;
    renderPeople();
    renderSpots();
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

  spotsNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-spot-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateSpot(row.dataset.spotId, key, event.target.value);
    if (event.target.type === "range") updateSliderLabel(event.target);
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

  spotsNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-spot]");
    if (!remove) return;
    if (spots.length <= 2) {
      showToast("至少保留 2 個拍照點");
      return;
    }
    const row = remove.closest("[data-spot-id]");
    spots = spots.filter((item) => item.id !== row.dataset.spotId);
    renderSpots();
    renderOutput();
  });

  document.querySelector("[data-add-person]").addEventListener("click", addPerson);
  document.querySelector("[data-add-spot]").addEventListener("click", addSpot);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderOutput);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", () => {
      if (node === fields.retake) document.querySelector("[data-retake-value]").textContent = fields.retake.value;
      renderOutput();
    });
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
