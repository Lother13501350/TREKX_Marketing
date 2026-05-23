# ChillOut Marketing Dashboard

這是一個可直接部署的靜態 HTML 專案，不需要後端，也不需要 build。首頁是對外導下載 landing page，內部行銷營運工作台在 `/ops.html`。

## 對外下載入口

Production URL：

```text
https://chillout-marketing-dashboard.vercel.app
```

首頁主 CTA 會導到 App Store：

```text
https://apps.apple.com/tw/app/chillout/id6760571567
```

`launch-kit.html` 內有第一波 IG、Threads、Dcard、LINE、KOL 與短影音素材。

## 這一版保留可操作工作台

- KPI、Campaign、實驗、內容排程、素材、合作 pipeline 都可以在頁面上新增、刪除、編輯。
- 變更會保存在使用者自己的瀏覽器 `localStorage`。
- 右上角可以匯出 JSON 備份整個工作台，再用匯入 JSON 還原。
- 各表格也可以匯出 CSV，方便行銷週會或交給其他工具。

注意：目前是靜態網站，不同同事的瀏覽器資料不會自動同步。正式多人共用時，建議每週由 Growth Owner 匯出 JSON 版本留存，或下一階段接 Google Sheets / Firebase / Supabase。

## 本機預覽

```bash
npm run preview
```

打開：

```text
http://localhost:4173
```

## CI/CD

這個 repo 已設定兩段式 CI/CD：

- PR：執行靜態網站驗證。
- push 到 `main`：GitHub Actions 先驗證，Vercel Git Integration 再自動部署 production。
- 手動驗證：可在 GitHub Actions 頁面用 `workflow_dispatch` 重新跑 CI。

目前 production URL：

```text
https://chillout-marketing-dashboard.vercel.app
```

目前不需要把 Vercel token 放進 GitHub Secrets，因為 Vercel project 已直接連接 GitHub repository。若未來要改成 GitHub Actions 控制部署，再設定以下 secrets：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

取得方式：

```bash
npx vercel login
npx vercel link
npx vercel env pull .env.local
```

或在 Vercel Dashboard 的 Project Settings 查詢 project/team 資訊，並到 Account Settings 建立 token。

## Vercel 手動部署

若本機已登入 Vercel：

```bash
npx vercel deploy --prod --yes
```

如果是第一次部署，CLI 會要求選擇 scope、project name、root directory。這個網站的 root directory 就是 repository root。

## 上線後檢查

- 首頁是否能打開。
- 左側導覽是否能切換。
- 首頁是否能新增 KPI / Campaign / 內容排程。
- 填入 KPI 實際數字後，上方 summary 與漏斗是否更新。
- `匯出 JSON` 是否能下載檔案。
- `資料庫` 搜尋是否有效。
- `100 份計畫` 篩選是否有效。
- `內容排程` 是否可以新增與編輯，不是固定死表。
- `數據規格` 是否能看到事件埋點與 ASO 關鍵字。

## GitHub Pages / Netlify

這份專案仍然可以部署到 GitHub Pages 或 Netlify。Vercel 是目前主要 production 目標；`netlify.toml` 和 `.nojekyll` 保留作為備援部署設定。
