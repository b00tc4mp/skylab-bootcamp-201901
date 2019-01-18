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

        if(!(horroy2 instanceof Horroy)) throw new TypeError('Not an horroy')

        var horroyreturn = new Horroy

        for(var i = 0; i < this.length; i++){
            horroyreturn.push(this[i])
        }
        for(var i = 0; i < horroy2.length; i++){
            horroyreturn.push(horroy2[i])   
        }
        return horroyreturn
    }
}





    

var x = new Horroy('a','b','c','d')

console.log(x)