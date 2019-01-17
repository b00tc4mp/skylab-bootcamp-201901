


function reverse(array) {

    var res;
    
    
    for (var i = 0; i < array.length/2; i++){

        
        res = array[array.length -i-1];

        array[array.length -1-i] = array[i];
        array[i] = res;


    } 

}


var cars = ['ferrari', 'porsche', 'mercedes','patata'];

reverse(cars);
console.log(cars)


