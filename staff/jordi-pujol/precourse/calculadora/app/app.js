/* Primero definimos las 2 variables numericas y el array que nos mostrara el resultado final. number(1/2)sting nos serviran para calcular decimales.
numbers y validation para comprobar que no hay ningun caracter que no sea un numero*/
let number1 = document.getElementById("n1").value
let number2 = document.getElementById("n2").value
let resultado = [];
let numbers = "0123456789"
let number1String = "";
let number2String = "";
let validation = 0;

/* Definimos la funcion que compruebe que sean numeros*/
function validateNumbers (num){
  for (let i = 0; i<num.length; i++){
    for (let j = 0; j<numbers.length; j++){
      if(num[i] === numbers[j]){
         validation ++
			break;
      }
    }
  }
}

    
 /* Definimos la función que se asegurara de que solo haya 3 decimales como maximo.
 Hacemos 2 for, uno recorrera los elementos del array y el segundo los caracteres de estos elementos.
 Cuando encuentre un "." sabra que hay decimales. Contara cuantos hay y en caso de que sea mayor que 3 lo reducira a este mismo numero.*/
    
const decimales = function(){    
	for (let i =0; i<resultado.length; i++){
     let resultado1 = resultado[i].toString()
      for (let j =0; j<resultado1.length; j++){
        let decimals = 0;
        if (resultado1[j] === "."){
    		decimals = resultado1.length - i - 1
        }     
        if (decimals>3){
           resultado[i] = resultado[i].toFixed(3)
      }
     }
    }
}

/* Definimos la funcion que hara de calculadora*/
function calculate (num1, num2) {
  resultado = []
  number1String = num1.toString();
  number2String = num2.toString();
  validateNumbers(number1String);
  validateNumbers(number2String);

/* Si validation no es igual al total de caracteres introducidos por el usuario, sabremos que uno de estos NO era un numero*/
  if (validation !== number1String.length + number2String.length){
    document.getElementById("results").innerHTML = '<li>' + "Has introducido un caracter no valido. Por favor, introduce un numero." + '</li>'
    }
  
  else{

  let i = 0
  if (num1 && num2) {
   resultado[i] = parseInt(num1) + parseInt(num2);
   i++
   resultado[i] = parseInt(num1) - parseInt(num2);
   i++
   resultado[i] = num1 * num2;
   i++
   if (parseInt(num2)===0){
    resultado[i]="infinito"}
   else{
    resultado[i] = num1 / num2;
   }
   decimales();

   document.getElementById("results").innerHTML = '<li>'+'La suma de tus dos numeros es ' + resultado[0]+'</li>'+'<li>' + 'La resta de tus dos numeros es ' + resultado[1]+'</li>'+ '<li>'+'La multiplicacion de tus dos numeros es ' + resultado[2]+'</li>'+'<li>' +'La division de tus dos numeros es ' + resultado[3]+'</li>'

}
  
  /* En el caso en que solo tengamos uno de los dos numeros devloveremos la raiz cuadrada de ese mismo*/
	else if (num1 || num2){
    resultado[i] = Math.sqrt(num1 + num2)
  decimales();
    document.getElementById("results").innerHTML = '<li>' + 'La raiz cuadrada de tu numero es ' + resultado + '</li>' 
  }
  
    /* En el caso en que no tengamos ninguno de los numeros mostraremos error*/
    else {
      document.getElementById("results").innerHTML = '<li>' + 'No has introducido ningun numero.' + '</li>' 
  }
  }
  validation = 0;
}
