const express = require("express");
const fs = require("fs");
const multer = require("multer");
//const bodyParser = require("body-parser");


const app = express();
const upload = multer({dest: "files/"});
const port = 80;

const dataFile = `${__dirname}/data/post.log`;

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : ${dataFile}`);
    fs.appendFileSync(dataFile, "--- server up ---\n");
})

app.post("/", upload.single("file"), (req, res) => {
    console.log(req);
    // console.log(req.title);
    console.log(req.body);
    console.log(req.file);

    try {
        fs.appendFileSync(dataFile, JSON.stringify(req.body) + '\n');
        res.send(JSON.stringify(req.body));
    } catch (err) {
        console.log(err);
        res.send(false);
    }
})

app.use("/", express.static(`${__dirname}/public`));