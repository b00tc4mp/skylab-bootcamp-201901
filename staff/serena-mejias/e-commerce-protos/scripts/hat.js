function Hat(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;