describe('Horroy', function () {

    describe('Arguments passed to Horroy constructor', function () {

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
            it('should create a horroy with as many positions as the argument passed. All the positions empty', function () {
                var horr = new Horroy(1, 2, 3, 4);

                var exp = { 0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined }

                expect(horr.toString()).toBe(exp.toString())
            })
            it('should create a horroy with length equal to the argument passed', function () {
                var horr = new Horroy(1, 2, 3, 4);

                var exp = 4

                expect(horr.length).toBe(exp)
            })

            it('should create a horroy with a string passed as an argument', function () {

                var horr = new Horroy('house')

                var exp = { 0: 'house' }

                expect(horr.toString()).toBe(exp.toString())
            })

            it('should create a horroy with a boolean passed as an argument', function () {

                var horr = new Horroy(true)

                var exp = { 0: true }

                expect(horr.toString()).toBe(exp.toString())
            })

            it('should fail when introducing just one paramaeter and it is a float number', function () {

                var error;

                try {
                    var horr = new Horroy(5.5)
                } catch (err) {
                    error = err
                }

                expect(error.toString()).toBe('Error: Invalid horroy length')
            })
    })

    describe('push', function () {

        it('should add new elements to the horroy', function () {

            var horr = new Horroy(0, 1, 2)

            horr.push(3, 4, 5)

            var exp = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }

            expect(horr).toEqual(jasmine.objectContaining(exp))
        })
        it('should return the correct length', function () {

            var horr = new Horroy(0, 1, 2, 3)

            horr.push(4, 5, 6)

            var exp = 7

            expect(horr.length).toBe(exp)
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

    describe('pop', function () {

        it('should return the deleted (last) element of the horroy', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.pop()

            var exp = 3

            expect(res).toBe(exp)
        })

        it('should return undefined if horroy is empty', function () {

            var horr = new Horroy

            var res = horr.pop()

            expect(res).toBe(undefined)
        })
    })

    describe('shift', function () {

        it('should return the first element of the horroy (the deleted one)', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.shift()

            expect(res).toBe(0)
        })

        it('should return modify the horroy', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.shift()

            expect(horr).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3 }))
        })

        it('should fail when there is one paramater passed', function () {

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.shift(45)
            } catch (err) {
                error = err
            }

            expect(error.toString()).toBe('Error: Should not introduce any paramater')
        })
    })

    describe('unshift', function () {

        it('should return the new length correctly', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.unshift('house', 'potato', 'carrots')

            var exp = 7

            expect(res).toBe(exp)
        })

        it('should modify the horroy with the new elements', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.unshift('house', 'potato', 'carrots')

            var exp = 7

            expect(horr).toEqual(jasmine.objectContaining({ 0: 'house', 1: 'potato', 2: 'carrots', 3: 0, 4: 1, 5: 2, 6: 3 }))
        })
    })

    describe('filter', function () {

        it('should return the new horroy correctly', function () {

            var horr = new Horroy(0, 1, 2, 3, 4)

            var res = horr.filter(function (value) {
                if (value > 2) return true
            })

            expect(res).toEqual(jasmine.objectContaining({ 0: 3, 1: 4 }))
        })

        it('should return an empty horroy when no results found', function () {

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.filter(function (value) {
                if (value > 5) return true
            })

            expect(res).toEqual(jasmine.objectContaining({}))
        })

        it('should fail when callback is not a function', function () {

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

    describe('find', function () {

        it('should return the first element that satisfies the conditions', function () {

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.find(function (value) {
                if (value > 2) return true
            })

            expect(res).toBe(3)
        })

        it('should return undefined when horroy is empty or no results satisfy the condition', function () {

            var horr = new Horroy

            var res = horr.find(function (value) {
                if (value > 2) return true
            })

            expect(res).toBe(undefined)
        })

        it('should fail when more than 1 paramater is passed as an argument', function () {

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.find(function (value) {
                    if (value > 2) return true
                }, 'potato')
            } catch (err) {
                error = err
            }

            expect(error.toString()).toBe('Error: too many arguments')
        })
    })

    describe('indexOF', function () {

        it('should return the index of the first element found', function () {

            var horr = new Horroy(0, 1, 2, 3, 'potato', 5)

            var res = horr.indexOf('potato')

            expect(res).toEqual(4)
        })

        it('should return the index of the correct element', function () {

            var horr = new Horroy(0, 1, 2, 3, 'potato', 5)

            var res = horr.indexOf('potato')

            expect(horr[4]).toEqual('potato')
        })

        it('should return "-1" when the parameter is not found', function () {

            var horr = new Horroy(0, 1, 2, 3, 'potato', 5)

            var res = horr.indexOf('house')

            expect(res).toEqual(-1)
        })
    })

    describe('join', function () {

        it('should join all the elements with the separator choosen', function () {

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.join('--')

            expect(res).toBe('0--1--2--3--4--5')
        })

        it('should join all the elements with "," when no separator choosen', function () {

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.join()

            expect(res).toBe('0,1,2,3,4,5')
        })

        it('should fail when more than one parmeter is passed', function () {

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3, 4)

                var res = horr.join('potato', 3)
            } catch (err) {
                error = err
            }

            expect(error.toString()).toBe('Error: too many arguments')
        })
    })

    describe('reverse', function () {

        it('should return the horroy reversed', function () {

            var horr = new Horroy(0, 1, 2, 3, 4)

            var res = horr.reverse()

            expect(res).toEqual(jasmine.objectContaining({ 0: 4, 1: 3, 2: 2, 3: 1, 4: 0 }))
        })

        it('should fail when paramaters are introduced', function () {

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3)

                var res = horr.reverse(3)
            } catch (err) {
                error = err
            }

            expect(error.toString()).toEqual('TypeError: There should be no parameters')
        })
    })

    describe('slice', function () {

        it('should return a portion of the horroy in a new horroy', function () {

            var horr = new Horroy(0, 1, 2, 3, 4, 5, 6, 7, 8)

            var res = horr.slice(2, 5)

            expect(res).toEqual(jasmine.objectContaining({ 0: 2, 1: 3, 2: 4 }))
        })

        it('should not modify the horroy', function () {

            var horr = new Horroy(0, 1, 2, 3, 4)

            var res = horr.slice(2, 5)

            expect(horr).toEqual(jasmine.objectContaining({ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 }))
        })
        it('should fail when the start index is not a number', function () {

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3, 4)

                var res = horr.slice('potato', 4)
            } catch (err) {
                error = err
            }

            expect(error.toString()).toEqual('TypeError: potato and 4 should be a number')
        })
    })

    describe('some', function(){

        it('should return true if satisfies the condition', function(){

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.some(function(value){
                return value > 2
            })

            expect(res).toEqual(true)
        })

        it('should return false if does not satisfy the condition', function(){

            var horr = new Horroy(0, 1, 2, 3)

            var res = horr.some(function(value){
                return value > 4
            })

            expect(res).toEqual(false)
        })

        it('should fail when callback is not a function', function(){

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3, 4)

                var res = horr.some('potato')
            } catch (err) {
                error = err
            }

            expect(error.toString()).toEqual('TypeError: potato should be a function')
        })
    })

    describe('splice', function(){

        it('should work when we introduce all the parameters & there are more elements to delete than to add', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5, 6, 7)

            var res = horr.splice(2, 4, 'house', 'potato')

            expect(res).toEqual(jasmine.objectContaining({ 0: 2, 1: 3, 2: 4, 3: 5 }))
        })

        it('should work when we introduce all the parameters', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5, 6, 7)
            console.log(horr)

            var res = horr.splice(2, 2, 'house', 'potato')
            console.log(res)
            console.log(horr)


            expect(res).toEqual(jasmine.objectContaining({ 0: 2, 1: 3}))
        })

        it('should work when we do not introduce any element to add nor deletecount', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.splice(2)

            expect(res).toEqual(jasmine.objectContaining({ 0: 2, 1: 3, 2: 4, 3: 5}))
        })

        it('should work when we do not introduce any element but start and deletcount', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.splice(2, 3)

            expect(res).toEqual(jasmine.objectContaining({ 0: 2, 1: 3, 2: 4}))
        })

        it('should return empty horroy if no start nor deletcount introduced', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5)

            var res = horr.splice("home", "casa")

            expect(res).toEqual(jasmine.objectContaining({ }))
        })
    })

    describe ('fill', function(){

        it ('should work when we introduce all the parameters', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5, 6)

            var res = horr.fill(15, 2, 5)

            expect(horr).toEqual(jasmine.objectContaining({ 0: 0, 1: 1, 2: 15, 3: 15, 4: 15, 5: 5, 6: 6}))
        })

        it ('should work when we introduce just one parameter', function(){

            var horr = new Horroy(0, 1, 2, 3, 4, 5, 6)

            var res = horr.fill(15)

            expect(horr).toEqual(jasmine.objectContaining({ 0: 15, 1: 15, 2: 15, 3: 15, 4: 15, 5: 15, 6: 15}))
        })

        it ('should fail when more than 3 paramaters introduced', function(){

            var error;

            try {
                var horr = new Horroy(0, 1, 2, 3, 4, 5, 6)

                var res = horr.fill(15, 2, 5, 5)
            } catch (err) {
                error = err
            }

            expect(error.toString()).toBe('Error: too many arguments')
        })
    })
})