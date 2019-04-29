
class Carton {
	constructor(){
		this.numRange = 0;
		this.lineLength = 0;
		this.numbersArray = [];
		this.lines = {
			line1: [],
			line2: [],
			line3: []
		};
		
		this.numRangeLimits = {min: 15, max: 99};
		this.lineRangeLimits = {min:3 , max: 20};

		}

		setNumRange = function(numRange) {
			if(numRange < this.numRangeLimits.min || numRange > this.numRangeLimits.max) {
				return false;	
			} else {
				this.numRange = numRange;
				return true;
			}
		}

		setLineLength = function(lineLength) {
			if(lineLength < this.lineRangeLimits.min || lineLength > this.lineRangeLimits.max) {
				return false;	
			} else {
				this.lineLength = lineLength;
				return true;
			}
		}

		generateArrayNum() {
			if(this.lineLength == 0) console.log('Set lineLength property first!');

			let cartonLength = this.lineLength * 3;
			for(var i = 0; i < cartonLength; i++) {
				this.numbersArray.push(i + 1);
			}
		}

		generateRandomArray() {
   			let j, temp;
		    for (let i = this.numbersArray.length - 1; i > 0; i--) {
		        j = Math.floor(Math.random() * (i + 1));
		        temp = this.numbersArray[i];
		        this.numbersArray[i] = this.numbersArray[j];
		        this.numbersArray[j] = temp;
		    }
		}

		init = function() {
			this.generateArrayNum();
			this.generateRandomArray();

			for(let i = 0;  i < this.lineLength; i++) {
					this.lines.line1.push(this.numbersArray.pop());
					this.lines.line2.push(this.numbersArray.pop());
					this.lines.line3.push(this.numbersArray.pop());  
			}
		}

		checkForNumMatches = function(bomboNumber) {
			for(var key in this.lines) {
				let line = this.lines[key];
				this.lines[key] = line.map(function(element){
					if(element === bomboNumber){
						console.log('Number; ' + bomboNumber + ', at line: '+ key + ' matches!!!');
						 return 'X'
						} else {
							return element;
						}
				});
			}
		}

		checkForLineCompletedMatches = function() {
				let lineDone = false;
				for(var key in this.lines) {
					let line = this.lines[key];
					lineDone = line.every(function(element){
						return element === 'X' ? true : false;
					});
					if(lineDone) {
						console.log(key + ' done!!!');
						this.lines[key] = line.map(function(e) {
							return '*';
						});
						alert(key.toString() + ' COMPLETED¡¡¡ ;)');
					}
			}
		}
		
		checkForCartonIsDone = function() {
				let cartonDone = true;
				for(var key in this.lines) {
					let line = this.lines[key];
					if(line[0] !== '*') cartonDone = false;
					}
				if(cartonDone) {
					return true;
				}
		}

		resetCarton = function() {
			this.numbersArray = [];
			this.lines = {
			line1: [],
			line2: [],
			line3: []
			};
		}

		toString = function() {
			let strCarton = '';
				for(var key in this.lines) {
				let line = this.lines[key];
				var strLine = line.toString().replace(/,/g, "  ");
				strCarton += ' - ' + key + ': ' + strLine + ' ' + '\n';
			}
			return strCarton;
		}
	 

}

main();

function main() {



let carton = new Carton();

userInteractionInterface(carton);

}

function userInteractionInterface(carton) {
	//validacion de los parametros de entrada
	
	//All String messages:
	let strTitleMassage, strUserNameMessage, strUserNameInputFail, strNumberRangeMessage, 
	strRangeNumbersFail, strLineRangeMessage, strLineInputFail, strStartGame, strBingoOptions, strBingoOptionsFail , strExitBingoMsg;

	 strTitleMassage = '/*/*/* WECOME TO SUPER BINGO */*/*/';
	 strUserNameMessage = '+ Enter your name, it can not execed to 20 characters:';
	 strUserNameInputFail = '* Your name execed 20 characters...';
	 let userNameInput = validateUserInputName(strUserNameMessage, strUserNameInputFail);

	 strNumberRangeMessage = '+ ' + userNameInput + ' please, enter range of posible number you want to play with. \n + This range must be in between 15 to 99: '
	 strRangeNumbersFail =  '* The number you entered is out of range...';
	validateRangeNumber(carton, strNumberRangeMessage, strRangeNumbersFail);

	 strLineRangeMessage = '+ ' + userNameInput + ' please, enter length of each line you want to play with. \n + This length must be in between 3 to 20: ';
	 strLineInputFail = '* The number of lines you entered is out of range...';
	validateRangeLines(carton, strLineRangeMessage, strLineInputFail);

	 strStartGame = '+ Star the game¡¡¡';
	 strBingoOptions = '	-- BINGO OPTIONS -- \n + 1 --> Continue next Number \n + 2 --> Reboot Bingo \n + 3 --> Exit Bingo';
	 strExitBingoMsg = '+ Good bye, and thank you for play SUPERBINGO¡¡¡ :)';
	 strBingoOptionsFail  = 'Enter a valid option...';


	 alert(strStartGame);


	 carton.init();
   

	 bingoGame(carton, strBingoOptionsFail, strBingoOptions);


	 
}

