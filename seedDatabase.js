// Use the JSON file to seed the database

let twitterData = require('./twitters2.json');

// console.log(twitterData)

// let stuff = twitterData.map((index, record)=>{
// 	console.log(record)
// })

// console.log(twitterData['Martha McSally'])





function entries() {
	for (let [key, value] of Object.entries(twitterData)){
		console.log(`${key}: ${value}`)

		// TODO: write new entry to database
			// name: key
			// twitter: value
	}

}

