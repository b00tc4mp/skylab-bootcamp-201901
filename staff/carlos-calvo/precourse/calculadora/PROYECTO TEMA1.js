//PROYECTO TEMA1

/*Este entregable miramos el tema de la sobrecarga de funciones de POO 
Mucho ojo porque no existe la sobrecarga de funciones.
*/

function Calculator(num1, num2){
	
	if(arguments.length == 1){//Caso 1 argumento
		if(!isNaN(arguments[0])){ //Si es número
			console.log("La raiz del numero es " + Math.sqrt(num1).toFixed(3) + "");
			return Math.sqrt(num1).toFixed(3);
		} else { return null } //Si no es numero
	} else if (arguments.length == 2){ //Caso 2 argumentos
		if(!isNaN(arguments[0]) && !isNaN(arguments[1])){ //Si son números los dos
			var num1 = arguments[0];
			var num2 = arguments[1];
			var arrayresultado;
			if((num2 == 0)){
				arrayresultado = [(num1+num2), (num1-num2), num1*num2, "Lo sentimos pero únicamente Chuck Norris puede dividir entre cero"];
				console.log(" La suma es "+ arrayresultado[0] +"\n La resta es " + arrayresultado[1] +"\n La multiplicacion es " + arrayresultado[2] +"\n y la división... " + arrayresultado[3] +"")
			} else {
				arrayresultado = [(num1+num2), (num1-num2), num1*num2, (num1/num2).toFixed(3)];
				console.log(" La suma es "+ arrayresultado[0] +"\n La resta es " + arrayresultado[1] +"\n La multiplicacion es " + arrayresultado[2] +"\n La división es " + arrayresultado[3] +"");
			}
			
			return arrayresultado;
		} else { //Si hay alguno que no es numero
			console.log("Tipos incorrectos");
			return null;
		}
	} else if (arguments.length > 2){ //suponemos que todos son numeros por simplicidad, sino comprobacion NAN (2)
		var suma = 0;
		for (var i=0; i < arguments.length; i++){
			suma = suma + arguments[i];
		}
		return suma;
		console.log("La suma es " + suma + "");
	} else { //Caso 0
		console.log("numero de argumentos incorrectos");
		return null;
	}

}

var fi = false;
var arrayacumulated =[]; //En este array vamos acumulando los resultados
while(!fi) {
	var num1 = prompt("Please enter first number",);
	var num2 = prompt("Please enter second number",);
	if(num2 === ""){ //Comprobar si segundo cuadro de texto está vacío
		arrayacumulated.push(Calculator(parseInt(num1))); //Pasar de string a número
	} else {
		arrayacumulated.push(Calculator(parseInt(num1), parseInt(num2))); //Si se han introducido dos valores (aunque sea texto)
	}
	var userinput ="";
	while ((userinput != "y" && userinput != "n")){
		userinput = prompt("Wanna continue","y");
		if(userinput == "n"){
			fi = true;
		}
	}
}
console.log(arrayacumulated);
console.log("Bye");
	




console.log(isNaN("f"))
console.log(isNaN(5))
console.log(isNaN("t"))