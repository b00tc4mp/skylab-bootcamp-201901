function Cart(){

  this.products=[];

}


Cart.prototype.add = function(items){
  this.products.push(items);
};

Cart.prototype.totalPrice = function(){
  return this.products.reduce(function(accum, item){
    return accum + item.price;
  },0);
}

Cart.prototype.mostExpensive = function(){
  return this.products.reduce(function(accum, item){
    // if(item.price>a.price){
    //   return item;
    // } 
    // return a;
    return item.price > accum.price ? item : accum;
  });
}

Cart.prototype.numberOfItems = function(){
  return this.products.length;
}

Cart.prototype.cheapest = function(){
  return this.products.reduce(function(accum, item){
    return item.price < accum.price ? item : accum;
  });
}

Cart.prototype.numberOf = function(proto){
  var sum =0;
  for(var i = 0; i<this.products.length; i++){
    if(this.products[i] instanceof proto){
      sum +=1;
    }
  }
  return sum;
}

Cart.prototype.productsByPriceRange = function(min, max){
  // var rangeProducts = [];
  // for(var i = 0; i<this.products.length; i++){
  //   if(this.products[i].price>=min && this.products[i].price<=max){
  //     rangeProducts.push(this.products[i]);
  //   }
  // }
  // return rangeProducts;

  return this.products.filter(function(item){
    return item.price>= min && item.price <=max;
  })
}