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
    text: 'HR1786 sponsor'
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

let votesIter = ['v_2010_h_1', 'v_2010_h_2', 'v_2010_h_3', 'v_2010_s_1', 'v_2015_b_1', 'v_2019_h_1', 'v_2019_s_1']

function createTweet(dataObj) {
  let votes = []
  votesIter.forEach((rollCall, i) => {
    if (dataObj[rollCall]) {
      votes.push(dataObj[rollCall])
    }
  })
  votes.forEach((vote, i) => {
    
  })
  let intro = `${dataObj['chamber'] === 'Senate' ? 'Sen. ' : 'Rep. '}${dataObj['name']} (${dataObj['party']}) ${dataObj['state']}${dataObj['district'] ? '-' + dataObj['district'] : ''} support record for 9/11 first responder bills:`

  let meatArr = []

  let outro = `
#NeverForget
#DidTheyForget`

  let full = intro + outro
  console.log(full)
}

createTweet(testObj)
