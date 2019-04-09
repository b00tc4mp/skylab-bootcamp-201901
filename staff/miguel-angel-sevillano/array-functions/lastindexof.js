


var array=[2,4,5,5,3]


function lastindex(array,item,start){
    var temp=undefined

    if(start === undefined){
        for(let i=0;i<array.length;i++){
            if(array[i] == item){
                temp = i
            }
        }
        if(temp !== undefined){
            return temp
        }
        else{
            return-1
        }
    }
    else{
        for(let j=start;j<array.lenght;j++){
            if(array[i] == item){
                temp= i;
            }
        
        }
        if(temp !== undefined){
            return temp
        }
        else{
            return-1
        }
    }



}

lastindex(array,5)