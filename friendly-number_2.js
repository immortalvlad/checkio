"use strict";

function friendlyNumber(number, options){
	var or = number;
	
	if(!options){
		options = {};
	}
	if(!options.base){
		options.base = 1000;
	}
	if(!options.decimals){
		options.decimals = 0;
	}
	if(!options.suffix){
		options.suffix = '';
	}
	if(!options.powers){
		options.powers = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
	}
	    // At first, decompose the number to value and exponent.
    for(var e = 0; e < options.powers.length; e++){
        if(Math.abs(number) < Math.pow(options.base, e + 1)) break;
    }
    e = Math.min(e, options.powers.length - 1);
    number /= Math.pow(options.base, e);
    // Then, round it
    if(options.decimals == 0){
        number = number < 0 ? -Math.floor(-number) : Math.floor(number);
    }
    // At last, format it
    return number.toFixed(options.decimals) + options.powers[e] + options.suffix;
}

var assert = require('assert');
//1 000 000 0Y
//1 000 000 00 Y
if(!global.is_checking){
    assert.equal(friendlyNumber(102), '102', "102");
	assert.equal(friendlyNumber(10000), '10k', "10k");
    assert.equal(friendlyNumber(12341234, {decimals: 1}), '12.3M', "12.3M");
    assert.equal(friendlyNumber(12461, {decimals: 1}), '12.5k', "12.5k");
    assert.equal(friendlyNumber(1024000000, {base: 1024, suffix: 'iB'}), '976MiB', "976MiB");
    assert.equal(friendlyNumber(-150,{"base":100,"powers":["","d","D"]}), '-1d', "-1d");
	assert.equal(friendlyNumber(255000000000, {"powers": ["", "k", "M"]}), '255000M', "255000M");
	assert.equal(friendlyNumber(1e+32, {}), '100000000Y', "100000000Y");
	assert.equal(friendlyNumber(4294967297,{"base":2,"powers":["p0","p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21","p22","p23","p24","p25","p26","p27","p28","p29","p30","p31"]}), '2p31', "2p31");

	console.log("Tests and earn cool rewards!");
}
