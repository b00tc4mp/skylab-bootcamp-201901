suite("cart");

function createSetOfProducts() {
  var cart = new Cart();

  var tshirt = new TShirt(120, "Supreme", "white", "M");
  cart.add(tshirt);
  var sweater = new Sweater(45, "Diesel", "black", "M");
  cart.add(sweater);
  var laptop = new Laptop(33, "Apple", "MacBook Pro", 15);
  cart.add(laptop);
  var desktop = new Desktop(9.99, "HP", "1800", 20);
  cart.add(desktop);
  var mobile = new Mobile(12, "Apple", "iPhone X", "space-gray");
  cart.add(mobile);
  var mobile2 = new Mobile(12.22, "Xiaomi", "5X", "space-rose");
  cart.add(mobile2);

  return cart;
}

// use case 1
test("cart should add 1 product expected", function() {
  var cart = new Cart();
  var tshirt = new TShirt(399, "Supreme", "white", "M");
  cart.add(tshirt);

  assert(cart.products.length === 1, "products should be 1 length");
  assert(
    cart.products[0] === tshirt,
    "expected product " + tshirt + " was not added to cart products"
  );
});

// use case 2
test("succeed on get the total price of the cart", function() {
  var cart = createSetOfProducts();
  var totalPrice = cart.totalPrice();
  var expectedValue = 232.21;
  assert(
          expectedValue === totalPrice,
          "total price " + totalPrice + "is not the expected value " + expectedValue
  );
});

// use case 3
test("succeed on get the number of products in cart", function() {
  var cart = createSetOfProducts(); 
  var result = cart.numberOfItems();
  var expectedNumberOfItems = 6;

  assert((typeof expectedNumberOfItems === "number"), 'The result: ' + expectedNumberOfItems + ' is not from type of number');
  assert(result === expectedNumberOfItems, 'The number of products in the cart should be ' + expectedNumberOfItems + ' and we get ' + result);
});

// use case 4
test("succeed on get the product most expensive", function() {
  var cart = createSetOfProducts(); 
  var mostExpensiveItem = cart.mostExpensive(); // Laptop {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"}
  var mostExpensiveItemExpected = {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"};

  assert((mostExpensiveItem instanceof Object), 'The most expensive product:' + mostExpensiveItem + ' is not type of Object');
  assert(mostExpensiveItem.toString() === mostExpensiveItemExpected.toString(), 'The product most expensive is not the expected one');
});

// use case 5
test("succeed on get the cheapest product", function() {
  var cart = createSetOfProducts(); 
  var mostCheapestItem = cart.cheapest(); // Socks {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"}
  var mostCheapestItemExpected = {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"};

  assert((mostCheapestItem instanceof Object), 'The cheapest product:' + mostCheapestItem + ' is not type of Object');
  assert(mostCheapestItem.toString() === mostCheapestItemExpected.toString(), 'The cheapest product is not the expected one');
});

// use case 6
test("succeed on get the Nº of products from a category", function() {
  var cart = createSetOfProducts();
  var category = Electronics;
  var productsResult = cart.numberOf(category);

  var expected = 4; 

  assert(productsResult === expected, 'the result: ' + productsResult.length + ' should be ' + expected);

});

// use case 7
test("succeed on get the products by price range", function() {
    var cart = createSetOfProducts();
    var min = 5;
    var max = 10;

    var productsByPriceRange = cart.productsByPriceRange(min, max);

    var expected = [{screenSize: 20, model: "1800", price: 9.99, brand: "HP"}];

    
    assert(productsByPriceRange.toString() === expected.toString(), 'result value: ' + productsByPriceRange + ' is different from expected: ' + expected);

});