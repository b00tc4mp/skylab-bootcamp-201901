function Product(brand, size, price) {
    this.brand = brand;
    this.size = size;
    this.price = price;
}


Product.prototype.constructor = Product;


/*es millor q el pare tingui totes les caracteristiques i els fills
l'es heredin. i si el parametre no existeix en els fills, 
es mostrarà com undefined.

/**
 * 
 * @param{string}brand
 * @param{string}model
 * @param{number}size
 * @param{string}color
 * @param{number}price
 * 
 * 
 
function Product(brand, model, size, color, price) {
    this.brand = brand;
    this.model = model;
    this.size = size;
    this.color = color;
    this.price = price;
}

*/


