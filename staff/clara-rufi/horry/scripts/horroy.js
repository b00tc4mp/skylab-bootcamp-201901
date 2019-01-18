function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.prototype.push = function(value) {
    this[this.length++] = value;
    return value;
};

Horroy.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++)
        callback(this[i]);   
};

//

Horroy.prototype.fill = function(array, value, start, end) {
    for (var i = start; i < end; i++)
        array[i] = value;
        return array;
}

Horroy.prototype.find = function(callback) {
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if(callback(value)) return value;
    }
}

Horroy.prototype.join = function(array){
    var result = [];
    for (var i=0; i<array.length; i++){
        result[i] = array[i]
    }
}

Horroy.prototype.map= function(arr, func){
    var res = [];
    for (var i = 0; i < arr.length; i++) res[i] = func(arr[i]);
    return res;
}

Horroy.prototype.pop= function(array){
    array.length = array.length-1
    return result
}

Horroy.prototype.pusp= function(){
    for (var i=1; i<arguments.length; i++){
        arguments[0][arguments[0].length]= arguments[i]
    }
    return arguments[0].length;
}

Horroy.prototype.reduce= function(array, callback, accumulator){
    var i = 0;
    for (; i < array.length; i++) {
        var item = array[i];

        accumulator = callback(accumulator, item);
    }
    return accumulator;
}

Horroy.prototype.reverse= function(array){
    var result = []
    for (var i=array.length-1; i>=0; i--){
    
        result[result.length] = array[i]
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
