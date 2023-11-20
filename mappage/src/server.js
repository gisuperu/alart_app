const express = require("express");
const fs = require("fs")

const app = express();
const port = 5678;

// const databaseFile = __dirname + "/public/database/user.json";
const databaseFile =`${__dirname}/database/user.json`;

app.use(express.json());


// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : ${databaseFile}`);
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register");
})

app.post("/visualizer", (req, res) =>  {
    res.sendFile(__dirname + "/public/visulizer");
})

/* 
req.body format
{
    method : "POST",
    body : JSON.stringify(any),
    headers: {
        "Content-Type": "application/json"
    }
}
*/
app.post("/database" , (req, res) => {
    // console.log(`Datafile directory : ${databaseFile}`);
    console.log(req.body);
    
    try {
        fs.writeFileSync(databaseFile, JSON.stringify(req.body));
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
})

// app.get('/', (req, res)  => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.use('/', express.static(__dirname + "/public"));

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