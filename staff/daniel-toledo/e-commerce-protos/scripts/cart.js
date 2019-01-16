
function Cart(){
    this.cartList=[];

    this.add=function(object){
        this.cartList.push(object);
        return this.cartList
    }

    this.totalPrice=function(){
        var sum=0
        for (var i=0; i<this.cartList.length; i++){
            sum +=this.cartList[i].price
        }
        
        return sum
    }

    this.numberOfItems=function(){
        return this.cartList.length
    }

    this.mostExpensive=function(){
        var expensive=0;

        for (var i=1; i<this.cartList.length; i++){
            if(this.cartList[i].price>this.cartList[expensive].price){
                expensive=i
            }
        }
        return this.cartList[expensive]
    }

    this.cheapest=function(){
        var cheap=0;
        for (var i=1; i<this.cartList.length; i++){
            if(this.cartList[i].price<this.cartList[cheap].price){
                cheap=i
            }
        }
        return this.cartList[cheap]

    }

    this.productsByPriceRange=function(start,end){
        var range=[];
        for (var i=0; i<this.cartList.length; i++){
            
            if(this.cartList[i].price>=start && this.cartList[i].price<=end){
                range.push(this.cartList[i])
            }
        }

        return range
    }

    this.numberOf=function(type){

        var typeSum=0;

        for (var i=0; i<this.cartList.length; i++){
            if(this.cartList[i] instanceof type){
                typeSum +=1
            }
        }

        return typeSum
    }


}