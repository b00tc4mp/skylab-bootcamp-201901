function Horroy(){

    for(var i = 0; i < arguments.length; i++){
        this[i] = arguments[i]
    }
    this.length = arguments.length

    Horroy.prototype.constructor = Object.create(Object.prototype);

    Horroy.prototype.push = function(element){
        var llarg = this.length
        for(var i = 0; i < arguments.length; i++){
            this[llarg + i] = arguments[i]
            this.length++
        }
    }

    Horroy.prototype.isHorroy = function(){
        if(arguments.length !== 0) throw new Error('too many arguments');
        
        return this instanceof Horroy
    }

    Horroy.prototype.concat = function(horroy2){

        if(!(horroy2 instanceof Horroy)) throw new Error('Not an horroy')

        var horroyreturn = new Horroy

        for(var i = 0; i < this.length; i++){
            horroyreturn.push(this[i])
        }
        for(var i = 0; i < horroy2.length; i++){
            horroyreturn.push(horroy2[i])   
        }
        return horroyreturn
    }


    Horroy.prototype.every = function(func){
        if(!(func instanceof Function)) throw new TypeError('Not a function')

        for(var i = 0; i < this.length; i ++){
            if(!func(this[i])) return false
        }
        return true
    }

    Horroy.prototype.fill = function(value, start, end) {
        if (arguments.length > 4) throw Error('too many arguments');
    
        start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
        end = end === undefined ? this.length : (end < 0 ? this.length + end : end);
    
        if (typeof start !== 'number' || typeof end !== 'number'  ) throw TypeError ('Not a number');
    
        for (var i = start; i < end; i++) {
            this[i] = value;
        }
        return this;
    }

    Horroy.prototype.toString = function(){
        var stringReturn = '';
        for(var i = 0; i < this.length; i++){
            if(i == this.length-1){
                stringReturn = stringReturn.concat(this[i])
            } else {
                stringReturn = stringReturn.concat(this[i])
                stringReturn = stringReturn.concat(',')
            }
        }
        return stringReturn
    }

    Horroy.prototype.shift = function(){
        if(this.length == 0){
            throw new Error('No items in this array')
        } else {
            var b = new Horroy()
            for(var i = 0; i < this.length; i++){
                b[i] = this[i]
            } //copio array
            i = 1
            while (i < b.length){
                this[i-1] = b[i]
                i++
            }
            this.length = b.length -1 
            return b[0]
        }
    }
}