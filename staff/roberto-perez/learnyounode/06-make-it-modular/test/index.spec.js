const { expect } = require('chai');
const byExtension = require("./index");

describe("Make it modular", () => {
    it("Should succeed on correct folder and extension", done => {
      let folder = __dirname;
      let ext = "js";
      byExtension(folder, ext, (err, data) => {
        done();
        expect(err).to.equal(null);
        expect(data).to.eql([ 'index.js', 'index.spec.js' ]);
      });
    });
  });