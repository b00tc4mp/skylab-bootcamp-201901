


function find(arr,func) {

    
    
    for (var i = 0; i < arr.length; i++) 
    
    if(arr[i] == func[arr[i]])
    {

        console.log(arr[i])
    }
    
    
}


var cars = ['ferrari', 'porsche', 'mercedes'];

find(cars,function(v){ v='ferrari'  });

