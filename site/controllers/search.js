//search

// // Require needed modules
let express = require('express')
let async = require('async')
const router = express.Router();

//twitterSearch set up
require('dotenv').config()



// const tkey = process.env.tkey
// const tsecret = process.env.tsecret
// const atoken = process.env.atoken
// const asecret = process.env.asecret

const db = require('../../models')
// const Twit = require('twit')

const createTweet = require('../../createTweet');

// const query = "#neverforget list:cspan/members-of-congress -filter:retweets AND -filter:replies '911' OR 'september' OR '9%2F11'"


//createtweet stuff

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



function createRes (dataObj){

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
	  return full
}






// // GET /content
router.get('/:handle', (req, res) => {
	console.log("got request for:", req.params.handle)
	// DO STUFF!

  //-------------

    // query the db
		db.Reps.findOne({ twitter: "@" + req.params.handle }, function(err,obj) {
			if (obj){
				// success, do nothing

			} else {
				// didn't find a match?
				console.log('error with:',err)
				return
			}
		})
		.then((results)=>{

			// console.log(results)
			res.send(createRes(results))
      // res.render('index', {results: results})
		})
	  .catch((err) => {
		  console.log('error with:',err)
		  console.log("\n\n\n\n")
		  res.send("Not found")

		})


  //-------------


})

module.exports = router
