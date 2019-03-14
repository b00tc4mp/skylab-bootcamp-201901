const { expect } = require("chai");
const readDir = require("./index");

describe("Filtered ls", () => {
  it("Should succeed on correct folder and extension", done => {
    let folder = __dirname;
    let ext = "js";
    readDir(folder, ext, (err, data) => {
      done();
      expect(err).to.equal(null);
      expect(data).to.eql([ 'index.js', 'index.spec.js' ]);
    });
  });
});
