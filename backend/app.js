const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require("./routes/user")


mongoose.connect("mongodb+srv://Zain:start12345@cluster0-ss2f2.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("Databse Connected");
    }).catch(() => {
        console.log("Connection Failed");
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

app.use(bodyParser.json());
app.use("/api/user", userRoute);
module.exports = app;