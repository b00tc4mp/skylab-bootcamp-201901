suite('totalPrice');

test('Correct', function () {

    var res = cart.totalPrice();

    var expected = 4085.92;

    assert(res.toString() === expected.toString(), 'should have returned the correct value')
})