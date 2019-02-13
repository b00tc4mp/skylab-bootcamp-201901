const { expect } = require("chai");
const path = require("path");
const readFile = require("./index");

describe("My firts async IO", () => {
  it("Should succeed on correct file path", done => {
    const filePath = path.join(__dirname, 'helloworld.txt');
    readFile(filePath, (err, data) => {
      expect(err).to.equal(null);
      expect(data).to.equal(3);
      done();
    });
  });
});
