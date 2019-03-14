// TODO do it nice!

suite('HORROY', function () {
    describe('Create an Horroy', function () {
        it('should create an empty Horroy', function () {
            var h = new Horroy();

            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
        it('should create a Horroy with items', function () {
            var h = new Horroy(1, 2, 3);

            expect(h[2] === 3, 'Horror is not filled')
            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
        it('should create an empty Horroy with length', function () {
            var h = new Horroy(5);

            expect(h.length === 5, 'Horror is not filled')
            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
    });
    describe('Error test', function(){
        it('should show an error with invalid length', function () {
            var error;

            try {
                var h = new Horroy(2.1);
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof RangeError, 'error should be TypeError')
        });
    });
});

suite('fill', function () {
    describe('Fills the horror wit values', function () {
        it('should create a new horror with values in positio start and end', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6, 7, 8);

            h.fill('hola', 2, 5)

            var expected = { 0: 1, 1: 2, 2: "hola", 3: "hola", 4: "hola", 5: 6, 6: 7, 7: 8, length: 8 }

            expect(JSON.stringify(h) === JSON.stringify(expected), 'Unexpected value');

        });
        it('should create a new horror with values in positio start and end', function () {
            var h = new Horroy(1, 2, 3, 4, 5);

            h.fill('hola', 2)

            var expected = { 0: 1, 1: 2, 2: "hola", 3: "hola", 4: "hola", length: 5 }

            expect(JSON.stringify(h) === JSON.stringify(expected), 'Unexpected value');

        });
        it('should create a new horror with values withous start nor end', function () {
            var h = new Horroy(1, 2, 3, 4, 5);

            h.fill('hola')

            var expected = { 0: "hola", 1: "hola", 2: "hola", 3: "hola", 4: "hola", length: 5 }

            expect(JSON.stringify(h) === JSON.stringify(expected), 'Unexpected value');

        });
    });
});

suite('filter', function () {
    describe('filter a new horroy without modifing the input one', function () {
        it('should create a new horror that satisfies the callbacks', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.filter(function (el) {
                return el > 3
            });

            var h2 = new Horroy(1, 2, 3, 4, 5, 6);

            expect(res.toString() === res.toString(), 'Unexpected value');
            expect(h.toString() === h2.toString(), 'Horroy should not change');

        });
        it('should returns empty horror when function does not find', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.filter(function (el) {
                return el > 7
            });

            expect(res.toString() === res.toString(), 'Unexpected value');
            expect(h.toString() === h.toString(), 'Horroy should not change');

        });
    });

    describe('Error test', function () {
        it('should fail when callback is not a Function', function () {
            var error;
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            try {
                h.filter({});
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')
        });
    });
});


suite('For Each', function () {
    describe('For each in a Horroy', function () {
        it('should sum each component of the Horroy', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);
            var sum = 0;
            h.forEach(function (el) {
                sum += el
            });

            expect(sum === 21, 'Unexpected value');

        });
    });

    describe('Error test', function () {
        it('should fail when callback is not a Function', function () {
            var error;
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            try {
                h.filter({});
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')
        });
    });
});


suite('Index Of', function () {
    describe('Index-Of from a Horroy', function () {
        it('should find a value of the Horror', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.indexOf(4)

            expect(res === 3, 'Unexpected value');

        });
        it('should find a value of the Horror starting from different than 0', function () {
            var h = new Horroy(1, 'hola', 3, 4, 5, 'hola');

            var res = h.indexOf('hola', 2)

            expect(res === 5, 'Unexpected value');

        });
        it('should shown -1, when value is not found', function () {
            var h = new Horroy(1, 'hola', 3, 4, 5, 'hola');

            var res = h.indexOf('adeu', 2)

            expect(res === -1, 'Unexpected value');

        });
    });
});


suite('Join', function () {
    describe('join the elements from a Horroy', function () {
        it('should join the horroy elements separated with coma, when not specifying', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.join()

            expect(res === '1,2,3,4', 'Unexpected value');

        });
        it('should join with specified separator', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.join('/')

            expect(res === '1/2/3/4', 'Unexpected value');

        });
        it('should shown -1, when value is not found', function () {
            var h = new Horroy(1, 'hola', 3, 4, 5, 'hola');

            var res = h.indexOf('adeu', 2)

            expect(res === -1, 'Unexpected value');

        });
    });
});

