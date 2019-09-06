require('dotenv').config()

const tkey = process.env.tkey
const tsecret = process.env.tsecret
const atoken = process.env.atoken
const asecret = process.env.asecret

const Twit = require('twit')
const db = require('./models')

let T = new Twit({
  consumer_key:         tkey,
  consumer_secret:      tsecret,
  access_token:         atoken,
  access_token_secret:  asecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

let testObj = {
  "_id" : "5d3651584021fc2b0e16afc6",
  "name" : "Barbara Lee",
  "twitter" : "@RepBarbaraLee",
  "__v" : 0,
  "v_2010_h_1" : "Y",
  "v_2010_h_2" : "Y",
  "v_2010_h_3" : "voteless",
  "v_2010_s_1" : null,
  "v_2015_b_1" : "Y",
  "v_2019_h_1" : "Y",
  "v_2019_s_1" : null,
  "chamber" : "House",
  "district" : "13",
  "state" : "CA",
  "party" : "D"
}

let votesSeq = {
  'v_2010_h_1': {
    year: '2010',
    text: 'House RC#491'
  },
  'v_2010_h_2': {
    year: '2010',
    text: 'House RC#550'
  },
  'v_2010_h_3': {
    year: '2010',
    text: 'House RC#664'
  },
  'v_2010_s_1': {
    year: '2010',
    text: 'House RC#269'
  },
  'v_2015_b_1': {
    year: '2015',
    text: 'HR1786 Sponsor'
  },
  'v_2019_h_1': {
    year: '2019',
    text: 'House RC#474'
  },
  'v_2019_s_1': {
    year: '2019',
    text: 'Senate RC#224'
  }
}

let chooseEmoji = {
  'Y': '✅',
  'N': '❌',
  'voteless': '❓'
}

let votesIter = [
	'v_2010_h_1', 
	'v_2010_h_2', 
	'v_2010_h_3', 
	'v_2010_s_1', 
	'v_2015_b_1', 
	'v_2019_h_1', 
	'v_2019_s_1'
]

module.exports ={
	tweet: function createTweet(id, dataObj) {
		// test case commented out below
		// let at = "@DidTheyForget\n"

		let at = dataObj['twitter']+"\n"
		let intro = `${dataObj['chamber'] === 'Senate' ? 'Sen. ' : 'Rep. '}${dataObj['name']} (${dataObj['party']}) ${dataObj['state']}${dataObj['district'] ? '-' + dataObj['district'] : ''}\n\nRecord on 9/11 First Responder bills:`

	  let votes = []
	  votesIter.forEach((rollCall, i) => {
	    if (dataObj[rollCall]) {
	      votes.push(rollCall)
	    }
	  })
	  let meat = ''
	  votes.forEach((vote, i) => {
	    meat = meat + `\n${chooseEmoji[dataObj[vote]]} ${votesSeq[vote].year} ${votesSeq[vote].text} - ${dataObj[vote]}`
	  })

	  let outro = '\n\n#NeverForget\n#DidTheyForget'

	  let full = at + intro + meat + outro
	  let almostFull = intro + meat + outro

	  // post tweet
		T.post('statuses/update', { 
			in_reply_to_status_id: id, 
			status: full,
		}, function(err, data, response) {
		  console.log(data)
		  //retweet this?

		})

		// retweet their tweet with the voting record added
		// techincally we are posting a new tweet, and linking to their tweet
		// because there is no retweet with comment in the twitter api

		// T.post('statuses/update', { 
		// 	attachment_url: 'https://twitter.com/'+dataObj['twitter'].substr(1)+'/status/' + id, 
		// 	status: almostFull,
			
		// }, function(err, data, response) {
		//   console.log(data)
		// })
	}
}
