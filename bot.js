require('dotenv').config()
const tkey = process.env.tkey
const tsecret = process.env.tsecret
const atoken = process.env.atoken
const asecret = process.env.asecret

const db = require('./models')
const Twit = require('twit')


// App flow

// -  Search on interval- every 10 seconds. (allowed every 2 seconds w/ app auth)


// - tweet is found matching criteria 
// - Make sure not a retweet
// - Make sure this tweet hasn’t been interacted with yet
// - Pull voting record
// - Reply with voting record
// - Retweet the reply 



// set up twit

let T = new Twit({
  consumer_key:         tkey,
  consumer_secret:      tsecret,
  access_token:         atoken,
  access_token_secret:  asecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


console.clear()
console.log('############################\nSTARTING Twitter Bot\n############################\n\n')



// SEARCH
// Syntax: search/tweets, params, gotData

// Documentation: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html

function getMostRecentTweet(){

	T.get('search/tweets', {
		q: '#neverforget list:cspan/members-of-congress -filter:retweets', 
		count: 1,
		result_type: 'recent',
		tweet_mode: 'extended'
	}, function(err, data, response) {

// full result
// console.log("Name:", data)

	  // store key elements
	  let id =data.statuses[0].id
		let name = data.statuses[0].user.name
		let screen_name = data.statuses[0].user.screen_name
		let full_text = data.statuses[0].full_text
	  
	  console.log(name,"\n",screen_name,"\n",full_text,"\n")
	  // replyToTweet()
	})

}


// post() to tweet

function replyToTweet(id, screen_name, voting_record){
	//construct reply
	let reply = screen_name + " " + voting_record

	T.post('statuses/update', { 
		in_reply_to_status_id: id, 
		status: screen_name,
		
	}, function(err, data, response) {
	  console.log(data)
	})
}


// streaming



// T.post('statuses/update', { 
		 
// 		status: "Rep. Barbara Lee, Ca-13, record on 9/11 first responder bills:\n\n✅ 2010 - House Vote 491 - Yea\n✅ 2010 - House Vote 550 - Yea\n❓ 2010 - House Vote 664 - Not voting\n✅ 2015 - HR1786 - Sponsored Bill\n✅ 2019 - House Vote 474 - Yea\n\n#NeverForget\n#DidTheyForget"

		
// 	}, function(err, data, response) {
// 	  console.log(data)
// 	})



console.log('\n\n\n\n');


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










setInterval(function(){ getMostRecentTweet(); }, 10000)








// check their voting records


//check their current seat


// votingRecord("@DougJones");


// Format example
// status: "Rep. Barbara Lee, Ca-13, record on 9/11 first responder bills:\n\n✅ 2010 - House Vote 491 - Yea\n✅ 2010 - House Vote 550 - Yea\n❓ 2010 - House Vote 664 - Not voting\n✅ 2015 - HR1786 - Sponsored Bill\n✅ 2019 - House Vote 474 - Yea\n\n#NeverForget\n#DidTheyForget"


// output
// Rep. Barbara Lee, Ca-13, record on 9/11 first responder bills:

// ✅ 2010 - House Vote 491 - Yea 
// ✅ 2010 - House Vote 550 - Yea
// ❓ 2010 - House Vote 664 - Not voting 
// ✅ 2015 - HR1786 - Sponsored Bill 
// ✅ 2019 - House Vote 474 - Yea 

// #NeverForget
// #DidTheyForget





