function calculate(a,b) {
    var x = document.getElementById("number1").value;
    var y = document.getElementById("number2").value; 
    var a = parseInt(x);
    var b = parseInt(y);
    var sum = Math.round((a+b)*1000)/1000;
    var rest = Math.round((a-b)*1000)/1000;   
    var mult = Math.round(a*b*1000)/1000;
    var div = Math.round(a/b*1000)/1000;
    if (isNaN(a) && isNaN(b)) {
        document.getElementById("results").innerHTML = "I can't do that, try again."
    } else if (document.getElementById("number1").value == "") {
        document.getElementById("results").innerHTML = 'The square root of '+ b + ' is ' + Math.sqrt(b);
    } else if (document.getElementById("number2").value == "") {
        document.getElementById("results").innerHTML = 'The square root of '+ a + ' is ' + Math.sqrt(a);
    } else if (isNaN(a) || isNaN(b)) {
        document.getElementById("results").innerHTML = "I can't do that, try again.";
    } else if (a == 0 && b == 0) {
        document.getElementById("results").innerHTML = 'Undefined';
    } else {
        document.getElementById("results").innerHTML = '<li>' + a + ' + ' + b + ' = ' + sum + '</li>' + '<li>' + a + ' - ' + b + ' = ' + rest + '</li>' + '<li>' + a + ' * ' + b + ' = ' + mult + '</li>' + '<li>' + a + ' / ' + b + ' = ' + div + '</li>';
    };
};
