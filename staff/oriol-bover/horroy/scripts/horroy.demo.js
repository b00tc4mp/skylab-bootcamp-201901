var horroy = new Horroy(1, 2, 3); // ~ [1, 2, 3]

horroy.push(4);
horroy.push(5);

horroy.forEach(function (value) { console.log(value); }); // 1, 2, 3, 4, 5

horroy.push(10);
horroy.push(11);
horroy.push(12);

console.log(horroy.fill(0, 2, 4));
console.log(horroy.find(function(element){return element > 10}));

// var horroy2 = horroy.map(function (value) { return value * 2; });

// console.log(horroy2.toString()); // 2,4,6, 8
