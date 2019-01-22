//variable para los resultados

var resultados = []; 
var result;

//Funcion para controlar los elementos que tenemos que mostrar al usuario de la calculadora
function check_inputs(){
    var num_1 = document.getElementById('num_1').value;
    var num_2 = document.getElementById('num_2').value;

    var cuatro_elementos = document.getElementById('cuatro_elementos');
    var un_elemento = document.getElementById('un_elemento');

    if(num_1 != '' && num_2 != ''){
        cuatro_elementos.style.display = 'block';
        un_elemento.style.display = 'none';
    }else if(num_1 == '' || num_2 == ''){
        cuatro_elementos.style.display = 'none';
        un_elemento.style.display = 'block';
    }else{
        alert('Tienes que poner algun número');
    }
}  

//funcion para realizar la operacion que quiera el usuario
function operar(operacion){
var num_1 = document.getElementById('num_1').value;
var num_2 = document.getElementById('num_2').value;

if (num_1 != '' && num_2 != '') {
    
    num_1 = parseInt(num_1);
    num_2 = parseInt(num_2);

    if(typeof num_1  == 'number' && typeof num_2 == 'number'){
        switch (operacion) {
            case 'sumar':
                result = num_1 + num_2;
                result = parseFloat(result.toFixed(3))
                console.log(result);
                resultados.push(num_1 + ' + ' + num_2 + ' = ' + result);
            break;
            case 'restar':
                result = num_1 - num_2;
                result = parseFloat(result.toFixed(3))
                console.log(result); 
                resultados.push(num_1 + ' - ' + num_2 + ' = ' + result);
            break;
            case 'multiplicar':
                result = num_1 * num_2;
                result = parseFloat(result.toFixed(3))
                console.log(result);
                resultados.push(num_1 + ' x ' + num_2 + ' = ' + result);
            break;
            case 'dividir':
                result = num_1 /num_2;
                result = parseFloat(result.toFixed(3))
                console.log(result);
                resultados.push(num_1 + ' / ' + num_2 + ' = ' + result);
            break;

            default:

            break;
        }
    }else{
        alert('Solo puedes introducir números');
    }
}else{
    if(num_1 !== '' && operacion === 'raiz'){
        num_1 = parseInt(num_1);
        console.log(Math.sqrt(num_1));
        resultados.push('&#8730;'+num_1 + ' = ' + (parseFloat(Math.sqrt(num_1).toFixed(3))));
    }else if(num_2 !== '' && operacion === 'raiz'){
        num_2 = parseInt(num_2);
        console.log(Math.sqrt(num_2));
        resultados.push('&#8730;'+num_2 + ' = ' + (parseFloat(Math.sqrt(num_2).toFixed(3))));
    }else{
        alert('Se tiene que introducir un número');
    }
}


//lista de resultados
if(resultados.length > 0) {
    document.getElementById('resultados').style.display = 'block';
    var lista_resultados = '<p class="menu-label">Resultados</p><ul class="menu-list">'

    for (let index = 0; index < resultados.length; index++) {
        lista_resultados += '<li>'+resultados[index]+'</li>'; 
    }

    lista_resultados += '</ul>';

    document.getElementById("menu_resultados").innerHTML = lista_resultados;
}

}