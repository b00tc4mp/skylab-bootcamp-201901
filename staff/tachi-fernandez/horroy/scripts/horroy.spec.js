describe('concatenate', function(){
    var h;
    
    beforeEach(function(){
        h=new Horroy(1,2,3,4)
    });
    
    
    it('sould concatenate an array', function(){
        var res=h.concat([5,6,7])

        expect(res.toString()).toBe([1,2,3,4,5,6,7].toString())
    });
    it('sould concatenate a Horroy', function(){
        var h2=new Horroy(5,6,7);
        var res=h.concat(h2)

        expect(res.toString()).toBe([1,2,3,4,5,6,7].toString())
    });
    it('sould concatenate more than one input', function(){
    
        var res=h.concat(5,6,7)

        expect(res.toString()).toBe([1,2,3,4,5,6,7].toString())
    });
    it('sould concatenate more than one input with Horroy in the middle', function(){
        var h2=new Horroy('this is a', 'Horroy');
        var res=h.concat(5,6,h2,7)

        expect(res.toString()).toBe([1,2,3,4,5,6,'this is a', 'Horroy',7].toString())
    });
    
});

describe('copywithin', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4,5,6,7,8,9)
    });
    
    
    it('sould copy with defined target, start and end', function(){
        var res=h.copyWithin(3,5,7)
    
        expect(res.toString()).toBe([1,2,3,6,7,6,7,8,9].toString())
    
    });

    it('sould copy with defining only target and start', function(){
        var res=h.copyWithin(3,5)
    
        expect(res.toString()).toBe([1,2,3,6,7,8,9,8,9].toString())
    });

    it('sould copy with defining only target', function(){
        var res=h.copyWithin(2)
    
        expect(res.toString()).toBe([1,2,1,2,3,4,5,6,7].toString())
    }); 
});

describe('every', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4,5,6,7,8,9)
    });
    
    
    it('sould return true since all the elements satisfies callback', function(){
        function callback(currentValue) {
            return currentValue < 10;
          }
        
        var res=h.every(callback)

        expect(res).toBe(true)
    
    });

    it('sould return false since there is one that not satisfies', function(){
        function callback(currentValue) {
            return currentValue < 5;
          }
        
        var res=h.every(callback)

        expect(res).toBe(false)
    
    });

    it('sould throw a typeError', function(){
                
        expect(function(){h.every('callback');}).toThrow(new TypeError('callback' +' is not a function'))
        expect(function(){h.every(true);}).toThrow(new TypeError(true +' is not a function'))
    
    });
    
});

describe('findIndex', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4,5,6,7,8,9)
    });
    
    
    it('sould return the index', function(){
        function callback(currentValue) {
            return currentValue > 6;
          }
        
        var res=h.findIndex(callback)

        expect(res).toBe(6)
    
    });  
    
    it('sould return -1', function(){
        function callback(currentValue) {
            return currentValue > 10;
          }
        
        var res=h.findIndex(callback)

        expect(res).toBe(-1)
    
    });  
    
    it('sould throw a typeError', function(){
                
        expect(function(){h.every('callback');}).toThrow(new TypeError('callback' +' is not a function'))
        expect(function(){h.every(true);}).toThrow(new TypeError(true +' is not a function'))
    
    });
});

describe('flat', function(){
    var h1;
    var h2;
    var h3;

    beforeEach(function(){
        h1=new Horroy(1,2,[3,4,5,6,7],8,9)
        h2=new Horroy(1,2,[3,4,[[5],6],7],8,9)
        h3=new Horroy(1,2,[3,4,[[5],6],7],8,9)
    });
    
    
    it('sould return the flated value with depth 1', function(){
        
        var res=h1.flat(1);

        expect(res.toString()).toBe([1,2,3,4,5,6,7,8,9].toString())
    
    }); 
    
    it('sould return the flated value with depth higher than 1', function(){
        
        var res2=h2.flat(2);
        var res3=h3.flat(3);

        expect(res2.toString()).toBe([1,2,3,4,5,6,7,8,9].toString())
        expect(res3.toString()).toBe([1,2,3,4,5,6,7,8,9].toString())
    
    });  
    it('sould return the same horroy with undefined depth', function(){
        
        var res=h1.flat();

        expect(res.toString()).toBe([1,2,[3,4,5,6,7],8,9].toString())
    
    }); 
});

