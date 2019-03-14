module.exports = (...nums) =>
  nums.reduce((accum, val) => accum + Number(val), 0);
