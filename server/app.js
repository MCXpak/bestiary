const express = require("express");
const cors = require("cors"); 

const beasts = require("./beasts");
const logRoute = require("./route-logger")

// Make a basic server
const app = express();

//Allow requests from other origins
app.use(cors())

app.use(express.json())

// Add middleware to log routes
app.use(logRoute);

// Set up the server routes
app.get("/", (req, res) => {
    res.send("Welcome to the Bestiary");
});

app.get("/beasts", (req, res) => {
    res.send(beasts);
})

app.get("/beasts/random", (req, res) => {
    const randNum = Math.floor(Math.random() *  beasts.length);
    res.send(beasts[randNum]);
})

app.get('/delete/:name', (req, res) => {
    const name = req.params.name
    for (const beast of beasts) {
        console.log(beast.name)
        if(beast.name.toLowerCase() == name) {console.log(beast); beasts.splice(beasts.indexOf(beast),beasts.indexOf(beast))}
    }
    res.send("Done")
})

app.get("/beasts/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);
        
        if(!id && id !== 0) {
            throw "Invalid input!"
        } else if (id < 0 || id >= beasts.length){
            throw "No Such beast!"  
        }

        const filtered = beasts.filter(b => b.id == req.params.id);
        res.send(filtered[0]);

    } catch (e) {
        res.status(404).send({ error: e })
    }
 
})

app.post("/beasts", (req, res) => {

    // Grab beast data
    const newBeast = req.body;

    //Select an ID for the beast
    newBeast["id"] = beasts.length;

    //Add it to beast list
    beasts.push(newBeast);

    //Return message saying it worked
    res.status(201).send(newBeast)
})



module.exports = app;

