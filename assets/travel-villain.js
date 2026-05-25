(() => {
  const appStore = "https://apps.apple.com/tw/app/chillout/id6760571567";
  const state = {
    morning: "late",
    food: "budget",
    photo: "director",
    delay: "late"
  };

  const result = document.querySelector("[data-result]");
  const toast = document.querySelector("[data-toast]");
  const form = document.querySelector("[data-form]");

  const villains = {
    late: {
      name: "睡過頭魔王",
      crime: "你的行程最大敵人不是景點，是鬧鐘。",
      fix: "所有早上行程延後 40 分鐘，第一站安排可滑動抵達時間的咖啡或街區。"
    },
    command: {
      name: "行程暴君",
      crime: "你不是在旅行，你是在執行專案甘特圖。",
      fix: "每天最多鎖三個不可動錨點，其餘交給 ChillOut 排成彈性備案。"
    },
    director: {
      name: "拍照導演",
      crime: "旅伴不是不愛你，是快被你叫回去重拍第三十次。",
      fix: "每個拍照點設定 12 分鐘上限，先拍主構圖，再讓旅伴自由移動。"
    },
    budget: {
      name: "預算審判長",
      crime: "你會把每一口甜點換算成匯率和罪惡感。",
      fix: "先設定每日享受預算，超過就用散步、夜景和市場小吃平衡。"
    },
    random: {
      name: "即興炸彈",
      crime: "你的人生很自由，旅伴的耐心很危險。",
      fix: "保留兩個即興空格，但交通、住宿、晚餐至少先固定一個。"
    },
    skip: {
      name: "三秒通關者",
      crime: "你抵達景點的速度很快，離開的速度更快。",
      fix: "每個主景點安排一個任務：吃、拍、買、聽或坐下 10 分鐘。"
    },
    wander: {
      name: "小巷失蹤犯",
      crime: "大家一轉頭，你已經被下一條巷子召喚走了。",
      fix: "把自由探索安排成正式段落，並設定集合點和回歸時間。"
    },
    plan: {
      name: "清單守門員",
      crime: "店休也不能阻止你想照原清單走。",
      fix: "每個清單點都要準備同區替代點，避免一個關門毀掉整天。"
    }
  };

  function dominantVillain() {
    const counts = {};
    Object.values(state).forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const key = sorted[0][0];
    return { key, ...villains[key], count: sorted[0][1] };
  }

  function chaosScore(villain) {
    const base = 58 + villain.count * 12;
    const unique = new Set(Object.values(state)).size;
    return Math.max(45, Math.min(96, base + (4 - unique) * 4));
  }

  function promptFor(villain, score) {
    return `請用 ChillOut 幫我把旅行反派「${villain.name}」修正成比較好相處的 1 天行程。我的雷點是：${villain.crime} 反派危險值 ${score}/100。請根據這個修正原則排路線：${villain.fix} 請輸出早午晚行程、每站停留時間、旅伴求生規則、備案，以及一段可以丟到群組的幽默行程標題。`;
  }

  function render() {
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.classList.toggle("is-active", state[button.dataset.key] === button.dataset.value);
    });

    const villain = dominantVillain();
    const score = chaosScore(villain);
    const prompt = promptFor(villain, score);
    const share = `我的 ChillOut 旅行反派是「${villain.name}」，危險值 ${score}/100。${villain.crime}`;

    result.innerHTML = `
      <div class="tv-warrant">
        <small>T013 travel villain warrant</small>
        <h2>${escapeHtml(villain.name)}</h2>
        <strong>${score}</strong>
      </div>
      <div class="tv-grid">
        <article class="tv-note">
          <span>crime</span>
          <h3>罪狀</h3>
          <p>${escapeHtml(villain.crime)}</p>
        </article>
        <article class="tv-note">
          <span>survival</span>
          <h3>旅伴求生指南</h3>
          <p>${escapeHtml(villain.fix)}</p>
        </article>
        <article class="tv-note">
          <span>useful truth</span>
          <h3>其實你適合</h3>
          <p>${escapeHtml(usefulTruth(villain.key))}</p>
        </article>
      </div>
      <div class="tv-prompt">
        <small>ChillOut prompt</small>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="tv-result-actions">
        <button class="tv-button" type="button" data-copy-share>複製分享文案</button>
        <button class="tv-button" type="button" data-copy-prompt>複製 Prompt</button>
        <a class="tv-button tv-primary" data-app-link href="${appStore}?ct=tool_travel_villain_manual_${encodeURIComponent(villain.name)}">丟進 ChillOut</a>
      </div>
    `;

    document.querySelector("[data-copy-share]").addEventListener("click", () => copyText(share));
    document.querySelector("[data-copy-prompt]").addEventListener("click", () => copyText(prompt));
  }

  function usefulTruth(key) {
    if (key === "late") return "下午開始、夜晚漂亮、住宿附近有彈性備案的路線。";
    if (key === "command" || key === "plan") return "有明確主軸，但保留替代點的精準行程。";
    if (key === "director") return "少點多拍、光線穩、每站有明確畫面的旅行。";
    if (key === "budget") return "高低預算混搭，讓花錢和省錢都有理由。";
    if (key === "random" || key === "wander") return "半天固定、半天自由探索的城市散步。";
    return "短停留、多段落、每站有小任務的節奏。";
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

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.key] = button.dataset.value;
      render();
    });
  });

  document.querySelector("[data-random]").addEventListener("click", () => {
    const groups = {};
    document.querySelectorAll("[data-choice]").forEach((button) => {
      groups[button.dataset.key] = groups[button.dataset.key] || [];
      groups[button.dataset.key].push(button.dataset.value);
    });
    Object.entries(groups).forEach(([key, values]) => {
      state[key] = values[Math.floor(Math.random() * values.length)];
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  render();
})();
