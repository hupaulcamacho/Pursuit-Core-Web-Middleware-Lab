const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const port = 3000;
const axios = require("axios");

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());

//----------------------------------------------------------------------------
// Valid animal tester

const isAnimal = (request, response, next) => {
    const animalObj = {
        0: "zebra", 
        1: "tiger", 
        2: "giraffe", 
        3: "lion", 
        4: "cheetah"
    }

    const search = request.params.search
    // console.log("search", search);
    for(let i in animalObj) {
        // console.log("animals", animalObj[i])
        if(animalObj[i] === search) {
            next()
        } 
    }
    response.json({
        status: "failed",
        message: false
    })
}

const successMessage = (request, response, next) => {

    response.json({
        status: "success",
        message: true
    })
}

app.get("/animal/:search", isAnimal, successMessage);

//----------------------------------------------------------------------------
// Random Number Picker

let numberArray = [];

const checkInput = (request, response, next) => {
    let min = request.params.min;
    let max = request.params.max;

    if (isNaN(min) || isNaN(max)) {
        response.json({
            status: "error",
            message: "One of the inputs is not a valid number"
        })
    } else {
        next()
    }
}

const generateSpread = (request, response, next) => {
    let min = request.params.min;
    let max = request.params.max;
    if(parseInt(min) > parseInt(max)) {
        response.json({
            status: "failed",
            message: "Starting number cannot be larger than ending number"
        })
    }
    for(let i = parseInt(min) + 1; i <= max; i++) {
        numberArray.push(i)
    }
    next()
}

const getRandomNumber = (request, response, next) => {
    let min = request.params.min;
    let max = request.params.max;
    let randomNumber = Math.floor(Math.random() * (max - min) + min);

    response.json({
        status: "Success",
        range: [min, max],
        randomPick: numberArray[randomNumber]
    })
}

app.get("/random/:min/:max", generateSpread, getRandomNumber)

//---------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Middleware server is running at: ${port}`)
})