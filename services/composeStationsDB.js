const fs = require('fs');

let rawdata = fs.readFileSync('busstopsdata.json');
let data = JSON.parse(rawdata);
data = data.data;
console.log(data);

var count = 0;
var total = '[';

data.forEach(function(x) {

	x = x[18].split(',')[0];

	x = x.substr(x.indexOf("((") + 2).split(' ');

	var longtitude = x[0];
	var latitude = x[1];

	var stop ="{ \"latitude\":" + latitude.toString() + ", \"longtitude\": " + longtitude.toString() + ", \"counter\": 0 },";
	total += stop;
	count++;

});

total = total.slice(0, -1);

total += "]";

fs.writeFile('stopscoordinates.json', total, (err) => {
	if (err) {
		throw err;
	}

	console.log("Done!");
});