const form = document.querySelector("[data-chaos-form]");
const scoreEl = document.querySelector("[data-chaos-score]");
const previewScore = document.querySelector("[data-preview-score]");
const titleEl = document.querySelector("[data-chaos-title]");
const copyEl = document.querySelector("[data-chaos-copy]");
const promptEl = document.querySelector("[data-chaos-prompt]");
const shareEl = document.querySelector("[data-chaos-share]");
const meterEl = document.querySelector("[data-chaos-meter]");
const copyButton = document.querySelector("[data-copy-chaos]");

const levels = [
  {
    max: 28,
    title: "清醒收藏家",
    copy: "你的收藏還在可控範圍。趁現在把景點分區，會比出發前一天輕鬆很多。",
    prompt: "請幫我把這些 IG 收藏景點依區域分組，排成一趟節奏舒服、每天 2-3 個主要景點的自由行。"
  },
  {
    max: 52,
    title: "靈感堆疊型旅人",
    copy: "你有很多好點子，但還沒有變成路線。下一步不是再收藏，是先整理。",
    prompt: "我有一批 IG 旅行收藏，請先幫我去重、分類成美食/景點/咖啡/夜景，再排出第一版可編輯行程。"
  },
  {
    max: 76,
    title: "出發前一天高危族",
    copy: "你已經接近『打開收藏夾就想關掉』的狀態。現在需要工具幫你把混亂變成草稿。",
    prompt: "我快出發了，請把這些收藏景點快速整理成不繞路的每日行程，並標出可刪除和必去的點。"
  },
  {
    max: 100,
    title: "旅行資料倉庫管理員",
    copy: "你不是在排行程，你是在管理一個跨城市內容資料庫。請立刻停止新增收藏，先生成第一版。",
    prompt: "我收藏了很多不同城市的旅行景點，請先幫我依目的地和區域整理，再挑出最適合這次旅行的 8-12 個點，排成可執行行程。"
  }
];

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

function currentScore() {
  if (!form) return 0;
  const data = new FormData(form);
  let total = 0;
  for (const value of data.values()) total += Number(value);
  return clampScore(total);
}

function levelFor(score) {
  return levels.find((level) => score <= level.max) || levels[levels.length - 1];
}

function render() {
  const score = currentScore();
  const level = levelFor(score);
  const share = `我的 IG 旅行收藏混亂指數是 ${score}/100，我是「${level.title}」。現在先把景點丟進 ChillOut 整理成行程：https://apps.apple.com/tw/app/chillout/id6760571567?ct=ig_chaos_share`;
  scoreEl.textContent = score;
  previewScore.textContent = score;
  titleEl.textContent = level.title;
  copyEl.textContent = level.copy;
  promptEl.textContent = level.prompt;
  shareEl.textContent = share;
  meterEl.style.width = `${score}%`;
}

form?.addEventListener("input", render);
copyButton?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(shareEl.textContent);
  copyButton.textContent = "已複製";
  setTimeout(() => copyButton.textContent = "複製結果", 1400);
});

render();
