/**
 * Demo of an e-commerce.
 * 
 * @param {Array} cartList 
 */

function Cart(cartList) {
    this.cartList = [];

    this.add = function (product) {
        this.cartList.push(product);
    };
    this.totalPrice = function () {
        price2 = 0;
        for(var i = 0; i < this.cartList.length; i++) {
            price2 += this.cartList[i].price;
        }
        return price2;
    };
    this.numberOfItems = function () {
        var items = this.cartList.length;

        return items;
    };
    this.mostExpensive = function () {
        var item = 0;
        for (var i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].price > this.cartList[item].price) {
                item = i;
            }
        }
        return this.cartList[item];
    };
    this.cheapest = function () {
        var item = 0;
        for (var i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].price < this.cartList[item].price) {
                item = i;
            }
        }
        return this.cartList[item];
    };
    this.numberOf = function (type) {
        var num = 0;
        for (var i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i] instanceof type) {
                num++;
            }
        }
        return num;
    };
    this.productsByPriceRange = function () {
        var products = [];
        for (var i = 0; i < this.cartList.length; i++) {
            if (30 < this.cartList[i].price && this.cartList[i].price < 120) {
                products.push(this.cartList[i]);
            }
        }
        return products;
    };
};

