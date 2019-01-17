function Cart(){
    this.cartList = [];

    this.add = function(product) {
        if(!(product instanceof Product)) throw TypeError('The item is not a product');
        this.cartList.push(product);
    };

    this.totalPrice = function() {
        var totalPrice =  this.cartList.reduce(function(accumulator,product){
            return accumulator + product.price;
        },0);

        return totalPrice;
    };

    this.numberOfItems = function(){
        return this.cartList.length;
    }

    this.mostExpensive = function(){
        var res = this.cartList[0];
        for (var i = 0; i < this.cartList.length; i++) {
            
            var value = this.cartList[i];
            
            if(value.price > res.price) res = value;
        }

        return res;
    }

    this.cheapest = function(){
        var res = this.cartList[0];
        for (var i = 0; i < this.cartList.length; i++) {
            var value = this.cartList[i];
            
            if(value.price < res.price) res = value;
        }

        return res;
    }

    this.numberOf = function(type){
        if(!(type instanceof Object)) throw TypeError('the type is not and object type');
        var num = 0;
        for (var i = 0; i < this.cartList.length; i++) {
            var value = this.cartList[i];
            if(value instanceof type) num ++;
        }

        return num;
    }

    this.productsByPriceRange = function(min, max){
        //if(!(min instanceof Number)) throw TypeError('min is not a number');
        //if(!(max instanceof Number)) throw TypeError('min is not a number');
        if(min > max) 
            min = [max, max = min][0];
            
        var products = [];
        
        for (var i = 0; i < this.cartList.length; i++) {
            var value = this.cartList[i];
            if(value.price >= min && value.price <= max) products.push(value);   
        }
        
        return products;
    }
}