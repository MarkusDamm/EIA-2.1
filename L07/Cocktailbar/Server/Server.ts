import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_CocktailBar {
    interface Order {
        [type: string]: string | string[];
    }
    let orders: Mongo.Collection;
    let databaseURL: string;

    let dbName: string = "FirstFantasy";
    let dbCollection: string = "Characters";

    if (process.argv[2] == "remote") {
        databaseURL = "mongodb+srv://anyUser:anyPassword@clusterfuwa-pmutc.mongodb.net/test?retryWrites=true&w=majority";
    }
    else {
        databaseURL = "mongodb://localhost:27017";
    }

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    startServer(port);
    console.log("Server starting on port: " + port);

    connectToDatabase(databaseURL);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection is ", orders != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }

            if (url.query["command"] == "retrieve") {
                let report: any[] | string = await retrieveOrders();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            } else {
                console.log("urlQuery: ", url.query);
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
                storeOrder(url.query);
                console.log(jsonString);
            }
        }
        _response.end();
    }

    async function retrieveOrders(): Promise<any[] | string> {
        // console.log("Asking DB about Orders ", orders.find());
        let cursor: Mongo.Cursor = await orders.find();
        let answer: Promise<any[]> = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else 
            return "We encountered tecnical problems. Please try again later";
    }

    function storeOrder(_order: Order): void {
        orders.insert(_order);
    }
}