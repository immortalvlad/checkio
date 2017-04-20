"use strict";

function findMessage(data){
	data = data.match(/([A-Z])/g);
	if(!data){
		return "";
	}
	data = data.join("");

	return data;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(findMessage("How are you? Eh, ok. Low or Lower? Ohhh."), "HELLO", "hello");
	assert.equal(findMessage("hello world!"), "", "Nothing");
	assert.equal(findMessage("HELLO WORLD!!!"), "HELLOWORLD", "Capitals");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
