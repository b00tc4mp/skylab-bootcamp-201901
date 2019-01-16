var cart = new Cart;

var socks = new Socks('Calvin Klein', 42, 'black', 9.99); // brand,size,color,price
var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95); // brand,size,color,price
var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand,type,size,color,price
var slips = new Slips('Abanderado', 42, 'purple', 13.99); // brand,size,color,price
var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand,type,color,price
var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand,type,color,price
var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand,type,size,price
var desktop = new Desktop('HP', '1800', 20, 420); // brand,type,size,price
var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand,model,color,price
var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand,type,size,color,price
var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand,size,color,price
var cap = new Cap('Obey', 'M', 'black', 29); // brand,size,color,price
var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand,type,size,color,price
var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand,size,color,price

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

console.log('The total price of all the products in the cart is:', cart.totalPrice(), 'USD.');
console.log('The total number of items in added to cart is:', cart.numberOfItems());
console.log('The most expensive number in the cart:', cart.mostExpensive());
console.log('The cheapest item in the cart:', cart.cheapest());
console.log('The total number of clothing items is:', cart.numberOf(Clothing));
console.log('The total number of electronics items is:', cart.numberOf(Electronics));
console.log('These are the products between prices of 30USD and 120USD:', cart.productsByPriceRange(30, 120));






