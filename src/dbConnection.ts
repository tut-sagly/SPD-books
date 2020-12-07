import {createConnection} from "typeorm";

export function connectToDB() {
    if (process.env.NODE_ENV == 'development') {
        createConnection({
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

        createConnection({
            type: "mysql",
            url: process.env.DATABASE_URL,
            port: 3306,
            entities: [
                __dirname + "/entity/*.js"
            ],
            synchronize: true,
            logging: ["error"]
        }).catch(error => console.log(error));
    }
}
