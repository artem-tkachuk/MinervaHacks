const admin = require('firebase-admin');
const serviceAccount = require("./TransZip-73784d11b491.json");

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();

const document = firestore.doc('live');
console.log('Document created');

// Enter new data into the document.
await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World',
});
console.log('Entered new data into the document');