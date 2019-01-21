describe('Horroy', function () {

    describe('Arguments passed to Horroy constructor', function () {

        describe('SUCCESS', function () {

            it('should create an empty horroy when no arguments', function () {
                var horr = new Horroy;

                var exp = {};

                expect(horr.toString()).toBe(exp.toString())
            })
            it('should create an empty horroy when just one argument & equal 0', function () {
                var horr = new Horroy;

                var exp = {};

                expect(horr.toString()).toBe(exp.toString())
            })
            it('should create a horroy with as many positions as the argument passed. All the positions empty', function(){
                var horr = new Horroy(1, 2, 3, 4);

                var exp = {0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined}

                expect(horr.toString()).toBe(exp.toString())
            })
            it('should create a horroy with length equal to the argument passed', function(){
                var horr = new Horroy(1, 2, 3, 4);

                var exp = 4

                expect(horr.length).toBe(exp)
            })

            it('should create a horroy with a string passed as an argument', function(){

                var horr = new Horroy('house')

                var exp = {0: 'house'}

                expect(horr.toString()).toBe(exp.toString())
            })

            it('should create a horroy with a boolean passed as an argument', function(){

                var horr = new Horroy(true)

                var exp = {0: true}

                expect(horr.toString()).toBe(exp.toString())
            })
        })

        describe('FAIL', function(){

            it('should fail when introducing just one paramaeter and it is a float number', function(){

                var error;

                try{
                    var horr = new Horroy(5.5)
                } catch(err){
                    error = err
                }

                expect(error.toString()).toBe('Error: Invalid horroy length')
            })

        })

    })

    describe('push', function(){

        describe('SUCCESS', function(){

            it('should add new elements to the horroy', function(){

                var horr = new Horroy(0, 1, 2)

                horr.push(3, 4, 5)

                var exp = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }

                expect(horr).toEqual(jasmine.objectContaining(exp))
            })
            it('should return the correct length', function(){

                var horr = new Horroy(0, 1, 2, 3)

                horr.push(4, 5, 6)

                var exp = 7

                expect(horr.length).toBe(exp)
            })
        })

        // describe('FAILS', function(){

        //     it('should fail when an unrecognized element is passed as a parameter', function(){

        //         var error;

        //         try {
        //             var horr = new Horroy(0, 1, 2, 3)

        //             horr.push(4, 5, sd)
        //         } catch (err){
        //             error = err
        //         }

        //         expect(error.toString()).toBe('Error: not recognized param')
        //     })


        // })
    })

    describe('pop', function(){

        describe('SUCCESS', function(){

            it('should return the deleted (last) element of the horroy', function(){

                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.pop()

                var exp = 3

                expect(res).toBe(exp)
            })

            it('should return undefined if horroy is empty', function(){

                var horr = new Horroy

                var res = horr.pop()

                expect(res).toBe(undefined)
            })
        })
    })

    describe('shift', function(){

        describe('SUCCESS', function(){

            it('should return the first element of the horroy (the deleted one)', function(){

                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.shift()

                expect(res).toBe(0)
            })

            it('should return modify the horroy', function(){

                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.shift()

                expect(horr).toEqual(jasmine.objectContaining({0: 1, 1: 2, 2: 3}))
            })

        })

        describe('FAIL', function(){

            it('should fail when there is one paramater passed', function(){

                var error;

                try {var horr = new Horroy(0, 1, 2, 3)

                    var res = horr.shift(45)
                } catch (err){
                    error = err
                }

                expect(error.toString()).toBe('Error: Should not introduce any paramater')
            })
        })
    })

    describe ('unshift', function(){

        describe('SUCCESS', function(){

            it ('should return the new length correctly', function(){

                var horr = new Horroy (0, 1, 2, 3)

                var res = horr.unshift('house', 'potato', 'carrots')

                var exp = 7

                expect(res).toBe(exp)
            })

            it ('should modify the horroy with the new elements', function(){

                var horr = new Horroy (0, 1, 2, 3)

                var res = horr.unshift('house', 'potato', 'carrots')

                var exp = 7

                expect(horr).toEqual(jasmine.objectContaining({ 0: 'house', 1: 'potato', 2: 'carrots', 3: 0, 4: 1, 5: 2, 6: 3}))
            })
        })
    })

    describe('filter', function(){

        describe('SUCCESS', function(){

            it ('should return the new horroy correctly', function(){

                var horr = new Horroy(0, 1, 2, 3, 4)

                var res = horr.filter(function(value){
                    if (value > 2) return true
                })

                expect(res).toEqual(jasmine.objectContaining({0: 3, 1: 4}))
            })

            it ('should return an empty horroy when no results found', function(){

                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.filter(function(value){
                    if (value>5) return true
                })

                expect(res).toEqual(jasmine.objectContaining({}))
            })
        })

        describe('FAILS', function(){

            it('should fail when callback is not a function', function(){

                var error;

                try {
                    var horr = new Horroy

                    var res = horr.filter('potato')
                } catch (err) {
                    error = err
                }

                expect(error.toString()).toBe('TypeError: potato should be a function')
            })
        })
    })

    describe ('find', function(){

        describe('SUCCESS', function(){

            it('should return the first element that satisfies the conditions', function(){

                var horr = new Horroy(0, 1, 2, 3, 4, 5)

                var res = horr.find(function(value){
                    if (value > 2) return true
                })

                expect(res).toBe(3)
            })

        })

    })

})