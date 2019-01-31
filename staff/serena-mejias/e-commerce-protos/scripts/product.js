function Product(brand,size,price) {
    this.brand = brand;
    this.size = size;
    this.price = price;
}

Product.prototype.constructor = Product;