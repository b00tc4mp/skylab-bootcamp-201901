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

Horroy.prototype.push = function (item){


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