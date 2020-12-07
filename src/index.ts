import app from "./app";
import {connectToDB} from "./dbConnection";

const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at :%d port in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

connectToDB();

export default server;
