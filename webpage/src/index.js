// index.js - alart-appのメインコード


// 引用元 : https://developer.mozilla.org/ja/docs/Learn/Server-side/Express_Nodejs/Introduction

// const express = require("express");
// const app = express();
// const port = 1234;

// app.get("/", function (req, res) {
//   res.send("Hello World! by EXPRESS!!");
// });

// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}!`);
// });

// =====================================
// 引用元 : https://white-azalea.hatenablog.jp/entry/2023/03/23/220319

const compression = require('compression');
const express = require('express');
const webPush = require('web-push');

const app = express();
const port = 1234;

// サーバ起動時に、秘密鍵と公開鍵を作成
const vapidKeys = webPush.generateVAPIDKeys();

// Push 通知機能を初期化
webPush.setVapidDetails(
    'mailto:xxxxxxx@xxxxx.example',  // メール形式でどうぞ
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.use(compression());
app.use(express.json());

// 公開鍵を応答するアクション
app.get('/key', (req, res) => {
  res.status(200).send(vapidKeys.publicKey);
})

// POST を受けたら、5秒後に Push 通知を送信するアクション
app.post('/webpushtest', (req, res) => {
    console.log(req.body);
    try {
        setTimeout(async _ => { // ちょっと遅延させて通知
            await webPush.sendNotification(req.body, JSON.stringify({
                title: 'Web Push通知テスト',
            }));
        }, 5000);
        res.json({ success: true });
    } catch (err) {
        console.log(err);
    }
})

// 上記URLでヒットしないなら、public の中を表示する
app.use('/', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});