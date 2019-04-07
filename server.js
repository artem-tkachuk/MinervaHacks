const express = require('express');
const app = express();
//const bodyParser = require('body-parser');

const firebase = require('firebase');
require('firebase/firestore');
const admin = require('firebase-admin');

//app.use(bodyParser.json());

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

//const nodemailer = require('nodemailer');

/*var transporter = nodemailer.createTransport({
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
    console.log(req.body);

    //logging into firebase
    //var docRef = db.collection('trips').doc();

    //var setAda = docRef.set(req.body);

    res.send("Hi");
});

app.post('/finish', (req, res) => {
    console.log(req);
    res.send("uvu");
   //log to db
   //past to UI
});

app.post('/feedback', (req, res) => {

});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});