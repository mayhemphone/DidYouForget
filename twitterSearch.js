require('dotenv').config()
const tkey = process.env.tkey
const tsecret = process.env.tsecret
const atoken = process.env.atoken
const asecret = process.env.asecret

const db = require('./models')
const Twit = require('twit')

// set up twit

let T = new Twit({
  consumer_key:         tkey,
  consumer_secret:      tsecret,
  access_token:         atoken,
  access_token_secret:  asecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


// TODO: Search tweets
function searchTweets (){
	// search for last 500 tweets (twitter only goes back 1 week with standard tier search)
	console.clear()
	let query = "#neverforget list:cspan/members-of-congress -filter:retweets '911' OR 'september' OR '9%2F11'"
	T.get('search/tweets', {
		q: query, 
		count: 500,
		result_type: 'recent',
		tweet_mode: 'extended'
	}, function(err, data, response) {

		if (data.statuses.length == 0){
			console.log("no results")
			return

		} else {
			processTweets(data.statuses)
		}
	})
}

//try this instead of loop
function processTweets(array) {
  for (const item of array) {
    //query the db
		db.Reps.findOne({ twitter: "@" + item.user.screen_name }, function(err,obj) { 
			if (obj){
				//success, do nothing

			} else {
				// didn't find a match?
				console.log('error with ' + item.user.screen_name + ': ',err)
			}
		})
  .then((results)=>{
  	console.log(item.id)
    console.log("@"+item.user.screen_name)
    console.log(item.full_text)
		console.log("")
  	console.log("Voting Record:")
  	console.log(results)
  	

  	//check for non null votes

		// Object.entries(results['_doc']).forEach(([key, value]) => {
	
		// 	if (value != null & key != "__v" & key != "_id"){
		// 		// TODO: send non-null data to reply function
		// 		console.log(key+":", value)

		// 	}

		// })
		// returns for readability between tweets
   	console.log("")
		console.log("")
		console.log("")
		console.log("")
		console.log("")
  })
  .catch((err) => {
			  console.log('error with ' + item.user.screen_name + ': ',err)

		});
    // console.log("item:",item.user.screen_name)
  
  }

  console.log('Done!');
}


// TODO: check if we've replied to this tweet previously
function isThisNew(tweet){


}


// TODO: set timer to check for new tweets

searchTweets()