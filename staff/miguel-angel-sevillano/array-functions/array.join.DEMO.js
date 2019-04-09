var test=["hola","que","tal"]

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

join(test)
join(test,' ')
join(test,'-')