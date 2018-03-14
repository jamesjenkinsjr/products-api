const express = require('express');
const serverApp = express();

const PORT = process.env.port || 5000; //necessary for Heroku deployment

serverApp.get('/', (req, res) => {
    res.send('HELLO I work');
})

serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});