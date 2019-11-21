"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
// import * as Mongo from "mongodb";
var L06_CocktailBar;
(function (L06_CocktailBar) {
    let server;
    // let orders: Mongo.Collection;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);
    // let databaseURL: string = "mongodb://localhos:27017";
    // connectToDatabase(databaseURL);
    function startServer(_port) {
        server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    // function connectToDatabase(_url: string): void {
    //     let mongoClient: Mongo.MongoClient;
    // }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
    // function storeOrder(_order: string): void {
    //     orders.insert(_order);
    // }
})(L06_CocktailBar = exports.L06_CocktailBar || (exports.L06_CocktailBar = {}));
//# sourceMappingURL=Server.js.map