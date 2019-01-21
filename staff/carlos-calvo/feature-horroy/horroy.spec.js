describe("Horroy -load", function() {

    it("should load the horroy", function() {
        var hor = new Horroy(1,2,3)
        var lo = 3
        expect(hor.length).toEqual(lo);
    });

    it("lenght correct case n", function() {
        var hor = new Horroy(1,2,3)
        var len = 3
        expect(hor.length).toEqual(len);
    });

    it("lenght correct case 0", function() {
        var hor = new Horroy
        expect(hor.length).toEqual(0);
    });
});


describe("Horroy-push", function() {
    
    beforeEach(function(){
        this.hor = new Horroy(1,2,3)
    })
    
    it("correct inserts a value", function() {
        var len = 5
        this.hor.push(len)
        expect(this.hor.length).toEqual(4);
        expect(this.hor[3] === 5).toEqual(true)
    });

    it("correct inserts a primitive value", function() {
        var obj = false
        this.hor.push(obj)
        expect(this.hor.length).toEqual(4);
        expect(this.hor[3] === false).toBeTruthy()
    });


    it("correct inserts a list of elements", function() {
        var len = false
        this.hor.push(false, true, 'a')
        expect(this.hor.length).toEqual(6);
    });
});

describe("Horroy-isHorroy", function() {
    
    it("returns true if instance oh Horroy", function() {
        var hor = new Horroy(1,2,3)
        expect(hor.isHorroy()).toEqual(true)
    });

    
    it("returns Error if too many args", function() {
        var hor = new Horroy(1,2,3)
        expect(function (){hor.isHorroy(1,2,3)}).toThrow(new Error('too many arguments'))
    });
});


describe("Horroy - Concat", function() {
    beforeEach(function(){
        this.hor = new Horroy(1,2,3)
        var x = false;
    })
    
    it("returns true if correctly concat", function() {
        this.hor2 = new Horroy(4,5,6)
        this.hor3 = this.hor.concat(this.hor2)
        expect(JSON.stringify(this.hor3)).toEqual(JSON.stringify(new Horroy(1,2,3,4,5,6)))
    });

});



describe("Horroy - Every", function() {

    it("returns true as every item match condition provided in function", function() {
        var hor = new Horroy(4,5,6)
        var result
        result = hor.every(function(item){
            return item > 0
        })
        var expected = true
        expect(result).toEqual(expected)
    });

    it("Throws Error when parameter not a function", function() {
        var hor = new Horroy(4,-5,6)
        var result = true
        debugger
        expect(function(){hor.every(result)}).toThrow();
    });
    
    it("returns false as a item in the array do not match condition", function() {
        var hor = new Horroy(4,-5,6)
        var result
        result = hor.every(function(item){
            return item > 0
        })
        var expected = false
        expect(result).toEqual(expected)
    });
});


describe("Horroy - Fill", function() {

    it("returns result expected when filling", function() {
        var hor = new Horroy(1,2,3,4)
        hor.fill(0, 2, 4)
        var expectedresult = new Horroy(1,2,0,0)
        expect(JSON.stringify(hor) == JSON.stringify(expectedresult)).toEqual(true)
    });

    it("returns result expected when filling with 2 parameters", function() {
        var hor = new Horroy(1,2,3,4)
        hor.fill(5,1)
        var expectedresult = new Horroy(1, 5, 5, 5)
        expect(JSON.stringify(hor) == JSON.stringify(expectedresult)).toEqual(true)
    });

    it("returns result expected when filling with 1 parameters", function() {
        var hor = new Horroy(1,2,3,4)
        hor.fill(5)
        var expectedresult = new Horroy(5, 5, 5, 5)
        expect(JSON.stringify(hor) == JSON.stringify(expectedresult)).toEqual(true)
    });

    it("returns error when parameter not a number", function() {
        var hor = new Horroy(1,2,3,4)
        expect(function(){hor.fill(true,true,false)}).toThrow()
    });
});


describe("Horroy - toString", function() {

    it("returns result expected", function() {
        var hor = new Horroy(1,2,3,4)
        expectedresult = '1,2,3,4'
        expect(hor.toString()).toEqual(expectedresult)
    });

});

describe("Horroy - Shift", function() {

    it("returns result expected", function() {
        var hor = new Horroy(1,2,3,4)
        var expectedresult = 1
        expect(hor.shift()).toEqual(expectedresult)
    });

    it("returns Error if length is zero", function() {
        var hor = new Horroy()

        expect(function(){hor.shift()}).toThrow()
    });

});


it("Case no arrays inside", function() {
    describe("Horroy - Flat", function() {
        var hor = new Horroy(1,2,3,4)
        var expectedresult = [1,2,3,4]
        expect(hor.flat().toString()).toEqual(expectedresult.toString())
    });
});

describe("Horroy - For Each", function() {
    it("Case no arrays inside", function() {
        var hor = new Horroy(1,2,3,4)
        expect(hor.forEach(function(item){
            console.log(item)
        })).toBe(undefined)
    });
    it("Case too much parameters", function() {
        var hor = new Horroy(1,2,3,4)
        expect(function(){
            hor.forEach(function(item){
            console.log(item)
        }, false)}).toThrow()
    });

    it("Case too much parameters", function() {
        var hor = new Horroy(1,2,3,4)
        expect(function(){
            hor.forEach(false)}).toThrow()
    });
});



describe("Horroy - includes", function() {
    it("Case Found", function() {
        var hor = new Horroy(1,2,3,4)
        expect(hor.forEach(function(item){
            console.log(item)
        })).toBe(undefined)
    });

