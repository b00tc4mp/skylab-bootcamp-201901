function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.prototype.toString = function() {
    var string = '';
    
    for (var i = 0; i < this.length; i++) {
        if (i === this.length-1) {
            string += this[i]
        } else {
            string += this[i] + ','
        }
    }
    return string
};

Horroy.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        this[this.length++] = element;   
    }
    
    return this.length;
};

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};


Horroy.prototype.fill = function (value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    for (var i = start; i < end; i++)
        this[i] = value;

    return this;
};

Horroy.prototype.find = function (callback) {
    if (arguments.length > 2) throw Error('too many arguments');
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        var value = this[i];

        if (callback(value)) return value;
    }
};

Horroy.prototype.indexOf = function (searchElement, fromIndex) {
    if (arguments.length > 3)
        throw Error('too many arguments');

    fromIndex = fromIndex === undefined ? 0 : fromIndex;

    for (var i = fromIndex; i < this.length; i++) {
        var value = this[i];

        if (searchElement === value)
            return i;
    }

    return -1
};

Horroy.prototype.join = function (separator) {
    if (arguments.length > 2)
        throw Error('too many arguments');

    var string = '';

    separator = separator === undefined ? ',' : (separator === null ? 'null' : separator);
    for (var i = 0; i < this.length; i++) {
        var value = this[i];

        string += i === this.length - 1 ? value : value + separator;
    }

    return string;
};

Horroy.prototype.reverse = function () {

    var horroy2 = Object.assign({}, this);

    for (let i = 0; i < this.length; i++) {
        this[i] = horroy2[this.length - 1 - i];
    }

    return this;
};

Horroy.prototype.pop = function () {

    if (this.length == 0)
        return undefined;

    var value = this[this.length - 1];
    delete this[this.length - 1];
    this.length = this.length - 1;

    return value;
};

Horroy.prototype.reduce = function (callback, accumulator) {
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

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

Horroy.prototype.slice = function (begin, end) {

    begin = typeof begin === 'undefined' ? 0 : (typeof begin === 'number' ? begin : 0);
    end = typeof end === 'undefined' ? this.length : (end > 0 ? end : this.length + end);
    var shallow_horroy = new Horroy;

    for (var i = begin; i < end; i++) {
        var element = this[i];
        if (element !== undefined) {
            shallow_horroy[shallow_horroy.length] = element;
            shallow_horroy.length++;
        }
    }

    return shallow_horroy;

};

Horroy.prototype.splice = function (start, deleteCount) {
    if (typeof start !== 'number') throw TypeError(start + ' should be a Number');
    if (typeof deleteCount !== 'number') throw TypeError(deleteCount + ' should be a Number');

    start = start > this.length ? this.length : (start >= 0 ? start : Math.max(0, this.length + start));
    deleteCount = typeof deleteCount === 'undefined' || deleteCount > this.length ? this.length : (deleteCount > 0 ? deleteCount : 0);

    //var array2 = Object.assign([], array);
    var horroy2 = new Horroy;


    //copy element
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        horroy2[horroy2.length] = element;
        horroy2.length ++;
    }

    var elements = new Horroy;
    var res = new Horroy;

    //array of new elements
    for (var a = 2; a < arguments.length; a++) {
        elements[elements.length] = arguments[a];
        elements.length++;
    }

    //get elements deleted
    if (deleteCount > 0)
        for (var d = start; d < start + deleteCount; d++) {
            res[res.length] = array[d];
            res.length++;
        }

    //resets copy
    for (let i = start; i < horroy2.length; i++) {
        delete horroy2[i];
    }
    horroy2.length = start;

    //give new values
    for (var n = 0; n < elements.length; n++) {
        var value = elements[n];
        horroy2[horroy2.length] = value;
        horroy2.length++;
    }

    //give old values
    for (var z = start + deleteCount; z < horroy.length; z++) {
        var value = horroy[z];
        horroy2[horroy2.length] = value;
        horroy2.length++;
    }

    //reboot original array
    for (var i = 0; i < horroy2.length; i++) {
        var value = horroy2[i];
        horroy[i] = value;
    }

    //delete extra elements
    for (let i = horroy2.length; i < horroy.length; i++) {
        delete horroy[i];
    }
    horroy.length = horroy2.length;

    //return deleted elemetns
    return res;
};

Horroy.prototype.some = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback+' should be Array type');

     for (var i = 0; i < this.length; i++) {
        var element = this[i];     
        if(callback(element))
            return true;
    }

     return false;
};

Horroy.prototype.filter = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

      var res = new Horroy;

      for (var i = 0; i < this.length; i++) {
        if(callback(this[i])) {
            res[res.length] = this[i];
            res.length++;
        }
    }

    return res;
};

Horroy.prototype.shift = function(){
    var res = this[0];
    var horroy2 = new Horroy;

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        horroy2[horroy2.length] = element;
        horroy2.length++;
    }

    for (var i = 0; i < this.length-1; i++) {
        this[i] = horroy2[i+1];
    }

    delete this[this.length-1];
    this.length = this.length-1;

    return res;
};

Horroy.prototype.unshift = function(){
    var horroy2 = new Horroy;

    for (var i = 0; i < arguments.length; i++) {
       var element = arguments[i];
       horroy2[horroy2.length] = element;
       horroy2.length++;
   }

    for (var i = 0; i < this.length; i++) {
       var element = this[i];
       horroy2[horroy2.length] = element;
       horroy2.length++;      
   }

    for (var i = 0; i < horroy2.length; i++) {
       var element = horroy2[i];
       this[i] = element;
   }

    this.length = horroy2.length;

    return this.length;
};