"use strict";
function lifeCounter(marbles, step){

	var grid = {
		grid: [],
		width: 0,
		height: 0,
		temp: [],
		copy: function(marbles){
			var new_mass = [];
			for(var i = 0; i < marbles.length; i++) {
				for(var j = 0; j < marbles[0].length; j++) {
					if(j == 0){
						new_mass[i] = [];
					}
					new_mass[i][j] = marbles[i][j];
				}
			}
			return new_mass;
		},
		init: function(marbles){
			this.grid = this.copy(marbles);
			this.height = marbles[0].length;
			this.width = marbles.length;
			this.temp = this.copy(marbles);
		},
		getCount: function(){
			var count = 0;
			for(var i = 0; i < this.width; i++) {
				for(var j = 0; j < this.height; j++) {
					if(this.temp[i][j] == 1){
						count++;
					}
				}
			}
			return count;
		},
		generate: function(){

			for(var i = 0; i < this.width; i++) {
				for(var j = 0; j < this.height; j++) {
					var val = this.grid[i][j];
					var count = this.getNeiborhood(i, j);
//					if(i==7 && j == 1){
//						console.log(count);
//					}
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
	var count = 0;
	for(var i = 0; i < step; i++) {
		grid.init(marbles);
		console.log(grid.temp);
		grid.generate();
		count = grid.getCount();
		console.log(grid.temp);
		marbles = grid.temp;
		console.log("=======");
	}
//	console.log(grid.grid);
	console.log(count);

//	console.log(grid.getCount());
//	console.log(grid.temp);
//	console.log(marbles);
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
//	assert.equal(lifeCounter([
//		[0, 1, 0, 0, 0, 0, 0],
//		[0, 0, 1, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0]
//	], 4), 15, "Example");
//	assert.equal(lifeCounter([
//		[0, 1, 0, 0, 0, 0, 0],
//		[0, 0, 1, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 1, 1],3
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 0, 0]
//	], 4), 15, "Example");
//	assert.equal(lifeCounter([
//		[0, 1, 0, 0, 0, 0, 0],
//		[0, 0, 1, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 0, 0]
//	], 4), 15, "Example");
//	assert.equal(lifeCounter([
//		[0, 1, 0, 0, 0, 0, 0],
//		[0, 0, 1, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 1, 1],
//		[0, 0, 0, 0, 0, 0, 0],
//		[1, 1, 1, 0, 0, 0, 0]], 15), 14, "Little later");
	assert.equal(lifeCounter([
		[0, 1, 0],
		[0, 0, 1],
		[1, 1, 1]], 50), 5, "Glider");
	assert.equal(lifeCounter([[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1],
		[0, 0, 0, 0, 0],
		[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1]], 100), 16, "Stones");
	console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
