describe('Horroy', function() {
    // WARN is this initializaton necessary?

    // var horroy;

    beforeEach(function() {
        horroy = new Horroy;
     });


     describe('from', function() {
        
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';
            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });

    describe('fill', function(){
    
        beforeEach(function(){
            horroy = new Horroy(1,2,3,4,5);
        });

        it('should change the elements of horroy for the argument',function(){
            
            var result = horroy.fill(5,1,3);
            var expected = {0: 1, 1: 5, 2: 5, 3: 4, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });

        it('end is an optional argument',function(){
             
            var result = horroy.fill(5,1);
            var expected = {0: 1, 1: 5, 2: 5, 3: 5, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });

        it('start is an optional argument',function(){
             
            var result = horroy.fill(5);
            var expected = {0: 5, 1: 5, 2: 5, 3: 5, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
    });


    describe('forEach', function(){

        beforeEach(function(){
            horroy = new Horroy(1,2,3);
        });
       
        it('should show all the arguments of and object',function(){
        
            var result = 0
            horroy.forEach(function(element){
                result += element * 2            
            })
            var expected = 12;
        
            expect(result).toEqual(expected);
        });
     
        it('should have an object to iterate to',function(){
            
            var result = 0

            horroy.forEach(function(element){
            result += element * 2            
            })
     
        expect(horroy).toBeDefined();
        });
    }) 
// si el callback q s'envia a forEach no es una callback (funcio) error
// var aa = h.forEach('hgghgh')
    describe('push', function(){

        beforeEach(function(){
            horroy = new Horroy();
        });

        it('should and return objects length',function(){ 

            var result = horroy.push(7);

            var expected = 1         

        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        })
        it("should have an object to push items",function(){ 

                horroy.push(7);       

        expect(horroy).toBeDefined();        
        })

    });

    describe('find', function(){

        beforeEach(function(){
            horroy = new Horroy(6,7,8,99,103);
        });

        it("should find an element that exists",function(){ 
 
            result = horroy.find(function(element){  
                return element > 13;
            })    
                var expected = 99
        
        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));

        });

        it("should return the first element who fulfill the condition",function(){ 
 
            result = horroy.find(function(element){  
                return element > 13;
            });    
                var expected = 99
        
        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        }); 

        it("should have an object to fint items",function(){ 
 
            result = horroy.find(function(element){  
                return element > 13;
            });    

        
        expect(horroy).toBeDefined();  
        }); 
    });

    describe('join', function(){

        beforeEach(function(){
            horroy = new Horroy(["Wind","Rain","Fire"]);
        });

        it("should join all items",function(){ 
            
        result = horroy[0].join()
        
        var expected = "Wind,Rain,Fire"
    
        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });

        it("should have an object to join items",function(){ 
            
            result = horroy[0].join()
            
            var expected = "Wind,Rain,Fire"
        
            expect(horroy).toBeDefined(); 
        });   
    
        it("should join items with '-' " ,function(){ 
            
            result = horroy[0].join('-')
            
            var expected = "Wind-Rain-Fire"
        
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });   
    });

    describe('map', function(){

        beforeEach(function(){
            horroy = new Horroy(1,2,3,4);
        });
       
        it('should multiply all arguments',function(){
         
            var result = []
            horroy.map(function(element){
                result += element * 3  
            })   
            
            var expected = "36912"
            console.log()

            expect(result).toBe(expected);
        });
     
        it('should an object to be defined',function(){
            
            var result = []
            horroy.map(function(element){
                result += element * 3  
            })   
        
        
            expect(horroy).toBeDefined(); 
        });
    });
    /////// reduce 


    describe('reverse', function(){

        beforeEach(function(){
            horroy = new Horroy(1,2,3,4);
        });
       
        it('should show all arguments reversed',function(){
           
            result = horroy.reverse()

            expected = [4, 3, 2, 1]

            expect(result).toEqual(expected);

        });
        it('should an object to be defined to reverse it',function(){
            
                var result = []
                result = horroy.reverse()
            
                expect(horroy).toBeDefined();    
        })

        
        
})
})

