# But did you though?

Did You Forget is a twitter bot that searches for US congress members tweeting "#NeverForget", then replies to them with their voting record on 9/11 First Responder bills.  Inspired by Jon Stewart's speech to a near empty congress on June 11th. 2019, we sought to create a twitter bot that provides factual, relevant data.

### twitterSearch.js
In this file we search for the most recent 500 tweets that meet the query criteria, then ask for the full text back.

#### Current Query:
	"#neverforget list:cspan/members-of-congress -filter:retweets '911' OR 'september' OR '9%2F11'"
