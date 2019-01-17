


function reverse(array) {

    var res = [];
    
    
    for (var i = 0; i < array.length; i++){

        
        res[i] = array[array.length -i-1];


    } 

    for(var i=0; i<array.length;i++)
    {

        array[i]=res[i];


    }
    
    
    
    //return array;
}


var cars = ['ferrari', 'porsche', 'mercedes','patata'];

reverse(cars);


