

function Socks(brand, size, color, price){
    Underwear.apply(this, [brand, size, color, price]);

}

Socks.prototype = Object.create(Underwear.prototype);
Socks.prototype.constructor = Socks;    