/**

1.  Array.from()
2.  Array.isArray()
3.  Array.of()
4.  Array.prototype.push()
5.  Array.prototype.forEach()
6.  Array.prototype.concat()
7.  Array.prototype.toString()
8.  Array.prototype.every()
9.  Array.prototype.indexOf()
10. Array.prototype.map()


Array.prototype.copyWithin()

Array.prototype.fill()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.includes()
Array.prototype.join()
Array.prototype.lastIndexOf()
Array.prototype.pop()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.slice()
Array.prototype.some()
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toSource()
Array.prototype.unshift()
 */

function Horroy() {
    this.length = arguments.length;
    for (var i = 0; i < arguments.length; i++)
        this[i] = arguments[i];
}

/* Creates a new array with the results of calling a 
*  provided function on every element in the calling array. 
*  {array} return new Arra
*/

Horroy.prototype.map = function (callback) {
    var horr = new Horroy;
    for (var i=0; i < this.length; i++) horr.push(callback(this[i]));
    return horr;
}

/* 
* The indexOf() method returns the first index at which a given element
* can be found in the array, or -1 if it is not present.
* 
*/

Horroy.prototype.indexOf = function (searchElement, fromIndex) {
    if (arguments.length > 2) throw Error("too many arguments");
    for (var i=0; i < this.length; i++) {
        if (searchElement === this[i]) return i;
    }
    return -1;
}

/* The every() method tests whether all elements in the array pass 
 * the test implemented by the provided function. 
 * This method returns true for any condition put on an empty array.
*/
Horroy.prototype.every = function (callback){
    for (var i=0; i < this.length; i++) {
        if (!callback(this[i])) return false;
    }
    return true;
}

/* The concat() method is used to merge two or more horroys. 
 * This method does not change the existing arrays, but instead returns a new array. */

Horroy.prototype.concat = function() {
    var horr = new Horroy;
    for (var i=0; i < arguments.length; i++) {
        for (var j=0; j < arguments[i].length; j++) {
            horr.push(arguments[i][j])
        }
    }
    return horr;
}

Horroy.isHorroy = function (horr) {
    return (horr instanceof Horroy);
}

Horroy.of = function () {
    var horr = new Horroy;
    for (var i = 0; i < arguments.length; i++) {
        horr.push(arguments[i]); 
    }
    return horr;
}

Horroy.from = function (value) {
    var horr = new Horroy;
    horr.length = value.length;
    if (typeof value === 'string')
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i];
    return horr;
};

Horroy.prototype.push = function (value) {
    this[this.length++] = value;
};

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

/* Returns a string representing the specified array and its elements. 
*/

Horroy.prototype.toString = function() {
    var string = '';
    for (var i = 0; i < this.length; i++) string += i !== this.length - 1 ? this[i] + ',' : this[i];
    return string;
};
