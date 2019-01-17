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
