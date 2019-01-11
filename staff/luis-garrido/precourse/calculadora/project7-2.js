const buttonsArray =   [document.getElementById("cero"),
						document.getElementById("uno"),
						document.getElementById("dos"),
						document.getElementById("tres"),
						document.getElementById("cuatro"),
						document.getElementById("cinco"),
						document.getElementById("seis"),
						document.getElementById("siete"),
						document.getElementById("ocho"),
						document.getElementById("nueve"),
						document.getElementById("reset"),
						document.getElementById("signo"),
						document.getElementById("raiz"),
						document.getElementById("dividir"),
						document.getElementById("multiplicar"),
						document.getElementById("sumar"),
						document.getElementById("restar"),
						document.getElementById("coma"),
						document.getElementById("igual")];
let numOpera=[];
let numberUno = NaN;
let operacion = "";

function displaying(number) {
	numOpera.push(number);
	document.getElementById("displayText").innerHTML = numOpera.join("");
}

function soltarBotones() {
	document.getElementById("dividir").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("multiplicar").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("sumar").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("restar").style.backgroundColor = "rgba(0,0,0,0)";
}

buttonsArray[0].addEventListener("click", function(){displaying(0);});
buttonsArray[1].addEventListener("click", function(){displaying(1);});
buttonsArray[2].addEventListener("click", function(){displaying(2);});
buttonsArray[3].addEventListener("click", function(){displaying(3);});
buttonsArray[4].addEventListener("click", function(){displaying(4);});
buttonsArray[5].addEventListener("click", function(){displaying(5);});
buttonsArray[6].addEventListener("click", function(){displaying(6);});
buttonsArray[7].addEventListener("click", function(){displaying(7);});
buttonsArray[8].addEventListener("click", function(){displaying(8);});
buttonsArray[9].addEventListener("click", function(){displaying(9);});

buttonsArray[10].addEventListener("click", function(){
	// clear
	soltarBotones();
	document.getElementById("displayText").innerHTML = "0";
	numberUno = NaN;
	numOpera = [];
	operacion = "";
});

buttonsArray[11].addEventListener("click", function(){
	// cambio de signo
	document.getElementById("displayText").innerHTML = Number(parseFloat(document.getElementById("displayText").innerHTML)).toFixed(3)*-1;
});

buttonsArray[12].addEventListener("click", function(){
	// raiz cuadrada
	soltarBotones();
	document.getElementById("displayText").innerHTML = parseFloat(Math.sqrt(Number(parseFloat(document.getElementById("displayText").innerHTML))).toFixed(3));
	numberUno = NaN;
	numOpera=[];
});

function calcular() {
	if (isNaN(numberUno)) {
		numberUno = Number(parseFloat(document.getElementById("displayText").innerHTML)).toFixed(3);
		numOpera = [];
	}
	else  {
		switch(operacion) {
			case "dividir" :
				numberUno = Number(parseFloat(numberUno/Number(parseFloat(document.getElementById("displayText").innerHTML))).toFixed(3));
				if (isNaN(numberUno)) {
					document.getElementById("displayText").innerHTML = "Indeterminación";
				}
				else {
					document.getElementById("displayText").innerHTML = numberUno;
				}
				numOpera=[];
				break;
			case "multiplicar" :
				numberUno = Number(parseFloat(numberUno*Number(parseFloat(document.getElementById("displayText").innerHTML))).toFixed(3));
				document.getElementById("displayText").innerHTML = numberUno;
				numOpera=[];
				break;
			case "sumar" :
				numberUno = Number(parseFloat(Number(parseFloat(numberUno))+Number(parseFloat(document.getElementById("displayText").innerHTML))).toFixed(3));
				document.getElementById("displayText").innerHTML = numberUno;
				numOpera=[];
				break;
			case "restar" :
				numberUno = Number(parseFloat(numberUno-Number(parseFloat(document.getElementById("displayText").innerHTML))).toFixed(3));
				document.getElementById("displayText").innerHTML = numberUno;
				numOpera=[];
				break;
		}
	}
}

buttonsArray[13].addEventListener("click", function(){
	// dividir
	calcular();
	operacion = "dividir";
	soltarBotones();
	document.getElementById("dividir").style.backgroundColor = "rgba(0,0,0,0.10)";
});

buttonsArray[14].addEventListener("click", function(){
	// multiplicar
	calcular();
	operacion = "multiplicar";
	soltarBotones();
	document.getElementById("multiplicar").style.backgroundColor = "rgba(0,0,0,0.10)";
});

buttonsArray[15].addEventListener("click", function(){
	// sumar
	calcular();
	operacion = "sumar";
	soltarBotones();
	document.getElementById("sumar").style.backgroundColor = "rgba(0,0,0,0.10)";
});

buttonsArray[16].addEventListener("click", function(){
	// restar
	calcular();
	operacion = "restar";
	soltarBotones();
	document.getElementById("restar").style.backgroundColor = "rgba(0,0,0,0.10)";
});

buttonsArray[17].addEventListener("click", function(){
	// coma
	if (document.getElementById("displayText").innerHTML.length === 0 || numOpera.length === 0) {
		numOpera.push("0.");
		document.getElementById("displayText").innerHTML = numOpera.join("");
	}
	else if (document.getElementById("displayText").innerHTML.indexOf(".") === -1 && document.getElementById("displayText").innerHTML.length > 0) {
 		numOpera.push(".");
		document.getElementById("displayText").innerHTML = numOpera.join("");	
	}
	
});

buttonsArray[18].addEventListener("click", function(){
	// igual
	calcular();
	soltarBotones();
	operacion = ""; 
});