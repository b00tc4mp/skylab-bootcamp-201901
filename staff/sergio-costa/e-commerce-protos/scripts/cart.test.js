function createSetOfProducts() {
  var cart = new Cart;

  var tshirt = new TShirt(120, "Supreme", "white", "M");
  cart.add(tshirt);
  var sweater = new Sweater(120, "Diesel", "black", "M");
  cart.add(sweater);
  var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
  cart.add(laptop);
  var desktop = new Desktop(120, "HP", "1800", 20);
  cart.add(desktop);
  var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
  cart.add(mobile);
  var mobile2 = new Mobile(120, "Xiaomi", "5X", "space-rose");
  cart.add(mobile2);

  return cart;
}

suite("cart", function () {

  describe('should succeed on add', function () {

    it("cart should add 1 product expected", function () {
      var cart = new Cart();
      var tshirt = new TShirt(399, "Supreme", "white", "M");
      cart.add(tshirt);

      expect
        (cart.products.length === 1, "products should be 1 length");
      expect(
        cart.products[0] === tshirt,
        "expected product " + tshirt + " was not added to cart products"
      );
    });

  });

  describe('return the total price of the products inside the cart', function () {

    it("succeed on get the total price of the cart", function () {

      var cart = createSetOfProducts();

      var expectedValue = 730;

      var totalPrice = cart.totalPrice();

      expect(
        expectedValue === totalPrice,
        "total price " + totalPrice + "is not the expected value " + expectedValue
      );
    });

  });

  describe('Get the product most expensive and the cheapest one', function () {

    it('should succed on getting the most expensive product', function () {

      var cart = new Cart;

      var tshirt = new TShirt(120, "Supreme", "white", "M");
      cart.add(tshirt);
      var sweater = new Sweater(120, "Diesel", "black", "M");
      cart.add(sweater);
      var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
      cart.add(laptop);
      var desktop = new Desktop(120, "HP", "1800", 20);
      cart.add(desktop);
      var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
      cart.add(mobile);
      var mobile2 = new Mobile(120, "Xiaomi", "5X", "space-rose");
      cart.add(mobile2);

      var result = cart.mostExpensive();

      var expectedValue = laptop;

      expect(result === expectedValue, 'result ' + result + ' should be like ' + expectedValue);

    });

    it('should succed on getting the cheapest product', function(){

      var cart = new Cart;

      var tshirt = new TShirt(120, "Supreme", "white", "M");
      cart.add(tshirt);
      var sweater = new Sweater(2, "Diesel", "black", "M");
      cart.add(sweater);
      var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
      cart.add(laptop);
      var desktop = new Desktop(120, "HP", "1800", 20);
      cart.add(desktop);
      var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
      cart.add(mobile);
      var mobile2 = new Mobile(30, "Xiaomi", "5X", "space-rose");
      cart.add(mobile2);

      var result= cart.cheapest();

      var expectedValue = sweater;

      expect(result === expectedValue, 'result should be like expected');

    });

  });

  describe('should succed on number of', function(){

    it('should succed on getting number of clothing', function(){

      var cart = new Cart;

      var tshirt = new TShirt(120, "Supreme", "white", "M");
      cart.add(tshirt);
      var sweater = new Sweater(2, "Diesel", "black", "M");
      cart.add(sweater);
      var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
      cart.add(laptop);
      var desktop = new Desktop(120, "HP", "1800", 20);
      cart.add(desktop);
      var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
      cart.add(mobile);
      var mobile2 = new Mobile(30, "Xiaomi", "5X", "space-rose");
      cart.add(mobile2);

      var result= cart.numberOf(Clothing);

      var expectedValue = 2;

      expect(result === expectedValue, 'result should be like expected');

    });

    it('should succed on getting number of Electronics', function(){

      var cart = new Cart;

      var tshirt = new TShirt(120, "Supreme", "white", "M");
      cart.add(tshirt);
      var sweater = new Sweater(2, "Diesel", "black", "M");
      cart.add(sweater);
      var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
      cart.add(laptop);
      var desktop = new Desktop(120, "HP", "1800", 20);
      cart.add(desktop);
      var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
      cart.add(mobile);
      var mobile2 = new Mobile(30, "Xiaomi", "5X", "space-rose");
      cart.add(mobile2);

      var result= cart.numberOf(Electronics);

      var expectedValue = 4;

      expect(result === expectedValue, 'result should be like expected');

    });

  });

  describe('should succed on getting products on a range', function(){

    it('should succed on getting a range', function(){

      var cart = new Cart;

      var tshirt = new TShirt(120, "Supreme", "white", "M");
      cart.add(tshirt);
      var sweater = new Sweater(2, "Diesel", "black", "M");
      cart.add(sweater);
      var laptop = new Laptop(130, "Apple", "MacBook Pro", 15);
      cart.add(laptop);
      var desktop = new Desktop(120, "HP", "1800", 20);
      cart.add(desktop);
      var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
      cart.add(mobile);
      var mobile2 = new Mobile(30, "Xiaomi", "5X", "space-rose");
      cart.add(mobile2);

      var result= cart.productsByPriceRange(30,120);

      var expected = [tshirt, desktop, mobile, mobile2];

      expect(JSON.stringify(result) == JSON.stringify(expected), 'result should be like expected');
    });

  });

});



