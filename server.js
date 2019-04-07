const express = require('express');
//const nodemailer = require('nodemailer');
const app = express();



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
    console.log(req);
    res.send("uvu");
    //log to db
    //past to web UI
});

app.post('/finish', (req, res) => {
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