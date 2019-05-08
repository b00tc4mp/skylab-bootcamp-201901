'use strict';

console.log('DEMO', 'filter');

console.log('case 1');

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
console.log(filter(words, function(word){return word.length > 6}));
// ["exuberant", "destruction", "present"]