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

let bd = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/dN9TlCp9T9c:APA91bGkderBQ7-FKh3dJ06jGC-J1A9qdeHl3XqeWRM-MNCN_wWhNKhY3DF9NmQtEpYeKGmtVz-QTfz7qKb6eWN_cdqHNb7apQh2vQKrW3tT1UApOmfskCnY2rnpW2UmktEl5LCdwnUF',
    expirationTime: null,
    keys: {
        p256dh: 'BHouB8XJ3Y_H8QfIfTdEVYlm2V6eCJGf_AS7ZBwwG02XNkuVvruMFjMD7jKIoTeklVevlSsPeHumtyQy3wdSv5c',
    auth: 'xqimnS9DUtA1l6JqnUNP0g'
    }
};

app.use(compression());
app.use(express.json());

// 公開鍵を応答するアクション
app.get('/key', (req, res) => {
//   res.status(200).send(vapidKeys.publicKey);
  res.status(200).send("BJjjphMxb1XY1ZIrMJKXC6y_2XHgZQp5N0_wY2AuwKIekgqnqjjCbS8c7--dFpaeBiQCPsrnCjIX0Zi7T0hcNG8");
    // BJjjphMxb1XY1ZIrMJKXC6y_2XHgZQp5N0_wY2AuwKIekgqnqjjCbS8c7--dFpaeBiQCPsrnCjIX0Zi7T0hcNG8

})

// POST を受けたら、5秒後に Push 通知を送信するアクション
app.post('/webpushtest', (req, res) => {
    console.log(req.body);
// alart-web       | {
// alart-web       |   endpoint: 'https://fcm.googleapis.com/fcm/send/dN9TlCp9T9c:APA91bGkderBQ7-FKh3dJ06jGC-J1A9qdeHl3XqeWRM-MNCN_wWhNKhY3DF9NmQtEpYeKGmtVz-QTfz7qKb6eWN_cdqHNb7apQh2vQKrW3tT1UApOmfskCnY2rnpW2UmktEl5LCdwnUF',
// alart-web       |   expirationTime: null,
// alart-web       |   keys: {
// alart-web       |     p256dh: 'BHouB8XJ3Y_H8QfIfTdEVYlm2V6eCJGf_AS7ZBwwG02XNkuVvruMFjMD7jKIoTeklVevlSsPeHumtyQy3wdSv5c',
// alart-web       |     auth: 'xqimnS9DUtA1l6JqnUNP0g'
// alart-web       |   }
// alart-web       | }
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

app.get('/webpushsignal', (req, res) => {
    try {

        async _ => await webPush.sendNotification(bd, JSON.stringify({
            title: 'Web Push通知テスト',
        }));
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