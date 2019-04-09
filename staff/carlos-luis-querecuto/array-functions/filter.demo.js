console.log('DEMO', 'filter');

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

console.log(filter(words,word => word.length > 6))
// expected output: Array ["exuberant", "destruction", "present"]