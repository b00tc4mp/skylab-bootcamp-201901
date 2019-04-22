/**This function returns a new array filtering the parametres providen by callback
 * 
 * @param {array} array The array to iterate for 
 * @param {Function} callback The callback function 
 */
function filter(array,callback){
    if (!(array instanceof Array)) throw TypeError('is not an array');
    if (typeof callback !== 'function') throw new TypeError('is not a function');

var newarr=[]
var result=Boolean
var n=0


        for(var i=0;i<array.length;i++){
             
            result =callback(array[i])
            if(result== true){ 
                newarr[n]= array[i]
                n++
            }    
        }
  return newarr;
}


filter(a,function(v){ return v == 3})