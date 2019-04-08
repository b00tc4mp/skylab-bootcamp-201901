console.log("DEMO", "filter");

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

console.log(filter(words, function (word) { return word.length > 6; }));
// expected output: Array ["exuberant", "destruction", "present"]
