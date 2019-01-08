function calculate(num1, num2) {
	if (typeof num1 === 'number' && num2 === undefined) {
		num2 = 0;
		return Math.round(Math.sqrt(num1 + num2) * 1000) / 1000;
	} else if (typeof num1 === 'number' && typeof num2 === 'number') {
	
		function resultAdd() {
			return num1 + num2;
		};

		function resultSub() {
			return num1 - num2;
		};

		function resultMult() {
			return num1 * num2;
		};

		function resultDiv() {
			if (num1 === 0 && num2 === 0) {
				return '∞';
			} else {
				return Math.round((num1 / num2) * 1000) / 1000;
			}
		};

		console.log('result = [' + num1 + ' + ' + num2 + ' = ' + resultAdd() + ', ' + num1 + ' - ' + num2 + ' = ' + resultSub() + ', ' + num1 + ' * ' + num2 + ' = ' + resultMult() + ', ' + num1 + ' / ' + num2 + ' = ' + resultDiv() + ']');
		
	} else {
		console.log('You must put in a number');
	};

};

calculate(2, 3);