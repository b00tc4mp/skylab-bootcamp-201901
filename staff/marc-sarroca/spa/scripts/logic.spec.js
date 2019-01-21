describe("SPA TEST", function() {
  describe("All fields must be requiered", function() {
    it("z", function() {
      expect(login).toThrowError("Email and password is required");
    });
  });
});
