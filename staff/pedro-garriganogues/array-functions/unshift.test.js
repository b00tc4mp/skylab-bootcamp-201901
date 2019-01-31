suite("some", function() {
  describe("casos de exito", function() {
    it("CASE word coincidence", function() {
      var arr = [1, 2, 3, 4, 5];
      var data = 4;

      var expected = [0];

      var res = unshifter(arr, data, function(element) {
        return element;
      });

      expect(res === expected, "parameter and result should be the same");
    });
  });
});
