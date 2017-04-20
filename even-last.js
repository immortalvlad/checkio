"use strict";

function evenLast(data){
	if(data.length == 0){
		return 0;
	}
	var sum = 0;
	for(var key in  data) {
//		console.log(key % 2);
		if((key % 2) == 0){
			sum += data[key];
		}
	}
	var last = data[data.length - 1];
	return sum * last;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(evenLast([
		0,
		1,
		2,
		3,
		4,
		5
	]), 30, "(0+2+4)*5=30");
	assert.equal(evenLast([
		1,
		3,
		5
	]), 30, "(1+5)*5=30");
	assert.equal(evenLast([
		6
	]), 36, "(6)*6=36");
	assert.equal(evenLast([
	]), 0, "An empty array = 0");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
