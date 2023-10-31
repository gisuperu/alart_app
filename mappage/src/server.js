const express = require("express");

const app = express();
const port = 5678;

// app.use(express.json());

// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
});

// app.get('/', (req, res)  => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.use('/', express.static("public"));

// Not Foundページの作成?
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    return res.render("error", {
        status: err.status,
    });
});

// app.use(function (err, req, res, next) {
//     if (err.code === "EBADCSRFTOKEN") {
//         res.status(403);
//     } else {
//         res.status(err.status || 500);
//     }
 
//     return res.render("error", {
//         message: err.message,
//         status: err.status || 500,
//     });
// });