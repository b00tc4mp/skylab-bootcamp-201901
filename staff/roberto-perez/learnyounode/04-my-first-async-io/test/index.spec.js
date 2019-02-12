const { expect } = require("chai");
const readFile = require("./index");

describe("My firts async IO", () => {
  it("Should succeed on correct file path", done => {
    const file = __dirname + "/helloworld.txt";
    readFile(file, (err, data) => {
      done();
      expect(err).to.equal(null);
      expect(data).to.equal(3);
    });
  });
});
