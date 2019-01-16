
let buttons = document.querySelectorAll(".key li");
let output = document.querySelector(".output-valor");

Array.from(buttons).forEach(function(btn) {
  
  btn.addEventListener('click', function() {

    let btnVal = btn.innerHTML;
    let outputVal = output.innerHTML;

    switch (btnVal){
			case "C":
        output.innerHTML = "";
				break;
			case "=":
				if(outputVal){
          outputVal = outputVal.replace('×', "*");
          outputVal = outputVal.replace('÷', "/");
          outputVal = outputVal.replace('−', "-");
          try {
            let result = eval(outputVal);
            output.innerHTML = (isNaN(result)) ? 'Error' : result
          }catch(e) {
            output.innerHTML = 'Error';
          }
				}
				break;
      default:
        output.innerHTML += btnVal;
				break;	
		}

  });

});
