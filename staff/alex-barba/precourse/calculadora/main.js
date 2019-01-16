function calculator() {
let display = document.getElementById('display').value;
let result = eval(display);
isNaN(eval(display)) ? document.getElementById('display').value = 'undefined' : document.getElementById('display').value = result;
};