const CHILLOUT_TOOL_CATALOG = [
  {
    "slug": "save-sprint",
    "category": "social",
    "name": "IG 靈感急救室",
    "tagline": "把堆滿的收藏救成三個可出發方案。",
    "audience": "IG 收藏很多但排不出行程的人",
    "mechanic": "貼上靈感、調整混亂度，立即切成今日必排、可備用、先刪掉三區。",
    "result": "你的收藏不是太多，是還沒有變成路線。",
    "chips": [
      "收藏清倉",
      "三站路線",
      "ChillOut prompt"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "IG 靈感急救室操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結"
    ],
    "scoreSeed": 58,
    "executionPack": {
      "actions": [
        "把「收藏清倉」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 IG 收藏店家 與 朋友丟的 Reels 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 IG 靈感急救室 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 收藏清倉，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 IG 收藏店家 或這次最想解決的旅行條件。",
      "調整 收藏清倉、三站路線 與 ChillOut prompt 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T001",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/save-sprint.html",
    "poster": "assets/tool-posters/save-sprint.svg"
  },
  {
    "slug": "screenshot-to-route",
    "category": "social",
    "name": "三張截圖路線工坊",
    "tagline": "用三張截圖的線索拼出第一天玩法。",
    "audience": "把旅遊資訊存在相簿裡的人",
    "mechanic": "輸入三個截圖重點，系統會推定主題、移動順序與第一個落腳點。",
    "result": "三個碎片已經足夠開一條路。",
    "chips": [
      "截圖轉譯",
      "第一天",
      "路線順序"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "時間線",
    "interfaceTitle": "三張截圖路線工坊操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家"
    ],
    "scoreSeed": 59,
    "executionPack": {
      "actions": [
        "把「截圖轉譯」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 朋友丟的 Reels 與 小紅書截圖 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 三張截圖路線工坊 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 截圖轉譯，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 朋友丟的 Reels 或這次最想解決的旅行條件。",
      "調整 截圖轉譯、第一天 與 路線順序 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T002",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/screenshot-to-route.html",
    "poster": "assets/tool-posters/screenshot-to-route.svg"
  },
  {
    "slug": "creator-trip-remix",
    "category": "social",
    "name": "旅遊創作者路線 Remix",
    "tagline": "把創作者推薦改成自己的版本。",
    "audience": "看 Reels、小紅書、TikTok 找靈感的人",
    "mechanic": "輸入創作者路線與自己的偏好，重混成更符合預算與節奏的版本。",
    "result": "你不需要照抄熱門路線，你需要自己的 Remix。",
    "chips": [
      "創作者靈感",
      "預算修正",
      "個人化"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "三欄分流",
    "interfaceTitle": "旅遊創作者路線 Remix操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels"
    ],
    "scoreSeed": 60,
    "executionPack": {
      "actions": [
        "把「創作者靈感」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 小紅書截圖 與 咖啡廳名單 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 旅遊創作者路線 Remix 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 創作者靈感，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 小紅書截圖 或這次最想解決的旅行條件。",
      "調整 創作者靈感、預算修正 與 個人化 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T003",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/creator-trip-remix.html",
    "poster": "assets/tool-posters/creator-trip-remix.svg"
  },
  {
    "slug": "dupe-or-dream",
    "category": "social",
    "name": "爆紅景點值得嗎",
    "tagline": "判斷一個爆紅景點是夢幻還是只是人多。",
    "audience": "想去熱門景點但怕踩雷的人",
    "mechanic": "用期待值、人潮耐受與替代選項產生值得去分數。",
    "result": "值得去的不是名氣，是它是否符合你的旅行任務。",
    "chips": [
      "值得去分數",
      "替代點",
      "拍照時段"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "票券介面",
    "interfaceTitle": "爆紅景點值得嗎操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖"
    ],
    "scoreSeed": 61,
    "executionPack": {
      "actions": [
        "先判斷 值得去分數 值不值得，不值得就切 替代點。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 咖啡廳名單 或這次最想解決的旅行條件。",
      "調整 值得去分數、替代點 與 拍照時段 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T004",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/dupe-or-dream.html",
    "poster": "assets/tool-posters/dupe-or-dream.svg"
  },
  {
    "slug": "saved-post-cleanse",
    "category": "social",
    "name": "收藏斷捨離",
    "tagline": "把永遠不會去的收藏刪掉，留下真的想出發的。",
    "audience": "收藏夾爆炸但每次都重查的人",
    "mechanic": "依出發機率、距離、心動程度切成保留、備用、刪除。",
    "result": "清空收藏夾，也是排出行程的一部分。",
    "chips": [
      "保留清單",
      "備用清單",
      "刪除建議"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "任務板",
    "interfaceTitle": "收藏斷捨離操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單"
    ],
    "scoreSeed": 62,
    "executionPack": {
      "actions": [
        "把「保留清單」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 夜景口袋清單 與 想去但沒排的景點 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 收藏斷捨離 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 保留清單，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 夜景口袋清單 或這次最想解決的旅行條件。",
      "調整 保留清單、備用清單 與 刪除建議 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T005",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/saved-post-cleanse.html",
    "poster": "assets/tool-posters/saved-post-cleanse.svg"
  },
  {
    "slug": "map-pin-or-mood",
    "category": "social",
    "name": "景點心情分艙",
    "tagline": "同一堆景點，先按情緒分艙再排行程。",
    "audience": "不知道景點該怎麼分天的人",
    "mechanic": "把點位分成興奮、放空、拍照、吃喝，輸出每天主旋律。",
    "result": "行程不是地圖上的點，是每天的情緒節奏。",
    "chips": [
      "心情分艙",
      "每日主題",
      "移動排序"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "雷達圖",
    "interfaceTitle": "景點心情分艙操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單"
    ],
    "scoreSeed": 63,
    "executionPack": {
      "actions": [
        "把「心情分艙」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 想去但沒排的景點 與 朋友群組連結 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 景點心情分艙 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 心情分艙，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 想去但沒排的景點 或這次最想解決的旅行條件。",
      "調整 心情分艙、每日主題 與 移動排序 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T006",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/map-pin-or-mood.html",
    "poster": "assets/tool-posters/map-pin-or-mood.svg"
  },
  {
    "slug": "friend-link-inbox",
    "category": "social",
    "name": "朋友丟連結收件箱",
    "tagline": "群組裡的旅遊連結一鍵變成待辦。",
    "audience": "朋友一直丟連結但沒人整理的旅行群",
    "mechanic": "貼上多個連結或店名，工具會分類成食、住、拍、逛與負責人。",
    "result": "不用再往上滑聊天記錄，先把靈感收進同一張桌。",
    "chips": [
      "群組整理",
      "負責人",
      "可執行清單"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "清單桌面",
    "interfaceTitle": "朋友丟連結收件箱操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點"
    ],
    "scoreSeed": 64,
    "executionPack": {
      "actions": [
        "把「群組整理」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 朋友群組連結 與 IG 收藏店家 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 朋友丟連結收件箱 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 群組整理，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 朋友群組連結 或這次最想解決的旅行條件。",
      "調整 群組整理、負責人 與 可執行清單 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T007",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/friend-link-inbox.html",
    "poster": "assets/tool-posters/friend-link-inbox.svg"
  },
  {
    "slug": "feed-to-first-day",
    "category": "social",
    "name": "動態牆第一天行程",
    "tagline": "把今天滑到的靈感變成落地第一天。",
    "audience": "即將出國但還在滑靈感的人",
    "mechanic": "選出三個今日最心動的內容，排成抵達後不崩潰的路線。",
    "result": "第一天不用完美，只要能順利開始。",
    "chips": [
      "落地日",
      "低壓路線",
      "第一餐"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "手冊頁",
    "interfaceTitle": "動態牆第一天行程操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "IG 收藏店家",
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結"
    ],
    "scoreSeed": 65,
    "executionPack": {
      "actions": [
        "把「落地日」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 IG 收藏店家 與 朋友丟的 Reels 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 動態牆第一天行程 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 落地日，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 IG 收藏店家 或這次最想解決的旅行條件。",
      "調整 落地日、低壓路線 與 第一餐 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T008",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/feed-to-first-day.html",
    "poster": "assets/tool-posters/feed-to-first-day.svg"
  },
  {
    "slug": "viral-spot-truth",
    "category": "social",
    "name": "爆紅景點真相卡",
    "tagline": "幫熱門景點補上人潮、交通與期待管理。",
    "audience": "怕被美照騙到的人",
    "mechanic": "輸入景點與期待，輸出真相卡、避雷時段和可替代玩法。",
    "result": "漂亮照片背後需要一張真相卡。",
    "chips": [
      "真相卡",
      "避雷",
      "替代玩法"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "爆紅景點真相卡操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "朋友丟的 Reels",
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家"
    ],
    "scoreSeed": 66,
    "executionPack": {
      "actions": [
        "把「真相卡」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 朋友丟的 Reels 與 小紅書截圖 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 爆紅景點真相卡 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 真相卡，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 朋友丟的 Reels 或這次最想解決的旅行條件。",
      "調整 真相卡、避雷 與 替代玩法 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T009",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/viral-spot-truth.html",
    "poster": "assets/tool-posters/viral-spot-truth.svg"
  },
  {
    "slug": "aesthetic-to-itinerary",
    "category": "social",
    "name": "旅行美學轉行程",
    "tagline": "從一種美學直接生出一天路線。",
    "audience": "先被風格吸引、後面才想目的地的人",
    "mechanic": "選擇奶油、霓虹、復古、森林或海風等美學，輸出對應路線。",
    "result": "你的旅行可以先有風格，再找地點。",
    "chips": [
      "美學路線",
      "拍照任務",
      "ChillOut 生成"
    ],
    "mode": "sorter",
    "modeLabel": "靈感整理器",
    "modeVariant": "時間線",
    "interfaceTitle": "旅行美學轉行程操作台",
    "actionLabel": "整理成可出發清單",
    "resultName": "出發清單",
    "modePromise": "把散亂素材分成今天必排、可備用、先刪掉三種狀態。",
    "shareLead": "我把一堆旅遊靈感整理成可出發清單",
    "sampleItems": [
      "小紅書截圖",
      "咖啡廳名單",
      "夜景口袋清單",
      "想去但沒排的景點",
      "朋友群組連結",
      "IG 收藏店家",
      "朋友丟的 Reels"
    ],
    "scoreSeed": 67,
    "executionPack": {
      "actions": [
        "把「美學路線」拆成 3 個桶：今天必排、可備用、先刪掉。",
        "把 小紅書截圖 與 咖啡廳名單 合併成第一版路線。",
        "把得分最高的 3 個素材丟進 ChillOut 產生完整行程。"
      ],
      "hooks": [
        "我用 旅行美學轉行程 把群組靈感整理成可出發清單。",
        "收藏不是問題，沒有整理才是問題。",
        "留言你的 美學路線，我幫你丟進 ChillOut 變行程。"
      ],
      "qa": [
        "至少輸入 3 個素材",
        "結果要出現三桶分類",
        "分享文案要含 ChillOut 導流"
      ]
    },
    "playSteps": [
      "輸入 小紅書截圖 或這次最想解決的旅行條件。",
      "調整 美學路線、拍照任務 與 ChillOut 生成 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T010",
    "categoryLabel": "社群靈感轉行程",
    "categoryTone": "把 IG、截圖、朋友傳來的靈感變成可以出發的路線。",
    "primary": "#08A7A0",
    "accent": "#08A7A0",
    "deep": "#1C1915",
    "href": "tools/aesthetic-to-itinerary.html",
    "poster": "assets/tool-posters/aesthetic-to-itinerary.svg"
  },
  {
    "slug": "trip-mbti",
    "category": "quiz",
    "name": "旅行 MBTI 不是 MBTI",
    "tagline": "測出你真正的旅行操作系統。",
    "audience": "喜歡人格測驗與分享結果的人",
    "mechanic": "四題測節奏、風險、社交與錨點，產生旅行角色與首趟推薦。",
    "result": "你不是難搞，你只是旅行系統設定很明確。",
    "chips": [
      "人格卡",
      "角色結果",
      "分享圖文"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "三欄分流",
    "interfaceTitle": "旅行 MBTI 不是 MBTI操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "餐廳優先",
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先"
    ],
    "scoreSeed": 68,
    "executionPack": {
      "actions": [
        "用 人格卡 結果決定行程第一順位。",
        "把 角色結果 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 旅行 MBTI 不是 MBTI 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 餐廳優先 或這次最想解決的旅行條件。",
      "調整 人格卡、角色結果 與 分享圖文 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T011",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/trip-mbti.html",
    "poster": "assets/tool-posters/trip-mbti.svg"
  },
  {
    "slug": "city-soulmate",
    "category": "quiz",
    "name": "城市靈魂伴侶",
    "tagline": "找出最像你的城市，而不是最熱門的城市。",
    "audience": "不知道下一站去哪的人",
    "mechanic": "依節奏、夜生活、食物與安靜程度配對城市人格。",
    "result": "下一站可以不是大家推薦的，而是你會喜歡的。",
    "chips": [
      "城市配對",
      "下一站",
      "個性化"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "票券介面",
    "interfaceTitle": "城市靈魂伴侶操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先"
    ],
    "scoreSeed": 69,
    "executionPack": {
      "actions": [
        "用 城市配對 結果決定行程第一順位。",
        "把 下一站 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 城市靈魂伴侶 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 突然改行程 或這次最想解決的旅行條件。",
      "調整 城市配對、下一站 與 個性化 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T012",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/city-soulmate.html",
    "poster": "assets/tool-posters/city-soulmate.svg"
  },
  {
    "slug": "travel-villain",
    "category": "quiz",
    "name": "你是哪種旅行反派",
    "tagline": "用好笑方式揭露旅行中最雷的自己。",
    "audience": "適合社群互動與朋友互傳的人",
    "mechanic": "測出你是行程暴君、拍照導演、預算審判長還是睡過頭魔王。",
    "result": "先承認自己的旅行反派，旅伴才有活路。",
    "chips": [
      "幽默測驗",
      "朋友互傳",
      "旅行雷點"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "任務板",
    "interfaceTitle": "你是哪種旅行反派操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先",
      "突然改行程"
    ],
    "scoreSeed": 70,
    "executionPack": {
      "actions": [
        "用 幽默測驗 結果決定行程第一順位。",
        "把 朋友互傳 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 你是哪種旅行反派 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 安靜探索 或這次最想解決的旅行條件。",
      "調整 幽默測驗、朋友互傳 與 旅行雷點 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T013",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/travel-villain.html",
    "poster": "assets/tool-posters/travel-villain.svg"
  },
  {
    "slug": "airport-archetype",
    "category": "quiz",
    "name": "機場人格測驗",
    "tagline": "從你到機場的行為看出旅行人格。",
    "audience": "出國前會興奮發限動的人",
    "mechanic": "用報到時間、免稅店、登機焦慮與候機習慣生成角色。",
    "result": "機場已經暴露你整趟旅行的樣子。",
    "chips": [
      "機場角色",
      "出發前",
      "限動素材"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "雷達圖",
    "interfaceTitle": "機場人格測驗操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先",
      "突然改行程",
      "安靜探索"
    ],
    "scoreSeed": 71,
    "executionPack": {
      "actions": [
        "用 機場角色 結果決定行程第一順位。",
        "把 出發前 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 機場人格測驗 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 朋友一起玩 或這次最想解決的旅行條件。",
      "調整 機場角色、出發前 與 限動素材 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T014",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/airport-archetype.html",
    "poster": "assets/tool-posters/airport-archetype.svg"
  },
  {
    "slug": "packing-personality",
    "category": "quiz",
    "name": "行李箱人格",
    "tagline": "用打包方式測你適合的旅行節奏。",
    "audience": "行李常常爆掉或漏帶的人",
    "mechanic": "測打包提前量、備品量與穿搭執念，產出行李人格與提醒。",
    "result": "你的行李箱比你更誠實。",
    "chips": [
      "行李人格",
      "打包提示",
      "出發清單"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "清單桌面",
    "interfaceTitle": "行李箱人格操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先",
      "突然改行程",
      "安靜探索",
      "朋友一起玩"
    ],
    "scoreSeed": 72,
    "executionPack": {
      "actions": [
        "用 行李人格 結果決定行程第一順位。",
        "把 打包提示 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 行李箱人格 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 慢慢晃 或這次最想解決的旅行條件。",
      "調整 行李人格、打包提示 與 出發清單 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T015",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/packing-personality.html",
    "poster": "assets/tool-posters/packing-personality.svg"
  },
  {
    "slug": "food-first-or-view-first",
    "category": "quiz",
    "name": "美食派還是風景派",
    "tagline": "決定行程該先鎖餐廳還是先鎖景色。",
    "audience": "排行程時常常選擇障礙的人",
    "mechanic": "用餐點期待、移動距離與拍照需求判斷日程優先級。",
    "result": "順序對了，整天都會輕鬆很多。",
    "chips": [
      "排序測驗",
      "餐廳優先",
      "風景優先"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "手冊頁",
    "interfaceTitle": "美食派還是風景派操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "一天塞滿",
      "拍照優先",
      "餐廳優先",
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃"
    ],
    "scoreSeed": 73,
    "executionPack": {
      "actions": [
        "用 排序測驗 當味覺主線，不要把店名塞滿。",
        "把 餐廳優先 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 一天塞滿 或這次最想解決的旅行條件。",
      "調整 排序測驗、餐廳優先 與 風景優先 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T016",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/food-first-or-view-first.html",
    "poster": "assets/tool-posters/food-first-or-view-first.svg"
  },
  {
    "slug": "slow-fast-balance",
    "category": "quiz",
    "name": "慢旅快旅比例尺",
    "tagline": "算出你一天該排幾個點才舒服。",
    "audience": "行程常常過滿或太空的人",
    "mechanic": "用體力、好奇心、移動厭惡與休息需求產生日程密度。",
    "result": "不是景點少，是你需要留白。",
    "chips": [
      "行程密度",
      "慢旅比例",
      "舒適節奏"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "慢旅快旅比例尺操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "拍照優先",
      "餐廳優先",
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿"
    ],
    "scoreSeed": 74,
    "executionPack": {
      "actions": [
        "用 行程密度 結果決定行程第一順位。",
        "把 慢旅比例 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 慢旅快旅比例尺 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 拍照優先 或這次最想解決的旅行條件。",
      "調整 行程密度、慢旅比例 與 舒適節奏 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T017",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/slow-fast-balance.html",
    "poster": "assets/tool-posters/slow-fast-balance.svg"
  },
  {
    "slug": "hotel-room-energy",
    "category": "quiz",
    "name": "房型能量測驗",
    "tagline": "從住宿需求反推你這趟旅行要補什麼。",
    "audience": "訂房前猶豫房型與地點的人",
    "mechanic": "評估睡眠、浴缸、景觀、位置需求，產生住宿優先順序。",
    "result": "住宿不是配角，它會決定你有沒有力氣玩。",
    "chips": [
      "住宿需求",
      "房型排序",
      "預算分配"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "時間線",
    "interfaceTitle": "房型能量測驗操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "餐廳優先",
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先"
    ],
    "scoreSeed": 75,
    "executionPack": {
      "actions": [
        "用 住宿需求 結果決定行程第一順位。",
        "把 房型排序 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 房型能量測驗 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 餐廳優先 或這次最想解決的旅行條件。",
      "調整 住宿需求、房型排序 與 預算分配 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T018",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/hotel-room-energy.html",
    "poster": "assets/tool-posters/hotel-room-energy.svg"
  },
  {
    "slug": "first-day-ritual",
    "category": "quiz",
    "name": "第一日儀式測驗",
    "tagline": "找出抵達當天最適合你的開場。",
    "audience": "旅行第一天容易失控的人",
    "mechanic": "依抵達時間、體力與期待，推薦第一餐、第一站與不要做的事。",
    "result": "第一天的任務是讓旅行順利開始。",
    "chips": [
      "抵達日",
      "第一餐",
      "開場儀式"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "三欄分流",
    "interfaceTitle": "第一日儀式測驗操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "突然改行程",
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先"
    ],
    "scoreSeed": 76,
    "executionPack": {
      "actions": [
        "用 抵達日 結果決定行程第一順位。",
        "把 第一餐 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 第一日儀式測驗 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 突然改行程 或這次最想解決的旅行條件。",
      "調整 抵達日、第一餐 與 開場儀式 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T019",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/first-day-ritual.html",
    "poster": "assets/tool-posters/first-day-ritual.svg"
  },
  {
    "slug": "trip-anxiety-type",
    "category": "quiz",
    "name": "旅行焦慮類型",
    "tagline": "把出發前的不安變成具體備案。",
    "audience": "很想出門但很怕麻煩的人",
    "mechanic": "測出你擔心交通、天氣、預算、語言或失控，生成備案卡。",
    "result": "焦慮不是敵人，它是在提醒你需要備案。",
    "chips": [
      "焦慮分類",
      "備案卡",
      "安心提示"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "票券介面",
    "interfaceTitle": "旅行焦慮類型操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "安靜探索",
      "朋友一起玩",
      "慢慢晃",
      "一天塞滿",
      "拍照優先",
      "餐廳優先",
      "突然改行程"
    ],
    "scoreSeed": 77,
    "executionPack": {
      "actions": [
        "用 焦慮分類 結果決定行程第一順位。",
        "把 備案卡 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 旅行焦慮類型 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 安靜探索 或這次最想解決的旅行條件。",
      "調整 焦慮分類、備案卡 與 安心提示 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T020",
    "categoryLabel": "旅行人格測驗",
    "categoryTone": "用輕量測驗讓使用者得到可分享的旅行角色與第一版行程。",
    "primary": "#7C5CFF",
    "accent": "#7C5CFF",
    "deep": "#1C1915",
    "href": "tools/trip-anxiety-type.html",
    "poster": "assets/tool-posters/trip-anxiety-type.svg"
  },
  {
    "slug": "travel-buddy-contract",
    "category": "group",
    "name": "旅行搭子合約",
    "tagline": "出發前先講清楚，途中少吵一點。",
    "audience": "朋友、情侶、家人一起出遊的人",
    "mechanic": "填旅伴、預算、作息與雷點，產生可截圖的旅行合約。",
    "result": "好旅伴不是不吵架，是有事先說清楚。",
    "chips": [
      "搭子合約",
      "截圖分享",
      "出發前"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "任務板",
    "interfaceTitle": "旅行搭子合約操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "最後決策權",
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好"
    ],
    "scoreSeed": 78,
    "executionPack": {
      "actions": [
        "先把 搭子合約 寫成旅伴共識，而不是出發後才吵。",
        "把 截圖分享 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 最後決策權 或這次最想解決的旅行條件。",
      "調整 搭子合約、截圖分享 與 出發前 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T021",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/travel-buddy-contract.html",
    "poster": "assets/tool-posters/travel-buddy-contract.svg"
  },
  {
    "slug": "couple-conflict-map",
    "category": "group",
    "name": "情侶旅行雷區圖",
    "tagline": "先標出會吵的點，再排不容易爆炸的路線。",
    "audience": "情侶旅行前想降低摩擦的人",
    "mechanic": "選出拍照、吃飯、早起、預算等雷區，生成避雷協議。",
    "result": "浪漫不是不規劃，是把爆點移除。",
    "chips": [
      "情侶旅行",
      "避雷協議",
      "溝通卡"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "雷達圖",
    "interfaceTitle": "情侶旅行雷區圖操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權"
    ],
    "scoreSeed": 79,
    "executionPack": {
      "actions": [
        "先把 情侶旅行 寫成旅伴共識，而不是出發後才吵。",
        "把 避雷協議 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 早起時間 或這次最想解決的旅行條件。",
      "調整 情侶旅行、避雷協議 與 溝通卡 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T022",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/couple-conflict-map.html",
    "poster": "assets/tool-posters/couple-conflict-map.svg"
  },
  {
    "slug": "group-vote-map",
    "category": "group",
    "name": "群組目的地決策器",
    "tagline": "讓群組不用再投票投到消失。",
    "audience": "多人旅遊的主揪",
    "mechanic": "輸入候選地、預算差距與偏好，輸出共識最高的前三名。",
    "result": "群組需要的不是更多討論，是更容易決定。",
    "chips": [
      "群組投票",
      "目的地決策",
      "主揪工具"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "清單桌面",
    "interfaceTitle": "群組目的地決策器操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權",
      "早起時間"
    ],
    "scoreSeed": 80,
    "executionPack": {
      "actions": [
        "先把 群組投票 寫成旅伴共識，而不是出發後才吵。",
        "把 目的地決策 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 美食預算 或這次最想解決的旅行條件。",
      "調整 群組投票、目的地決策 與 主揪工具 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T023",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/group-vote-map.html",
    "poster": "assets/tool-posters/group-vote-map.svg"
  },
  {
    "slug": "family-energy-map",
    "category": "group",
    "name": "家族體力地圖",
    "tagline": "把長輩、小孩與年輕人的步調放在同一張圖。",
    "audience": "家庭旅遊規劃者",
    "mechanic": "用成員體力與休息需求，安排上午、午後、晚上的強弱節奏。",
    "result": "家庭旅遊最重要的是誰都不要被拖垮。",
    "chips": [
      "家庭旅遊",
      "體力分配",
      "休息點"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "手冊頁",
    "interfaceTitle": "家族體力地圖操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權",
      "早起時間",
      "美食預算"
    ],
    "scoreSeed": 81,
    "executionPack": {
      "actions": [
        "先把 家庭旅遊 寫成旅伴共識，而不是出發後才吵。",
        "把 體力分配 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 拍照耐心 或這次最想解決的旅行條件。",
      "調整 家庭旅遊、體力分配 與 休息點 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T024",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/family-energy-map.html",
    "poster": "assets/tool-posters/family-energy-map.svg"
  },
  {
    "slug": "who-plans-what",
    "category": "group",
    "name": "旅行分工抽籤",
    "tagline": "把排行程變成可接受的任務分配。",
    "audience": "總是只有一個人在規劃的群組",
    "mechanic": "輸入成員與任務，依興趣分配餐廳、交通、住宿與拍照。",
    "result": "主揪不該是一個人的職業。",
    "chips": [
      "任務分配",
      "主揪救援",
      "群組協作"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "旅行分工抽籤操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權",
      "早起時間",
      "美食預算",
      "拍照耐心"
    ],
    "scoreSeed": 82,
    "executionPack": {
      "actions": [
        "先把 任務分配 寫成旅伴共識，而不是出發後才吵。",
        "把 主揪救援 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 各自放風 或這次最想解決的旅行條件。",
      "調整 任務分配、主揪救援 與 群組協作 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T025",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/who-plans-what.html",
    "poster": "assets/tool-posters/who-plans-what.svg"
  },
  {
    "slug": "budget-peace-treaty",
    "category": "group",
    "name": "預算和平協議",
    "tagline": "把錢講清楚，旅行才不尷尬。",
    "audience": "預算差異大的旅伴",
    "mechanic": "估算住宿、餐飲、交通與自由購物分區，生成預算邊界。",
    "result": "先談預算，不是掃興，是讓大家玩得自在。",
    "chips": [
      "預算共識",
      "花費邊界",
      "分帳提示"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "時間線",
    "interfaceTitle": "預算和平協議操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "交通分工",
      "房型偏好",
      "最後決策權",
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風"
    ],
    "scoreSeed": 83,
    "executionPack": {
      "actions": [
        "先把 預算共識 寫成旅伴共識，而不是出發後才吵。",
        "把 花費邊界 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 交通分工 或這次最想解決的旅行條件。",
      "調整 預算共識、花費邊界 與 分帳提示 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T026",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/budget-peace-treaty.html",
    "poster": "assets/tool-posters/budget-peace-treaty.svg"
  },
  {
    "slug": "restaurant-veto",
    "category": "group",
    "name": "餐廳否決權",
    "tagline": "每個人都有一次不想吃的權利。",
    "audience": "多人旅行吃飯最難決定的人",
    "mechanic": "輸入忌口與想吃，生成候選餐廳規則與否決權。",
    "result": "餐廳不是猜心遊戲，是共同規則。",
    "chips": [
      "餐廳共識",
      "否決權",
      "忌口整理"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "三欄分流",
    "interfaceTitle": "餐廳否決權操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "房型偏好",
      "最後決策權",
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工"
    ],
    "scoreSeed": 84,
    "executionPack": {
      "actions": [
        "先把 餐廳共識 寫成旅伴共識，而不是出發後才吵。",
        "把 否決權 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 房型偏好 或這次最想解決的旅行條件。",
      "調整 餐廳共識、否決權 與 忌口整理 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T027",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/restaurant-veto.html",
    "poster": "assets/tool-posters/restaurant-veto.svg"
  },
  {
    "slug": "morning-night-truce",
    "category": "group",
    "name": "早鳥夜貓停戰協議",
    "tagline": "早起派與夜貓派可以同一趟旅行共存。",
    "audience": "作息差很大的旅伴",
    "mechanic": "輸入作息與必做項目，安排分流時段與集合點。",
    "result": "不必同時起床，也可以一起旅行。",
    "chips": [
      "作息分流",
      "集合點",
      "停戰協議"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "票券介面",
    "interfaceTitle": "早鳥夜貓停戰協議操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "最後決策權",
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好"
    ],
    "scoreSeed": 58,
    "executionPack": {
      "actions": [
        "先把 作息分流 寫成旅伴共識，而不是出發後才吵。",
        "把 集合點 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 最後決策權 或這次最想解決的旅行條件。",
      "調整 作息分流、集合點 與 停戰協議 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T028",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/morning-night-truce.html",
    "poster": "assets/tool-posters/morning-night-truce.svg"
  },
  {
    "slug": "photo-duty-roulette",
    "category": "group",
    "name": "拍照任務輪盤",
    "tagline": "把拍照責任公平又好玩地輪流。",
    "audience": "旅行中常常為拍照吵架的人",
    "mechanic": "分配攝影師、導演、道具、側拍與成果發布任務。",
    "result": "好照片需要分工，不需要互相嫌棄。",
    "chips": [
      "拍照分工",
      "任務輪盤",
      "限動素材"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "任務板",
    "interfaceTitle": "拍照任務輪盤操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "早起時間",
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權"
    ],
    "scoreSeed": 59,
    "executionPack": {
      "actions": [
        "先把 拍照分工 寫成旅伴共識，而不是出發後才吵。",
        "把 任務輪盤 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 早起時間 或這次最想解決的旅行條件。",
      "調整 拍照分工、任務輪盤 與 限動素材 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T029",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/photo-duty-roulette.html",
    "poster": "assets/tool-posters/photo-duty-roulette.svg"
  },
  {
    "slug": "solo-or-social",
    "category": "group",
    "name": "獨處社交排程器",
    "tagline": "多人旅行也能留出自己喘氣的時間。",
    "audience": "跟朋友旅行但需要獨處的人",
    "mechanic": "設定獨處需求與共同活動，輸出可接受的分開行動時段。",
    "result": "分開一下，不代表不想一起玩。",
    "chips": [
      "獨處時段",
      "共同活動",
      "低摩擦"
    ],
    "mode": "pact",
    "modeLabel": "旅伴協議",
    "modeVariant": "雷達圖",
    "interfaceTitle": "獨處社交排程器操作台",
    "actionLabel": "產生旅伴共識",
    "resultName": "旅伴協議書",
    "modePromise": "把出發前最容易吵的點變成可以截圖討論的協議。",
    "shareLead": "我做了一份旅行前共識協議",
    "sampleItems": [
      "美食預算",
      "拍照耐心",
      "各自放風",
      "交通分工",
      "房型偏好",
      "最後決策權",
      "早起時間"
    ],
    "scoreSeed": 60,
    "executionPack": {
      "actions": [
        "先把 獨處時段 寫成旅伴共識，而不是出發後才吵。",
        "把 共同活動 設成行前必談條款。",
        "把協議截圖丟群組，確認每個人都接受。"
      ],
      "hooks": [
        "旅行前先簽這張，不然出發後很容易爆。",
        "真正的旅伴默契是先講清楚。",
        "把最容易吵的點變成可以截圖的協議。"
      ],
      "qa": [
        "旅伴名單可空白也能生成",
        "至少輸出 4 條協議",
        "Prompt 要包含預算與放風需求"
      ]
    },
    "playSteps": [
      "輸入 美食預算 或這次最想解決的旅行條件。",
      "調整 獨處時段、共同活動 與 低摩擦 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T030",
    "categoryLabel": "搭子與關係工具",
    "categoryTone": "把旅行前最容易吵的事情變成可以討論、投票、截圖分享的協議。",
    "primary": "#EF476F",
    "accent": "#EF476F",
    "deep": "#1C1915",
    "href": "tools/solo-or-social.html",
    "poster": "assets/tool-posters/solo-or-social.svg"
  },
  {
    "slug": "night-owl-route",
    "category": "night",
    "name": "夜貓城市路線",
    "tagline": "專為晚上才醒來的人排一條城市線。",
    "audience": "喜歡夜生活、夜景、深夜散步的人",
    "mechanic": "選城市、夜晚主題與安全保守度，生成 19:00 後路線。",
    "result": "有些城市要等天黑才真正開始。",
    "chips": [
      "夜遊路線",
      "深夜",
      "安全提示"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "清單桌面",
    "interfaceTitle": "夜貓城市路線操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "夜景拍照",
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步"
    ],
    "scoreSeed": 61,
    "executionPack": {
      "actions": [
        "把 夜遊路線 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 夜景拍照 或這次最想解決的旅行條件。",
      "調整 夜遊路線、深夜 與 安全提示 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T031",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/night-owl-route.html",
    "poster": "assets/tool-posters/night-owl-route.svg"
  },
  {
    "slug": "sunset-countdown",
    "category": "night",
    "name": "日落倒數排程",
    "tagline": "從日落時間倒推一整個傍晚。",
    "audience": "想拍夕陽但常常錯過的人",
    "mechanic": "用抵達時間與拍照需求倒推交通、咖啡、觀景點與晚餐。",
    "result": "好的日落不是碰運氣，是倒推安排。",
    "chips": [
      "日落",
      "倒數",
      "觀景點"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "手冊頁",
    "interfaceTitle": "日落倒數排程操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照"
    ],
    "scoreSeed": 62,
    "executionPack": {
      "actions": [
        "把 日落 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 宵夜收尾 或這次最想解決的旅行條件。",
      "調整 日落、倒數 與 觀景點 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T032",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/sunset-countdown.html",
    "poster": "assets/tool-posters/sunset-countdown.svg"
  },
  {
    "slug": "moonwalk-map",
    "category": "night",
    "name": "月光散步地圖",
    "tagline": "排一條安靜、漂亮、不趕路的夜間散步。",
    "audience": "想在城市裡慢慢走的人",
    "mechanic": "依城市、安全值與氛圍，生成散步距離、停留點與回程方式。",
    "result": "夜晚不是一定要熱鬧，也可以很溫柔。",
    "chips": [
      "散步",
      "安靜",
      "夜景"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "月光散步地圖操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾"
    ],
    "scoreSeed": 63,
    "executionPack": {
      "actions": [
        "把 散步 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 安全返程 或這次最想解決的旅行條件。",
      "調整 散步、安靜 與 夜景 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T033",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/moonwalk-map.html",
    "poster": "assets/tool-posters/moonwalk-map.svg"
  },
  {
    "slug": "late-night-dessert",
    "category": "night",
    "name": "深夜甜點雷達",
    "tagline": "把晚餐後的空白變成甜點任務。",
    "audience": "旅行中永遠還想吃甜點的人",
    "mechanic": "用城市與甜點類型，產生深夜甜點、散步與拍照組合。",
    "result": "甜點不是加餐，是夜晚的句點。",
    "chips": [
      "甜點",
      "宵夜",
      "散步"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "時間線",
    "interfaceTitle": "深夜甜點雷達操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾",
      "安全返程"
    ],
    "scoreSeed": 64,
    "executionPack": {
      "actions": [
        "把 甜點 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 雨備室內點 或這次最想解決的旅行條件。",
      "調整 甜點、宵夜 與 散步 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T034",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/late-night-dessert.html",
    "poster": "assets/tool-posters/late-night-dessert.svg"
  },
  {
    "slug": "red-eye-rescue",
    "category": "night",
    "name": "紅眼航班救援包",
    "tagline": "紅眼前後不再狼狽。",
    "audience": "搭早班或紅眼班機的人",
    "mechanic": "輸入班機時間與保守度，安排淋浴、寄物、咖啡與補眠策略。",
    "result": "紅眼航班需要的是緩衝，不是硬撐。",
    "chips": [
      "紅眼航班",
      "寄物",
      "補眠"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "三欄分流",
    "interfaceTitle": "紅眼航班救援包操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾",
      "安全返程",
      "雨備室內點"
    ],
    "scoreSeed": 65,
    "executionPack": {
      "actions": [
        "把 紅眼航班 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 末班車時間 或這次最想解決的旅行條件。",
      "調整 紅眼航班、寄物 與 補眠 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T035",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/red-eye-rescue.html",
    "poster": "assets/tool-posters/red-eye-rescue.svg"
  },
  {
    "slug": "night-safety-pass",
    "category": "night",
    "name": "夜遊安全通行證",
    "tagline": "把夜遊風險轉成簡單檢核與路線限制。",
    "audience": "想夜遊但重視安全的人",
    "mechanic": "依城市、同行人數與回程方式，生成安全檢核與不要去區域。",
    "result": "玩得晚可以，但回得去更重要。",
    "chips": [
      "安全檢核",
      "回程",
      "夜遊"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "票券介面",
    "interfaceTitle": "夜遊安全通行證操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "日落前集合",
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間"
    ],
    "scoreSeed": 66,
    "executionPack": {
      "actions": [
        "把 安全檢核 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 日落前集合 或這次最想解決的旅行條件。",
      "調整 安全檢核、回程 與 夜遊 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T036",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/night-safety-pass.html",
    "poster": "assets/tool-posters/night-safety-pass.svg"
  },
  {
    "slug": "neon-photo-mission",
    "category": "night",
    "name": "霓虹拍照任務",
    "tagline": "用任務卡拍出一組夜晚照片。",
    "audience": "想拍夜間城市感照片的人",
    "mechanic": "選城市與風格，產生招牌、倒影、路口、人物四種任務。",
    "result": "霓虹不是背景，是照片任務。",
    "chips": [
      "拍照任務",
      "霓虹",
      "限動"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "任務板",
    "interfaceTitle": "霓虹拍照任務操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合"
    ],
    "scoreSeed": 67,
    "executionPack": {
      "actions": [
        "把 拍照任務 變成回憶標題。",
        "用 霓虹 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 晚餐後散步 或這次最想解決的旅行條件。",
      "調整 拍照任務、霓虹 與 限動 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T037",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/neon-photo-mission.html",
    "poster": "assets/tool-posters/neon-photo-mission.svg"
  },
  {
    "slug": "star-chaser",
    "category": "night",
    "name": "星空追逐卡",
    "tagline": "用簡單條件判斷今晚值不值得追星。",
    "audience": "想看星空、銀河或夜景的人",
    "mechanic": "輸入城市與移動距離，生成追星可行度與備案。",
    "result": "追星空要浪漫，也要備案。",
    "chips": [
      "星空",
      "備案",
      "夜間交通"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "雷達圖",
    "interfaceTitle": "星空追逐卡操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "夜景拍照",
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步"
    ],
    "scoreSeed": 68,
    "executionPack": {
      "actions": [
        "把 星空 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 夜景拍照 或這次最想解決的旅行條件。",
      "調整 星空、備案 與 夜間交通 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T038",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/star-chaser.html",
    "poster": "assets/tool-posters/star-chaser.svg"
  },
  {
    "slug": "night-market-boss",
    "category": "night",
    "name": "夜市點餐 Boss",
    "tagline": "把夜市變成一場有路線的任務。",
    "audience": "去夜市不知道怎麼吃的人",
    "mechanic": "選飢餓程度與排隊耐受，產生主食、甜點、飲料與遊戲順序。",
    "result": "夜市不需要全吃，需要吃得有節奏。",
    "chips": [
      "夜市",
      "點餐順序",
      "任務"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "清單桌面",
    "interfaceTitle": "夜市點餐 Boss操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "宵夜收尾",
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照"
    ],
    "scoreSeed": 69,
    "executionPack": {
      "actions": [
        "把 夜市 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 宵夜收尾 或這次最想解決的旅行條件。",
      "調整 夜市、點餐順序 與 任務 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T039",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/night-market-boss.html",
    "poster": "assets/tool-posters/night-market-boss.svg"
  },
  {
    "slug": "after-dark-date",
    "category": "night",
    "name": "夜景約會生成器",
    "tagline": "用低壓方式排一個晚上約會。",
    "audience": "想安排城市夜晚約會的人",
    "mechanic": "選城市、親密度與預算，產出餐後散步、夜景與收尾。",
    "result": "好的約會不靠塞滿，靠節奏。",
    "chips": [
      "約會",
      "夜景",
      "晚餐後"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "手冊頁",
    "interfaceTitle": "夜景約會生成器操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "安全返程",
      "雨備室內點",
      "末班車時間",
      "日落前集合",
      "晚餐後散步",
      "夜景拍照",
      "宵夜收尾"
    ],
    "scoreSeed": 70,
    "executionPack": {
      "actions": [
        "把 約會 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 安全返程 或這次最想解決的旅行條件。",
      "調整 約會、夜景 與 晚餐後 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T040",
    "categoryLabel": "夜旅與 Noctourism",
    "categoryTone": "跟上夜遊、日落、深夜甜點與城市霓虹的旅行趨勢。",
    "primary": "#4D96FF",
    "accent": "#4D96FF",
    "deep": "#1C1915",
    "href": "tools/after-dark-date.html",
    "poster": "assets/tool-posters/after-dark-date.svg"
  },
  {
    "slug": "crowd-escape-plan",
    "category": "detour",
    "name": "人潮逃生路線",
    "tagline": "熱門景點太擠時，立刻切出備案。",
    "audience": "討厭排隊與人群的人",
    "mechanic": "輸入景點和人潮耐受，生成 15、30、60 分鐘替代方案。",
    "result": "你可以去熱門地方，但不必困在熱門地方。",
    "chips": [
      "人潮備案",
      "替代路線",
      "即時切換"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "人潮逃生路線操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "附近咖啡",
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷"
    ],
    "scoreSeed": 71,
    "executionPack": {
      "actions": [
        "把 人潮備案 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 人潮逃生路線 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 附近咖啡 或這次最想解決的旅行條件。",
      "調整 人潮備案、替代路線 與 即時切換 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T041",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/crowd-escape-plan.html",
    "poster": "assets/tool-posters/crowd-escape-plan.svg"
  },
  {
    "slug": "dupe-destination",
    "category": "detour",
    "name": "替代目的地選擇器",
    "tagline": "找出同氛圍但更少人的選項。",
    "audience": "想要熱門感但不要熱門人潮的人",
    "mechanic": "用原景點的氛圍，推薦小眾替代與比較理由。",
    "result": "有時候 dupe 才是真正適合你的夢幻點。",
    "chips": [
      "替代目的地",
      "少人",
      "比較表"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "時間線",
    "interfaceTitle": "替代目的地選擇器操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡"
    ],
    "scoreSeed": 72,
    "executionPack": {
      "actions": [
        "先判斷 替代目的地 值不值得，不值得就切 少人。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 備案公園 或這次最想解決的旅行條件。",
      "調整 替代目的地、少人 與 比較表 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T042",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/dupe-destination.html",
    "poster": "assets/tool-posters/dupe-destination.svg"
  },
  {
    "slug": "two-km-sidequest",
    "category": "detour",
    "name": "2 公里支線任務",
    "tagline": "在主要景點旁邊多找一個驚喜。",
    "audience": "想在行程中加入小冒險的人",
    "mechanic": "輸入主景點，生成步行 2 公里內的咖啡、巷弄或觀景任務。",
    "result": "最有記憶點的常常是支線。",
    "chips": [
      "支線任務",
      "步行",
      "驚喜點"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "三欄分流",
    "interfaceTitle": "2 公里支線任務操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡",
      "備案公園"
    ],
    "scoreSeed": 73,
    "executionPack": {
      "actions": [
        "先判斷 支線任務 值不值得，不值得就切 步行。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 熱門景點 或這次最想解決的旅行條件。",
      "調整 支線任務、步行 與 驚喜點 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T043",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/two-km-sidequest.html",
    "poster": "assets/tool-posters/two-km-sidequest.svg"
  },
  {
    "slug": "station-mini-trip",
    "category": "detour",
    "name": "車站微旅行",
    "tagline": "只用一個車站周邊排出半天。",
    "audience": "轉車、等人或短時間空檔的人",
    "mechanic": "輸入車站與可用時間，生成吃、逛、休息三段。",
    "result": "車站不是路過，它也能是一段旅行。",
    "chips": [
      "車站",
      "半天",
      "微旅行"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "票券介面",
    "interfaceTitle": "車站微旅行操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡",
      "備案公園",
      "熱門景點"
    ],
    "scoreSeed": 74,
    "executionPack": {
      "actions": [
        "先判斷 車站 值不值得，不值得就切 半天。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 排隊名店 或這次最想解決的旅行條件。",
      "調整 車站、半天 與 微旅行 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T044",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/station-mini-trip.html",
    "poster": "assets/tool-posters/station-mini-trip.svg"
  },
  {
    "slug": "airport-layover-card",
    "category": "detour",
    "name": "轉機城市卡",
    "tagline": "讓轉機不只是坐在登機門前。",
    "audience": "有 4 到 10 小時轉機的人",
    "mechanic": "輸入轉機時間與保守度，產生出境可行度與安全路線。",
    "result": "轉機時間可以是一張城市試吃券。",
    "chips": [
      "轉機",
      "機場",
      "快閃城市"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "任務板",
    "interfaceTitle": "轉機城市卡操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡",
      "備案公園",
      "熱門景點",
      "排隊名店"
    ],
    "scoreSeed": 75,
    "executionPack": {
      "actions": [
        "先判斷 轉機 值不值得，不值得就切 機場。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 人潮路口 或這次最想解決的旅行條件。",
      "調整 轉機、機場 與 快閃城市 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T045",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/airport-layover-card.html",
    "poster": "assets/tool-posters/airport-layover-card.svg"
  },
  {
    "slug": "small-town-mood",
    "category": "detour",
    "name": "小鎮氛圍雷達",
    "tagline": "找出更適合你心情的小鎮。",
    "audience": "不想只去首都或大城市的人",
    "mechanic": "依安靜度、交通與氛圍，配對小鎮旅行玩法。",
    "result": "小鎮不一定無聊，它只是需要對的人。",
    "chips": [
      "小鎮",
      "慢旅",
      "氛圍"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "雷達圖",
    "interfaceTitle": "小鎮氛圍雷達操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "交通轉乘",
      "替代小巷",
      "附近咖啡",
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口"
    ],
    "scoreSeed": 76,
    "executionPack": {
      "actions": [
        "先判斷 小鎮 值不值得，不值得就切 慢旅。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 交通轉乘 或這次最想解決的旅行條件。",
      "調整 小鎮、慢旅 與 氛圍 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T046",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/small-town-mood.html",
    "poster": "assets/tool-posters/small-town-mood.svg"
  },
  {
    "slug": "shoulder-season-fit",
    "category": "detour",
    "name": "淡季適配測驗",
    "tagline": "判斷你適不適合淡季出發。",
    "audience": "想省錢但怕天氣與冷清的人",
    "mechanic": "評估天氣容忍、預算敏感與人潮厭惡，輸出淡季適合度。",
    "result": "淡季不是便宜版旺季，是另一種玩法。",
    "chips": [
      "淡季",
      "省錢",
      "天氣備案"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "清單桌面",
    "interfaceTitle": "淡季適配測驗操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "替代小巷",
      "附近咖啡",
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘"
    ],
    "scoreSeed": 77,
    "executionPack": {
      "actions": [
        "用 淡季 結果決定行程第一順位。",
        "把 省錢 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 淡季適配測驗 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 替代小巷 或這次最想解決的旅行條件。",
      "調整 淡季、省錢 與 天氣備案 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T047",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/shoulder-season-fit.html",
    "poster": "assets/tool-posters/shoulder-season-fit.svg"
  },
  {
    "slug": "no-line-food-route",
    "category": "detour",
    "name": "零排隊美食路線",
    "tagline": "避開名店長隊，吃到同樣滿足的一天。",
    "audience": "想吃好但不想等的人",
    "mechanic": "用排隊耐受與味覺主題，生成替代餐廳和錯峰時段。",
    "result": "不排隊不代表吃得隨便。",
    "chips": [
      "零排隊",
      "錯峰",
      "美食替代"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "手冊頁",
    "interfaceTitle": "零排隊美食路線操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "附近咖啡",
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷"
    ],
    "scoreSeed": 78,
    "executionPack": {
      "actions": [
        "用 零排隊 當味覺主線，不要把店名塞滿。",
        "把 錯峰 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 附近咖啡 或這次最想解決的旅行條件。",
      "調整 零排隊、錯峰 與 美食替代 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T048",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/no-line-food-route.html",
    "poster": "assets/tool-posters/no-line-food-route.svg"
  },
  {
    "slug": "hidden-morning",
    "category": "detour",
    "name": "早晨空城玩法",
    "tagline": "在城市醒來前先玩一輪。",
    "audience": "願意早起換安靜體驗的人",
    "mechanic": "依起床時間與想拍主題，排出早餐、散步與第一景點。",
    "result": "早晨是人潮最少的特權。",
    "chips": [
      "早晨",
      "空城",
      "早餐"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "早晨空城玩法操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "備案公園",
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡"
    ],
    "scoreSeed": 79,
    "executionPack": {
      "actions": [
        "先判斷 早晨 值不值得，不值得就切 空城。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 備案公園 或這次最想解決的旅行條件。",
      "調整 早晨、空城 與 早餐 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T049",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/hidden-morning.html",
    "poster": "assets/tool-posters/hidden-morning.svg"
  },
  {
    "slug": "popular-place-filter",
    "category": "detour",
    "name": "熱門景點過濾器",
    "tagline": "不是所有熱門都該進你的行程。",
    "audience": "不想被必去清單綁架的人",
    "mechanic": "用期待、交通、排隊與替代選項，決定保留或移除。",
    "result": "刪掉一個景點，可能救回一整天。",
    "chips": [
      "必去檢查",
      "刪除建議",
      "路線優化"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "時間線",
    "interfaceTitle": "熱門景點過濾器操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "熱門景點",
      "排隊名店",
      "人潮路口",
      "交通轉乘",
      "替代小巷",
      "附近咖啡",
      "備案公園"
    ],
    "scoreSeed": 80,
    "executionPack": {
      "actions": [
        "先判斷 必去檢查 值不值得，不值得就切 刪除建議。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 熱門景點 或這次最想解決的旅行條件。",
      "調整 必去檢查、刪除建議 與 路線優化 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T050",
    "categoryLabel": "避開人潮與繞路",
    "categoryTone": "把爆紅景點旁邊更舒服、更像自己的選項挖出來。",
    "primary": "#2F9E44",
    "accent": "#2F9E44",
    "deep": "#1C1915",
    "href": "tools/popular-place-filter.html",
    "poster": "assets/tool-posters/popular-place-filter.svg"
  },
  {
    "slug": "jomo-day-planner",
    "category": "wellness",
    "name": "JOMO 一日排程",
    "tagline": "為不想趕、不想打卡的人排一天。",
    "audience": "旅行中想慢下來的人",
    "mechanic": "用能量、離線需求與療癒來源，生成低壓日程。",
    "result": "錯過一些東西，才有空感覺自己在旅行。",
    "chips": [
      "JOMO",
      "低壓",
      "慢旅"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "三欄分流",
    "interfaceTitle": "JOMO 一日排程操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "咖啡恢復",
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白"
    ],
    "scoreSeed": 81,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 JOMO。",
        "把 低壓 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 咖啡恢復 或這次最想解決的旅行條件。",
      "調整 JOMO、低壓 與 慢旅 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T051",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/jomo-day-planner.html",
    "poster": "assets/tool-posters/jomo-day-planner.svg"
  },
  {
    "slug": "digital-detox-pass",
    "category": "wellness",
    "name": "離線旅行通行證",
    "tagline": "設計一段真的不需要一直滑手機的旅行。",
    "audience": "想降低螢幕時間的人",
    "mechanic": "設定離線程度，輸出下載資料、紙本備份與離線任務。",
    "result": "離線不是失聯，是把注意力還給現場。",
    "chips": [
      "離線",
      "任務卡",
      "安心備份"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "票券介面",
    "interfaceTitle": "離線旅行通行證操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復"
    ],
    "scoreSeed": 82,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 離線。",
        "把 任務卡 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 自然散步 或這次最想解決的旅行條件。",
      "調整 離線、任務卡 與 安心備份 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T052",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/digital-detox-pass.html",
    "poster": "assets/tool-posters/digital-detox-pass.svg"
  },
  {
    "slug": "forest-bath-recipe",
    "category": "wellness",
    "name": "森林浴配方",
    "tagline": "用自然、步速與停留時間做一帖恢復配方。",
    "audience": "需要自然恢復的人",
    "mechanic": "選體力與自然偏好，產生散步、停留與安靜時段。",
    "result": "森林不是景點，是恢復系統。",
    "chips": [
      "森林浴",
      "自然",
      "恢復"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "任務板",
    "interfaceTitle": "森林浴配方操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復",
      "自然散步"
    ],
    "scoreSeed": 83,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 森林浴。",
        "把 自然 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 螢幕暫停 或這次最想解決的旅行條件。",
      "調整 森林浴、自然 與 恢復 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T053",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/forest-bath-recipe.html",
    "poster": "assets/tool-posters/forest-bath-recipe.svg"
  },
  {
    "slug": "sleep-in-trip",
    "category": "wellness",
    "name": "睡到自然醒旅行",
    "tagline": "不早起也能有漂亮的一天。",
    "audience": "討厭早起但又想玩的人",
    "mechanic": "設定起床時間與活動量，重排午後到夜晚的路線。",
    "result": "睡飽的人，才有力氣喜歡一座城市。",
    "chips": [
      "晚起",
      "午後",
      "不趕"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "雷達圖",
    "interfaceTitle": "睡到自然醒旅行操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復",
      "自然散步",
      "螢幕暫停"
    ],
    "scoreSeed": 84,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 晚起。",
        "把 午後 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 泡湯或按摩 或這次最想解決的旅行條件。",
      "調整 晚起、午後 與 不趕 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T054",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/sleep-in-trip.html",
    "poster": "assets/tool-posters/sleep-in-trip.svg"
  },
  {
    "slug": "low-energy-route",
    "category": "wellness",
    "name": "低電量行程",
    "tagline": "只剩 20% 體力也能出門一下。",
    "audience": "旅行中突然累到不行的人",
    "mechanic": "選能量與交通限制，產生近距離、少轉乘、可坐下的路線。",
    "result": "低電量也可以有一個很好的下午。",
    "chips": [
      "低體力",
      "少走路",
      "補電"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "清單桌面",
    "interfaceTitle": "低電量行程操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復",
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩"
    ],
    "scoreSeed": 58,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 低體力。",
        "把 少走路 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 安靜晚餐 或這次最想解決的旅行條件。",
      "調整 低體力、少走路 與 補電 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T055",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/low-energy-route.html",
    "poster": "assets/tool-posters/low-energy-route.svg"
  },
  {
    "slug": "quiet-cafe-loop",
    "category": "wellness",
    "name": "安靜咖啡環線",
    "tagline": "用咖啡店串出可以休息的一天。",
    "audience": "咖啡與安靜空間愛好者",
    "mechanic": "選城市與安靜程度，安排咖啡、書店、散步的循環。",
    "result": "咖啡店可以是旅行的充電站。",
    "chips": [
      "咖啡",
      "安靜",
      "環線"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "手冊頁",
    "interfaceTitle": "安靜咖啡環線操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "提早回飯店",
      "早上留白",
      "咖啡恢復",
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐"
    ],
    "scoreSeed": 59,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 咖啡。",
        "把 安靜 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 提早回飯店 或這次最想解決的旅行條件。",
      "調整 咖啡、安靜 與 環線 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T056",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/quiet-cafe-loop.html",
    "poster": "assets/tool-posters/quiet-cafe-loop.svg"
  },
  {
    "slug": "healing-weather-plan",
    "category": "wellness",
    "name": "天氣療癒路線",
    "tagline": "把雨天、陰天、悶熱天變成合適玩法。",
    "audience": "旅行遇到天氣變差的人",
    "mechanic": "輸入天氣感受與體力，產生室內、半室內與療癒備案。",
    "result": "天氣不是失敗，只是換一種旅行語法。",
    "chips": [
      "雨天",
      "備案",
      "療癒"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "天氣療癒路線操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "早上留白",
      "咖啡恢復",
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店"
    ],
    "scoreSeed": 60,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 雨天。",
        "把 備案 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 早上留白 或這次最想解決的旅行條件。",
      "調整 雨天、備案 與 療癒 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T057",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/healing-weather-plan.html",
    "poster": "assets/tool-posters/healing-weather-plan.svg"
  },
  {
    "slug": "burnout-escape",
    "category": "wellness",
    "name": "倦怠逃跑計畫",
    "tagline": "為真的累了的人設計一趟小逃跑。",
    "audience": "工作倦怠、想短暫離開日常的人",
    "mechanic": "用疲憊類型與可用時間，生成低決策成本的逃跑方案。",
    "result": "你需要的不是遠方，是一個可以喘氣的安排。",
    "chips": [
      "倦怠",
      "逃跑",
      "低決策"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "時間線",
    "interfaceTitle": "倦怠逃跑計畫操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "咖啡恢復",
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白"
    ],
    "scoreSeed": 61,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 倦怠。",
        "把 逃跑 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 咖啡恢復 或這次最想解決的旅行條件。",
      "調整 倦怠、逃跑 與 低決策 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T058",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/burnout-escape.html",
    "poster": "assets/tool-posters/burnout-escape.svg"
  },
  {
    "slug": "no-posting-trip",
    "category": "wellness",
    "name": "不發限動宣言",
    "tagline": "做一張旅行中不需要證明的宣言卡。",
    "audience": "想放下社群壓力的人",
    "mechanic": "設定不發文程度與想保留的私密回憶，產生宣言與離線任務。",
    "result": "沒有發出來的旅行，也是真的旅行。",
    "chips": [
      "不發文",
      "宣言卡",
      "私密回憶"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "三欄分流",
    "interfaceTitle": "不發限動宣言操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "自然散步",
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復"
    ],
    "scoreSeed": 62,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 不發文。",
        "把 宣言卡 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 自然散步 或這次最想解決的旅行條件。",
      "調整 不發文、宣言卡 與 私密回憶 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T059",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/no-posting-trip.html",
    "poster": "assets/tool-posters/no-posting-trip.svg"
  },
  {
    "slug": "comfort-food-map",
    "category": "wellness",
    "name": "安心食物地圖",
    "tagline": "陌生城市裡找幾個讓人穩定下來的味道。",
    "audience": "出國容易吃不習慣的人",
    "mechanic": "輸入安心食物與預算，安排熟悉味道與在地嘗試的比例。",
    "result": "安心感是探索的底座。",
    "chips": [
      "安心食物",
      "比例",
      "舒適區"
    ],
    "mode": "wellnessPlan",
    "modeLabel": "低壓旅行",
    "modeVariant": "票券介面",
    "interfaceTitle": "安心食物地圖操作台",
    "actionLabel": "安排舒服的一天",
    "resultName": "能量預算表",
    "modePromise": "先保護體力，再把城市安排成能恢復心情的節奏。",
    "shareLead": "我做了一份低壓旅行能量表",
    "sampleItems": [
      "螢幕暫停",
      "泡湯或按摩",
      "安靜晚餐",
      "提早回飯店",
      "早上留白",
      "咖啡恢復",
      "自然散步"
    ],
    "scoreSeed": 63,
    "executionPack": {
      "actions": [
        "先保護能量，再安排 安心食物。",
        "把 比例 變成恢復點，不當成打卡點。",
        "用 ChillOut 補低壓交通與提早收尾方案。"
      ],
      "hooks": [
        "旅行不是把自己榨乾。",
        "今天只排一件重要的事也可以。",
        "把低電量旅行排得好看一點。"
      ],
      "qa": [
        "活動量要影響結果",
        "結果要有恢復點",
        "Prompt 要保留低壓條件"
      ]
    },
    "playSteps": [
      "輸入 螢幕暫停 或這次最想解決的旅行條件。",
      "調整 安心食物、比例 與 舒適區 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T060",
    "categoryLabel": "JOMO 與療癒旅行",
    "categoryTone": "反向對抗行程焦慮，做出低壓、舒服、可恢復能量的玩法。",
    "primary": "#00A896",
    "accent": "#00A896",
    "deep": "#1C1915",
    "href": "tools/comfort-food-map.html",
    "poster": "assets/tool-posters/comfort-food-map.svg"
  },
  {
    "slug": "booktok-passport",
    "category": "culture",
    "name": "BookTok 旅行護照",
    "tagline": "把書中的場景變成旅遊任務章。",
    "audience": "愛書、BookTok、文青旅行者",
    "mechanic": "輸入書名或氛圍，產生書店、咖啡、場景與一句摘錄任務。",
    "result": "一本書可以變成一張城市護照。",
    "chips": [
      "BookTok",
      "書店",
      "任務章"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "任務板",
    "interfaceTitle": "BookTok 旅行護照操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一間書店",
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色"
    ],
    "scoreSeed": 64,
    "executionPack": {
      "actions": [
        "把 BookTok 轉成 4 個城市任務。",
        "用 書店 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 BookTok 旅行護照 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一間書店 或這次最想解決的旅行條件。",
      "調整 BookTok、書店 與 任務章 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T061",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/booktok-passport.html",
    "poster": "assets/tool-posters/booktok-passport.svg"
  },
  {
    "slug": "movie-scene-day",
    "category": "culture",
    "name": "電影場景一日",
    "tagline": "用一部電影的感覺排一天。",
    "audience": "影迷與拍照型旅人",
    "mechanic": "輸入電影或類型，生成場景、鏡頭、晚餐與配樂。",
    "result": "你可以不是主角，但可以走進那種畫面。",
    "chips": [
      "電影感",
      "場景",
      "配樂"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "雷達圖",
    "interfaceTitle": "電影場景一日操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店"
    ],
    "scoreSeed": 65,
    "executionPack": {
      "actions": [
        "把 電影感 轉成 4 個城市任務。",
        "用 場景 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 電影場景一日 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一座博物館 或這次最想解決的旅行條件。",
      "調整 電影感、場景 與 配樂 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T062",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/movie-scene-day.html",
    "poster": "assets/tool-posters/movie-scene-day.svg"
  },
  {
    "slug": "character-day-out",
    "category": "culture",
    "name": "角色扮演旅行",
    "tagline": "用一個角色的人設排出旅行任務。",
    "audience": "喜歡動漫、遊戲、影劇角色的人",
    "mechanic": "輸入角色或人設，產生穿搭、場景、台詞與路線。",
    "result": "旅行也可以是一場輕量角色扮演。",
    "chips": [
      "角色",
      "任務",
      "穿搭"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "清單桌面",
    "interfaceTitle": "角色扮演旅行操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店",
      "一座博物館"
    ],
    "scoreSeed": 66,
    "executionPack": {
      "actions": [
        "把 角色 轉成 4 個城市任務。",
        "用 任務 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 角色扮演旅行 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一段城市傳說 或這次最想解決的旅行條件。",
      "調整 角色、任務 與 穿搭 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T063",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/character-day-out.html",
    "poster": "assets/tool-posters/character-day-out.svg"
  },
  {
    "slug": "playlist-to-trip",
    "category": "culture",
    "name": "歌單轉行程",
    "tagline": "把一張歌單翻譯成城市節奏。",
    "audience": "喜歡用音樂決定旅行心情的人",
    "mechanic": "輸入歌單關鍵字，生成上午、午後、夜晚三段氛圍路線。",
    "result": "歌單先選好，城市就有了節拍。",
    "chips": [
      "歌單",
      "節奏",
      "氛圍"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "手冊頁",
    "interfaceTitle": "歌單轉行程操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店",
      "一座博物館",
      "一段城市傳說"
    ],
    "scoreSeed": 67,
    "executionPack": {
      "actions": [
        "把 歌單 轉成 4 個城市任務。",
        "用 節奏 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 歌單轉行程 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一本書 或這次最想解決的旅行條件。",
      "調整 歌單、節奏 與 氛圍 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T064",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/playlist-to-trip.html",
    "poster": "assets/tool-posters/playlist-to-trip.svg"
  },
  {
    "slug": "bookstore-crawl",
    "category": "culture",
    "name": "書店巡禮",
    "tagline": "把書店、咖啡、散步排成一條文化線。",
    "audience": "書店控與獨旅者",
    "mechanic": "選城市、安靜程度與停留時間，產出三間書店路線。",
    "result": "書店是陌生城市裡最容易安定下來的地方。",
    "chips": [
      "書店",
      "咖啡",
      "散步"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "書店巡禮操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店",
      "一座博物館",
      "一段城市傳說",
      "一本書"
    ],
    "scoreSeed": 68,
    "executionPack": {
      "actions": [
        "把 書店 轉成 4 個城市任務。",
        "用 咖啡 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 書店巡禮 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一部電影 或這次最想解決的旅行條件。",
      "調整 書店、咖啡 與 散步 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T065",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/bookstore-crawl.html",
    "poster": "assets/tool-posters/bookstore-crawl.svg"
  },
  {
    "slug": "anime-quest-card",
    "category": "culture",
    "name": "動漫聖地任務卡",
    "tagline": "把聖地巡禮做成任務，而不是打卡清單。",
    "audience": "動漫迷、ACG 旅人",
    "mechanic": "輸入作品與沉浸程度，產生場景任務、拍照角度與禮貌提醒。",
    "result": "聖地巡禮要像任務，也要尊重現場。",
    "chips": [
      "聖地巡禮",
      "任務卡",
      "拍照角度"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "時間線",
    "interfaceTitle": "動漫聖地任務卡操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一首歌",
      "一個角色",
      "一間書店",
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影"
    ],
    "scoreSeed": 69,
    "executionPack": {
      "actions": [
        "把 聖地巡禮 轉成 4 個城市任務。",
        "用 任務卡 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 動漫聖地任務卡 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一首歌 或這次最想解決的旅行條件。",
      "調整 聖地巡禮、任務卡 與 拍照角度 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T066",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/anime-quest-card.html",
    "poster": "assets/tool-posters/anime-quest-card.svg"
  },
  {
    "slug": "romance-filter-trip",
    "category": "culture",
    "name": "浪漫濾鏡旅行",
    "tagline": "把一座城市調成你想要的浪漫感。",
    "audience": "情侶、約會、紀念日旅行",
    "mechanic": "選浪漫濃度與預算，生成散步、餐廳、夜景與回憶卡。",
    "result": "浪漫不是景點，是每段距離的安排。",
    "chips": [
      "浪漫",
      "約會",
      "回憶卡"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "三欄分流",
    "interfaceTitle": "浪漫濾鏡旅行操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "一個角色",
      "一間書店",
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌"
    ],
    "scoreSeed": 70,
    "executionPack": {
      "actions": [
        "先判斷 浪漫 值不值得，不值得就切 約會。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 一個角色 或這次最想解決的旅行條件。",
      "調整 浪漫、約會 與 回憶卡 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T067",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/romance-filter-trip.html",
    "poster": "assets/tool-posters/romance-filter-trip.svg"
  },
  {
    "slug": "museum-mood-match",
    "category": "culture",
    "name": "博物館心情配對",
    "tagline": "今天的心情適合哪一種展覽。",
    "audience": "喜歡展覽但不想亂逛的人",
    "mechanic": "依心情、耐心與主題，推薦展覽類型與前後行程。",
    "result": "看展也需要配對，不是只看熱門。",
    "chips": [
      "展覽",
      "博物館",
      "心情"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "票券介面",
    "interfaceTitle": "博物館心情配對操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一間書店",
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色"
    ],
    "scoreSeed": 71,
    "executionPack": {
      "actions": [
        "把 展覽 轉成 4 個城市任務。",
        "用 博物館 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 博物館心情配對 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一間書店 或這次最想解決的旅行條件。",
      "調整 展覽、博物館 與 心情 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T068",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/museum-mood-match.html",
    "poster": "assets/tool-posters/museum-mood-match.svg"
  },
  {
    "slug": "local-sports-starter",
    "category": "culture",
    "name": "在地球賽入門",
    "tagline": "第一次看海外球賽也不尷尬。",
    "audience": "想體驗在地運動文化的人",
    "mechanic": "選運動、城市與社交程度，生成購票、周邊與賽後路線。",
    "result": "球賽是最快進入一座城市情緒的方法。",
    "chips": [
      "球賽",
      "在地文化",
      "賽後"
    ],
    "mode": "cultureMission",
    "modeLabel": "故事任務",
    "modeVariant": "任務板",
    "interfaceTitle": "在地球賽入門操作台",
    "actionLabel": "生成文化任務",
    "resultName": "城市任務卡",
    "modePromise": "把書、電影、角色或音樂靈感轉成可走、可拍、可分享的任務。",
    "shareLead": "我把一個文化靈感變成旅行任務",
    "sampleItems": [
      "一座博物館",
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店"
    ],
    "scoreSeed": 72,
    "executionPack": {
      "actions": [
        "把 球賽 轉成 4 個城市任務。",
        "用 在地文化 決定開場鏡頭。",
        "把任務卡丟進 ChillOut 補場景與移動順序。"
      ],
      "hooks": [
        "把一個作品變成一趟旅行。",
        "這不是打卡，是城市任務。",
        "用 在地球賽入門 做一張自己的旅行護照。"
      ],
      "qa": [
        "要輸出任務",
        "要有可帶走的紀念物",
        "Prompt 要包含作品與沉浸程度"
      ]
    },
    "playSteps": [
      "輸入 一座博物館 或這次最想解決的旅行條件。",
      "調整 球賽、在地文化 與 賽後 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T069",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/local-sports-starter.html",
    "poster": "assets/tool-posters/local-sports-starter.svg"
  },
  {
    "slug": "festival-fit-check",
    "category": "culture",
    "name": "節慶旅行適配器",
    "tagline": "判斷一個節慶是否真的適合你去。",
    "audience": "想追節慶但怕人潮與成本的人",
    "mechanic": "輸入節慶、人潮忍受與預算，產生適配分數與替代玩法。",
    "result": "節慶很美，但適不適合你要另外判斷。",
    "chips": [
      "節慶",
      "適配",
      "人潮"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "雷達圖",
    "interfaceTitle": "節慶旅行適配器操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "一段城市傳說",
      "一本書",
      "一部電影",
      "一首歌",
      "一個角色",
      "一間書店",
      "一座博物館"
    ],
    "scoreSeed": 73,
    "executionPack": {
      "actions": [
        "先判斷 節慶 值不值得，不值得就切 適配。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 一段城市傳說 或這次最想解決的旅行條件。",
      "調整 節慶、適配 與 人潮 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T070",
    "categoryLabel": "故事、影視與文化",
    "categoryTone": "把書、電影、動漫、歌單與地方文化變成可拍、可走、可分享的路線。",
    "primary": "#D65DB1",
    "accent": "#D65DB1",
    "deep": "#1C1915",
    "href": "tools/festival-fit-check.html",
    "poster": "assets/tool-posters/festival-fit-check.svg"
  },
  {
    "slug": "coffee-crawl-builder",
    "category": "food",
    "name": "咖啡廳巡航器",
    "tagline": "把三間咖啡廳排成不膩的一天。",
    "audience": "咖啡控、遠端工作者、城市散步者",
    "mechanic": "輸入咖啡偏好與排隊耐受，安排第一杯、甜點杯、收尾杯。",
    "result": "咖啡路線需要節奏，不是越多越好。",
    "chips": [
      "咖啡",
      "巡航",
      "甜點"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "清單桌面",
    "interfaceTitle": "咖啡廳巡航器操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "第一杯咖啡",
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮"
    ],
    "scoreSeed": 74,
    "executionPack": {
      "actions": [
        "用 咖啡 當味覺主線，不要把店名塞滿。",
        "把 巡航 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 第一杯咖啡 或這次最想解決的旅行條件。",
      "調整 咖啡、巡航 與 甜點 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T071",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/coffee-crawl-builder.html",
    "poster": "assets/tool-posters/coffee-crawl-builder.svg"
  },
  {
    "slug": "breakfast-personality",
    "category": "food",
    "name": "早餐人格",
    "tagline": "從早餐選擇看出今天該怎麼玩。",
    "audience": "喜歡早餐與早晨城市的人",
    "mechanic": "選早餐類型、起床時間與預算，生成上午行程。",
    "result": "早餐決定你和城市的第一句話。",
    "chips": [
      "早餐",
      "上午",
      "人格"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "手冊頁",
    "interfaceTitle": "早餐人格操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡"
    ],
    "scoreSeed": 75,
    "executionPack": {
      "actions": [
        "用 早餐 結果決定行程第一順位。",
        "把 上午 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 早餐人格 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 市場小吃 或這次最想解決的旅行條件。",
      "調整 早餐、上午 與 人格 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T072",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/breakfast-personality.html",
    "poster": "assets/tool-posters/breakfast-personality.svg"
  },
  {
    "slug": "dessert-walk-balance",
    "category": "food",
    "name": "甜點步行平衡",
    "tagline": "用步行距離合理化每一份甜點。",
    "audience": "甜點愛好者與城市散步者",
    "mechanic": "設定甜點濃度與走路意願，安排吃與走的節奏。",
    "result": "甜點和散步，本來就是一組。",
    "chips": [
      "甜點",
      "步行",
      "平衡"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "甜點步行平衡操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡",
      "市場小吃"
    ],
    "scoreSeed": 76,
    "executionPack": {
      "actions": [
        "用 甜點 當味覺主線，不要把店名塞滿。",
        "把 步行 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 排隊名店 或這次最想解決的旅行條件。",
      "調整 甜點、步行 與 平衡 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T073",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/dessert-walk-balance.html",
    "poster": "assets/tool-posters/dessert-walk-balance.svg"
  },
  {
    "slug": "market-menu-decoder",
    "category": "food",
    "name": "市場點餐翻譯卡",
    "tagline": "進市場前先知道怎麼點比較不慌。",
    "audience": "喜歡市場但怕語言與選擇障礙的人",
    "mechanic": "輸入市場與忌口，生成點餐句、必吃順序與備選。",
    "result": "市場的第一關不是食物，是開口點餐。",
    "chips": [
      "市場",
      "點餐",
      "翻譯卡"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "時間線",
    "interfaceTitle": "市場點餐翻譯卡操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡",
      "市場小吃",
      "排隊名店"
    ],
    "scoreSeed": 77,
    "executionPack": {
      "actions": [
        "用 市場 當味覺主線，不要把店名塞滿。",
        "把 點餐 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 甜點散步 或這次最想解決的旅行條件。",
      "調整 市場、點餐 與 翻譯卡 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T074",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/market-menu-decoder.html",
    "poster": "assets/tool-posters/market-menu-decoder.svg"
  },
  {
    "slug": "queue-worth-it",
    "category": "food",
    "name": "排隊值得嗎",
    "tagline": "用等待時間判斷名店要不要排。",
    "audience": "面對排隊餐廳猶豫的人",
    "mechanic": "輸入等待時間、飢餓度與替代選項，產生排隊決策。",
    "result": "不是名店都值得排，也不是排隊都浪費。",
    "chips": [
      "排隊",
      "決策",
      "替代餐廳"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "三欄分流",
    "interfaceTitle": "排隊值得嗎操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡",
      "市場小吃",
      "排隊名店",
      "甜點散步"
    ],
    "scoreSeed": 78,
    "executionPack": {
      "actions": [
        "先判斷 排隊 值不值得，不值得就切 決策。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 晚餐主菜 或這次最想解決的旅行條件。",
      "調整 排隊、決策 與 替代餐廳 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T075",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/queue-worth-it.html",
    "poster": "assets/tool-posters/queue-worth-it.svg"
  },
  {
    "slug": "hotel-restaurant-detour",
    "category": "food",
    "name": "飯店餐廳繞路值",
    "tagline": "判斷為了一餐多繞路值不值得。",
    "audience": "想把餐廳排進動線的人",
    "mechanic": "用餐廳期待、交通成本與行程密度，算出繞路值。",
    "result": "為了好吃繞路可以，但要知道代價。",
    "chips": [
      "繞路值",
      "餐廳",
      "交通"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "票券介面",
    "interfaceTitle": "飯店餐廳繞路值操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡",
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜"
    ],
    "scoreSeed": 79,
    "executionPack": {
      "actions": [
        "先判斷 繞路值 值不值得，不值得就切 餐廳。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 宵夜備案 或這次最想解決的旅行條件。",
      "調整 繞路值、餐廳 與 交通 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T076",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/hotel-restaurant-detour.html",
    "poster": "assets/tool-posters/hotel-restaurant-detour.svg"
  },
  {
    "slug": "food-budget-split",
    "category": "food",
    "name": "美食預算切割",
    "tagline": "決定哪一餐該花錢，哪一餐該省。",
    "audience": "想吃好但預算有限的人",
    "mechanic": "設定單日預算與重點餐，輸出早餐、午餐、晚餐、零食分配。",
    "result": "美食預算不是平均分，是投資重點。",
    "chips": [
      "預算",
      "餐別",
      "分配"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "任務板",
    "interfaceTitle": "美食預算切割操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "伴手禮",
      "第一杯咖啡",
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案"
    ],
    "scoreSeed": 80,
    "executionPack": {
      "actions": [
        "用 預算 當味覺主線，不要把店名塞滿。",
        "把 餐別 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 伴手禮 或這次最想解決的旅行條件。",
      "調整 預算、餐別 與 分配 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T077",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/food-budget-split.html",
    "poster": "assets/tool-posters/food-budget-split.svg"
  },
  {
    "slug": "spicy-tolerance-map",
    "category": "food",
    "name": "辣度路線",
    "tagline": "用辣度承受力安排一整天吃法。",
    "audience": "去泰國、韓國、四川等地怕太辣的人",
    "mechanic": "輸入辣度能力與想挑戰程度，安排安全到冒險的順序。",
    "result": "辣也要循序漸進。",
    "chips": [
      "辣度",
      "挑戰",
      "安全"
    ],
    "mode": "foodRoute",
    "modeLabel": "美食路線",
    "modeVariant": "雷達圖",
    "interfaceTitle": "辣度路線操作台",
    "actionLabel": "排出吃喝節奏",
    "resultName": "味覺路線卡",
    "modePromise": "把想吃、排隊耐受與預算排成一整天不膩的吃法。",
    "shareLead": "我排了一張旅行味覺路線",
    "sampleItems": [
      "第一杯咖啡",
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮"
    ],
    "scoreSeed": 81,
    "executionPack": {
      "actions": [
        "用 辣度 當味覺主線，不要把店名塞滿。",
        "把 挑戰 安排在體力最好時段。",
        "把美食節奏丟進 ChillOut 補步行與雨備。"
      ],
      "hooks": [
        "先決定今天要怎麼吃，再排路線。",
        "不要讓排隊毀掉一整天。",
        "這是一張吃得下、走得動的美食路線。"
      ],
      "qa": [
        "結果要有時段",
        "排隊與預算會改變文案",
        "Prompt 要包含口味與預算"
      ]
    },
    "playSteps": [
      "輸入 第一杯咖啡 或這次最想解決的旅行條件。",
      "調整 辣度、挑戰 與 安全 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T078",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/spicy-tolerance-map.html",
    "poster": "assets/tool-posters/spicy-tolerance-map.svg"
  },
  {
    "slug": "midnight-snack-map",
    "category": "food",
    "name": "宵夜地圖",
    "tagline": "晚餐後真正想吃的那一站。",
    "audience": "夜貓與宵夜愛好者",
    "mechanic": "選城市、時間與味覺，產生宵夜、安全回程與散步距離。",
    "result": "宵夜是夜晚的第二個目的地。",
    "chips": [
      "宵夜",
      "回程",
      "夜晚"
    ],
    "mode": "nightRoute",
    "modeLabel": "夜遊路線",
    "modeVariant": "清單桌面",
    "interfaceTitle": "宵夜地圖操作台",
    "actionLabel": "排出夜晚節奏",
    "resultName": "夜晚節奏表",
    "modePromise": "把晚上安全、交通與氣氛排成不硬撐的三段式夜遊。",
    "shareLead": "我排了一條不踩雷的夜遊路線",
    "sampleItems": [
      "市場小吃",
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡"
    ],
    "scoreSeed": 82,
    "executionPack": {
      "actions": [
        "把 宵夜 排在晚間主段，不連續硬塞。",
        "先決定安全返程，再決定宵夜。",
        "把夜晚路線丟進 ChillOut 補交通與備案。"
      ],
      "hooks": [
        "夜遊不是熬夜，是有節奏地走。",
        "這條路線先保命，再浪漫。",
        "把城市晚上排成三段，不會玩到崩。"
      ],
      "qa": [
        "要輸出 3 個以上時段",
        "要有安全收尾",
        "Prompt 要包含城市與時段"
      ]
    },
    "playSteps": [
      "輸入 市場小吃 或這次最想解決的旅行條件。",
      "調整 宵夜、回程 與 夜晚 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T079",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/midnight-snack-map.html",
    "poster": "assets/tool-posters/midnight-snack-map.svg"
  },
  {
    "slug": "taste-memory-card",
    "category": "food",
    "name": "味覺回憶卡",
    "tagline": "把一餐變成旅行後可以分享的故事。",
    "audience": "想把美食內容化的人",
    "mechanic": "輸入最難忘的一口，生成標題、描述與下一站靈感。",
    "result": "記住一座城市，常常是從一口味道開始。",
    "chips": [
      "味覺",
      "回憶",
      "分享文"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "手冊頁",
    "interfaceTitle": "味覺回憶卡操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "排隊名店",
      "甜點散步",
      "晚餐主菜",
      "宵夜備案",
      "伴手禮",
      "第一杯咖啡",
      "市場小吃"
    ],
    "scoreSeed": 83,
    "executionPack": {
      "actions": [
        "把 味覺 變成回憶標題。",
        "用 回憶 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 排隊名店 或這次最想解決的旅行條件。",
      "調整 味覺、回憶 與 分享文 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T080",
    "categoryLabel": "美食與咖啡路線",
    "categoryTone": "用吃喝作為旅行主線，排出不只是餐廳清單的移動節奏。",
    "primary": "#F77F00",
    "accent": "#F77F00",
    "deep": "#1C1915",
    "href": "tools/taste-memory-card.html",
    "poster": "assets/tool-posters/taste-memory-card.svg"
  },
  {
    "slug": "twenty-four-hour-escape",
    "category": "micro",
    "name": "24 小時逃跑",
    "tagline": "只有一天也能離開日常。",
    "audience": "週末很短但想出門的人",
    "mechanic": "選可用時間、交通與預算，生成 24 小時快閃計畫。",
    "result": "一天不長，但足夠換一個心情。",
    "chips": [
      "24 小時",
      "快閃",
      "短假"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "24 小時逃跑操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "請假一天",
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑"
    ],
    "scoreSeed": 84,
    "executionPack": {
      "actions": [
        "把 24 小時 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 24 小時逃跑 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 請假一天 或這次最想解決的旅行條件。",
      "調整 24 小時、快閃 與 短假 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T081",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/twenty-four-hour-escape.html",
    "poster": "assets/tool-posters/twenty-four-hour-escape.svg"
  },
  {
    "slug": "leave-day-multiplier",
    "category": "micro",
    "name": "請假倍率計算機",
    "tagline": "用最少請假天數換最多旅行時間。",
    "audience": "上班族與學生族群",
    "mechanic": "輸入假期窗口與預算，產生請假策略與行程密度。",
    "result": "請假的藝術，是把一天變成三天的感覺。",
    "chips": [
      "請假",
      "連假",
      "效率"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "時間線",
    "interfaceTitle": "請假倍率計算機操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天"
    ],
    "scoreSeed": 58,
    "executionPack": {
      "actions": [
        "把 請假 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 請假倍率計算機 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 單包出發 或這次最想解決的旅行條件。",
      "調整 請假、連假 與 效率 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T082",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/leave-day-multiplier.html",
    "poster": "assets/tool-posters/leave-day-multiplier.svg"
  },
  {
    "slug": "tiny-budget-trip",
    "category": "micro",
    "name": "小預算旅行",
    "tagline": "把低預算變成玩法限制，不是失敗條件。",
    "audience": "想省錢但仍想出門的人",
    "mechanic": "設定預算與交通，產出免費景點、便宜餐與可加碼選項。",
    "result": "預算小，也可以很有設計感。",
    "chips": [
      "小預算",
      "免費",
      "加碼"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "三欄分流",
    "interfaceTitle": "小預算旅行操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天",
      "單包出發"
    ],
    "scoreSeed": 59,
    "executionPack": {
      "actions": [
        "把 小預算 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 小預算旅行 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 雨天備案 或這次最想解決的旅行條件。",
      "調整 小預算、免費 與 加碼 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T083",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/tiny-budget-trip.html",
    "poster": "assets/tool-posters/tiny-budget-trip.svg"
  },
  {
    "slug": "one-bag-challenge",
    "category": "micro",
    "name": "一包出發挑戰",
    "tagline": "只帶一個包也能完成一趟短旅。",
    "audience": "輕裝旅行與即興出發的人",
    "mechanic": "選時間與目的地氣候，生成必帶、可不帶、現地買清單。",
    "result": "少帶一點，出發阻力就少很多。",
    "chips": [
      "輕裝",
      "打包",
      "即興"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "票券介面",
    "interfaceTitle": "一包出發挑戰操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天",
      "單包出發",
      "雨天備案"
    ],
    "scoreSeed": 60,
    "executionPack": {
      "actions": [
        "把 輕裝 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 一包出發挑戰 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 車站周邊 或這次最想解決的旅行條件。",
      "調整 輕裝、打包 與 即興 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T084",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/one-bag-challenge.html",
    "poster": "assets/tool-posters/one-bag-challenge.svg"
  },
  {
    "slug": "weather-switcher",
    "category": "micro",
    "name": "天氣切換器",
    "tagline": "天氣變了，行程不用整個重排。",
    "audience": "行前遇到天氣突變的人",
    "mechanic": "選雨、熱、冷或陰天，生成相同氛圍的室內替代。",
    "result": "真正好的行程可以切換，不會崩掉。",
    "chips": [
      "天氣",
      "切換",
      "備案"
    ],
    "mode": "decision",
    "modeLabel": "值得去判斷",
    "modeVariant": "任務板",
    "interfaceTitle": "天氣切換器操作台",
    "actionLabel": "算出取捨建議",
    "resultName": "去留決策卡",
    "modePromise": "把人潮、時間與期待值算成去、改、跳過三種決策。",
    "shareLead": "我用工具判斷這個旅遊選項值不值得",
    "sampleItems": [
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天",
      "單包出發",
      "雨天備案",
      "車站周邊"
    ],
    "scoreSeed": 61,
    "executionPack": {
      "actions": [
        "先判斷 天氣 值不值得，不值得就切 切換。",
        "把人潮與移動成本轉成 go / change / skip。",
        "把替代玩法丟進 ChillOut 找附近低壓路線。"
      ],
      "hooks": [
        "不是所有爆紅都值得排。",
        "花 30 秒省掉半天踩雷。",
        "這個點到底去不去，先用工具算一次。"
      ],
      "qa": [
        "結果要有去/改/跳過",
        "替代方案不可空白",
        "Prompt 要能生成備案"
      ]
    },
    "playSteps": [
      "輸入 三小時空檔 或這次最想解決的旅行條件。",
      "調整 天氣、切換 與 備案 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T085",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/weather-switcher.html",
    "poster": "assets/tool-posters/weather-switcher.svg"
  },
  {
    "slug": "spontaneous-spinner",
    "category": "micro",
    "name": "即興目的地輪盤",
    "tagline": "不知道去哪，就讓條件幫你抽。",
    "audience": "想出去但懶得決定的人",
    "mechanic": "設定時間、交通、預算，抽出一個符合限制的玩法。",
    "result": "即興不是亂選，是把限制變成遊戲。",
    "chips": [
      "輪盤",
      "即興",
      "抽籤"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "雷達圖",
    "interfaceTitle": "即興目的地輪盤操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "半天快閃",
      "24 小時逃跑",
      "請假一天",
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔"
    ],
    "scoreSeed": 62,
    "executionPack": {
      "actions": [
        "把 輪盤 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 即興目的地輪盤 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 半天快閃 或這次最想解決的旅行條件。",
      "調整 輪盤、即興 與 抽籤 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T086",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/spontaneous-spinner.html",
    "poster": "assets/tool-posters/spontaneous-spinner.svg"
  },
  {
    "slug": "train-window-trip",
    "category": "micro",
    "name": "車窗小旅行",
    "tagline": "用一段火車路線安排沿線停靠。",
    "audience": "喜歡鐵道、窗景與小城的人",
    "mechanic": "選可用時間與交通，產生沿線兩站停靠與窗景任務。",
    "result": "火車不是交通，是慢慢進入旅行的方法。",
    "chips": [
      "火車",
      "窗景",
      "沿線"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "清單桌面",
    "interfaceTitle": "車窗小旅行操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "24 小時逃跑",
      "請假一天",
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃"
    ],
    "scoreSeed": 63,
    "executionPack": {
      "actions": [
        "把 火車 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 車窗小旅行 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 24 小時逃跑 或這次最想解決的旅行條件。",
      "調整 火車、窗景 與 沿線 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T087",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/train-window-trip.html",
    "poster": "assets/tool-posters/train-window-trip.svg"
  },
  {
    "slug": "three-hour-city",
    "category": "micro",
    "name": "三小時城市",
    "tagline": "只有三小時，也能有完整的城市切片。",
    "audience": "等人、轉車、出差空檔的人",
    "mechanic": "輸入地點與三小時窗口，安排一餐、一走、一休息。",
    "result": "三小時不夠玩城市，但夠記住一個切面。",
    "chips": [
      "三小時",
      "城市切片",
      "空檔"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "手冊頁",
    "interfaceTitle": "三小時城市操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "請假一天",
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑"
    ],
    "scoreSeed": 64,
    "executionPack": {
      "actions": [
        "把 三小時 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 三小時城市 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 請假一天 或這次最想解決的旅行條件。",
      "調整 三小時、城市切片 與 空檔 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T088",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/three-hour-city.html",
    "poster": "assets/tool-posters/three-hour-city.svg"
  },
  {
    "slug": "little-treat-route",
    "category": "micro",
    "name": "小確幸路線",
    "tagline": "為自己安排一條小小但有效的快樂路線。",
    "audience": "想用一點時間恢復心情的人",
    "mechanic": "選時間、預算與心情，產生咖啡、甜點、散步或小店路線。",
    "result": "不是每趟旅行都要很大，小確幸也能有路線。",
    "chips": [
      "小確幸",
      "短線",
      "快樂"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "小確幸路線操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "單包出發",
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天"
    ],
    "scoreSeed": 65,
    "executionPack": {
      "actions": [
        "把 小確幸 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 小確幸路線 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 單包出發 或這次最想解決的旅行條件。",
      "調整 小確幸、短線 與 快樂 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T089",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/little-treat-route.html",
    "poster": "assets/tool-posters/little-treat-route.svg"
  },
  {
    "slug": "return-home-buffer",
    "category": "micro",
    "name": "回家緩衝排程",
    "tagline": "旅程最後一天不要直接崩回現實。",
    "audience": "旅行結束後容易累壞的人",
    "mechanic": "設定返家時間與疲勞度，安排最後一餐、整理與緩衝。",
    "result": "好的旅行，應該連回家都被照顧到。",
    "chips": [
      "返程",
      "緩衝",
      "最後一天"
    ],
    "mode": "microPlanner",
    "modeLabel": "短逃計畫",
    "modeVariant": "時間線",
    "interfaceTitle": "回家緩衝排程操作台",
    "actionLabel": "生成快閃方案",
    "resultName": "短逃行程卡",
    "modePromise": "把少量時間、預算與交通限制變成真的能出門的方案。",
    "shareLead": "我做了一張短時間也能出發的旅行卡",
    "sampleItems": [
      "雨天備案",
      "車站周邊",
      "三小時空檔",
      "半天快閃",
      "24 小時逃跑",
      "請假一天",
      "單包出發"
    ],
    "scoreSeed": 66,
    "executionPack": {
      "actions": [
        "把 返程 壓成一趟真的能出門的短逃。",
        "先鎖交通，再決定主要體驗。",
        "把短逃卡丟進 ChillOut 補完整半日或一日路線。"
      ],
      "hooks": [
        "只有三小時也可以是一趟旅行。",
        "短逃不是亂跑，是限制設計。",
        "用 回家緩衝排程 幫今天留一個出口。"
      ],
      "qa": [
        "時間窗會影響結果",
        "結果要有出發入口",
        "Prompt 要包含交通與預算"
      ]
    },
    "playSteps": [
      "輸入 雨天備案 或這次最想解決的旅行條件。",
      "調整 返程、緩衝 與 最後一天 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T090",
    "categoryLabel": "短假與即興旅行",
    "categoryTone": "把一天、三小時、小預算或臨時請假變成真的可以出門的方案。",
    "primary": "#118AB2",
    "accent": "#118AB2",
    "deep": "#1C1915",
    "href": "tools/return-home-buffer.html",
    "poster": "assets/tool-posters/return-home-buffer.svg"
  },
  {
    "slug": "trip-cover-maker",
    "category": "memory",
    "name": "旅行封面產生器",
    "tagline": "替這趟旅行做一張像專輯封面的卡。",
    "audience": "想分享漂亮回憶的人",
    "mechanic": "輸入一幕記憶、格式與情緒濃度，生成封面標題與視覺方向。",
    "result": "每趟旅行都值得有一張封面。",
    "chips": [
      "封面",
      "回憶錄",
      "分享"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "三欄分流",
    "interfaceTitle": "旅行封面產生器操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方"
    ],
    "scoreSeed": 67,
    "executionPack": {
      "actions": [
        "把 封面 變成回憶標題。",
        "用 回憶錄 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 買回家的小物 或這次最想解決的旅行條件。",
      "調整 封面、回憶錄 與 分享 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T091",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/trip-cover-maker.html",
    "poster": "assets/tool-posters/trip-cover-maker.svg"
  },
  {
    "slug": "photo-dump-director",
    "category": "memory",
    "name": "Photo Dump 導演",
    "tagline": "幫一堆照片排出有節奏的分享順序。",
    "audience": "旅行後照片很多但不知道怎麼發的人",
    "mechanic": "輸入主題與情緒，生成開場、轉折、食物、人物、收尾順序。",
    "result": "Photo dump 也需要導演。",
    "chips": [
      "照片排序",
      "IG",
      "導演"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "票券介面",
    "interfaceTitle": "Photo Dump 導演操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物"
    ],
    "scoreSeed": 68,
    "executionPack": {
      "actions": [
        "把 照片排序 變成回憶標題。",
        "用 IG 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 最喜歡的一張照片 或這次最想解決的旅行條件。",
      "調整 照片排序、IG 與 導演 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T092",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/photo-dump-director.html",
    "poster": "assets/tool-posters/photo-dump-director.svg"
  },
  {
    "slug": "trip-wrapped-card",
    "category": "memory",
    "name": "旅行 Wrapped",
    "tagline": "把一趟旅行整理成年終回顧式卡片。",
    "audience": "喜歡 Spotify Wrapped 式內容的人",
    "mechanic": "輸入最想留下的一幕，生成數據感回顧與下一趟線索。",
    "result": "回憶如果有數據，就更容易被分享。",
    "chips": [
      "Wrapped",
      "數據卡",
      "回顧"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "任務板",
    "interfaceTitle": "旅行 Wrapped操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片"
    ],
    "scoreSeed": 69,
    "executionPack": {
      "actions": [
        "把 Wrapped 變成回憶標題。",
        "用 數據卡 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 旅伴一句話 或這次最想解決的旅行條件。",
      "調整 Wrapped、數據卡 與 回顧 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T093",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/trip-wrapped-card.html",
    "poster": "assets/tool-posters/trip-wrapped-card.svg"
  },
  {
    "slug": "souvenir-persona",
    "category": "memory",
    "name": "伴手禮人格",
    "tagline": "你買的伴手禮透露你的旅行偏好。",
    "audience": "喜歡買禮物、送朋友的人",
    "mechanic": "選伴手禮類型與對象，生成伴手禮人格與下次推薦。",
    "result": "伴手禮其實是你的旅行簽名。",
    "chips": [
      "伴手禮",
      "人格",
      "送禮"
    ],
    "mode": "quiz",
    "modeLabel": "人格測驗",
    "modeVariant": "雷達圖",
    "interfaceTitle": "伴手禮人格操作台",
    "actionLabel": "測出我的旅行角色",
    "resultName": "旅行人格卡",
    "modePromise": "用幾個選擇題產生可分享的人格結果與第一版行程方向。",
    "shareLead": "我剛測出自己的旅行人格",
    "sampleItems": [
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話"
    ],
    "scoreSeed": 70,
    "executionPack": {
      "actions": [
        "用 伴手禮 結果決定行程第一順位。",
        "把 人格 與社交能量轉成每日密度。",
        "把人格結果丟進 ChillOut 生成角色式行程。"
      ],
      "hooks": [
        "我的 伴手禮人格 結果居然是這個。",
        "你不是難搞，你只是旅行設定很明確。",
        "把你的結果貼出來，看誰最適合一起旅行。"
      ],
      "qa": [
        "每個選項會改變分數",
        "結果要有角色名稱",
        "Prompt 要保留人格條件"
      ]
    },
    "playSteps": [
      "輸入 難忘的一餐 或這次最想解決的旅行條件。",
      "調整 伴手禮、人格 與 送禮 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T094",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/souvenir-persona.html",
    "poster": "assets/tool-posters/souvenir-persona.svg"
  },
  {
    "slug": "future-postcard",
    "category": "memory",
    "name": "未來明信片",
    "tagline": "寫一張寄給下一趟自己的明信片。",
    "audience": "喜歡情緒、文字與慢旅行的人",
    "mechanic": "輸入這趟最想記住的畫面，生成未來明信片文案。",
    "result": "最好的紀念品，是提醒自己還會再出發。",
    "chips": [
      "明信片",
      "未來",
      "文字"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "清單桌面",
    "interfaceTitle": "未來明信片操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐"
    ],
    "scoreSeed": 71,
    "executionPack": {
      "actions": [
        "把 明信片 變成回憶標題。",
        "用 未來 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 一段路上的聲音 或這次最想解決的旅行條件。",
      "調整 明信片、未來 與 文字 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T095",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/future-postcard.html",
    "poster": "assets/tool-posters/future-postcard.svg"
  },
  {
    "slug": "memory-title-lab",
    "category": "memory",
    "name": "回憶錄標題室",
    "tagline": "替旅行手冊取一個真的想點開的標題。",
    "audience": "ChillOut 回憶錄使用者與內容創作者",
    "mechanic": "輸入旅程畫面與情緒，生成 12 個標題、短句與 hashtag。",
    "result": "標題不是裝飾，它決定回憶被不被打開。",
    "chips": [
      "標題",
      "回憶錄",
      "hashtag"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "手冊頁",
    "interfaceTitle": "回憶錄標題室操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音"
    ],
    "scoreSeed": 72,
    "executionPack": {
      "actions": [
        "把 標題 變成回憶標題。",
        "用 回憶錄 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 飯店窗景 或這次最想解決的旅行條件。",
      "調整 標題、回憶錄 與 hashtag 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T096",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/memory-title-lab.html",
    "poster": "assets/tool-posters/memory-title-lab.svg"
  },
  {
    "slug": "achievement-badges",
    "category": "memory",
    "name": "旅行成就徽章",
    "tagline": "把旅行中的小事變成徽章。",
    "audience": "喜歡遊戲化與分享成就的人",
    "mechanic": "選完成事件，生成第一次、意外、勇敢、放空等徽章。",
    "result": "旅行裡的小事，也可以有成就感。",
    "chips": [
      "徽章",
      "遊戲化",
      "分享"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "極簡卡片",
    "interfaceTitle": "旅行成就徽章操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景"
    ],
    "scoreSeed": 73,
    "executionPack": {
      "actions": [
        "把 徽章 變成回憶標題。",
        "用 遊戲化 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 下次想再去的地方 或這次最想解決的旅行條件。",
      "調整 徽章、遊戲化 與 分享 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T097",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/achievement-badges.html",
    "poster": "assets/tool-posters/achievement-badges.svg"
  },
  {
    "slug": "gratitude-card",
    "category": "memory",
    "name": "旅行感謝卡",
    "tagline": "替旅伴、店家或一座城市寫感謝卡。",
    "audience": "想把旅行後情緒整理出來的人",
    "mechanic": "輸入想感謝的人事物，生成一張可分享的感謝卡。",
    "result": "感謝會讓旅行的尾巴更長。",
    "chips": [
      "感謝卡",
      "旅伴",
      "城市"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "時間線",
    "interfaceTitle": "旅行感謝卡操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "買回家的小物",
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方"
    ],
    "scoreSeed": 74,
    "executionPack": {
      "actions": [
        "把 感謝卡 變成回憶標題。",
        "用 旅伴 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 買回家的小物 或這次最想解決的旅行條件。",
      "調整 感謝卡、旅伴 與 城市 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T098",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/gratitude-card.html",
    "poster": "assets/tool-posters/gratitude-card.svg"
  },
  {
    "slug": "next-trip-oracle",
    "category": "memory",
    "name": "下一趟旅行預言",
    "tagline": "從這趟的回憶推測你的下一站。",
    "audience": "旅行後馬上想再出發的人",
    "mechanic": "用最難忘的一幕與下一趟線索，產生三個目的地預言。",
    "result": "下一趟旅行常常藏在這趟最喜歡的瞬間裡。",
    "chips": [
      "下一站",
      "預言",
      "推薦"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "三欄分流",
    "interfaceTitle": "下一趟旅行預言操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "最喜歡的一張照片",
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物"
    ],
    "scoreSeed": 75,
    "executionPack": {
      "actions": [
        "把 下一站 變成回憶標題。",
        "用 預言 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 最喜歡的一張照片 或這次最想解決的旅行條件。",
      "調整 下一站、預言 與 推薦 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T099",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/next-trip-oracle.html",
    "poster": "assets/tool-posters/next-trip-oracle.svg"
  },
  {
    "slug": "one-photo-next-trip",
    "category": "memory",
    "name": "一張照片下一站",
    "tagline": "用一張照片的情緒推一個下一趟方向。",
    "audience": "想從照片找靈感的人",
    "mechanic": "描述一張照片，工具會判斷情緒、景色與下一站方向。",
    "result": "一張照片不只記錄過去，也會暴露你接下來想去哪。",
    "chips": [
      "照片",
      "下一站",
      "情緒"
    ],
    "mode": "memoryMaker",
    "modeLabel": "回憶生成器",
    "modeVariant": "票券介面",
    "interfaceTitle": "一張照片下一站操作台",
    "actionLabel": "做出回憶素材",
    "resultName": "回憶分享卡",
    "modePromise": "把照片、片段或情緒整理成標題、文案與下一趟線索。",
    "shareLead": "我把這趟旅行整理成一張回憶卡",
    "sampleItems": [
      "旅伴一句話",
      "難忘的一餐",
      "一段路上的聲音",
      "飯店窗景",
      "下次想再去的地方",
      "買回家的小物",
      "最喜歡的一張照片"
    ],
    "scoreSeed": 76,
    "executionPack": {
      "actions": [
        "把 照片 變成回憶標題。",
        "用 下一站 決定分享格式。",
        "把回憶素材丟進 ChillOut 生成回憶錄或下一趟靈感。"
      ],
      "hooks": [
        "回憶不是照片很多，是有一個好標題。",
        "把旅行收尾做成可以分享的卡。",
        "這張卡會暴露你下一趟想去哪。"
      ],
      "qa": [
        "要輸出標題",
        "要有分享格式",
        "Prompt 要包含情緒與下一趟線索"
      ]
    },
    "playSteps": [
      "輸入 旅伴一句話 或這次最想解決的旅行條件。",
      "調整 照片、下一站 與 情緒 的優先順序。",
      "複製結果卡，丟進 ChillOut 生成完整行程或回憶錄。"
    ],
    "id": "T100",
    "categoryLabel": "回憶、分享與內容化",
    "categoryTone": "把旅行後的照片、標題、回憶與下一趟靈感變成可傳播的內容。",
    "primary": "#845EC2",
    "accent": "#845EC2",
    "deep": "#1C1915",
    "href": "tools/one-photo-next-trip.html",
    "poster": "assets/tool-posters/one-photo-next-trip.svg"
  }
];

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
      return `<button type="button" class="${active}" data-category="${category}">${category}</button>`;
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
    grid.innerHTML = list.map((tool) => `
      <a class="tool-tile" href="${tool.href}" style="--tile-primary:${tool.primary};--tile-accent:${tool.accent};--tile-deep:${tool.deep}">
        <img src="${tool.poster}" alt="${tool.name} 視覺">
        <span>${tool.id} · ${tool.categoryLabel}</span>
        <h2>${tool.name}</h2>
        <p>${tool.tagline}</p>
        <div>${tool.chips.slice(0, 3).map((chip) => `<small>${chip}</small>`).join("")}</div>
        <strong>開啟工具</strong>
      </a>
    `).join("");
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
