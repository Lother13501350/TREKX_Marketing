(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const candidatesNode = document.querySelector("[data-candidates]");
  const resultNode = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    groupName: document.querySelector("[data-group-name]"),
    people: document.querySelector("[data-people]"),
    days: document.querySelector("[data-days]"),
    priority: document.querySelector("[data-priority]"),
    delay: document.querySelector("[data-delay]")
  };

  let candidates = [
    destination("福岡", 78, 64, 82, 71, 85),
    destination("首爾", 84, 58, 74, 88, 76),
    destination("沖繩", 72, 70, 67, 62, 80)
  ];

  function destination(name, want, budget, transport, content, consensus) {
    return { id: crypto.randomUUID(), name, want, budget, transport, content, consensus };
  }

  function priorityWeights() {
    const base = { want: 0.22, budget: 0.18, transport: 0.18, content: 0.18, consensus: 0.24 };
    if (fields.priority.value === "budget") return { want: 0.18, budget: 0.31, transport: 0.17, content: 0.14, consensus: 0.20 };
    if (fields.priority.value === "transport") return { want: 0.18, budget: 0.16, transport: 0.31, content: 0.14, consensus: 0.21 };
    if (fields.priority.value === "content") return { want: 0.22, budget: 0.14, transport: 0.14, content: 0.30, consensus: 0.20 };
    return base;
  }

  function score(item) {
    const weight = priorityWeights();
    const raw =
      item.want * weight.want +
      item.budget * weight.budget +
      item.transport * weight.transport +
      item.content * weight.content +
      item.consensus * weight.consensus;
    const delayPenalty = Math.max(0, Number(fields.delay.value) - 70) * 0.08;
    return Math.max(1, Math.min(99, Math.round(raw - delayPenalty)));
  }

  function renderCandidates() {
    candidatesNode.innerHTML = candidates.map((item, index) => `
      <article class="gv-destination" data-id="${escapeAttr(item.id)}">
        <div class="gv-destination-title">
          <label>候選地 ${index + 1}</label>
          <input data-key="name" value="${escapeAttr(item.name)}" aria-label="目的地名稱">
        </div>
        ${meter("want", "想去程度", item.want)}
        ${meter("budget", "預算友善", item.budget)}
        ${meter("transport", "交通輕鬆", item.transport)}
        ${meter("content", "內容記憶點", item.content)}
        ${meter("consensus", "全員接受", item.consensus)}
        <button class="gv-remove" type="button" data-remove aria-label="移除 ${escapeAttr(item.name)}">×</button>
      </article>
    `).join("");
  }

  function meter(key, label, value) {
    return `
      <label class="gv-meter">
        <span>${label} ${value}</span>
        <input data-key="${key}" type="range" min="0" max="100" value="${value}" aria-label="${label}">
      </label>
    `;
  }

  function ranked() {
    return candidates
      .filter((item) => item.name.trim())
      .map((item) => ({ ...item, score: score(item) }))
      .sort((a, b) => b.score - a.score);
  }

  function riskText(items) {
    if (items.length < 2) return ["候選太少", "至少放兩個目的地，群組才會覺得這是一個公平決策。"];
    const gap = items[0].score - items[1].score;
    const lowConsensus = items[0].consensus < 58;
    const highDelay = Number(fields.delay.value) > 72;
    if (gap <= 4) return ["需要二選一", "第一名與第二名差距太小，建議把這兩個丟回群組限時投票。"];
    if (lowConsensus) return ["共識不足", "第一名分數高，但不是所有人都接受，出發前要先確認反對原因。"];
    if (highDelay) return ["主揪要收斂", "群組拖延偏高，請直接給兩個可選日期，不要開放無限討論。"];
    return ["可以拍板", "第一名已經有足夠差距，可以請大家在 24 小時內確認。"];
  }

  function winnerReasons(item) {
    const pairs = [
      ["想去程度", item.want],
      ["預算友善", item.budget],
      ["交通輕鬆", item.transport],
      ["內容記憶點", item.content],
      ["全員接受", item.consensus]
    ].sort((a, b) => b[1] - a[1]);
    return pairs.slice(0, 2).map((pair) => `${pair[0]} ${pair[1]}`);
  }

  function actionList(items, risk) {
    const first = items[0]?.name || "第一名";
    const second = items[1]?.name || "第二名";
    const list = [
      `把 ${first} 設為主方案，${second} 設為備案，不要讓群組重新發散。`,
      `請每個人只回覆「可以」或「唯一不能接受的理由」，避免又回到聊天投票。`,
      `用 ChillOut 先生成 ${first} 的 ${fields.days.value} 天行程，再把路線截圖丟回群組。`
    ];
    if (risk[0] === "需要二選一") list.unshift(`先讓 ${first} 與 ${second} 做 12 小時限時投票。`);
    if (fields.priority.value === "budget") list.push("把預算上限寫在群組訊息第一行，降低臨時加價爭議。");
    return list;
  }

  function promptFor(items, risk) {
    const top = items.slice(0, 3).map((item) => `${item.name} ${item.score} 分`).join("、");
    const first = items[0]?.name || "第一名目的地";
    return `請用 ChillOut 幫我們規劃 ${fields.groupName.value || "多人旅行"}。人數 ${fields.people.value} 人，天數 ${fields.days.value} 天。目的地決策結果：${top}。優先條件是「${fields.priority.options[fields.priority.selectedIndex].textContent}」，群組拖延程度 ${fields.delay.value}/100，決策風險是「${risk[0]}」。請以 ${first} 為主方案，安排交通不要太累、預算可控、每天一個共同主線，並附上如果有人反對時可以切換的備案行程。`;
  }

  function shareCopy(items, risk) {
    const top = items[0];
    const names = items.slice(0, 3).map((item, index) => `${index + 1}. ${item.name} ${item.score} 分`).join(" / ");
    return `我用 ChillOut 群組目的地決策器算完了：${fields.groupName.value || "這團"} 最適合先選 ${top.name}。前三名是 ${names}。目前狀態：${risk[0]}。大家只要回覆可以或唯一不能接受的理由，我們就可以進 ChillOut 生行程。`;
  }

  function renderResult() {
    const items = ranked();
    if (!items.length) {
      resultNode.innerHTML = `<div class="gv-result-empty">先加入至少一個目的地，這裡會生成排名、共識風險與 ChillOut prompt。</div>`;
      return;
    }

    const risk = riskText(items);
    const top = items[0];
    const reasons = winnerReasons(top);
    const actions = actionList(items, risk);
    const prompt = promptFor(items, risk);
    const share = shareCopy(items, risk);

    resultNode.innerHTML = `
      <div class="gv-winner">
        <div>
          <small>T023 group vote map</small>
          <h2>${escapeHtml(top.name)} 最容易成行</h2>
          <p>${escapeHtml(reasons.join("、"))} 是它勝出的主因。這不是要取代討論，而是幫主揪把討論收斂成可以拍板的選項。</p>
        </div>
        <div class="gv-score" aria-label="目的地共識分數">${top.score}</div>
      </div>

      <div class="gv-ranking">
        ${items.slice(0, 3).map((item, index) => `
          <article class="gv-rank">
            <span>Rank ${index + 1}</span>
            <h3>${escapeHtml(item.name)} · ${item.score}</h3>
            <p>${escapeHtml(winnerReasons(item).join("、"))}</p>
          </article>
        `).join("")}
      </div>

      <div class="gv-advice">
        <section>
          <h3>${escapeHtml(risk[0])}</h3>
          <ul>
            <li>${escapeHtml(risk[1])}</li>
            ${actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h3>群組訊息</h3>
          <ul>
            <li>${escapeHtml(share)}</li>
          </ul>
        </section>
      </div>

      <div class="gv-prompt">
        <h3>ChillOut prompt</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>

      <div class="gv-result-actions">
        <button type="button" class="gv-button" data-copy-share>複製群組訊息</button>
        <button type="button" class="gv-button" data-copy-prompt>複製 Prompt</button>
        <a class="gv-button gv-primary" data-app-link href="${appStore}?ct=tool_group_vote_map_manual_${top.score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function updateCandidate(id, key, value) {
    candidates = candidates.map((item) => {
      if (item.id !== id) return item;
      if (key === "name") return { ...item, name: value };
      return { ...item, [key]: Number(value) };
    });
  }

  function addCandidate() {
    if (candidates.length >= 6) {
      showToast("最多先比較 6 個目的地");
      return;
    }
    candidates.push(destination("新目的地", 55, 55, 55, 55, 55));
    renderCandidates();
    renderResult();
  }

  function loadSample() {
    fields.groupName.value = "九月朋友出國團";
    fields.people.value = "6";
    fields.days.value = "4";
    fields.priority.value = "consensus";
    fields.delay.value = "68";
    candidates = [
      destination("大阪", 86, 62, 80, 88, 78),
      destination("曼谷", 80, 84, 70, 82, 72),
      destination("峴港", 69, 88, 66, 74, 83),
      destination("釜山", 73, 72, 76, 68, 70)
    ];
    renderAll();
  }

  function renderAll() {
    document.querySelector("[data-delay-value]").textContent = fields.delay.value;
    renderCandidates();
    renderResult();
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

  candidatesNode.addEventListener("input", (event) => {
    const row = event.target.closest("[data-id]");
    const key = event.target.dataset.key;
    if (!row || !key) return;
    updateCandidate(row.dataset.id, key, event.target.value);
    if (key !== "name") {
      event.target.previousElementSibling.textContent = `${event.target.previousElementSibling.textContent.replace(/\s\d+$/, "")} ${event.target.value}`;
    }
    renderResult();
  });

  candidatesNode.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove]");
    if (!remove) return;
    const row = remove.closest("[data-id]");
    if (candidates.length <= 2) {
      showToast("至少保留 2 個目的地");
      return;
    }
    candidates = candidates.filter((item) => item.id !== row.dataset.id);
    renderCandidates();
    renderResult();
  });

  document.querySelector("[data-add]").addEventListener("click", addCandidate);
  document.querySelector("[data-sample]").addEventListener("click", loadSample);
  document.querySelector("[data-generate]").addEventListener("click", renderResult);

  Object.values(fields).forEach((node) => {
    node.addEventListener("input", renderAll);
    node.addEventListener("change", renderAll);
  });

  renderAll();
})();
