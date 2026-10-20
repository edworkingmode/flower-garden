# 小紅花花園：設定步驟（約 10 分鐘，全免費）

## A. 建資料庫（Supabase）
1. 打開 https://supabase.com，按 Sign in，選「Continue with GitHub」。
2. New project：名稱隨意（例如 flower-garden），設一組資料庫密碼（自己記著），地區選 Northeast Asia (Tokyo) 或 Singapore。
3. 專案建好後，左邊選 SQL Editor，貼上 setup.sql 的全部內容，按 Run。
4. 左邊 Project Settings > API，複製 Project URL 和 anon public key。
5. 打開 config.js，貼進 SUPABASE_URL 與 SUPABASE_ANON_KEY，並把 HIS_PIN 改成你的密語。

## B. 放上網（GitHub Pages）
1. GitHub 新增一個 repository（Public 才能免費用 Pages），例如 flower-garden。
2. 把 index.html 與 config.js 上傳（Add file > Upload files）。不要上傳 setup.sql、README.md 也可以不傳。
3. Settings > Pages > Source 選 Deploy from a branch，Branch 選 main、/(root)，Save。
4. 約一分鐘後得到網址 https://你的帳號.github.io/flower-garden/ 。把網址傳給她，兩人加到手機主畫面。

## 使用
- 她：第一次選「我是她」；吃完飯按對應那一餐。
- 你：第一次選「我是他」，輸入密語；在「等你確認」按確認。

## 注意
- anon key 與密語會出現在公開的 config.js。密語只是防止她誤按，不是真正的安全機制；網址不要公開貼出去。
- Supabase 免費專案閒置一週會暫停，打開 Supabase 後台按 Restore 即可恢復。

## 圖片來源
- App 圖示（icon-192.png、icon-512.png、apple-touch-icon.png）：@chubbystudio_ 畫的布丁狗同人圖，布丁狗為三麗鷗（Sanrio）角色。僅供兩人自用，圖片權利屬原創作者與版權方。
- 玻璃球背景影片（bg.mp4）與紅花素材（flowers.png）：背景影片由使用者提供，紅花素材取自該影片畫面並改色。
