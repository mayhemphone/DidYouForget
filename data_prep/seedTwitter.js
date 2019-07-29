console.clear()
console.log('############################\nSTARTING Twitter Bot\n############################\n\n')

let request = require('request')
let cheerio = require('cheerio')

let fs = require('fs');

let $ = cheerio.load(fs.readFileSync('./source.html',  "utf8"))

let output = []
let dump = {}

// console.log($.html())

let reps = $('tr').map((index, rep)=>{
	// console.log($(rep).find('td').text())
	// console.log($(rep).children().first().text())
	
	// get just the first and third TD
	// console.log($(rep).children().eq(0).text(), "-", $(rep).children().eq(2).text())

	let name = $(rep).children().eq(0).text()
	let twitter = $(rep).children().eq(2).text()
	let firstname
	let lastname

	if (name.includes(",")){
		console.log ("FOUND A DUMB NAME:", name)

		firstname = name.split(',')[1]
		console.log("FIRST NAME: ", firstname)

		lastname = name.split(',')[0]
		console.log("FIRST NAME: ", lastname)

		name = firstname + " " + lastname
	}
	dump[name] = twitter
	output.push({"name": name, "twitter": twitter})
		
	
})

output.shift()
// console.log(output)

fs.writeFile('./twitters2.json', JSON.stringify(dump), 'utf-8', (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('output saved!');
});