"use strict";

function digitsMultip(data){
	data = String(data);
	data = data.match(/([1-9])/g);
	var res=1;
	for(var key in data) {
		res *= parseInt(data[key]);
	}
//	console.log(data);
	return res;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(digitsMultip(123405), 120, "1st");
	assert.equal(digitsMultip(999), 729, "2nd");
	assert.equal(digitsMultip(1000), 1, "3rd");
	assert.equal(digitsMultip(1111), 1, "4th");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
