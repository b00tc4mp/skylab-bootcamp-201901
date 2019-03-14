
function Jeans(brand, size, color, material, price){
    this.material=material;
    Clothing.apply(this, [brand, size, color, price]);

}

Jeans.prototype = Object.create(Clothing.prototype);
Jeans.prototype.constructor = Jeans;    
