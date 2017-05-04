"use strict";
function lifeCounter(marbles, step){

	var grid = {
		grid: [],
		width: 0,
		height: 0,
		temp: [],
		orig: [],
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
		reduceLeft: function(ext_mass){
			var canDel = true;
			for(var i = 0; i < ext_mass.length; i++) {
				if(ext_mass[i][1] == 1 || ext_mass[i][0] == 1 || ext_mass[i][2] == 1){
					canDel = false;
				}
			}
			if(canDel){
				var new_mass = [];
				for(var i = 0; i < ext_mass.length; i++) {
					for(var j = 3; j < ext_mass[0].length; j++) {
						if(j == 3){
							new_mass[i] = [];
						}
						new_mass[i][j - 3] = ext_mass[i][j];
					}
				}
				return new_mass;
			} else {
				return ext_mass;
			}
		},
		reduceTop: function(ext_mass){
			var canDel = true;
			for(var i = 0; i < ext_mass[0].length; i++) {

				if(ext_mass[0][i] == 1 || ext_mass[1][i] == 1  || ext_mass[2][i] == 1){
					canDel = false;
				}
			}
			if(canDel){
				var new_mass = [];
				for(var i = 2; i < ext_mass.length; i++) {
					for(var j = 0; j < ext_mass[0].length; j++) {
						if(j == 0){
							new_mass[i - 2] = [];
						}
						new_mass[i - 2][j] = ext_mass[i][j];
					}
				}
				return new_mass;
			} else {
				return ext_mass;
//					console.log("N");
			}
		},
		reduceBot: function(ext_mass){
			var canDel = true;
			for(var i = ext_mass[0].length - 1; i >= 0; i--) {
				if(ext_mass[ext_mass.length - 1][i] == 1 || ext_mass[ext_mass.length - 2][i] == 1 || ext_mass[ext_mass.length - 3][i] == 1){
					canDel = false;
				}
			}
			if(canDel){
				var new_mass = [];
				for(var i = ext_mass.length-3; i >= 0; i--) {
					for(var j = 0; j < ext_mass[0].length; j++) {
						if(j == 0){
							new_mass[i] = [];
						}
						new_mass[i][j] = ext_mass[i][j];
					}
				}
				return new_mass;
			} else {
				return ext_mass;
			}
		},
		reduceRight: function(ext_mass){
			var canDel = true;
			for(var i = 0; i < ext_mass.length; i++) {
				if(ext_mass[i][ext_mass[0].length - 1] == 1 || ext_mass[i][ext_mass[0].length - 2] == 1 || ext_mass[i][ext_mass[0].length - 3] == 1){
					canDel = false;
				}
			}
			if(canDel){
				var new_mass = [];
				for(var i = 0; i < ext_mass.length; i++) {
					for(var j = ext_mass[0].length - 3; j >= 0; j--) {
						if(j == ext_mass[0].length - 3){
							new_mass[i] = [];
						}
						new_mass[i][j] = ext_mass[i][j];
					}
				}
				return new_mass;
			} else {
				return ext_mass;
			}
		},
		extendMass: function(new_mass){
			var ext_mass = [];


			for(var i = 0; i < new_mass.length + 4; i++) {
				for(var j = 0; j < new_mass[0].length + 4; j++) {
					if(j == 0){
						ext_mass[i] = [];
					}
					if(i == 0 || j == 0 || i > new_mass.length || j > new_mass[0].length){
						ext_mass[i][j] = 0;
					} else {
						ext_mass[i][j] = new_mass[i - 1][j - 1];
					}
				}
			}
//			ext_mass = this.reduceLeft(ext_mass);
			ext_mass = this.reduceTop(ext_mass);
			ext_mass = this.reduceBot(ext_mass);
//			ext_mass = this.reduceRight(ext_mass);
			return ext_mass;
		},
		init: function(marbles){

			this.grid = this.copy(marbles);
			this.temp = this.copy(marbles);
			this.height = this.grid[0].length;
			this.width = this.grid.length;
			this.generate();
			var count_without_extend = this.getCount();
			this.orig = this.copy(this.temp);
//
			this.grid = this.extendMass(this.copy(marbles));
			this.temp = this.extendMass(this.copy(marbles));
			this.height = this.grid[0].length;
			this.width = this.grid.length;
			this.generate();
			var count_width_extend = this.getCount();
			if(count_without_extend == count_width_extend){

				this.temp = this.orig;
				this.height = this.orig[0].length;
				this.width = this.orig.length;
			} else {
			}
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

					if(val == 0){
						if(count == 3){
							this.temp[i][j] = 1;
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

		count = grid.getCount();

		marbles = grid.temp;
	}

	console.log(count);


	return count;
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
		[1, 1, 1]
	], 999), 5, "Glider");
	assert.equal(lifeCounter([[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,1,1,0,0,1,1,1]], 999), 10, "Glider");
	assert.equal(lifeCounter([[0,0,0,0,0,0,1,0],[1,1,0,0,0,0,0,0],[0,1,0,0,0,1,1,1]], 129), 2, "Glider");

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
