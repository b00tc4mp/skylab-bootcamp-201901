
/**This function join each element of an array passed by applaying arguments 
 * 
 * @param {*} array the array you want to pass by
 * @param {*} item  without item it returns all the array with items separated by "," with(' ') will join all , with('-')
 * will separate each item by -
 */

function join(array,item){
    var temp="";

if(item === undefined){
    for(let i=0;i<array.length;i++){
         temp += array[i]
         if(i<array.length-1){
             temp+=","
         }
         
    }
}
if(item === ' '){
    for(let i=0;i<array.length;i++){
         temp += array[i]
         
    }
}
if(item === '-'){
    for(let i=0;i<array.length;i++){
         temp += array[i]
         if(i<array.length-1){
             temp+="-"
         }
         
    }
}
    console.log(temp)
}
