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

app.get("/api/users/username", (req, res) => {
    const param = req.query.q;
    if (!param) {
        return res.status(400).json({error: "Missing query parameter"});
    } else {
        User.findOne({username: param}, (err, doc) => {
            if (err) {
                return res.json({error: err});
            } else {
                if (doc) {
                    return res.status(409).json()
                } else {
                    return res.status(200).json()
                }
            }
        })
    }
})

app.post("/api/users", (req, res) => {
    try {
        User.findOne({username : req.body.username}, (err, doc) => {
            if (err) {
                throw err;
            }
            if (doc) {
                return res.status(409).json({error: "Username already taken."});
            } else {
                User.create({
                    username: req.body.username,
                    hash: bcrypt.hashSync(req.body.hash, SALT)
                }, (err, doc) => {
                    if (err) {
                        throw err;
                    } else {
                        return res.status(200).json();
                    }
                })
            }
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
})


https.createServer(serverOpts, app).listen(PORT, HOST, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on ${HOST}:${PORT}`);
    }
})