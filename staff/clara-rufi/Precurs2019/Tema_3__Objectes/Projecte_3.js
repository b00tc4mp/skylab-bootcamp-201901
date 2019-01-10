BiNGO__

//codi que envio//////////////////////////////////////////////////////////////////////////////////////////////////////


function bingo(){
    
    var cartro = [
        [2, 12, 20,6 ,11],
        [5, 10, 9,16 ,14 ],
        [7, 15, 8, 17, 21],
        [1, 13, 4, 18, 19]
    ]
    console.log("1er cartro dp funció bingo => " + cartro); //després del 1er loop, ja no es mostra la x
        
    var number = (Math.ceil(Math.random ()*22))  
        alert("Numero del sorteo num => " + number)
        console.log("Numero del sorteo num => " + number)    
    for (var i=0; i<cartro.length; i++){
     
        for (var j=0; j<cartro[i].length; j++){
            
            if (cartro[i][j] === number){
                numArray = cartro.indexOf(cartro[i])
                //console.log("Num array => " + numArray)
                posicio = cartro[i].indexOf(number)
                //console.log("Posició array => " + posicio)
                    
                cartro[numArray][posicio] = " x "
                    
                confirm(cartro)
                console.log("cartro dins if => " + cartro);
                
            }
        }
        console.log("cartro dins 1er loop => " + cartro);
        }
    console.log("cartro fora loop => " + cartro);
    
function repeat(){
    
    var playAgain = confirm ("Desea continuar?")
    if (playAgain === true){
        console.log("cartro dins playAgain => " + cartro);
        bingo()
    
    }else{
        confirm("Gracias por participar")
    }
    }
    repeat();
}
bingo();


////////////////////Bingo Senzill

/*1- El cartró hauria de ser aleatori, com que la idea és que primer siguin 5 números, fer un math random de 15 números i 
els poses aleatòriament en un array,
sense que es repeteixin, és a dir, fer un indexOf en el array que crees buit i vas posant 
els números del cartró, si està no el posis i genera un de nou, si no esta fes push.

2- per les boles, fes el mateix de moment, número aleatori de l'1 al 15 (que no es repeteixi tampoc, 
    surt un número, comproves si està al array del cartró, un altre cop amb el indexOf, si el troba, substitueix 
    aquell número per una X i vas modificar el cartró)*/

var cartro = []

function board(){
for (var k=0; k<30; k++){
var number = (Math.ceil(Math.random ()*15))
console.log("number random board => " + number);
    if (cartro.indexOf(number) === -1){
        cartro.push(number)
    }
    if (cartro.length === 5){
        break;
    }
    }
console.log( cartro) 
}
board();

function numberBingo(){
var numberB = (Math.ceil(Math.random ()*15))  
    
console.log("Numero del sorteo num => " + numberB)    
for (var i=0; i<cartro.length; i++){
    if ( cartro[i] === numberB){
    console.log("Numero del sorteo num => " + numberB)
    posicio = cartro.indexOf(numberB)
    console.log(posicio);
    cartro[posicio] = " x "
    console.log(cartro);
                 
    }
}
}
    
console.log(cartro)
numberBingo()



//
var cartro = []

function board(){
for (var k=0; k<30; k++){
var number = (Math.ceil(Math.random ()*15))
console.log("number random board => " + number);
    if (cartro.indexOf(number) === -1){
        cartro.push(number)
    }
    if (cartro.length === 5){
        break;
    }
    }
console.log( cartro) 
}
board();

function numberBingo(){
var numberB = (Math.ceil(Math.random ()*15))   
console.log("Numero del sorteo num => " + numberB)    
for (var i=0; i<cartro.length; i++){
    if ( cartro[i] === numberB){
    posicio = cartro.indexOf(numberB)
    console.log(posicio);
    cartro[posicio] = " x "
    console.log(cartro); 
    }else if (cartro[i] = "x"){
	console.log("LINIA!!!")
    }else{
	numberBingo()
}
}
numberBingo()


/// funciona genial! Falta enviar
//Els console.log son per poder veure nosaltres el funcionament del Bingo. L'usuari només veuria els alerts



function Bingo(){
    var cartro = []
    
    function board(){
    alert("Bienvenido al Bingo!")
    for (var k=0; k<30; k++){
    var number = (Math.ceil(Math.random ()*15))
        if (cartro.indexOf(number) === -1){
            cartro.push(number)
            alert("Número random cartón bingo => " + number);
        }
        if (cartro.length === 5){
            break;
        }
    }
    alert("Cartón Bingo => " + cartro) 
    console.log("Cartón Bingo => " + cartro)
    }
    board();

    var numberRandom = []
	countX = 0
    function numberBingo(){
    var numberB = (Math.ceil(Math.random ()*15))
    for (var F=0; F<30; F++){
        if (numberRandom.indexOf(numberB) === -1){
            numberRandom.push(numberB)
            alert("Número random bingo => " + numberB)
		    console.log("Números bingo ya salidos => " + numberRandom) 
        }
    }
      
    for (var i=0; i<cartro.length; i++){
        if ( cartro[i] === numberB){
            posicio = cartro.indexOf(numberB)
            cartro[posicio] = " x "
            countX += 1
            console.log("countX => " + countX)
            alert(cartro); 
            if (countX === 5){
                alert("LINIA!!!! FELICIDADES!!")
                var playAgain = confirm("Quieres volver a jugar??")
                    if (playAgain === true){
                        Bingo()
                    }else{
                        alert("Gracias por jugar al Bingo con nosotros!")
                        break;
                    }
            } 
        }
    }

    for (var R=0; R<cartro.length; R++){
        if (cartro[R] !== " x "){
            numberBingo()
        }
    }
    }
    numberBingo()
    }
    Bingo()

    //

    function Bingo(){
        var cartro = []
        
        function board(){
        alert("Bienvenido al Bingo!")
        for (var k=0; k<30; k++){
        var number = (Math.ceil(Math.random ()*15))
            if (cartro.indexOf(number) === -1){
                cartro.push(number)
                alert("Número random cartón bingo => " + number);
            }
            if (cartro.length === 5){
                break;
            }
        }
        alert("Cartón Bingo => " + cartro) 
        console.log("Cartón Bingo => " + cartro)
        }
        board();
    
        var numberRandom = []
        countX = 0
        function numberBingo(){
        var numberB = (Math.ceil(Math.random ()*15))
        for (var F=0; F<30; F++){
            if (numberRandom.indexOf(numberB) === -1){
                numberRandom.push(numberB)
                alert("Número random bingo => " + numberB)
                console.log("Números bingo ya salidos => " + numberRandom) 
            }
        }
          
        for (var i=0; i<cartro.length; i++){
            if ( cartro[i] === numberB){
                posicio = cartro.indexOf(numberB)
                cartro[posicio] = " x "
                countX += 1
                console.log("countX => " + countX)
                alert(cartro); 
                if (countX === 5){
                    alert("LINIA!!!! FELICIDADES!!")
                    var playAgain = confirm("Quieres volver a jugar??")
                        if (playAgain === true){
                            Bingo()
                        }else{
                            alert("Gracias por jugar al Bingo con nosotros!")
                            break;
                        }
                } 
            }
        }
    
        for (var R=0; R<cartro.length; R++){
            if (cartro[R] !== " x "){
                numberBingo()
            }
        }
        }
        numberBingo()
        }
        