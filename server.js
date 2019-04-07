const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/*const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@gmail.com',
        pass: 'yourpassword'
    }
});

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
*/


app.get('/', (req, res) => {
    res.send('Thank you for visiting the TransZip application website!');
});

app.post('/start', (req, res) => {

    var latitude = req.body.geo.coords.latitude;
    var longtitude = req.body.geo.coords.longitude;

    //for each in DB. Whenever the difference is the smallest ==> this is the station

    db.collection('liveTraffic').add(req.body).then((ref) => {
        console.log("Added document with id " + ref);
    });

    res.send("Successfully logged the object " + req.body.toString());

});

app.post('/finish', (req, res) => {

	db.collection('waitingData').add(req.body).then((ref) => {
        console.log("Added document with id " + ref);
    });

    res.send("Successfully logged the object " + req.body.toString());
});

app.post('/feedback', (req, res) => {

});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
