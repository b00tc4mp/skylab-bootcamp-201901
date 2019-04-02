function op(){ //Operation are made 
    var  result= [];
    var res = sum = mul = div = arguments[0];
    for (var i=1; i < arguments.length; i++) {
        res -= arguments[i];
        sum += arguments[i];
        mul *= arguments[i];
        div /= arguments[i].toFixed(3);
    }
    result=[sum,res,mul,div];
    alert("S:"+result[0]+" , R:"+result[1]+" , M:"+result[2]+" , D:"+result[3]);
    return result;
}
function calculator(){ 
    (typeof arguments[0] !== 'number') ? arguments=numbers(): alert("...processing");  //if calculator is called with or without arguments
    console.log(arguments[0]);
    if(typeof arguments[1] !== 'number'){ //Checks if recive just a number or more
        tot[0]=(Math.sqrt(arguments[0])).toFixed(3);
        (Number.isNaN(tot[0])) ? 
        (alert("Error, negative data") , tot[0]=0) //If negative data in Square root
        : 
        alert("Sqrt of "+arguments[0]+": "+tot[0]); 
    }else{
        tot = op.apply(this,arguments); //calls Operations handler with same arguments
    }
    var loop = true;
    while(loop){
        var option = prompt("New numbers? y/n")
        switch(option){
            case "y" :
                tot = tot.concat(calculator(numbers)); //recursive function 
                loop = false;
                break;
                        //Output => sum1, subs1, mult1, div1, sum2, subs2, mult2, div2...
            case "n" : 
                loop = false;
                alert("Bye!")
                break;
            
            default:
            alert("Error, Try again! y/n")
        }
    }
    return tot;
}
function numbers(){
    var data = [];
    var i=0;
    var option;
    while(true){
        data[i] = parseFloat(prompt("Give me a number"));
        if(typeof(data[i]) === 'number'){
            option = prompt("Another number? Yes: type 'y' No: type other key ");
            switch(option){
                case "y" :
                    i++;
                    break;
                            //Output => sum1, subs1, mult1, div1, sum2, subs2, mult2, div2...                
                default:
                    alert("...processing");
                    return data;
            }
        }
    }   
}
var totalrecord = calculator();
console.log(totalrecord);


