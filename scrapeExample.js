let request = require('request')
let cheerio = require('cheerio')

const $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>')

let apple = $('.apple', '#fruits').text()
console.log(apple)

let fruits = $('li').map((index, item)=>{
	return {
		class: $(item).attr('class'),
		fruit: $(item).text()
	}

}).get()
console.log(fruits)


