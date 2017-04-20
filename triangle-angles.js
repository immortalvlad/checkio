"use strict";

function triangleAngles(a, b, c){
	function isTriangle(){
		if((a < b + c) && (b < a + c) && (c < a + b)){
			return true;
		}

		return false;
	}
	function radToDeg(rad){
		return rad / Math.PI * 180;
	}

	if(!isTriangle()){
		return [0, 0, 0];
	}
	var Aa = Math.round(radToDeg(Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c))));
	var Ab = Math.round(radToDeg(Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))));
	var Ac = Math.round(radToDeg(Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b))));
	var res = [Aa, Ab, Ac];
	res.sort(function(a, b){
		return a > b;
	});
	console.log(res);
	return res;
}

var assert = require('assert');

if(!global.is_checking){
	assert.deepEqual(triangleAngles(4, 4, 4), [60, 60, 60], "All sides are equal");
	assert.deepEqual(triangleAngles(3, 4, 5), [37, 53, 90], "Egyptian triangle");
	assert.deepEqual(triangleAngles(2, 2, 5), [0, 0, 0], "It's can not be a triangle");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
