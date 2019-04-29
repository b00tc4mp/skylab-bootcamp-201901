function calculator() {
    var num1 = Number(document.getElementById('number1').value);
    var num2 = Number(document.getElementById('number2').value);
    var resultsHtml = "";

    if (isNaN(num1) || isNaN(num2)) {
        resultsHtml = "You must enter numeric values";
    } else {
         var results = calculate(num1, num2);
         resultsHtml = "The result of the calculations:\n\n";
         results.forEach(r => { 
             resultsHtml = resultsHtml + '<li>' + r + '</li>';
         });     
    };

    return document.getElementById('results').innerHTML = resultsHtml;
};


function calculate(num1, num2) {
    if (num1 === 0) {
        var square_root = isAnInteger((Math.sqrt(num2)));
        return [`square root of ${num2} = ${square_root}`];
    } else {
        if (num2 === 0) {
            var square_root = isAnInteger((Math.sqrt(num1)));
            return [`square root of ${num1} = ${square_root}`];    
        } else {
            var resSum  = isAnInteger((num1 + num2));
            var resSubs = isAnInteger((num1 - num2));
            var resMult = isAnInteger((num1 * num2));
            var resDiv  = isAnInteger((num1 / num2));
            return [`- ${num1} + ${num2} = ${resSum}`, 
                    `- ${num1} - ${num2} = ${resSubs}`, 
                    `- ${num1} * ${num2} = ${resMult}`, 
                    `- ${num1} / ${num2} = ${resDiv}`];
        };
    };
};

function isAnInteger(num){
    if (num % 1 == 0) {
        return num;
    } else {
        return num.toFixed(3);
    };
};