'use stric'
/**
 * Checks wether a condition is satisfied, otherwise throws an error.
 * 
 * @param {*} actual The actual value to check agains the expected value.
 * @param {*} expected The expected value.
 */
function expect(actual, expected, index) {
    if (Array.isArray(actual) && Array.isArray(expected)){
        if(actual.length===expected.length){
            for (var i in expected) {
                expect(actual[i], expected[i], i);
            }
        }else{
            throw Error ('expected [' + actual + '] to be [' + expected+']' )
        }
    }else{

        if(index!==null){
            if (actual !== expected) throw Error('expected ' + actual + ' to be ' + expected+' on index '+index);
        }else{
            if (actual !== expected) throw Error('expected ' + actual + ' to be ' + expected);
        }
    }

}

