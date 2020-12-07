import express from "express";
import {AuthorController} from "./controllers/AuthorController";
import {createConnection} from "typeorm";
import {attachControllers} from "@decorators/express";

// import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import {IndexController} from "./controllers/IndexController";
import {BookController} from "./controllers/BookController";
import {GenreController} from "./controllers/GenreController";

const app = express();

app.set("port", process.env.PORT || 3000);

if (process.env.NODE_ENV || 'development') {
    createConnection({  // TODO: smells to extract it
        type: "mysql",
        url: process.env.DATABASE_URL,
        host: process.env.DATABASE_URL || "db",
        port: 3306,
        username: process.env.DATABASE_USER_NAME || "root",
        password: process.env.DATABASE_PASSWORD || "root",
        database: process.env.DATABASE_SCHEMA || "public",
        entities: [
            __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        logging: ["error"]
    }).catch(error => console.log(error));
} else {
    createConnection({  // TODO: smells to extract it
        type: "mysql",
        url: process.env.DATABASE_URL,
        port: 3306,
        entities: [
            __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        logging: ["error"]
    }).catch(error => console.log(error));
}


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //TODO add error handler

app.use(
    express.static(path.join('dist'), { maxAge: 31557600000 })
);

attachControllers(app, [IndexController, AuthorController, BookController, GenreController]);


export default app;
