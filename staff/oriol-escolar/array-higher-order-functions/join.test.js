suite('Join')



//#region Use Case 1

test('Use Case 1',function(){


var array = ['piedras','patatas','manzanas'];

var joined = join(array,'');

var expected = 'piedraspatatasmanzanas'


if ((joined!==expected)) { throw new TypeError(joined + ' is not equal to '+joined); }


});

//#endregion



//#region Use Case 2

test('Use Case 2',function(){


    var array = ['piedras','patatas','manzanas'];
    
    var joined = join(array);
    
    var expected = 'piedras,patatas,manzanas'
    
    
    if ((joined!==expected)) { throw new TypeError(joined + ' is not equal to '+joined); }
    
    
    });
    
    //#endregion


    //#region Use Case 3

test('Use Case 3',function(){


    var array = ['piedras','patatas','manzanas'];
    
    var joined = join(array,",","+");
    
    var expected = 'piedras,patatas,manzanas'
    
    
    if ((joined!==expected)) { throw new TypeError(joined + ' is not equal to '+joined); }
    
    
    });
    
    //#endregion