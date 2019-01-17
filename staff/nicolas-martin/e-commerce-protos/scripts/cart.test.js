suite("cart");

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

test("succeed on get the total price of the cart", function() {
  var cart = createSetOfProducts();
  var totalPrice = cart.totalPrice();
  var expectedValue = 720;

  assert(
          expectedValue === totalPrice,
          "total price " + totalPrice + "is not the expected value " + expectedValue
  );
});

test("succeed on get the number of products in cart", function() {
  var cart = createSetOfProducts(); 
  var result = cart.numberOfItems();
  var expectedNumberOfItems = 6;

  assert((typeof expectedNumberOfItems === "number"), 'The result: ' + expectedNumberOfItems + ' is not from type of number');
  assert(result === expectedNumberOfItems, 'The number of products in the cart should be ' + expectedNumberOfItems + ' and we get ' + result);
});

test("succeed on get the product most expensive", function() {
  var cart = createSetOfProducts(); 
  var mostExpensiveItem = cart.mostExpensive(); // Laptop {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"}
  var mostExpensiveItemExpected = {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"};

  assert((mostExpensiveItem instanceof Object), 'The most expensive product:' + mostExpensiveItem + ' is not type of Object');
  assert(mostExpensiveItem.toString() === mostExpensiveItemExpected.toString(), 'The product most expensive is not the expected one');
});

test("succeed on get the cheapest product", function() {
  var cart = createSetOfProducts(); 
  var mostCheapestItem = cart.cheapest(); // Socks {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"}
  var mostCheapestItemExpected = {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"};

  assert((mostCheapestItem instanceof Object), 'The cheapest product:' + mostCheapestItem + ' is not type of Object');
  assert(mostCheapestItem.toString() === mostCheapestItemExpected.toString(), 'The cheapest product is not the expected one');
});

test("succeed on get the products from a category", function() {
  var cart = createSetOfProducts();
  var category = Electronics;
  var productsResult = cart.numberOf(category);

  var expectedProducts = [{screenSize: 15, model: "MacBook Pro", price: 120, brand: "Apple"},
                          {screenSize: 20, model: "1800", price: 120, brand: "HP"},
                          {mobileColor: "space-gray", model: "iPhone X", price: 120, brand: "Apple"},
                          {mobileColor: "space-rose", model: "5X", price: 120, brand: "Xiaomi"}]; 
                          
  //it's nos necessary order the array before comparing?

  var areTheSame = expectedProducts.every(function(expectedProduct, index){
    return (expectedProduct.toString() === productsResult[index].toString());
  });

  assert(productsResult.length === expectedProducts.length, 
          'the array result ' + productsResult + ' has another length than expected: ' + expectedProducts.length);

  assert(areTheSame, 'the result: ' + productsResult + ' and the expected products ' + expectedProducts + ' are different');

});