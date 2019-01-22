function Horroy() {

    if ((arguments.length === 1) && (!(Number.isInteger(arguments[0]))) && (typeof arguments[0] === "number")){
        throw Error ('Invalid horroy length')
        return undefined
    }

    else if ((arguments.length === 1) && (Number.isInteger(arguments[0]))){

        this.length = arguments[0]

        for (var i = 0; i < arguments[0]; i++) {
            this[i] = undefined
        }
    }

    else if ((arguments.length > 1) || ((arguments.length === 1) && (typeof arguments[0] !== "number"))){

        this.length = arguments.length

        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i]
        }
    }
}

Horroy.prototype.push = function (value){

    for (var i = 0; i< arguments.length; i++){

        // if((typeof arguments[i] !== "number") && (!(arguments[i] instanceof Function)) && (!(arguments[i] instanceof Object)) && (!(arguments[i] instanceof Horroy)) && (typeof arguments[i] !== "undefined") && (!(typeof arguments[i] !== null))) throw TypeError ('not recognized param')

        this[this.length] = arguments[i];
        this.length ++
    }
    return this.length
}

Horroy.prototype.pop = function(){

	if (this.length < 1) return undefined
	
	var length = this.length
	var lastElem = this[this.length-1]
    this.length = length-1
    delete this[this.length]

	return lastElem
}

Horroy.prototype.shift = function(){

    if (arguments.length > 0) throw Error ('Should not introduce any paramater')
    if (this.length === 0) return undefined

    var re = this[0]

    for (var i =0; i< this.length -1; i++){
        this[i] = this[i+1]
    }
    this.length --
    delete this[this.length]
    return re
}

Horroy.prototype.unshift = function(){
    
    for (var i =0; i< arguments.length; i++){

        for (var k =0; k< this.length; k ++){
            this[this.length-k] = this[this.length -1 -k]
            
        }
        this[0] = (arguments[arguments.length-i-1])
        this.length ++
    }
    return this.length
}

Horroy.prototype.filter = function(callback){

    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function') 

    var ret = new Horroy;
    count = 0

    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]) === true){

            ret[count] = this[i]
            count ++
        }
    }

    return ret
}

Horroy.prototype.find = function (callback) {

    if (arguments.length > 1) throw Error('too many arguments');

    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    if (this.length === 0) return undefined

    for (var i = 0; i < this.length; i++) {

        if(callback(this[i]) === true) return this[i]

    }
}

Horroy.prototype.indexOf = function (elem, posI) {

    var pos = 0;
    
    if (posI === undefined) posI =0;
    
    for (let i=posI; i< this.length; i++){

		if (this[i] === elem){
		pos = i
        return pos
        }
    }

    if (pos === 0) pos = -1;

    return pos
}

Horroy.prototype.join = function(separator){

    if (arguments.length > 1) throw Error('too many arguments');

    var str=""

    if (!separator && separator !=="") separator = ",";

    if (this.length === 1) str = this[0].toString()

    else if (this.length>1){
        for (var i =0; i< this.length; i++){
            if (i === this.length-1) str += this[i].toString()
            else str += (this[i].toString() + separator);
        };
    }

    return str;
}

Horroy.prototype.reverse = function(){

    if (arguments.length) throw TypeError ('There should be no parameters')

    var rev;

    for (var i=0; i< (this.length/2); i++){
        rev = this[i]
        this[i] = this[this.length-1-i]
        this[this.length-1-i] = rev
    }
    return this
}

Horroy.prototype.slice = function(beg, end){

    if (typeof beg !== "number" ) throw TypeError (beg + ' and ' + end + ' should be a number')

    if (typeof beg === undefined) beg = 0;
    if (beg > this.length) return [];
    if (beg < 0) beg = this.length + beg;
    if (end < 0) end = this.length + end

    var a ={};

    for (var i = beg; i<end; i++ ){
        a[i-beg] = this[i]
    }
    return a
}