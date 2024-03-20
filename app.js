const express = require("express");


const app = express();


app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


module.exports = app;