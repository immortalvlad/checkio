"use strict";

function breakRings(rings){
	//making ring list  ex : [1, 2, 3...]
	var max_ring = 0,
			ring_list = [
			];
	for(var i = 0; i < rings.length; i += 1) {
		max_ring = Math.max(max_ring, Math.max(rings[i][0], rings[i][1]));
	}
	for(var i = 1; i <= max_ring; i += 1) {
		ring_list.push(i);
	}
	//main

	function ring_crash(rest_chains, ring_list, crash, min_crash, del){
//		console.log("crash="+crash);
//		console.log("min_crash ="+min_crash);
//		console.log("rest_chains"+rest_chains);
//		console.log("ring_list"+ring_list);
		for(var i = 0; i < ring_list.length; i += 1) {
			var ring = ring_list[i],
					wk_chains = [
					];
//			console.log("i ="+i);
//			del = del.slice();
			var del2 = del + "-";
			console.log(del+"ring_list i="+i+"; " + ring_list);
			console.log(del + "ring =" + ring);
			for(var j = 0; j < rest_chains.length; j += 1) {
				var rc = rest_chains[j];
				if(rc[0] !== ring && rc[1] !== ring){
					wk_chains.push(rc)
				}
			}
			console.log(wk_chains);
			if(!wk_chains.length){
				if(crash < min_crash){
					min_crash = crash;
				}
				console.log("=================min = " + min_crash);
				return min_crash;
			}
			console.log(del+"slice i="+i+" ("+ring_list.slice(i + 1)+")");
			min_crash = ring_crash(wk_chains.slice(), ring_list.slice(i + 1), crash + 1, min_crash, del2);
		}
		return min_crash;
	}
	var c =  ring_crash(rings, ring_list, 1, 99, "-");
	console.log("result="+c);
	return c;
}

var assert = require('assert');

if(!global.is_checking){
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
		]
	]), 3, "Example");
//    assert.equal(breakRings([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 6]]), 3, "Example");
	//  assert.equal(breakRings([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]), 3, "All to all");
	// assert.equal(breakRings([[5, 6], [4, 5], [3, 4], [3, 2], [2, 1], [1, 6]]), 3, "Chain");
	//assert.equal(breakRings([[8, 9], [1, 9], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 7]]), 5, "Long chain");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}