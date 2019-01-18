/**
 *Constructor function for an abstraction of an this
 */
function Horroy() {

    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        if (!(Number.isInteger(arguments[0]))) throw Error ('invalid horroy length');
        this.length = arguments[0];
    } else {
        this.length = arguments.length;
        for(var i = 0; i < arguments.length; i++)
            this[i] = arguments[i];
    };
        
};
/**
 * Abstraction of from.
 * 
 * Converts a string into an horroy.
 * 
 * @param {string} value
 * 
 * @returns {horroy} 
 * 
 * @throws {Error} -If too many/few arguments
 */
Horroy.from = function(value) {
    if (arguments.length > 1) throw Error ('too many arguments');
    if (arguments.length < 1) throw Error ('too few arguments');
    if (value === undefined || value === null) throw Error (value + ' is not an object');

    var horr = new Horroy;
   
    horr.length = value.length

    if (typeof value === 'string' || value instanceof Horroy) {
        for (var i = 0; i < value.length; i++) {
            horr[i] = value[i]
        }
        return horr;
    } else {
        return new Horroy();
    }

};
/**
 * Abstraction of isArray.
 * 
 * Validates if a passed value is an horroy.
 * 
 * @param {*} value
 * 
 * @returns {boolean}
 * 
 */
Horroy.isHorroy = function() {
    if (arguments[0] instanceof Horroy) {
        return true;
    } else {
        return false;
    }
};
/**
 * Abstraction of of.
 * 
 * Creates an horroy from the arguments passed.
 * 
 * @returns {horroy}
 * 
 */
Horroy.of = function() {
    var horr = new Horroy;

    if (arguments.length === 0) return new Horroy();
    for(var i = 0; i < arguments.length; i++) {
        horr[i] = arguments[i];
        horr.length++;
    }
    return horr;
};
/**
 * Abstraction of concat.
 * 
 * Concats two horroys into one new horroy (does not transform the two previous).
 * 
 * @param {horroy} 
 * 
 * @returns {horroy}
 * 
 */
Horroy.prototype.concat = function(horr) {
    var hor = new Horroy();

    if (arguments.length === 0) {
        for (var i = 0; i < this.length; i++) {
            hor[i] = this[i];
            hor.length++;
        };
        return hor;
    } else if (arguments[0] instanceof Horroy) {
         for (var i = 0; i < this.length; i++) {
            hor[i] = this[i];
            hor.length++;
        };
        for (var i = 0; i < this.length; i++) {
            hor[hor.length] = horr[i];
            hor.length++;
        }
        return hor;
    } else {
        for (var i = 0; i < this.length; i++) {
            hor[i] = this[i];
            hor.length++;
        };
        hor[hor.length] = arguments[0];
        hor.length++;
        return hor;
    };
};
/**
 * Abstraction of copyWithin.
 * 
 * Copies part of an horroy to the desires position of the same horroy without changing his length.
 * @param {number} target
 * @param {number} start
 * @param {number} end
 * 
 * @returns {horroy}
 * 
 */
Horroy.prototype.copyWithin = function (target, start, end) {
    var j = 0;
    end = end === undefined ? this.length : end;
    for (var i = start; i < end; i++) {
        this[target+j] = this[start+j];
        j++;
    }
    return this;
};
//ENTRIES???
/**
 * Abstraction of every.
 * 
 * Evaluates if all the elements of an horroy pass a provided test.
 * 
 * @param {function} func
 * 
 * @returns {boolean}
 * 
 * @throws {Error} - If func is not a function
 */
Horroy.prototype.every = function (func, horroy) {
    if (typeof arguments[0] !== 'function' || arguments.length < 1) throw Error (func + ' is not a function')

    var j = 0;
    for (var i = 0; i < this.length; i++) {
        if (!(func(this[i]))) {
            return false;
        } else {
            j++;
        }
    };
    if (j === this.length) return true;
    /* if (arguments[1] === undefined) {
        for (var i = 0; i < this.length; i++) {
            if (!(func(this[i]))) {
                return false;
            } else {
                return true;
            }
        };
    } else {
        for (var i = 0; i < horroy.length; i++) {
            if (!(func(horroy[i]))) {
                return false;
            } else {
                return true;
            }
        };
    }; */
};
/**
 * Abstraction of fill.
 * 
 * Fills an horroy from one position to other.
 * 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 *
 */
