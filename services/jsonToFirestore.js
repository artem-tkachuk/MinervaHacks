var fs = require('fs');

const admin = require('firebase-admin');

var serviceAccount = require('./TransZip-73784d11b491.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


async function writeToFirestore() {

    for (var i = 0; i < 53; i++) {

        //let log = await db.collection('liveTraffic').doc(i.toString()).set(stops[i]);

        let doc = await db.collection('liveTraffic').doc(i.toString()).get();

        console.log(doc.data());

    }

}

//var file = fs.readFileSync('stopscoordinates.json');

//var stops = JSON.parse(file);

writeToFirestore().then(res => {
    console.log("Done with everything!");
});





