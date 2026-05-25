import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolsDir = path.join(root, "tools");
const posterDir = path.join(root, "assets", "tool-posters");
const appStoreUrl = "https://apps.apple.com/tw/app/chillout/id6760571567";
const bespokeToolSlugs = new Set(["save-sprint", "screenshot-to-route", "creator-trip-remix"]);

const categories = {
  social: {
    label: "社群靈感轉行程",
    tone: "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    primary: "#08A7A0",
    accent: "#F4C95D",
    deep: "#071B26",
    inputs: [
      { type: "text", key: "source", label: "貼上靈感來源", placeholder: "IG 連結、截圖備註、朋友丟來的店名" },
      { type: "range", key: "chaos", label: "收藏混亂度", min: 1, max: 100, value: 64, left: "很集中", right: "爆量混亂" },
      { type: "choice", key: "mood", label: "想保留的氛圍", choices: ["好拍", "美食", "放空", "在地", "夜生活"] },
      { type: "range", key: "share", label: "想分享程度", min: 1, max: 100, value: 72, left: "自己收藏", right: "想發爆" }
    ]
  },
  quiz: {
    label: "旅行人格測驗",
    tone: "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    primary: "#7C5CFF",
    accent: "#FFB86B",
    deep: "#16122A",
    inputs: [
      { type: "choice", key: "pace", label: "你的旅行節奏", choices: ["慢慢晃", "一天塞滿", "只排重點", "看心情"] },
      { type: "choice", key: "anchor", label: "最在意的錨點", choices: ["餐廳", "住宿", "照片", "故事", "預算"] },
      { type: "choice", key: "risk", label: "臨時改行程接受度", choices: ["完全不行", "可以一點", "越即興越好"] },
      { type: "range", key: "social", label: "社交能量", min: 1, max: 100, value: 58, left: "安靜旅行", right: "認識新朋友" }
    ]
  },
  group: {
    label: "搭子與關係工具",
    tone: "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    primary: "#EF476F",
    accent: "#4ECDC4",
    deep: "#2A1018",
    inputs: [
      { type: "text", key: "people", label: "旅伴名單", placeholder: "例如：我、阿哲、小雯、Mia" },
      { type: "range", key: "budgetGap", label: "預算差距", min: 1, max: 100, value: 52, left: "很一致", right: "落差很大" },
      { type: "choice", key: "conflict", label: "最容易吵的點", choices: ["早起", "拍照", "吃什麼", "花多少", "走太多"] },
      { type: "range", key: "alone", label: "各自放風需求", min: 1, max: 100, value: 46, left: "全程黏著", right: "需要獨處" }
    ]
  },
  night: {
    label: "夜旅與 Noctourism",
    tone: "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    primary: "#4D96FF",
    accent: "#F9D923",
    deep: "#06142E",
    inputs: [
      { type: "text", key: "city", label: "目的地城市", placeholder: "例如：首爾、東京、台南、曼谷" },
      { type: "choice", key: "time", label: "出門時段", choices: ["日落前", "晚餐後", "午夜前", "清晨前"] },
      { type: "choice", key: "nightMood", label: "夜晚主題", choices: ["夜景", "甜點", "酒吧", "散步", "市集"] },
      { type: "range", key: "safety", label: "安全保守度", min: 1, max: 100, value: 70, left: "敢冒險", right: "保守安全" }
    ]
  },
  detour: {
    label: "避開人潮與繞路",
    tone: "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    primary: "#2F9E44",
    accent: "#FFD166",
    deep: "#071F13",
    inputs: [
      { type: "text", key: "place", label: "原本想去的景點", placeholder: "例如：清水寺、弘大、海雲台、九份" },
      { type: "range", key: "crowd", label: "可忍受人潮", min: 1, max: 100, value: 38, left: "完全不要", right: "可以排隊" },
      { type: "choice", key: "detourType", label: "替代方向", choices: ["小巷", "咖啡", "公園", "在地市場", "觀景點"] },
      { type: "range", key: "walk", label: "願意多走距離", min: 1, max: 100, value: 44, left: "少走路", right: "走遠也行" }
    ]
  },
  wellness: {
    label: "JOMO 與療癒旅行",
    tone: "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    primary: "#00A896",
    accent: "#F28482",
    deep: "#08251F",
    inputs: [
      { type: "choice", key: "energy", label: "目前能量", choices: ["快沒電", "想躲起來", "需要自然", "可以慢慢逛"] },
      { type: "range", key: "screen", label: "想離線程度", min: 1, max: 100, value: 66, left: "照常滑", right: "想關機" },
      { type: "choice", key: "comfort", label: "療癒來源", choices: ["森林", "咖啡", "溫泉", "海邊", "書店"] },
      { type: "range", key: "pace", label: "每天活動量", min: 1, max: 100, value: 34, left: "只做一件事", right: "可以排滿" }
    ]
  },
  culture: {
    label: "故事、影視與文化",
    tone: "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    primary: "#D65DB1",
    accent: "#FFC75F",
    deep: "#271026",
    inputs: [
      { type: "text", key: "reference", label: "靈感作品", placeholder: "一本書、一部電影、一首歌、一個角色" },
      { type: "choice", key: "scene", label: "想進入的場景", choices: ["書店", "老街", "球場", "博物館", "電影場景"] },
      { type: "range", key: "immersion", label: "沉浸程度", min: 1, max: 100, value: 74, left: "輕鬆路過", right: "角色扮演" },
      { type: "choice", key: "souvenir", label: "想帶走什麼", choices: ["照片", "票根", "故事", "伴手禮", "歌單"] }
    ]
  },
  food: {
    label: "美食與咖啡路線",
    tone: "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    primary: "#F77F00",
    accent: "#2EC4B6",
    deep: "#251207",
    inputs: [
      { type: "text", key: "craving", label: "今天想吃喝什麼", placeholder: "咖啡、甜點、市場、辣、早餐、宵夜" },
      { type: "range", key: "queue", label: "排隊耐受度", min: 1, max: 100, value: 42, left: "零排隊", right: "名店也等" },
      { type: "choice", key: "flavor", label: "味覺主題", choices: ["清爽", "重口味", "甜食", "在地", "精緻"] },
      { type: "range", key: "budget", label: "單日美食預算", min: 1, max: 100, value: 55, left: "省一點", right: "吃好一點" }
    ]
  },
  micro: {
    label: "短假與即興旅行",
    tone: "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    primary: "#118AB2",
    accent: "#EF476F",
    deep: "#061D27",
    inputs: [
      { type: "choice", key: "window", label: "可用時間", choices: ["3 小時", "半天", "24 小時", "週末", "請一天假"] },
      { type: "range", key: "budget", label: "預算彈性", min: 1, max: 100, value: 48, left: "很小", right: "可加碼" },
      { type: "choice", key: "transport", label: "交通方式", choices: ["走路", "捷運", "火車", "自駕", "廉航"] },
      { type: "range", key: "spontaneous", label: "即興程度", min: 1, max: 100, value: 73, left: "要先訂好", right: "現在就走" }
    ]
  },
  memory: {
    label: "回憶、分享與內容化",
    tone: "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    primary: "#845EC2",
    accent: "#00C9A7",
    deep: "#18102A",
    inputs: [
      { type: "text", key: "memory", label: "最想留下的一幕", placeholder: "例如：雨中的咖啡店、夜市第一口、車窗風景" },
      { type: "choice", key: "format", label: "分享格式", choices: ["IG 貼文", "限動", "回憶錄", "明信片", "短影音"] },
      { type: "range", key: "emotion", label: "情緒濃度", min: 1, max: 100, value: 68, left: "淡淡的", right: "很想哭" },
      { type: "choice", key: "next", label: "下一趟線索", choices: ["同城市", "相反風格", "更遠一點", "帶朋友去", "自己再去"] }
    ]
  }
};

