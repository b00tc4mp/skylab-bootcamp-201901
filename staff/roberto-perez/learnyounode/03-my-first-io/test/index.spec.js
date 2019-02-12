const { expect } = require("chai");
const readFileSync = require("./index");

describe("My firts IO", () => {
  it("Should succeed on correct file path", () => {
    const file = 'helloworld.txt';
    let res = readFileSync(file);
    expect(res).to.equal(3);
  });
});
