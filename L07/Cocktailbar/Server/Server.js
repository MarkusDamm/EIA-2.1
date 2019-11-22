"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_CocktailBar;
(function (L07_CocktailBar) {
    let orders;
    let databaseURL;
    let dbName = "Cocktailbar";
    let dbCollection = "Orders";
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
        orders = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection is ", orders != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            if (url.query["command"] == "retrieve") {
                _response.write(retrieveOrders());
            }
            else {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                storeOrder(url.query);
                console.log(jsonString);
            }
        }
        _response.end();
    }
    async function retrieveOrders() {
        let cursor = orders.find();
        console.log(cursor.toArray());
        return cursor.toArray();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(L07_CocktailBar = exports.L07_CocktailBar || (exports.L07_CocktailBar = {}));
//# sourceMappingURL=Server.js.map