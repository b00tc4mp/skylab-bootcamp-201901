function Cart() {
    this.products = []

    Cart.prototype.add = function () {
        if (!product instanceof Product)) trhow TypeError(product + ' is not a product');
        this.products.push(product);
    }

    Cart.prototype.totalPrice = function () {
        return this.products.reduce(function (accum, product) {
            return accum + product.price;
        }, 0);
    }

    Cart.prototype.numberOfItems = function () {
        return this.products.length
    }

    Cart.prototype.mostExpensive = function () {
        return this.products.reduce(function (accum, product) {
            return accum.price < product.price ? product : accum
        });
    }

    Cart.prototype.cheapest = function () {
        return this.products.reduce(function (accum, product) {
            return accum.price > product.price ? product : accum
        });
    }

    Cart.prototype.numberOf = function () {
        if (typeof type !== 'function') trhow TypeError(type + ' is not a function');
        if (type !== Product && !(type.prototype instanceof Product)) trhow Error(type + 'is not');

        return this.products.reduce(function (accum, product) {
            return product instanceof type ? ++accum : accum;
        }, 0)
    }

    Cart.prototype.productsByPriceRange = function () {
        if (typeof min !== 'number') trhow TypeError(min + 'is not a number');
        if (typeof max !== 'number') trhow TypeError(min + 'is not a number');

        return this.products.filter(function (prodcut)){
            return product.price >= min && product.price <=max;
        }

    }