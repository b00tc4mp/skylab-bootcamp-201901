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


    Horroy.prototype.flat = function(depth){
        
        if(arguments.length < 1){
            depth = 1
        } 
        if(arguments.length == 1 && isNaN(depth)) throw new TypeError('Not a number')
        if(arguments.length > 1) throw new Error('Too many arguments')

        var stringReturn = ''
        var i = 0
        while (i < this.length){
            var recursive
            if(this[i] instanceof Array && depth > 0){
                recursive = this[i].flat[depth-1]
            } else {
                recursive = this[i]
            }
            stringReturn = stringReturn.concat(recursive)
            if(i == this.length -1){
            } else {
                stringReturn = stringReturn.concat(',')
            }
            i++
        }
        stringReturn.trim(',')
        return stringReturn
    }

    Horroy.prototype.forEach = function(func){
        if(arguments.length !== 1) throw new Error('Incorrect number of parameters')
        if(!(func instanceof Function)) throw new TypeError('Parameter not a function')
        for(var i = 0; i < this.length; i++){
            func(this[i])
        }
    }

    Horroy.prototype.includes = function(item){
        for(var i = 0; i < this.length; i++){
            if(this[i] == item) return true
        }
        return false
    }

    Horroy.prototype.filter = function(func){
        if(!(func instanceof Function)) throw new TypeError('Not a Function')
        var arrayreturn = new Horroy()
        for(var i = 0; i < this.length; i++){
            if(func(this[i])) arrayreturn.push(this[i])
        }
        return arrayreturn
    }

    Horroy.prototype.reverse = function(){
        var copy = new Horroy
        for (var i = 0; i < this.length; i++){
            copy.push(this[i])
        }
        var longitud = this.length-1
        for(var i = 0; i <= longitud; i++){
            this[i] = copy[longitud-i]
        }  
    }

    Horroy.prototype.unshift = function(){
        var copy = new Horroy
        for (var i = 0; i < arguments.length; i++){
            copy.push(arguments[i])
        }
        var longitud = arguments.length

        for(var i = 0; i < this.length; i++){
            copy[i + longitud] = this[i]
            copy.length++
        }
        this.length = copy.length
        for(var i = 0; i < copy.length; i ++){
            this[i] = copy[i]
        }

        return this.length
    }

    
    Horroy.prototype.pop = function(){
        var lastitem = this[this.length-1]
        this.length--
        delete this[this.length -1]
        

        return lastitem
    }

    Horroy.of = function(){ //Static method
        var hor = new Horroy()
        for(var i = 0; i < arguments.length; i++){
            hor.push(arguments[i])
        }
        return hor
    }
    
    Horroy.prototype.copywithin = function(target, start, end){

        if(arguments.length > 3) throw new Error('Too many args')
        start = start === undefined ? 0: start
        end = end === undefined ? this.length: end
        var copia = new Horroy
        for (var i = 0; i < end - start; i++){
            copia[i] = this[start + i]
            copia.length++
        }
        for(i = 0 ; i< copia.length; i++){
            this[target + i] = copia[i]
        }

    }
    Horroy.prototype.find = function(func){

        if(!(func instanceof Function)) throw new Error('Not a funciton')

        for(var i = 0; i < this.length; i++){
            if(func(this[i])) return this[i]
        }

        return undefined

    }
    
    Horroy.prototype.findIndex = function(func){

        if(!(func instanceof Function)) throw new Error('Not a funciton')

        for(var i = 0; i < this.length; i++){
            if(func(this[i])) return i
        }

        return -1

    }

    Horroy.prototype.IndexOf = function(func){

       //Pdte

    }

    
}