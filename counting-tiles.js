"use strict";


class CountTiles {

    constructor(radius) {
        this.grid = [];
        this.radius = radius;
        this.ceilRadius = Math.ceil(radius);
    }

    calculate() {
        let full = [];
        let notFull = [];
        for (let x = 0; x <= this.ceilRadius; x++) {
            for (let y = 0; y <= this.ceilRadius; y++) {
                let {allInCirle, atLeastOne} = this.checkDistance(x, y);
                if (allInCirle) {
                    full.push([x, y]);
                }
                if (atLeastOne) {
                    notFull.push([x, y]);
                }
            }
        }

        let fullCeils = full.length * 4;
        let notFullCeils = (notFull.length - full.length) * 4;
        return [fullCeils, notFullCeils];

    }

    checkDistance(x, y) {
        let ceil = this.grid[x][y];
        let allInCirle = true;
        let atLeastOne = false;
        for (let i = 0; i < ceil.length; i++) {
            let bx = ceil[i][0];
            let by = ceil[i][1];
            let res = this.getDistance(0, 0, bx, by);
            if (res > this.radius) {
                allInCirle = false;
            }
            if (res < this.radius) {
                atLeastOne = true;
            }
        }
        return {allInCirle, atLeastOne};
    }


    buildGrid() {
        for (let x = 0; x <= this.ceilRadius; x++) {
            for (let y = 0; y <= this.ceilRadius; y++) {
                this.grid[x] = this.grid[x] ? this.grid[x] : [];
                this.grid[x][y] = this.grid[x][y] ? this.grid[x][y] : [];
                this.grid[x][y] = [
                    [x, y],
                    [x, y + 1],
                    [x + 1, y + 1],
                    [x + 1, y]
                ];
            }
        }
    }

    getDistance(ax, ay, bx, by) {
        return Math.sqrt(Math.pow((bx - ax ), 2) + Math.pow((by - ay ), 2));
    }


}

function countingTiles(radius) {
    let countTiles = new CountTiles(radius);
    countTiles.buildGrid();
    return countTiles.calculate();
}


let assert = require('assert');

if (!global.is_checking) {
    assert.deepEqual(countingTiles(2), [4, 12], "N=2");
    assert.deepEqual(countingTiles(3), [16, 20], "N=3");
    assert.deepEqual(countingTiles(2.1), [4, 20], "N=2.1");
    assert.deepEqual(countingTiles(2.5), [12, 20], "N=2.5");

    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
