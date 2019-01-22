/**
 * Demo of an e-commerce.
 * 
 * @param {Array} cartList 
 */

function Cart(cartList) {
    this.cartList = []; 
};

/**
 * Function that adds a product to the cart.
 * 
 * @throws {Error} -If too many arguments
 */
Cart.prototype.add = function (product) {
    if (arguments.length > 1) throw Error ('too many arguments');

    this.cartList.push(product);
};

/**
 * Function that calculates the summed prices of all the products in the cart.
 * 
 * @returns {number} 
 * 
 * @throws {Error} - If too many arguments
 */
Cart.prototype.totalPrice = function () {
    return this.cartList.reduce(function (accum, product){
        return accum + product.price;
    }, 0);
    /* if (arguments.length > 0) throw Error ('too many arguments');

    price2 = 0;
    for(var i = 0; i < this.cartList.length; i++) {
        price2 += this.cartList[i].price;
    }
    return price2; */
};

/**
 * Function that calculates the total number of items added to the cart.
 * 
 * @returns {number} 
 * 
 * @throws {Error} - If too many arguments
 */
Cart.prototype.numberOfItems = function () {
    if (arguments.length > 0) throw Error ('too many arguments');

    var items = this.cartList.length;

    return items;
};

/**
 * Function that calculates the most expensive product of the ones added to the cart.
 * 
 * @returns {Object} 
 * 
 * @throws {Error} - If too many arguments
 */
Cart.prototype.mostExpensive = function () {
    if (arguments.length > 0) throw Error ('too many arguments');

    return this.cartList.reduce(function (accum, product) {
        return accum.price < product.price ? product : accum;
    });
   /*  var item = 0;
    for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].price > this.cartList[item].price) {
            item = i;
        }
    }
    return this.cartList[item]; */
};

/**
 * Function that calculates the cheapest product of the ones added to the cart.
 * 
 * @returns {Object} 
 * 
 * @throws {Error} - If too many arguments
 */
Cart.prototype.cheapest = function () {
    if (arguments.length > 0) throw Error ('too many arguments');

    return this.cartList.reduce(function (accum, product) {
        return accum.price > product.price ? product : accum;
    });
    /* var item = 0;
    for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].price < this.cartList[item].price) {
            item = i;
        }
    }
    return this.cartList[item]; */
}; 

/**
 * Function that calculates the total number of items of a kind.
 * 
 * @param {} type
 * 
 * @returns {Object} 
 * 
 * @throws {Error} - If too many arguments
 */
Cart.prototype.numberOf = function (type) {
    if (arguments.length > 1) throw Error ('too many arguments');

    return this.cartList.reduce(function (accum, product) {
        return product instanceof type ? ++accum : accum;
    }, 0);
    /* var num = 0;
    for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i] instanceof type) {
            num++;
        }
    }
    return num; */
};

/**
 * Function that returns the products inside a price range.
 * 
 * @returns {Array} 
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If minV / maxV are not numbers
 */
Cart.prototype.productsByPriceRange = function (minV, maxV) {
    if (arguments.length > 2) throw Error ('too many arguments');
    /* if (typeof minV !== 'number') throw TypeError (minV + ' is not a number');
    if (typeof maxV !== 'number') throw TypeError (maxV + ' is not a number');

    return this.cartList.filter(function(item) {
        if (item.price >= minV && item.price <= maxV) {
            return item;
        }
    }); */

    var products = [];
    for (var i = 0; i < this.cartList.length; i++) {
        if (minV < this.cartList[i].price && this.cartList[i].price < maxV) {
            products.push(this.cartList[i]);
        }
    }
    return products;
};

