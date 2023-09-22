# alart_app
通知システムのサーバ

## WebPushのdemo作成

> 参考資料 : ServiceWorker について(2) : https://white-azalea.hatenablog.jp/entry/2023/03/23/220319

基本的に参考資料のコピペする

### 階層構造(/webpage/src/)
- public/
    - js/
        - vapid_demo.js (初期化など諸々)
    - index.html (画面)
    - sw.js (サービスワーカー)
- index.js (エントリポイント)

package.json
```
{
    "name": "alart-app",
    "version": "1.0.0",
    "description": "Node.js on Docker",
    "main": "./src/index.js",
    "scripts": {
      "start": "node ./src/server.js"
    },
    "dependencies": {
      "express": "4.18.2",
      "conpression": "1.7.4",
      "web-push": "3.6.6"
    }
}
```

### 実行方法
コード(index.js)の都合でコンテナ内に入ったのちにnodeコマンドで実行する必要がある
```
❯ docker-compose exec alart-app sh
/app # ls
node_modules       package-lock.json  package.json       src
/app # cd src/
/app/src # node index.js
```

### 実行結果
Google ChromeでするとWebPush通知許可を求めるバナーが出て，
ボタンを押すと5秒後に通知が発生した．

SafariでするとWebPushの通知許可を求めるバナーがそもそもでなくて，
通知が発生していない．

(パソコンの設定の問題だが，集中モードだと通知が表示されなかったりするから，通知が来ていないように錯覚するから注意)

### 今後の課題
ソースコードを読んでいないからその解読及び応用を考察．
