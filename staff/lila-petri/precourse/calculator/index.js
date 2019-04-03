//Calculator
function calculator(){
    let numbers=askUser();
    let results=[];
    if(numbers.length>1){
    let sum=plusSign(numbers);
    results.push(`Sum = ${sum}`);
    let subtraction=minusSign(numbers);
    results.push(`Sub = ${subtraction}`);
    let multiplication=multiplicationSign(numbers);
    results.push(`Mult = ${multiplication}`);
    let division=divisionSign(numbers);
    results.push(`Div = ${division}`);

    }else{
    let square =squareRoot(numbers); 
    results.push(`Squ = ${square}`);

    }
    return alert('results=['+results+']');
    }
    
function askUser(){
        let i=0;
        let valuesArray=[];
        do{
            let value=prompt('Enter a value');
            if(isNaN(value)){
                alert('This parameter is incorrect, please try again');
            }else{  
                valuesArray[i]=Number(value);
                i++;
                var condition=prompt('New numbers? y/n');
            }
            
        }while(condition!=='n');
            return valuesArray;

    }
function plusSign(number){
    let plus=0;
    for(let i=0; i<number.length;i++){
        plus= plus + number[i];
    }
    return plus;
}
function minusSign(number){
    let minus=number[0];
    for(let i=1; i<number.length;i++){
        minus= minus - number[i];
    }
    return minus;
}
function multiplicationSign(number){
    let mult=number[0];
    for(let i=1; i<number.length;i++){
        mult= mult * number[i];
    }
    return mult;
}
function divisionSign(number){
    let div=number[0];
    for(let i=1; i<number.length;i++){
        div= div / number[i];
    }
    return div.toFixed(3);
}
function squareRoot (number){
    return Math.sqrt(number[0]).toFixed(3);
}
      
    calculator();
    
   
   
    