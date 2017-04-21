"use strict";
function lifeCounter(marbles, step){
	var ss = marbles.slice();
	function Grid(){

		var grid = {
			grid: [],
			width: 0,
			height: 0,
			temp: [],
			copy: function(){
				var new_mass = [];
				for(var i = 0; i < marbles.length; i++) {
					for(var j = 0; j < marbles.length; j++) {
						if(j == 0){
							new_mass[i] = [];
						}
						new_mass[i][j] = marbles[i][j];
					}
				}
			},
			init: function(){
				this.grid = marbles;
				this.height = marbles.length;
				this.width = this.height;
				this.temp = marbles.slice();
			},
			generate: function(){

				for(var i = 0; i < this.width; i++) {
					for(var j = 0; j < this.height; j++) {
						var val = this.grid[i][j];
						var count = this.getNeiborhood(i, j);
						if(val == 0){
							if(count == 3){
								this.temp[i][j] = 1;
//							console.log(i + " "+ j);
							}
						}
						if(val == 1){
							if(count < 2 || count > 3){
								this.temp[i][j] = 0;
							}
						}
					}
				}
			},
			getNeiborhood: function(x, y){
				var count = 0;
				for(var i = -1; i < 2; i++) {
					for(var j = -1; j < 2; j++) {
						var pos_x = x + i;
						var pos_y = y + j;
						if((pos_x == x && pos_y == y) == false){
							if((pos_x >= 0 && pos_x <= this.width - 1) && (pos_y >= 0 && pos_y <= this.height - 1)){
								if(this.grid[pos_x][pos_y] == 1){
									count++;
								}
							}
						}


					}
				}
				return count;
			}
		};
		grid.init(marbles);
		return grid;
	}
	var grid = new Grid();
	grid.generate();
	console.log(grid.temp);
	console.log(marbles);
//	var c = grid.getNeiborhood(1, 0);
//	console.log(c);
//	grid.init(marbles.slice());
//	console.log(new_gen);
//	console.log(marbles);
//	console.log(ss);
//	var c = grid.getNeiborhood(1, 0);
//	console.log(c);
	return 0.5
}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(lifeCounter([
		[0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0]
	], 4), 15, "Example");
	assert.equal(lifeCounter([[0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0]], 15), 14, "Little later");
	assert.equal(lifeCounter([[0, 1, 0],
		[0, 0, 1],
		[1, 1, 1]], 50), 5, "Glider");
	assert.equal(lifeCounter([[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1],
		[0, 0, 0, 0, 0],
		[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1]], 100), 16, "Stones");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
