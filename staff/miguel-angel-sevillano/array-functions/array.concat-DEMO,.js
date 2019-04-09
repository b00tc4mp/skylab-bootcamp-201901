
var a=[1,2,3,4]
var b=[5,6,7,8]

function concat ()  {
    var i, j, k = 0, newarray = [];
 
    for (i = 0; i < arguments.length; i++){
        for (j = 0; j < arguments[i].length; j++){
            newarray[k] = arguments[i][j];
            k++;
        }
    }
    return newarray;
 }

 console.log(concat(a,b))