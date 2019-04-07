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

//do mail
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


//try render a website
app.get('/', (req, res) => {
    res.send('Thank you for visiting the TransZip application website!');
});

//incoming requests
app.post('/start', (req, res) => {

    var latitude = req.body.geo.coords.latitude;
    var longtitude = req.body.geo.coords.longitude;

    var liveTraffic = db.collection('liveTraffic');
    var allStops = liveTraffic.get()
        .then(snapshot => {

            let epsilon = 0.01;     //set precision
            var stopID = -1;        //placeholder

            //find the stop the user is on
            snapshot.forEach(doc => {
                if (Math.abs(latitude - doc.latitude) < epsilon && Math.abs(longtitude - doc.longtitude) < epsilon) {
                    stopID = doc.id;
                }
            });

            //increment the value
            var docToUpdate = liveTraffic.doc(stopID.toString());

            var transaction = db.runTransaction(t => {
               return t.get(docToUpdate)
               .then(doc => {
                    let newCount = doc.data().counter + 1;
                    t.update(docToUpdate, {counter: newCount});
                    return Promise.resolve('Stop counter is increased by 1');
                });
            }).then(result => {
                console.log("Transaction success", result);
                res.send("Successfully logged the object " + req.body.toString());
            });

        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

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
