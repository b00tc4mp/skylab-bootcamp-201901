//Declaro dos variables y losnalmaceno los numeros introducidos por el usuario ( Entiendo que el prompt los convierte a string)
var numberOne = prompt('Pleas, insert number one', 'Inseert here number 1');
var numberTwo = prompt('Pleas, insert number two', 'Insert here number 2');
var resultsA = ['','','',''];
var resultsB = ['',''];
var numbers = '0123456789.';

//Reviso si todos los elementos introducido son numros
function numberValidation(text){
   for(i=0; i<text.length; i++){
      if (numbers.indexOf(text.charAt(i),0)==-1){
        return false
      }     
    }  
   return true
}

//Compruebo si tiene decimals. En caso afirmativo, compruebo cuentos decimales tiene. 
function decimalComprobation(y) {

	//Para trabajar mas comodamente, saco el valor del array y lo declara a una variable temporal let o 
 	let o = y.toString();

 	//Con el for rastreo el resultado en busqueda de coma
	for (let i = 0; i < o.length; i++) {

		//Con el if sigo buscando la coma
		if (o.charAt(i) == numbers[10]) {

			// Con este if miro si hay mas de tres decimales, en caso afirmativo lo reduzco a 3 decimales y devuelvo este valor con return
			if ( o.length - 1 - i > 3) {

			 	return y.toFixed(3)
			}
		}
	}

	// Si veo que no hay mas de tres decimales, dejo el valor como estaba.
 	return y	
}

//La funcion padre que, a base de validacion alfanumerica de valores introducidos, hace todos los calculos
function calculating (num1,num2){


	// Compruebo si los dos numeros han sido validados como tales y en caso afiramtivo los calculo
	if (numberValidation(num1) == true && numberValidation(num2) == true) {

			resultsA[0] = Number(num1) + Number(num2)
			resultsA[1] = num1 - num2
			resultsA[2] = num1 / num2
			resultsA[3] = num1 * num2

			console.log('Suma: ' + decimalComprobation(resultsA[0]) + '.');
			console.log('Resta: ' + decimalComprobation(resultsA[1]) + '.');
			console.log('Division: ' + decimalComprobation(resultsA[2]) + '.');
			console.log('Multiplication: ' + decimalComprobation(resultsA[3]) + '.');


	//Ahora hago la validacion para primer numero
	} else if (numberValidation(num1) == true) {
		
			resultsB[0] = Math.sqrt(num1);	
			console.log('Square root of first number is: ' + decimalComprobation(resultsB[0]))		

	// Ahora la el segundo
	} else if (numberValidation(num2) == true) {

			resultsB[1] = Math.sqrt(num2);
			console.log('Square root of second number is: ' + decimalComprobation(resultsB[1]))

	//Si ninguno de los valores pasan la validacion, salta el mensaje que pide introducir numeros!
	} else {

			alert('Please, use only numbers!');
	}
}

//Ejecuto la funcion padre y pasa como argumentos los valores indroducidos por el usuario
calculating(numberOne,numberTwo);
