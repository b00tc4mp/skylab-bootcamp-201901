//CALCULADORA + - * / by Didac Torres

/*Esta caluladora funciona de la siguiente manera:
	-Si recibe un numero, sea en la posicion que sea, realiza la raiz.
	-Si recibe dos numeros, realiza las 4 operaciones basicas.
	-Si no recibe almenos un numero, muestra una señal de error.
*/

myCalc = (num1,num2) => {
	
	if(!isNaN(num1)){
		
		if(num1===num2 || isNaN(num2)){
			return alert(`La raiz cuadrada de ${num1} es: ` + esEntero(Math.sqrt(num1)));
		}
		else if(!isNaN(num2)){
			var resArray=[];
		resArray[0]= '-La suma es: ' + esEntero((num1+num2));
		resArray[1]= '-La resta es: ' + esEntero((num1-num2));
		resArray[2]= '-La multiplicacion es: ' + esEntero((num1*num2));
		resArray[3]= '-La division es: ' + esEntero((num1/num2));
		return alert(`El resultado de sus operaciones con ${num1} y ${num2}:\n`+resArray);
		}
		else{
			return console.log('Error en los parametros, no son numeros');
		}
		
	}
	else if(isNaN(num1)){
		
		if(!isNaN(num2)){
			return console.log(`La raiz cuadrada de ${num2} es: ` + esEntero(Math.sqrt(num2)));
		}
		else{
			return console.log('Error en los parametros, no son numeros');
			}	
	} 
}

function esEntero(num){
    if (num % 1 == 0) {
        return num;
    } else {
        return num.toFixed(3);
    }
}
var sigue=true;
while (sigue===true){
var numIntro1 = prompt('Introduce el primer numero y pulsa enter:');
var numIntro2 = prompt('Introduce el segundo numero o dejalo vacio y pulsa enter:');
numIntro1=parseFloat(numIntro1);
numIntro2=parseFloat(numIntro2);

myCalc(numIntro1,numIntro2);
if (confirm('Quieres realizar otro calculo?')) {
    sigue= true;
} else {
    sigue = false;
}
}