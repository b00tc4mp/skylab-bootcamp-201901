function reduce(array, callback) {
  for (var i = 0; i < array.length; i++)
		callback(array[i], array[i++]);
}