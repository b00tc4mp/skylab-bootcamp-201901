function Horroy() {
  this.length = arguments.length;

  if (arguments.length)
    for (var i = 0; i < arguments.length; i++)
      // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
      this[i] = arguments[i];
}

Horroy.from = function(value) {
  var horr = new Horroy();

  horr.length = value.length;

  if (typeof value === "string")
    for (var i = 0; i < value.length; i++) horr[i] = value[i];

  return horr;
};

Horroy.prototype.push = function(value) {
  this[this.length++] = value;
  return this.length;
};

Horroy.prototype.forEach = function(callback) {
  for (var i = 0; i < this.length; i++) callback(this[i]);
};

Horroy.prototype.toString = function() {
  var string = "";

  for (var i = 0; i < this.length - 1; i++) string += this[i] + ",";

  string += this[this.length - 1];

  return string;
};

//

Horroy.prototype.fill = function(value, start, end) {
  if (arguments.length > 3) throw Error("too many arguments");

  start = start === undefined ? 0 : start < 0 ? this.length + start : start;
  end = end === undefined ? this.length : end < 0 ? this.length + end : end;

  for (var i = start; i < end; i++) this[i] = value;

  return this;
};

Horroy.prototype.find = function(callback) {
  if (arguments.length > 1) throw Error("too many arguments");

  if (!(callback instanceof Function))
    throw TypeError("callback is not a function");

  for (var i = 0; i < this.length; i++) {
    var value = this[i];

    if (callback(value)) return value;
  }
};

Horroy.prototype.indexof = function(value) {
  if (arguments.length > 1) throw Error("too many arguments");

  if (!(typeof value === "string" || typeof value === "number"))
    throw TypeError("the argument must be a string or a number");

  for (var i in this) {
    if (this[i] === value) {
      return i;
    }
  }
};

Horroy.prototype.join = function join(separator) {
  if (arguments.length > 1) throw Error("too many arguments");

  var string = "";

  separator = separator === undefined ? "," : separator;

  for (var i = 0; i < this.length; i++) {
    if (i === this.length - 1) {
      string += this[i];
      return string;
    }
    string += this[i] + separator;
  }
  return string;
};

Horroy.prototype.reverse = function reverse() {
  for (var i = 0; i < Math.floor(this.length / 2); i++) {
    var n = this[i];
    this[i] = this[this.length - 1 - i];
    this[this.length - 1 - i] = n;
  }
  return this;
};

Horroy.prototype.pop = function pop() {
  var value = this[this.length - 1];
  delete this[this.length - 1];

  return value;
};

Horroy.prototype.reduce = function reduce() {
  //if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  //if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

  var i = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    var item = this[i];

    accumulator = callback(accumulator, item);
  }

  return accumulator;
};

Horroy.prototype.slice = function slice(start,end) {
  start === 'undefined'? 0 : start;
  end === 'undefined'? this.length : end;
  var newHorroy = {};
  var index = 0
  
for (var i = start; i<end; i++){
  newHorroy[index] = this[i];
  index++;
}
return newHorroy;
};

Horroy.prototype.some = function(method){
  if (!(typeof method === "function"))
    throw TypeError("the argument must be a function");

  for (var i = 0; i < this.length; i++) {
    if (method(this[i])) {
      return true;
    }
  }
  return false;
}