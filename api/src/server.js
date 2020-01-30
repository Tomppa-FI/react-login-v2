import Express from "express";
import mongoose from "mongoose"
import https from "https";
import fs from "fs";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
const HOST = JSON.parse(fs.readFileSync("./config/config.json")).host;
const PORT = JSON.parse(fs.readFileSync("./config/config.json")).port;
const SALT = JSON.parse(fs.readFileSync("./config/config.json")).salt;
const cert = fs.readFileSync("./ssl/cert.pem");
const key = fs.readFileSync("./ssl/key.pem");
const app = Express();

const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const serverOpts = {
    key: key,
    cert: cert,
}

app.use(Express.json());

const mongoClient = mongoose.connect("mongodb://localhost:27017/reactlobby", mongoOpts);

app.get("/api/user", (req, res) => {
    const param = req.query.q;
    if (!param) {
        res.status(400).json({error: "Missing query parameter"});
    } else {
        User.findOne({username: param}, (err, doc) => {
            if (err) {
                throw err;
            } else {
                if (doc) {
                    return res.status(409).json({isTaken: true, error: "Username is already taken."})
                } else {
                    return res.status(200).json({isTaken: false})
                }
            }
        })
    }
})

app.post("/api/user", (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        hash: bcrypt.hashSync(req.body.hash, SALT)
    }, (err, doc) => {
        if (err) {
            res.status(422).json({success: false, error: err}) //For troubleshooting. Remove in post.
        } else {
            if (doc) {
                res.status(200).json({success: true})
            }
        }
    })
})


https.createServer(serverOpts, app).listen(PORT, HOST, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on ${HOST}:${PORT}`);
    }
})