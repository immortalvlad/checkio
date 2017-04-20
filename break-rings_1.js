"use strict";

function breakRings(edges){
    var vertices = notisolated( edges )
    var n = len( vertices );
    var lb = 0
    var ub = n - 1
     bnb( edges , vertices , lb , ub )
	 
    return 1;
}
function notisolated (edges){
//	  return list( set.union( *edges ) )
}
function remove ( edges , vertex){
//	 return list( filter ( lambda edge : vertex not in edge , edges ) )
}
function neighbours (edges , vertex){
//	 return [ u if v == vertex else v  for ( u , v ) in edges if u == vertex or v == vertex ]
}
function bnb ( edges , vertices , lb , ub){
	    if (!edges) {
			return lb;
		} 
    
    while (true) {
  
        if ( (lb + 1) >= ub) {
			return ub;
		}
        
      var rem  = remove( edges , vertices[0] );
        
        var val = bnb( rem, vertices[1] , lb + 1 , ub )

      
        if (val < ub){
			ub = val;
		}
        
		var neig = neighbours( edges , vertices[0] );
            
        for (var u in neig ){
			lb += 1;
            edges = remove( edges , u );
		}

        if (!edges){
			return min( lb , ub );
		} 
        
        vertices = notisolated( edges )
	}
}
var assert = require('assert');

if (!global.is_checking) {
    assert.equal(breakRings([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 6]]), 3, "Example");
    assert.equal(breakRings([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]), 3, "All to all");
    assert.equal(breakRings([[5, 6], [4, 5], [3, 4], [3, 2], [2, 1], [1, 6]]), 3, "Chain");
    assert.equal(breakRings([[8, 9], [1, 9], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 7]]), 5, "Long chain");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}