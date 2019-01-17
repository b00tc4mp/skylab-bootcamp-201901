function Horroy() {
    this.length = 0;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            this.push(arguments[i]);
}

Horroy.prototype.push = function(value) {
    this[this.length++] = value;
};

Horroy.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++)
        callback(this[i]);
};
