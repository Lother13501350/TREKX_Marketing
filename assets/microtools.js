const appStoreBase = "https://apps.apple.com/tw/app/chillout/id6760571567";

const microtools = [
  { id:"T001", name:"IG 收藏混亂指數", trend:"社群靈感轉行程", audience:"IG 旅行收藏重度使用者", hook:"測你手機裡的旅行靈感有多混亂。", inputs:"收藏數、目的地數、出發日期、同行人數", output:"0-100 混亂分數、整理優先級、ChillOut 首次 prompt", share:"我的 IG 旅行收藏混亂指數是 87/100。", cta:"把分數最高的 3 個收藏貼進 ChillOut 生成第一版行程。", style:"霓虹貼紙、手機截圖拼貼、收據式結果卡", build:"表單 + 加權分數 + 結果卡" },
  { id:"T002", name:"TikTok 景點去重器", trend:"社群靈感轉行程", audience:"用短影音找景點的自由行使用者", hook:"把一堆重複推薦整理成真的值得去的清單。", inputs:"景點名稱、影片連結、城市、想玩天數", output:"去重清單、同區分組、刪除理由", share:"我從 42 支旅遊影片濃縮出 9 個景點。", cta:"把去重清單丟到 ChillOut 排順路。", style:"影片縮圖牆、螢光標籤、刪除線動效", build:"文字貼上 + 關鍵字去重 + 區域分組" },
  { id:"T003", name:"Reels 週末行程產生器", trend:"社群靈感轉行程", audience:"看到 Reels 就想週末出門的人", hook:"貼 3 個 Reels 靈感，生成 1 個週末小旅行。", inputs:"3 個景點、出發城市、交通方式、預算", output:"週六/週日行程、交通節奏、花費估算", share:"我的 Reels 週末逃跑計畫已生成。", cta:"用 ChillOut 把週末行程變成可編輯版本。", style:"週末票券、奶油色地圖、動態箭頭", build:"短表單 + 兩日行程模板" },
  { id:"T004", name:"社群景點可信度雷達", trend:"社群靈感轉行程", audience:"怕被網美景點騙的人", hook:"判斷一個爆紅景點是不是只適合拍照。", inputs:"景點類型、排隊時間、交通難度、替代選項", output:"真實值得去分數、拍照/體驗比例、避雷建議", share:"這個景點只有 38% 真值得去。", cta:"把高分景點加入 ChillOut 行程。", style:"雷達圖、黑白雜誌、紅色避雷章", build:"評分表 + 雷達圖" },
  { id:"T005", name:"網美景點真實成本計算器", trend:"社群靈感轉行程", audience:"重視時間和金錢成本的旅人", hook:"算出一張漂亮照片背後要花多少時間與錢。", inputs:"交通時間、門票、排隊、拍攝時間、餐飲花費", output:"每張照片成本、是否值得、替代方案", share:"這張照片的真實成本是 NT$1,240 + 4.5 小時。", cta:"用 ChillOut 找同區替代景點。", style:"精品發票、透明玻璃卡、價格貼紙", build:"成本計算器 + 替代 CTA" },
  { id:"T006", name:"收藏景點情緒地圖", trend:"社群靈感轉行程", audience:"用情緒決定旅行的人", hook:"不是按地點分類，而是按心情分類旅行收藏。", inputs:"景點清單、心情標籤、想要的旅行感", output:"療癒/熱鬧/浪漫/探索四象限地圖", share:"我的旅行收藏 62% 是療癒型。", cta:"把情緒地圖匯入 ChillOut 生成同調行程。", style:"情緒色票、柔和漸層、手帳貼紙", build:"標籤選擇 + 四象限結果" },
  { id:"T007", name:"朋友傳景點整理器", trend:"社群靈感轉行程", audience:"群組裡負責排行程的人", hook:"把朋友丟來的景點快速變成同區清單。", inputs:"景點文字、城市、同行者偏好", output:"分類清單、衝突點、誰會喜歡哪個景點", share:"我們群組的旅行願望清單已整理。", cta:"把整理後的清單丟進 ChillOut 排行程。", style:"聊天截圖感、便條紙、群組頭像", build:"文字貼上 + 類別標籤 + 投票卡" },
  { id:"T008", name:"三張截圖猜你旅行風格", trend:"社群靈感轉行程", audience:"愛做測驗和分享結果的人", hook:"上傳/選 3 張旅遊截圖，得到旅行人格。", inputs:"三種景點偏好、食物偏好、節奏偏好", output:"旅行人格、城市建議、行程 prompt", share:"我是『慢熟咖啡散步型旅人』。", cta:"用 ChillOut 生成符合人格的第一趟旅行。", style:"人格卡、時尚雜誌封面、城市色票", build:"選圖測驗 + 結果類型" },
  { id:"T009", name:"社群靈感轉地圖懶人包", trend:"社群靈感轉行程", audience:"收藏很多但不想整理的人", hook:"把散亂靈感轉成可以出發的地圖順序。", inputs:"景點名稱、住宿位置、出發時間、交通方式", output:"區域順序、每日主題、地圖備忘", share:"我把 18 個收藏變成 3 天路線。", cta:"用 ChillOut 產生可導航行程。", style:"地圖 pin、路線線條、旅遊手冊視覺", build:"清單輸入 + 區域排序" },
  { id:"T010", name:"IG 收藏變行李清單", trend:"社群靈感轉行程", audience:"會被景點風格影響穿搭的人", hook:"看你的旅行收藏，推一份行李清單。", inputs:"目的地、季節、景點類型、拍照需求", output:"衣物/鞋子/小物清單、少帶提醒", share:"我的 IG 收藏推導出一份城市散步行李。", cta:"用 ChillOut 把行李清單和行程放在一起。", style:"行李攤平圖、色票、checklist", build:"條件選擇 + 打包清單" },

  { id:"T011", name:"一句話行程體質診斷", trend:"AI 旅行規劃", audience:"第一次嘗試 AI 排行程的人", hook:"用一句話測出你適合哪種 AI 行程。", inputs:"一句旅行願望、天數、預算、同行者", output:"行程體質、推薦節奏、ChillOut prompt", share:"我的行程體質是『半計畫半漂流』。", cta:"把這句 prompt 貼進 ChillOut。", style:"極簡測驗、黑字大標、霧面卡片", build:"文字輸入 + 關鍵詞分類" },
  { id:"T012", name:"15 分鐘出發可行性評估", trend:"AI 旅行規劃", audience:"臨時想出門的人", hook:"測你現在能不能在 15 分鐘內完成出發準備。", inputs:"目的地、交通、行李狀態、訂房狀態", output:"可行/不建議/先做三件事", share:"我現在有 74% 機率可以說走就走。", cta:"用 ChillOut 生成臨時行程。", style:"機場登機牌、倒數計時、綠色通關章", build:"狀態 checklist + 分數" },
  { id:"T013", name:"行程過密警報器", trend:"AI 旅行規劃", audience:"容易把行程塞爆的人", hook:"檢查你的行程是不是會累到想放棄。", inputs:"每日景點數、交通時間、用餐安排、同行者年齡", output:"過密分數、刪減建議、休息區塊", share:"我的行程過密指數 92，難怪會累。", cta:"用 ChillOut 重新排一版不趕的行程。", style:"紅色警報、時間軸、壓力溫度計", build:"時間估算 + 警示規則" },
  { id:"T014", name:"雨天備案生成器", trend:"AI 旅行規劃", audience:"怕天氣毀掉行程的人", hook:"把戶外行程一鍵換成雨天版本。", inputs:"原行程、城市、同行者、可接受交通時間", output:"雨天景點、室內餐廳、備案順序", share:"我的雨天備案比原行程還好玩。", cta:"用 ChillOut 儲存晴天/雨天雙版本。", style:"透明雨滴、藍灰色卡片、傘 icon", build:"景點類型替換規則" },
  { id:"T015", name:"早鳥夜貓節奏排程器", trend:"AI 旅行規劃", audience:"作息差異很大的旅伴", hook:"按作息排出不互相折磨的行程。", inputs:"起床時間、睡覺時間、必去景點、夜生活需求", output:"早鳥/夜貓雙軌行程、會合點", share:"我們終於不用為幾點出門吵架。", cta:"用 ChillOut 建立多人節奏行程。", style:"日夜雙色、分岔路線、時間膠囊", build:"作息問卷 + 時段分配" },
  { id:"T016", name:"每日能量配額排程器", trend:"AI 旅行規劃", audience:"重視體力管理的人", hook:"先決定每天能量，再排景點。", inputs:"每日體力分數、步行上限、交通偏好、餐廳需求", output:"低/中/高能量日行程、休息提醒", share:"我的第三天被判定只能排 2 個景點。", cta:"用 ChillOut 生成體力友善行程。", style:"電量格、柔和綠、健康 App 感", build:"能量分配 + 行程密度模板" },
  { id:"T017", name:"AI 行程辯論器", trend:"AI 旅行規劃", audience:"行程選擇困難者", hook:"讓兩套行程互相辯論，選出更適合你的。", inputs:"A/B 行程、偏好、預算、同行者", output:"辯論摘要、勝出方案、折衷版", share:"AI 判定 B 行程比較不會後悔。", cta:"用 ChillOut 編輯勝出行程。", style:"對戰卡、裁判章、辯論舞台", build:"A/B 比較表 + 決策規則" },
  { id:"T018", name:"旅行預算焦慮消除器", trend:"AI 旅行規劃", audience:"怕旅行超支的人", hook:"把模糊預算拆成每天可花多少。", inputs:"總預算、天數、住宿、交通、購物慾望", output:"每日預算、超支警報、可省項目", share:"我的東京每日自由花費只剩 NT$1,380。", cta:"用 ChillOut 生成符合預算的行程。", style:"現金信封、收支條、清爽綠色", build:"預算拆分 + 警示" },
  { id:"T019", name:"城市第一次見面計畫", trend:"AI 旅行規劃", audience:"第一次去某城市的人", hook:"像約會一樣安排你和城市的第一次見面。", inputs:"城市、性格、想留下的感覺、時間", output:"第一天路線、開場景點、結尾儀式", share:"我和首爾的第一次見面是從書店開始。", cta:"用 ChillOut 延伸成完整旅行。", style:"約會卡、城市情書、底片感", build:"城市模板 + 情緒偏好" },
  { id:"T020", name:"旅遊 Prompt 轉盤", trend:"AI 旅行規劃", audience:"不知道怎麼問 AI 的人", hook:"轉出一組能直接貼進 ChillOut 的旅遊 prompt。", inputs:"目的地、天數、主題、避雷點", output:"完整 prompt、進階 prompt、英文版", share:"我抽到的是『雨天也浪漫的京都三天』。", cta:"一鍵複製 prompt 到 ChillOut。", style:"轉盤、抽籤、亮色貼紙", build:"選項組合 + prompt 模板" },

  { id:"T021", name:"夜貓旅行人格測試", trend:"Noctourism 夜旅", audience:"喜歡夜景、酒吧、夜市的人", hook:"測你是哪種夜間旅人。", inputs:"入睡時間、夜景偏好、安全感需求、飲食習慣", output:"夜旅人格、城市建議、夜間路線", share:"我是『月光散步型夜貓旅人』。", cta:"用 ChillOut 生成夜間行程。", style:"深藍、星光、城市燈牌", build:"人格測驗 + 夜間路線模板" },
  { id:"T022", name:"星星可見度旅行挑日器", trend:"Noctourism 夜旅", audience:"想看星空和銀河的人", hook:"找一個比較適合看星星的旅行日。", inputs:"月份、目的地類型、月相偏好、光害忍受度", output:"推薦日期區間、觀星提醒、備案", share:"我的下一趟旅行適合追星空。", cta:"用 ChillOut 把白天和夜晚行程排一起。", style:"星圖、暗色模式、月相 icon", build:"規則型日期建議 + checklist" },
  { id:"T023", name:"夜市酒吧路線搭配器", trend:"Noctourism 夜旅", audience:"夜生活和美食愛好者", hook:"把夜市、酒吧、宵夜排成不繞路的一晚。", inputs:"城市、酒量、想吃類型、回住宿方式", output:"晚餐到宵夜路線、安全回程提醒", share:"我的台南夜晚路線從牛肉湯到調酒。", cta:"用 ChillOut 儲存夜晚路線。", style:"霓虹招牌、黑底黃字、路線卡", build:"夜間場景組合 + 回程提示" },
  { id:"T024", name:"夜景告白路線產生器", trend:"Noctourism 夜旅", audience:"情侶與曖昧旅行", hook:"排一條不尷尬又有氛圍的夜景路線。", inputs:"城市、關係狀態、預算、怕尷尬程度", output:"晚餐、散步、夜景點、備用話題", share:"這條路線告白成功率感覺有 78%。", cta:"用 ChillOut 把約會行程變完整。", style:"電影感、暖色路燈、對話卡", build:"情境問卷 + 路線模板" },
  { id:"T025", name:"夜間安全感檢查器", trend:"Noctourism 夜旅", audience:"獨旅、女性旅人、新手夜遊者", hook:"玩夜晚之前先做安全檢查。", inputs:"回程方式、同行人、住宿距離、手機電量", output:"安全分數、必做事項、不要去提醒", share:"我的夜遊安全感分數 82。", cta:"用 ChillOut 記錄安全回程點。", style:"安全通行證、綠黃紅分級", build:"checklist + 風險分級" },
  { id:"T026", name:"月光散步路線產生器", trend:"Noctourism 夜旅", audience:"喜歡安靜城市散步的人", hook:"排一條不用消費也浪漫的夜間散步。", inputs:"城市、步行時間、想看水/山/街燈、住宿點", output:"散步路線、停留點、回程建議", share:"我的月光散步路線只有 1.8 公里。", cta:"用 ChillOut 加進晚間行程。", style:"月光灰、細線地圖、詩句卡", build:"距離偏好 + 場景模板" },
  { id:"T027", name:"深夜咖啡甜點地圖", trend:"Noctourism 夜旅", audience:"深夜甜點與咖啡愛好者", hook:"用甜點結束一晚，而不是只喝酒。", inputs:"城市、甜點偏好、咖啡因耐受、回程方式", output:"晚間甜點路線、咖啡因警告、拍照點", share:"我的深夜甜點人格是布丁派。", cta:"用 ChillOut 排深夜甜點行程。", style:"甜點櫃、黑金色、手寫菜單", build:"口味測驗 + 地點清單" },
  { id:"T028", name:"日落追逐計時器", trend:"Noctourism 夜旅", audience:"追夕陽和夜景的人", hook:"反推你幾點要出門才趕得上日落。", inputs:"日落時間、交通時間、拍照準備、用餐安排", output:"出發倒數、最佳抵達時間、錯過備案", share:"我今天 17:12 前一定要出門。", cta:"用 ChillOut 安排日落前後行程。", style:"倒數鐘、橘紫天空、攝影 UI", build:"時間反推計算器" },
  { id:"T029", name:"紅眼航班空檔攻略", trend:"Noctourism 夜旅", audience:"搭深夜或清晨航班的人", hook:"把尷尬空檔變成可用行程。", inputs:"抵達/出發時間、行李狀態、機場位置、體力", output:"洗澡/寄物/早餐/短睡方案", share:"我的紅眼航班空檔被救回 5 小時。", cta:"用 ChillOut 生成機場前後行程。", style:"登機牌、夜間機場、藍白資訊卡", build:"時間窗 + 場景方案" },
  { id:"T030", name:"夜晚城市聲音採集卡", trend:"Noctourism 夜旅", audience:"喜歡記錄感官旅行的人", hook:"用聲音完成一趟夜間旅行任務。", inputs:"城市、想收集的聲音、路線時長", output:"聲音任務卡、地點建議、回憶錄標題", share:"我收集到一座城市的 7 種夜晚聲音。", cta:"用 ChillOut 做成旅遊回憶錄。", style:"聲波、黑底霓虹、錄音卡", build:"任務清單 + 回憶標題生成" },

  { id:"T031", name:"替代城市命定測驗", trend:"Detour / 避開人潮", audience:"想避開熱門景點的人", hook:"不去東京/巴黎/首爾，你其實適合哪個替代城市？", inputs:"熱門目的地、預算、人潮忍耐度、想要風格", output:"替代城市、相似理由、三天玩法", share:"我不是巴黎人，我是里昂人。", cta:"用 ChillOut 排替代城市行程。", style:"雙城對照、低飽和色、旅行雜誌", build:"偏好匹配 + 替代庫" },
  { id:"T032", name:"避開人潮分流器", trend:"Detour / 避開人潮", audience:"討厭排隊的人", hook:"同一個城市，排一版比較不擠的玩法。", inputs:"必去景點、人潮忍耐度、早起程度、季節", output:"錯峰時段、替代順序、刪減建議", share:"我的避人潮行程早上 8:10 開始。", cta:"用 ChillOut 產生錯峰行程。", style:"人流熱力圖、冷色路線、空白感", build:"時段規則 + 景點替代" },
  { id:"T033", name:"熱門景點 2km 替身", trend:"Detour / 避開人潮", audience:"想拍到好看但不想人擠人的人", hook:"熱門景點附近 2 公里內找同感替身。", inputs:"熱門景點、想要元素、可走距離、預算", output:"替身景點、差異、拍照時段", share:"我找到清水寺附近的安靜替身。", cta:"用 ChillOut 把替身加入路線。", style:"半徑圓、替身卡、低調街區感", build:"元素選擇 + 替代清單" },
  { id:"T034", name:"轉機 6 小時玩法", trend:"Detour / 避開人潮", audience:"有長轉機的人", hook:"把轉機時間變成迷你旅行。", inputs:"機場、轉機時間、簽證狀態、行李狀態", output:"能否出境、短路線、回機場時間", share:"我的 6 小時轉機可以吃一碗在地早餐。", cta:"用 ChillOut 保存轉機路線。", style:"航班板、計時條、機場動線", build:"時間安全窗 + 場景建議" },
  { id:"T035", name:"周邊小鎮一日 Detour", trend:"Detour / 避開人潮", audience:"去大城市但想加支線的人", hook:"從熱門城市延伸一個更有記憶點的小鎮。", inputs:"主城市、交通時間上限、風格、季節", output:"小鎮推薦、一日節奏、回程提醒", share:"我的大阪支線不是奈良，是宇治。", cta:"用 ChillOut 串成多日行程。", style:"小火車票、地圖支線、淡色紙張", build:"主城到支線模板" },
  { id:"T036", name:"淡季目的地配對器", trend:"Detour / 避開人潮", audience:"想省錢又怕踩雷的人", hook:"幫你找適合淡季去的地方。", inputs:"月份、天氣忍受度、預算、目的地偏好", output:"淡季推薦、優點、風險、備案", share:"我適合在雨季去一座安靜城市。", cta:"用 ChillOut 生成淡季行程。", style:"月曆、價格曲線、柔和藍綠", build:"月份規則 + 風險提示" },
  { id:"T037", name:"過度旅遊罪惡感降低器", trend:"Detour / 避開人潮", audience:"在意永續和在地影響的人", hook:"把熱門旅行改成比較友善的版本。", inputs:"目的地、旅遊方式、住宿位置、消費偏好", output:"降低負擔建議、在地消費任務、替代點", share:"我的旅行友善分數從 52 提升到 81。", cta:"用 ChillOut 排更分散的路線。", style:"永續徽章、綠色任務卡", build:"checklist + 改善建議" },
  { id:"T038", name:"人潮忍耐度測驗", trend:"Detour / 避開人潮", audience:"不確定自己能不能承受熱門點的人", hook:"測你適不適合熱門景點打卡行程。", inputs:"排隊忍耐、拍照需求、噪音敏感、同行者", output:"忍耐度、避開建議、城市節奏", share:"我的人潮忍耐度只有 23/100。", cta:"用 ChillOut 生成低人潮版本。", style:"壓力條、紅黃綠、幽默文案", build:"心理測驗 + 分級" },
  { id:"T039", name:"交通樞紐微旅行", trend:"Detour / 避開人潮", audience:"經過車站/機場的人", hook:"在車站附近 90 分鐘也能玩。", inputs:"車站、可用時間、行李、想吃/看/買", output:"90 分鐘路線、寄物提醒、回站時間", share:"我在轉車空檔完成一趟微旅行。", cta:"用 ChillOut 建立空檔行程。", style:"車票、站牌、短路線卡", build:"時間窗 + 任務卡" },
  { id:"T040", name:"小鎮氛圍尋找器", trend:"Detour / 避開人潮", audience:"喜歡低調目的地的人", hook:"依照你喜歡的氣味、聲音、街景找小鎮。", inputs:"海/山/老街、咖啡/書店、交通難度、住宿偏好", output:"小鎮人格、推薦玩法、慢旅行 prompt", share:"我的小鎮氛圍是『雨後港邊』。", cta:"用 ChillOut 排小鎮慢旅行。", style:"底片、海報字、地方誌感", build:"感官測驗 + 目的地配對" },

  { id:"T041", name:"JOMO 休息型行程測驗", trend:"JOMO 慢旅行", audience:"想放鬆不想打卡的人", hook:"測你需要哪種不趕路旅行。", inputs:"疲勞程度、社交需求、睡眠債、自然偏好", output:"JOMO 類型、休息行程、禁止事項", share:"我的 JOMO 行程禁止早起。", cta:"用 ChillOut 生成慢版行程。", style:"留白、暖灰、呼吸感 UI", build:"心理測驗 + 休息模板" },
  { id:"T042", name:"森林浴路線配方", trend:"JOMO 慢旅行", audience:"想進自然但不想硬爬山的人", hook:"用體力和心情排森林浴路線。", inputs:"體力、交通、想走時間、安靜需求", output:"森林浴配方、停留節點、呼吸任務", share:"我的森林浴配方是 70% 樹影 + 30% 茶。", cta:"用 ChillOut 串成自然一日行程。", style:"葉影、紙感、綠棕色", build:"偏好問卷 + 任務清單" },
  { id:"T043", name:"數位排毒旅行挑戰", trend:"JOMO 慢旅行", audience:"想少滑手機的人", hook:"生成一張不看手機也能旅行的任務卡。", inputs:"離線時長、目的地、同行者、焦慮程度", output:"離線任務、允許使用 App 清單、獎勵", share:"我挑戰 6 小時不滑短影音旅行。", cta:"出發前用 ChillOut 先存好行程。", style:"紙本任務卡、低飽和、離線圖章", build:"挑戰生成器 + checklist" },
  { id:"T044", name:"慢旅行節奏計算器", trend:"JOMO 慢旅行", audience:"不想每天跑很多點的人", hook:"算出你一天最多該排幾個景點。", inputs:"醒來時間、體力、通勤忍受、咖啡需求", output:"每日景點上限、午休時間、空白時段", share:"我的一天只適合排 2.5 個景點。", cta:"用 ChillOut 套用慢旅行節奏。", style:"日程格、淡色、慢速進度條", build:"時間與體力計算" },
  { id:"T045", name:"睡到自然醒行程產生器", trend:"JOMO 慢旅行", audience:"討厭早起的旅人", hook:"不早起也能有完整旅行。", inputs:"起床時間、城市、想吃早餐/早午餐、晚上活動", output:"午後開始行程、晚間延伸、餐廳順序", share:"我的旅行從 11:30 才開始。", cta:"用 ChillOut 排睡到自然醒版本。", style:"床邊陽光、早午餐菜單、懶人感", build:"晚起時間軸模板" },
  { id:"T046", name:"療癒海岸山城匹配", trend:"JOMO 慢旅行", audience:"想修復心情的人", hook:"依心情選海邊、山城或溫泉。", inputs:"壓力來源、想聽聲音、天氣偏好、預算", output:"療癒地形、目的地、48 小時路線", share:"我現在需要的是海風，不是都市。", cta:"用 ChillOut 建立療癒行程。", style:"海浪/山霧雙視覺、柔光", build:"心情測驗 + 地形匹配" },
  { id:"T047", name:"不發限動旅行宣言", trend:"JOMO 慢旅行", audience:"想降低社群壓力的人", hook:"生成一張不為社群而旅行的宣言。", inputs:"旅行原因、想放下的壓力、目的地", output:"旅行宣言、三條自我規則、桌布", share:"這趟旅行我只拍給自己看。", cta:"用 ChillOut 做自己的旅行手冊。", style:"極簡宣言、黑白文字、桌布比例", build:"文案生成器 + 桌布卡" },
  { id:"T048", name:"48 小時心情修復逃跑計畫", trend:"JOMO 慢旅行", audience:"需要短暫離開日常的人", hook:"根據心情排一趟兩天一夜修復行程。", inputs:"心情狀態、可出發地、預算、想獨處/聊天", output:"48 小時行程、不要做清單、回來儀式", share:"我被分配到『安靜散步 + 好好吃飯』路線。", cta:"用 ChillOut 完成兩天一夜行程。", style:"治癒系診斷書、柔粉綠", build:"心情問卷 + 兩日模板" },
  { id:"T049", name:"安靜咖啡書店巡禮", trend:"JOMO 慢旅行", audience:"喜歡書店和咖啡廳的人", hook:"排一條不需要趕景點的書店路線。", inputs:"城市、咖啡偏好、閱讀時間、步行距離", output:"書店/咖啡/散步三段路線", share:"我的旅行只有三件事：咖啡、書、散步。", cta:"用 ChillOut 儲存慢巡禮。", style:"書頁、咖啡漬、暖棕但不厚重", build:"場景組合 + 步行距離" },
  { id:"T050", name:"運動量友善旅行排程", trend:"JOMO 慢旅行", audience:"帶長輩、小孩或體力有限的人", hook:"排不累但仍有記憶點的旅行。", inputs:"年齡層、步行上限、上下坡忍受、休息需求", output:"低負擔路線、休息點、交通方式", share:"我們的家族旅行終於不是鐵腿行程。", cta:"用 ChillOut 做家庭友善版本。", style:"清楚資訊卡、無障礙 icon、柔和色", build:"體力限制 + 路線模板" },

  { id:"T051", name:"BookTok 命定書旅地圖", trend:"BookTok / 影視朝聖", audience:"愛書和 BookTok 的旅人", hook:"用你愛的書推薦一趟旅行。", inputs:"喜歡書籍、氛圍、城市/自然偏好、天數", output:"書旅目的地、閱讀地點、書店路線", share:"我的命定書旅是『雨天布拉格』。", cta:"用 ChillOut 把書旅變成行程。", style:"書封拼貼、鉛字、深酒紅點綴", build:"書籍氛圍測驗 + 路線" },
  { id:"T052", name:"電影場景朝聖路線", trend:"BookTok / 影視朝聖", audience:"喜歡電影/影集取景地的人", hook:"把一部作品變成一日朝聖路線。", inputs:"作品名稱、城市、想拍照/吃飯/買周邊", output:"場景順序、拍照姿勢、台詞卡", share:"我今天走了一集自己的電影。", cta:"用 ChillOut 延伸成多天朝聖旅。", style:"分鏡板、字幕條、電影票", build:"場景清單 + 時間軸" },
  { id:"T053", name:"追劇人格目的地測驗", trend:"BookTok / 影視朝聖", audience:"用劇集決定旅行的人", hook:"你喜歡的劇透露你該去哪裡。", inputs:"劇集類型、角色偏好、節奏、食物偏好", output:"目的地人格、城市建議、主題行程", share:"我的追劇人格適合去倫敦下雨。", cta:"用 ChillOut 生成追劇同感行程。", style:"串流平台感、劇照色票、角色卡", build:"人格測驗 + 目的地配對" },
  { id:"T054", name:"角色扮演一日行程", trend:"BookTok / 影視朝聖", audience:"喜歡沉浸式旅行的人", hook:"用一個角色身份度過一天。", inputs:"角色類型、城市、預算、拍照程度", output:"角色日程、穿搭、對白任務", share:"今天我在京都當一個失戀小說家。", cta:"用 ChillOut 排角色旅行。", style:"角色卡、任務章、復古手冊", build:"角色模板 + 一日任務" },
  { id:"T055", name:"MV 場景同款路線", trend:"BookTok / 影視朝聖", audience:"音樂和 K-pop/J-pop 粉絲", hook:"把喜歡的 MV 氛圍變成旅行。", inputs:"歌曲/歌手、氛圍、城市、拍照需求", output:"同款風格路線、拍照 pose、歌單", share:"我的 MV 旅行濾鏡是凌晨藍。", cta:"用 ChillOut 建立音樂主題行程。", style:"專輯封面、歌單卡、霓虹色", build:"氛圍測驗 + 路線" },
  { id:"T056", name:"書店城市散步計畫", trend:"BookTok / 影視朝聖", audience:"書店控與文青旅人", hook:"用書店串出一座城市。", inputs:"城市、書店類型、咖啡需求、步行距離", output:"書店散步路線、閱讀停留點、買書預算", share:"我用 4 間書店認識一座城市。", cta:"用 ChillOut 存成慢旅行。", style:"城市書籤、牛皮紙、細線地圖", build:"地點清單 + 步行模板" },
  { id:"T057", name:"Romantasy 旅行濾鏡", trend:"BookTok / 影視朝聖", audience:"喜歡浪漫奇幻氛圍的人", hook:"把目的地套上浪漫奇幻旅遊濾鏡。", inputs:"目的地、角色 archetype、季節、同行者", output:"奇幻行程名、三個場景、穿搭建議", share:"我的旅程叫《霧中港口的契約》。", cta:"用 ChillOut 生成同風格行程。", style:"暗金、羊皮紙、星辰點綴", build:"氛圍生成器 + 行程 prompt" },
  { id:"T058", name:"動漫聖地探險卡", trend:"BookTok / 影視朝聖", audience:"動漫迷和日本自由行使用者", hook:"把聖地巡禮變成任務卡。", inputs:"作品、地區、時間、周邊需求", output:"巡禮路線、任務卡、收集章", share:"我完成 6/9 個聖地巡禮任務。", cta:"用 ChillOut 安排交通順序。", style:"任務遊戲 UI、貼紙章、像素點綴", build:"清單任務 + 路線順序" },
  { id:"T059", name:"影集同款早餐路線", trend:"BookTok / 影視朝聖", audience:"喜歡生活感朝聖的人", hook:"不只拍場景，也吃同款城市早餐。", inputs:"影集氛圍、城市、早餐類型、預算", output:"早餐店、散步點、拍照畫面", share:"我的影集早餐是窗邊咖啡和煎蛋。", cta:"用 ChillOut 排半日生活感路線。", style:"早晨光、餐桌俯拍、影集字幕", build:"生活場景匹配" },
  { id:"T060", name:"Pop Culture Trip 預算器", trend:"BookTok / 影視朝聖", audience:"粉絲旅遊前的理性派", hook:"算一趟朝聖旅到底要花多少。", inputs:"場景數、周邊預算、交通、住宿、活動票", output:"總預算、可省項目、必花項目", share:"我的朝聖旅 37% 花在周邊。", cta:"用 ChillOut 控制預算和行程。", style:"演唱會票券、明細表、螢光條", build:"預算拆分 + 圖表" },

  { id:"T061", name:"咖啡廳人格測驗", trend:"美食 / 咖啡 / 活動旅行", audience:"咖啡廳控", hook:"測你是哪種咖啡旅行人格。", inputs:"咖啡口味、座位需求、拍照需求、甜點偏好", output:"人格類型、城市咖啡路線、點單建議", share:"我是『窗邊手沖慢熟型』。", cta:"用 ChillOut 排咖啡廳巡禮。", style:"精品咖啡菜單、奶泡色、細字體", build:"口味測驗 + 路線模板" },
  { id:"T062", name:"飯店餐廳值得繞路嗎", trend:"美食 / 咖啡 / 活動旅行", audience:"用餐導向旅人", hook:"判斷一間飯店餐廳是不是值得特地安排。", inputs:"距離、價格、菜系、景觀、預訂難度", output:"繞路分數、適合時段、替代方案", share:"這家飯店餐廳值得為它改行程。", cta:"用 ChillOut 把餐廳排進路線。", style:"餐廳評鑑卡、黑白金、星級貼紙", build:"加權評分 + 建議" },
  { id:"T063", name:"三甜點步行平衡器", trend:"美食 / 咖啡 / 活動旅行", audience:"甜點旅行者", hook:"想吃三家甜點，就幫你安排步行平衡。", inputs:"甜點店、步行忍受、晚餐安排、甜度偏好", output:"甜點順序、步行距離、解膩點", share:"我的甜點路線需要走 8,400 步。", cta:"用 ChillOut 生成美食步行路線。", style:"甜點貼紙、步數條、粉色但克制", build:"地點排序 + 步行估算" },
  { id:"T064", name:"在地早餐雷達", trend:"美食 / 咖啡 / 活動旅行", audience:"早起吃早餐的人", hook:"用早餐認識一座城市。", inputs:"城市、鹹甜偏好、排隊忍受、住宿區", output:"早餐路線、點餐建議、避開觀光店提醒", share:"我的台南早餐人格是牛肉湯派。", cta:"用 ChillOut 排早晨行程。", style:"早餐菜單、米白、手寫圈選", build:"食物偏好測驗 + 清單" },
  { id:"T065", name:"排隊美食風險評估", trend:"美食 / 咖啡 / 活動旅行", audience:"怕浪費時間排隊的人", hook:"排這家店值得嗎？先算。", inputs:"排隊時間、替代店、飢餓程度、同行者耐心", output:"排隊/外帶/放棄建議、替代路線", share:"AI 建議我不要為這碗拉麵排 90 分鐘。", cta:"用 ChillOut 改排不浪費時間的美食行程。", style:"紅黃綠燈、候位號碼牌", build:"風險評估 + 替代" },
  { id:"T066", name:"Local Sports Match Finder", trend:"美食 / 咖啡 / 活動旅行", audience:"想看在地球賽的人", hook:"旅行時找一場在地球賽當城市入口。", inputs:"城市、日期、運動類型、熱鬧程度", output:"球賽體驗建議、前後餐廳、穿搭提醒", share:"我用一場棒球賽認識大阪。", cta:"用 ChillOut 排球賽前後路線。", style:"球票、隊色、賽事日程卡", build:"日期 + 運動偏好模板" },
  { id:"T067", name:"Festival Trip 適配器", trend:"美食 / 咖啡 / 活動旅行", audience:"節慶旅行者", hook:"測你適不適合為一個祭典/音樂節旅行。", inputs:"人潮忍耐、住宿預算、交通彈性、活動類型", output:"適配分數、注意事項、周邊行程", share:"我的音樂節旅行適配度 91。", cta:"用 ChillOut 排活動前後行程。", style:"手環票券、舞台燈、排程表", build:"活動問卷 + 風險提醒" },
  { id:"T068", name:"旅行酒吧破冰卡", trend:"美食 / 咖啡 / 活動旅行", audience:"獨旅和社交型旅人", hook:"給你一組在旅途中自然聊天的破冰題。", inputs:"城市、酒吧類型、社交程度、語言", output:"破冰題、點單建議、安全提醒", share:"我抽到的破冰題是：你為什麼來這座城市？", cta:"用 ChillOut 安排安全回程。", style:"酒吧杯墊、暗色紙卡、金色線條", build:"題庫 + 情境選擇" },
  { id:"T069", name:"米其林 vs 市場人格測驗", trend:"美食 / 咖啡 / 活動旅行", audience:"美食旅行者", hook:"測你是 fine dining 派還是在地市場派。", inputs:"價格接受、環境需求、排隊忍受、驚喜偏好", output:"美食人格、餐廳比例、行程建議", share:"我是 30% 米其林，70% 菜市場。", cta:"用 ChillOut 平衡高低價美食路線。", style:"左右對比、銀色餐具、市場招牌", build:"人格測驗 + 比例圖" },
  { id:"T070", name:"用胃認識城市路線", trend:"美食 / 咖啡 / 活動旅行", audience:"目的地由食物決定的人", hook:"先選想吃什麼，再排去哪裡。", inputs:"五種想吃食物、天數、交通方式、胃容量", output:"吃法順序、散步消化點、不要連吃提醒", share:"我用 8 種味道走完一座城市。", cta:"用 ChillOut 生成美食主題行程。", style:"味覺輪、餐盤地圖、鮮明色塊", build:"食物分類 + 行程模板" },

  { id:"T071", name:"24 小時小旅行產生器", trend:"微假期 / 即興旅行", audience:"只有一天假期的人", hook:"只給你 24 小時，也能做一趟完整旅行。", inputs:"出發城市、交通、預算、想要感覺", output:"24 小時行程、睡眠安排、回程時間", share:"我的 24 小時逃跑計畫已生成。", cta:"用 ChillOut 保存小旅行。", style:"倒數卡、旅行票根、亮黃點綴", build:"時間窗模板" },
  { id:"T072", name:"Little Treat Travel 計算器", trend:"微假期 / 即興旅行", audience:"想用小預算犒賞自己的人", hook:"把一個小確幸變成一趟小旅行。", inputs:"可花金額、城市、想犒賞項目、時間", output:"小旅行方案、可負擔等級、拍照點", share:"我的小確幸旅行預算是 NT$1,800。", cta:"用 ChillOut 排小確幸路線。", style:"禮物標籤、柔亮色、價格貼紙", build:"預算配方 + 行程模板" },
  { id:"T073", name:"NT$3000 週末逃跑", trend:"微假期 / 即興旅行", audience:"學生與年輕上班族", hook:"用固定預算挑戰週末旅行。", inputs:"預算、出發地、交通偏好、住宿需求", output:"可行城市、預算拆分、刪減建議", share:"我用 NT$3000 可以逃到宜蘭。", cta:"用 ChillOut 排低預算週末。", style:"挑戰賽、價格章、清爽藍綠", build:"預算規則 + 城市模板" },
  { id:"T074", name:"請假 CP 值計算器", trend:"微假期 / 即興旅行", audience:"上班族", hook:"算哪天請假最能放大旅行時間。", inputs:"假日、可請天數、目的地、航班時間", output:"CP 值最高請假方案、旅行天數倍增率", share:"我請 1 天可以換 4 天旅行。", cta:"用 ChillOut 生成假期行程。", style:"月曆、高亮日期、公司便條", build:"日期計算 + 倍率" },
  { id:"T075", name:"Last-minute Pack & Go", trend:"微假期 / 即興旅行", audience:"臨時出發的人", hook:"10 分鐘內決定要帶什麼和先去哪。", inputs:"天氣、天數、目的地類型、行李尺寸", output:"極簡行李、第一站、必下載清單", share:"我可以用一個背包出發 2 天。", cta:"用 ChillOut 建立即興行程。", style:"背包攤開、checklist、快節奏 UI", build:"條件清單 + 行李模板" },
  { id:"T076", name:"輕行李挑戰", trend:"微假期 / 即興旅行", audience:"討厭拖行李的人", hook:"測你能不能用 7 件物品完成旅行。", inputs:"天數、氣候、拍照需求、洗衣可能", output:"7 件清單、替換規則、失敗風險", share:"我挑戰 7 件物品去首爾。", cta:"用 ChillOut 對齊行程和行李。", style:"極簡圖標、白底黑線、打勾動畫", build:"限制型清單生成" },
  { id:"T077", name:"機場輪盤目的地", trend:"微假期 / 即興旅行", audience:"想玩隨機旅行的人", hook:"依預算和時間抽一個可行目的地。", inputs:"出發機場、預算、天數、護照/簽證限制", output:"隨機目的地、為什麼適合、備選", share:"我的機場輪盤抽到福岡。", cta:"用 ChillOut 生成抽中的行程。", style:"輪盤、登機口、亮色抽籤", build:"條件篩選 + 隨機推薦" },
  { id:"T078", name:"多人預算拆帳工具", trend:"微假期 / 即興旅行", audience:"朋友旅行", hook:"先講清楚錢，旅行才不翻臉。", inputs:"人數、共同預算、個人預算、可接受分攤", output:"拆帳規則、共同基金、避雷話術", share:"我們的旅行預算規則已寫好。", cta:"用 ChillOut 記錄共同事項。", style:"清楚表格、信用卡色、契約卡", build:"拆帳公式 + 規則卡" },
  { id:"T079", name:"天氣切換行程器", trend:"微假期 / 即興旅行", audience:"短期旅行怕天氣變化的人", hook:"同一趟旅行準備晴天/雨天/太熱三版。", inputs:"目的地、天氣風險、必去點、同行者", output:"三套行程版本、切換條件、備案提醒", share:"我的旅行有三套天氣劇本。", cta:"用 ChillOut 存三版行程。", style:"天氣卡、滑動切換、藍橘綠三色", build:"版本模板 + 條件切換" },
  { id:"T080", name:"無理由小蜜月產生器", trend:"微假期 / 即興旅行", audience:"情侶與伴侶", hook:"不用紀念日也可以安排一趟小蜜月。", inputs:"關係階段、預算、想親密/放鬆/冒險、天數", output:"小蜜月主題、房型偏好、行程節奏", share:"我們被分配到『睡到自然醒溫泉型』。", cta:"用 ChillOut 排伴侶旅行。", style:"不俗氣浪漫、奶白紅棕、票券卡", build:"伴侶測驗 + 兩日模板" },

  { id:"T081", name:"旅行搭子契合度", trend:"旅行社交 / 搭子測驗", audience:"朋友、情侶、陌生旅伴", hook:"出發前先測會不會合拍。", inputs:"作息、預算、拍照需求、吃飯節奏、自由時間", output:"契合分數、衝突點、分工建議", share:"我們的旅行搭子契合度 76。", cta:"用 ChillOut 建立雙方都能接受的行程。", style:"雙人卡、合拍儀表、柔和對比色", build:"雙人問卷 + 分數" },
  { id:"T082", name:"情侶旅行吵架風險", trend:"旅行社交 / 搭子測驗", audience:"情侶旅行前的人", hook:"提前發現會吵的點。", inputs:"金錢觀、起床時間、拍照需求、導航耐心", output:"吵架風險、預防條款、冷靜備案", share:"我們最大的風險是『早餐時間』。", cta:"用 ChillOut 先排雙方版本。", style:"戀愛診斷書、紅藍風險條", build:"雙人測驗 + 條款卡" },
  { id:"T083", name:"朋友群目的地投票器", trend:"旅行社交 / 搭子測驗", audience:"多人旅行群組", hook:"讓大家投票，不要永遠只有一個人決定。", inputs:"候選目的地、預算、假期、每人偏好", output:"排名、分歧原因、折衷目的地", share:"我們群組第一名是沖繩，但預算警報。", cta:"用 ChillOut 排勝出目的地。", style:"群組投票、排行榜、彩色頭像", build:"投票表 + 加權排名" },
  { id:"T084", name:"家族旅行分歧調停器", trend:"旅行社交 / 搭子測驗", audience:"家族旅行主辦人", hook:"把長輩、小孩、年輕人的需求拉到同一張表。", inputs:"年齡層、飲食限制、步行能力、必去需求", output:"衝突矩陣、低風險路線、角色分工", share:"我們家族旅行最該避免上下坡。", cta:"用 ChillOut 建立家族友善行程。", style:"家庭會議板、清楚 icon、溫和色", build:"需求矩陣 + 路線建議" },
  { id:"T085", name:"I/E 能量匹配器", trend:"旅行社交 / 搭子測驗", audience:"內向與外向混合旅伴", hook:"安排可以分開充電又能一起玩的旅行。", inputs:"社交能量、獨處需求、夜生活、早晨偏好", output:"共同/分開時段、會合點、衝突提醒", share:"我們需要每天 90 分鐘各自放空。", cta:"用 ChillOut 排多人節奏。", style:"雙軌時間線、內外向色塊", build:"人格測驗 + 時段切分" },
  { id:"T086", name:"食物禁忌合併器", trend:"旅行社交 / 搭子測驗", audience:"多人旅行用餐主辦人", hook:"把大家不能吃的東西變成可行餐廳策略。", inputs:"過敏、宗教、素食、預算、想吃類型", output:"共同可吃區域、餐廳篩選語句、備案", share:"我們 6 個人終於找到共同可吃集合。", cta:"用 ChillOut 排用餐節點。", style:"餐桌座位圖、標籤系統", build:"限制合併 + 建議" },
  { id:"T087", name:"Travel Red Flag Bingo", trend:"旅行社交 / 搭子測驗", audience:"社群分享型使用者", hook:"用賓果卡檢查旅伴紅旗。", inputs:"旅伴習慣、金錢觀、時間觀、拍照需求", output:"紅旗賓果卡、改善建議、出發前協議", share:"我中了『不回訊息但要你排行程』。", cta:"用 ChillOut 把分工寫清楚。", style:"賓果卡、幽默貼紙、紅旗 icon", build:"題庫 + 賓果卡" },
  { id:"T088", name:"親子旅行氣質測驗", trend:"旅行社交 / 搭子測驗", audience:"親子旅行家庭", hook:"用孩子氣質排不崩潰的旅行。", inputs:"年齡、睡眠、食物、刺激忍受、午休需求", output:"親子旅行類型、景點密度、備用安撫包", share:"我們家適合『半天一景點』模式。", cta:"用 ChillOut 生成親子友善行程。", style:"清爽童趣、柔色、任務貼紙", build:"家長問卷 + 密度規則" },
  { id:"T089", name:"同事團建不尷尬路線", trend:"旅行社交 / 搭子測驗", audience:"公司團建主辦人", hook:"排一趟不逼社交也不無聊的團建。", inputs:"人數、熟悉度、預算、活動強度、酒精接受", output:"團建路線、破冰任務、自由時間", share:"我們的團建被判定需要 40% 自由活動。", cta:"用 ChillOut 排團體活動節奏。", style:"工作坊卡、乾淨企業感、柔和對比", build:"團體偏好 + 活動模板" },
  { id:"T090", name:"旅行角色分配器", trend:"旅行社交 / 搭子測驗", audience:"朋友旅行群組", hook:"誰負責導航、拍照、找餐廳，不要再模糊。", inputs:"每人強項、耐心、方向感、拍照能力", output:"角色分配、備援角色、責任卡", share:"我是本團『零食長兼氣氛維修員』。", cta:"用 ChillOut 把角色分工加到手冊。", style:"RPG 職業卡、徽章、角色插畫感", build:"角色測驗 + 分配卡" },

  { id:"T091", name:"旅行回憶錄封面生成器", trend:"回憶分享 / 旅行內容化", audience:"旅行後想發文的人", hook:"把一趟旅行變成一本雜誌封面。", inputs:"目的地、旅行情緒、同行者、封面句", output:"封面標題、副標、配色、貼文文案", share:"我的旅行封面叫《在雨裡慢慢走》。", cta:"用 ChillOut 生成完整回憶錄。", style:"時尚雜誌、大片留白、大標題", build:"文案生成 + 封面模板" },
  { id:"T092", name:"旅遊手冊標題產生器", trend:"回憶分享 / 旅行內容化", audience:"喜歡整理旅行的人", hook:"幫你的行程手冊取一個想收藏的名字。", inputs:"目的地、主題、同行者、旅行亮點", output:"10 個手冊標題、封面句、章節名", share:"我的首爾手冊叫《把雨天留給咖啡》。", cta:"用 ChillOut 做成旅遊手冊。", style:"書封排版、細緻字體、色票", build:"標題模板 + 風格選擇" },
  { id:"T093", name:"My Trip Wrapped", trend:"回憶分享 / 旅行內容化", audience:"年終回顧愛好者", hook:"像年度回顧一樣總結一趟旅行。", inputs:"照片數、步數、花費、最愛地點、意外事件", output:"旅行數據卡、排行、年度感總結", share:"我的旅行最高成就是一天走 24,000 步。", cta:"用 ChillOut 產生旅遊回憶錄。", style:"Wrapped 風格、鮮明色塊、數據圖", build:"數據輸入 + 結果卡" },
  { id:"T094", name:"旅行感謝卡", trend:"回憶分享 / 旅行內容化", audience:"與朋友/伴侶旅行後的人", hook:"把旅行後想說的謝謝變成卡片。", inputs:"同行者、最感謝事件、最荒謬瞬間、語氣", output:"感謝卡文案、限動版、私訊版", share:"謝謝你在我迷路時沒有生氣。", cta:"用 ChillOut 把卡片收進回憶錄。", style:"明信片、手寫字、溫暖色", build:"情緒文案模板" },
  { id:"T095", name:"Photo Dump 排序助手", trend:"回憶分享 / 旅行內容化", audience:"IG 發文使用者", hook:"幫你決定照片順序，讓 photo dump 更有故事。", inputs:"照片類型、情緒、人物/風景比例、開場圖", output:"10 張排序、每張 caption、封面建議", share:"我的 photo dump 終於不是亂丟。", cta:"用 ChillOut 生成完整回憶文案。", style:"相簿格、底片邊框、排序數字", build:"照片類型選擇 + 故事順序" },
  { id:"T096", name:"伴手禮人格卡", trend:"回憶分享 / 旅行內容化", audience:"喜歡買伴手禮的人", hook:"你買的伴手禮透露你的旅行人格。", inputs:"買了什麼、送給誰、價格、實用/可愛偏好", output:"伴手禮人格、送禮文案、下次目的地", share:"我是『地方超市考古學家』。", cta:"用 ChillOut 建立 goods getaway 行程。", style:"超市收據、包裝紙、貼紙", build:"購物偏好測驗" },
  { id:"T097", name:"下一站去哪分享測驗", trend:"回憶分享 / 旅行內容化", audience:"旅行後想規劃下一趟的人", hook:"用上一趟旅行結果推薦下一站。", inputs:"最愛時刻、最累時刻、想保留/避免、季節", output:"下一站推薦、理由、第一天 prompt", share:"我的下一站應該是更安靜的港口城市。", cta:"用 ChillOut 生成下一趟行程。", style:"轉場卡、箭頭、未來票根", build:"回顧問卷 + 推薦" },
  { id:"T098", name:"寄給未來自己的旅行明信片", trend:"回憶分享 / 旅行內容化", audience:"喜歡儀式感的人", hook:"寫一張半年後才打開的旅行明信片。", inputs:"旅行感受、想記住的人、半年後提醒、語氣", output:"未來明信片、封面、日曆提醒文案", share:"我把這趟旅行寄給 6 個月後的自己。", cta:"用 ChillOut 保存回憶錄。", style:"明信片、郵戳、柔和復古", build:"文案生成 + 提醒文字" },
  { id:"T099", name:"旅行成就徽章", trend:"回憶分享 / 旅行內容化", audience:"喜歡遊戲化的人", hook:"把旅行經歷變成成就徽章。", inputs:"步數、景點類型、突發事件、吃過食物", output:"成就徽章、稱號、下一個挑戰", share:"我解鎖『雨天仍走 2 萬步』徽章。", cta:"用 ChillOut 做旅行成就冊。", style:"徽章、遊戲 UI、亮色獎章", build:"條件判斷 + 徽章卡" },
  { id:"T100", name:"一張照片生成下一趟旅行", trend:"回憶分享 / 旅行內容化", audience:"照片驅動的旅行靈感使用者", hook:"用你最喜歡的一張照片，推下一趟旅行主題。", inputs:"照片氛圍、色彩、人物/風景、想延續的感覺", output:"下一趟主題、目的地風格、ChillOut prompt", share:"我的下一趟旅行應該延續這片藍。", cta:"把 prompt 貼進 ChillOut 開始規劃。", style:"照片主色分析、色票、雜誌卡", build:"照片/色彩問卷 + prompt" }
];