function validateUserInputName(strUserNameMessage, strUserNameInputFail) {
	let userName = prompt(strUserNameMessage);
	if(typeof(userName) == 'undefined' || userName.length > 20 || userName === '') {
		alert(strUserNameInputFail);
		return validateUserInputName(strUserNameMessage, strUserNameInputFail);
	}
	return userName;
}

function validateRangeNumber(carton, strNumberRangeMessage, strRangeNumbersFail) {
	let rangeNum = parseInt(prompt(strNumberRangeMessage));
	if (isNaN(rangeNum) || !carton.setNumRange(rangeNum)) {
		alert(strRangeNumbersFail);
		return validateRangeNumber(carton, strNumberRangeMessage, strRangeNumbersFail);
	}
	return rangeNum;
}

function validateRangeLines(carton, strLineRangeMessage, strLineInputFail) {
	let lineLengthInput = parseInt(prompt(strLineRangeMessage));
	if (isNaN(lineLengthInput) || !carton.setLineLength(lineLengthInput)) {
		alert(strLineInputFail);
		return validateRangeLines(carton, strLineRangeMessage, strLineInputFail);
	}
	return lineLengthInput;
}


function bingoGame(carton, strBingoOptionsFail, strBingoOptions){
	let continueBingo = true;
	console.log(carton.toString());
	let bomboArray = getBomboNumberArray(carton);
	while(continueBingo) {
		optionsBingo = getOption(carton, strBingoOptionsFail, strBingoOptions);
		switch (optionsBingo) {
			case 1:
				carton.checkForNumMatches(bomboArray.pop());
				carton.checkForLineCompletedMatches();
				break;
			case 2:
				bomboArray = getBomboNumberArray(carton);
				carton.resetCarton();
				carton.init();
				break;
			case 3:
				alert('**** THANKS FOR PLAYING SUPER BINGO, BYEEE :) ***');
				continueBingo = false;
				break;
		}

	}
}

function getOption(carton, strBingoOptionsFail, strBingoOptions) {
	if(carton.checkForCartonIsDone()){
		let strOptionInputWin = prompt('Congratulations YOU WIN!!!! \n --------- \n + 2 Restet Game \n + 3 Exit Bingo');
		let optionInputIntWin = parseInt(strOptionInputWin);
		if( isNaN(optionInputIntWin) || optionInputIntWin < 2 || optionInputIntWin > 3) {
		alert(strBingoOptionsFail);
		return getOption(carton, strBingoOptionsFail, strBingoOptions);
	}
		return optionInputIntWin;
	}

	let strOptionsCarton = strBingoOptions + '\n' + '--------------' + '\n' + carton.toString();
	let strOptionInput = prompt(strOptionsCarton);
	let optionInputInt = parseInt(strOptionInput);


	if( isNaN(optionInputInt) || optionInputInt < 1 || optionInputInt > 3) {
		alert(strBingoOptionsFail);
		return getOption(carton, strBingoOptionsFail, strBingoOptions);
	} 
		return optionInputInt;
}

function getBomboNumberArray(carton) {
	let bomNumbersArray = [];
	let j, temp;
			let bombeLenght = (carton.lineLength * 3) + 10;
			for(var i = 0; i < bombeLenght; i++) {
				bomNumbersArray.push(i + 1);
			}

		    for (let i = bomNumbersArray.length - 1; i > 0; i--) {
		        j = Math.floor(Math.random() * (i + 1));
		        temp = bomNumbersArray[i];
		        bomNumbersArray[i] =bomNumbersArray[j];
		        bomNumbersArray[j] = temp;
		    }
		    return bomNumbersArray;
}