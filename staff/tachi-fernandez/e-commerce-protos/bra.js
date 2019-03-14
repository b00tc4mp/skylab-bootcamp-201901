function Bra(brand,model,size,color,price){
    this.brand = brand;
    this.model = model
    this.size = size;
    this.color = color;
    this.price = price;
};

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;