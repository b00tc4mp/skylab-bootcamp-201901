function salute(name) {
    var symbol = '!';

	return function(saluation) { 
		return saluation + ' '  + name + symbol; 
	}
}

var salute2 = salute('Sergio');

salute2('shut up');
// "shut up Sergio!"

salute2('bye');
// "bye Sergio!"

salute2('hola');
// "hola Sergio!"

var salute3 = salute('Victor');

salute3('despierta');
// "despierta Victor!"

salute3('well done');
// "well done Victor!"

salute2('hey');
// "hey Sergio!"