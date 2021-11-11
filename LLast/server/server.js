"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFuwa_last = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var MyFuwa_last;
(function (MyFuwa_last) {
    let entries;
    let databaseURL;
    let dbName = "EIA_2-1";
    let dbCollection = "FuWaScore";
    if (process.argv[2] == "remote") {
        databaseURL = "mongodb+srv://anyUser:anyPassword@clusterfuwa-pmutc.mongodb.net/test?retryWrites=true&w=majority";
    }
    else {
        databaseURL = "mongodb://localhost:27017";
    }
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        entries = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database 2.1 connection is ", entries != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            if (url.query["command"] == "retrieve") {
                let report = await retrieveEntries();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                storeEntry(url.query);
                console.log(jsonString);
            }
        }
        // let cursor: Mongo.Cursor = await entries.find();
        // cursor.sort("score", -1);    // not sorting
        _response.end();
    }
    // Coded by Markus Damm
    async function retrieveEntries() {
        // console.log("Asking DB about entries ", entries.find());
        let cursor = await entries.find();
        cursor = cursor.sort("score", -1);
        let answer = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }
    function storeEntry(_entry) {
        console.log("See entry: ");
        console.log({ name: _entry["name"], score: Number(_entry["score"]) });
        console.log("Entry[Score] is ");
        console.log(_entry["score"]);
        // entries.insertOne(_entry);
        entries.insertOne({ name: _entry["name"], score: Number(_entry["score"]) });
        // seperate _entry for name and score (score as number)
    }
})(MyFuwa_last = exports.MyFuwa_last || (exports.MyFuwa_last = {}));
//# sourceMappingURL=server.js.map