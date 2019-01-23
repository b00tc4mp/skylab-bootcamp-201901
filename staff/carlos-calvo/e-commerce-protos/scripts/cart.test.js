suite("Cart", function(){
    describe('.add function', function(){
        it('Add a product to the cart sucessfully', function(){
            var err
            var cart = new Cart()
            var obj = {}
            var expectedresult = cart.arraybuy.length + 1

            try{
                cart.add(obj)    
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(!err, 'Shouldnt be any error')
            expect(cart.arraybuy.length == expectedresult, 'Should match the result')
        });
    });

    describe('.add function', function(){
        it('Incorrect argument - Result BAD', function(){
            var err
            var cart = new Cart()
            try{
                
                cart.add('1')    
            }catch(error){
                err = error
            }
            expect(TypeError ('Item not a object!'),'Should be an error! Not an object as parameter') //Si hi ha error is OK
        });
    });

    describe('Method Total', function(){
        it('Price OK', function(){
            var err
            var cart = new Cart()
            var result;
            
            try{
                cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
                result = cart.totalPrice()   
            }catch(error){
                err = error
            }
    
            expect(!err,'Shouldnt be an error! Not an object as parameter')
            expect(result == 119, 'Incorrect Result!')
        });
    })


    describe('Method Total ', function(){

        it('Price OK - with 0 products in cart', function(){
            var err
            var cart = new Cart()
            var result;
            var expectedresult = 0;
            
            try{
                result = cart.totalPrice()   
            }catch(error){
                err = error
            }
    
            expect(!err,'Shouldnt be an error! Not an object as parameter')
            expect(result == expectedresult, 'Incorrect Result!')
        });    
    });


    describe('Method mostExpensive', function(){

        it('REsult OK', function(){
            var err
            var cart = new Cart()
            var result;
            var expectedresult = 119
            
            try{
                cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
                cart.add(new Mobile('PP', '5t', 'blue', 20))
                result = cart.mostExpensive()
            }catch(error){
                err = error
            }
    
            expect(!err,'Shouldnt be an error! Not an object as parameter')
            expect(result.price == expectedresult, 'Incorrect Result!')
        });
        
    });


    describe('Method mostExpensive', function(){

        it( '- BAD Too Many Arguments', function(){
            var err
            var cart = new Cart()
            var result;
            var expectedresult = 119
            
            try{
                cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
                cart.add(new Mobile('PP', '5t', 'blue', 20))
                result = cart.mostExpensive(2)
            }catch(error){
                err = error
            }
            expect(err,'Error should exist!')
        })
    });


    describe('Number of type', function(){

        it('Base Case', function(){
            var err
            var cart = new Cart()
            var result;
            var expectedresult = 2;
            
            try{
                debugger
                cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
                cart.add(new Mobile('PP', '5t', 'blue', 20))
                result = cart.numberOf(Mobile)
            }catch(error){
                err = error
            }
    
            expect(!err,'Error shouldnt exist!')
            expect(result == expectedresult,'Expected result should match result')
        });
    });
        

    describe('Number of type ', function(){
        it('Type not found', function(){
            var err
            var cart = new Cart()
            var result;
            var expectedresult = 0;
            try{
                cart.add(new Mobile('Xiaomi', '5X', 'space-rose', 119))
                cart.add(new Mobile('PP', '5t', 'blue', 20))
                result = cart.numberOf(expectedresult)
            }catch(error){
                err = error
            }
    
            expect(err,'Error should exist!')
        });
    });


    describe('productsByPriceRange', function(){
        it('Base Case - OK', function(){
            var err
            var cart = new Cart()
            var result;
            var mobil1 = new Mobile('Xiaomi', '5X', 'space-rose', 119)
            var mobil2 = new Mobile('PP', '5t', 'blue', 20)
            var expectedresult = []
            expectedresult.push(mobil2)
            
            try{
                cart.add(mobil1)
                cart.add(mobil2)
                result = cart.productsByPriceRange(0, 100)
            }catch(error){
                err = error
            }
            expect(!err,'Error shouldnt exist!')
            expect(result[0].toJSON == expectedresult.toJSON,'Expected result should match result')
        });
    });



    describe('productsByPriceRange', function(){

        it('Case BAse II Ok', function(){
            var err
            var cart = new Cart()
            var result;
            var mobil1 = new Mobile('Xiaomi', '5X', 'space-rose', 119)
            var mobil2 = new Mobile('PP', '5t', 'blue', 20)
            var expectedresult = []
            expectedresult.push(mobil2)
            
            try{
                cart.add(mobil1)
                cart.add(mobil2)
                result = cart.productsByPriceRange(0, 100)
            }catch(error){
                err = error
            }
            
            expect(!err,'Error shouldnt exist!')
            expect(result[0].toJSON == expectedresult.toJSON,'Expected result should match result')
        })
    });

    describe('productsByPriceRange', function(){

        it('Too Many Arguments', function(){
            var err
            var cart = new Cart()
            var mobil1 = new Mobile('Xiaomi', '5X', 'space-rose', 119)
            var mobil2 = new Mobile('PP', '5t', 'blue', 20)
            var expectedresult = []
            expectedresult.push(mobil2)
            try{
                cart.add(mobil1)
                cart.add(mobil2)
                result = cart.productsByPriceRange(0, 100,200,400)
            }catch(error){
                err = error
            }
            expect(err,'Error should exist!')
        })
    });










})




    // describe('fail on too many arguments', function () {
    //     var error;

    //     try {
    //         find([], 1, true);
    //     } catch (err) {
    //         error = err;
    //     }

    //     if (!error) throw Error('should have thrown an error');
    //     if (!(error instanceof Error)) throw Error('error should be of type Error');
    // });
