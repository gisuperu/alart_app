// index_node.js - node.jsのみを使ったサーバデモコード
// 引用元: https://qiita.com/c3drive/items/7f057823a9a5545a8dc0


var http = require('http');      // httpサーバなどを扱う

var server = http.createServer(function(req, res) {
    res.write('Hello World');
    res.end();
});
server.listen(1234);
console.log('サーバを起動しました');