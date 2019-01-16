//var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);

function Jeans(brand, type, size, color, price){
  
    Trousers.call(this,brand, type, size, color, price);
}

Jeans.prototype=Object.create(Clothing.prototype)
Jeans.prototype.constructor= Jeans
