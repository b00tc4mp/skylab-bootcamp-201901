var cart = new Cart;

// - PRODUCTS

// --- electronics
var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
// ------ Computers
var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
var desktop = new Desktop('HP', '1800', 20, 420);


// --- clothing
var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99);
var tshirt = new TShirt('Supreme', 'M', 'white', 399);
var cap = new Cap('Obey', 'M', 'black', 29);
var sweater = new Sweater('Diesel', 'M', 'black', 149);
// ------ underwear
var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
var slips = new Slips('Abanderado', 42, 'purple', 13.99);
// ------ trousers
var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); 
var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35);




cart.add(socks);
cart.add(tanga);
cart.add(bra);
cart.add(slips);
cart.add(mobile);
cart.add(mobile2);
cart.add(laptop);
cart.add(desktop);
cart.add(hat);
cart.add(jeans);
cart.add(tshirt);
cart.add(cap);
cart.add(shorts);
cart.add(sweater);

console.log('total', cart.totalPrice());
console.log('number of items', cart.numberOfItems());
console.log('most expensive', cart.mostExpensive());
console.log('cheapest', cart.cheapest());
console.log('number of clothing items', cart.numberOf(Clothing));
console.log('number of electronics items', cart.numberOf(Electronics));
console.log('products in between prices', cart.productsByPriceRange(30, 120));
console.log('products in between prices(changed prices)', cart.productsByPriceRange(120, 30));






