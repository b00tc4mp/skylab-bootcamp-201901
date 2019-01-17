function Product(brand,model,price) {
    this.brand = brand
    this.model = model
    this.price = price
    
}

Product.prototype = new Product
Product.prototype.constructor = Product;