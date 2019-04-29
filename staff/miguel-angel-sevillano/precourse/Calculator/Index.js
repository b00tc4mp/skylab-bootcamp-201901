//CALCULADORA!!

//Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números. 
//El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.

//Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
//Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.



var results = [];
alert("Bienvenido a la calucladora automatica")

calc();
function calc(){
  var num1 = prompt ("Introduzca el primer digito"); 
  var num2 = prompt ("Introduzca el segundo digito");
  num1 = parseFloat(num1); // parselFloat accept the string and convert it into a floating point number. If the string does not contain a numeral value or If the first character of the string is not a Number then it returns NaN
  num2 = parseFloat(num2);


 
if( isNaN(num1) || typeof num2 === 'string' ){ //typeof string nos sirve para evitar el 'NaN' si el usuario deja en blanco segundo numero asi se cumple la condicion para la raiz quadrada
  console.log('Solo se admiten numeros , gracias')
  alert('solo numeros');
}
else if(isNaN(num2)){
  results[0]= Math.sqrt(num1);
  results[0] =Number(results[0].toFixed(3));//toFixed nos redondea los decimales ,en este caso hasta '3', pero convierte el resultado a string , usamos al principio 'Number' para evitarlo
  console.log('La raiz quadrada de ',num1, ' = ', results[0]);
  alert(results[0])
}
else {
  results[0] = num1+num2;
  results[0] = Number(results[0].toFixed(3));
  results[1] = num1-num2;
  results[1] = Number(results[1].toFixed(3));
  results[2] = num1*num2;
  results[2] = Number(results[2].toFixed(3));
  results[3] = num1/num2;
  results[3] = Number(results[3].toFixed(3));
  console.log('La suma de ', num1, '+' , num2, ' = ', results[0]);
 console.log('La resta de ', num1, '-' , num2, ' = ', results[1]); 
   console.log('La multiplicacion de ', num1, '*' , num2, ' = ', results[2]);
   console.log('La division de ', num1, '/' , num2, ' = ', results[3]);
  
}

}
console.log(results);
alert(results);