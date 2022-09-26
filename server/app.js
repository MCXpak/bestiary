const express = require("express");
const cors = require("cors"); 

const beasts = require("./beasts");

// Make a basic server
const app = express();

//Allow requests from other origins
app.use(cors())

app.use(express.json())

// Set up the server routes

app.get("/", (req, res) => {
    res.send("Welcome to the Bestiary");
});

app.get("/beasts", (req, res) => {
    res.send(beasts);
})

app.get("/beasts/random", (req, res) => {
    const randNum = Math.floor(Math.random() *  beasts.length)
    res.send(beasts[randNum])
})

app.get("/beasts/:id", (req, res) => {
    const filtered = beasts.filter(b => b.id == req.params.id);
    res.send(filtered[0])
})

app.post("/beasts", (req, res) => {

    // Grab beast data

    //Add it to beast list

    //Return message saying it worked
    res.send(req.body)
})


module.exports = app;

