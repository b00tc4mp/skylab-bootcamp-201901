function Cart() {
    this.cartItems = [];
    
    this.add = function (item){
        this.cartItems.push(item)
        console.log(this.cartItems)
    };

    this.totalPrice = function(){
        var sumP = 0;
        for (let i = 0; i< this.cartItems.length; i++){
           sumP += this.cartItems[i].price
        };
        return sumP
    };

    this.numberOfItems = function (){
        sumItems = 0;
        for (let i =0; i< this.cartItems.length; i++){
            sumItems ++
        }
        return sumItems
    }

    this.mostExpensive = function() {
        var exp = this.cartItems[0].price;
        var pro = {}
        for (let i=0; i< this.cartItems.length; i++){
            if (exp < this.cartItems[i].price) {
                exp = this.cartItems[i].price
                pro = this.cartItems[i]
            }
        }
        return pro
    }

    this.cheapest = function (){
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

    this.numberOf = function (item){
        sum = 0;
        for (let i = 0; i< this.cartItems.length; i++){
            if (this.cartItems[i].constructor.name === item || this.cartItems[i] instanceof item){
                sum ++
            }
        }
        return sum
    }

    this.productsByPriceRange = function(min, max){
        var list = []
        for (var i =0; i< this.cartItems.length; i++){
            if (this.cartItems[i].price > min && this.cartItems[i].price < max){
                list.push(this.cartItems[i])
            };
        }
        return list
    }
}