suite('Map', function () {
    describe('mapping each elements from a Horroy', function () {
        it('should add 10 to each horroy elements separated with coma, when not specifying', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.map(function (v) { return v + 10; });

            var expected = new Horroy(11, 12, 13, 14)

            expect(res.toString() === expected.toString(), 'Unexpected value');

        });
    });

    describe('Error test', function () {
        it('should fail when callback is not a Function', function () {
            var error;
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            try {
                h.map({});
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')
        });
    });
});

suite('pop', function () {
    describe('Pop of a Horroy', function () {
        it('should delate the last element and return that element. Reducing the length!!', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.pop();

            var expected = new Horroy(1, 2, 3)

            expect(h.toString() === expected.toString(), 'Horroy should change');
            expect(res === 4, 'Unexpected value');
            expect(h.length === 3, 'Unexpected length')

        });
    });
});

suite('push', function () {
    describe('Push of a Horroy', function () {
        it('should add one element and return length', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.push(5);

            var expected = new Horroy(1, 2, 3, 4, 5)

            expect(h.toString() === expected.toString(), 'Horroy should change');
            expect(res === 5, 'Unexpected value');
            expect(h.length === 5, 'Unexpected length')

        });
        it('should add more than one element and return length', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.push(5, 6, 7);

            var expected = new Horroy(1, 2, 3, 4, 5, 6, 7)

            expect(h.toString() === expected.toString(), 'Horroy should change');
            expect(res === 7, 'Unexpected value');
            expect(h.length === 7, 'Unexpected length')

        });
    });
});

suite('reduce', function () {
    describe('Reduce a Horroy with different accumlators', function () {
        it('should reduce defining accumulator', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.reduce(function (accumulator, number) {
                return accumulator + number;
            }, 0)
                ;

            var expected = new Horroy(1, 2, 3, 4)

            expect(h.toString() === expected.toString(), 'Horroy should not change');
            expect(res === 10, 'Unexpected value');

        });
        it('should reduce without using accumulator', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.reduce(function (accumulator, number) {
                return accumulator + number;
            })

            var expected = new Horroy(1, 2, 3, 4)

            expect(h.toString() === expected.toString(), 'Horroy should not change');
            expect(res === 10, 'Unexpected value');

        });
    });

    describe('Error test', function () {
        it('should fail when callback is not a Function', function () {
            var error;
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            try {
                h.reduce({});
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')
        });
    });
});

suite('Reverse', function () {
    describe('reverse all the elements from a Horroy', function () {
        it('should reverse for 4 Horroy items', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.reverse()
            var expected = new Horroy(1, 2, 3, 4)

            expect(res.toString() === '4,3,2,1', 'Unexpected value');

        });
        it('should reverse for 5 Horroy items', function () {
            var h = new Horroy(1, 2, 3, 4, 5);

            var res = h.reverse()
            var expected = new Horroy(1, 2, 3, 4, 5)

            expect(res.toString() === '5,4,3,2,1', 'Unexpected value');

        });
    });
});

suite('Shift', function () {
    describe('delate the first elements from a Horroy', function () {
        it('should delate the first element and return it', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.shift()
            var expected = new Horroy(2, 3, 4)

            expect(h.toString() === expected.toString(), 'Horroy should not change');
            expect(res === 1, 'Unexpected value');

        });
    });
});

