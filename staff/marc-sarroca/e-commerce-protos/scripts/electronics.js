function Electronics(price, brand, model) {
  this.model = model;
  Product.call(this, price, brand);
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;
