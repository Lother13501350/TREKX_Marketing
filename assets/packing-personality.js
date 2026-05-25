(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const form = document.querySelector("[data-form]");
  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const fields = {
    days: document.querySelector("[data-days]"),
    bag: document.querySelector("[data-bag]"),
    weather: document.querySelector("[data-weather]"),
    laundry: document.querySelector("[data-laundry]"),
    outfit: document.querySelector("[data-outfit]"),
    backup: document.querySelector("[data-backup]"),
    items: document.querySelector("[data-items]"),
    tech: document.querySelector("[data-tech]"),
    meds: document.querySelector("[data-meds]"),
    souvenir: document.querySelector("[data-souvenir]")
  };

  const sampleItems = ["相機", "輕薄外套", "轉接頭", "常備藥", "保養品", "一套好拍穿搭"].join("\n");

  function parseItems() {
    return fields.items.value
      .split(/\n+/)
      .map((item) => item.trim().replace(/^[-*•\d.、\s]+/, ""))
      .filter(Boolean)
      .slice(0, 16);
  }

  function riskScore() {
    const days = Number(fields.days.value || 1);
    let score = 30 + days * 3;
    if (fields.bag.value === "carry") score += days > 4 ? 18 : 8;
    if (fields.bag.value === "large") score -= 8;
    if (fields.weather.value === "cold") score += 16;
    if (fields.weather.value === "rain") score += 10;
    if (fields.laundry.value === "no") score += 14;
    if (fields.laundry.value === "yes") score -= 10;
    if (fields.outfit.value === "photo") score += 14;
    if (fields.backup.value === "high") score += 16;
    if (fields.backup.value === "low") score -= 8;
    if (fields.tech.checked) score += 8;
    if (fields.meds.checked) score += 5;
    if (fields.souvenir.checked) score += 6;
    return Math.max(12, Math.min(98, score));
  }

  function persona(score) {
    if (score >= 82) return {
      name: "備品堡壘建築師",
      truth: "你不是愛帶東西，你是在用行李箱對抗不確定性。",
      rule: "先砍重複品，再砍低機率備品。保留證件、藥品、充電與天氣相關物。"
    };
    if (score >= 64) return {
      name: "畫面導向打包師",
      truth: "你會為了照片多帶一點，但只要整理好搭配，就能不爆箱。",
      rule: "用 2 件外層、3 件內搭、1 雙主鞋組出多套畫面。"
    };
    if (score >= 44) return {
      name: "剛剛好派旅人",
      truth: "你的行李策略已經可控，問題通常出在最後一刻亂加東西。",
      rule: "封箱前只允許新增三樣：藥、線、天氣備案。"
    };
    return {
      name: "極簡壓縮玩家",
      truth: "你很會輕裝，但要小心把必要舒適也刪掉。",
      rule: "極簡可以，但藥品、充電、保暖與雨備不能省。"
    };
  }

  function lists(score) {
    const days = Number(fields.days.value || 1);
    const items = parseItems();
    const must = ["護照/證件", "手機充電線", "付款工具", `${days} 天主衣物`, "住宿與交通截圖"];
    const trim = [];
    const add = [];

    if (fields.weather.value === "cold") must.push("保暖外層");
    if (fields.weather.value === "rain") must.push("輕便雨具");
    if (fields.tech.checked) must.push("轉接頭與行動電源");
    if (fields.meds.checked) must.push("常備藥");
    if (fields.laundry.value === "yes") trim.push("過量內搭", "多餘睡衣");
    if (fields.outfit.value === "photo") add.push("可混搭外層", "不佔空間配件");
    if (fields.backup.value === "high") trim.push("第二套備用保養品", "低機率備品");
    if (fields.souvenir.checked) trim.push("回程才會用到的大包裝用品");
    if (fields.bag.value === "carry" && score >= 70) trim.push("厚重鞋款");
    if (!fields.tech.checked) add.push("至少一條備用充電線");
    if (items.length) add.push(...items.slice(0, 3));

    return {
      must: unique(must).slice(0, 7),
      trim: unique(trim.length ? trim : ["重複功能衣物", "只為幻想場景準備的東西", "可在當地買到的消耗品"]).slice(0, 6),
      add: unique(add.length ? add : ["摺疊袋", "小包衛生用品", "一件好搭外套"]).slice(0, 6)
    };
  }

  function unique(list) {
    return Array.from(new Set(list.filter(Boolean)));
  }

  function promptFor(profile, score, packLists) {
    return `請用 ChillOut 幫我整理出發打包清單。我的行李箱人格是「${profile.name}」，行李風險 ${score}/100。旅行天數 ${fields.days.value} 天，行李尺寸 ${fields.bag.options[fields.bag.selectedIndex].textContent}，氣候 ${fields.weather.options[fields.weather.selectedIndex].textContent}，洗衣條件 ${fields.laundry.options[fields.laundry.selectedIndex].textContent}，穿搭策略 ${fields.outfit.options[fields.outfit.selectedIndex].textContent}。請依照必帶：${packLists.must.join("、")}；可刪：${packLists.trim.join("、")}；需要補：${packLists.add.join("、")}，輸出一份分區打包清單、出發前一天檢查表、落地第一晚需要放在隨身包的物品，以及旅遊手冊提醒。`;
  }

  function render() {
    const score = riskScore();
    const profile = persona(score);
    const packLists = lists(score);
    const prompt = promptFor(profile, score, packLists);
    const share = `我的 ChillOut 行李箱人格是「${profile.name}」，行李風險 ${score}/100。${profile.truth}`;

    result.innerHTML = `
      <div class="pp-head">
        <div>
          <small>T015 packing scanner</small>
          <h2>${escapeHtml(profile.name)}</h2>
          <p>${escapeHtml(profile.truth)} ${escapeHtml(profile.rule)}</p>
        </div>
        <div class="pp-score" aria-label="行李風險">${score}</div>
      </div>
      <div class="pp-lists">
        ${listHtml("必帶", packLists.must)}
        ${listHtml("可刪", packLists.trim)}
        ${listHtml("需要補", packLists.add)}
      </div>
      <div class="pp-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="pp-result-actions">
        <button class="pp-button" type="button" data-copy-share>複製分享文案</button>
        <button class="pp-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="pp-button pp-primary" data-app-link href="${appStore}?ct=tool_packing_personality_manual_${score}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function listHtml(title, items) {
    return `<article class="pp-list"><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`;
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
    fields.days.value = "7";
    fields.bag.value = "carry";
    fields.weather.value = "mixed";
    fields.laundry.value = "maybe";
    fields.outfit.value = "photo";
    fields.backup.value = "high";
    fields.items.value = sampleItems;
    fields.tech.checked = true;
    fields.meds.checked = true;
    fields.souvenir.checked = true;
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

  fields.items.value = sampleItems;
  render();
})();
