function calculator(num1, num2) {

    if (typeof num1 != "number" || (num2 && typeof num2 != "number")) {
        return ['The params of the function must be numbers'];
    };

    if (!num2) {
        var square_root = Math.sqrt(num1);
        return [`square root = ${square_root}`];
    } else {
        var resSum  = (num1 + num2).toFixed(3);
        var resSubs = (num1 - num2).toFixed(3);
        var resMult = (num1 * num2).toFixed(3);
        var resDiv  = (num1 / num2).toFixed(3);
        return [`num1 + num2 = ${resSum}`,
                `num1 - num2 = ${resSubs}`,
                `num1 * num2 = ${resMult}`,
                `num1 / num2 = ${resDiv}`];
    }
};

calculator(23, 5);