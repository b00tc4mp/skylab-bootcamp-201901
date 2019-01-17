function Cart() {

    this.totalPrice = function(){
        return this.products.reduce(acum, product){
            return acum + product.price;
        }, 0);
        
    }

}