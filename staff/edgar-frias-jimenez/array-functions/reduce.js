'use strict';

/**
 *
 * Function that applies a callback into an accumulator. Then it returns a unique value.
 *
 * @param {Array} array The array that will be transform and reduced.
 * @param {Function} callback Function that will transform each array value.
 * @param {[Value]} valorInicial If passed, it will be the first item to transform.
 *
 * @returns {Value} The product of the callback over the accumulator.
 */

function reduce(array, callback, valorInicial) {
  var i = 1;
  var valorAnterior = array[0];
  var valorActual = array[1];

  if (valorInicial) {
    i = 0;
    valorAnterior = valorInicial;
  }

  for (i; i < array.length; i++) {
    valorActual = array[i];
    valorAnterior = callback(valorAnterior, valorActual);
  }

  return valorAnterior;
}
