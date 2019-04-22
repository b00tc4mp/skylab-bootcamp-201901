/**This function returns a new arrar whoth the results passed by the callback 
 * 
 * @param {*} array array used to itinerate
 * @param {*} callback the function that defines what you want to do with each element of the array
 * @param {*} value the vaue you want to pass by
 */




function map(array,callback,value){
  if(!(array instanceof Array))throw TypeError('its not an array')
  if (typeof callback !== 'function') throw new TypeError('is not a function');

  
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

