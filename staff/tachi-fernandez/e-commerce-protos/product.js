function Product(brand,model,size,color,price) {
    this.brand = brand
    this.model = model
    this.price = price
    
}

Product.prototype = new Product
Product.prototype.constructor = Product;