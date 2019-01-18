suite('horroy', function () {});

suite('from', function () {
    describe('Correct from', function () {
        it('should return correct', function () {
            var s = Horroy.from('hola mundo');

            var res = s.length;

            var expected = 10;

            expect(res.toString() === expected.toString(), 'should return correct');

        });
        it('should return a horroy', function () {
            var s = Horroy.from(new Horroy(1,2,3));

            var res = s;

            expect(s instanceof Horroy, 'should return correct');
        });
    });
    describe('fail on arguments', function () {
        it('should fail on too many arguments', function () {
            var error;
            try {
                Horroy.from('hola mundo',4);
            } catch (err) {
                error = err;
            }

            expect(error, 'should have thrown an error');
        });
        it('should fail on too few arguments', function () {
            var error;
            try {
                Horroy.from();
            } catch (err) {
                error = err;
            }

            expect(error, 'should have thrown an error');
        });
    });
    describe('fail on x instead of horroy', function () {
        it('should fail on undefined instead of horroy', function () {
            var error;

            try {
                Horroy.from(undefined);
            } catch (err) {
                error = err;
            }
            expect(error, 'should throw an error');
        });
        it('should fail on null instead of horroy', function () {
            var error;

            try {
                Horroy.from(null);
            } catch (err) {
                error = err;
            }
            expect(error,'should throw an error');
        });
    });
});

suite('isHorroy', function () {
    describe('Correct isHorroy', function () {
        it('should return correct', function () {
            var h = new Horroy;

            var res = Horroy.isHorroy(h);

            var expected = true;

            expect(res.toString() === expected.toString(), 'should return correct');

        });
        it('should retuun correct with several arguments', function () {
            var h = new Horroy;

            var res = Horroy.isHorroy(h,'hola',true);

            var expected = true;

            expect(res.toString() === expected.toString(), 'should return correct');
        });
        it('should return empty horroy', function () {
            var res = Horroy.isHorroy();

            var expected = false;

            expect(res.toString() === expected.toString(), 'should return correct'); 
        });
    });
});

suite('of', function () {
    describe('Correct of', function () {
        it('should return correct', function () {
            var res = Horroy.of(7);

            var expected = new Horroy(7);
            
            expect(res.toString() === expected.toString(), 'should return the correct answer');
        });
        it('should return correct with several arguments', function () {
            var res = Horroy.of(7,8,9);

            var expected = new Horroy(7,8,9);
            
            expect(res.toString() === expected.toString(), 'should return the correct answer');
        });
        it('should return empty horroy', function () {
            var res = Horroy.of();

            var expected = new Horroy();

            expect(res.toString() === expected.toString(), 'should return the correct value');
        });
        it('should return horroy with undefined', function () {
            var res = Horroy.of(undefined);

            var expected = new Horroy(undefined);

            expect(res.toString() === expected.toString(), 'should return the correct value');
        });
    });
});

suite('concat', function () {
    describe('Correct concat', function () {
        it('should return correct with an argument', function () {
            var a = new Horroy(1,2,3);

            var b = new Horroy(4,5,6);

            var res = a.concat(b);

            var expected = 6;

            expect(res.length === expected, 'should return correct');
        });
        it('should return correct with no argument', function () {
            var a = new Horroy(1,2,3);

            var res = a.concat();

            var expected = 3;

            expect(res.length === expected, 'should return correct');
        });
    });    
    describe('should return correct with else than horroy', function () {
        it('should return correct with object argument', function () {
            var a = new Horroy(1,2,3);

            var res = a.concat({});

            var expected = 4;

            expect(res.length === expected, 'should return correct');
        });
        it('should return correct with boolean argument', function () {
            var a = new Horroy(1,2,3);

            var res = a.concat(true);

            var expected = 4;

            expect(res.length === expected, 'should return correct');
        });
        it('should return correct with number argument', function () {
            var a = new Horroy(1,2,3);

            var res = a.concat(4);

            var expected = 4;

            expect(res.length === expected, 'should return correct');
        });
    });
});

suite('fill', function () {
    describe('Correct fill', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            a.fill(0,0,2);
            var res = a[0];
            var expected = 0;
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        
        });
    describe('fail on arguments', function () {
        it('should fail on too many arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            try {
                a.fill(0,0,2,4);
            } catch (err) {
                error = err
            }
        
            expect(error, 'should return the correct value');
        
        });
        it('should fail on too few arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            try {
                a.fill();
            } catch (err) {
                error = err
            }
        
            expect(error, 'should return the correct value');
        
        });
    }); 
    describe('fail on x instead of horroy', function () {
        it('should fail on object instead of horroy', function () {
            var a = {};
            
            try {
                a.fill(0,0,2);
            } catch (err) {
                error = err
            }
        
            expect(error, 'should return the correct value');
        
        });
        it('should fail on boolean instead of horroy', function () {
            var a = true;
            
            try {
                a.fill(0,0,2);
            } catch (err) {
                error = err
            }
        
            expect(error, 'should return the correct value');
        
        });
        it('should fail on number instead of horroy', function () {
            var a = 4;
            
            try {
                a.fill(0,0,2);
            } catch (err) {
                error = err
            }
        
            expect(error, 'should return the correct value');
        
        });
    });
    });
});

