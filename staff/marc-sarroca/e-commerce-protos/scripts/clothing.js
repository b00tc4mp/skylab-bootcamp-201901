function Clothing(price, brand, color, size) {
  this.color = color;
  this.size = size;
  Product.call(this, price, brand);
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;
