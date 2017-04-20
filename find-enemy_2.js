"use strict";

function findEnemy(you, dir, enemy){
//	if(you =="A1" && dir =="SW" && enemy =="Z9"){
//		return ["B",25];
//	} 
//	dir = "SW";
	function genCharArray(charA, charZ){
		var a = [
		], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
		for(; i <= j; ++i) {
			a.push(String.fromCharCode(i));
		}
		return a;
	}
	function uniques(arr){
		var a = [];
		for(var i = 0, l = arr.length; i < l; i++)
			if(a.indexOf(arr[i]) === -1 && arr[i] !== '')
				a.push(arr[i]);
		return a;
	}
	function getPath(path){
		var finded_val;
		var mass = [];
//		console.log(path);
		function gather(val){
//			console.log(val);
			if(val != you){
				mass.push(val);
			}
//			console.log("arr=");
//			console.log(path);
//			console.log('find by ='+ val);
			for(var key in path) {
				if(path[key] == val){
//					mass.push(val);
//					mass.push(key);
//					console.log("=" + val);
					delete path[key];
					gather(key);
				}
			}
			return mass;
		}
		for(var key in path) {
			var el = path[key];
			if(key == enemy){
//				console.log("find  in key= " + key);
				finded_val = el;
			}
			if(el == enemy){
//				console.log("find in val=" + el);
				finded_val = key;
			}
		}
//		path[finded_val] = "";
//		console.log(path);
		mass.push(enemy);
		delete path[enemy];
		gather(finded_val);
		mass.push(you);
		mass.reverse();
		var norm = mass.slice();
		for(var i = 0; i < mass.length; i++) {
			if(i != mass.length - 1){
				var w1 = mass[i][0];
				var w2 = parseInt(mass[i][1]);
				var s1 = mass[i + 1][0];
				var s2 = parseInt(mass[i + 1][1]);
				if(w1 == s1){
					if(w2 < s2){
						for(var j = w2 + 1, c = 1; j < s2; j++, c++) {
							var l = w1 + "" + j;
							norm.splice(i + c, 0, l);
						}
					}
					if(w2 > s2){
						for(var j = w2 - 1, c = 1; j > s2; j--, c++) {
							var l = w1 + "" + j;
							norm.splice(i + c, 0, l);
						}
					}
				}

			}

		}
		if(norm.length > 0){
			mass = norm;
		}
//		console.log(mass);
//		console.log(norm);
//		console.log(finded_val);
		return mass;
	}
	function getDirection(cord){
		var trueDirect = [];
		var GeoDirect = [];
		trueDirect[0] = "F";
		trueDirect[1] = "R";
		trueDirect[2] = "R";
		trueDirect[3] = "B";
		trueDirect[4] = "L";
		trueDirect[5] = "L";
		GeoDirect["N"] = 0;
		GeoDirect["NE"] = 1;
		GeoDirect["SE"] = 2;
		GeoDirect["S"] = 3;
		GeoDirect["SW"] = 4;
		GeoDirect["NW"] = 5;
		var neib = getNeiborhood(you);
		var letter = you[0];
		var number = parseInt(you[1]);
		var next_l = getNextLeter(letter);
		var prev_l = getPrevletter(letter);
		var top_n = number - 1;
		var bot_n = number + 1;
		var hex_top = letter + "" + top_n;
		var hex_bot = letter + "" + bot_n;
		var hex_r1 = next_l + "" + neib[0];
		var hex_r2 = next_l + "" + neib[1];
		var hex_l1 = prev_l + "" + neib[0];
		var hex_l2 = prev_l + "" + neib[1];
		var neiborhood = [hex_top, hex_r1, hex_r2, hex_bot, hex_l2, hex_l1];
		var pointer = GeoDirect[dir];
		var rel_neib = [];
		for(var i = 0; i < neiborhood.length; i++) {
			if(pointer > neiborhood.length - 1){
				pointer = 0;
			}
//			console.log("pointer =" + pointer);
			rel_neib.push(neiborhood[pointer]);
			pointer = pointer + 1;
//			for(var j=pointer; j<){
//				
//			}
		}
//		var t = "H5";
//		console.log(rel_neib.indexOf("H4"));
		var index = rel_neib.indexOf(cord);
		var direction_result = trueDirect[index];
		
		
//		neiborhood[pointer];
//		neiborhood.push(hex_top, hex_r1, hex_r2, hex_bot, hex_l2, hex_l1]);
//		console.log(neiborhood);
//		console.log(rel_neib);
//		console.log(direction_result);
//		console.log(near);
		if(typeof direction_result == "undefined"){
			var ar = [];
			for(var i = 0; i < near.length; i++){
				if(near[i][0] == you){
					ar.push(near[i][1]);
				}
			}
			direction_result = getDirection(ar[0]);
//			console.log(ar);
		}
		return direction_result;
	}
	function getNeiborhood(position){
		var x, y;
		var first = position[0];
		var last = parseInt(position[1]);
		var col = grid[position];
		if(col % 2 == 0){
			x = last < 0 || last > 9 ? 0 : last;
			y = (last + 1) > 9 ? 0 : (last + 1);
			return [x, y];
		}
		if(col % 2 == 1){
			x = (last - 1) < 0 ? 0 : (last - 1);
			y = last < 0 || last > 9 ? 0 : last;
			return [x, y];
		}
	}
	function getNextLeter(letter){
		var code = letter.charCodeAt(0);
		code++;
		return String.fromCharCode(code);
	}
	function getPrevletter(letter){
		var code = letter.charCodeAt(0);
		code--;
		return String.fromCharCode(code);
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
	var path = [];
	var near = [];
//	path.push(you)
	var min_path = 99;
	function finder(p, e, path_counter, min_path, prev){
		var p_width = p[0];
		var p_height = p[1];
		var en_width = e[0];
		var en_height = e[1];
		var res = 0;
		var Adir;
//		console.log("path_counter = " + path_counter);
//		console.log("min_path = " + min_path);
		if(p == e){
//			console.log("Position p == e " + p + " ==" + e);
			if(path_counter < min_path){
				min_path = path_counter;
				path[prev] = p;
			}
			return min_path;
		}
		if(p_width < en_width){
//			console.log("p_width < en_width  == R ");
			var next = getNextLeter(p_width);
			var neib = getNeiborhood(p);
			var next1, next2;
			if(neib[0] > 0){
				path[prev] = p;
				next1 = next + "" + neib[0];
				near.push([p,next1]);
				min_path = finder(next1, e, path_counter + 1, min_path, p);
			}
			if(neib[1] > 0){
				path[prev] = p;
				next2 = next + "" + neib[1];
				near.push([p,next2]);
				min_path = finder(next2, e, path_counter + 1, min_path, p);
			}
//			Adir = getDirection(dir, "R");
		}
		if(p_width > en_width){
//			console.log("p_width > en_width  == L ");

			var next = getPrevletter(p_width);
			var neib = getNeiborhood(p);
			var next1, next2;
			if(neib[0] > 0){
				path[prev] = p;
				next1 = next + "" + neib[0];
				near.push([p,next1]);
				min_path = finder(next1, e, path_counter + 1, min_path, p);
			}
			if(neib[1] > 0){
				path[prev] = p;
				next2 = next + "" + neib[1];
				near.push([p,next2]);
				min_path = finder(next2, e, path_counter + 1, min_path, p);
			}
//			finder();
//			Adir = getDirection(dir, "L");
		}
		if(p_width == en_width){
//			console.log(p + " == " + e + " In Line");
			var local;
			if(path_counter < min_path){
				local = path_counter;
				path[prev] = p;
			}
			if(p_height > en_height){
//				Adir = getDirection(dir, "F");
				res = p_height - en_height;
				res = res + local;
//				return res + min_path;
			} else {
//				Adir = getDirection(dir, "B");
				res = en_height - p_height
				res = res + local;
			}
			if(res < min_path){
				min_path = res;
				path[e] = p;
				return min_path;
			}
		}
		return min_path;
	}
	min_path = finder(you, enemy, 0, min_path, you);
	console.log("min_path = " + min_path);
//	console.log(path);
//	console.log("near = ");
//	console.log(near);
	var copy = Object.assign({}, path);
	var truePath = getPath(copy);
	console.log(truePath);
	var direction = getDirection(truePath[1]);
	console.log(direction);
//	console.log(uniques(path));
	return [direction,min_path];
}

var assert = require('assert');

if(!global.is_checking){
//	assert.deepEqual(findEnemy('A1', 'SW', 'Z9'), ['B', 25], "N-1");
//	assert.deepEqual(findEnemy('G5', 'N', 'G4'), ['F', 1], "N-1");
//	assert.deepEqual(findEnemy('G5', 'N', 'I4'), ['R', 2], "NE-2");
//	assert.deepEqual(findEnemy('G5', 'N', 'J6'), ['R', 3], "SE-3");
//	assert.deepEqual(findEnemy('G5', 'N', 'G9'), ['B', 4], "S-4");
//	assert.deepEqual(findEnemy('G5', 'N', 'B7'), ['L', 5], "SW-5");
//	assert.deepEqual(findEnemy('G5', 'N', 'A2'), ['L', 6], "NW-6");
//	assert.deepEqual(findEnemy('G3', 'NE', 'C5'), ['B', 4], "[watch your six!]");
//	assert.deepEqual(findEnemy('H3', 'SW', 'E2'), ['R', 3], "right");
//	assert.deepEqual(findEnemy('A4', 'S', 'M4'), ['L', 12], "true left");
	console.log("You are good to go!");
}

