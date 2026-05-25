(() => {
  const appUrl = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const shots = [
    { id: "a", label: "截圖 A", note: "益善洞傳統茶屋，想要下午坐一下", type: "咖啡甜點", mood: "慢慢走", image: "" },
    { id: "b", label: "截圖 B", note: "景福宮韓服拍照，早上人比較少", type: "拍照景點", mood: "好拍", image: "" },
    { id: "c", label: "截圖 C", note: "廣藏市場晚餐，想吃綠豆煎餅", type: "美食市場", mood: "在地", image: "" }
  ];

  const els = {
    editors: document.querySelector("[data-shot-editors]"),
    city: document.querySelector("[data-city]"),
    start: document.querySelector("[data-start]"),
    pace: document.querySelector("[data-pace]"),
    transport: document.querySelector("[data-transport]"),
    map: document.querySelector("[data-route-map]"),
    route: document.querySelector("[data-route-output]"),
    card: document.querySelector("[data-result-card]"),
    toast: document.querySelector("[data-toast]")
  };

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  function shotTitle(shot) {
    return shot.note.split(/[，,。]/)[0].slice(0, 18) || shot.label;
  }

  function typeWeight(type) {
    return {
      "拍照景點": 1,
      "文化故事": 2,
      "咖啡甜點": 3,
      "購物小店": 4,
      "美食市場": 5,
      "夜景酒吧": 6
    }[type] || 3;
  }

  function orderedShots() {
    const paceBias = els.pace.value === "緊湊" ? -0.4 : els.pace.value === "慢拍" ? 0.6 : 0;
    return [...shots].sort((a, b) => typeWeight(a.type) + paceBias - (typeWeight(b.type) + paceBias));
  }

  function routeScore() {
    const filled = shots.filter((shot) => shot.note.trim()).length * 20;
    const typeSpread = new Set(shots.map((shot) => shot.type)).size * 8;
    const moodSpread = new Set(shots.map((shot) => shot.mood)).size * 5;
    const transport = els.transport.value === "步行優先" ? 7 : 11;
    return Math.max(28, Math.min(99, filled + typeSpread + moodSpread + transport));
  }

  function buildPrompt(score) {
    const city = els.city.value || "目的地";
    const route = orderedShots().map((shot, index) => `${index + 1}. ${shotTitle(shot)}（${shot.type}／${shot.mood}）`).join("；");
    return `請用 ChillOut 幫我把三張旅遊截圖排成 ${city} 半日或一日行程。起始時間：${els.start.value}，交通：${els.transport.value}，節奏：${els.pace.value}。截圖線索：${route}。請輸出路線順序、每站停留時間、附近餐廳/咖啡、如果其中一站太遠的替代方案，以及適合分享的行程標題。`;
  }

  function buildShare(score) {
    return `我用 ChillOut 三張截圖路線工坊，把 3 張旅遊靈感截圖拼成一條路線，路線黏著度 ${score}/100。下一步丟進 ChillOut 生成完整行程。`;
  }

  function renderEditors() {
    els.editors.innerHTML = shots.map((shot, index) => `
      <article class="sr-shot" data-shot="${shot.id}">
        <h3><span>${shot.label}</span><small>${index + 1}/3</small></h3>
        <div class="sr-preview" data-preview="${shot.id}">${shot.image ? `<img src="${shot.image}" alt="${shot.label} preview">` : "上傳截圖或填備註"}</div>
        <input type="file" accept="image/*" data-file="${shot.id}">
        <textarea data-note="${shot.id}" placeholder="這張截圖是什麼？為什麼想去？">${escapeHtml(shot.note)}</textarea>
        <div class="sr-row">
          <select data-type="${shot.id}">
            ${["拍照景點","文化故事","咖啡甜點","購物小店","美食市場","夜景酒吧"].map((type) => `<option ${type === shot.type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
          <select data-mood="${shot.id}">
            ${["好拍","慢慢走","在地","約會","省錢","夜晚"].map((mood) => `<option ${mood === shot.mood ? "selected" : ""}>${mood}</option>`).join("")}
          </select>
        </div>
      </article>
    `).join("");
  }

  function renderMap() {
    const ordered = orderedShots();
    els.map.innerHTML = ordered.map((shot, index) => `
      <section class="sr-node">
        <b>0${index + 1}</b>
        <div><strong>${escapeHtml(shotTitle(shot))}</strong><small>${shot.type} · ${shot.mood}</small></div>
      </section>
      ${index < ordered.length - 1 ? `<div class="sr-connector"></div>` : ""}
    `).join("");
  }

  function renderRoute(score) {
    const startHour = Number(els.start.value.split(":")[0] || 10);
    const ordered = orderedShots();
    const verbs = ["先用最有畫面的點定錨", "接一個同區可休息的中繼", "用最有記憶點的一站收尾"];
    els.route.innerHTML = `
      <h2>${els.city.value || "目的地"} 截圖路線</h2>
      ${ordered.map((shot, index) => `
        <div class="sr-step">
          <div class="sr-time">${String(startHour + index * 2).padStart(2, "0")}:00</div>
          <div><strong>${escapeHtml(shotTitle(shot))}</strong><small>${verbs[index]} · ${shot.type} · ${els.transport.value}</small></div>
        </div>
      `).join("")}
    `;
    const prompt = buildPrompt(score);
    const share = buildShare(score);
    els.card.innerHTML = `
      <h2>路線結果卡</h2>
      <div class="sr-score">${score}</div>
      <p>${score >= 78 ? "三張截圖已經可以拼成一條可出發路線。" : "三張截圖還需要補一個中繼點，ChillOut 可以幫你找。 "}</p>
      <div class="sr-tags">${ordered.map((shot) => `<span>${shot.type}</span>`).join("")}</div>
      <div class="sr-prompt">${escapeHtml(prompt)}</div>
      <div class="sr-actions">
        <button class="sr-button" data-copy-prompt>複製 Prompt</button>
        <button class="sr-button" data-copy-share>複製分享文案</button>
        <a class="sr-button primary" href="${appUrl}?ct=tool_screenshot_route_${score}">丟進 ChillOut</a>
      </div>
    `;
    els.card.querySelector("[data-copy-prompt]").addEventListener("click", () => copy(prompt));
    els.card.querySelector("[data-copy-share]").addEventListener("click", () => copy(share));
  }

  function render() {
    renderMap();
    renderRoute(routeScore());
  }

  function updateShot(id, patch) {
    const shot = shots.find((item) => item.id === id);
    Object.assign(shot, patch);
    render();
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("已複製");
    } catch {
      window.prompt("複製文字", text);
    }
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    setTimeout(() => els.toast.classList.remove("show"), 1400);
  }

  renderEditors();
  render();

  els.editors.addEventListener("input", (event) => {
    const id = event.target.dataset.note || event.target.dataset.type || event.target.dataset.mood;
    if (!id) return;
    if (event.target.dataset.note) updateShot(id, { note: event.target.value });
    if (event.target.dataset.type) updateShot(id, { type: event.target.value });
    if (event.target.dataset.mood) updateShot(id, { mood: event.target.value });
  });

  els.editors.addEventListener("change", (event) => {
    const id = event.target.dataset.file;
    if (!id || !event.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateShot(id, { image: reader.result });
      renderEditors();
      toast("截圖已載入");
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  [els.city, els.start, els.pace, els.transport].forEach((input) => input.addEventListener("input", render));
  document.querySelector("[data-build-route]").addEventListener("click", () => {
    render();
    toast("已重排三張截圖");
  });
  document.querySelector("[data-demo]").addEventListener("click", () => {
    shots[0].note = "益善洞傳統茶屋，想要下午坐一下";
    shots[1].note = "景福宮韓服拍照，早上人比較少";
    shots[2].note = "廣藏市場晚餐，想吃綠豆煎餅";
    shots[0].type = "咖啡甜點";
    shots[1].type = "拍照景點";
    shots[2].type = "美食市場";
    renderEditors();
    render();
    toast("已載入示範截圖");
  });
})();
