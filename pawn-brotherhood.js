"use strict";

function safePawns(data){
	var sum = 0;
	function getPrev(w){
		var code = w.charCodeAt(0);
		if(--code >= 97){
			return String.fromCharCode(code);
		}
		return false;
	}
	function getNext(w){
		var code = w.charCodeAt(0);
		if(++code <= 104){
			return String.fromCharCode(code);
		}
		return false;
	}
	function check(pos){
		if(data.indexOf(pos) >= 0){
			return true;
		}
		return false;
	}
	for(var i = 0; i < data.length; i++) {
		var position = data[i];
		var ch = position[0];
		var num = parseInt(position[1]) - 1;
		var next = getNext(ch);
		var prev = getPrev(ch);
		if(next && num > 0 && num < 8){
			var new_pos = next + "" + num;
			if(check(new_pos)){
				sum++;
				continue;
			}
//			console.log(new_pos);
		}
		if(prev && num > 0 && num < 8){
			var new_pos = prev + "" + num;
			if(check(new_pos)){
				sum++;
				continue;
			}
		}
	}
	console.log(sum);
	return sum;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(safePawns(["b4", "d4", "f4", "c3", "e3", "g5", "d2"]), 6, "First");
	assert.equal(safePawns(["b4", "c4", "d4", "e4", "f4", "g4", "e5"]), 1, "Second");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
