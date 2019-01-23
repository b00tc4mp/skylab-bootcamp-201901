//var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35);

function Shorts(brand, type, size, color, price){
  
    Trousers.call(this,brand, type, size, color, price);
}

Shorts.prototype=Object.create(Clothing.prototype)
Shorts.prototype.constructor= Shorts