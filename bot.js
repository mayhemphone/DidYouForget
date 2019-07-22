
const db = require('./models')


// function called when a tweet is matched
// find a voting records

function votingRecord (twitterHandle){

db.Reps.findOne({
	twitter: twitterHandle
}, function(err,obj) { 
	if (obj){
		// success
		console.log("found them: ", obj); 


	} else {
		// no result
		console.log('error:', err); 
	}
});
}

// check their voting records


//check their current seat


votingRecord("@DougJones");


// output
// Rep. Barbara Lee, Ca-13, record on 9/11 first responder bills:

// ✅ 2010 - House Vote 491 - Yea 
// ✅ 2010 - House Vote 550 - Yea
// ❓ 2010 - House Vote 664 - Not voting 
// ✅ 2015 - HR1786 - Sponsored Bill 
// ✅ 2019 - House Vote 474 - Yea 

// #NeverForget
// #DidTheyForget
