function calculate(){
	//document.getElementById('results').innerHTML = '<li>'+ sum + '</li>'

	var num1 = parseFloat(document.getElementById('n1').value);
	var num2 = parseFloat(document.getElementById('n2').value);
	
	if(!isNaN(num1)){
		
		if(num1===num2 || isNaN(num2)){
			return document.getElementById('results').innerHTML = `La raiz cuadrada de ${num1} es: ` + esEntero(Math.sqrt(num1));
		}
		else if(!isNaN(num2)){
			var resArray=[];
		resArray[0]= '-La suma es: ' + esEntero((num1+num2));
		resArray[1]= '-La resta es: ' + esEntero((num1-num2));
		resArray[2]= '-La multiplicacion es: ' + esEntero((num1*num2));
		resArray[3]= '-La division es: ' + esEntero((num1/num2));
		return document.getElementById('results').innerHTML = `El resultado de sus operaciones con ${num1} y ${num2}:\n`+'<li>'+resArray[0]+'</li>'+'<li>'+resArray[1]+'</li>'+'<li>'+resArray[2]+'</li>'+'<li>'+resArray[3]+'</li>';
		}
		else{
			document.getElementById('results').innerHTML = 'Error en los parametros, no son numeros';
		}
		
	}
	else if(isNaN(num1)){
		
		if(!isNaN(num2)){
			return document.getElementById('results').innerHTML = `La raiz cuadrada de ${num2} es: ` + esEntero(Math.sqrt(num2));
		}
		else{
			return document.getElementById('results').innerHTML = 'Error en los parametros, no son numeros';
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
