(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const sampleRoute = [
    "09:30 明洞早餐與換錢",
    "11:00 景福宮韓服拍照",
    "13:30 北村韓屋村散步",
    "15:30 延南洞咖啡店",
    "18:00 弘大逛街",
    "21:00 rooftop bar 夜景"
  ].join("\n");

  const form = document.querySelector("[data-form]");
  const output = document.querySelector("[data-output]");
  const heroScore = document.querySelector("[data-hero-score]");
  const toastNode = document.querySelector("[data-toast]");
  const fields = {
    raw: document.querySelector("[data-route]"),
    creator: document.querySelector("[data-creator]"),
    city: document.querySelector("[data-city]"),
    budget: document.querySelector("[data-budget]"),
    pace: document.querySelector("[data-pace]"),
    avoid: document.querySelector("[data-avoid]"),
    keepPhotos: document.querySelector("[data-keep-photos]"),
    reduceCrowds: document.querySelector("[data-reduce-crowds]"),
    foodUpgrade: document.querySelector("[data-food-upgrade]")
  };

  function parseStop(line, index) {
    const clean = line.trim().replace(/^[-*•\s]+/, "");
    const timeMatch = clean.match(/(\d{1,2}:\d{2})/);
    const time = timeMatch ? timeMatch[1] : `${String(9 + index * 2).padStart(2, "0")}:00`;
    const title = clean.replace(time, "").trim() || `創作者點位 ${index + 1}`;
    return {
      title,
      originalTime: time,
      category: classify(title),
      friction: friction(title),
      order: index + 1
    };
  }

  function classify(text) {
    if (/咖啡|甜|早餐|餐|bar|酒|市場/i.test(text)) return "food";
    if (/拍照|韓服|景|夜景|韓屋|宮|展/i.test(text)) return "photo";
    if (/逛|店|購物|明洞|弘大|選物/i.test(text)) return "shop";
    return "culture";
  }

  function friction(text) {
    let score = 28;
    if (/明洞|景福宮|北村|弘大|熱門|排隊/i.test(text)) score += 30;
    if (/bar|夜景/i.test(text)) score += 12;
    if (/咖啡|散步|公園|河/i.test(text)) score -= 8;
    const avoid = fields.avoid.value.trim();
    if (avoid && text.includes(avoid)) score += 30;
    return Math.max(5, Math.min(95, score));
  }

  function actionFor(stop) {
    if (fields.reduceCrowds.checked && stop.friction >= 58) return "替換";
    if (!fields.keepPhotos.checked && stop.category === "photo") return "降級";
    if (fields.budget.value === "低預算" && /bar|酒|韓服|高級/i.test(stop.title)) return "替換";
    if (fields.foodUpgrade.checked && stop.category === "food") return "升級";
    return "保留";
  }

  function remixTitle(stop) {
    const action = actionFor(stop);
    if (action === "保留") return stop.title;
    if (action === "升級") return `${stop.title}，改成預約制記憶點`;
    if (action === "降級") return `${stop.title}，改成路過拍攝版`;
    if (/明洞/i.test(stop.title)) return "乙支路小店與咖啡替代";
    if (/景福宮/i.test(stop.title)) return "昌德宮周邊安靜拍照點";
    if (/北村/i.test(stop.title)) return "西村巷弄散步替代";
    if (/弘大/i.test(stop.title)) return "延南洞選物街替代";
    if (/bar|夜景/i.test(stop.title)) return "漢江夜景散步替代";
    return `${stop.title} 的低人潮版本`;
  }

  function ordered(stops) {
    const weight = { culture: 1, photo: 2, shop: 3, food: 4 };
    const sorted = [...stops].sort((a, b) => (weight[a.category] || 3) - (weight[b.category] || 3));
    if (fields.pace.value === "慢旅") return sorted.slice(0, 4);
    if (fields.pace.value === "緊湊") return sorted;
    return sorted.slice(0, 5);
  }

  function score(stops) {
    const changed = stops.filter((stop) => actionFor(stop) !== "保留").length;
    const density = fields.pace.value === "緊湊" ? -6 : fields.pace.value === "慢旅" ? 9 : 3;
    return Math.max(22, Math.min(99, 62 + changed * 9 + density));
  }

  function buildPrompt(stops, scoreValue) {
    const route = ordered(stops)
      .map((stop, index) => `${index + 1}. ${remixTitle(stop)}（原本：${stop.title}，策略：${actionFor(stop)}）`)
      .join("；");
    return `請用 ChillOut 幫我把 ${fields.creator.value || "創作者"} 的 ${fields.city.value || "目的地"} 路線 Remix 成我的版本。預算：${fields.budget.value}，節奏：${fields.pace.value}，想避開：${fields.avoid.value || "人潮與高成本"}。Remix 路線：${route}。請輸出時間線、替代理由、餐廳或咖啡建議、拍照任務、交通順序、雨天備案，以及可分享標題。個人化分數 ${scoreValue}/100。`;
  }

  function render() {
    const stops = fields.raw.value.split(/\n+/).filter(Boolean).map(parseStop);
    if (!stops.length) {
      output.innerHTML = `<div class="cr-card" style="padding:20px">貼上創作者路線後，這裡會出現 Remix 結果。</div>`;
      heroScore.textContent = "--";
      return;
    }

    const scoreValue = score(stops);
    const changed = stops.filter((stop) => actionFor(stop) !== "保留").length;
    const prompt = buildPrompt(stops, scoreValue);
    const share = `我把 ${fields.creator.value || "創作者"} 的 ${fields.city.value || "旅行"} 路線用 ChillOut Remix，保留靈感但避開不適合我的點，個人化分數 ${scoreValue}/100。`;
    heroScore.textContent = scoreValue;

    output.innerHTML = `
      <div class="cr-metrics">
        ${metric("原路線", stops.length)}
        ${metric("已調整", changed)}
        ${metric("保留", stops.length - changed)}
        ${metric("適配", `${scoreValue}/100`)}
      </div>
      <div class="cr-boards">
        <section class="cr-column">
          <h3>創作者原路線</h3>
          ${stops.map((stop) => stopCard(stop.title, stop.originalTime, `${label(stop.category)}，摩擦 ${stop.friction}`)).join("")}
        </section>
        <section class="cr-column">
          <h3>你的 Remix 版本</h3>
          ${ordered(stops).map((stop, index) => stopCard(remixTitle(stop), actionFor(stop), `第 ${index + 1} 站，${reason(stop)}`)).join("")}
        </section>
      </div>
      <div class="cr-timeline">
        ${ordered(stops).map((stop, index) => `
          <article class="cr-step">
            <div class="cr-time">${String(10 + index * 2).padStart(2, "0")}:00</div>
            <div><strong>${escapeHtml(remixTitle(stop))}</strong><small>${escapeHtml(reason(stop))}</small></div>
            <span class="cr-pill">${escapeHtml(actionFor(stop))}</span>
          </article>
        `).join("")}
      </div>
      <div class="cr-prompt"><small>ChillOut prompt</small><p>${escapeHtml(prompt)}</p></div>
      <div class="cr-actions">
        <button class="cr-button" type="button" data-copy-prompt>複製 Prompt</button>
        <button class="cr-button" type="button" data-copy-share>複製分享文案</button>
        <a class="cr-button cr-primary" href="${appStore}?ct=tool_creator_remix_manual_${scoreValue}">丟進 ChillOut</a>
      </div>
    `;
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
  }

  function metric(labelText, value) {
    return `<div class="cr-metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(labelText)}</span></div>`;
  }

  function stopCard(title, tag, body) {
    return `<article class="cr-stop"><header><strong>${escapeHtml(title)}</strong><span class="cr-label">${escapeHtml(tag)}</span></header><p>${escapeHtml(body)}</p></article>`;
  }

  function reason(stop) {
    const action = actionFor(stop);
    if (action === "保留") return "符合你的限制，保留創作者精華";
    if (action === "升級") return "把吃喝點變成這趟的主要記憶";
    if (action === "降級") return "降低拍照壓力，避免整天被打卡綁住";
    return "降低人潮或預算摩擦，保留同類型體驗";
  }

  function label(category) {
    return { food: "吃喝", photo: "拍照", shop: "購物", culture: "文化" }[category] || "城市";
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
    toastNode.textContent = message;
    toastNode.classList.add("is-visible");
    window.setTimeout(() => toastNode.classList.remove("is-visible"), 1300);
  }

  document.querySelector("[data-demo]").addEventListener("click", () => {
    fields.raw.value = sampleRoute;
    render();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });
  Object.values(fields).forEach((node) => {
    if (!node || !node.addEventListener) return;
    node.addEventListener("input", render);
    node.addEventListener("change", render);
  });

  fields.raw.value = sampleRoute;
  render();
})();
