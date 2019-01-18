suite("indexOfTest")

test("Base Case OK", function(){
    var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
    keysearch = "Orange";
    startingposition=0;
    debugger;
    var err;
    var result;
    try {
        result = indexOf(fruits, keysearch, startingposition)
        console.log(result)
        debugger
    } catch (error) {
        err= error;
    }

    if(!(result == 1)) throw new Error ('Should match result')

})


test("BAD: Number of Arguments = 1", function(){
    var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
    keysearch = "Orange";
    startingposition=0;

    var err;

    try {
        indexOf(fruits)
    } catch (error) {
        err= error;
        console.log(error)
    }

    if(!err) throw new Error('Should have thrown an error')
    

})


test("BAD: Number of Arguments = 4", function(){
    var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
    keysearch = "Orange";
    startingposition=0;

    var err;

    try {
        indexOf(fruits, keysearch, startingposition, err)
    } catch (error) {
        err= error;
        console.log(error)
    }

    if(!err) throw new Error('Should have thrown an error')
    

})


test("BASE CASE 2 ARGUMENTS", function(){
    var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
    keysearch = "Apple";
    startingposition=0;

    var err;
    var result;
    try {
        result = indexOf(fruits, keysearch)
        console.log(result)
    } catch (error) {
        err= error;
        console.log(error)
    }

    if(err) throw new Error('Should be OKAY!')
    

})


test("BASE CASE 2 ARGUMENTS - NO FOUND", function(){
    var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
    keysearch = "Manzana";
    startingposition=0;

    var err;
    var result;
    try {
        result = indexOf(fruits, keysearch)
        console.log(result)
    } catch (error) {
        err= error;
        console.log(error)
    }

    if(!(result == -1)) throw new Error('-1 --> Should be OKAY!')
})
