"use strict";

function countInversion(sequence){
	var count = 0;
	for(var i = 0; i < sequence.length; i++) {
		for(var j = i + 1; j < sequence.length; j++) {
			if(sequence[i] > sequence[j]){
				var rem = sequence[i];
				sequence[i] = sequence[j];
				sequence[j] = rem;
				count++;
			}
		}
	}
	return count;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(countInversion([
		1,
		2,
		5,
		3,
		4,
		7,
		6
	]), 3, "Example");
	assert.equal(countInversion([
		0,
		1,
		2,
		3
	]), 0, "Sorted");
	assert.equal(countInversion([
		99,
		-99
	]), 1, "Two numbers");
	assert.equal(countInversion([
		5,
		3,
		2,
		1,
		0
	]), 10, "Reversed");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
// 5 3 2 1 0
// 
// 3 5 2 1 0
// 3 2 5 1 0
// 2 3 5 1 0
// 2 3 1 5 0
// 2 1 3 5 0
// 1 2 3 5 0
// 1 2 3 0 5
// 1 2 0 3 5
// 1 0 2 3 5
// 0 1 2 3 5

// 5 3 2 1 0
// 
// 3 5 2 1 0
// 3 2 5 1 0
// 3 2 1 5 0
// 3 2 1 0 5
// 2 3 1 0 5
// 2 1 3 0 5
// 2 1 0 3 5
// 1 2 0 3 5
// 1 0 2 3 5
// 0 1 2 3 5