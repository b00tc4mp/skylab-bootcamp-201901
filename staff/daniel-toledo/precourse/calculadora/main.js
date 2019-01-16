
function calculadora(num1,num2){

	for(var i=0; i<arguments.length; i++){
		if(typeof arguments[i]!='number'){
			return 'Please insert at least 2 numbers';
		}
	}

	if (arguments.length===1){
		var sqrt=Math.sqrt(num1);
		if (!Number.isInteger(sqrt)){
			sqrt=sqrt.toFixed(3);
		}
	return sqrt;
	}

	if (arguments.length===2){

		//SUMA
		var suma=num1+num2;
		if (!Number.isInteger(suma)){
			suma=suma.toFixed(3);
		}
		
		//RESTA
		var resta=num1-num2;
		if (!Number.isInteger(resta)){
			resta=resta.toFixed(3);
		}
		
		//MULTIPLICACIÓ
		var multi=num1*num2;
		if (!Number.isInteger(multi)){
			multi=multi.toFixed(3);
		}
		
		//DIVISIÓ
		var div=num1/num2;
		if(num1===0 && num2===0){
			div=Infinity;
		}
		if (!Number.isInteger(div)){
			div=div.toFixed(3);
		}
		
	return [suma, resta, multi, div];

	}	
	
}

function mensaje(){
	document.getElementById('mensaje').style.display='block';
	document.getElementById('aceptar').onclick=function(){
		document.getElementById('mensaje').style.display='none'
	}
	document.getElementById('numero1').value='';
	document.getElementById('numero2').value='';
}

	function soloNumeros(texto){
		var numeros='0123456789.'
		for (var i=0; i<texto.length; i++){
			if (numeros.search(texto[i])===-1){
				return false
			}
			return true
		}
	}

//Funcion para poner el valor en el destino focus()
function id( el ){
        return document.getElementById( el );
}

function val(destino, valor){
	destino.value += valor;
}

//Pongo todos mis botones del teclado en un array llamado botones
var arr=['0','1','2','3','4','5','6','7','8','9','0','.']
var botones=[];
for (var i=0; i<arr.length; i++){
	botones.push( document.getElementById(arr[i]) );
}

//Detecta que input esta en focus y lo guarda en la variable focus
 var inputs = [document.getElementById('numero1'),document.getElementById('numero2')];     
 for( var i=0; i<inputs.length; i++ ){
                inputs[i].onfocus = function(){
                        focus = this.id;
                }
        }

//Cuando un boton es clicado se añade su id(que es el equivalente al valor del boton) al valor del input(numero1 o numero2) que esta focus
for( var i=0; i<botones.length; i++ ){
    botones[i].onclick = function(){
       
            val( id( focus ), this.id );
            id( focus ).focus();
    }
}
id('numero1').focus();


//cuando clico enter, borro todo, hago las operaciones y aparecen en sus respectivos div
document.getElementById('enter').onclick= function(){
	document.getElementById('suma').innerHTML='';
	document.getElementById('resta').innerHTML='';
	document.getElementById('multi').innerHTML='';
	document.getElementById('div').innerHTML='';
	document.getElementById('sqrt').innerHTML='';

	var numero1 = document.getElementById("numero1").value;
	var numero2 = document.getElementById("numero2").value;
	


	
	if (soloNumeros(numero1) && soloNumeros(numero2)){
			numero2=Number(numero2);
			numero1=Number(numero1);
			resultats=calculadora(numero1,numero2);
			document.getElementById('suma').innerHTML=resultats[0];
			document.getElementById('resta').innerHTML=resultats[1];
			document.getElementById('multi').innerHTML=resultats[2];
			document.getElementById('div').innerHTML=resultats[3];
	}

	else if (numero1==='' && soloNumeros(numero2)){

			numero2=Number(numero2);
			resultat=calculadora(numero2);
			document.getElementById('sqrt').innerHTML=resultat;
	}

	else if (numero2==='' && soloNumeros(numero1)){

			numero1=Number(numero1);
			resultat=calculadora(numero1);
			document.getElementById('sqrt').innerHTML=resultat;
	}

	else{
		mensaje()
	}
}

//Borro todo lo que hay en los div
document.getElementById('del').onclick= function(){
	document.getElementById('suma').innerHTML='';
	document.getElementById('resta').innerHTML='';
	document.getElementById('multi').innerHTML='';
	document.getElementById('div').innerHTML='';
	document.getElementById('sqrt').innerHTML='';
	document.getElementById('numero1').value='';
	document.getElementById('numero2').value='';
}
