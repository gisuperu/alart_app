const express = require("express");
const fs = require("fs");

const app = express();
const port = 80;

const dataFile = `${__dirname}/data/post.log`;

app.use(express.json());

app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : ${dataFile}`);
})

app.post("/", (req, res) => {
    console.log(req);
    // console.log(req.title);
    console.log(req.body);

    try {
        fs.appendFileSync(dataFile, JSON.stringify(req.body) + '\n');
        res.send(JSON.stringify(req.body));
    } catch (err) {
        console.log(err);
        res.send(false);
    }
})

app.use("/", express.static(`${__dirname}/public`));