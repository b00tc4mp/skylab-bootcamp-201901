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

test('Method Total Price OK - with 0 products in cart', function(){
    var err
    var cart = new Cart()
    var result;
    var expectedresult = 0;
    
    try{
        result = cart.totalPrice()   
    }catch(error){
        err = error
    }

    assert(!err,'Shouldnt be an error! Not an object as parameter')
    assert(result == expectedresult, 'Incorrect Result!')
});


test('Method mostExpensive OK', function(){
    var err
    var cart = new Cart()
    var result;
    var expectedresult = 119
    
    try{
        cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
        cart.add(new Mobile('PP', '5t', 'blue', 20))
        result = cart.mostExpensive()
    }catch(error){
        err = error
    }

    assert(!err,'Shouldnt be an error! Not an object as parameter')
    assert(result.price == expectedresult, 'Incorrect Result!')
});


test('Method mostExpensive - BAD Too Many Arguments', function(){
    var err
    var cart = new Cart()
    var result;
    var expectedresult = 119
    
    try{
        cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
        cart.add(new Mobile('PP', '5t', 'blue', 20))
        result = cart.mostExpensive(2)
    }catch(error){
        err = error
    }

    assert(!err,'Error should exist!')
});


test('Number of type - OK', function(){
    var err
    var cart = new Cart()
    var result;
    var expectedresult = 2;
    
    try{
        cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
        cart.add(new Mobile('PP', '5t', 'blue', 20))
        result = cart.numberOf(Mobile)
    }catch(error){
        err = error
    }

    assert(!err,'Error shouldnt exist!')
    assert(result == expectedresult,'Expected result should match result')
});

test('Number of type (no type found)- OK', function(){
    var err
    var cart = new Cart()
    var result;
    var expectedresult = 0;
    
    try{
        cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
        cart.add(new Mobile('PP', '5t', 'blue', 20))
        result = cart.numberOf(Bra)
    }catch(error){
        err = error
    }

    assert(!err,'Error shouldnt exist!')
    assert(result == expectedresult,'Expected result should match result')
});


test('productsByPriceRange OK', function(){
    var err
    var cart = new Cart()
    var result;
    var mobil1 = new Mobile('Xiaomi', '5X', 'space-rose', 119)
    var mobil2 = new Mobile('PP', '5t', 'blue', 20)
    var expectedresult = []
    expectedresult.push(mobil2)
    
    try{
        cart.add(mobil1)
        cart.add(mobil2)
        result = cart.productsByPriceRange(0, 100)
    }catch(error){
        err = error
    }
    debugger
    assert(!err,'Error shouldnt exist!')
    assert(result[0].toJSON == expectedresult.toJSON,'Expected result should match result')
});



test('productsByPriceRange OK', function(){
    var err
    var cart = new Cart()
    var result;
    var mobil1 = new Mobile('Xiaomi', '5X', 'space-rose', 119)
    var mobil2 = new Mobile('PP', '5t', 'blue', 20)
    var expectedresult = []
    expectedresult.push(mobil2)
    
    try{
        cart.add(mobil1)
        cart.add(mobil2)
        result = cart.productsByPriceRange(0, 100)
    }catch(error){
        err = error
    }
    debugger
    assert(!err,'Error shouldnt exist!')
    assert(result[0].toJSON == expectedresult.toJSON,'Expected result should match result')
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
