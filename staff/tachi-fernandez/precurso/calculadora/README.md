## Calculadora

# Esta calculadora nos imprime las cuatro operaciones basicas y la raiz cuadrada si solo escribimos un numero =>

```javascript
    function calculator (num1,num2){
  var result = []
   if (num1 === 0 && num2 ===0){
   result.push(num1 + num2)
   result.push(num1 - num2)
   result.push(num1 * num2)
   result.push("Indeterminado")
 
   console.log("El resultado de la suma es " + result[0])
   console.log("El resultado de la resta es " + result[1])
   console.log("El resultado de la multiplicacion es " + result[2])
   console.log("El resultado de la division es " + result[3])
  

  }else if (num1 !== NaN && !num2 && num2 !== 0){
  var raiz = Math.sqrt(num1)
  console.log("La raiz cuadrada de " + num1 + " es " + raiz.toFixed(3))
  } else if (isNaN(num1) || isNaN(num2)){
    console.log("Escribe dos numeros")
  } else{

   result.push(num1 + num2)
   result.push(num1 - num2)
   result.push(num1 * num2)
   result.push(num1 / num2)
 
   console.log("El resultado de la suma es " + result[0])
   console.log("El resultado de la resta es " + result[1])
   console.log("El resultado de la multiplicacion es " + result[2])
   console.log("El resultado de la divison es " + result[3].toFixed(3))
  }
}
calculator(2,"papi") 

```