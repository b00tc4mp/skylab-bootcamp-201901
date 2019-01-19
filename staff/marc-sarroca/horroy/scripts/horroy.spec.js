describe("Horroy", function() {
  // WARN is this initializaton necessary?

  //var horroy;

  //beforeEach(function() {
  //horroy = new Horroy(87, 67);
  //});

  describe("from", function() {
    it("should create a Horroy from string", function() {
      var string = "hola mundo";

      var horr = Horroy.from(string);

      expect(horr.toString()).toBe(string.split("").toString()); // h,o,l,a, ,m,u,n,d,o
    });
  });

  describe("push", function() {
    it("should push a value to horroy", function() {
      var horroy = new Horroy(87, 67);
      horroy.push(5);
      expect(horroy[2]).toEqual(5);
      expect(horroy.length).toEqual(3);
    });
  });
  describe("forEach", function() {
    it("should iterate horroy", function() {
      var horroy = new Horroy(1, 2, 3);
      var res = 12;
      var count = 0;
      horroy.forEach(function(item) {
        count += item * 2;
      });
      expect(count).toEqual(res);
    });
  });
});
