/**
 * Abstraction of indexOf.
 *
 *
 *
 *
 * @param {Array} arr
 * @param {resInterno}
 * @param {respuesta}
 *
 * @throws {TypeError} - If array is not an array
 */
var arr = [1, 2, 3];
var result = [];

function unshifter(data) {
  var internalResult = [];

  for (var i = 0; i < data.length; i++) {
    internalResult = data[i];
    result = result + internalResult;
    internalResult = "";
  }
  if (i === data.length) {
    for (var y = 0; y < this.length; y++) {
      internalResult = this[y];
      result = result + internalResult;
      internalResult = "";
    }
  }

  return result.length;
}

unshifter(4);
