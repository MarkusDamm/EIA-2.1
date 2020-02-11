import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace MyFuwa_last {
    interface Entry {
        [type: string]: string | string[] | number;
    }
    let entries: Mongo.Collection;
    let databaseURL: string;

    let dbName: string = "EIA_2-1";
    let dbCollection: string = "FuWaScore";

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
        entries = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database 2.1 connection is ", entries != undefined);
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
                let report: any[] | string = await retrieveEntries();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
                storeEntry(url.query);
                console.log(jsonString);
            }
        }
        let cursor: Mongo.Cursor = entries.find();
        cursor.sort("score");    // not sorting
        _response.end();
    }

    async function retrieveEntries(): Promise<any[] | string> {
        // console.log("Asking DB about entries ", entries.find());
        let cursor: Mongo.Cursor = await entries.find();
        let answer: Promise<any[]> = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }

    function storeEntry(_entry: Entry): void {
        console.log("See entry: ");
        console.log({ name: _entry["name"], score: Number(_entry["score"]) });
        console.log("Entry[Score] is ");
        console.log(_entry["score"]);
        // entries.insertOne(_entry);
        entries.insertOne({ name: _entry["name"], score: Number(_entry["score"]) });
        // seperate _entry for name and score (score as number)
    }
}