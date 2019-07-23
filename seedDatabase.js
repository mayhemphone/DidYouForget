const db = require('./models')

// Use the JSON files to seed the database
const twitterData = require('./twitters2.json');
const votingData = require('./voting_data.json')

// functions
function originalEntries() {
	// loads in names and twitters

	for (let [key, value] of Object.entries(twitterData)){
		db.Reps.create({
			name: key,
			twitter: value
		})
	}
	console.log('done')
}

function updateEntries() {
	// loads in the rest of the data
	for (let i=0; i < votingData.length - 1; i++){
		var query = { name: votingData[i].name };
		db.Reps.findOneAndUpdate(query, { 
			chamber: votingData[i].chamber,
			party: votingData[i].party,
			state: votingData[i].state,
			district: votingData[i].district,
			v_2010_h_1: votingData[i].voting_history.v_2010_h_1,
			v_2010_h_2: votingData[i].voting_history.v_2010_h_2,
			v_2010_h_3: votingData[i].voting_history.v_2010_h_3,
			v_2015_b_1: votingData[i].voting_history.v_2015_b_1,
			v_2019_h_1: votingData[i].voting_history.v_2019_h_1,
			v_2010_s_1: votingData[i].voting_history.v_2010_s_1,
			v_2019_s_1: votingData[i].voting_history.v_2019_s_1
		}, { new: true }, function(error, result) {
	    if (error) {
	    	console.log("ERROR with",votingData[i].name, "!\n",error)
	    };
		})
		console.log("Updated record for ", votingData[i].name,".")
	}
}

function find(){

	db.Reps.find()
	.then(results=>{
		for (i=0; i< results.length; i++){
			if (!results[i].party){
				console.log(results[i].name)
			}
		}
	})
}

//what are we running?


