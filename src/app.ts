import express from "express";
import {AuthorController} from "./controllers/AuthorController";
import {createConnection} from "typeorm";
import {attachControllers} from "@decorators/express";

const app = express();

app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */

createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "root",
    database: "db",
    entities: [
         __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).catch(error => console.log(error));

attachControllers(app, [AuthorController]);


export default app;
