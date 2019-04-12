'use strict';

function splice(array, startCount, deleteCount, elements) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof startCount !== 'number') throw TypeError(startCount + ' is not a number');
  if (typeof deleteCount !== 'number') throw TypeError(startCount + ' is not a number');

  var startFrom;
  var isReverseMode = false;

  if (startCount === 0) {
    startFrom = 0;
  } else if (startCount < 0) {
    if (Math.abs(startCount) >= array.length) {
      startFrom = 0;
    } else {
      startFrom = array.length - startCount;
      isReverseMode = true;
    }
  }

  var deleteFrom = deleteCount;
  var isDeleteMode = false;

  if (deleteCount > 0) {
    deleteFrom = deleteCount;
    isDeleteMode = true;
  }


  if (isDeleteMode) {

  } else {
    // for (var j = startFrom; j < array.length; isReverseMode ? j-- : j++) {}
    // for (var j = startFrom; j)
  }
}
