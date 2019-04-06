const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Thank you for visiting the !');

});

app.post('/start', (req, res) => {

    //log to db
    //past to web UI

});

app.post('/finish', (req, res) => {

   //log to db
   //past to UI

});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});