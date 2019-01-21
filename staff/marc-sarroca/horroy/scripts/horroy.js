function Horroy() {
  this.length = arguments.length;
  var firstElement = arguments[0];
  var isFirstElementNumber = typeof firstElement === "number";

  if (this.length === 1 && isFirstElementNumber) {
    this.length = firstElement;
  } else {
    for (var i = 0; i < this.length; i++) {
      this[i] = arguments[i];
    }
  }
}

Horroy.from = function(value) {
  var horr = new Horroy();

  horr.length = value.length;

  if (typeof value === "string")
    for (var i = 0; i < value.length; i++) horr[i] = value[i];

  return horr;
};

Horroy.prototype.push = function(value) {
  this[this.length] = value;
  this.length++;
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

Horroy.prototype.pop = function() {
  var lastPosition = this.length - 1;
  var lastItem = this[lastPosition];
  delete this[lastPosition];
  this.length--;
  return lastItem;
};

Horroy.prototype.indexof = function(value, indexstart) {
  this.indexstart = indexstart;
  this.value = value;
  if (this.indexstart === undefined) {
    this.indexstart = 0;
  }
  for (var i = this.indexstart; i < this.length; i++) {
    if (this[i] === this.value) {
      return i;
    }
    if (i === this.length - 1) {
      return -1;
    }
  }
};

Horroy.prototype.join = function(value) {
  this.value = value;
  if (this.value === undefined) {
    value = ",";
  }
  if (this.value === null) {
    this.value = "null";
  }
  var string = "";
  this.value = this.value.toString();
  for (var i = 0; i < this.length; i++) {
    string += this[i] + value;
  }
  res = string.substring(0, string.length - this.value.length);
  return res;
};

Horroy.prototype.reverse = function() {
  var pos = 0;
  var pos2 = 0;
  var reverse = [];
  for (var i = this.length - 1; i > -1; i--) {
    reverse[pos] = this[i];
    pos++;
  }

  for (var i = 0; i < reverse.length; i++) {
    this[pos2] = reverse[i];
    pos2++;
  }
};

Horroy.prototype.slice = function(first, last) {
  this.last = last;
  this.first = first;
  var res = [];
  var length = this.length;
  var end = this.last > length ? length : this.last;

  for (i = this.first; i < end; i++) {
    var newPos = i - this.first;
    res[newPos] = this[i];
  }
  return res;
};
