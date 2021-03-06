const express = require('express');
const serverApp = express();
const mongoose = require('mongoose');

require('dotenv').config();
//middleware imports
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const notFoundHandler = require('./middleware/notFoundHandler');
const serverErrorHandler = require('./middleware/serverError');
mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000; //necessary for Heroku deployment

//routers
const productRouter = require('./routers/products');
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({extended: true}));
serverApp.use(logger);
serverApp.use(productRouter); //register the router with the application

serverApp.use(notFoundHandler);
serverApp.use(serverErrorHandler);

serverApp.get('/', (req, res) => {
    res.send('HELLO! I work');
})

serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});