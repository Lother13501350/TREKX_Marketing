const STORAGE_KEY = "chillout_marketing_ops_v2";

const statusOptions = ["待辦", "待聯絡", "已聯絡", "進行中", "待審核", "已排程", "已發布", "觀察中", "放大", "修改", "停止", "完成"];
const channelOptions = ["IG", "TikTok", "Threads", "Dcard", "小紅書", "YouTube Shorts", "SEO", "ASO", "Meta Ads", "Apple Search Ads", "KOL", "合作", "LINE OA", "PR", "其他"];

const schemas = {
  kpis: [
    { key: "metric", label: "指標", type: "text", wide: true },
    { key: "target", label: "目標", type: "number" },
    { key: "actual", label: "實際", type: "number" },
    { key: "owner", label: "Owner", type: "text" },
    { key: "notes", label: "備註", type: "textarea", wide: true }
  ],
  campaigns: [
    { key: "campaign", label: "Campaign ID", type: "text", wide: true },
    { key: "channel", label: "渠道", type: "select", options: channelOptions },
    { key: "owner", label: "Owner", type: "text" },
    { key: "status", label: "狀態", type: "select", options: statusOptions },
    { key: "budget", label: "預算", type: "number" },
    { key: "impressions", label: "曝光", type: "number" },
    { key: "clicks", label: "點擊", type: "number" },
    { key: "downloads", label: "下載", type: "number" },
    { key: "activated", label: "生成/啟用", type: "number" },
    { key: "next", label: "下一步", type: "textarea", wide: true }
  ],
  experiments: [
    { key: "name", label: "實驗", type: "text", wide: true },
    { key: "hypothesis", label: "假設", type: "textarea", wide: true },
    { key: "channel", label: "渠道", type: "select", options: channelOptions },
    { key: "ice", label: "ICE", type: "number" },
    { key: "owner", label: "Owner", type: "text" },
    { key: "status", label: "狀態", type: "select", options: statusOptions },
    { key: "decision", label: "決策", type: "select", options: ["未決", "放大", "修改", "停止"] }
  ],
  content: [
    { key: "date", label: "日期", type: "date" },
    { key: "platform", label: "平台", type: "select", options: channelOptions },
    { key: "topic", label: "主題/腳本", type: "text", wide: true },
    { key: "asset", label: "素材連結/檔名", type: "text", wide: true },
    { key: "campaign", label: "Campaign ID", type: "text", wide: true },
    { key: "owner", label: "Owner", type: "text" },
    { key: "status", label: "狀態", type: "select", options: statusOptions },
    { key: "impressions", label: "曝光", type: "number" },
    { key: "clicks", label: "點擊", type: "number" },
    { key: "activated", label: "生成/啟用", type: "number" },
    { key: "notes", label: "備註", type: "textarea", wide: true }
  ],
  assets: [
    { key: "item", label: "素材/資產", type: "text", wide: true },
    { key: "type", label: "類型", type: "select", options: ["App 截圖", "短影音", "Landing", "SEO", "PR", "廣告", "KOL Brief", "合作提案", "產品 Spec", "其他"] },
    { key: "owner", label: "Owner", type: "text" },
    { key: "status", label: "狀態", type: "select", options: statusOptions },
    { key: "due", label: "期限", type: "date" },
    { key: "link", label: "連結/位置", type: "text", wide: true }
  ],
  partners: [
    { key: "name", label: "對象", type: "text", wide: true },
    { key: "type", label: "類型", type: "select", options: ["KOL", "旅行社", "青旅", "咖啡廳", "eSIM", "語言學校", "媒體", "導遊", "其他"] },
    { key: "owner", label: "Owner", type: "text" },
    { key: "status", label: "狀態", type: "select", options: ["待聯絡", "已聯絡", "有回覆", "試點中", "已發布", "暫停", "完成"] },
    { key: "next", label: "下一步", type: "textarea", wide: true },
    { key: "result", label: "成效/回饋", type: "textarea", wide: true }
  ]
};

