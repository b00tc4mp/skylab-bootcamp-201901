var horroy = new Horroy(1, 2, 3); // ~ [1, 2, 3]

horroy.push(4);
horroy.push(5);

horroy.forEach(function (value) { console.log(value); }); // 1, 2, 3, 4, 5

horroy.push(10);
horroy.push(11);
horroy.push(12);

console.log(horroy.fill(0, 2, 4));
console.log(horroy.find(function(element){return element > 10}));
console.log(horroy.indexOf(0));
console.log(horroy.join());
console.log(horroy.reverse());
console.log(horroy.pop());
console.log(horroy.reduce(function(accum, current){return accum + current;}));
console.log(horroy.slice(2,-2));
console.log(horroy.splice(1,0, 'feb', 'march'));
console.log(horroy.some(function(ele){return ele > 10}));
console.log(horroy.filter(function(elem){return elem > 10}));
console.log(horroy.shift());
console.log(horroy);
console.log(horroy.unshift('carrot',2));


// var horroy2 = horroy.map(function (value) { return value * 2; });

// console.log(horroy2.toString()); // 2,4,6, 8
