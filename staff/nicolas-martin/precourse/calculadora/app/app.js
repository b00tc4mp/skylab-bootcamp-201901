var operators = [];

function getKey(n) {
  var key = n.toString()
  var resultDOM = document.getElementById("result")
  if (operators.length === 0){

    switch (key) {
      case 'div':

      break;
      case 'res':

      break;
      case 'mul':

      break;
      case 'equ':

      break;
      case 'add':

      break;
      case 'poi':
          resultDOM.innerHTML = '0,'
          operators[0] = '0,'
      break;
      default:
          resultDOM.innerHTML = key
          operators[0] = key
    }


  } else if (operators.length === 1) {

    switch (key) {
      case 'div':
        resultDOM.innerHTML = operators[0] + " &divide; "
        operators[1] = 'div'
      break;
      case 'res':
        resultDOM.innerHTML = operators[0] + " - "
        operators[1] = 'res'
      break;
      case 'mul':
        resultDOM.innerHTML = operators[0] + " &times; "
        operators[1] = 'mul'
      break;
      case 'add':
        resultDOM.innerHTML = operators[0] + " + "
        operators[1] = 'add'
      break;
      case 'poi':
        if (operators[0].indexOf(',') === -1) {
          resultDOM.innerHTML = operators[0] + ","
          operators[0] += ','
        }
      break;

      default:
      if (operators[0].length <= 8){
        resultDOM.innerHTML = operators[0] + key
        operators[0] += key
      }
    }

  } else if (operators.length >= 2) {
    switch (key) {
      case 'div':

      break;
      case 'res':

      break;
      case 'mul':

      break;
      case 'add':

      break;
      case 'equ':
        if (operators.length === 3) {
          var result = calculate()
          result = result.replace('.', ',')
          resultDOM.innerHTML = result
        }
      break;
      case 'poi':
        if (operators.length === 2) {
          resultDOM.innerHTML += ' 0,'
          operators[2] = '0,'
        } else if (operators[2].indexOf(',') === -1) {
            resultDOM.innerHTML += ','
            operators[2] += ','
        }
        break;

      default:
        if (operators.length === 2) {
          operators[2] = key
          resultDOM.innerHTML += key
        } else if (operators[2].length <= 8){
          operators[2] += key
          resultDOM.innerHTML += key
        }
        

    }
  }
}

function calculate(){
  var n1 = parseFloat(operators[0].replace(/,/, '.'))
  var n2 = parseFloat(operators[2].replace(/,/, '.'))
  var result
  switch (operators[1]) {
    case 'div':
      result = div(n1, n2)
    break;
    case 'res':
      result = rest(n1, n2)
    break;
    case 'mul':
      result = mult(n1, n2)
    break;
    case 'add':
      result = sum(n1, n2)
    break;
    default:

  }
  return result.toString()
}

function round(n){
  var result = Number.isInteger(n) ? n : n.toFixed(3);
  return isNaN(result) ? 'Indetermination' : result;
}

function sum(a, b){ return round(a + b) }
function rest(a, b){ return round(a - b) }
function mult(a, b){ return round(a * b) }
function div(a, b){ return round(a / b) }