suite('Slice', function () {
    describe('delate the first elements from a Horroy', function () {
        it('should cut the horroy defining start and end', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.slice(1, 4)
            var expectedh = new Horroy(1, 2, 3, 4, 5, 6);
            var expectedres = new Horroy(2, 3, 4)

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });

        it('should cut the horroy defining only start', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.slice(4)
            var expectedh = new Horroy(1, 2, 3, 4, 5, 6);
            var expectedres = new Horroy(5, 6)

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });

        it('should cut the horroy without defining start nor edn', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.slice()
            var expectedh = new Horroy(1, 2, 3, 4, 5, 6);
            var expectedres = new Horroy(1, 2, 3, 4, 5, 6)

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });

        it('should return empty Horroy when end is higher than start', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.slice(5, 2)
            var expectedh = new Horroy(1, 2, 3, 4, 5, 6);
            var expectedres = new Horroy()

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });
    });
});

suite('some', function () {
    describe('Find if there is some element that satisfies the callback', function () {
        it('should show true', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.some(function (number) {
                return number > 2;
            });


            var expected = new Horroy(1, 2, 3, 4)

            expect(h.toString() === expected.toString(), 'Horroy should not change');
            expect(res === true, 'Unexpected value');

        });

        it('should show false', function () {
            var h = new Horroy(1, 2, 3, 4);

            var res = h.some(function (number) {
                return number > 5;
            });


            var expected = new Horroy(1, 2, 3, 4)

            expect(h.toString() === expected.toString(), 'Horroy should not change');
            expect(res === false, 'Unexpected value');

        });
    });

    describe('Error test', function () {
        it('should fail when callback is not a Function', function () {
            var error;
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            try {
                h.some({});
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')
        });
    });
});

suite('Unshift', function () {
    describe('add elements in the beggining of a Horroy', function () {
        it('should add one item', function () {
            var h = new Horroy(1, 2, 3);

            var res = h.unshift('Començem')
            var expectedh = new Horroy('Començem', 1, 2, 3);
            var expectedres = 4

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });

        it('should add more than one item', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.unshift('Començem', 'a', 'contar', true, {})
            var expectedh = new Horroy('Començem', 'a', 'contar', true, {}, 1, 2, 3, 4, 5, 6);
            var expectedres = 11

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res.toString() === expectedres.toString(), 'Unexpected value');

        });
    });
});

suite('splice', function () {
    describe('Slice the Horroy without items', function () {
        it('should cut the Horroy from start to end', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.splice(1, 3)


            var expectedh = new Horroy(1, 5, 6)
            var expectedres = new Horroy(2, 3, 4)

            expect(res.toString() === expectedres.toString(), 'Unexpected value');
            expect(h.toString() === expectedh.toString(), 'Horroy should not change');

        });

        it('should cut the Horroy without end', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.splice(2)


            var expectedh = new Horroy(1,2)
            var expectedres = new Horroy(3, 4, 5, 6)

            expect(res.toString() === expectedres.toString(), 'Unexpected value');
            expect(h.toString() === expectedh.toString(), 'Horroy should not change');

        });

        it('should return empty Horroy when start and end are undefined', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.splice()


            var expectedres = new Horroy()
            var expectedh = new Horroy(1, 2, 3, 4, 5, 6)

            expect(res.toString() === expectedres.toString(), 'Unexpected value');
            expect(h.toString() === expectedh.toString(), 'Horroy should not change');

        });
    });

    describe('Splice Horroy with items', function () {
        it('should cut the Horroy from start to end and add the items (less items than delated)', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.splice(1, 3, 'FUNCIONA1', 'FUNCIONA2')


            var expectedh = new Horroy(1, 'FUNCIONA1', 'FUNCIONA2', 5, 6)
            var expectedres = new Horroy(2, 3, 4)

            expect(res.toString() === expectedres.toString(), 'Unexpected value');
            expect(h.toString() === expectedh.toString(), 'Horroy should not change');

        });

        it('should cut the Horroy from start to end and add the items (more items than delated)', function () {
            var h = new Horroy(1, 2, 3, 4, 5, 6);

            var res = h.splice(1, 2, 'FUNCIONA1', 'FUNCIONA2')


            var expectedh = new Horroy(1, 'FUNCIONA1', 'FUNCIONA2', 4, 5, 6)
            var expectedres = new Horroy(2,3)

            expect(res.toString() === expectedres.toString(), 'Unexpected value');
            expect(h.toString() === expectedh.toString(), 'Horroy should not change');

        });
    });
});

