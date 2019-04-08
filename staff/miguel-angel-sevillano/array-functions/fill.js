
var a=[2,3,4,5]

function fill(array,item,start,end){
    

    if(typeof item === "number" && typeof start === "number" && typeof end === "number"){
        for(let i=start;i<end+1;i++){
            array[i]=item;
        }
    }

    if(typeof item === "number" && typeof start === "number" && end === undefined){
        for(let i=start;i<array.length;i++){
            array[i]=item;
        }
    }


    if(typeof item === "number" && start === undefined && end === undefined){
        for(let i=0;i<array.length;i++){
            array[i]=item;
        }
    }
   
}



fill(a,3,0,3)
console.log(a)
