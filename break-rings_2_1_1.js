"use strict";
function breakRings(rings){
    var vertices = [];
    function tryn(n, pos, vset) {
        if (n == 0) {
            for (var i = 0; i < rings.length; ++i) {
                if (vset.indexOf(rings[i][0]) < 0 && vset.indexOf(rings[i][1]) < 0) return false;
            }
            return true;
        }
        for (var i = pos + 1; i < vertices.length; ++i) {
            if (tryn(n - 1, i, vset.concat(vertices[i]))) return true;
        }
        return false;
    }
    rings.forEach(function (edge) {
        edge.forEach(function (vertex) {
            if (vertices.indexOf(vertex) < 0) vertices.push(vertex);
        });
    });
    for (var n = 1; n <= vertices.length; ++n) {
        if (tryn(n, -1, [])) return n;
    }
}