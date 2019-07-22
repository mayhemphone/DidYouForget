const db = require('./models')

// Use the JSON file to seed the database
const twitterData = require('./twitters2.json');
const votingData = require('./voting.json')


function entries() {
	for (let [key, value] of Object.entries(twitterData)){
		// 

		db.Reps.create({
			name: key,
			twitter: value
		})
		
		// TODO: write new entry to database
			// name: key
			// twitter: value
	}
	console.log('done')
}

function update() {
	for (let i=0; i < votingData.length - 1; i++)){
		console.log(votingData[i].name)	
		console.log(votingData[i].seat)	
		console.log(votingData[i].v_2010_h_1)	
		console.log(votingData[i].v_2010_h_2)	
		console.log(votingData[i].v_2010_h_3)	
		console.log(votingData[i].v_2015_b_1)	
		console.log(votingData[i].v_2019_h_1)	
		console.log(votingData[i].v_2010_s_1)		
		console.log(votingData[i].v_2019_s_1)
		
		// var query = { name: votingData[i].name };
		// db.Reps.findOneAndUpdate(query, { 
		// 	seat: votingData[i].seat,
		// 	v_2010_h_1: votingData[i].v_2010_h_1,
		// 	v_2010_h_2: votingData[i].v_2010_h_2,
		// 	v_2010_h_3: votingData[i].v_2010_h_3,
		// 	v_2015_b_1: votingData[i].v_2015_b_1,
		// 	v_2019_h_1: votingData[i].v_2019_h_1,
		// 	v_2010_s_1: votingData[i].v_2010_s_1,
		// 	v_2019_s_1: votingData[i].v_2019_s_1
		// })
		// console.log("Updated record for ", votingData[i].name,".")

	}
}

// entries()

update()