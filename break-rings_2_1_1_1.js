function breakRings(rings){
    function removeRing(rings, ring){
        var result = []
        for(var r in rings){
            if(r[0] != ring && r[1] != ring) result.push(r)
        }
        return result
    }
    if(rings.length == 0){
		return 0;
	};
    var n0 = breakRings(removeRing(rings, rings[0][0])) + 1
    var n1 = breakRings(removeRing(rings, rings[0][1])) + 1
    return Math.min(n0, n1);
}