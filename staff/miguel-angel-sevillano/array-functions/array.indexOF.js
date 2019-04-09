var test=[2,4,6,8,6]

function indexOf(array,item){
    for(let i=0;i<array.length;i++){
        
        if(array[i] == item){
            return i;
        }
    }
}

console.log(indexOf(test,6))