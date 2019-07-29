# But did you though?

Did You Forget is a twitter bot that searches for US congress members tweeting "#NeverForget", then replies to them with their voting record on 9/11 First Responder bills.  Inspired by Jon Stewart's speech to a near empty congress on June 11th. 2019, we sought to create a twitter bot that provides factual, relevant data.

### twitterSearch.js
In this file we search for the most recent 500 tweets that meet the query criteria, then ask for the full text back.  Once we have identified the usesr, we create the reply and post it. 

#### Current Query:
	#neverforget list:cspan/members-of-congress -filter:retweets '911' OR 'september' OR '9%2F11'

#### searchTweets ()
Performs the search via twit, and either reports to the console that there are no results, or sends the data.statuses to the function processTweets().

#### processTweets ()
Here we search the database for the voting records of the congress member via their twitter handle.

Once the voting record is located, we send that result data to createTweet() for the response.

#### createTweet ()
This function crafts the response to the congressmember based off their voting record.  We only reply with voting records that they have actually been eligible to partake in.  If the database returns a null, we skip it.  If they voted Yes, No, or were eligble but chose not to vote, we include it in the response.

Once the reply is crafted, we post to twitter via twit.  

 This is still configured for testing, so it replies to our own tweet, on our private account.  We will change the 'in_reply_to_status_id' value to the found tweet's id once we are ready to go live.



