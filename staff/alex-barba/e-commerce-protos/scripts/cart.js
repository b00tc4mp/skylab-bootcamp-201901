/**
 * New function Cart
 * 
 * Creates an object with an empty array where to place the chosen products.
 * 
 * @returns {Array}
 * 
 * Then, 8 following functions are created to iterate over the object.
 * 
 */

function Cart() {
    this.cartList = [];

    this.add = function(item) {
        if(!(item instanceof Object)) throw new TypeError(item + ' is not an object');
        this.cartList.push(item)
    };

    this.totalPrice = function() {
 
       var result = this.cartList.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.price;
       }, 0)
       
       return result
    };

    this.numberOfItems = function(array) {
        var num = this.cartList.length;
        return 'The total number of items is: ' + num + '.'
    }

    this.mostExpensive = function(array) {
        var index = 0;
        for (var i = 0; i < this.cartList.length; i++){
            if (this.cartList[i].price > this.cartList[index].price) {
                index = i
            }
        }

        return 'The most expensive item is : ' + this.cartList[index].brand + ' ' + this.cartList[index].type + '. Price: ' + this.cartList[index].price + '.'
    }

    this.cheapest = function(array) {
        var index = 0;
        for (var i = 0; i < this.cartList.length; i++){
            if (this.cartList[i].price < this.cartList[index].price) {
                index = i
            }
        }

        return 'The cheapest products is : ' + this.cartList[index].brand + '. Price: ' + this.cartList[index].price + '.'
    }

    this.numberOf = function(type) {
        var num = 0;
        for (var i = 0; i < this.cartList.length; i++){
            if (this.cartList[i] instanceof type) {
                num++
            }
        }

        return 'The total number of products is : ' + num + '.'
    }

    this.productsByPriceRange = function(min, max) {
        var products = [];
        for (var i = 0; i < this.cartList.length; i++){
            var value = this. cartList[i];
            if (value.price >= min && value.price <= max) {
                products.push(value)
            }
        }

        return products

    };

};