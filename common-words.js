"use strict";

function commonWords(first, second){
	var first_arr = first.split(",");
	var second_arr = second.split(",");
	function dif(arr1, arr2){
		var res = [];
		for(var i = 0; i < arr1.length; i++) {
			for(var j = 0; j < arr2.length; j++) {
				if(arr1[i]==arr2[j]){
					res.push(arr1[i]);
				}
			}
		}
		return res;
	}

	var res = dif(first_arr, second_arr);
	if(!res.length){
		return "";
	}
	res.sort();
	res = res.join(",");
	return res;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(commonWords("hello,world", "hello,earth"), "hello", "Hello");
	assert.equal(commonWords("one,two,three", "four,five,six"), "", "Too different");
	assert.equal(commonWords("one,two,three", "four,five,one,two,six,three"), "one,three,two", "1 2 3");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