Horroy.prototype.fill = function(value, start, end) {

    if (arguments.length > 3) throw Error ('too many arguments');
    if (arguments.length < 1) throw Error ('too few arguments');

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    for (var i = start; i < end; i++)
        this[i] = value;

    return this;
};
/**
 * 
 * Abstraction of filter.
 * 
 * Returns the elements of an horroy that are validated througha function.
 * 
 * @param {Function} func 
 * 
 * @returns {thisay}
 */
Horroy.prototype.filter = function(func) {
    var res = new Horroy();
    var j = 0;

    if (arguments.length > 2) throw Error ('too many arguments');
    if (arguments.length < 1) throw Error ('too few arguments');

    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            res[j] = this[i]
            j++;
            res.length++;
        }
    }
    return res;
};
/**
 * Abstraction of find.
 * 
 * Finds an element in an horroy satisfying an expression.
 * 
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {*} - An item if found, otherwise undefined.
 */
Horroy.prototype.find = function(callback) {
    if (arguments.length > 1) throw Error ('too many arguments');
    if (arguments.length < 1) throw Error ('too few arguments');

    for (var i = 0; i < this.length; i++) {
        var value = this[i];

        if(callback(value)) return value;
    }
};
Horroy.prototype.findIndex= function () {

}
/**
 * 
 * Abstraction of push
 * 
 * Adds the value to the end of the horroy
 * 
 * @param {*} value
 */
Horroy.prototype.push = function(value) {
    this[this.length++] = value;
};

/**
 * Abstraction of forEach
 * 
 * Calls a function for every argument of an horroy
 * 
 * @param {function} callback
 * 
 */
Horroy.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++)
        callback(this[i]);
};

/**
 * Abstraction of pop.
 * 
 * Deletes the last element of an horroy.
 * 
 */
Horroy.prototype.pop = function() {
    if (this.length === 0) return undefined;

    var res = this[this.length-1];

    delete this[this.length-1];
    this.length = this.length-1;
    return res;
};
/**
 * 
 * Abstraction of indexOf.
 * 
 * Returns the first position in the horroy where the searched item is found.
 * 
 * @param {*} value 
 * @param {Number} start
 * 
 * @returns {Number}
 * 
 */
Horroy.prototype.indexOf = function(value, start) {

    start = start? start : 0;
    for (var i = start; i < this.length; i++) {
        if (this[i] === value) {
            return i;
        }
    }
    return -1;
};
/**
 * Abstraction of join.
 * 
 * Joins the elements of an horroy with the desired param.
 * 
 * @param {*} elem
 * 
 */
Horroy.prototype.join = function(elem) {
    var res = '';

    elem = elem === undefined ? ',' : elem;

    for (var i = 0; i < this.length; i++) {
        res += this[i];
        if (i == this.length-1) return res;
        res += elem;
    }
    return res;
};
/**
 * Abstraction of map.
 * 
 * Iterates an horroy evaluating an expression on each of its values. 
 * The result is located and returned in a new thisay.
 * 
 * @param {Function} func - The expression to evaluate.
 * 
 * @returns {thisay} - A new thisay with the resulting values.
 * 
 */
Horroy.prototype.map = function(func) {
    var res = new Horroy();

    for (var i = 0; i < this.length; i++) {
        res[i] = func(this[i]);
        res.length++;
    }
    return res;
};
/**
 * Reduces an array into a value.
 * 
 * @param {Function} callback - The expression to evaluate.
 * @param {*} accumulator - The accumulator of the reduction value.
 * 
 * @returns {*} - The reduction value.
 */
