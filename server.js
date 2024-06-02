const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;


const client = require("./config/client");

const routes = require("./routes");

app.use(express.json());

app.use(routes)


client.on("open", () => {
    app.listen(PORT, () => console.log("Server started on port", PORT));
});