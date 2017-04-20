function breakRings(rings){
​
  var rings = count(rings);
  let number;
  var MAX = max(rings.flat);
  var step = 0;
  while ( MAX.max_value > 0 ) {
    
    number = Number(evaluate());
    rings = count(broken(rings,number));
    MAX = max(rings.flat);
    step ++;
  }
​
  return step;
​
  function findCompanion(num){
    for ( let i = 0 ; i < rings.value.length ; i ++ ) {
      if ( rings.value[i].indexOf(num) !== -1 ) return rings.value[i].join('').replace(num,'');
    }
  }
​
  function evaluate(){
    if ( MAX.min ) {
      return findCompanion(MAX.min[0]);
    } else {
      return MAX.max_number[0];
    }
  }
​
  function broken(rings,number){
    var arr = [];
    var collection = null;
    rings.value.forEach((item ,index) => {
      item.forEach((it ,i)=> {
        if ( it === number ) rings.value[index][i] = 0;
      });
    });
    rings.flat = flat([rings.value]);
    collection = max(rings.flat).collection;
    rings.value.forEach(item => {
      if ( !(item[0] === 0 || item[1] === 0) ) {
        arr.push(item);
      }
    });
    return arr;
  }
​
  function max(str){
    var str = str.split(',');
    var temp = [];
    var temp_val = [];
    str.forEach(item => {
      if (item !== '0' ){
        if ( !temp[item] ) {
          temp[item] = 1;
        } else {
          temp[item] ++;
        }
      }
    });
    temp.forEach((item,index) => {
      if ( item ) {
        if ( temp_val[item] ) {
          temp_val[item].push(index);
        } else {
          temp_val[item] = [];
          temp_val[item].push(index);
        }
      }
    });
    if ( temp_val[1] ) {
          return {max_value:temp_val.length - 1,max_number:temp_val[temp_val.length - 1],collection:temp,min:temp_val[1]}
        }
        if ( temp_val[2] ) {
          return {max_value:temp_val.length - 1,max_number:temp_val[temp_val.length - 1],collection:temp,min:temp_val[2]}
        }
      
      return {max_value:temp_val.length - 1,max_number:temp_val[temp_val.length - 1],collection:temp,min:null};
  }
  
  function count(arr){
​
    var count = {
      value:[]
    };
    arr.forEach(item => {
        count.value.push(item);
    });
    count.flat = flat([count.value]);
​
    return count;
  }
​
  function flat(matrix){
    return matrix.map(item => {
      return item.join(',')
    }).join(',');
  }
}