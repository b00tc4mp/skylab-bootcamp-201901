var cart = new Cart;

suite('cart', function (){

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
    var tshirt = new Tshirt('Supreme', 'M', 'white', 399);

    cart.add(socks);
    cart.add(mobile);
    cart.add(laptop);
    cart.add(tshirt);

    it ('result should be price total', function () {
        var res = cart.totalPrice();
        var exp = 3006.99;
        
        expect (res === exp), 'res and exp hould be the same';
    });

    it ('string for price', function() {

    })

    it ('total items', function() {
        var res = cart.numberOfItems();
        var exp = 4;

        expect (res === exp), 'res and exp hould be the same';
    })

    it ('should return most expensive', function() {
        var res = cart.mostExpensive();
        var exp = laptop;

        expect (res === exp), 'res and exp hould be the same';
    })

    it ('should return cheapest', function() {
        var res = cart.cheapest();
        var exp = socks;

        expect (res === exp), 'res and exp hould be the same';
    })

    it ('should return the quantity of a certain type of instance', function() {
        var res = cart.numberOf(Clothing);
        var exp = 2;

        expect (res === exp), 'res and exp hould be the same';
    })
});