const grid = document.querySelector("[data-microtools-grid]");
const filters = document.querySelector("[data-microtool-filters]");
const search = document.querySelector("[data-microtool-search]");
const count = document.querySelector("[data-microtool-count]");
const exportButton = document.querySelector("[data-export-microtools]");
let activeTrend = "全部";

function trends() {
  return ["全部", ...Array.from(new Set(microtools.map((tool) => tool.trend)))];
}

function renderFilters() {
  if (!filters) return;
  filters.innerHTML = trends().map((trend) => `<button class="filter-btn ${trend === activeTrend ? "active" : ""}" data-trend="${trend}">${trend}</button>`).join("");
  filters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeTrend = button.dataset.trend;
      render();
    });
  });
}

function filteredTools() {
  const query = (search?.value || "").trim().toLowerCase();
  return microtools.filter((tool) => {
    const matchesTrend = activeTrend === "全部" || tool.trend === activeTrend;
    const blob = Object.values(tool).join(" ").toLowerCase();
    return matchesTrend && (!query || blob.includes(query));
  });
}

function card(tool) {
  const appUrl = `${appStoreBase}?ct=microtool_${tool.id.toLowerCase()}`;
  return `
    <article class="microtool-card">
      <div class="microtool-topline">
        <span>${tool.id}</span>
        <small>${tool.trend}</small>
      </div>
      <h2>${tool.name}</h2>
      <p class="microtool-hook">${tool.hook}</p>
      <dl>
        <div><dt>受眾</dt><dd>${tool.audience}</dd></div>
        <div><dt>輸入</dt><dd>${tool.inputs}</dd></div>
        <div><dt>輸出</dt><dd>${tool.output}</dd></div>
        <div><dt>分享點</dt><dd>${tool.share}</dd></div>
        <div><dt>導流</dt><dd>${tool.cta}</dd></div>
        <div><dt>設計</dt><dd>${tool.style}</dd></div>
        <div><dt>MVP</dt><dd>${tool.build}</dd></div>
      </dl>
      <div class="microtool-actions">
        <a class="btn primary small" href="${appUrl}">導到 App</a>
        <button class="btn ghost small" data-copy-tool="${tool.id}">複製 brief</button>
      </div>
    </article>
  `;
}

