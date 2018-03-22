"use strict";

function hammingDistance(n, m) {
    n = n.toString(2);
    m = m.toString(2);
    let max =  n.length < m.length ? m.length : n.length;
    n = addZero(n,max);
    m = addZero(m,max);
    return process(n, m);
}
function process(mass1, mass2) {
    let mass= [];
    for (let i = 0; i < mass1.length; i++) {
        mass.push(mass1[i] ^ mass2[i]);
    }
    return mass.reduce((count,val)=>{
        return val + count;
    },0);
}
function addZero(number,max) {
    let nMass = number.split('');
    for (let i = nMass.length; i < max; i++) {
        nMass.splice(0, 0, '0');
    }
    return nMass;
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(hammingDistance(117, 17), 3, "First example");
    assert.equal(hammingDistance(1, 2), 2, "Second example");
    assert.equal(hammingDistance(16, 15), 5, "Third example");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
