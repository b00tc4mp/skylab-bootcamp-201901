suite('Test de Cart')

test('Base Case method add I', function(){
    var err
    var cart = new Cart()
    var obj = {}
    var expectedresult = cart.arraybuy.length + 1

    try{
        cart.add(obj)    
    }catch(error){
        err = error
    }

    if(err) throw new Error ('Shouldnt be any error')
    if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
});

test('Incorrect parameter method add not an object', function(){
    var err
    var cart = new Cart()

    try{
        cart.add(1)    
    }catch(error){
        err = error
    }

    assert(!err,'Should be an error! Not an object as parameter')
});



test('Method Total Price OK', function(){
    var err
    var cart = new Cart()
    var result;
    
    try{
        cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
        result = cart.totalPrice()   
    }catch(error){
        err = error
    }

    assert(!err,'Shouldnt be an error! Not an object as parameter')
    assert(result == 119, 'Incorrect Result!')
});





// test('fail on too many arguments', function () {
//     var error;

//     try {
//         find([], 1, true);
//     } catch (err) {
//         error = err;
//     }

//     if (!error) throw Error('should have thrown an error');
//     if (!(error instanceof Error)) throw Error('error should be of type Error');
// });
