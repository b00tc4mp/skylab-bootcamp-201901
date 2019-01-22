function Boxer() {

};

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;