function calculator(num1, num2) {

    if (isNaN(num1) && isNaN(num2)) return console.log("Incorrect params");
    if ((num1) == "" || (num2) == "") return console.log("Incorrect params");
    if (num1 && !num2) return console.log(fixDecimals(Math.sqrt(num1)));

    var result = [];
    result.push(num1 + " + " + num2 + " = " + fixDecimals(num1 + num2));
    result.push(num1 + " - " + num2 + " = " + fixDecimals(num1 - num2));
    result.push(num1 + " x " + num2 + " = " + fixDecimals(num1 * num2));
    result.push(num1 + " / " + num2 + " = " + fixDecimals(num1 / num2));
    return console.log(result);
}

function fixDecimals(num) {
    return (Number.isInteger(num)) ? num : num.toFixed(2);

}

calculator(1, 2);
calculator(3);
calculator('hello');
calculator(3.123456, 5.456789);