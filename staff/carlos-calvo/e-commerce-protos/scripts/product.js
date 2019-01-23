function Product(brand, size, price) {
    this.brand = brand;
    this.size=size;
    this.price= price;

    
}
Product.prototype = Object.create(Object)
Product.prototype.constructor = Product



/*

function Article (price, id){
    this.price=price
    this.id = id
}
Article.prototype = Object.create(Object)
Article.prototype.constructor = Article

*/