/**
 * Abstraction of Cart
 * 
 * @method (add)
 *  @param {Object} object
 *  @throws {TypeError}
 *  @returns {Number} Array length
 * 
 */

var cart = new Cart;

suite('cart')

// .Add()

test('adding one element', function(){
    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    
    var res = cart.add(socks)

    var expected = 1;

    assert (res === expected,'expected and result should be the same')
});


test ('adding an item that is not an instance of product & when no param is passed', function (){
    
    var error;

    try {
        cart.add(5)
    } catch (err){
        error = err
    }
    assert (error,'expected and result should be the same')
})

// .totalPrice()

test('calculating total price ', function(){



});