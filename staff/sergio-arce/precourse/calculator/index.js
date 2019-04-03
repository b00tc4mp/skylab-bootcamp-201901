/*Calculator! ➗➕
Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar 
por consola la suma, resta, multiplicación y división entre ambos números.

El resultado debería ser mostrado con 3 decimales como mucho(En caso de que hubieran). 

El programa debe contemplar y actuar correctamente
en el caso de que el usuario introduzca cualquier cosa que no sean números.

Si el usuario introduce un solo numero, deber,33á mostrar SOLO su raíz cuadrada, si
vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.

Los resultados deberían almacenarse dentro de una array y mostrarlos de una
forma amigable al usuario.
*/

function calculator() {
    var x = prompt(`Calculadora\nIntroduce el primer numero`)
    if ((x === "") || (x === null) || isNaN(x)) return alert(`Calculadora\nIntroduce algun numero!!!`)
    var y = prompt(`Calculadora\nIntroduce el segundo numero`)
    if ((y === "") || (y === null) || isNaN(y)) return alert(`Calculadora\nEl cuadrado de ${x} es: ${checkDecimals(Math.pow(x, 2))}`)
      x = parseFloat(x)
      y = parseFloat(y)
      let add = (x, y) => x + y
      let sub = (x, y) => x - y
      let mult = (x, y) => x * y
      let div = (x, y) => x / y
      alert(`La suma de ${x} + ${y} es: ${checkDecimals(add(x, y))}\nLa resta de ${x} - ${y} es: ${checkDecimals(sub(x, y))}\nLa Multiplicacion de ${x} * ${y} es: ${checkDecimals(mult(x, y))}\nLa division de ${x} / ${y} es: ${checkDecimals(div(x, y))}`)
      return [`ADD => ${x} + ${y} = ${checkDecimals(add(x, y))}`, `SUB => ${x} - ${y} = ${checkDecimals(sub(x, y))}`, `MULT => ${x} * ${y} = ${checkDecimals(mult(x, y))}`, `DIV => ${x} / ${y} = ${checkDecimals(div(x, y))}`]
  }
  
  function checkDecimals(num) {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(3))
  }
  
 
  

function calculator() {
    var x = prompt(`Calculadora\nIntroduce el primer numero`)
}
 calculator()