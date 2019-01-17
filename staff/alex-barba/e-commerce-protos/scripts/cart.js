/**
 * New function Cart
 * 
 * Creates an object with an empty array where to place the chosen products.
 * 
 * @returns {Array}
 * 
 * Then, the 8 following functions are created to iterate over the object.
 * 
 */

function Cart() {

 /* A cart list is created to add all the products */ 

    this.cartList = [];

 /* Function to add products in your cart */   

    Cart.prototype.add = function(item) {
        if(!(item instanceof Object)) throw new TypeError(item + ' is not a product');
        for(var i = 0; i < arguments.length; i++){
            this.cartList.push(item)
        }
    };

 /* Function to calculate the total price of your cart */   

    Cart.prototype.totalPrice = function() {
        return this.cartList.reduce(function(accumulator, item) {
            if(item.price === undefined) {
                return accumulator 
            } else{
                return accumulator + item.price;
            }
       }, 0);
    };

 /* Function to calculate the total number of products in your cart */ 

    Cart.prototype.numberOfItems = function() {
        var num = this.cartList.length;
        return num
    };

 /* Function to find out the most expensive product in your cart */ 

    Cart.prototype.mostExpensive = function() {
        if(this.cartList.length === 0){
            return undefined
        } else {
            return this.cartList.reduce(function(accum, item) {
                return accum.price < item.price ? item : accum;
            })
        }  
    };

 /* Function to find out the cheapest product in your cart */ 

    Cart.prototype.cheapest = function() {
        if(this.cartList.length === 0){
            return undefined
        } else {
            return this.cartList.reduce(function(accum, item) {
                return accum.price > item.price ? item : accum;
            })
        }
    };

 /* Function to find out the number of products of the type chosen in your cart */ 
 
    Cart.prototype.numberOf = function(type) {
        if(typeof type !== 'function') throw TypeError(type + ' is not a function');

        return this.cartList.reduce(function(accum, item) {
            return item instanceof type ? ++accum : accum;
        }, 0);
    };

 /* Function to find out the number of products in your cart in between a price range */ 

    Cart.prototype.productsByPriceRange = function(min, max) {
        if(typeof min !== 'number' || typeof max !== 'number') throw TypeError(min)
        
        var minA = 0;
        var maxA = 0;

        if(min > max){
            maxA = min;
            minA = max;
        } else {
            minA = min;
            maxA = max;
        };

        return this.cartList.filter(function(item) {
            if (item.price >= minA && item.price <= maxA) {
                return item
            }
        });
    };

};