"use strict";

function breakRings(rings){
	var max_ring = 0;
	for(var i = 0; i < rings.length; i++) {
		var ring = Math.max(rings[i][0], rings[i][1]);
		if(max_ring < ring){
			max_ring = ring;
		}
	}
	var rings_count = [
	];
	for(var i = 1; i <= max_ring; i++) {
		rings_count.push(i);
	}
	function ringCrach(rest_rings, rings_count, chain, max_chain){
		for(var i = 0; i < rings_count.length; i++) {
			var ring = rings_count[i];
			var walk_rings = [
			];
			for(var j = 0; j < rest_rings.length; j++) {
				if(rest_rings[j][0] != ring && rest_rings[j][1] != ring){
					walk_rings.push(rest_rings[j]);
				}
			}
//			console.log(walk_rings);
			if(!walk_rings.length){
				if(chain < max_chain){
					max_chain = chain;
				}
//				console.log("==="+max_chain);
				return max_chain;
			}
			max_chain = ringCrach(walk_rings, rings_count.slice(i + 1), chain + 1, max_chain);
		}
		return max_chain;
	}
	var c = ringCrach(rings, rings_count, 1, 99);
//	console.log(c);
//	console.log(rings_count);
	return c;
}

var assert = require('assert');

if(!global.is_checking){
//	assert.equal(breakRings([
//		[
//			1,
//			2
//		],
//		[
//			2,
//			3
//		],
//		[
//			3,
//			4
//		]
//	]), 1, "Example");
	assert.equal(breakRings([
		[
			1,
			2
		],
		[
			2,
			3
		],
		[
			3,
			4
		],
		[
			4,
			5
		],
		[
			5,
			6
		],
		[
			4,
			6
		]
	]), 3, "Example");
	assert.equal(breakRings([
		[
			1,
			2
		],
		[
			2,
			3
		],
		[
			3,
			4
		],
		[
			4,
			5
		],
		[
			5,
			6
		],
		[
			4,
			6
		]
	]), 3, "Example");
	assert.equal(breakRings([
		[
			1,
			2
		],
		[
			1,
			3
		],
		[
			1,
			4
		],
		[
			2,
			3
		],
		[
			2,
			4
		],
		[
			3,
			4
		]
	]), 3, "All to all");
	assert.equal(breakRings([
		[
			5,
			6
		],
		[
			4,
			5
		],
		[
			3,
			4
		],
		[
			3,
			2
		],
		[
			2,
			1
		],
		[
			1,
			6
		]
	]), 3, "Chain");
	assert.equal(breakRings([
		[
			8,
			9
		],
		[
			1,
			9
		],
		[
			1,
			2
		],
		[
			2,
			3
		],
		[
			3,
			4
		],
		[
			4,
			5
		],
		[
			5,
			6
		],
		[
			6,
			7
		],
		[
			8,
			7
		]
	]), 5, "Long chain");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}