function defaultState() {
  return {
    meta: {
      weekStart: "",
      growthOwner: "",
      weeklyGoal: "",
      stage: "setup",
      scaleDecision: "",
      modifyDecision: "",
      stopDecision: ""
    },
    kpis: [
      { id: uid(), metric: "曝光", target: "", actual: "", owner: "", notes: "平台後台 / App Store impressions" },
      { id: uid(), metric: "點擊", target: "", actual: "", owner: "", notes: "campaign link / App Store click" },
      { id: uid(), metric: "下載", target: "", actual: "", owner: "", notes: "只看趨勢，不作最終判斷" },
      { id: uid(), metric: "註冊", target: "", actual: "", owner: "", notes: "signup_complete" },
      { id: uid(), metric: "貼連結", target: "", actual: "", owner: "", notes: "ig_link_pasted" },
      { id: uid(), metric: "生成行程", target: "", actual: "", owner: "", notes: "itinerary_generated，北極星前置指標" },
      { id: uid(), metric: "分享", target: "", actual: "", owner: "", notes: "public_link_shared" }
    ],
    campaigns: [
      blank("campaigns", { campaign: "請填 campaign id", channel: "IG", status: "待辦" }),
      blank("campaigns", { campaign: "請填 campaign id", channel: "SEO", status: "待辦" }),
      blank("campaigns", { campaign: "請填 campaign id", channel: "KOL", status: "待聯絡" })
    ],
    experiments: [
      blank("experiments", { name: "App Store 第一屏改版", channel: "ASO", hypothesis: "如果第一屏主打 IG 靈感轉行程，下載後生成率會提升。", status: "待辦", decision: "未決" }),
      blank("experiments", { name: "5 支短影音 demo", channel: "TikTok", hypothesis: "如果前 3 秒直接演出收藏混亂，會提高收藏與點擊。", status: "待辦", decision: "未決" })
    ],
    content: [
      blank("content", { platform: "IG", topic: "IG 收藏救援 Demo", status: "待辦" }),
      blank("content", { platform: "TikTok", topic: "3 分鐘排行程", status: "待辦" }),
      blank("content", { platform: "Threads", topic: "留言目的地幫排一版", status: "待辦" })
    ],
    assets: [
      blank("assets", { item: "App Store 前 3 張截圖", type: "App 截圖", status: "待辦" }),
      blank("assets", { item: "東京/首爾/台南 Demo 螢幕錄影", type: "短影音", status: "待辦" }),
      blank("assets", { item: "Landing page 上線稿", type: "Landing", status: "待辦" })
    ],
    partners: [
      blank("partners", { name: "請填 KOL / 合作方名稱", type: "KOL", status: "待聯絡" }),
      blank("partners", { name: "請填旅行社 / 店家名稱", type: "旅行社", status: "待聯絡" })
    ]
  };
}

let state = loadState();

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

function blank(section, patch = {}) {
  const row = { id: uid() };
  (schemas[section] || []).forEach(col => row[col.key] = "");
  return { ...row, ...patch };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return mergeState(defaultState(), JSON.parse(raw));
  } catch (error) {
    console.warn("Failed to load workspace", error);
  }
  return defaultState();
}

