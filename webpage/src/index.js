// index.js - alart-appのメインコード
// 引用元 : https://developer.mozilla.org/ja/docs/Learn/Server-side/Express_Nodejs/Introduction

const express = require("express");
const app = express();
const port = 1234;

app.get("/", function (req, res) {
  res.send("Hello World! by EXPRESS!!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});