    class Calculator {
        constructor() {
            this.arrayOpertaion = [];
            this.strOperationInput = '';
            this.operationResult = '';
        }

        setOperationInput(input) {
            this.arrayOpertaion.push(input);
        }

        doOperation() {
            this.strOperationInput = this.arrayOpertaion.join("");
            if (isNaN(this.strOperationInput)) {
                this.aricmeticOperation();
            } else {
                this.rootNumber();
            }
        }

        aricmeticOperation() {
            try {
                this.operationResult = eval(this.strOperationInput);
                console.log(this.operationResult);
            } catch (error) {
                if (error instanceof ReferenceError) {
                    console.log('Introduce el formato adecuado');
                }
            }

        }

        rootNumber() {
            this.operationResult = Math.sqrt(this.strOperationInput);
            console.log(this.operationResult);
        }

        reserOperation() {
            this.arrayOpertaion = [];
            this.operationResult = '';
        }
    }

    var calculator = new Calculator();


    function getOpetarionValues() {
        let operationInputVaulues = event.target;
        calculator.setOperationInput(operationInputVaulues.innerHTML);
        console.log(calculator.arrayOpertaion.join(""));
    }

    document.addEventListener("click", function() {
        document.getElementById("showOperation").innerHTML = calculator.operationResult;
    });

    window.onclick = e => {
        if(e.target.tagName == "DIV"){
            document.getElementById("showOperation").innerHTML = calculator.arrayOpertaion.join("");
        } else if(e.target.tagName == "CLEAN") {
            calculator.reserOperation();
        } else {
            calculator.doOperation();
            document.getElementById("showOperation").innerHTML = calculator.operationResult;
        }
    } 