Horroy.prototype.reduce = function(callback, accumulator) {

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
/**
 * 
 * Abstraction of reverse.
 * 
 * Reverses the elements of an thisay (modifying it!).
 * 
 * @returns {thisay}
 * 
 */
Horroy.prototype.reverse = function() {

    var res = Object.assign([], this);;
    for (var i = this.length; i > 0; i--) {
        this[i-1] = res[this.length-i];    
    }
    return this;
};

/**
 * 
 * Abstraction of shift.
 * 
 * Deletes the first element of an horroy and returns it (modifying the horroy).
 * 
 * @returns {*}
 * 
 */
Horroy.prototype.shift = function() {

    var res = this[0];
    var this2 = Object.assign(this);
    for (var i = 0; i < this.length; i++) {
        this2[i] = this2[i+1];
    };
    this.length = this.length-1;
    return res;
};
/**
 * 
 * Abstraction of slice.
 * 
 * Returns a copy of a portion of an horroy.
 * 
 * @param {number} start 
 * @param {number} end 
 * 
 * @returns {thisay}
 * 
 */
Horroy.prototype.slice = function(start, end) {

    var res = new Horroy();
    var j = 0;
    for (var i = start; i < end; i++) {
        if (j === res.length) {
            res[j] =  this[i];
            res.length++;
            j++;
        }
    }
    return res;
};
/**
 * 
 * Abstraction of some.
 * 
 * Evaluates if any element in an horroy fullfills a condition.
 * 
 * @param {function} func 
 * 
 * @returns {boolean}
 * 
 */
Horroy.prototype.some = function(func) {

    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            return true;
        }
    }
    return false;
};
/**
 * Abstraction of splice.
 * 
 * Does an alteration on an horroy (deleting, slicing, ....)
 * @param {number} start 
 * @param {number} deleteCount 
 * @param {*} item 
 * 
 * @returns {thisay} - If deleted part of thisay
 * 
 */
Horroy.prototype.splice = function(start, deleteCount, item) {

    var initial = new Horroy();
    var res = new Horroy();
    var final = new Horroy();
    var items = new Horroy();
    var def = new Horroy();

    if (arguments.length > 3) {
        for (var i = 3; i < arguments.length; i++) {
            items[items.length] = arguments[i];
            items.length++;
        }
    }

    //Taking the pieces to build this

    for (var i = 0; i < start; i++) {
        initial[initial.length] = this[i];
        initial.length++;
    };
    for (var i = start; i < start+deleteCount; i++) {
        res[res.length] = this[i];
        res.length++;
    };
    for (var i = initial.length+res.length; i < this.length; i++) {
        final[final.length] = this[i];
        final.length++;
    };

    //Building def

    for (var i = 0; i < initial.length; i++) {
        def[def.length] = initial[i];
        def.length++;
    };
    for (var i = 0; i < items.length; i++) {
        def[def.length] = items[i];
        def.length++;
    };
    for (var i = 0; i < final.length; i++) {
        def[def.length] = final[i];
        def.length++;
    };

    //Copying def into this
    this.length = def.length;
    for (var i = 0; i < def.length; i++) {
        this[i] = def[i];
    }

    return res;
};
/**
 * Abstraction of unshift.
 * 
 * Puts the desired elements at the beginning of the array.
 * 
 * @returns {number} - The length of the array
 * 
 */
Horroy.prototype.unshift = function (element) {
    
    var copy = new Horroy();
    

    for (var i = 1; i < arguments.length; i++) {
        copy[copy.length] = arguments[i];
        copy.length++;
    };
    for (var i = 0; i < this.length; i++) {
        copy[copy.length] = this[i];
        copy.length++;
    };

    this.length = copy.length;

    for(var i = 0; i < copy.length; i++) {
        this[i] = copy[i];
    };   

    return this.length;
};  
/**
 * Abstraction of toString.
 * 
 * Converts a horroy to string.
 */
Horroy.prototype.toString = function() {
    var string = '';

    for(var i = 0; i < this.length - 1; i++)
        string += this[i] + ',';
    
    string += this[this.length - 1];

    return string;
};