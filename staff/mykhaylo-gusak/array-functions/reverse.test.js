'use strict'

suite ('reverse', function (){

test ('Should works good!', function (){

    var letters = ['A','B','C'];
    var result = []; // ['C','B','A']
    var check = ['C','B','A'];

    result = reverse(letters);

    for ( var i in letters){
        expect(result[i],check[i]);
    }
});

test ('Should breack on undefined', function(){

    try {
        reverse();
    } catch (error) {
        expect(error.message, 'undefined is not an array');
    }


});

test ('Should break on String', function(){
    var aString = 'aString';

    try {
        reverse(aString);
    } catch (error) {
        expect(error.message, 'aString is not an array');
    }


});





});
