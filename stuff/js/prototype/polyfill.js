if (typeof Array.prototype.random === 'undefined')
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    };

if (typeof Array.prototype.shuffle === 'undefined')
    Array.prototype.shuffle = function() {
        var res = [];

        for (var i = 0; i < this.length; i++) {
            var value = this[i];

            var random = Math.floor(Math.random() * this.length);

            this[i] = this[random];

            this[random] = value;
        }

        return this;
    };

// demo

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.shuffle());