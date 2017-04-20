"use strict";


function getCountOfRings(rings) {
    return rings.reduce(function (ringCount, ringConnection) {
        var currentRingNumber = Math.max(ringConnection[0], ringConnection[1]);

        return Math.max(ringCount, currentRingNumber);
    }, 0);
}

function createRingMatrix(rings) {
    var ringCount = getCountOfRings(rings);

    var matrix = new Array(ringCount)
        .fill([])
        .map(function () {
            return new Array(ringCount).fill(0)
        });

    rings.forEach(function (ring) {
        matrix[ring[0] - 1][ring[1] - 1] = 1;
        matrix[ring[1] - 1][ring[0] - 1] = 1;
    });

    return matrix;
}


function getMinimalRing(matrix) {
    var maxConnectionsCount = matrix.length;
    var rings = undefined;
    matrix.forEach(function (ringConnections, index) {
        var connectionsCount = ringConnections.reduce(function (prev, curr) {
            return prev + curr
        });

        if (maxConnectionsCount > connectionsCount && connectionsCount > 0) {
            maxConnectionsCount = connectionsCount;
            rings = index;
        }
    });

    return rings;
}

function makeBreakdown(matrix, brokenRings) {
    var ring = getMinimalRing(matrix);

    if (ring === undefined) {
        return brokenRings;
    }

    var newMatrix = JSON.parse(JSON.stringify(matrix));
    matrix[ring].forEach(function(value, index) {
        if (value == 1) {
            brokenRings++;
            removeRing(newMatrix, index);
        }
    });

    return makeBreakdown(newMatrix, brokenRings);
}

function removeRing(matrix, ringIndex) {
    return matrix.map(function (ringConnections, index) {
        if (ringIndex == index) {
            return ringConnections.fill(0);
        }
        ringConnections[ringIndex] = 0;

        return ringConnections;
    });
}

function breakRings(rings) {
    var matrix = createRingMatrix(rings);
    
    return makeBreakdown(matrix, 0);
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(breakRings([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 6]]), 3, "Example");
    assert.equal(breakRings([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]), 3, "All to all");
    assert.equal(breakRings([[5, 6], [4, 5], [3, 4], [3, 2], [2, 1], [1, 6]]), 3, "Chain");
    assert.equal(breakRings([[8, 9], [1, 9], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 7]]), 5, "Long chain");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}