var cart = new Cart();

/**/
var tshirt = new TShirt(399, "Supreme", "white", "M");
var sweater = new Sweater(149, "Diesel", "black", "M");
var laptop = new Laptop(1599, "Apple", "MacBook Pro", 15);
var desktop = new Desktop(420, "HP", "1800", 20);
var mobile = new Mobile(999, "Apple", "iPhone X", "space-gray");
var mobile2 = new Mobile(119, "Xiaomi", "5X", "space-rose");
var socks = new Socks(9.99, "Calvin Klein", "black", 42);
var tanga = new Tanga(29.95, "Wicked Weasel", "red", 32);
var bra = new Bra(39, "Calvin Klein", "cream", 80, "push-up");
var slips = new Slips(13.99, "Abanderado", "purple", 42);
var jeans = new Jeans(199, "Diesel", "denim", 42, "regular");
var shorts = new Shorts(35, "Adidas", "blue", 42, "Sport");
var cap = new Cap(29, "Obey", "black", "M");
var hat = new Hat(44.99, "Jack & Jones", "red", undefined, "Cup");
/**/

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
/**/
console.log("Total", cart.totalPrice());
console.log("Number of products in cart: ", cart.numberOfItems());
console.log("Most expensive: ", cart.mostExpensive());
console.log("Cheapest one: ", cart.cheapest());
console.log("Nº of clothing items: ", cart.numberOf(Clothing));
console.log("Nº of electronics items: ", cart.numberOf(Electronics));
console.log("Products in between prices: ", cart.productsByPriceRange(30, 120));
/**/
