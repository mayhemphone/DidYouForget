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


db.Reps.find(function(err,obj) { 

		if (obj){
			// success
			// console.log("found them: ", obj[0].twitter);

			for (i=0; i < obj.length -1; i++){
				// console.log("Checking:", obj[i].twitter)
				let whodat = obj[i].twitter
				whodat = whodat.slice(1)

				T.get('users/lookup', { screen_name : whodat })
				 .then((result)=>{
				 //code 
				 // console.log('search result:',result)
				 })
				 .catch((err) => {
				  //code
				  console.log('error: ',whodat)

				 });


			}
			console.log("done")
		} 

	})


// let whodat = 'SenShelby'

// T.get('users/lookup', { screen_name : whodat })
//  .then((result)=>{
//  //code 
//  console.log('search result:',result)
//  })
//  .catch((err) => {
//   //code
//   console.log('error: ',whodat)

//  });
