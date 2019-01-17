test('Base Case - Found', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    var resultado;
    var resultadoesperado = true;
    try {
        resultado = some(array, function(a){
            return a == 1
        })
    } catch (err) {
        error = err;
    }
    if(error) throw new Error ('Shouldnt be any error')
    if(!(resultado == resultadoesperado)) throw new Error('Should be fine!')
});


test('Base Case II - Not Found', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    var resultado;
    var resultadoesperado = false;
    try {
        resultado = some(array, function(a){
            return a == -2
        })
    } catch (err) {
        error = err;
    }
    if(error) throw new Error ('Shouldnt be any error')
    if(!(resultado == resultadoesperado)) throw new Error('Should be fine!')
});


test('Incorrect parameter I', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    var resultado;
    var resultadoesperado = false;
    try {
        resultado = some(1, function(a){
            return a == -2
        })
    } catch (err) {
        error = err;
    }
    if(!(error)) throw new Error ('Should be error')
});

test('Incorrect parameter II', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    var resultado;
    var resultadoesperado = false;
    try {
        resultado = some(array, false)
    } catch (err) {
        error = err;
    }
    if(!(error)) throw new Error ('Should be error')
});

test('Incorrect number of paramters', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    var resultado;
    var resultadoesperado = false;
    try {
        resultado = some(false, array, function(a){
            return a == -2
        })
    } catch (err) {
        error = err;
    }
    if(!(error)) throw new Error ('Should be error')
});


