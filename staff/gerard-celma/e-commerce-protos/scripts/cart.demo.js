var cart = new Cart;

// Product (brand,price)
    // Electronic (model)
        // Mobile (color)
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
        // Computer (screen)
            // Laptop
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            // Desktop 
            var desktop = new Desktop('HP', '1800', 20, 420);
    //  Clothing (color)
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // model
    var cap = new Cap('Obey', 'M', 'black', 29); // size
    var tshirt = new Tshirt('Supreme', 'M', 'white', 399); // size
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // size
        // Underwear (size)
        var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
        var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // model
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        // Trousers (model,size)
            // Shorts
            var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35);
            // Jeans
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);



cart.add(socks);
cart.add(tanga);
cart.add(bra);
cart.add(slips);
cart.add(mobile);
cart.add(mobile2);
cart.add(laptop);
cart.add(desktop);
cart.add(hat);
cart.add(jeans);
cart.add(tshirt);
cart.add(cap);
cart.add(shorts);
cart.add(sweater);

console.log('total: ', cart.totalPrice(),'€');
console.log('number of items: ', cart.numberOfItems());
console.log('most expensive: ', cart.mostExpensive());
console.log('cheapest: ', cart.cheapest());
console.log('number of clothing items: ', cart.numberOf(Clothing));
console.log('number of electronics items: ', cart.numberOf(Electronics));
console.log('products in between prices', cart.productsByPriceRange(30, 120));