suite('filter', function () {
    describe('Correct filter', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            var res = a.filter(function(x) {
                return x > 3
            });

            var expected = new Horroy(4,5);
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        
        });
    });
    describe('fail on arguments', function () {
        it('should fail on too many arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            try {
                a.filter(3,function(x) {
                    return x > 3
                });
            } catch (err) {
                error = err;
            };
            expect(error, 'should return the correct value');
        });
        it('should fail on too few arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            try {
                a.filter();
            } catch (err) {
                error = err;
            };
            expect(error, 'should return the correct value');
        });
        describe('fail on x instead of horroy', function () {
            it('should fail on object instead of horroy', function () {
                var a = {};
                
                try {
                    a.filter(function(x) {
                        return x > 3
                    });
                } catch (err) {
                    error = err;
                };
                expect(error, 'should return the correct value');
            });
            it('should fail on boolean instead of horroy', function () {
                var a = true; 
                
                try {
                    a.filter(function(x) {
                        return x > 3
                    });
                } catch (err) {
                    error = err;
                };
                expect(error, 'should return the correct value');
            });
            it('should fail on number instead of horroy', function () {
                var a = 4; 
                
                try {
                    a.filter(function(x) {
                        return x > 3
                    });
                } catch (err) {
                    error = err;
                };
                expect(error, 'should return the correct value');
            });
        });
    });
});

suite('find', function () {
    describe('Correct find', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            var res = a.find(function(x) {
                return x > 3
            });

            var expected = 4;
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        });
    });
    describe('should fail on arguments', function () {
        it('should fail on too many arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            try {
                a.find(3,function(x) {
                    return x > 3
                });    
            } catch (err) {
                error = err;
            }
            expect(error, 'should return the correct value');
        });
        it('should fail on too few arguments', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            try {
                a.find();    
            } catch (err) {
                error = err;
            }
            expect(error, 'should return the correct value');
        });
    });
    describe('fail on x instead of horroy', function () {
        it('should fail on object instead of horroy', function () {
            var a = {};
            try {
                a.find(function(x) {
                    return x > 3
                });    
            } catch (err) {
                error = err;
            }
            expect(error, 'should return the correct value');
        });
        it('should fail on boolean instead of horroy', function () {
            var a = true;
            try {
                a.find(function(x) {
                    return x > 3
                });    
            } catch (err) {
                error = err;
            }
            expect(error, 'should return the correct value');
        });
        it('should fail on number instead of horroy', function () {
            var a = 4;
            try {
                a.find(function(x) {
                    return x > 3
                });    
            } catch (err) {
                error = err;
            }
            expect(error, 'should return the correct value');
        });
    });
});

suite('forEach', function () {
    describe('Correct forEach', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); 
            var sum = 0;
            
            a.forEach(function(x) {
                return sum +=x;
            });

            var expected = 6;
        
            expect(sum.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('indexOf', function () {
    describe('Correct indexOf', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            var res = a.indexOf(1);

            var expected = 0;
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('join', function () {
    describe('Correct join', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            var res = a.join('');
            var expected = 12345;
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('map', function () {
    describe('Correct map', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]
            
            var res = a.map(function (x) {
                return x * 2;
            });
            var expected = new Horroy(2,4,6,8,10);
        
            expect(res.toString() == expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('pop', function () {
    describe('Correct pop', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            a.pop();
            var res = a.length;
            var expected = 2;
        
            expect(res.toString() == expected, 'should return the correct value');
        
        });
    });
});

suite('push', function () {
    describe('Correct push', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            a.push(4);

            var res = a.length;
            var expected = 4;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('reduce', function () {
    describe('Correct reduce', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            var res = a.reduce(function (accumulator, product) {
                return accumulator + product;
            }, 0);

            var expected = 6;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('reverse', function () {
    describe('Correct reverse', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            a.reverse();

            var res = a[0];

            var expected = 3;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('shift', function () {
    describe('Correct shift', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            a.shift();

            var res = a[0];

            var expected = 2;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});
//TODO
suite('slice', function () {
    describe('Correct slice', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]

            var res = a.slice(2,3);

            var expected = new Horroy(3);
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('some', function () {
    describe('Correct some', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5); // ~ [1, 2, 3]

            var res = a.some(function(x) {
                return x > 3;
            });
            var expected = true;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('splice', function () {
    describe('Correct splice', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5, 6); // ~ [1, 2, 3]

            var res = a.splice(1,2,'hola');
            var expected = new Horroy(2,3);
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});

suite('unshift', function () {
    describe('Correct unshift', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3, 4, 5, 6); // ~ [1, 2, 3]

            var res = a.unshift(1,2);

            var expected = 7;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    });
});





