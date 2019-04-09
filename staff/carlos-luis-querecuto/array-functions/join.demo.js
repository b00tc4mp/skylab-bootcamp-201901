var a = ['Viento', 'Lluvia', 'Fuego'];

console.log('DEMO', 'Join');

console.log('case 1');

console.log(join(a));    

console.log('case 2');
// asigna 'Viento,Lluvia,Fuego' a miVar1
console.log(join(a,', ')); 

console.log('case 3');

// asigna 'Viento, Lluvia, Fuego' a miVar2
console.log(join(a,' + ')); 

console.log('case 4');
// asigna 'Viento + Lluvia + Fuego' a miVar3
console.log(join(a,''));   

// asigna 'VientoLluviaFuego' a miVar4