function Cart(){

  this.products=[];

  this.add = function(items){
    this.products.push(items);
  };

  // this.totalPrice = function(){
  //   acc=0;
  //   for(var i = 0; i<this.products.length; i++){
  //     acc += this.products[i].price;
  //   }
  //   return acc;
  // }

  this.totalPrice = function(){
    return this.products.reduce(function(a, item){
      return a + item.price;
    },0);
  }

  this.numberOfItems = function(){
    return this.products.length;
  }

  // this.mostExpensive = function(){
  //   var expensiveItem = this.products[0];
  //   for(var i = 0; i<this.products.length; i++){
  //       if(this.products[i].price > expensiveItem.price){
  //           expensiveItem = this.products[i];
  //       }
  //   }
  //   return expensiveItem;
  // }

  this.mostExpensive = function(){
    return this.products.reduce(function(a,item){
      if(item.price>a.price){
        return item;
      } 
      return a;
    });
  }

  // this.cheapest = function(){
  //   var cheapestItem = this.products[0];
  //   for(var i = 0; i<this.products.length; i++){
  //       if(this.products[i].price < cheapestItem.price){
  //           cheapestItem = this.products[i];
  //       }
  //   }
  //   return cheapestItem;
  // }

  this.cheapest = function(){
    return this.products.reduce(function(a, item){
      if(a.price>item.price){
        return item;
      }
      return  a;
    });
  }

  this.numberOf = function(proto){
    var sum =0;
    for(var i = 0; i<this.products.length; i++){
      if(this.products[i] instanceof proto){
        sum +=1;
      }
    }
    return sum;
  }

  this.productsByPriceRange = function(min, max){
    var rangeProducts = [];
    for(var i = 0; i<this.products.length; i++){
      if(this.products[i].price>=min && this.products[i].price<=max){
        rangeProducts.push(this.products[i]);
      }
    }
    return rangeProducts;
  }
}