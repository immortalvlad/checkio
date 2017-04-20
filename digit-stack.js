"use strict";

function digitStack(commands){
	var stack = [];
	var sum = 0;
	var getTypeCommand = function(com){
		var arr = com.split(" ");
		var command = arr[0];
		var val;
		var returnVal = 0;
		if(arr.length > 1){
			val = arr[1];
		}
		switch (command) {
			case "PUSH":
				if(typeof val !="undefined"){
					stack.push(val);
				}
				break;
			case "POP":
				if(stack.length > 0){
					returnVal = stack.pop();
				}else{
					returnVal = 0;
				}
				break;
			case "PEEK":
				if(stack.length > 0){
					returnVal = stack[stack.length - 1];
				} else {
					returnVal = 0;
				}
				break;

		}
		return returnVal;
	};
	for(var i = 0; i < commands.length; i++) {
		var row_com = commands[i];
		sum = parseInt(getTypeCommand(row_com)) + sum;

	}
	return sum;

}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(digitStack(["PUSH 3", "POP", "POP", "PUSH 4", "PEEK",
		"PUSH 9", "PUSH 0", "PEEK", "POP", "PUSH 1", "PEEK"]),
			8, "Example");
	assert.equal(digitStack(["POP", "POP"]), 0, "pop, pop, zero");
	assert.equal(digitStack(["PUSH 9", "PUSH 9", "POP"]), 9, "Push the button");
	assert.equal(digitStack([]), 0, "Nothing");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}