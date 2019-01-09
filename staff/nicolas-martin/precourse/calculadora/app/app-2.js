window.onload = function () {
    document.getElementById("errors").style.display = "none";
    document.getElementById("msg-results").style.display = "none";
}

function calculate(){
  document.getElementById('errors').style.display = "none"
  var error = ''
  var msg = ''
  var a = parseFloat(document.getElementById('n1').value.replace(/,/, '.'))
  var b = parseFloat(document.getElementById('n2').value.replace(/,/, '.'))
  if (isNaN(a)){error += '<li>ERROR: number 1 is not a number</li>'}
  if (isNaN(b)){error += '<li>ERROR: number 2 is not a number</li>'}

  if (error === '') {
      msg += '<h3>Results:</h3>'
      msg += `<li>${a} + ${b} = ${sum(a, b)}</li>`
      msg += `<li>${a} - ${b} = ${rest(a, b)}</li>`
      msg += `<li>${a} * ${b} = ${mult(a, b)}</li>`
      msg += `<li>${a} / ${b} = ${div(a, b)}</li>`
      document.getElementById('msg-results').style.display = "block"
      document.getElementById('results').innerHTML = msg
  } else{
    document.getElementById('errors').style.display = "block"
    document.getElementById('errors').innerHTML = error
  }
}

function round(n){
  var result = Number.isInteger(n) ? n : n.toFixed(3);
  return isNaN(result) ? 'Indetermination' : result;
}

function sum(a, b){ return round(a + b) }
function rest(a, b){ return round(a - b) }
function mult(a, b){ return round(a * b) }
function div(a, b){ return round(a / b) }
