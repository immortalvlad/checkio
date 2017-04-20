"use strict";

function xoReferee(data){
	var win = "D";
	var res = checkHoriz(data);
	win = res != "D" ? res : win;
	var res = checkVertical(data);
	win = res != "D" ? res : win;
	var res = checkDiagonal(data);
	win = res != "D" ? res : win;

	return win;
}
function checkHoriz(data){
	for(var i = 0; i < data.length; i++) {
		var x = 0;
		var y = 0;
		for(var j = 0; j < data[i].length; j++) {
			var letter = data[i][j];
			if(letter == "X"){
				x = x + 1;
			}
			if(letter == "O"){
				y++;

			}
		}
		if(x == 3){
			return "X";
		}
		if(y == 3){
			return "O";
		}
	}
	return "D";
}
function checkVertical(data){
	var h = data.length;
	var w = data[0].length;
	for(var i = 0; i < w; i++) {
		var x = 0;
		var y = 0;
		for(var j = 0; j < h; j++) {
			var letter = data[j][i];
			if(letter == "X"){
				x = x + 1;
			}
			if(letter == "O"){
				y++;
			}
		}
		if(x == 3){
			return "X";
		}
		if(y == 3){
			return "O";
		}
	}
	return "D";
}
function checkDiagonal(data){
	var h = data.length;
	var w = data[0].length;
	var x = 0;
	var y = 0;
	for(var i = 0; i < w; i++) {
		var letter = data[i][i];
		if(letter == "X"){
			x = x + 1;
		}
		if(letter == "O"){
			y++;
		}
	}
	if(x == 3){
		return "X";
	}
	if(y == 3){
		return "O";
	}
	x = 0;
	y = 0;
	for(var i = h - 1; i >= 0; i--) {
			var j = (h - i) - 1;
			var letter = data[i][j];
			if(letter == "X"){
				x = x + 1;
			}
			if(letter == "O"){
				y++;
			}
	}
	if(x == 3){
		return "X";
	}
	if(y == 3){
		return "O";
	}
	return "D";
}
var assert = require('assert');

if(!global.is_checking){
	assert.equal(xoReferee([
		"X.O",
		"XX.",
		"XOO"
	]), "X", "Xs wins");

	assert.equal(xoReferee([
		"OO.",
		"XOX",
		"XOX"
	]), "O", "Os wins");

	assert.equal(xoReferee([
		"OOX",
		"XXO",
		"OXX"
	]), "D", "Draw");

	assert.equal(xoReferee([
		"O.X",
		"XX.",
		"XOO"
	]), "X", "Xs wins again");

	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
