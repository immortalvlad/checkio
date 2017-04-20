"use strict";
var isInt = function(n) { 
    var res =  parseInt(n) == n ;
     return res;
    };
function mostWanted(data) {
   
    data = data.toLowerCase();
    data = data.match(/([A-z])/g);
   // console.log(data);
   // data = data.split("");
    var len = data.length;
    var buf = [];
    for(var i=0; i < len; i++){
          var  char = data[i];
         if(typeof buf[char] == "undefined"){
             buf[char] = 1;
         }else{
             buf[char] = buf[char] + 1;
        }
    }
    var max = -1;
    var k = [];
    for(var key in buf){
        if(buf[key] > max ){
            max = buf[key];
        }
    }
    for(var key in buf){
        if(buf[key] == max){
              k.push(key);
        }
    }
    var max_letter ="";    
    if(k.length> 1){
        max_letter = k[0];
        for(var i =1; i< k.length; i++){
             if(k[i] < max_letter){
                    max_letter = k[i]; 
                }
        }
    }else{
        max_letter = k[0];
    }
    //console.log("max letter= "+ max_letter);

    return max_letter;
    
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(mostWanted("Hello World!"), "l", "1st example");
    assert.equal(mostWanted("How do you do?"), "o", "2nd example");
    assert.equal(mostWanted("One"), "e", "3rd example");
    assert.equal(mostWanted("Oops!"), "o", "4th example");
    assert.equal(mostWanted("AAaooo!!!!"), "a", "Letters");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
