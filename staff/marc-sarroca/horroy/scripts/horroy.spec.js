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

  describe("toString", function() {
    it("should return a new string ", function() {
      var horroy = new Horroy(1, 2, 3);
      var horroyString = horroy.toString();
      expect(typeof horroyString).toBe("string");
    });
  });
  describe("Pop", function() {
    it("should return last item", function() {
      var horroy = new Horroy(1, 2, 3);
      var horroyPop = horroy.pop();
      expect(horroyPop).toBe(3);
    });
  });

  describe("indexof", function() {
    it("should return the position of the value", function() {
      var horroy = new Horroy(1, 2, 3);
      var horroyIndexOf = horroy.indexof(2);
      expect(horroyIndexOf).toBe(1);
    });
    it("should return -1 if value not exists", function() {
      var horroy = new Horroy(1, 2, 3);
      var horroyIndexOf = horroy.indexof(4);
      expect(horroyIndexOf).toBe(-1);
    });
  });

  describe("join", function() {
    it("should return a string with new separated characters", function() {
      var horroy = new Horroy(1, 2, 3);
      var horroyJoin = horroy.join(",");
      expect(horroyJoin).toBe("1,2,3");
    });
  });

  describe("reverse", function() {
    it("shuold return a reverse array", function() {
      var horroy = new Horroy(1, 2, 3);
      horroy.reverse();
      expect(horroy[0]).toBe(3);
      expect(horroy[1]).toBe(2);
      expect(horroy[2]).toBe(1);
    });
  });

  describe("reverse", function() {
    it("should return a copy of array", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);
      var horroySplice = horroy.slice(1, 2);
      expect(horroySplice).toEqual([2]);
    });
  });
});
