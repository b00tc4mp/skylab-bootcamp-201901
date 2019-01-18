/**
 * Abstraction of splice.
 *
 * this method changes the contents of an array by removing or replacing existing
 * elements and/or adding new elements.
 *
 * @param {Array} array -array to splice
 * @param {number} start -number to start to splice
 * @param {number} delated - number of elements to delate
 * @param {*} items - items that I want to add. The number of items can be infinit.
 *
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when del or start are not numbers
 *
 * @return {Array} - cut array
 */

function splice(arr, start, deleteCount) {
  if (!(arr instanceof Array)) throw TypeError(arr + " should be an Array");
  if (typeof start !== "number") throw TypeError(start + " is not a number");
  
  deleteCount = (deleteCount === undefined || (deleteCount > arr.length - start)) ? arr.length - start : deleteCount;

  start = start > arr.length ? arr.length : start;
  start = start < 0 ? arr.length + start : start;

  var itemsToAdd = [];
  var itemsDeleted = [];
  var itemsEnd = [];
  var itemsIni = [];
  var finalArr = [];

  if (arguments.length > 3) {
    for (var i = 0; i < arguments.length - 3; i++) {
      itemsToAdd[i] = arguments[i + 3];
    }
  }

  var indexIni = 0;
  var indexDeleted = 0;
  var indexEnd = 0;

  for (var i = 0; i < arr.length; i++) {
    if (i < start) {
      itemsIni[indexIni++] = arr[i];
    } else if (i >= start && i < deleteCount + start) {
      itemsDeleted[indexDeleted++] = arr[i];
    } else {
      itemsEnd[indexEnd++] = arr[i];
    }
  }

  var index = 0;

  arr.length = itemsIni.length + itemsEnd.length + itemsToAdd.length;

  for (var j = 0; j < itemsToAdd.length; j++) {
    arr[j + start] = itemsToAdd[j];
  }
  for (var j = 0; j < itemsEnd.length; j++) {
    arr[j + start + itemsToAdd.length] = itemsEnd[j];
  }

  return itemsDeleted;
}
