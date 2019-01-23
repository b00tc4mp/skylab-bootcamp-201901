function Clothing(brand, size, price, color, model){
    Product.call(this, brand, size, price)
    this.color=color
    this.model=model
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;