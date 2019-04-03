function init(){
    function op(nums){ //Operation are made 
        var  result= [];
        var res = sum = mul = div = nums[0];
        if(nums.length>=1){
            if(nums.length===1){
                if(nums[0]>=0){
                    result[0]=(Math.sqrt(nums[0])).toFixed(3);
                    (Number.isNaN(result[0]) || typeof result[0] === 'undefined') ? 
                    (resultado.textContent ="Error, negative data" , result[0]=0) //If negative data in Square root
                    : 
                    resultado.textContent ="Sqrt of "+nums[0]+": "+result[0]; 
                }
                else{
                    resultado.textContent ="NEGATIVE ROOT";
                }
            }else{
                for (var i=1; i < nums.length; i++) {
                    res -= nums[i];
                    sum += nums[i];
                    mul *= nums[i];
                    div /= nums[i].toFixed(2);
                }
                result=[sum,res,mul,div];
                resultado.textContent = "S:"+result[0]+" , R:"+result[1]+" , M:"+result[2]+" , D:"+result[3].toFixed(2);
                return result;
            }
        }else{
            resultado.textContent ="NO NUMBERS"
        }
    }
    //variables
    var flag = negative =  false;
    var num = [];
    var resultado = document.getElementById('screen');
    var añadir = document.getElementById('add');
    var igual = document.getElementById('calculator');
    var uno = document.getElementById('1');
    var dos = document.getElementById('2');
    var tres = document.getElementById('3');
    var cuatro = document.getElementById('4');
    var cinco = document.getElementById('5');
    var seis = document.getElementById('6');
    var siete = document.getElementById('7');
    var ocho = document.getElementById('8');
    var nueve = document.getElementById('9');
    var cero = document.getElementById('0');
    var clear = document.getElementById('clear');
    var reset = document.getElementById('reset');
    var negativo = document.getElementById('negativo');
    uno.onclick = function(e){
        resultado.textContent = resultado.textContent  + "1";
    }
    dos.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "2";
    }
    tres.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "3";
    }
    cuatro.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "4";
    }
    cinco.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "5";
    }
    seis.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "6";
    }
    siete.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "7";
    }
    ocho.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "8";
    }
    nueve.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "9";
    }
    cero.onclick = function(e){
        (flag)? (resultado.textContent = " ", flag = false) : false;
        resultado.textContent = resultado.textContent  + "0";
    }
    añadir.onclick = function(e){
        if(resultado.textContent !== " "){
            num.push(parseFloat(resultado.textContent));
            resultado.textContent= " ";
            negative=false;
        }
    }
    negativo.onclick = function(e){
        if(resultado.textContent !== " " && negative===false){
            resultado.textContent = "-" + resultado.textContent;
            negative=true;
        }
    }   
    igual.onclick = function(e){
        op(num);
        num = [];
        flag=true;
    }
    clear.onclick = function(e){
        resultado.textContent= " ";
    }
    reset.onclick = function(e){
        resultado.textContent= " ";
        num = [];
    }
}