suite('Find')

test(' with function that return boolean', function () {
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

    assert (res === 4,'Unexpected value with values bigger than')
    assert (res2 === 3,'unexpected value with values *2 bigger than')
    assert (res3 === undefined, 'Unexpected value that are not found')
    assert (res4 === products[1], 'Unexpected value in products')

});

test(' with a function that return different than boolean', function(){
    var arr = [1, 2, 3, 4, 5];


    res = find(arr, function (element) { return element*3 })
    res2 = find(arr, function (element) { return element*0})


    assert (res === 1,'Unexpected value of true solution')
    assert (res2 === undefined,'unexpected value of false solution')


});

test(' arr is not an Array', function(){

    var error

    try{
        find({},function(){});
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
    
});

test(' callback is not a Function', function(){
    var error

    try{
        find([], true)
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');
    assert (error instanceof TypeError,'should have thrown TypeError');

});

test(' too many arguments', function(){
    var error
    var arr = [1, 2, 3, 4, 5];

    try{
        find(arr, function(){}, function(){})
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');


});