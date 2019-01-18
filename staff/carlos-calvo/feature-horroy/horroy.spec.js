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
    })
    
    it("returns true if correctly concat", function() {
        this.hor2 = new Horroy(4,5,6)
        this.hor3 = this.hor.concat(this.hor2)
        expect(JSON.stringify(this.hor3)).toEqual(JSON.stringify(new Horroy(1,2,3,4,5,6)))
    });

    it("Not an array, throw an error", function() {
        expect(function(){
            this.hor3 = this.hor.concat(false)
        }).toThrow(new TypeError('Not an horroy'))
        //expect(function (){hor.isHorroy(1,2,3)}).toThrow(new Error('too many arguments'))
    });

});




