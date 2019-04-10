'use strict';

/**
 *
 * Function that applies a callback into an accumulator from right to left. Then it returns a unique value.
 *
 * @param {Array} array The array that will be transform and reduced.
 * @param {Function} callback Function that will transform each array value.
 * @param {Value} valorInicial If passed, it will be the first item to transform.
 *
 * @returns {Value} The product of the callback over the accumulator.
 */

function reduceRight(array, callback, valorInicial) {
  var arrLength = array.length-1;
  var i = arrLength - 1;
  var valorAnterior = array[arrLength];
  var valorActual = array[arrLength-1];

  if (valorInicial) {
    i = arrLength;
    valorAnterior = valorInicial;
  }

  for (i; i >= 0; i--) {
    valorActual = array[i];
    valorAnterior = callback(valorAnterior, valorActual);
  }

  return valorAnterior;
}