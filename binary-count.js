"use strict";

function binaryCount(number){
	var d = number.toString(2);
	d = d.toString();
	var count = 0;
	for(var i = 0; i < d.length; i++) {
		if(d[i] == 1){
			count++;
		}
	}
	return count;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(binaryCount(1), 1);
	assert.equal(binaryCount(15), 4);
	assert.equal(binaryCount(1), 1);
	assert.equal(binaryCount(1022), 9);
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
