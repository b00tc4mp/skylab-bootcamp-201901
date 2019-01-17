function Cart() {
    this.cartItems = [];

    this.add = function(item) {
        this.cartItems.push(item);
    };

    this.totalPrice = function() {
        var total = 0;
        for(var i = 0; i<this.cartItems.length; i++) {
            total += this.cartItems[i].price;
        }
        return total;
    };

    this.numberOfItems = function() {
        return this.cartItems.length;
    };

    this.mostExpensive = function() {
        var higher = this.cartItems[0];
        for(var i = 0; i<this.cartItems.length - 1; i++) {
            if(higher.price < this.cartItems[i+1].price) {
                higher = this.cartItems[i+1];
            } 
        }

        // return Object.getPrototypeOf(higher).constructor.name;
        return higher.constructor.name;
    };

    this.cheapest = function() {
        var lower = this.cartItems[0];
        for(var i = 0; i<this.cartItems.length - 1; i++) {
            if(lower.price > this.cartItems[i+1].price) {
                lower = this.cartItems[i+1];
            } 
        }

        // return Object.getPrototypeOf(lower).constructor.name;
        return lower.constructor.name;
    };

    this.numberOf = function(productType) {
        var counter = 0;
        for(var i = 0; i<this.cartItems.length; i++) {
            if(this.cartItems[i] instanceof productType) {
                counter ++;
            }
        }
        return counter;
    };

    this.productsByPriceRange = function(min,max) {
        var result = [];
        for(var i = 0; i<this.cartItems.length; i++) {
            if((this.cartItems[i].price > min) && (this.cartItems[i].price < max)){
                result.push(this.cartItems[i]);
            }
        }
        return result;
    };
}