const toolSeeds = [
  { slug: "save-sprint", category: "social", name: "IG 靈感急救室", tagline: "把堆滿的收藏救成三個可出發方案。", audience: "IG 收藏很多但排不出行程的人", mechanic: "貼上靈感、調整混亂度，立即切成今日必排、可備用、先刪掉三區。", result: "你的收藏不是太多，是還沒有變成路線。", chips: ["收藏清倉", "三站路線", "ChillOut prompt"] },
  { slug: "screenshot-to-route", category: "social", name: "三張截圖路線工坊", tagline: "用三張截圖的線索拼出第一天玩法。", audience: "把旅遊資訊存在相簿裡的人", mechanic: "輸入三個截圖重點，系統會推定主題、移動順序與第一個落腳點。", result: "三個碎片已經足夠開一條路。", chips: ["截圖轉譯", "第一天", "路線順序"] },
  { slug: "creator-trip-remix", category: "social", name: "旅遊創作者路線 Remix", tagline: "把創作者推薦改成自己的版本。", audience: "看 Reels、小紅書、TikTok 找靈感的人", mechanic: "輸入創作者路線與自己的偏好，重混成更符合預算與節奏的版本。", result: "你不需要照抄熱門路線，你需要自己的 Remix。", chips: ["創作者靈感", "預算修正", "個人化"] },
  { slug: "dupe-or-dream", category: "social", name: "爆紅景點值得嗎", tagline: "判斷一個爆紅景點是夢幻還是只是人多。", audience: "想去熱門景點但怕踩雷的人", mechanic: "用期待值、人潮耐受與替代選項產生值得去分數。", result: "值得去的不是名氣，是它是否符合你的旅行任務。", chips: ["值得去分數", "替代點", "拍照時段"] },
  { slug: "saved-post-cleanse", category: "social", name: "收藏斷捨離", tagline: "把永遠不會去的收藏刪掉，留下真的想出發的。", audience: "收藏夾爆炸但每次都重查的人", mechanic: "依出發機率、距離、心動程度切成保留、備用、刪除。", result: "清空收藏夾，也是排出行程的一部分。", chips: ["保留清單", "備用清單", "刪除建議"] },
  { slug: "map-pin-or-mood", category: "social", name: "景點心情分艙", tagline: "同一堆景點，先按情緒分艙再排行程。", audience: "不知道景點該怎麼分天的人", mechanic: "把點位分成興奮、放空、拍照、吃喝，輸出每天主旋律。", result: "行程不是地圖上的點，是每天的情緒節奏。", chips: ["心情分艙", "每日主題", "移動排序"] },
  { slug: "friend-link-inbox", category: "social", name: "朋友丟連結收件箱", tagline: "群組裡的旅遊連結一鍵變成待辦。", audience: "朋友一直丟連結但沒人整理的旅行群", mechanic: "貼上多個連結或店名，工具會分類成食、住、拍、逛與負責人。", result: "不用再往上滑聊天記錄，先把靈感收進同一張桌。", chips: ["群組整理", "負責人", "可執行清單"] },
  { slug: "feed-to-first-day", category: "social", name: "動態牆第一天行程", tagline: "把今天滑到的靈感變成落地第一天。", audience: "即將出國但還在滑靈感的人", mechanic: "選出三個今日最心動的內容，排成抵達後不崩潰的路線。", result: "第一天不用完美，只要能順利開始。", chips: ["落地日", "低壓路線", "第一餐"] },
  { slug: "viral-spot-truth", category: "social", name: "爆紅景點真相卡", tagline: "幫熱門景點補上人潮、交通與期待管理。", audience: "怕被美照騙到的人", mechanic: "輸入景點與期待，輸出真相卡、避雷時段和可替代玩法。", result: "漂亮照片背後需要一張真相卡。", chips: ["真相卡", "避雷", "替代玩法"] },
  { slug: "aesthetic-to-itinerary", category: "social", name: "旅行美學轉行程", tagline: "從一種美學直接生出一天路線。", audience: "先被風格吸引、後面才想目的地的人", mechanic: "選擇奶油、霓虹、復古、森林或海風等美學，輸出對應路線。", result: "你的旅行可以先有風格，再找地點。", chips: ["美學路線", "拍照任務", "ChillOut 生成"] },

  { slug: "trip-mbti", category: "quiz", name: "旅行 MBTI 不是 MBTI", tagline: "測出你真正的旅行操作系統。", audience: "喜歡人格測驗與分享結果的人", mechanic: "四題測節奏、風險、社交與錨點，產生旅行角色與首趟推薦。", result: "你不是難搞，你只是旅行系統設定很明確。", chips: ["人格卡", "角色結果", "分享圖文"] },
  { slug: "city-soulmate", category: "quiz", name: "城市靈魂伴侶", tagline: "找出最像你的城市，而不是最熱門的城市。", audience: "不知道下一站去哪的人", mechanic: "依節奏、夜生活、食物與安靜程度配對城市人格。", result: "下一站可以不是大家推薦的，而是你會喜歡的。", chips: ["城市配對", "下一站", "個性化"] },
  { slug: "travel-villain", category: "quiz", name: "你是哪種旅行反派", tagline: "用好笑方式揭露旅行中最雷的自己。", audience: "適合社群互動與朋友互傳的人", mechanic: "測出你是行程暴君、拍照導演、預算審判長還是睡過頭魔王。", result: "先承認自己的旅行反派，旅伴才有活路。", chips: ["幽默測驗", "朋友互傳", "旅行雷點"] },
  { slug: "airport-archetype", category: "quiz", name: "機場人格測驗", tagline: "從你到機場的行為看出旅行人格。", audience: "出國前會興奮發限動的人", mechanic: "用報到時間、免稅店、登機焦慮與候機習慣生成角色。", result: "機場已經暴露你整趟旅行的樣子。", chips: ["機場角色", "出發前", "限動素材"] },
  { slug: "packing-personality", category: "quiz", name: "行李箱人格", tagline: "用打包方式測你適合的旅行節奏。", audience: "行李常常爆掉或漏帶的人", mechanic: "測打包提前量、備品量與穿搭執念，產出行李人格與提醒。", result: "你的行李箱比你更誠實。", chips: ["行李人格", "打包提示", "出發清單"] },
  { slug: "food-first-or-view-first", category: "quiz", name: "美食派還是風景派", tagline: "決定行程該先鎖餐廳還是先鎖景色。", audience: "排行程時常常選擇障礙的人", mechanic: "用餐點期待、移動距離與拍照需求判斷日程優先級。", result: "順序對了，整天都會輕鬆很多。", chips: ["排序測驗", "餐廳優先", "風景優先"] },
  { slug: "slow-fast-balance", category: "quiz", name: "慢旅快旅比例尺", tagline: "算出你一天該排幾個點才舒服。", audience: "行程常常過滿或太空的人", mechanic: "用體力、好奇心、移動厭惡與休息需求產生日程密度。", result: "不是景點少，是你需要留白。", chips: ["行程密度", "慢旅比例", "舒適節奏"] },
  { slug: "hotel-room-energy", category: "quiz", name: "房型能量測驗", tagline: "從住宿需求反推你這趟旅行要補什麼。", audience: "訂房前猶豫房型與地點的人", mechanic: "評估睡眠、浴缸、景觀、位置需求，產生住宿優先順序。", result: "住宿不是配角，它會決定你有沒有力氣玩。", chips: ["住宿需求", "房型排序", "預算分配"] },
  { slug: "first-day-ritual", category: "quiz", name: "第一日儀式測驗", tagline: "找出抵達當天最適合你的開場。", audience: "旅行第一天容易失控的人", mechanic: "依抵達時間、體力與期待，推薦第一餐、第一站與不要做的事。", result: "第一天的任務是讓旅行順利開始。", chips: ["抵達日", "第一餐", "開場儀式"] },
  { slug: "trip-anxiety-type", category: "quiz", name: "旅行焦慮類型", tagline: "把出發前的不安變成具體備案。", audience: "很想出門但很怕麻煩的人", mechanic: "測出你擔心交通、天氣、預算、語言或失控，生成備案卡。", result: "焦慮不是敵人，它是在提醒你需要備案。", chips: ["焦慮分類", "備案卡", "安心提示"] },

  { slug: "travel-buddy-contract", category: "group", name: "旅行搭子合約", tagline: "出發前先講清楚，途中少吵一點。", audience: "朋友、情侶、家人一起出遊的人", mechanic: "填旅伴、預算、作息與雷點，產生可截圖的旅行合約。", result: "好旅伴不是不吵架，是有事先說清楚。", chips: ["搭子合約", "截圖分享", "出發前"] },
  { slug: "couple-conflict-map", category: "group", name: "情侶旅行雷區圖", tagline: "先標出會吵的點，再排不容易爆炸的路線。", audience: "情侶旅行前想降低摩擦的人", mechanic: "選出拍照、吃飯、早起、預算等雷區，生成避雷協議。", result: "浪漫不是不規劃，是把爆點移除。", chips: ["情侶旅行", "避雷協議", "溝通卡"] },
  { slug: "group-vote-map", category: "group", name: "群組目的地決策器", tagline: "讓群組不用再投票投到消失。", audience: "多人旅遊的主揪", mechanic: "輸入候選地、預算差距與偏好，輸出共識最高的前三名。", result: "群組需要的不是更多討論，是更容易決定。", chips: ["群組投票", "目的地決策", "主揪工具"] },
  { slug: "family-energy-map", category: "group", name: "家族體力地圖", tagline: "把長輩、小孩與年輕人的步調放在同一張圖。", audience: "家庭旅遊規劃者", mechanic: "用成員體力與休息需求，安排上午、午後、晚上的強弱節奏。", result: "家庭旅遊最重要的是誰都不要被拖垮。", chips: ["家庭旅遊", "體力分配", "休息點"] },
  { slug: "who-plans-what", category: "group", name: "旅行分工抽籤", tagline: "把排行程變成可接受的任務分配。", audience: "總是只有一個人在規劃的群組", mechanic: "輸入成員與任務，依興趣分配餐廳、交通、住宿與拍照。", result: "主揪不該是一個人的職業。", chips: ["任務分配", "主揪救援", "群組協作"] },
  { slug: "budget-peace-treaty", category: "group", name: "預算和平協議", tagline: "把錢講清楚，旅行才不尷尬。", audience: "預算差異大的旅伴", mechanic: "估算住宿、餐飲、交通與自由購物分區，生成預算邊界。", result: "先談預算，不是掃興，是讓大家玩得自在。", chips: ["預算共識", "花費邊界", "分帳提示"] },
  { slug: "restaurant-veto", category: "group", name: "餐廳否決權", tagline: "每個人都有一次不想吃的權利。", audience: "多人旅行吃飯最難決定的人", mechanic: "輸入忌口與想吃，生成候選餐廳規則與否決權。", result: "餐廳不是猜心遊戲，是共同規則。", chips: ["餐廳共識", "否決權", "忌口整理"] },
  { slug: "morning-night-truce", category: "group", name: "早鳥夜貓停戰協議", tagline: "早起派與夜貓派可以同一趟旅行共存。", audience: "作息差很大的旅伴", mechanic: "輸入作息與必做項目，安排分流時段與集合點。", result: "不必同時起床，也可以一起旅行。", chips: ["作息分流", "集合點", "停戰協議"] },
  { slug: "photo-duty-roulette", category: "group", name: "拍照任務輪盤", tagline: "把拍照責任公平又好玩地輪流。", audience: "旅行中常常為拍照吵架的人", mechanic: "分配攝影師、導演、道具、側拍與成果發布任務。", result: "好照片需要分工，不需要互相嫌棄。", chips: ["拍照分工", "任務輪盤", "限動素材"] },
  { slug: "solo-or-social", category: "group", name: "獨處社交排程器", tagline: "多人旅行也能留出自己喘氣的時間。", audience: "跟朋友旅行但需要獨處的人", mechanic: "設定獨處需求與共同活動，輸出可接受的分開行動時段。", result: "分開一下，不代表不想一起玩。", chips: ["獨處時段", "共同活動", "低摩擦"] },

  { slug: "night-owl-route", category: "night", name: "夜貓城市路線", tagline: "專為晚上才醒來的人排一條城市線。", audience: "喜歡夜生活、夜景、深夜散步的人", mechanic: "選城市、夜晚主題與安全保守度，生成 19:00 後路線。", result: "有些城市要等天黑才真正開始。", chips: ["夜遊路線", "深夜", "安全提示"] },
  { slug: "sunset-countdown", category: "night", name: "日落倒數排程", tagline: "從日落時間倒推一整個傍晚。", audience: "想拍夕陽但常常錯過的人", mechanic: "用抵達時間與拍照需求倒推交通、咖啡、觀景點與晚餐。", result: "好的日落不是碰運氣，是倒推安排。", chips: ["日落", "倒數", "觀景點"] },
  { slug: "moonwalk-map", category: "night", name: "月光散步地圖", tagline: "排一條安靜、漂亮、不趕路的夜間散步。", audience: "想在城市裡慢慢走的人", mechanic: "依城市、安全值與氛圍，生成散步距離、停留點與回程方式。", result: "夜晚不是一定要熱鬧，也可以很溫柔。", chips: ["散步", "安靜", "夜景"] },
  { slug: "late-night-dessert", category: "night", name: "深夜甜點雷達", tagline: "把晚餐後的空白變成甜點任務。", audience: "旅行中永遠還想吃甜點的人", mechanic: "用城市與甜點類型，產生深夜甜點、散步與拍照組合。", result: "甜點不是加餐，是夜晚的句點。", chips: ["甜點", "宵夜", "散步"] },
  { slug: "red-eye-rescue", category: "night", name: "紅眼航班救援包", tagline: "紅眼前後不再狼狽。", audience: "搭早班或紅眼班機的人", mechanic: "輸入班機時間與保守度，安排淋浴、寄物、咖啡與補眠策略。", result: "紅眼航班需要的是緩衝，不是硬撐。", chips: ["紅眼航班", "寄物", "補眠"] },
  { slug: "night-safety-pass", category: "night", name: "夜遊安全通行證", tagline: "把夜遊風險轉成簡單檢核與路線限制。", audience: "想夜遊但重視安全的人", mechanic: "依城市、同行人數與回程方式，生成安全檢核與不要去區域。", result: "玩得晚可以，但回得去更重要。", chips: ["安全檢核", "回程", "夜遊"] },
  { slug: "neon-photo-mission", category: "night", name: "霓虹拍照任務", tagline: "用任務卡拍出一組夜晚照片。", audience: "想拍夜間城市感照片的人", mechanic: "選城市與風格，產生招牌、倒影、路口、人物四種任務。", result: "霓虹不是背景，是照片任務。", chips: ["拍照任務", "霓虹", "限動"] },
  { slug: "star-chaser", category: "night", name: "星空追逐卡", tagline: "用簡單條件判斷今晚值不值得追星。", audience: "想看星空、銀河或夜景的人", mechanic: "輸入城市與移動距離，生成追星可行度與備案。", result: "追星空要浪漫，也要備案。", chips: ["星空", "備案", "夜間交通"] },
  { slug: "night-market-boss", category: "night", name: "夜市點餐 Boss", tagline: "把夜市變成一場有路線的任務。", audience: "去夜市不知道怎麼吃的人", mechanic: "選飢餓程度與排隊耐受，產生主食、甜點、飲料與遊戲順序。", result: "夜市不需要全吃，需要吃得有節奏。", chips: ["夜市", "點餐順序", "任務"] },
  { slug: "after-dark-date", category: "night", name: "夜景約會生成器", tagline: "用低壓方式排一個晚上約會。", audience: "想安排城市夜晚約會的人", mechanic: "選城市、親密度與預算，產出餐後散步、夜景與收尾。", result: "好的約會不靠塞滿，靠節奏。", chips: ["約會", "夜景", "晚餐後"] },

  { slug: "crowd-escape-plan", category: "detour", name: "人潮逃生路線", tagline: "熱門景點太擠時，立刻切出備案。", audience: "討厭排隊與人群的人", mechanic: "輸入景點和人潮耐受，生成 15、30、60 分鐘替代方案。", result: "你可以去熱門地方，但不必困在熱門地方。", chips: ["人潮備案", "替代路線", "即時切換"] },
  { slug: "dupe-destination", category: "detour", name: "替代目的地選擇器", tagline: "找出同氛圍但更少人的選項。", audience: "想要熱門感但不要熱門人潮的人", mechanic: "用原景點的氛圍，推薦小眾替代與比較理由。", result: "有時候 dupe 才是真正適合你的夢幻點。", chips: ["替代目的地", "少人", "比較表"] },
  { slug: "two-km-sidequest", category: "detour", name: "2 公里支線任務", tagline: "在主要景點旁邊多找一個驚喜。", audience: "想在行程中加入小冒險的人", mechanic: "輸入主景點，生成步行 2 公里內的咖啡、巷弄或觀景任務。", result: "最有記憶點的常常是支線。", chips: ["支線任務", "步行", "驚喜點"] },
  { slug: "station-mini-trip", category: "detour", name: "車站微旅行", tagline: "只用一個車站周邊排出半天。", audience: "轉車、等人或短時間空檔的人", mechanic: "輸入車站與可用時間，生成吃、逛、休息三段。", result: "車站不是路過，它也能是一段旅行。", chips: ["車站", "半天", "微旅行"] },
  { slug: "airport-layover-card", category: "detour", name: "轉機城市卡", tagline: "讓轉機不只是坐在登機門前。", audience: "有 4 到 10 小時轉機的人", mechanic: "輸入轉機時間與保守度，產生出境可行度與安全路線。", result: "轉機時間可以是一張城市試吃券。", chips: ["轉機", "機場", "快閃城市"] },
  { slug: "small-town-mood", category: "detour", name: "小鎮氛圍雷達", tagline: "找出更適合你心情的小鎮。", audience: "不想只去首都或大城市的人", mechanic: "依安靜度、交通與氛圍，配對小鎮旅行玩法。", result: "小鎮不一定無聊，它只是需要對的人。", chips: ["小鎮", "慢旅", "氛圍"] },
  { slug: "shoulder-season-fit", category: "detour", name: "淡季適配測驗", tagline: "判斷你適不適合淡季出發。", audience: "想省錢但怕天氣與冷清的人", mechanic: "評估天氣容忍、預算敏感與人潮厭惡，輸出淡季適合度。", result: "淡季不是便宜版旺季，是另一種玩法。", chips: ["淡季", "省錢", "天氣備案"] },
  { slug: "no-line-food-route", category: "detour", name: "零排隊美食路線", tagline: "避開名店長隊，吃到同樣滿足的一天。", audience: "想吃好但不想等的人", mechanic: "用排隊耐受與味覺主題，生成替代餐廳和錯峰時段。", result: "不排隊不代表吃得隨便。", chips: ["零排隊", "錯峰", "美食替代"] },
  { slug: "hidden-morning", category: "detour", name: "早晨空城玩法", tagline: "在城市醒來前先玩一輪。", audience: "願意早起換安靜體驗的人", mechanic: "依起床時間與想拍主題，排出早餐、散步與第一景點。", result: "早晨是人潮最少的特權。", chips: ["早晨", "空城", "早餐"] },
  { slug: "popular-place-filter", category: "detour", name: "熱門景點過濾器", tagline: "不是所有熱門都該進你的行程。", audience: "不想被必去清單綁架的人", mechanic: "用期待、交通、排隊與替代選項，決定保留或移除。", result: "刪掉一個景點，可能救回一整天。", chips: ["必去檢查", "刪除建議", "路線優化"] },

  { slug: "jomo-day-planner", category: "wellness", name: "JOMO 一日排程", tagline: "為不想趕、不想打卡的人排一天。", audience: "旅行中想慢下來的人", mechanic: "用能量、離線需求與療癒來源，生成低壓日程。", result: "錯過一些東西，才有空感覺自己在旅行。", chips: ["JOMO", "低壓", "慢旅"] },
  { slug: "digital-detox-pass", category: "wellness", name: "離線旅行通行證", tagline: "設計一段真的不需要一直滑手機的旅行。", audience: "想降低螢幕時間的人", mechanic: "設定離線程度，輸出下載資料、紙本備份與離線任務。", result: "離線不是失聯，是把注意力還給現場。", chips: ["離線", "任務卡", "安心備份"] },
  { slug: "forest-bath-recipe", category: "wellness", name: "森林浴配方", tagline: "用自然、步速與停留時間做一帖恢復配方。", audience: "需要自然恢復的人", mechanic: "選體力與自然偏好，產生散步、停留與安靜時段。", result: "森林不是景點，是恢復系統。", chips: ["森林浴", "自然", "恢復"] },
  { slug: "sleep-in-trip", category: "wellness", name: "睡到自然醒旅行", tagline: "不早起也能有漂亮的一天。", audience: "討厭早起但又想玩的人", mechanic: "設定起床時間與活動量，重排午後到夜晚的路線。", result: "睡飽的人，才有力氣喜歡一座城市。", chips: ["晚起", "午後", "不趕"] },
  { slug: "low-energy-route", category: "wellness", name: "低電量行程", tagline: "只剩 20% 體力也能出門一下。", audience: "旅行中突然累到不行的人", mechanic: "選能量與交通限制，產生近距離、少轉乘、可坐下的路線。", result: "低電量也可以有一個很好的下午。", chips: ["低體力", "少走路", "補電"] },
  { slug: "quiet-cafe-loop", category: "wellness", name: "安靜咖啡環線", tagline: "用咖啡店串出可以休息的一天。", audience: "咖啡與安靜空間愛好者", mechanic: "選城市與安靜程度，安排咖啡、書店、散步的循環。", result: "咖啡店可以是旅行的充電站。", chips: ["咖啡", "安靜", "環線"] },
  { slug: "healing-weather-plan", category: "wellness", name: "天氣療癒路線", tagline: "把雨天、陰天、悶熱天變成合適玩法。", audience: "旅行遇到天氣變差的人", mechanic: "輸入天氣感受與體力，產生室內、半室內與療癒備案。", result: "天氣不是失敗，只是換一種旅行語法。", chips: ["雨天", "備案", "療癒"] },
  { slug: "burnout-escape", category: "wellness", name: "倦怠逃跑計畫", tagline: "為真的累了的人設計一趟小逃跑。", audience: "工作倦怠、想短暫離開日常的人", mechanic: "用疲憊類型與可用時間，生成低決策成本的逃跑方案。", result: "你需要的不是遠方，是一個可以喘氣的安排。", chips: ["倦怠", "逃跑", "低決策"] },
  { slug: "no-posting-trip", category: "wellness", name: "不發限動宣言", tagline: "做一張旅行中不需要證明的宣言卡。", audience: "想放下社群壓力的人", mechanic: "設定不發文程度與想保留的私密回憶，產生宣言與離線任務。", result: "沒有發出來的旅行，也是真的旅行。", chips: ["不發文", "宣言卡", "私密回憶"] },
  { slug: "comfort-food-map", category: "wellness", name: "安心食物地圖", tagline: "陌生城市裡找幾個讓人穩定下來的味道。", audience: "出國容易吃不習慣的人", mechanic: "輸入安心食物與預算，安排熟悉味道與在地嘗試的比例。", result: "安心感是探索的底座。", chips: ["安心食物", "比例", "舒適區"] },

  { slug: "booktok-passport", category: "culture", name: "BookTok 旅行護照", tagline: "把書中的場景變成旅遊任務章。", audience: "愛書、BookTok、文青旅行者", mechanic: "輸入書名或氛圍，產生書店、咖啡、場景與一句摘錄任務。", result: "一本書可以變成一張城市護照。", chips: ["BookTok", "書店", "任務章"] },
  { slug: "movie-scene-day", category: "culture", name: "電影場景一日", tagline: "用一部電影的感覺排一天。", audience: "影迷與拍照型旅人", mechanic: "輸入電影或類型，生成場景、鏡頭、晚餐與配樂。", result: "你可以不是主角，但可以走進那種畫面。", chips: ["電影感", "場景", "配樂"] },
  { slug: "character-day-out", category: "culture", name: "角色扮演旅行", tagline: "用一個角色的人設排出旅行任務。", audience: "喜歡動漫、遊戲、影劇角色的人", mechanic: "輸入角色或人設，產生穿搭、場景、台詞與路線。", result: "旅行也可以是一場輕量角色扮演。", chips: ["角色", "任務", "穿搭"] },
  { slug: "playlist-to-trip", category: "culture", name: "歌單轉行程", tagline: "把一張歌單翻譯成城市節奏。", audience: "喜歡用音樂決定旅行心情的人", mechanic: "輸入歌單關鍵字，生成上午、午後、夜晚三段氛圍路線。", result: "歌單先選好，城市就有了節拍。", chips: ["歌單", "節奏", "氛圍"] },
  { slug: "bookstore-crawl", category: "culture", name: "書店巡禮", tagline: "把書店、咖啡、散步排成一條文化線。", audience: "書店控與獨旅者", mechanic: "選城市、安靜程度與停留時間，產出三間書店路線。", result: "書店是陌生城市裡最容易安定下來的地方。", chips: ["書店", "咖啡", "散步"] },
  { slug: "anime-quest-card", category: "culture", name: "動漫聖地任務卡", tagline: "把聖地巡禮做成任務，而不是打卡清單。", audience: "動漫迷、ACG 旅人", mechanic: "輸入作品與沉浸程度，產生場景任務、拍照角度與禮貌提醒。", result: "聖地巡禮要像任務，也要尊重現場。", chips: ["聖地巡禮", "任務卡", "拍照角度"] },
  { slug: "romance-filter-trip", category: "culture", name: "浪漫濾鏡旅行", tagline: "把一座城市調成你想要的浪漫感。", audience: "情侶、約會、紀念日旅行", mechanic: "選浪漫濃度與預算，生成散步、餐廳、夜景與回憶卡。", result: "浪漫不是景點，是每段距離的安排。", chips: ["浪漫", "約會", "回憶卡"] },
  { slug: "museum-mood-match", category: "culture", name: "博物館心情配對", tagline: "今天的心情適合哪一種展覽。", audience: "喜歡展覽但不想亂逛的人", mechanic: "依心情、耐心與主題，推薦展覽類型與前後行程。", result: "看展也需要配對，不是只看熱門。", chips: ["展覽", "博物館", "心情"] },
  { slug: "local-sports-starter", category: "culture", name: "在地球賽入門", tagline: "第一次看海外球賽也不尷尬。", audience: "想體驗在地運動文化的人", mechanic: "選運動、城市與社交程度，生成購票、周邊與賽後路線。", result: "球賽是最快進入一座城市情緒的方法。", chips: ["球賽", "在地文化", "賽後"] },
  { slug: "festival-fit-check", category: "culture", name: "節慶旅行適配器", tagline: "判斷一個節慶是否真的適合你去。", audience: "想追節慶但怕人潮與成本的人", mechanic: "輸入節慶、人潮忍受與預算，產生適配分數與替代玩法。", result: "節慶很美，但適不適合你要另外判斷。", chips: ["節慶", "適配", "人潮"] },

  { slug: "coffee-crawl-builder", category: "food", name: "咖啡廳巡航器", tagline: "把三間咖啡廳排成不膩的一天。", audience: "咖啡控、遠端工作者、城市散步者", mechanic: "輸入咖啡偏好與排隊耐受，安排第一杯、甜點杯、收尾杯。", result: "咖啡路線需要節奏，不是越多越好。", chips: ["咖啡", "巡航", "甜點"] },
  { slug: "breakfast-personality", category: "food", name: "早餐人格", tagline: "從早餐選擇看出今天該怎麼玩。", audience: "喜歡早餐與早晨城市的人", mechanic: "選早餐類型、起床時間與預算，生成上午行程。", result: "早餐決定你和城市的第一句話。", chips: ["早餐", "上午", "人格"] },
  { slug: "dessert-walk-balance", category: "food", name: "甜點步行平衡", tagline: "用步行距離合理化每一份甜點。", audience: "甜點愛好者與城市散步者", mechanic: "設定甜點濃度與走路意願，安排吃與走的節奏。", result: "甜點和散步，本來就是一組。", chips: ["甜點", "步行", "平衡"] },
  { slug: "market-menu-decoder", category: "food", name: "市場點餐翻譯卡", tagline: "進市場前先知道怎麼點比較不慌。", audience: "喜歡市場但怕語言與選擇障礙的人", mechanic: "輸入市場與忌口，生成點餐句、必吃順序與備選。", result: "市場的第一關不是食物，是開口點餐。", chips: ["市場", "點餐", "翻譯卡"] },
  { slug: "queue-worth-it", category: "food", name: "排隊值得嗎", tagline: "用等待時間判斷名店要不要排。", audience: "面對排隊餐廳猶豫的人", mechanic: "輸入等待時間、飢餓度與替代選項，產生排隊決策。", result: "不是名店都值得排，也不是排隊都浪費。", chips: ["排隊", "決策", "替代餐廳"] },
  { slug: "hotel-restaurant-detour", category: "food", name: "飯店餐廳繞路值", tagline: "判斷為了一餐多繞路值不值得。", audience: "想把餐廳排進動線的人", mechanic: "用餐廳期待、交通成本與行程密度，算出繞路值。", result: "為了好吃繞路可以，但要知道代價。", chips: ["繞路值", "餐廳", "交通"] },
  { slug: "food-budget-split", category: "food", name: "美食預算切割", tagline: "決定哪一餐該花錢，哪一餐該省。", audience: "想吃好但預算有限的人", mechanic: "設定單日預算與重點餐，輸出早餐、午餐、晚餐、零食分配。", result: "美食預算不是平均分，是投資重點。", chips: ["預算", "餐別", "分配"] },
  { slug: "spicy-tolerance-map", category: "food", name: "辣度路線", tagline: "用辣度承受力安排一整天吃法。", audience: "去泰國、韓國、四川等地怕太辣的人", mechanic: "輸入辣度能力與想挑戰程度，安排安全到冒險的順序。", result: "辣也要循序漸進。", chips: ["辣度", "挑戰", "安全"] },
  { slug: "midnight-snack-map", category: "food", name: "宵夜地圖", tagline: "晚餐後真正想吃的那一站。", audience: "夜貓與宵夜愛好者", mechanic: "選城市、時間與味覺，產生宵夜、安全回程與散步距離。", result: "宵夜是夜晚的第二個目的地。", chips: ["宵夜", "回程", "夜晚"] },
  { slug: "taste-memory-card", category: "food", name: "味覺回憶卡", tagline: "把一餐變成旅行後可以分享的故事。", audience: "想把美食內容化的人", mechanic: "輸入最難忘的一口，生成標題、描述與下一站靈感。", result: "記住一座城市，常常是從一口味道開始。", chips: ["味覺", "回憶", "分享文"] },

  { slug: "twenty-four-hour-escape", category: "micro", name: "24 小時逃跑", tagline: "只有一天也能離開日常。", audience: "週末很短但想出門的人", mechanic: "選可用時間、交通與預算，生成 24 小時快閃計畫。", result: "一天不長，但足夠換一個心情。", chips: ["24 小時", "快閃", "短假"] },
  { slug: "leave-day-multiplier", category: "micro", name: "請假倍率計算機", tagline: "用最少請假天數換最多旅行時間。", audience: "上班族與學生族群", mechanic: "輸入假期窗口與預算，產生請假策略與行程密度。", result: "請假的藝術，是把一天變成三天的感覺。", chips: ["請假", "連假", "效率"] },
  { slug: "tiny-budget-trip", category: "micro", name: "小預算旅行", tagline: "把低預算變成玩法限制，不是失敗條件。", audience: "想省錢但仍想出門的人", mechanic: "設定預算與交通，產出免費景點、便宜餐與可加碼選項。", result: "預算小，也可以很有設計感。", chips: ["小預算", "免費", "加碼"] },
  { slug: "one-bag-challenge", category: "micro", name: "一包出發挑戰", tagline: "只帶一個包也能完成一趟短旅。", audience: "輕裝旅行與即興出發的人", mechanic: "選時間與目的地氣候，生成必帶、可不帶、現地買清單。", result: "少帶一點，出發阻力就少很多。", chips: ["輕裝", "打包", "即興"] },
  { slug: "weather-switcher", category: "micro", name: "天氣切換器", tagline: "天氣變了，行程不用整個重排。", audience: "行前遇到天氣突變的人", mechanic: "選雨、熱、冷或陰天，生成相同氛圍的室內替代。", result: "真正好的行程可以切換，不會崩掉。", chips: ["天氣", "切換", "備案"] },
  { slug: "spontaneous-spinner", category: "micro", name: "即興目的地輪盤", tagline: "不知道去哪，就讓條件幫你抽。", audience: "想出去但懶得決定的人", mechanic: "設定時間、交通、預算，抽出一個符合限制的玩法。", result: "即興不是亂選，是把限制變成遊戲。", chips: ["輪盤", "即興", "抽籤"] },
  { slug: "train-window-trip", category: "micro", name: "車窗小旅行", tagline: "用一段火車路線安排沿線停靠。", audience: "喜歡鐵道、窗景與小城的人", mechanic: "選可用時間與交通，產生沿線兩站停靠與窗景任務。", result: "火車不是交通，是慢慢進入旅行的方法。", chips: ["火車", "窗景", "沿線"] },
  { slug: "three-hour-city", category: "micro", name: "三小時城市", tagline: "只有三小時，也能有完整的城市切片。", audience: "等人、轉車、出差空檔的人", mechanic: "輸入地點與三小時窗口，安排一餐、一走、一休息。", result: "三小時不夠玩城市，但夠記住一個切面。", chips: ["三小時", "城市切片", "空檔"] },
  { slug: "little-treat-route", category: "micro", name: "小確幸路線", tagline: "為自己安排一條小小但有效的快樂路線。", audience: "想用一點時間恢復心情的人", mechanic: "選時間、預算與心情，產生咖啡、甜點、散步或小店路線。", result: "不是每趟旅行都要很大，小確幸也能有路線。", chips: ["小確幸", "短線", "快樂"] },
  { slug: "return-home-buffer", category: "micro", name: "回家緩衝排程", tagline: "旅程最後一天不要直接崩回現實。", audience: "旅行結束後容易累壞的人", mechanic: "設定返家時間與疲勞度，安排最後一餐、整理與緩衝。", result: "好的旅行，應該連回家都被照顧到。", chips: ["返程", "緩衝", "最後一天"] },

  { slug: "trip-cover-maker", category: "memory", name: "旅行封面產生器", tagline: "替這趟旅行做一張像專輯封面的卡。", audience: "想分享漂亮回憶的人", mechanic: "輸入一幕記憶、格式與情緒濃度，生成封面標題與視覺方向。", result: "每趟旅行都值得有一張封面。", chips: ["封面", "回憶錄", "分享"] },
  { slug: "photo-dump-director", category: "memory", name: "Photo Dump 導演", tagline: "幫一堆照片排出有節奏的分享順序。", audience: "旅行後照片很多但不知道怎麼發的人", mechanic: "輸入主題與情緒，生成開場、轉折、食物、人物、收尾順序。", result: "Photo dump 也需要導演。", chips: ["照片排序", "IG", "導演"] },
  { slug: "trip-wrapped-card", category: "memory", name: "旅行 Wrapped", tagline: "把一趟旅行整理成年終回顧式卡片。", audience: "喜歡 Spotify Wrapped 式內容的人", mechanic: "輸入最想留下的一幕，生成數據感回顧與下一趟線索。", result: "回憶如果有數據，就更容易被分享。", chips: ["Wrapped", "數據卡", "回顧"] },
  { slug: "souvenir-persona", category: "memory", name: "伴手禮人格", tagline: "你買的伴手禮透露你的旅行偏好。", audience: "喜歡買禮物、送朋友的人", mechanic: "選伴手禮類型與對象，生成伴手禮人格與下次推薦。", result: "伴手禮其實是你的旅行簽名。", chips: ["伴手禮", "人格", "送禮"] },
  { slug: "future-postcard", category: "memory", name: "未來明信片", tagline: "寫一張寄給下一趟自己的明信片。", audience: "喜歡情緒、文字與慢旅行的人", mechanic: "輸入這趟最想記住的畫面，生成未來明信片文案。", result: "最好的紀念品，是提醒自己還會再出發。", chips: ["明信片", "未來", "文字"] },
  { slug: "memory-title-lab", category: "memory", name: "回憶錄標題室", tagline: "替旅行手冊取一個真的想點開的標題。", audience: "ChillOut 回憶錄使用者與內容創作者", mechanic: "輸入旅程畫面與情緒，生成 12 個標題、短句與 hashtag。", result: "標題不是裝飾，它決定回憶被不被打開。", chips: ["標題", "回憶錄", "hashtag"] },
  { slug: "achievement-badges", category: "memory", name: "旅行成就徽章", tagline: "把旅行中的小事變成徽章。", audience: "喜歡遊戲化與分享成就的人", mechanic: "選完成事件，生成第一次、意外、勇敢、放空等徽章。", result: "旅行裡的小事，也可以有成就感。", chips: ["徽章", "遊戲化", "分享"] },
  { slug: "gratitude-card", category: "memory", name: "旅行感謝卡", tagline: "替旅伴、店家或一座城市寫感謝卡。", audience: "想把旅行後情緒整理出來的人", mechanic: "輸入想感謝的人事物，生成一張可分享的感謝卡。", result: "感謝會讓旅行的尾巴更長。", chips: ["感謝卡", "旅伴", "城市"] },
  { slug: "next-trip-oracle", category: "memory", name: "下一趟旅行預言", tagline: "從這趟的回憶推測你的下一站。", audience: "旅行後馬上想再出發的人", mechanic: "用最難忘的一幕與下一趟線索，產生三個目的地預言。", result: "下一趟旅行常常藏在這趟最喜歡的瞬間裡。", chips: ["下一站", "預言", "推薦"] },
  { slug: "one-photo-next-trip", category: "memory", name: "一張照片下一站", tagline: "用一張照片的情緒推一個下一趟方向。", audience: "想從照片找靈感的人", mechanic: "描述一張照片，工具會判斷情緒、景色與下一站方向。", result: "一張照片不只記錄過去，也會暴露你接下來想去哪。", chips: ["照片", "下一站", "情緒"] }
];

