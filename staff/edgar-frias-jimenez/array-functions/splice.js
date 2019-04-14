'use strict';

// TODO: DOCUMENT THIS: This function has the dependency of reverse and concat functions

function splice(array, startCount, deleteCount) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof startCount !== 'number') throw TypeError(startCount + ' is not a number');

  if (arguments.length === 2) { // Only start provided
    if(startCount >= array.length) {
      return new Array; // no transformations over array
    } else if (startCount === 0) { // starCount is 0 or is negative and >= array.length
      var helperArray = [];
      for(var i = 0; i < array.length; i++) {
        helperArray[helperArray.length] = array[i];
      }
      array.length = 0; // all array is cleared
      return helperArray;
    } else if (startCount < 0) {
      if (Math.abs(startCount) >= array.length) { // If (negative startCount) is greater than array.length all array is cleared and the return is the entire array.
        var helperArray = [];
        for(var i = 0; i < array.length; i++) {
          helperArray[helperArray.length] = array[i];
        }
        array.length = 0;
        return helperArray;
      } else {
        var helperArray= [];
        for (var i = array.length-1; i >= (array.length + startCount); i--) {
          helperArray[helperArray.length] = array[i];
        }

        array.length = (array.length + startCount);

        // As the resulting array was inverted I'm using the reverse function already done,
        // so this is why this can't work if the reverse.js isn't loaded before splice.
        return reverse(helperArray);
      }
    } else if (startCount < array.length) {
      var helperArray= [];
      for (var i = array.length-1; i > (startCount-1); i--) {
        helperArray[helperArray.length] = array[i];
      }
      array.length = startCount;

      // As the resulting array was inverted I'm using the reverse function already done,
      // so this is why this can't work if the reverse.js isn't loaded before splice.
      return reverse(helperArray);
    }
  } else if (arguments.length === 3) { // Start and Delete provided
    var positionZero = startCount === 0 || (startCount < 0 && Math.abs(startCount) >= array.length);

    if (deleteCount === 0 || typeof deleteCount !== 'number') { // deleteCount is 0 or !== number we do nothing
      return new Array;
    } else if (positionZero && deleteCount !== 0) { // deleteCount is greater than 0, and startCount is 0 or gretaer than array.length
      var arrayEnd = [];
      var helperArray = [];

      for (var i = 0; i <= deleteCount-1; i++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = array[i];
      }

      for (var i = deleteCount; i <= array.length-1; i++) { // We store the rest of the array that is not deleted
        arrayEnd[arrayEnd.length] = array[i];
      }

      for (var i = 0; i <= arrayEnd.length-1; i++) { // Here the array given is reassigned with arrayEnd
        array[i] = arrayEnd[i];
      }

      array.length = arrayEnd.length; // We change here the length of the resulting array

      return helperArray; // The deleted part of the array is returned

    } else if (deleteCount > (array.length - startCount)) { // If deleteCount is > array.length we delete all
      var helperArray = [];
      for (var z = 0; z <= array.length-1; z++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = array[z];
      }
      array.length = 0;

      return helperArray;

    } else { // deleteCount is a number between 1 and array.length-1
      var helperArray = [];
      var arrayStart = [];
      var arrayEnd = [];

      for (var i = 0; i <= startCount-1; i++) { // The start of the array that is not deleted
        arrayStart[arrayStart.length] = array[i];
      }

      for (var j = startCount; j <= (startCount + deleteCount)-1; j++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = array[j];
      }

      for (var q = (startCount + deleteCount); q <= array.length-1; q++) { // The end of the array that is not deleted
        arrayEnd[arrayEnd.length] = array[q];
      }

      var resultingArray = concat(arrayStart, arrayEnd);

      for (var x = 0; x <= resultingArray.length-1; x++) {
        array[x] = resultingArray[x];
      }

      array.length = resultingArray.length; // The array given is modified with the resulting array after been deleted one part of it

      return helperArray; // The deleted part of the array is returned
    }
  } else if (arguments.length > 3) { // New arguments to insert into the array given
    var positionZero = startCount === 0 || (startCount < 0 && Math.abs(startCount) >= array.length);

    // storing the arguments to fill the array
    var newItems = [];
    for (var y = 3; y <= arguments.length-1; y++) {
      newItems[newItems.length] = arguments[y];
    }


    if (positionZero && deleteCount === 0) { // As we are not deleting nothing we return empty array, even though we are modifying the original array.
      var helperArray = [];
      for (var z = 0; z <= array.length-1; z++) { // Save the original array for later
        helperArray[helperArray.length] = array[z];
      }

      for (var i = 0; i <= newItems.length-1; i++) { // Overwriting elements in the given array with the new elements
        array[i] = newItems[i];
      }

      for (var j = 0; j <= helperArray.length-1; j++) { // Adding the original array again
        array[(newItems.length)+j] = helperArray[j];
      }

      return new Array;
    }

    // TODO: Hacer cuando startCount > 1 && startCount < 0, y deleteCount > 1 && array.length
  }
}
