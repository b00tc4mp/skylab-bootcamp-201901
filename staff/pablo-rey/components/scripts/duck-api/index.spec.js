'use strict';

describe ("duck-api", () => {
  describe("search ducks", function() {
    it("should succeed on correct query", function(done) {
      logic.searchDucks("yellow", function(ducks) {
        expect(ducks).toBeDefined();
        expect(ducks instanceof Array).toBeTruthy();
        expect(ducks.length).toBe(13);
        done();
      });
    });

    it("should break if query is undefined", function() {
      expect(function (done) { 
        logic.searchDucks(undefined);
        done();
      }).toThrowError(Error, "undefined is not a valid query");
    });

    it('should break if invalid callback is provided', function() {
        expect(function () { logic.searchDucks('yellow', 1) }).toThrowError(Error, 'callback is not a function');
      });
    // TODO fail cases
  });
}) 