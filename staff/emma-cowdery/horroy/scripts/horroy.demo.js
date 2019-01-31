var horroy = new Horroy(1, 2, 3); // ~ [1, 2, 3]

horroy.push(4);
horroy.push(5);

horroy.forEach(function (value) { console.log(value); }); // 1, 2, 3, 4, 5

// var horroy2 = horroy.map(function (value) { return value * 2; });

// console.log(horroy2.toString()); // 2,4,6, 8

var horr = Horroy.from('hola mundo')

console.log(horr)

