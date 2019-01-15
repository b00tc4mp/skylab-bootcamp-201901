


function fill(arr,func) {

    var res =[];
    
    for (var i = 0; i < arr.length; i++) 
    
    res[i] = func(arr[i]);
    return res;
    
}


var cars = ['ferrari', 'porsche', 'mercedes'];

console.log(cars);

cars = fill(cars,function(v){ return v='ferrari'  });

console.log(cars);

