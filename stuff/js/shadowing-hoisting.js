// demo 1

var x = 1;

function foo() {
	return x + 1;
}

foo(); // 2

// demo 2 (shadowing)

var x = 1;

function foo() {
	var x;

	return x + 1;
}

foo(); // NaN

// demo 3 (shadowing + hoisting)

var x = 1;

function foo() {
	return x + 1;

	var x;
}

foo(); // NaN

// demo 4 (shadowing + hoisting, but WARN definitions are NOT hoisted (x = 3))

var x = 1;

function foo() {
	return x + 1;

	var x = 3;
}

foo(); // NaN

// equal to

var x = 1;

function foo() {
	var x;

	return x + 1;

	x = 3;
}

foo(); // NaN

// demo 5 (shadowing)

var x = 1;

function foo() {
	var x = 3;

	return x + 1;
}

foo(); // 4

// demo 6 (shadowing + hoisting)

var x = 1;

function foo() {
	x = 3;

	return x + 1;

	var x;
}

foo(); // 4