function render() {
  const tools = filteredTools();
  if (count) count.textContent = tools.length;
  if (!grid) return;
  grid.innerHTML = tools.map(card).join("");
  grid.querySelectorAll("[data-copy-tool]").forEach((button) => {
    button.addEventListener("click", async () => {
      const tool = microtools.find((item) => item.id === button.dataset.copyTool);
      const text = `${tool.id} ${tool.name}\n趨勢：${tool.trend}\n受眾：${tool.audience}\n玩法：${tool.hook}\n輸入：${tool.inputs}\n輸出：${tool.output}\n分享點：${tool.share}\n導流：${tool.cta}\nMVP：${tool.build}`;
      await navigator.clipboard.writeText(text);
      button.textContent = "已複製";
      setTimeout(() => button.textContent = "複製 brief", 1400);
    });
  });
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function exportCsv() {
  const header = ["id","name","trend","audience","hook","inputs","output","share","cta","style","build"];
  const rows = [header.join(",")].concat(microtools.map((tool) => header.map((key) => csvEscape(tool[key])).join(",")));
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chillout-100-travel-microtools.csv";
  a.click();
  URL.revokeObjectURL(url);
}

search?.addEventListener("input", render);
exportButton?.addEventListener("click", exportCsv);
renderFilters();
render();
