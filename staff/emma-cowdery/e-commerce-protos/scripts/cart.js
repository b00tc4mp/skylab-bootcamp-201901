function Cart() {
    this.cartItems = [];
    this.add = function (item) {
        this.cartItems.push(item);
        return this.cartItems
    }
    console.log(this.cartItems)
    


    this.totalPrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            totalPrice += this.cartItems[i].price;
            //this.cartItems[i].price += totalPrice;
        }
        return totalPrice;
    };  

    this.numberOfItems = function () {
        var numberOfItmes = this.cartItems.length
        return numberOfItmes;
    };

    this.mostExpensive = function () {
        var number = this.cartItems[0].price;
        var product = this.cartItems[0];
        for (var i = 0; i < this.cartItems.length; i++) {
            if (number < this.cartItems[i].price) {
                number = this.cartItems[i].price;
                product = this.cartItems[i];
            };
        };   
        return product;
    };

    this.cheapest = function () {
        var number = this.cartItems[0].price;
        var product = this.cartItems[0];
        for (var i = 0; i < this.cartItems.length; i++) {
            if (number > this.cartItems[i].price) {
                number = this.cartItems[i].price;
                product = this.cartItems[i];
            };
        };   
        return product;
    };

    this.numberOf = function (Clothing) {
        var numberOfClothing = 0
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i] instanceof Clothing) {
                numberOfClothing += 1; 
            };
        };
        return numberOfClothing;
    };

    this.numberOf = function (Electronics) {
        var numberOfElectronics = 0
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i] instanceof Electronics) {
                numberOfElectronics += 1; 
            };
        };
        return numberOfElectronics;
    };


};
