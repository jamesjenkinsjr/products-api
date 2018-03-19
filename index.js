const express = require('express');
const serverApp = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.port || 5000; //necessary for Heroku deployment

//routers
const productRouter = require('./routers/products');

serverApp.use(function logger(req, ers, next){
    const { url } = req;
    const date = new Date();
    console.log(`URL: ${url} @ ${date}`);
    next();
});
serverApp.use(productRouter); //register the router with the application

serverApp.get('/', (req, res) => {
    res.send('HELLO! I work');
})

serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});