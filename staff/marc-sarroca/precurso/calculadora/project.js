// Calculadora


var num1 = 10
var num2 = 10
var raiz= ''
var result =[]

isNaN(num1)
isNaN(num2)

if (num1 === '' && num2 === ''){
	console.log('Debes insertar almenos 1 numero')
}

if (isNaN(num1) === true || isNaN(num2) === true ){
	console.log('Uno de los caracteres no esta adminitdo')
}
		
if (isNaN(num1) === false && num2 ===''){
	raiz = Math.sqrt(num1)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))
	    }
	    
if (num1 === '' && isNaN(num2) === false){
	raiz = Math.sqrt(num2)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))
		}else{

var sum = function() {	
	resultSum = num1 + num2
	resultSum.toFixed(3)
	resultSum2 = 'La suma es ' + resultSum
	return result.push(resultSum2)

} 
sum()

var rest = function (){
return result.push(num1 - num2)	
}
rest()


var multi = function (){
return result.push(num1 * num2)
}
multi()

var div = function (){
return result.push(num1 / num2)
}

div()

}



//Funcion calculadora


var result = []
var raiz = ''

function calculadora (num1, num2){

isNaN(num1)
isNaN(num2)


if (num1 === undefined && num2 === undefined){
	console.log('Debes insertar almenos 1 numero')

} else if (isNaN(num1) === true || isNaN(num2) === true ){
	console.log('Uno de los caracteres no esta adminitdo')

} else if (isNaN(num1) === false && num2 === undefined){
	raiz = Math.sqrt(num1)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))

} else if (num1 === '' && isNaN(num2) === false){
	raiz = Math.sqrt(num2)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))

	} else {
		result.push(num1+num2).toFixed(3)
		result.push(num1-num2).toFixed(3)
		result.push(num1*num2).toFixed(3)
		result.push(num1/num2).toFixed(3)
	    console.log('La suma es ' + result[0] + ', ' + 'La resta es ' + result[1] + ', '+ 'La multiplicaciones es ' + result[2] + ', '+ 'La division es ' + result[3])
}

	  

}

calculadora()


//Cambios Calculadora



var result = []
var raiz = ''
function calculadora (num1, num2){
isNaN(num1)
isNaN(num2)
if (num1 === undefined && num2 === undefined){
    console.log('Debes insertar almenos 1 numero')
} else if (isNaN(num1) === false && num2 === undefined){
    raiz = Math.sqrt(num1)
    console.log('La raiz cuadara es ' + raiz.toFixed(3))
} else if (isNaN(num1) === true || isNaN(num2) === true ){
    console.log('Uno de los caracteres no esta adminitdo')
    } else {
        result.push(num1+num2)
        result.push(num1-num2)
        result.push(num1*num2)
        result.push(num1/num2)
    }    
    
    for (i=0; i < result.length; i++){
    if (Number.isNaN(result[i])) {
        result [i] = 0;
    }
    

 
 }
console.log('La suma es' + ': ' + Math.round(result[0] * 100) / 100)
console.log('La resta es' + ': ' + Math.round(result[1] * 100) / 100)
console.log('La multiplicacion es' + ': ' + Math.round(result[2] * 100) / 100)
console.log('La division es' + ': ' + Math.round(result[3] * 100) / 100)

}


calculadora(5.56,6.24)

