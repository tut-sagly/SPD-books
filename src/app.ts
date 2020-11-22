import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */


app.get("/", (req, res) => {
    res.send(`
    <h1>Docker + Node</h1>

  `);
});

export default app;
