project1.js
	function addition(num1, num2) {
		return (num1 +'+' +num2+'='+(num1+num2));
	};
	function substract(num1, num2) {
		return (num1 +'-'+num2+ '=' +(num1-num2));
	};
	function multiply(num1, num2) {
		return (num1 +'*' +num2+ '=' +(num1*num2));
	};
	function divide(num1, num2) {
		if ((num1 % num2) === 0) {
		return (num1 +'/' +num2+ '='+Math.trunc(num1/num2));
		} else {
		return (num1 +'/' +num2+ '='+(num1/num2).toFixed(3));
	}
	};

	function main(num1, num2) {
		var add = addition(num1, num2);
		var subs = substract(num1, num2);
		var mult = multiply(num1, num2);
		var div = divide(num1, num2);
		if ( num1 === "" || num2 === "") {
			console.log(Math.sqrt(num1)+ Math.sqrt(num2) + ' you have forgotten a number, try again');
		} else if (isNaN(num1) || isNaN(num2)) {
			console.log('you need to entry a number');
		} else {
			var results =[add, subs, mult, div];
		/*	console.log('results = ['+results[0]+', '+results[1]+', '+results [2]+', '+results[3]+']');*/
			console.log('results = ' +results);
		}
	};
	main(4, 6);