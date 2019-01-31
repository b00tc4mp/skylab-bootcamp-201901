suite("cart-methods", function() {
  describe("add", function() {
    it("succed on add an item to the list", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.list.length;
      var expected = 2;

      expect(expected === result, "do not match correct value");
    });

    it("it should fail if product is not instanceof Product ", function() {
      "it should fail if product is not instanceof Product";
      var error;
      try {
        cart.add("desk");
      } catch (err) {
        error = err;
      }

      expect(error, "should be an error");
    });
  });

  describe("total price method", function() {
    it("succed on expected result", function() {
      var cart = new Cart();
      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.totalPrice();
      var expected = 39.94;

      expect(expected === result, "do not match correct value");
    });
  });

  describe("numberOfItems", function() {
    it("succed in expected result", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.list.length;
      var expected = 2;

      expect(result === expected, "do not match correct value");
    });
  });

  describe("mostExpensive", function() {
    it("succed in expected result", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.mostExpensive();
      var expected = tanga;

      expect(
        JSON.stringify(result) === JSON.stringify(expected),
        "do not match correct value"
      );
    });
  });

  describe("cheapest", function() {
    it("succed in expected result", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.cheapest();
      var expected = socks;

      expect(result === expected, "do not match correct value");
    });
  });

  describe("numberOf", function() {
    it("succed in expected result", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);
      var result = cart.numberOf(Clothing);
      var expected = 2;

      expect(result === expected, "do not match correct value");
    });

    it("it should fail if item is not instanceof Product ", function() {
      
      var error;
      try {
        cart.numberOf("forniture");
      } catch (err) {
        error = err;
      }

      expect(error, "should be an error");
    });
  });

  describe("productsByPricecRange", function() {
    it("succed in expected result", function() {
      var cart = new Cart();

      var socks = new Socks("Calvin Klein", 42, "black", 9.99);
      var tanga = new Tanga("Wicked Weasel", 32, "red", 29.95);

      cart.add(socks);
      cart.add(tanga);

      var result = toString(cart.productsByPriceRange(5, 11));
      var expected = toString([socks]);

      expect(result === expected, "do not match correct value");
    });

    it("should fail if item is not instanceof Product", function() {
      var error;

      try {
        (cart.productsByPriceRange('min', 11));
      } catch (err) {
        error = err;
      }

      expect(error, "should be an error");
    });

    it("should fail if item is not instanceof Product", function() {
        var error;
  
        try {
          (cart.productsByPriceRange(5, max));
        } catch (err) {
          error = err;
        }
  
        expect(error, "should be an error");
      });
  });
});
