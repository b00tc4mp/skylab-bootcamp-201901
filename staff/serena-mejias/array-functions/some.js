var fruits = ["apple", "banana", "mango", "guava"];

function some(array, method) {

    if(typeof method !== 'function'){
        throw new Error('the argument must be a function')
    }

  for (var i = 0; i < array.length; i++) {
    if (method(array[i])) {
      return true;
    }
  }
  return false;
}



