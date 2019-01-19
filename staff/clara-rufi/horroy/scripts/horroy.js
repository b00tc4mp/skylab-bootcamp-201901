function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.from = function (value) {
    var horr = new Horroy

    horr.length = value.length

    if (typeof value === 'string')
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i]
            return horr
};

Horroy.prototype.fill = function(value,start,end) {

    if (arguments.length > 3) throw Error('too many arguments');
    
    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);
    
    for (var i = start; i < end; i++)
        this[i] = value;
        return this;
}


Horroy.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++)
        callback(this[i]);   
};


Horroy.prototype.push = function(value) {
    if (typeof type === 'function') throw TypeError(type + ' is not a function');  
    this[this.length++] = value;
    return this.length;
};

Horroy.prototype.pop= function(array){
    if(arguments.length !== 1) throw new Error('Too many arguments')
    if(!(array instanceof Array)) throw new TypeError(array + ' not an array')
    
    array.length = array.length-1
    return result
}


Horroy.prototype.find = function(callback) {
    for (var i = 0; i < this.length; i++) {
      
        var value = this[i];
        if(callback(value)) return value;
    }
}

Horroy.prototype.join = function(array){
    var result = [];
    for (var i=0; i<this.length; i++){
        result[i] = this[i]
    }
}

Horroy.prototype.map= function(func){
    var res = [];
    for (var i = 0; i < this.length; i++) res[i] = func(this[i]);
    return res;
}


Horroy.prototype.pusp= function(){
    for (var i=1; i<arguments.length; i++){
        arguments[0][arguments[0].length]= arguments[i]
    }
    return arguments[0].length;
}

Horroy.prototype.reduce= function(callback){
    var accumulator;
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        accumulator = callback(accumulator, item);
    }
    return accumulator;
}

/*
Cart.prototype.productsByPriceRange = function(){
    var btw = this.products.reduce(function (total, amount) {
        if (amount.price > 30 && amount.price < 120) {
          btw.push(amount.price);
        }
        return total;
    }, []);
    return btw
}*/

Horroy.prototype.reverse= function(array){
    var result = []
    for (var i=this.length-1; i>=0; i--){
    
        result[result.length] = this[i]
    }
    return result
}

Horroy.prototype.shift= function(array){

    var result = array[0]
    for (var i = 0; i < array.length; i += 1) {
        array[i] = array[i + 1] || 0;
    }
    return result
 }

 Horroy.prototype.toString = function() {
    var string = '';

    for(var i = 0; i < this.length - 1; i++)
        string += this[i] + ',';
    
    string += this[this.length - 1];

    return string;
};