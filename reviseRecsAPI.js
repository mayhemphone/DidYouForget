const request = require('request')
require('dotenv').config()

const API_VAL = process.env.PROPUB_API_VAL
const HEADERS = {'X-API-Key': API_VAL}
const OPTIONS = {
  house: {
    url: 'https://api.propublica.org/congress/v1/116/house/sessions/1/votes/474',
    dbVoteRec: 'v_2019_s_1',
    chamber: 'House',
  },
  senate: {
    url: 'https://api.propublica.org/congress/v1/116/senate/sessions/1/votes/224',
    dbVoteRec: 'v_2019_h_1',
    chamber: 'Senate',
  }
}



var options = {
  url: OPTIONS.house.url,
  headers: HEADERS
};

console.log(options);

function codifyVote(voteText){
  voteText = voteText.lowercase()
  if (voteText === 'nay' || voteText === 'no' || voteText === 'not a sponsor' || voteText === 'not in senate, voted no in house' || voteText === 'not in senate, but voted no in house') {
    return 'N'
  } else if (voteText == 'yea' || voteText == 'yes' || voteText == 'sponsor' || voteText == 'not in senate, voted yes in house' || voteText == 'initially voted no but then agreed to support the bill and vote yes.' || voteText == 'not in senate, but voted yes in house') {
    return 'Y'
  } else if (voteText == 'not in congress' || voteText == 'not in senate') {
    return null
  } else if (voteText == 'not voting') {
    return 'voteless'
  } else {
    return 'ERROR'
  }
}

function findLastSpace(name) {
  let split = name.split(' ')
  return split[split.length - 1]
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    let info = JSON.parse(body)
    let peeps = info.results.votes.vote.positions
    console.log(peeps);
    peeps.forEach((person) => {
      let nameLast = findLastSpace(person.name)

    })
  }
}

request(options, callback);