describe('flatMap', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4)
    });
    
    
    it('sould return maped and flatered horroy', function(){
        function callback(el) {
            return [el*2];
          }
        
        var res=h.flatMap(callback)

        expect(res.toString()).toBe([2,4,6,8].toString())
    
    });    
    it('sould return maped and flatered horroy only with depth 1', function(){
        function callback(el) {
            return [[el*2]];
          }
        
        var res=h.flatMap(callback)

        expect(res[2]).toEqual([6])
    
    });  
});


describe('includes', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4,5,6,7,8,9)
    });
    
    
    it('sould return true since is included', function(){

        var res=h.includes(5)

        expect(res).toBe(true)
    
    });  
        
    it('sould return false since is not included', function(){

        var res=h.includes(15)

        expect(res).toBe(false)
    
    });   
});


describe('last index of', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,5,3,4,5,6,7,5,9)
    });
    
    
    it('sould return last index without specifiend fromIndex', function(){
              
        var res=h.lastIndexOf(5)

        expect(res).toBe(7)
    
    }); 

    it('sould return last index specifying fromIndex', function(){
              
        var res=h.lastIndexOf(5,5)

        expect(res).toBe(4)
    
    });      
});

describe('reduceRigth', function(){
    var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4)
    });
    
    
    it('sould reduce withou accumulator', function(){
               
        var res=h.reduceRigth(function(accumulator, currentValue) {
            return accumulator + currentValue;
        });

        expect(res).toBe(10)
    
    });  
    
    it('sould reduce with accumulator', function(){
               
        var res=h.reduceRigth(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 5);

        expect(res).toBe(15)
    
    }); 

    it('sould reduce from the end', function(){
        
        var h=new Horroy([0, 1], [2, 3], [4, 5])
       
        var res=h.reduceRigth(function(accumulator, currentValue) {
            return accumulator.concat(currentValue);
        });

        expect(res.toString()).toBe([4, 5, 2, 3, 0, 1].toString())
    
    }); 

    it('sould throw a typeError', function(){
                
        expect(function(){h.reduceRigth('callback');}).toThrow(new TypeError('callback' +' is not a function'))
        expect(function(){h.reduceRigth(true);}).toThrow(new TypeError(true +' is not a function'))
    
    });
});

describe('sort', function(){
    var hnum;
    var hany;
    beforeEach(function(){
        hnum=new Horroy(1567,154,2,1222)
        hany=new Horroy(1567,154,2,1222,true,'gili','abuela')
    });
    
    
    it('sould organize numbers', function(){
               
        var res=hnum.sort()

        expect(res.toString()).toBe([1222, 154, 1567, 2].toString())
    
    });  
        
    it('sould organize any', function(){
               
        var res=hany.sort()

        expect(res.toString()).toBe([1222, 154, 1567, 2, "abuela", "gili", true].toString())
        expect(typeof res[6]).toBe('boolean')
        expect(typeof res[5]).toBe('string')
    
    });   
});

describe('toSource', function(){
     var h;

    beforeEach(function(){
        h=new Horroy(1,2,3,4,5,6,7,8,9)
    });
    
    
    it('sould return a string with the source', function(){
                
        var res=h.toSource()

        expect(res).toBe('[1,2,3,4,5,6,7,8,9]')
    
    });    
});

// describe('title', function(){
    
//     beforeEach(function(){
//         h=new Horroy(1,2,3,4,5,6,7,8,9)
//     });
    
    
//     it('sould...', function(){
//         function callback(currentValue) {
//             return currentValue < 10;
//           }
        
//         res=h.every(callback)

//         expect(res).toBe(true)
    
//     });    
// });

