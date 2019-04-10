var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];


function morethan6(element, index) {

  if (element.length > 6) {
    return true

  } else {
    return false
  }

}

function some(array, callback) {



  for (var i = 0; i < array.length; i++) {

    if (callback(array[i], i) === true) {


      return true

    }


  }


  return false

}

console.log(some(words, morethan6)) // length < 6 // ['spray', 'limit', 'elite']



