"use strict";

var VOWELS = "aeiouy"

function translate(phrase){
	
	phrase = phrase.split(" ");
	var res =[];
	for(var i = 0; i < phrase.length; i++) {
		var arr = [];
		var word = phrase[i];
		for(var j = 0; j < word.length; j++) {
			var letter = word[j];
			if(VOWELS.indexOf(letter) == -1){
				arr.push(letter);
				j++;
			} else {
				arr.push(letter);
				j = j + 2;
			}
		}
		res.push(arr.join(""));
	}
	res = res.join(" ");
	return res
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(translate("hieeelalaooo"), "hello", "Hi!");
	assert.equal(translate("hoooowe yyyooouuu duoooiiine"), "how you doin", "Joey?");
	assert.equal(translate("aaa bo cy da eee fe"), "a b c d e f", "Alphabet");
	assert.equal(translate("sooooso aaaaaaaaa"), "sos aaa", "Mayday, mayday");

	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}