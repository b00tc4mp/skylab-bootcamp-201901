
function validateMessage(message) {
    var arrayParam = message.split(',');
    var isNumber = true;
    var arrayNumbers = [];
    arrayParam.forEach(param => {
        arrayNumbers.push(Number(param));
        if (isNaN(param)) {
            isNumber = false
        };
    });
    if (isNumber) {
        return arrayNumbers
    } else {
        return []
    };
};


function multipleCalculator(paramNumbers) {
    var resSum = 0;
    var resSubs = 0;
    var resMult = 0;
    var resDiv = 0;
    if (paramNumbers.length == 1) {
        var square_root = Math.sqrt(paramNumbers[0]);
        return [`square root = ${square_root}`];
    } else {
        resSum = paramNumbers[0];
        resSubs = paramNumbers[0];
        resMult = paramNumbers[0];
        resDiv = paramNumbers[0];
        for (var i = 1; i < paramNumbers.length; i++)
        {
            resSum  = resSum  + paramNumbers[i];
            resSubs = resSubs - paramNumbers[i];
            resMult = resMult * paramNumbers[i];
            resDiv  = resDiv  / paramNumbers[i];
        };
        return [`sum = ${resSum.toFixed(3)}`,
                `subs = ${resSubs.toFixed(3)}`,
                `mult = ${resMult.toFixed(3)}`,
                `div = ${resDiv.toFixed(3)}`];
    };
};


function userOperation() {
    var repeat = true;
    var message = "";
    while (repeat) {
        message =  prompt("Enter the numbers to do the calculations: (separated by ,)", "");
        if (message == null || message == "") {
            console.log ("Canceled operation or parameter not entered");
            repeat = false;
        }
        else {
            var paramNumbers = validateMessage(message);
            if (paramNumbers.length > 0) {
                var result = multipleCalculator(paramNumbers);
                console.log(result);
            } else {
                window.alert("The parameters entered are not correct");
            };
            var option = prompt("Do you want to do more calculations? (y/n)", "y");
            if (option == null || option == "" || option == 'n') {
                console.log ("Canceled operation or parameter not entered");
                repeat = false;
            };
        };
    };
};


userOperation();
