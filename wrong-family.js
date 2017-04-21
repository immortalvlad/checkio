"use strict";
function isFamily(tree){

	function node(name){
		this.name = name;
		this.childrens = [];
		this.parents = [];
		this.setChildren = function(chil){
			var childs = this.getChildrens();
			if(childs.indexOf(chil.name) == -1){
				this.childrens.push(chil);
			}
		};
		this.getChildrens = function(){
			var res = [];
			for(var i in this.childrens) {
				var obj = this.childrens[i];
				res.push(obj.name);
			}
			return res;
		};
		this.setParent = function(par){
			var parents = this.getParents();
			if(parents.indexOf(par.name) == -1){
				this.parents.push(par);
			}
		};
		this.getParents = function(){
			var res = [];
			for(var i in this.parents) {
				var obj = this.parents[i];
				res.push(obj.name);
			}
			return res;
		};
		return this;
	}
	var getunicNames = function(){
		var unic_names = [];
		for(var i = 0; i < tree.length; i++) {
			var obj = tree[i];
			if(unic_names.indexOf(obj[0]) == -1){
				unic_names.push(obj[0]);
			}
			if(unic_names.indexOf(obj[1]) == -1){
				unic_names.push(obj[1]);
			}
		}
		return unic_names;
	};
	var buildFamily = function(unic_names){
		for(var i = 0; i < unic_names.length; i++) {
			var name = unic_names[i];
			var obj = new node(name);
			for(var j = 0; j < tree.length; j++) {
				var row = tree[j];
//				console.log(row);
				if(row[0] == name){
					var new_child = new node(row[1]);
					obj.setChildren(new_child);
				}

			}
			for(var j = 0; j < tree.length; j++) {
				var row = tree[j];
				if(row[1] == name){
					var new_parent = new node(row[0]);
					obj.setParent(new_parent);
				}

			}
			obj_tree.push(obj);
		}
	};
	var check = function(){
		var count_head = 0;
		for(var i = 0; i < obj_tree.length; i++) {
			var obj = obj_tree[i];
			var childs = obj.getChildrens();
			var parents = obj.getParents();
//			console.log(obj.name + " has childrens: ");
//			console.log(obj.getChildrens());
//			console.log(obj.name + " has parents: ");
//			console.log(obj.getParents());
			if(parents.length > 1){
				return false;
			}
			if(parents.length == 0){
				count_head++;
			}
			for(var j = 0; j < childs.length; j++) {
				var el = childs[j];
				if(parents.indexOf(el) != -1){
					return false;
				}
			}

		}
		if(count_head > 1){
			return false;
		}
		return true;
	};

	var obj_tree = [];
	
	var unic_names = getunicNames();
	
	buildFamily(unic_names);
	
	var result = check();
	
	if(check()){
		return true;
	}
	return false;


}

var assert = require('assert');

if(!global.is_checking){
	assert.equal(isFamily([
		['Logan', 'Mike'],
		['Logan', 'Jack'],
		['Mike', 'Logan']
	]), false, 'Can you be a father for your father?');
	assert.equal(isFamily([
		['Logan', 'Mike']
	]), true, 'One father, one son');
	assert.equal(isFamily([
		['Logan', 'Mike'],
		['Logan', 'Jack']
	]), true, 'Two sons');
	assert.equal(isFamily([
		['Logan', 'Mike'],
		['Logan', 'Jack'],
		['Mike', 'Alexander']
	]), true, 'Grandfather');
	assert.equal(isFamily([
		['Logan', 'Mike'],
		['Logan', 'Jack'],
		['Mike', 'Logan']
	]), false, 'Can you be a father for your father?');
	assert.equal(isFamily([
		['Logan', 'Mike'],
		['Logan', 'Jack'],
		['Mike', 'Jack']
	]), false, 'Can you be a father for your brather?');
	assert.equal(isFamily([
		['Logan', 'William'],
		['Logan', 'Jack'],
		['Mike', 'Alexander']
	]), false, 'Looks like Mike is stranger in Logan\'s family');
	console.log("Looks like you know everything. It is time for 'Check'!");
}