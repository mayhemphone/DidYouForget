require('dotenv').config()
const tkey = process.env.tkey
const tsecret = process.env.tsecret
const atoken = process.env.atoken
const asecret = process.env.asecret

const db = require('./models')
const Twit = require('twit')

// const createTweet = require('./createTweet');

// Set up twit
let T = new Twit({
  consumer_key:         tkey,
  consumer_secret:      tsecret,
  access_token:         atoken,
  access_token_secret:  asecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


setInterval(test,1000)

function test(){
	console.log("hey")
}