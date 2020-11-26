import express from "express";
import {Author} from "./entity/Author";
import {createConnection} from "typeorm";

import {getConnection} from "typeorm";
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
}).then(connection => {
    let user = new Author();
    user.id = 1;
    user.firstName = "kek";
    user.lastName = "lol";
    return connection.manager
        .save(user)
        .then(user => {
            console.log("user has been saved. user id is", user.id);

        });

}).catch(error => console.log(error));

app.get("/", (req, res) => {
    let user = new Author();
    // user.id = 1;
    user.firstName = "kek";
    user.lastName = "lol";
     getConnection()
        .manager
        .save(user)
        .then(user => {
            console.log("user has been saved. user id is", user.id);

        });
    res.send(`
    <h1>Docker + Node</h1>

  `);
});

export default app;
