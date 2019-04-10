function callback(element, index){
    if(element.length > 6){
      return true 
    } else {
      return false
    }
  }

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
console.log(filter(words, callback)) // length < 6 // ['spray', 'limit', 'elite']