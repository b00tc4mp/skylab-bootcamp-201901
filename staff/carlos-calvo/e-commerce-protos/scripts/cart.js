function Cart(){
    this.arraybuy = []
    /**
     * add an item to the array
     */
    this.add = function (item){
        if(item instanceof Object) throw new Error ('Item not a object!')
        this.arraybuy.push(item)
    }
    /**
     * get Total price
     */
    this.totalPrice = function(){

        if(arguments.length!== 0) throw new Error('Too many arguments')
        var total = 0;
        for(var i=0; i<this.arraybuy.length; i++){
            total += this.arraybuy[i].price
        }
        return total;
    }

    /**
     * get TNumber of Items of the array
     * 
     */
    this.numberOfItems = function(){
        return this.arraybuy.length
    }
    /**
     * returns the item with the highest item price
     */
    this.mostExpensive = function(){
        var most = 0
        for(var i = 1 ;i < this.arraybuy.length; i++){
            if (this.arraybuy[i].price > this.arraybuy[most].price) most = i      
        }
        return this.arraybuy[most].brand + ' and price ' + this.arraybuy[most].price

    }
    /**
     * returns the item with the cheapest item price
     */
    this.cheapest = function(){
        var most = 0
        for(var i = 1 ;i < this.arraybuy.length; i++){
            if (this.arraybuy[i].price < this.arraybuy[most].price) most = i      
        }
        return this.arraybuy[most].brand + ' and price ' + this.arraybuy[most].price

    }
    /**
     * returns the number of items that matches the type in the parameter
     */
    this.numberOf = function(type){
        var total = 0
        for(var i = 0; i < this.arraybuy.length; i++){
            if (this.arraybuy[i] instanceof type) total++
        }
        return total
    }
    /**
     * returns the number of items that his price is between min and max
     */
    this.productsByPriceRange = function(min, max){
        var count = 0
        for(var i = 0 ;i < this.arraybuy.length; i++){
            if ((this.arraybuy[i].price > min) && (this.arraybuy[i].price < max)) count++ 
        }
        return count
    }
}