function mergeState(base, saved) {
  return { ...base, ...saved, meta: { ...base.meta, ...(saved.meta || {}) } };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function pct(a, b) {
  if (!b) return "0%";
  return `${Math.round((a / b) * 1000) / 10}%`;
}

function getKpiActual(name) {
  const row = state.kpis.find(k => k.metric === name);
  return number(row?.actual);
}

function setByPath(path, value) {
  const parts = path.split(".");
  let obj = state;
  for (let i = 0; i < parts.length - 1; i += 1) obj = obj[parts[i]];
  obj[parts[parts.length - 1]] = value;
  saveState();
  renderDynamic();
}

function bindMetaFields() {
  document.querySelectorAll("[data-field]").forEach(input => {
    const path = input.dataset.field;
    const value = path.split(".").reduce((obj, key) => obj?.[key], state) ?? "";
    input.value = value;
    input.addEventListener("input", () => setByPath(path, input.value));
    input.addEventListener("change", () => setByPath(path, input.value));
  });
}

function renderDynamic() {
  renderKpiSummary();
  renderFunnel();
  document.querySelectorAll("[data-table]").forEach(container => {
    renderTable(container.dataset.table, container, Number(container.dataset.limit || 0));
  });
}

function renderKpiSummary() {
  const box = document.querySelector("[data-kpi-summary]");
  if (!box) return;
  const impressions = getKpiActual("曝光");
  const clicks = getKpiActual("點擊");
  const downloads = getKpiActual("下載");
  const generated = getKpiActual("生成行程");
  const shares = getKpiActual("分享");
  const spend = state.campaigns.reduce((sum, row) => sum + number(row.budget), 0);
  const cards = [
    ["曝光", impressions, "由 KPI 工作表填入"],
    ["點擊率", pct(clicks, impressions), "點擊 / 曝光"],
    ["下載", downloads, "App Store Connect"],
    ["Activated", generated, "生成行程"],
    ["CP Activated", generated ? `NT$${Math.round(spend / generated)}` : "待資料", "預算 / 生成行程"]
  ];
  box.innerHTML = cards.map(([label, value, note]) => `
    <section class="metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(note)}</small>
    </section>
  `).join("");
}

function renderFunnel() {
  const box = document.querySelector("[data-funnel-summary]");
  if (!box) return;
  const rows = [
    ["曝光", getKpiActual("曝光"), "內容與 ASO 是否被看見"],
    ["點擊", getKpiActual("點擊"), `CTR ${pct(getKpiActual("點擊"), getKpiActual("曝光"))}`],
    ["下載", getKpiActual("下載"), `Click -> Download ${pct(getKpiActual("下載"), getKpiActual("點擊"))}`],
    ["註冊", getKpiActual("註冊"), `Download -> Signup ${pct(getKpiActual("註冊"), getKpiActual("下載"))}`],
    ["貼連結", getKpiActual("貼連結"), `Signup -> Paste ${pct(getKpiActual("貼連結"), getKpiActual("註冊"))}`],
    ["生成行程", getKpiActual("生成行程"), `Paste -> Generated ${pct(getKpiActual("生成行程"), getKpiActual("貼連結"))}`],
    ["分享", getKpiActual("分享"), `Generated -> Share ${pct(getKpiActual("分享"), getKpiActual("生成行程"))}`]
  ];
  box.innerHTML = rows.map(([label, value, note]) => `
    <div class="funnel-step">
      <strong>${escapeHtml(label)}：${escapeHtml(value)}</strong>
      <span>${escapeHtml(note)}</span>
      <small>${value ? "已填資料" : "等待行銷組填入"}</small>
    </div>
  `).join("");
}

function renderTable(section, container, limit = 0) {
  const schema = schemas[section];
  if (!schema) return;
  const rows = limit ? state[section].slice(0, limit) : state[section];
  const more = limit && state[section].length > limit ? `<p class="muted">只顯示前 ${limit} 筆；完整排程請到內容排程頁。</p>` : "";
  container.innerHTML = `
    <div class="table-tools">
      <input data-ops-table-search="${section}" placeholder="搜尋這張表...">
      <button class="btn ghost small" data-export-csv="${section}">匯出 CSV</button>
    </div>
    <div class="table-wrap">
      <table class="ops-table">
        <thead>
          <tr>${schema.map(col => `<th>${escapeHtml(col.label)}</th>`).join("")}<th>操作</th></tr>
        </thead>
        <tbody>
          ${rows.map(row => renderRow(section, schema, row)).join("")}
        </tbody>
      </table>
    </div>
    ${more}
  `;
}

function renderRow(section, schema, row) {
  return `<tr data-row="${row.id}">${schema.map(col => `<td class="${col.wide ? "wide-cell" : ""}">${renderInput(section, row, col)}</td>`).join("")}<td><button class="icon-btn" data-delete-row="${section}:${row.id}" title="刪除">刪除</button></td></tr>`;
}

function renderInput(section, row, col) {
  const value = row[col.key] ?? "";
  const base = `data-edit="${section}:${row.id}:${col.key}"`;
  if (col.type === "select") {
    const options = (col.options || []).map(opt => `<option value="${escapeHtml(opt)}" ${opt === value ? "selected" : ""}>${escapeHtml(opt)}</option>`).join("");
    return `<select ${base}>${options}</select>`;
  }
  if (col.type === "textarea") {
    return `<textarea ${base} placeholder="${escapeHtml(col.label)}">${escapeHtml(value)}</textarea>`;
  }
  return `<input ${base} type="${col.type || "text"}" value="${escapeHtml(value)}" placeholder="${escapeHtml(col.label)}">`;
}

function updateCell(token, value) {
  const [section, id, key] = token.split(":");
  const row = state[section]?.find(item => item.id === id);
  if (!row) return;
  row[key] = value;
  saveState();
  renderKpiSummary();
  renderFunnel();
}

function addRow(section) {
  state[section].push(blank(section));
  saveState();
  renderDynamic();
}

function deleteRow(section, id) {
  state[section] = state[section].filter(row => row.id !== id);
  saveState();
  renderDynamic();
}

function exportCsv(section) {
  const schema = schemas[section];
  const headers = schema.map(col => col.label);
  const rows = state[section].map(row => schema.map(col => row[col.key] ?? ""));
  const csv = [headers, ...rows].map(cols => cols.map(csvEscape).join(",")).join("\n");
  download(`${section}.csv`, "\ufeff" + csv, "text/csv;charset=utf-8");
}

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportJson() {
  download(`chillout-marketing-workspace-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(state, null, 2), "application/json");
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = mergeState(defaultState(), JSON.parse(reader.result));
      saveState();
      bindMetaFields();
      renderDynamic();
      alert("匯入完成");
    } catch (error) {
      alert("JSON 格式不正確，請確認檔案。");
    }
  };
  reader.readAsText(file);
}

function resetWorkspace() {
  if (!confirm("確定要重置工作台？目前在這個瀏覽器內填的資料會被清掉。")) return;
  state = defaultState();
  saveState();
  bindMetaFields();
  renderDynamic();
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function bindOpsEvents() {
  document.addEventListener("input", event => {
    const token = event.target?.dataset?.edit;
    if (token) updateCell(token, event.target.value);
  });
  document.addEventListener("change", event => {
    const token = event.target?.dataset?.edit;
    if (token) updateCell(token, event.target.value);
    if (event.target?.dataset?.importJson !== undefined) importJson(event.target.files?.[0]);
  });
  document.addEventListener("click", event => {
    const add = event.target?.dataset?.addRow;
    if (add) addRow(add);
    const del = event.target?.dataset?.deleteRow;
    if (del) {
      const [section, id] = del.split(":");
      deleteRow(section, id);
    }
    const csv = event.target?.dataset?.exportCsv;
    if (csv) exportCsv(csv);
    if (event.target?.dataset?.exportJson !== undefined) exportJson();
    if (event.target?.dataset?.resetWorkspace !== undefined) resetWorkspace();
  });
  document.addEventListener("input", event => {
    const section = event.target?.dataset?.opsTableSearch;
    if (!section) return;
    const q = norm(event.target.value);
    const table = event.target.closest(".panel")?.querySelector("table");
    table?.querySelectorAll("tbody tr").forEach(row => {
      row.style.display = norm(row.textContent).includes(q) ? "" : "none";
    });
  });
}

function norm(s) {
  return (s || "").toString().toLowerCase();
}

function bindExistingSearch() {
  document.querySelectorAll("[data-card-search]").forEach(input => {
    input.addEventListener("input", () => {
      const q = norm(input.value);
      document.querySelectorAll(".asset-link").forEach(el => {
        el.style.display = norm(el.textContent).includes(q) ? "" : "none";
      });
    });
  });

  document.querySelectorAll("[data-plan-search]").forEach(input => {
    input.addEventListener("input", () => {
      filterPlans();
    });
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterPlans();
    });
  });

  document.querySelectorAll("[data-table-search]").forEach(input => {
    const table = input.closest(".panel, .doc-card, body").querySelector("table");
    input.addEventListener("input", () => {
      const q = norm(input.value);
      table?.querySelectorAll("tbody tr").forEach(row => {
        row.style.display = norm(row.textContent).includes(q) ? "" : "none";
      });
    });
  });
}

function filterPlans() {
  const q = norm(document.querySelector("[data-plan-search]")?.value || "");
  const filter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  document.querySelectorAll(".plan-card").forEach(el => {
    const matchText = norm(el.textContent).includes(q);
    const matchFilter = filter === "all" || el.dataset.category === filter;
    el.style.display = matchText && matchFilter ? "" : "none";
  });
}

bindExistingSearch();
if (document.querySelector("[data-ops-page]")) {
  bindMetaFields();
  renderDynamic();
  bindOpsEvents();
}
