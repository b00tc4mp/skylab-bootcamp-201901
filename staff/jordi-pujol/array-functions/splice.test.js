suite('splice')

test('should work when we introduce all the parameters & there are more elements to delete than to add', function(){

    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = splice(a, 2, 4, "house", "casa")

    var exp = [2, 3, 4, 5];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected (deleted elements)')
    if(a.toString() !== [0, 1, "house", "casa", 6, 7, 8, 9].toString()) throw Error ('the result should be the expected (deleted elements)')
})

test('should work when we introduce all the parameters', function(){
   
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = splice(a, 2, 2, "house", "casa", "tomato", "tomaquet")

    var exp = [2, 3];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected (deleted elements)')
    if(a.toString() !== [0, 1, "house", "casa", "tomato", "tomaquet", 4, 5, 6, 7, 8, 9].toString()) throw Error ('the result should be the expected (deleted elements)')
})

test('should return an empty array when we do not introduce the deletecount but other elements', function(){
    
    var a = [0, 1, 2, 3]

    var res = splice(a, 2, 'home')

    var exp = [];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected (deleted elements)')
})

test('should work when we do not introduce any element to add nor deletecount', function(){

    var a = [0, 1, 2, 3]

    var res = splice(a, 2)

    var exp = [2, 3];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected (deleted elements)')
})

test('should work when we do not introduce any element but start and deletcount', function(){

    var a = [0, 1, 2, 3, 4, 5, 6]

    var res = splice(a, 2, 2)

    var exp = [2, 3];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected (deleted elements)')
})

test('should return empty array if no start nor deletcount introduced', function(){

    var a = [0, 1, 2, 3]

    var res = splice(a, "home", "casa")

    var exp = [];

    if(res.toString() !== exp.toString()) throw Error ('the result should be the expected')
})