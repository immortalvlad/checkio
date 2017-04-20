"use strict";

function findEnemy(you, dir, enemy){
//	you = 'H3', dir = 'SW', enemy = 'E2';
	function genCharArray(charA, charZ){
		var a = [
		], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
		for(; i <= j; ++i) {
			a.push(String.fromCharCode(i));
		}
		return a;
	}
	var alphabet = genCharArray('A', 'Z');
	var max_height = 9;
	var grid = [
	];
	for(var i = 1; i <= alphabet.length; i++) {
		for(var j = 1; j <= max_height; j++) {
			var index = alphabet[i - 1] + "" + j;
			grid[index] = i;
		}

	}
	function getDirection(pDir, ADir){
		var reversDirection = [
		];
		var trueDirect = [];
		var GeoDirect = [];
		trueDirect[1] = "F";
		trueDirect[2] = "R";
		trueDirect[3] = "R";
		trueDirect[4] = "B";
		trueDirect[5] = "L";
		trueDirect[6] = "L";
		var adirN = [];
		for(var key in trueDirect) {
			var o = trueDirect[key];
			if(o == ADir){
				adirN.push(key);
			}
		}
//		console.log(adirN);
		GeoDirect["N"] = 1;
		GeoDirect["NE"] = 2;
		GeoDirect["SE"] = 3;
		GeoDirect["S"] = 4;
		GeoDirect["SW"] = 5;
		GeoDirect["NW"] = 6;

		var rec = GeoDirect[pDir];
		var unic;
		console.log("adirN = " + adirN);
		if(adirN.length > 1){
			var m = [];
			for(var i = 0; i < adirN.length; i++) {
				if(adirN[i] != rec){
					m.push(adirN[i]);
				}
			}

			unic = m[0];
//			console.log(adirN);
		} else {
			unic = adirN[0];
		}

		console.log("rec==" + rec);
		console.log("unic==" + unic);
		var dim = [];
		var obj = [];
		var count = rec;
		for(var i = 1; i <= 6; i++) {
			if(count > 6){
				count = 1;
			}
			obj[i] = count;
			count = count + 1;
		}
		var finded_position;
		for(var key in obj) {
			if(obj[key] == unic){
				finded_position = key;
			}
		}
//		console.log(obj);
//		console.log("finded_position"+finded_position);
//		console.log("unic = "+unic);

//		[1,3],[2,4],[3,5],[4,6],[5,1],[6,2],
//		[1,3],[2,4],[3,5],[4,6],[5,1],[6,2],
//		get R 2,3 = 2;
//		find 2		
//		4 = 2
		return trueDirect[finded_position];
	}
//	console.log(grid);
	var p_width = you[0];
	var p_height = you[1];
	var en_width = enemy[0];
	var en_height = enemy[1];
	var res = 0;
	var Adir;
	if(p_width < en_width){
		res = grid[enemy] - grid[you];
		Adir = getDirection(dir, "R");
//		grid
//		console.log("right");
//		if(p_height > en_height){
//			console.log("top");
//		}else{
//			console.log("bot");
//		}
	}
	if(p_width > en_width){
		res = grid[you] - grid[enemy];
		Adir = getDirection(dir, "L");
//		console.log("left");
	}
	if(p_width == en_width){
//		console.log("front");
		if(p_height > en_height){
//			console.log("top");
			Adir = getDirection(dir, "F");
			res = p_height - en_height;

		} else {
			Adir = getDirection(dir, "B");
			res = en_height - p_height;
//			console.log("bot");
		}
	}
	console.log(Adir);
	console.log(res);
//	console.log(grid);
	return [
		Adir,
		res
	];
}

var assert = require('assert');

if(!global.is_checking){
	assert.deepEqual(findEnemy('G5', 'N', 'G4'), [
		'F',
		1
	], "N-1");
	assert.deepEqual(findEnemy('G5', 'N', 'I4'), [
		'R',
		2
	], "NE-2");
	assert.deepEqual(findEnemy('G5', 'N', 'J6'), [
		'R',
		3
	], "SE-3");
	assert.deepEqual(findEnemy('G5', 'N', 'G9'), [
		'B',
		4
	], "S-4");
	assert.deepEqual(findEnemy('G5', 'N', 'B7'), [
		'L',
		5
	], "SW-5");
	assert.deepEqual(findEnemy('G5', 'N', 'A2'), [
		'L',
		6
	], "NW-6");
	assert.deepEqual(findEnemy('G3', 'NE', 'C5'), [
		'B',
		4
	], "[watch your six!]");
	assert.deepEqual(findEnemy('H3', 'SW', 'E2'), [
		'R',
		3
	], "right");
	assert.deepEqual(findEnemy('A4', 'S', 'M4'), [
		'L',
		12
	], "true left");
	console.log("You are good to go!");
}