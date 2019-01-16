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
    }
};

