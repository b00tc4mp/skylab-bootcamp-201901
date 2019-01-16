function splice(arr, start, deleteCount) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (deleteCount <= 0 && !arguments[3]) {
    throw new Error(
      "You must specify at least one new element to insert into the array"
    );
  }

  if (start >= arr.length) start = arr.length;
  if (start < 0) start = arr.length + start;

  if (deleteCount === undefined || deleteCount > arr.length - start)
    deleteCount = arr.length - start;


  for(var i = 0; i < arr.length, i++) {
    
  }
  /*var newArray = [];
  var deleteArray = [];
  var indexNewArray = 0;

  for (var i = 0; i < start; i++) {
    newArray[indexNewArray++] = arr[i];
  }

  if (deleteCount > 0) {
    var k = 0;
    for (var i = start; i < newArray.length + deleteCount; i++) {
      deleteArray[k++] = arr[i];
    }
  }

  if (arguments[3]) {
    for (var i = 3; i < arguments.length; i++) {
      newArray[indexNewArray++] = arguments[i];
    }
  }

  for (var i = newArray.length + deleteCount; i < arr.length; i++) {
    newArray[indexNewArray++] = arr[i];
  }

  for (var i = 0; i < newArray.length; i++) {
    var element = newArray[i];
    arr[i] = element;
  }

  arr.length = newArray.length;*/

  return deleteArray;
}

var myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
console.log("ORIGINAL: ", myFish);
var removed = myFish.splice(1, 0, "drum");
console.log("DELETED: ", removed);
console.log("MUTATED", myFish);
console.log("-----------------");

// function splice(arr, start, deleteCount) {

//   if(deleteCount === 0) {
//     start = start + 1;
//   }

//   if (deleteCount === 0 && !arguments[3]) {
//     throw new Error(
//       "You must specify at least one new element to insert into the array"
//     );
//   } else if (
//     typeof deleteCount === "undefined" ||
//     deleteCount > arr.length - start
//   ) {
//     deleteCount = arr.length - start;
//   }

//   //   console.log("DELETECOUNT:", deleteCount);

//   var inicio = [];
//   var delArr = [];
//   var index = 0;

//   var j = 0;
//   for (var i = 0; i < start; i++) {
//     inicio[index] = arr[i];
//     index++;
//   }

//   // console.log("INICIO", inicio);
//   //if(deleteCount > 0) {
//   var k = 0;
//   for (var i = start; i < inicio.length + deleteCount; i++) {
//     delArr[k] = arr[i];
//     k++;
//   }
//   //}
//   // console.log("DEL", delArr);
//   if (arguments[3]) {
//     for (var i = 3; i < arguments.length; i++) {
//       inicio[index] = arguments[i];
//       arr.length = arr.length + 1;
//       index++;
//     }
//   }
//   console.log("AAAAAAA", inicio.length + delArr.length);
//   console.log("AAAAAAA", arr.length);

//   for (var i = inicio.length + delArr.length; i < arr.length; i++) {
//     inicio[index] = arr[i];
//     index++;
//   }

//   for (var i = 0; i < inicio.length; i++) {
//     var element = inicio[i];
//     arr[i] = element;
//   }

//   arr.length = inicio.length;

//   // console.log("---------------");

//   // console.log("FINAL", inicio);
//   // console.log("ARR", arr);

//   if (deleteCount === 0) return [];
//   return delArr;
// }

// var myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
// console.log("ORIGINAL: ", myFish);
// var removed = myFish.splice(2, 0, "drum");
// console.log("DELETED: ", removed);
// console.log("MUTATED", myFish);
// console.log("-----------------");

// //var myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
// //var removed = myFish.splice(2, 0, "drum");
// // inserts at 1st index position
// //console.log(removed);
// //console.log(myFish);
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

// // months.splice(4, 1, 'May');
// // replaces 1 element at 4th index
// // console.log(months);
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
