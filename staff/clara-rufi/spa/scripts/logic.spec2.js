describe('login', function() {


     describe('from', function() {
        
        it('should log in the user', function() {

        result = login.login()



        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));

        });
    });
});
