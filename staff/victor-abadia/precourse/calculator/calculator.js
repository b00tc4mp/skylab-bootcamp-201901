function calculate(value) {
    var view = document.getElementById('screen');
    if (value === '=') {
        return view.innerText = eval(view.textContent);
    }
    if (value === 'C'){
        return view.innerText = '';
    }
    view.innerText += value;

}
