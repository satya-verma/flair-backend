const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import routes
const stripePayment = require('./routes/stripe-payment');


// set env variables
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// set app and port
const app = express();
const port = process.env.PORT || 8080;
app.set('port', port)

// other tools
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app is listening on the given port
app.listen(app.get('port'), error => {
    if (error)
        throw error;
    console.log(`running on port ${app.get('port')}`);
})

// root request
app.get('/', (req, res) => {
    res.send("welcome to flair-clothing");
})

// configure routes
stripePayment.configure(app, stripe);