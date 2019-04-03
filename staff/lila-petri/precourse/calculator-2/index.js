
function calculate(){
    var calc = document.getElementById("display").value;
    var result=eval(calc);
    document.getElementById('display').value = String(result);

}


