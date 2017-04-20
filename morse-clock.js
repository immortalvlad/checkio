"use strict";

function morseClock(data){
	var mass = data.split(":");
	var stack = [];
	function normalize(str){
		var return_str = "";
		for(var i = 0; i < str.length; i++) {
			var w = str[i];
			if(w == "0"){
				return_str+=".";
			}else{
				return_str+="-";
			}
		}
		return return_str;
	}
	for(var i = 0; i < mass.length; i++) {
		var dig = mass[i];
		if(dig.length <= 1){
			dig = String("0" + dig);
		}
		var first = parseInt(dig[0]).toString(2);
		var second = parseInt(dig[1]).toString(2)
		if(i == 0){
			if(String(first).length <= 1){
				first = "0" + first;
			}
		}
		if(i > 0){
			var len = 3 - String(first).length;
			for(var j = 0; j < len; j++) {
				first = "0" + first;
			}
		}
		var len = 4 - String(second).length;
		for(var j = 0; j < len; j++) {
			second = "0" + second;
		}

		var str = normalize(first) +" "+ normalize(second);
		stack.push(str);
	}
	var res = stack.join(" : ");
	return res;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(morseClock("10:37:49"), ".- .... : .-- .--- : -.. -..-", "1st");
	assert.equal(morseClock("21:34:56"), "-. ...- : .-- .-.. : -.- .--.", "2nd");
	assert.equal(morseClock("00:1:02"), ".. .... : ... ...- : ... ..-.", "3rd");
	assert.equal(morseClock("23:59:59"), "-. ..-- : -.- -..- : -.- -..-", "4th");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
