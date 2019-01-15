function suite(suiteTitle) {
    //console.log('%c TEST ' + suiteTitle, 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
    console.log('Test' + suiteTitle);
    

}

function test(useCaseDescription, useCaseExpression) {
    try {
        useCaseExpression();

  //      console.log('%c CASE ' + useCaseDescription, 'color: green;');
        console.log('%c CASE ' + useCaseDescription);
    } catch (err) {
        console.error('CASE ' + useCaseDescription);

        console.error(err);
    }   
}

suite('indexof');

test('find index of the argument',function(){
var paragraph = 'The quick brown fox jumped over the lazy dog. If the dog barked, was it really lazy?';
var searchTerm = 'dog';
var indexOfFirst = paragraph.indexOf(searchTerm);

return 'The index of the first "' + searchTerm + '" from the beginning is ' + indexOfFirst;

var expected = "The index of the first dog from the beginning is 41";
if (indexOfFirst !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('argument is an array',function(){
    var array=['p','a','b','l','o','' ,'e','m','i','l','i','o'];
    var error;
     try {
         indexof([],value);
     } catch(err){
         error=err;
     }
    if (!error) throw Error('should have thrown an error');
    if (typeof array !== String) throw Error('the argument has to be a string');
});

test('argument is an array',function(){
    var value=['p','a','b','l','o','' ,'e','m','i','l','i','o'];
    var error;
     try {
         indexof(string,[]);
     } catch(err){
         error=err;
     }
    if (!error) throw Error('should have thrown an error');
    if (typeof array !== String) throw Error('the argument has to be a string');
});