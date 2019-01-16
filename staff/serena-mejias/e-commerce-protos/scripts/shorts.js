function Short(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Short.prototype = Object.create(Trousers.prototype);
Short.prototype.constructor = Short;