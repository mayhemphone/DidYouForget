


require('dotenv').config()



const tkey = process.env.tkey
const tsecret = process.env.tsecret
const atoken = process.env.atoken
const asecret = process.env.asecret

const db = require('../models')
const Twit = require('twit')

const createTweet = require('./createTweet');

const query = "#neverforget list:cspan/members-of-congress -filter:retweets AND -filter:replies '911' OR 'september' OR '9%2F11'"

// Set up twit
let T = new Twit({
  consumer_key:         tkey,
  consumer_secret:      tsecret,
  access_token:         atoken,
  access_token_secret:  asecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


// Search tweets
function searchTweets (){
	// search for last 500 tweets (twitter only goes back 1 week
	// with standard tier search)

	T.get('search/tweets', {
		q: query,
		count: 500,
		result_type: 'recent',
		tweet_mode: 'extended'
	}, function(err, data, response) {

		if (data.statuses.length == 0){
			console.log("no results", Date.now())
			// return

		} else {
			console.log("\nProcess tweets:\n",data.statuses)

			// if there are results, let's process them
			processTweets(data.statuses)

		}
		console.log("PAST THE IF STATEMENT\n\n")
	})
	return
}

function processTweets(array) {
  // just added
  let tweetResults

  for (const item of array) {
  	let oldTweet = false
    // query the db
		db.Reps.findOne({ twitter: "@" + item.user.screen_name }, function(err,obj) {
			if (obj){
				// success, do nothing

			} else {
				// didn't find a match?
				console.log('error with ' + item.user.screen_name + ': ',err)
				return
			}
		})
	  .then((results)=>{
	  	// console.log(item)
	  	tweetResults = results
	  	console.log(item.id_str)
	    console.log("@"+item.user.screen_name)
	    console.log(item.full_text)
	  	console.log("\nVoting Record:")
	  	console.log(results)
	  	console.log("\nIs this a new tweet?")




			tweetResults.prevTweets.forEach(function(element) {

			  console.log("Checking current tweet against prevTweets: ",element);

			  if (element === item.id_str) {
			  	console.log("Been there, done that")
			  	oldTweet = true
			  	return

			  } else{
			  	console.log("not a match")
			  }
			})
	  })
	  .then((results)=>{
	  	// after we loop through, see if this is still a new tweet
		  if (oldTweet === false){
		  	console.log("dis new tweet, lets reply")
		  	// ---------------------------------------|
		  	// un-comment the next line when ready ---|
		  	console.log("\n\n\n\n\n\nDAY OF RESULTS\n\n",tweetResults)
		  	console.log("MAKING A TWEET")
	  		createTweet.tweet(item.id_str,tweetResults)

	  		// let's add this tweet ID to the database too
	  		// conditions, update, options, callback
	  		db.Reps.findOneAndUpdate({ twitter: "@" + item.user.screen_name },{ "$push": { prevTweets: item.id_str } },{ 'new': true },function(err,obj) {
					if (obj){
						// success, do nothing

					} else {
						// didn't find a match?
						console.log('error with ' + item.user.screen_name + ': ',err)
						//not tested
						return
					}
				})

		  } else {
		  	console.log("No reply needed\n\n\n\n")
		  }
	  })
	  .then((results)=>{
	  	console.log(oldTweet)
	  })
	  .catch((err) => {
		  console.log('error with ' + item.user.screen_name + ': ',err)
		  console.log("\n\n\n\n")

		})
  }
}


// TODO: check if we've replied to this tweet previously
function isThisNew(tweet){

	//
}

// TODO: set timer to check for new tweets

// searchTweets()

// setInterval(searchTweets, 60000)
