"use strict";

function recallPassword(grille, password){
	var getValues = function(grille){
		var returnVal = "";
		for(var i = 0; i < grille.length; i++) {
			var row = grille[i];
			for(var j = 0; j < row.length; j++) {
				var val = grille[i][j];
				if(val == "X"){
					returnVal += String(password[i][j]);
				}
			}
		}
		return returnVal;
	};
	var reverse = function(grille){
		var temp = grille.slice();
		for(var i = 0; i < grille.length; i++) {
			var row = grille[i];
			var r = (grille.length - 1) - i;
			for(var j = 0; j < row.length; j++) {
				var val = grille[i][j];
//				console.log(val);
				var m = temp[j];
				var arr = m.split("");
				arr[r] = val;
				temp[j] = arr.join("");

			}
		}
		return temp;
	};
	var reseult = "";
	for(var i = 0; i < 4; i++) {
		reseult += String(getValues(grille));
		grille = reverse(grille);
	}
	console.log(reseult);

	return reseult;
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(recallPassword([
		'X...',
		'..X.',
		'X..X',
		'....'
	],
			['itdf',
				'gdce',
				'aton',
				'qrdi']), 'icantforgetiddqd', "First Example");
	assert.equal(recallPassword(['....',
		'X..X',
		'.X..',
		'...X'],
			['xhwc',
				'rsqx',
				'xqzz',
				'fyzr']), 'rxqrwsfzxqxzhczy', "Second Example");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