const tools = toolSeeds.map((tool, index) => {
  const category = categories[tool.category];
  const id = `T${String(index + 1).padStart(3, "0")}`;
  return {
    ...tool,
    id,
    categoryLabel: category.label,
    categoryTone: category.tone,
    primary: category.primary,
    accent: category.accent,
    deep: category.deep,
    inputs: category.inputs,
    appUrl: `${appStoreUrl}?ct=tool_${tool.slug}`,
    pageUrl: `https://chillout-marketing-dashboard.vercel.app/tools/${tool.slug}.html`
  };
});

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

function posterSvg(tool) {
  const chips = tool.chips.map((chip, i) => {
    const y = 322 + i * 40;
    return `<rect x="62" y="${y}" width="${140 + i * 26}" height="25" rx="12.5" fill="rgba(255,255,255,.16)"/><text x="78" y="${y + 17}" font-size="13" fill="#F8FBFF" font-weight="700">${escapeHtml(chip)}</text>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${escapeAttr(tool.name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tool.deep}"/>
      <stop offset=".52" stop-color="${tool.primary}"/>
      <stop offset="1" stop-color="${tool.accent}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="22"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="210" fill="rgba(255,255,255,.18)" filter="url(#soft)"/>
  <circle cx="155" cy="760" r="250" fill="rgba(255,255,255,.12)" filter="url(#soft)"/>
  <rect x="70" y="70" width="1060" height="760" rx="48" fill="rgba(8,14,24,.38)" stroke="rgba(255,255,255,.24)"/>
  <text x="96" y="126" font-size="24" fill="#F8FBFF" font-weight="800" letter-spacing="2">${tool.id} · ${escapeHtml(tool.categoryLabel)}</text>
  <text x="96" y="205" font-size="58" fill="#FFFFFF" font-weight="900">${escapeHtml(tool.name)}</text>
  <text x="98" y="260" font-size="28" fill="rgba(255,255,255,.82)" font-weight="700">${escapeHtml(tool.tagline)}</text>
  <rect x="760" y="155" width="270" height="520" rx="34" fill="rgba(255,255,255,.94)"/>
  <rect x="788" y="194" width="214" height="42" rx="18" fill="${tool.deep}"/>
  <rect x="790" y="266" width="186" height="16" rx="8" fill="${tool.primary}"/>
  <rect x="790" y="298" width="126" height="16" rx="8" fill="rgba(9,20,34,.18)"/>
  <circle cx="895" cy="420" r="92" fill="${tool.primary}"/>
  <text x="895" y="440" font-size="58" text-anchor="middle" fill="#FFFFFF" font-weight="900">${70 + (Number(tool.id.slice(1)) % 26)}</text>
  <rect x="815" y="552" width="160" height="46" rx="23" fill="${tool.accent}"/>
  <text x="895" y="582" font-size="18" text-anchor="middle" fill="${tool.deep}" font-weight="900">Open ChillOut</text>
  ${chips}
  <path d="M109 656 C236 596 325 742 460 666 S686 570 796 654" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="8" stroke-linecap="round"/>
  <circle cx="110" cy="656" r="13" fill="${tool.accent}"/>
  <circle cx="462" cy="666" r="13" fill="${tool.accent}"/>
  <circle cx="796" cy="654" r="13" fill="${tool.accent}"/>
</svg>`;
}

function pageTemplate(tool) {
  const data = JSON.stringify(tool).replaceAll("</", "<\\/");
  const title = `${tool.name}｜ChillOut 旅行小工具`;
  const description = `${tool.tagline}${tool.mechanic} 完成後可複製分享文案，並導回 ChillOut App 生成完整行程。`;
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(tool.tagline)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeAttr(tool.pageUrl)}">
  <meta property="og:image" content="https://chillout-marketing-dashboard.vercel.app/assets/tool-posters/${tool.slug}.svg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${escapeAttr(tool.pageUrl)}">
  <link rel="stylesheet" href="../assets/styles.css?v=base">
  <link rel="stylesheet" href="../assets/tool-products.css?v=20260525b">
</head>
<body class="tool-product-page" style="--tool-primary:${tool.primary};--tool-accent:${tool.accent};--tool-deep:${tool.deep}">
  <header class="product-nav">
    <a class="product-brand" href="../travel-microtools-100.html">
      <span class="brand-mark">C</span>
      <span><strong>ChillOut</strong><small>Travel Microtools</small></span>
    </a>
    <nav aria-label="主要導覽">
      <a href="../travel-microtools-100.html">100 小工具</a>
      <a href="../ig-chaos-index.html">混亂指數</a>
      <a href="../ig-travel-planner.html">IG 排行程</a>
      <a href="${appStoreUrl}?ct=tool_${tool.slug}_nav">下載 App</a>
    </nav>
  </header>

  <main>
    <section class="product-hero">
      <div class="product-copy">
        <p class="product-kicker">${tool.id} · ${escapeHtml(tool.categoryLabel)}</p>
        <h1>${escapeHtml(tool.name)}</h1>
        <p class="product-lead">${escapeHtml(tool.tagline)}</p>
        <div class="product-pills">
          ${tool.chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("")}
        </div>
      </div>
      <figure class="product-poster">
        <img src="../assets/tool-posters/${tool.slug}.svg" alt="${escapeAttr(tool.name)} 互動工具視覺">
      </figure>
    </section>

    <section class="product-workbench" aria-label="${escapeAttr(tool.name)} 互動操作區">
      <div class="workbench-intro">
        <p class="product-kicker">玩法</p>
        <h2>${escapeHtml(tool.mechanic)}</h2>
        <p>${escapeHtml(tool.audience)}可以在 30 秒內得到一張可分享的結果卡，再把結果丟進 ChillOut 生成完整行程。</p>
      </div>
      <div class="tool-console" data-tool-console></div>
      <aside class="result-panel" data-result-panel>
        <div class="result-card" data-result-card>
          <span>Result Card</span>
          <strong data-result-score>--</strong>
          <h2 data-result-title>先完成左側設定</h2>
          <p data-result-copy>輸入你的旅行條件，這裡會生成一張可分享、可導回 ChillOut 的結果卡。</p>
          <div class="result-chip-row" data-result-chips></div>
          <div class="result-prompt">
            <small>ChillOut Prompt</small>
            <p data-result-prompt>完成後自動產生。</p>
          </div>
          <div class="result-actions">
            <button type="button" class="product-button" data-copy-result>複製分享文案</button>
            <a class="product-button primary" data-app-link href="${appStoreUrl}?ct=tool_${tool.slug}_result">丟進 ChillOut</a>
          </div>
        </div>
      </aside>
    </section>

    <section class="product-usage">
      <article>
        <span>01</span>
        <h2>社群鉤子</h2>
        <p>把測驗結果做成限動、Threads、Dcard 或小紅書圖文，讓使用者願意貼自己的分數。</p>
      </article>
      <article>
        <span>02</span>
        <h2>App 導流</h2>
        <p>結果卡的 prompt 會直接把使用者帶到 ChillOut，下一步就是生成行程、分享手冊或回憶錄。</p>
      </article>
      <article>
        <span>03</span>
        <h2>行銷組操作</h2>
        <p>每個工具都有獨立網址，可單獨投放、做 SEO、找創作者拍短片或加入活動頁。</p>
      </article>
    </section>
  </main>

  <script type="application/json" id="tool-data">${data}</script>
  <script src="../assets/independent-tool-runtime.js"></script>
</body>
</html>`;
}

function galleryTemplate() {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>100 個 ChillOut 旅行小工具｜可獨立上線的行銷產品庫</title>
  <meta name="description" content="100 個獨立、可互動、可分享、可導流回 ChillOut App 的旅行小工具。每個工具都有自己的頁面、玩法、結果卡與 App 導流。">
  <meta property="og:title" content="100 個 ChillOut 旅行小工具">
  <meta property="og:description" content="不是靜態清單，而是 100 個可獨立上線的小產品。">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://chillout-marketing-dashboard.vercel.app/travel-microtools-100.html">
  <meta property="og:image" content="https://chillout-marketing-dashboard.vercel.app/assets/tool-posters/save-sprint.svg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://chillout-marketing-dashboard.vercel.app/travel-microtools-100.html">
  <link rel="stylesheet" href="assets/styles.css?v=base">
  <link rel="stylesheet" href="assets/tool-products.css?v=20260525b">
</head>
<body class="tool-gallery-page">
  <header class="product-nav gallery-nav">
    <a class="product-brand" href="index.html">
      <span class="brand-mark">C</span>
      <span><strong>ChillOut</strong><small>Growth Lab</small></span>
    </a>
    <nav aria-label="主要導覽">
      <a href="index.html">下載頁</a>
      <a href="ig-chaos-index.html">混亂指數</a>
      <a href="ig-travel-planner.html">IG 排行程</a>
      <a href="launch-kit.html">分享素材</a>
    </nav>
  </header>

  <main>
    <section class="directory-hero">
      <div>
        <p class="product-kicker">2026 travel growth products</p>
        <h1>100 個獨立旅行小工具連結。</h1>
        <p>這不是單一頁面裡的一百個段落。下面每一張卡都是一個獨立工具頁，可以單獨投放、單獨分享、單獨做 SEO，最後都把結果導回 ChillOut App。</p>
      </div>
      <div class="directory-actions">
        <a class="product-button primary" href="tools/save-sprint.html">打開 T001</a>
        <button class="product-button" type="button" data-random-tool>隨機抽一個</button>
        <a class="product-button" href="${appStoreUrl}?ct=tool_directory_hero">下載 ChillOut</a>
      </div>
    </section>

    <section class="directory-toolbar">
      <div class="directory-stat"><strong>100</strong><span>獨立 URL</span></div>
      <div class="directory-stat"><strong>10</strong><span>主題系列</span></div>
      <div class="directory-stat"><strong>100%</strong><span>導流 App</span></div>
      <label class="gallery-search">
        <span>搜尋工具</span>
        <input type="search" data-tool-search placeholder="輸入：咖啡、人格、夜遊、搭子、回憶錄、預算">
      </label>
    </section>

    <section class="gallery-filters" data-tool-filters aria-label="工具分類篩選"></section>
    <section class="gallery-grid" data-tool-grid aria-label="100 個旅行小工具"></section>
  </main>

  <script src="assets/independent-tools.js"></script>
</body>
</html>`;
}

function catalogScript() {
  const galleryTools = tools.map(({ inputs, appUrl, pageUrl, ...tool }) => ({
    ...tool,
    href: `tools/${tool.slug}.html`,
    poster: `assets/tool-posters/${tool.slug}.svg`
  }));
  return `const CHILLOUT_TOOL_CATALOG = ${JSON.stringify(galleryTools, null, 2)};

(() => {
  const grid = document.querySelector("[data-tool-grid]");
  const filters = document.querySelector("[data-tool-filters]");
  const search = document.querySelector("[data-tool-search]");
  const randomButton = document.querySelector("[data-random-tool]");
  if (!grid || !filters) return;

  const categories = ["全部", ...Array.from(new Set(CHILLOUT_TOOL_CATALOG.map((tool) => tool.categoryLabel)))];
  let activeCategory = "全部";

  function renderFilters() {
    filters.innerHTML = categories.map((category) => {
      const active = category === activeCategory ? "active" : "";
      return \`<button type="button" class="\${active}" data-category="\${category}">\${category}</button>\`;
    }).join("");
  }

  function filteredTools() {
    const query = (search?.value || "").trim().toLowerCase();
    return CHILLOUT_TOOL_CATALOG.filter((tool) => {
      const inCategory = activeCategory === "全部" || tool.categoryLabel === activeCategory;
      const haystack = [tool.id, tool.name, tool.tagline, tool.categoryLabel, tool.audience, tool.mechanic, ...(tool.chips || [])].join(" ").toLowerCase();
      return inCategory && (!query || haystack.includes(query));
    });
  }

  function renderGrid() {
    const list = filteredTools();
    grid.innerHTML = list.map((tool) => \`
      <a class="tool-tile" href="\${tool.href}" style="--tile-primary:\${tool.primary};--tile-accent:\${tool.accent};--tile-deep:\${tool.deep}">
        <img src="\${tool.poster}" alt="\${tool.name} 視覺">
        <span>\${tool.id} · \${tool.categoryLabel}</span>
        <h2>\${tool.name}</h2>
        <p>\${tool.tagline}</p>
        <div>\${tool.chips.slice(0, 3).map((chip) => \`<small>\${chip}</small>\`).join("")}</div>
        <strong>開啟工具</strong>
      </a>
    \`).join("");
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderGrid();
  });

  search?.addEventListener("input", renderGrid);
  randomButton?.addEventListener("click", () => {
    const tool = CHILLOUT_TOOL_CATALOG[Math.floor(Math.random() * CHILLOUT_TOOL_CATALOG.length)];
    window.location.href = tool.href;
  });

  renderFilters();
  renderGrid();
})();
`;
}

function runtimeScript() {
  return `(() => {
  const dataNode = document.getElementById("tool-data");
  const consoleNode = document.querySelector("[data-tool-console]");
  if (!dataNode || !consoleNode) return;

  const tool = JSON.parse(dataNode.textContent);
  const state = {};

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function inputHtml(input, index) {
    if (input.type === "text") {
      state[input.key] = "";
      return \`
        <label class="console-field text-field">
          <span>\${escapeHtml(input.label)}</span>
          <input type="text" data-input-key="\${input.key}" placeholder="\${escapeHtml(input.placeholder || "")}" autocomplete="off">
        </label>\`;
    }
    if (input.type === "choice") {
      state[input.key] = input.choices[0];
      return \`
        <div class="console-field choice-field">
          <span>\${escapeHtml(input.label)}</span>
          <div class="choice-grid">
            \${input.choices.map((choice, choiceIndex) => \`
              <button type="button" class="\${choiceIndex === 0 ? "active" : ""}" data-choice-key="\${input.key}" data-choice-value="\${escapeHtml(choice)}">\${escapeHtml(choice)}</button>
            \`).join("")}
          </div>
        </div>\`;
    }
    const value = input.value ?? Math.round((input.min + input.max) / 2);
    state[input.key] = value;
    return \`
      <label class="console-field range-field">
        <span>\${escapeHtml(input.label)} <strong data-range-value="\${input.key}">\${value}</strong></span>
        <input type="range" min="\${input.min}" max="\${input.max}" value="\${value}" data-input-key="\${input.key}">
        <small><em>\${escapeHtml(input.left || "")}</em><em>\${escapeHtml(input.right || "")}</em></small>
      </label>\`;
  }

  function scoreFromState() {
    const values = Object.entries(state).map(([key, value], index) => {
      if (typeof value === "number") return value;
      if (!value) return 28 + index * 8;
      return Math.min(96, 35 + String(value).length * 4 + index * 7);
    });
    const seed = Number(tool.id.replace("T", "")) % 17;
    return Math.max(18, Math.min(99, Math.round(values.reduce((sum, value) => sum + value, 0) / values.length + seed - 6)));
  }

  function resultTitle(score) {
    if (score >= 86) return "爆發型靈感，可以直接出發";
    if (score >= 68) return "高潛力玩法，適合做成第一版行程";
    if (score >= 48) return "需要整理，但已經有清楚方向";
    return "低壓版本更適合你現在的狀態";
  }

  function buildPrompt(score) {
    const readableState = Object.entries(state)
      .map(([key, value]) => \`\${key}: \${value || "未填"}\`)
      .join("；");
    return \`請用 ChillOut 幫我把「\${tool.name}」的結果排成 1 天旅行：\${tool.result} 我的條件是 \${readableState}。請給我路線、餐廳/景點類型、備案與可分享標題。\`;
  }

  function updateResult() {
    const score = scoreFromState();
    const prompt = buildPrompt(score);
    const copy = \`\${tool.name} 測出我的旅行結果：\${score}/100，\${resultTitle(score)}。\${tool.result} 我準備丟進 ChillOut 生成完整行程：\${tool.appUrl}\`;
    document.querySelector("[data-result-score]").textContent = score;
    document.querySelector("[data-result-title]").textContent = resultTitle(score);
    document.querySelector("[data-result-copy]").textContent = tool.result;
    document.querySelector("[data-result-prompt]").textContent = prompt;
    document.querySelector("[data-result-chips]").innerHTML = tool.chips.map((chip) => \`<span>\${escapeHtml(chip)}</span>\`).join("");
    document.querySelector("[data-copy-result]").dataset.copy = copy;
    document.querySelector("[data-app-link]").href = \`\${tool.appUrl}_score_\${score}\`;
  }

  consoleNode.innerHTML = \`
    <div class="console-head">
      <div>
        <p>\${tool.categoryLabel}</p>
        <h2>30 秒生成你的結果卡</h2>
      </div>
      <button type="button" data-randomize>隨機試玩</button>
    </div>
    <div class="console-fields">
      \${tool.inputs.map(inputHtml).join("")}
    </div>
    <button type="button" class="product-button primary wide" data-generate>生成結果卡</button>
  \`;

  consoleNode.addEventListener("input", (event) => {
    const key = event.target.dataset.inputKey;
    if (!key) return;
    const input = tool.inputs.find((item) => item.key === key);
    state[key] = input?.type === "range" ? Number(event.target.value) : event.target.value;
    const output = document.querySelector(\`[data-range-value="\${key}"]\`);
    if (output) output.textContent = state[key];
    updateResult();
  });

  consoleNode.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-choice-key]");
    if (choice) {
      const key = choice.dataset.choiceKey;
      state[key] = choice.dataset.choiceValue;
      consoleNode.querySelectorAll(\`[data-choice-key="\${key}"]\`).forEach((button) => button.classList.remove("active"));
      choice.classList.add("active");
      updateResult();
      return;
    }
    if (event.target.matches("[data-randomize]")) {
      tool.inputs.forEach((input) => {
        if (input.type === "range") {
          const value = Math.floor(input.min + Math.random() * (input.max - input.min));
          state[input.key] = value;
          const range = consoleNode.querySelector(\`[data-input-key="\${input.key}"]\`);
          const output = document.querySelector(\`[data-range-value="\${input.key}"]\`);
          if (range) range.value = value;
          if (output) output.textContent = value;
        } else if (input.type === "choice") {
          const value = input.choices[Math.floor(Math.random() * input.choices.length)];
          state[input.key] = value;
          consoleNode.querySelectorAll(\`[data-choice-key="\${input.key}"]\`).forEach((button) => {
            button.classList.toggle("active", button.dataset.choiceValue === value);
          });
        } else {
          const sample = ["首爾咖啡店", "東京夜景", "台南巷弄", "曼谷週末", "京都書店"][Math.floor(Math.random() * 5)];
          state[input.key] = sample;
          const text = consoleNode.querySelector(\`[data-input-key="\${input.key}"]\`);
          if (text) text.value = sample;
        }
      });
      updateResult();
    }
    if (event.target.matches("[data-generate]")) updateResult();
  });

  document.querySelector("[data-copy-result]")?.addEventListener("click", async (event) => {
    const text = event.currentTarget.dataset.copy || "";
    try {
      await navigator.clipboard.writeText(text);
      event.currentTarget.textContent = "已複製";
      setTimeout(() => { event.currentTarget.textContent = "複製分享文案"; }, 1400);
    } catch {
      window.prompt("複製分享文案", text);
    }
  });

  updateResult();
})();
`;
}

function ensureCleanGeneratedDirectory() {
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.mkdirSync(posterDir, { recursive: true });
  for (const file of fs.readdirSync(toolsDir)) {
    const slug = file.replace(/\.html$/, "");
    if (file.endsWith(".html") && !bespokeToolSlugs.has(slug)) fs.unlinkSync(path.join(toolsDir, file));
  }
  for (const file of fs.readdirSync(posterDir)) {
    if (file.endsWith(".svg")) fs.unlinkSync(path.join(posterDir, file));
  }
}

ensureCleanGeneratedDirectory();

for (const tool of tools) {
  if (!bespokeToolSlugs.has(tool.slug)) {
    fs.writeFileSync(path.join(toolsDir, `${tool.slug}.html`), pageTemplate(tool), "utf8");
  }
  fs.writeFileSync(path.join(posterDir, `${tool.slug}.svg`), posterSvg(tool), "utf8");
}

fs.writeFileSync(path.join(root, "travel-microtools-100.html"), galleryTemplate(), "utf8");
fs.writeFileSync(path.join(root, "assets", "independent-tools.js"), catalogScript(), "utf8");
fs.writeFileSync(path.join(root, "assets", "independent-tool-runtime.js"), runtimeScript(), "utf8");

console.log(`Generated ${tools.length} independent ChillOut travel tools.`);
