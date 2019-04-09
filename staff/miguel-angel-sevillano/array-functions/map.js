/**This function returns a new arrar whoth the results passed by the callback 
 * 
 * @param {*} array array used to itinerate
 * @param {*} callback the function that defines what you want to do with each element of the array
 * @param {*} value the vaue you want to pass by
 */




var test =[2,4,6,8]

function map(array,callback,value){
  
  var newArray=[],acc,item;
  acc=value;

       for(var i=0;i<array.length;i++){
        
        if(value=== undefined){
            acc =array[i]
            item = callback(acc,array[i])
            newArray[i]=item
        }
        else{
            item = callback(acc,array[i])
            newArray[i]=item
        }
         
       }
       return newArray;
  }

map(test,function(array,acc){return acc+array})