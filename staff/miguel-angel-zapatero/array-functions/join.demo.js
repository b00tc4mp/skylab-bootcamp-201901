console.log('DEMO', 'join');

var a = ['hello', 'world', 'miguel'];

console.log('case 1');
console.log(join(a, ''));
// 'helloworldmiguel'

console.log('case 2');
console.log(join(a, '-'));
// 'hello-world-miguel'

console.log('case 2');
console.log(join(a));
// 'hello,world,miguel'

console.log('\n');