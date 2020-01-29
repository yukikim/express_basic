# Node Express 基本構築

node.js のExpressモジュールを使ってウェブアプリを構築します。

Expressの基本を学びます

#### POSTリクエストコマンド
    curl -X POST -H "Content-Type: application/json" -d '{"name":"kimura", "gender":"male"}' localhost:3000
---
## 練習として
Ps'Cube APIからデータを抽出してGETリクエストでJSONを返すAPIを構築する

Ps'Cube API

    https://www.pscube.jp/dedamajyoho-P-townDMMpachi/c739201/cgi-bin/nc-m03-001.php?cd_ps=1&bai=0&YMD_biz=&page=1

#### 追加モジュール
**superaget**  
非同期でAPIへリクエストして値を取得するモジュール

    npm install superagent --save

https://github.com/visionmedia/superagent


