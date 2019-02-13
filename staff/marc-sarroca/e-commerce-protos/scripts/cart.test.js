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
  var cart = new Cart();
  var tshirt = new TShirt(120, "Supreme", "white", "M");
  cart.add(tshirt);
  var sweater = new Sweater(120, "Diesel", "black", "M");
  cart.add(sweater);
  var laptop = new Laptop(120, "Apple", "MacBook Pro", 15);
  cart.add(laptop);
  var desktop = new Desktop(120, "HP", "1800", 20);
  cart.add(desktop);
  var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
  cart.add(mobile);
  var mobile2 = new Mobile(120, "Xiaomi", "5X", "space-rose");
  cart.add(mobile2);
  var expectedValue = 720;
  var totalPrice = cart.totalPrice();

  assert(
    expectedValue === totalPrice,
    "total price " + totalPrice + "is not the expected value " + expectedValue
  );
});

test("number of items", function() {
  var cart = new Cart();
  var tshirt = new TShirt(120, "Supreme", "white", "M");
  cart.add(tshirt);
  var sweater = new Sweater(120, "Diesel", "black", "M");
  cart.add(sweater);
  var laptop = new Laptop(120, "Apple", "MacBook Pro", 15);
  cart.add(laptop);
  var expectedValue = 3;
  var numberOfItems = cart.numberOfItems();

  assert(
    expectedValue === numberOfItems,
    "Your cart is products are " +
      numberOfItems +
      "is not the expected value " +
      expectedValue
  );
});

test("most expensive of items", function() {
  var cart = new Cart();
  var tshirt = new TShirt(120, "Supreme", "white", "M");
  cart.add(tshirt);
  var sweater = new Sweater(120, "Diesel", "black", "M");
  cart.add(sweater);
  var laptop = new Laptop(220, "Apple", "MacBook Pro", 15);
  cart.add(laptop);
  var expectedValue = cart.mostExpensive();
  assert(
    JSON.stringify(laptop) === JSON.stringify(expectedValue),
    "Your cart product most expensive is" +
      expectedValue +
      "is the expected value "
  );
});

test("chepeast items", function());
var cart = new Cart();
