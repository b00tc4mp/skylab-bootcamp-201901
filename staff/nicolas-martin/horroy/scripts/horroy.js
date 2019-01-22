/**
 * Array.from() - ok
Array.isArray() --> Horroy.isHorroy()
Array.of()
Array.prototype.concat()
Array.prototype.copyWithin()
Array.prototype.every()
Array.prototype.fill()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.forEach()
Array.prototype.includes()
Array.prototype.indexOf()
Array.prototype.join()
Array.prototype.lastIndexOf()
Array.prototype.map()
Array.prototype.pop()
Array.prototype.push()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.slice()
Array.prototype.some()
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toSource()
Array.prototype.toString()
Array.prototype.unshift()
 */

function Horroy() {
    this.length = arguments.length;
    for (var i = 0; i < arguments.length; i++)
        this[i] = arguments[i];
}

Horroy.isHorroy = function (horr) {
    debugger;
    return (horr instanceof Horroy);
}

Horroy.of = function () {
    // for (var i = 0; i < arguments.length; i++) {
        
    // }
    // return (horr instanceof Horroy);
}

Horroy.from = function (value) {
    var horr = new Horroy
    horr.length = value.length
    if (typeof value === 'string')
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i]

    return horr
};

Horroy.prototype.push = function (value) {
    this[this.length++] = value;
};

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

Horroy.prototype.toString = function() {
    var string = '';

    for(var i = 0; i < this.length - 1; i++) 
        string += this[i] + ',';
    
    string += this[this.length - 1];

    return string;
};
