function Clothing(brand, model, color, price) {
    this.price = model
    this.color = color;
    
   
    Clothing.call(brand, model);

}

Clothing.prototype = Object.create(Product.prototype)
Clothing.prototype.constructor = Clothing