"use strict";
let opened = {
    '{': '}',
    '(': ')',
    '[': ']'
};
let closed = {
    '}': '{',
    ')': '(',
    ']': '['
};

let tagOpen = [];
let tagClose = [];
let tagopened = 0;
let tagclosed = 0;
function buildExp(from, exp) {
    if (exp.length === 0) return false;
    if (opened[exp[from]]) {
        let open = exp[from];
        tagOpen.push(open);
        let res = buildExp(from, exp.slice(from + 1));
        open === closed[tagClose.pop()] ? tagopened++ : tagopened--;
        return res;
    }
    if (closed[exp[from]]) {
        let last = exp[from];
        buildExp(from, exp.slice(from + 1), exp[from]);
        tagClose.push(last);
        tagclosed++;
        return last;
    }
    return buildExp(from, exp.slice(from + 1));
}
function check() {
    return tagopened === tagclosed;
}

function brackets(expression) {
    tagOpen = [];
    tagClose = [];
    tagopened = 0;
    tagclosed = 0;
    buildExp(0, expression);
    return check();
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(brackets("((5+3)*2+1)"), true, "Simple");
    assert.equal(brackets("{[(3+1)+2]+}"), true, "Different types");
    assert.equal(brackets("(3+{1-1)}"), false, ") is alone inside {}");
    assert.equal(brackets("[1+1]+(2*2)-{3/3}"), true, "Different operators");
    assert.equal(brackets("(({[(((1)-2)+3)-3]/3}-3)"), false, "One is redundant");
    assert.equal(brackets("2+3"), true, "No brackets, no problem");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}