import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_CocktailBar {
    let server: Http.Server;
    let orders: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);

    let databaseURL: string = "mongodb://localhos:27017";
    connectToDatabase(databaseURL);

    function startServer(_port: number | string): void {
        server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    
    }

    function connectToDatabase(_url: string): void {
        
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }

    function storeOrder(_order: string): void {
        orders.insert(_order);
    }
}