suite('Find', function () {
    describe('Find the element', function () {
        it('should show the element taht satisfies the callback', function () {
            var h = new Horroy(1, 2, 3);

            var res = h.find(function(el){
                return el>2});
            
            var expectedh = new Horroy(1, 2, 3);
            var expectedres = 3

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res=== expectedres, 'Unexpected value');

        });

        it('should return undefined when the value is not found', function () {
            var h = new Horroy(1, 2, 3);

            var res = h.find(function(el){
                return el>3});
            
            var expectedh = new Horroy(1, 2, 3);
            var expectedres = undefined

            expect(h.toString() === expectedh.toString(), 'Horroy should not change');
            expect(res=== expectedres, 'Unexpected value');

        });
    });
});

suite('From', function () {
    describe('Creates a Horroy when enters a value', function () {
        it('should creates a horroy when enters a string', function () {
            var h = Horroy.from('Daniel');
            
            var expected = new Horroy('D','a','n','i','e','l');

            expect(h.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(h instanceof Horroy, 'Horroy is not a Horroy');

        });

        it('should creates a horroy when enters an array', function () {
            var h = Horroy.from([1,2,3]);
            
            var expected = new Horroy(1,2,3);

            expect(h.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(h instanceof Horroy, 'Horroy is not a Horroy');

        });

        it('should creates a horroy when enters a horroy', function () {
            var h0= new Horroy(1,2,3)
            var h = Horroy.from(h0);
            
            var expected = new Horroy(1,2,3);

            expect(h.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(h instanceof Horroy, 'Horroy is not a Horroy');

        });

        it('should creates an empty horroy when enters not iterable value', function () {
            var hnum = Horroy.from(123);
            var hbool = Horroy.from(true);
            var hobj = Horroy.from({});
            var hfunc = Horroy.from(function(){});
            
            var expected = new Horroy();

            expect(hnum.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(hbool.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(hobj.toString() === expected.toString(), 'Horroy is not created as expected');
            expect(hfunc.toString() === expected.toString(), 'Horroy is not created as expected');

            expect(hnum instanceof Horroy, 'Horroy is not a Horroy');
            expect(hbool instanceof Horroy, 'Horroy is not a Horroy');
            expect(hobj instanceof Horroy, 'Horroy is not a Horroy');
            expect(hfunc instanceof Horroy, 'Horroy is not a Horroy');


        });
    });

    describe('Throw Error', function () {
        it('should throw typeError when value is undefined', function () {
            var error;
            

            try {
                Horroy.from(undefined);
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')

        });

        it('should throw typeError when value is null', function () {
            var error;
            

            try {
                Horroy.from(null);
            } catch (err) {
                error = err;
            }

            expect(error, 'it should throw an Error')
            expect(error instanceof TypeError, 'error should be TypeError')

        });
    });
});

suite('isHorroy', function () {
    describe('Evaluates the function', function () {
        it('should show true when value is Horroy', function () {
            var h = new Horroy(1, 2, 3);

            var expected= Horroy.isHorroy(h)

            expect(expected, 'Unexpected value');

        });

        it('should show true when value is Horroy', function () {
            var h = [1,2,3,4,5];

            var expected= Horroy.isHorroy(h)

            expect(!expected, 'Unexpected value');

        });
    });
});

suite('Of', function () {
    describe('Create an Horroy', function () {
        it('should create an empty Horroy', function () {
            var h = Horroy.of();

            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
        it('should create a Horroy with items', function () {
            var h = Horroy.of(1, 2, 3);

            expect(h[2] === 3, 'Horror is not filled')
            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
        it('should create a Horroy with one item', function () {
            var h = Horroy.of(5);

            expect(h.toString()===[5].toString(), 'Horror is not filled')
            expect(h instanceof Object, 'Horroy is not created')
            expect(h instanceof Horroy, 'Horroy is not Horroy type')

        });
    });
});