function productsMachine(products) {
	return {
		retrieveMostExpensive: function() {
			var mostExpensive = products[0];

			for (var i = 1; i < products.length; i++) {
				var product = products[i];

				if (product.price > mostExpensive.price) mostExpensive = product;
			}

			return mostExpensive;
		},

		retrieveCheapest: function() {
			var cheapest = products[0];

			for (var i = 1; i < products.length; i++) {
				var product = products[i];

				if (product.price < cheapest.price) cheapest = product;
			}

			return cheapest;
		}
    };
} 

var cart = [
	{ product: 'T-Shirt', price: 12 },
	{ product: 'Slips', price: 7 },
	{ product: 'Shorts', price: 22 },
	{ product: 'Socks', price: 3 }
];

var cart2 = [
	{ product: 'T-Shirt', price: 13 },
	{ product: 'Slips Deluxe', price: 77 },
	{ product: 'Shorts Cheapy', price: 12 },
	{ product: 'Socks Gold', price: 30 }
];

var machine1 = productsMachine(cart);
var machine2 = productsMachine(cart2);

console.log('most expensive ones');

console.log(machine1.retrieveMostExpensive());
console.log(machine2.retrieveMostExpensive());

console.log('cheapest ones');

console.log(machine1.retrieveCheapest());
console.log(machine2.retrieveCheapest());