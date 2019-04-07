const admin = require('firebase-admin');

var serviceAccount = require('./TransZip-73784d11b491.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

async function main() {

	let doc = await db.collection('liveTraffic').doc('9').get();
	console.log(doc.data());

}

main();
