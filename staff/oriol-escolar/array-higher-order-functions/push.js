


function push(arr, value) {
    
    for(var i=0;i<arr.length;i++){
        arr[arr.length] = value[i];
    }

}


var cars = ['ferrari', 'porsche', 'mercedes'];
pushValue = ['si','no'];

console.log(cars);

push(cars,pushValue);

console.log(cars);

