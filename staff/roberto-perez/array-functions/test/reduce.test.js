suite("reduce");

test("Reduce array with all arguments", function() {
  var array = [0, 1, 2, 3, 4];

  var reduceResult = reduce(
    array,
    function(valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    },
    10
  );

  var expected = 20;

  if (reduceResult !== expected)
    throw Error(
      "Result must match the expected one"
    );
});

test("Reduce array without valorInicial arguments", function() {
  var array = [0, 1, 2, 3, 4];

  var reduceResult = reduce(array, function(
    valorAnterior,
    valorActual,
    indice,
    vector
  ) {
    return valorAnterior + valorActual;
  });

  var expected = 10;

  if (reduceResult !== expected)
    throw Error(
      "found value " + reduceResult + " does not match expected " + expected
    );
});

test("Empty array", function() {
  var error;

  var array = [];

  try {
    var reduceResult = reduce(array, function(
        valorAnterior,
        valorActual,
        indice,
        vector
      ) {
        return valorAnterior + valorActual;
      });
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("Should have thrown an error");
  if (!(error instanceof TypeError)) throw Error("should have thrown TypeError");
});

test("First argument is not array", function() {
  var error;

  var obj = {};

  var newLength;

  try {
    reduce(obj, function(valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    });
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});


test("String initial value", function() {
    var array = [0, 1, 2, 3, 4];
  
    var reduceResult = reduce(array, function(
      valorAnterior,
      valorActual,
      indice,
      vector
    ) {
      return valorAnterior + valorActual;
    }, 'a');
  
    var expected = 'a01234';
  
    if (reduceResult !== expected)
      throw Error(
        "found value " + reduceResult + " does not match expected " + expected
      );
  });