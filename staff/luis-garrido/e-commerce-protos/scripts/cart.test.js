suite("cart", function () {

  function getReadyToTest() {

    var cart = new Cart();

    var tshirt = new TShirt(399, "Supreme", "white", "M");
    var sweater = new Sweater(149, "Diesel", "black", "M");
    var laptop = new Laptop(1599, "Apple", "MacBook Pro", 15);
    var desktop = new Desktop(420, "HP", "1800", 20);
    var mobile = new Mobile(999, "Apple", "iPhone X", "space-gray");
    var mobile2 = new Mobile(119, "Xiaomi", "5X", "space-rose");
    var socks = new Socks(9.99, "Calvin Klein", "black", 42);
    var tanga = new Tanga(29.95, "Wicked Weasel", "red", 32);
    var bra = new Bra(39, "Calvin Klein", "cream", 80, "push-up");
    var slips = new Slips(13.99, "Abanderado", "purple", 42);
    var jeans = new Jeans(199, "Diesel", "denim", 42, "regular");
    var shorts = new Shorts(35, "Adidas", "blue", 42, "Sport");
    var cap = new Cap(29, "Obey", "black", "M");
    var hat = new Hat(44.99, "Jack & Jones", "red", undefined, "Cup");

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

    return cart;
  }
  
  // use case 1

  describe("cart should add products", function() {
    it("should fill cart with one product", function() {
      var cart = new Cart();
      var tshirt = new TShirt(399, "Supreme", "white", "M");
      cart.add(tshirt);

      expect(cart.products.length === 1, "products should be 1 length");
      expect(cart.products[0] === tshirt, "expected product " + tshirt + " was not added to cart products");
    });
  });

  // -----------------------------------------------------------

  // use case 2

  describe("sum prices and items", function() {
    it("should succeed on get the total price of the cart", function () {
      var cart = getReadyToTest();
      var expectedValue = 4085.92;
      var totalPrice = cart.totalPrice();
  
      expect(expectedValue === totalPrice, "total price " + totalPrice + "is not the expected value " + expectedValue);
    });
  
  // --------------------------------------------------------------------

  // use case 3

    it("should calculate total number of items in cart", function () {
      var cart = getReadyToTest();
      var expectedValue = 14;
      var totalItems = cart.numberOfItems();

      expect(totalItems === expectedValue, "products should be 6 length");
    });
  });

  // -----------------------------------------------------------------

  // use case 4

  describe("most expensive and cheapest items", function() {
    it("should return the most expensive item in cart", function () {

      var cart = new Cart();

      var tshirt = new TShirt(399, "Supreme", "white", "M");
      var sweater = new Sweater(149, "Diesel", "black", "M");
      var laptop = new Laptop(1599, "Apple", "MacBook Pro", 15);
      var desktop = new Desktop(420, "HP", "1800", 20);
      var mobile = new Mobile(999, "Apple", "iPhone X", "space-gray");
      var mobile2 = new Mobile(119, "Xiaomi", "5X", "space-rose");
      var socks = new Socks(9.99, "Calvin Klein", "black", 42);
      var tanga = new Tanga(29.95, "Wicked Weasel", "red", 32);
      var bra = new Bra(39, "Calvin Klein", "cream", 80, "push-up");
      var slips = new Slips(13.99, "Abanderado", "purple", 42);
      var jeans = new Jeans(199, "Diesel", "denim", 42, "regular");
      var shorts = new Shorts(35, "Adidas", "blue", 42, "Sport");
      var cap = new Cap(29, "Obey", "black", "M");
      var hat = new Hat(44.99, "Jack & Jones", "red", undefined, "Cup"); 

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

      expectedValue = laptop;

      mostExpensiveItem = cart.mostExpensive();

      expect(mostExpensiveItem === expectedValue, "most expensive item must be laptop");
    });

  // -----------------------------------------------------------------

  // use case 5

    it("should return the cheapest item in cart", function () {

      var cart = new Cart();

      var tshirt = new TShirt(399, "Supreme", "white", "M");
      var sweater = new Sweater(149, "Diesel", "black", "M");
      var laptop = new Laptop(1599, "Apple", "MacBook Pro", 15);
      var desktop = new Desktop(420, "HP", "1800", 20);
      var mobile = new Mobile(999, "Apple", "iPhone X", "space-gray");
      var mobile2 = new Mobile(119, "Xiaomi", "5X", "space-rose");
      var socks = new Socks(9.99, "Calvin Klein", "black", 42);
      var tanga = new Tanga(29.95, "Wicked Weasel", "red", 32);
      var bra = new Bra(39, "Calvin Klein", "cream", 80, "push-up");
      var slips = new Slips(13.99, "Abanderado", "purple", 42);
      var jeans = new Jeans(199, "Diesel", "denim", 42, "regular");
      var shorts = new Shorts(35, "Adidas", "blue", 42, "Sport");
      var cap = new Cap(29, "Obey", "black", "M");
      var hat = new Hat(44.99, "Jack & Jones", "red", undefined, "Cup");

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

      expectedValue = socks;

      cheapestItem = cart.cheapest();

      expect(cheapestItem === expectedValue, "cheapest item must be laptop");
    });
  });

  // -----------------------------------------------------------------

  // use case 6

  describe("counting items", function() {
    it("should count clothing items", function () {

      var cart = getReadyToTest();

      expectedValue = 10;
      var category = Clothing;
      numberOfClothes = cart.numberOf(category);

      expect(numberOfClothes === expectedValue, "number of clothing items must be 10");
    });

  // -----------------------------------------------------------------

  // use case 7


    it("should count electronics items", function () {

      var cart = getReadyToTest();

      expectedValue = 4;
      var category = Electronics;
      numberOfElectronics = cart.numberOf(category);

      expect(numberOfElectronics === expectedValue, "number of electronic items must be 4");
    });
  });

  // -----------------------------------------------------------------

  // use case 8

  describe("products between prices", function() {
    it("should return an array with products in between prices", function () {

      var cart = new Cart();

      var tshirt = new TShirt(399, "Supreme", "white", "M");
      var sweater = new Sweater(149, "Diesel", "black", "M");
      var laptop = new Laptop(1599, "Apple", "MacBook Pro", 15);
      var desktop = new Desktop(420, "HP", "1800", 20);
      var mobile = new Mobile(999, "Apple", "iPhone X", "space-gray");
      var mobile2 = new Mobile(119, "Xiaomi", "5X", "space-rose");
      var socks = new Socks(9.99, "Calvin Klein", "black", 42);
      var tanga = new Tanga(29.95, "Wicked Weasel", "red", 32);
      var bra = new Bra(39, "Calvin Klein", "cream", 80, "push-up");
      var slips = new Slips(13.99, "Abanderado", "purple", 42);
      var jeans = new Jeans(199, "Diesel", "denim", 42, "regular");
      var shorts = new Shorts(35, "Adidas", "blue", 42, "Sport");
      var cap = new Cap(29, "Obey", "black", "M");
      var hat = new Hat(44.99, "Jack & Jones", "red", undefined, "Cup");

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

      expectedValue = [bra, mobile2, hat, shorts];
      productsInBetween = cart.productsByPriceRange(30, 120);
      console.log(cart);
      expect(productsInBetween.toString() === expectedValue.toString(), "number of products between 30 and 120 prices must be 4");
    });
  });
});
