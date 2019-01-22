/**
 * Abstraction of Cart
 * 
 * @method (add)
 * @method (totalPrice)
 * @method (numberOfItems)
 * @method (mostExpensive)
 * @method (cheapest)
 * @method (numberOf)
 * @method (productsByPriceRange)
 * 
 * @param {Object} object
 * @throws {TypeError}
 * @returns {Number} Array length
 * 
 */

function Cart() {
    this.cartItems = [];
}
    
    Cart.prototype.add = function (item){

        if (!(item instanceof Product)) throw TypeError ('Should be an object');

        this.cartItems.push(item)
        return this.cartItems.length
    };

    Cart.prototype.totalPrice = function(){

        var a = this.cartItems.reduce (function(accum, item){
            return accum + item.price
        }, 0)
        
        return a.toFixed(2)
    };

    Cart.prototype.numberOfItems = function (){
        
        return this.cartItems.length
    }

    Cart.prototype.mostExpensive = function() {
        var exp = this.cartItems[0].price;
        var pro = {}
        for (let i=0; i< this.cartItems.length; i++){
            if (exp < this.cartItems[i].price) {
                exp = this.cartItems[i].price
                pro = this.cartItems[i].constructor.name
            }
        }
        return pro
    }

    Cart.prototype.cheapest = function (){

        var cheap = this.cartItems[0].price;
        var pro = this.cartItems[0]

        for (let i=0; i< this.cartItems.length; i++){
            if (cheap > this.cartItems[i].price) {
                cheap = this.cartItems[i].price
                pro = this.cartItems[i]
            }
        }
        return pro
    }

    Cart.prototype.numberOf = function (item){

        if (typeof item !== 'function') throw TypeError(item + ' is not a function');
        if (item !== Product && !(item.prototype instanceof Product)) throw TypeError(item + ' is not a product type')

        sum = 0;
        for (let i = 0; i< this.cartItems.length; i++){
            if (this.cartItems[i].constructor.name === item || this.cartItems[i] instanceof item){
                sum ++
            }
        }
        return sum
    }

    Cart.prototype.productsByPriceRange = function(min, max){
        var list = []
        for (var i =0; i< this.cartItems.length; i++){
            if (this.cartItems[i].price > min && this.cartItems[i].price < max){
                list.push(this.cartItems[i])
            };
        }
        return list
    }
