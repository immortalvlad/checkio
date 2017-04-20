"use strict";

function absoluteSorting(numbers){
	for(var i = 0; i < numbers.length; i++) {
		for(var j = i + 1; j < numbers.length; j++) {
			if(Math.abs(numbers[i]) > Math.abs(numbers[j])){
				var rem = numbers[i];
				numbers[i] = numbers[j];
				numbers[j] = rem;
			}
		}
	}
	return numbers
}

var assert = require('assert');

if(!global.is_checking){
	assert.deepEqual(absoluteSorting([
		-20,
		-5,
		10,
		15
	]), [
		-5,
		10,
		15,
		-20
	], "Example");
	assert.deepEqual(absoluteSorting([
		1,
		2,
		3,
		0
	]), [
		0,
		1,
		2,
		3
	], "Positive numbers");
	assert.deepEqual(absoluteSorting([
		-1,
		-2,
		-3,
		0
	]), [
		0,
		-1,
		-2,
		-3
	], "Negative numbers");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}