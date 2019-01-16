suite('TEST Find')

test('test with function that return boolean', function () {
    var arr = [1, 2, 3, 4, 5];
    var products=[
        {product:'T-shirt', price: 12},
        {product: 'Slips', price: 7},
        {product: 'Shorts', price: 22},
        {product: 'Sockets', price: 3}
    ]

    res = find(arr, function (element) { return element > 3 })
    res2 = find(arr, function (element) { return element*2 > 4 })
    res3 = find(arr, function(element){ return element > 6})
    res4=find(products, function(product){return product.price>5 && product.price<10})

    if (res !== 4) throw Error('Unexpected value with values bigger than')
    if (res2 !== 3) throw Error('unexpected value with values *2 bigger than')
    if (res3 !== undefined) throw Error ('Unexpected value that are not found')
    if (res4 !== products[1]) throw Error ('Unexpected value in products')

});

test('test with a function that return different than boolean', function(){
    var arr = [1, 2, 3, 4, 5];


    res = find(arr, function (element) { return element*3 })
    res2 = find(arr, function (element) { return element*0})


    if (res !== 1) throw Error('Unexpected value of true solution')
    if (res2 !== undefined) throw Error('unexpected value of false solution')


});

test('test arr is not an Array', function(){

    var error

    try{
        find({},function(){});
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');
    
});

test('test callback is not a Function', function(){
    var error

    try{
        find([], true)
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');

});

test('test too many arguments', function(){
    var error
    var arr = [1, 2, 3, 4, 5];

    try{
        find(arr, function(){}, function(){})
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');


});