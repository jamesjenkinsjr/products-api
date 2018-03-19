const express = require('express');
const serverApp = express();
const mongoose = require('mongoose');

require('dotenv').config();
//middleware imports
const logger = require('./middleware/logger');
mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.port || 5000; //necessary for Heroku deployment

//routers
const productRouter = require('./routers/products');
serverApp.use(logger);
serverApp.use(productRouter); //register the router with the application

serverApp.use(function notFoundHandler(req, res){
    res.status(404).send('Lions, tigers, and bears -- OH MY!')
});

serverApp.get('/', (req, res) => {
    res.send('HELLO! I work');
})

serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});