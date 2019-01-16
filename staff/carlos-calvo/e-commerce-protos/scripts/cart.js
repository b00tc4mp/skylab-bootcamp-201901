function Cart(){
    this.arraybuy = []

    this.add = function (obj){
        this.arraybuy.push(obj)
    }

    this.totalPrice = function(){
        var total = 0;
        for(var i=0; i<this.arraybuy.length; i++){
            total += this.arraybuy[i].price
        }
        return total;
    }

    this.numberOfItems = function(){
        return this.arraybuy.length
    }

    this.mostExpensive = function(){
        var most = 0
        for(var i = 1 ;i < this.arraybuy.length; i++){
            if (this.arraybuy[i].price > this.arraybuy[most].price) most = i      
        }
        return this.arraybuy[most].brand + ' and price ' + this.arraybuy[most].price

    }

    this.cheapest = function(){
        var most = 0
        for(var i = 1 ;i < this.arraybuy.length; i++){
            if (this.arraybuy[i].price < this.arraybuy[most].price) most = i      
        }
        return this.arraybuy[most].brand + ' and price ' + this.arraybuy[most].price

    }

    this.numberOf = function(type){
        var total = 0
        for(var i = 0; i < this.arraybuy.length; i++){
            if (this.arraybuy[i] instanceof type) total++
        }
        return total
    }

    this.productsByPriceRange = function(min, max){
        var count = 0
        for(var i = 0 ;i < this.arraybuy.length; i++){
            if ((this.arraybuy[i].price > min) && (this.arraybuy[i].price < max)) count++ 
        }
        return count
    }
}
