# ChillOut Marketing Dashboard

這是一個可直接部署的靜態 HTML 行銷營運工作台，不需要後端，也不需要 build。

## 這一版是可操作工作台

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

這個 repo 已設定 GitHub Actions：

- PR：執行靜態網站驗證。
- push 到 `main`：先驗證，再部署到 Vercel production。
- 手動執行：可在 GitHub Actions 頁面用 `workflow_dispatch` 重新部署。

部署需要在 GitHub repository secrets 設定：

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
