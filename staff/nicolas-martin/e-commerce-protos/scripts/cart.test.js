function createSetOfProducts() {
  var cart = new Cart;

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

suite("cart", function(){

    describe('*** manage products from Cart ***', function(){
      it("should add 1 product", function() {
        var cart = new Cart();
        var tshirt = new TShirt(399, "Supreme", "white", "M");
        cart.add(tshirt);
      
        expect(cart.products.length === 1, "products should be 1 length");
        expect(
          cart.products[0] === tshirt,
          "expected product " + tshirt + " was not added to cart products"
        );
      });
    
    // use case 2
    it("should get the total price of the cart", function() {
      var cart = createSetOfProducts();
      var totalPrice = cart.totalPrice();
      var expectedValue = 232.21;
      expect(
              expectedValue === totalPrice,
              "total price " + totalPrice + "is not the expected value " + expectedValue
      );
    });
    
    // use case 3
    it("should get the number of products in cart", function() {
      var cart = createSetOfProducts(); 
      var result = cart.numberOfItems();
      var expectedNumberOfItems = 6;
    
      expect((typeof expectedNumberOfItems === "number"), 'The result: ' + expectedNumberOfItems + ' is not from type of number');
      expect(result === expectedNumberOfItems, 'The number of products in the cart should be ' + expectedNumberOfItems + ' and we get ' + result);
    });
    
    // use case 4
    it("should get the product most expensive", function() {
      var cart = createSetOfProducts(); 
      var mostExpensiveItem = cart.mostExpensive(); // Laptop {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"}
      var mostExpensiveItemExpected = {screenSize: 15, model: "MacBook Pro", price: 1599, brand: "Apple"};
    
      expect((mostExpensiveItem instanceof Object), 'The most expensive product:' + mostExpensiveItem + ' is not type of Object');
      expect(mostExpensiveItem.toString() === mostExpensiveItemExpected.toString(), 'The product most expensive is not the expected one');
    });
    
    // use case 5
    it("should get the cheapest product", function() {
      var cart = createSetOfProducts(); 
      var mostCheapestItem = cart.cheapest(); // Socks {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"}
      var mostCheapestItemExpected = {color: "black", size: 42, price: 9.99, brand: "Calvin Klein"};
    
      expect((mostCheapestItem instanceof Object), 'The cheapest product:' + mostCheapestItem + ' is not type of Object');
      expect(mostCheapestItem.toString() === mostCheapestItemExpected.toString(), 'The cheapest product is not the expected one');
    });
    
    // use case 6
    it("should get the Nº of products from a category", function() {
      var cart = createSetOfProducts();
      var category = Electronics;
      var productsResult = cart.numberOf(category);
    
      var expected = 4; 
    
      expect(productsResult === expected, 'the result: ' + productsResult.length + ' should be ' + expected);
    });
    
    // use case 7
    it("should get the products by price range", function() {
        var cart = createSetOfProducts();
        var min = 5;
        var max = 10;
    
        var productsByPriceRange = cart.productsByPriceRange(min, max);
    
        var expected = [{screenSize: 20, model: "1800", price: 9.99, brand: "HP"}];
    
        
        expect(productsByPriceRange.toString() === expected.toString(), 'result value: ' + productsByPriceRange + ' is different from expected: ' + expected);
    });
  });

  describe('*** input data validation ***', function(){
    it("should thrown an error when search products by range with not a number in productsByPriceRange", function() {
      var cart = createSetOfProducts();
      var min = '';
      var max = 10;
      var error;

      try {
        var productsByPriceRange = cart.productsByPriceRange(min, max);
      } catch (err) {
        error = err;
      }

      expect(error, 'should thrown an error'); 
    });



    it("should thrown an error when using not Product object in productsByPriceRange", function() {
      var cart = new Cart;
      var searchObject = Product;
      var error;

      try {
        var productsInCategory = cart.numberOf(searchObject);
      } catch (err) {
        error = err;
      }
      expect(error, 'should thrown an error'); 
      expect(error instanceof TypeError, 'should thrown a TypeError');
    });
  });

  
   
});