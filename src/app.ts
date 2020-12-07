import express from "express";
import {AuthorController} from "./controllers/AuthorController";
import {attachControllers} from "@decorators/express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import {IndexController} from "./controllers/IndexController";
import {BookController} from "./controllers/BookController";
import {GenreController} from "./controllers/GenreController";

const app = express();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

attachControllers(app, [IndexController, AuthorController, BookController, GenreController]);


export default app;
