function calculate(){
    var n1=parseInt(document.getElementById("n1").value)
    var n2=parseInt(document.getElementById("n2").value)
    var sum = n1 + n2
    
    if (sum<50){
    document.getElementById("results").innerHTML = "<li>" + n1 +  " + " + n2 + " = " + sum + "</li>" + "<p>" + "<li>" + "Today you have eaten " + sum + " cookies" + "</li>"
  
    }else{
    document.getElementById("results").innerHTML =  "<li>" + n1 +  " + " + n2 + " = " + sum + "</li>" + "<h5><li>" + "Today you have eaten " + sum + " cookies...they are too many cookies!" + "</h5></li>"
    }
    
}

function reset(){
    n1.value = "";
    n2.value = "";
    document.getElementById("results").innerHTML = "";
}

/*
function calculate(){
    var n1=parseInt(document.getElementById("n1").value)
    var n2=parseInt(document.getElementById("n2").value)
    var sum = n1 + n2
    var resta = n1 - n2
    var mult = n1 * n2
    var div = n1 / n2
    document.getElementById("results").innerHTML = "<li>" + n1 + " + " + n2 + " = " + sum + "</li>" + "<li>" + n1 + " - " + n2 + " = " +  + resta + "</li>" + "<li>" + n1 + " x " + n2 + " = " + mult + "</li>" + "<li>" + n1 + " / " + n2 + " = " + div + "</li>"
}*/