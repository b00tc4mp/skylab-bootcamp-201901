suite('Reduce');

// test('reduces into value', function () {
//     var products = [
//         { product: 'T-shirt', price: 12 },
//         { product: 'Slips', price: 7 },
//         { product: 'Shorts', price: 22 },
//         { product: 'Sockets', price: 3 }
//     ];

//     var total = reduce(products, function (accumulator, product) {
//         return accumulator + product.price;
//     }, 0)

//     var expected = 44;

//     if (total !== expected) throw Error('unexpected value')

// });

// test('reduces into value without initial accumulator', function(){
//     var numbers=[1,2,3,4,5];

//     var total = reduce(products, function (accumulator, product) {
//         return accumulator + product.price;
//     })

//     if (total !== 16) throw Error('unexpected value')

// });