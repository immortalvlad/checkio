"use strict";

function threeWords(data){
	data = data.split(" ");
	function isNumber(el){
		var number = parseInt(el);
		if(number){
			return true;
		}
		return false;
	}
	var count = 0;
	for(var key in data) {
		var word = data[key];
		if(!isNumber(word)){
			count++;
		} else {
			count = 0;
		}
		if(count >=3){
			return true;
		}
	}
	return false;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(threeWords("Hello World hello"), true, "1st example");
	assert.equal(threeWords("He is 123 man"), false, "2nd example");
	assert.equal(threeWords("1 2 3 4"), false, "3rd example");
	assert.equal(threeWords("bla bla bla bla"), true, "4th example");
	assert.equal(threeWords("Hi"), false, "Letters");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
