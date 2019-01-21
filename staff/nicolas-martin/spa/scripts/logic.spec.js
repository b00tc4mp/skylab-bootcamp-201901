describe('logic', function() {
    describe('login', function() {
        it('should thrown an error when user is not found', function() {
            var error;

            try {
                login('ascasdcacsd@gmail.com', '123456', function(){});
            } catch (err) {
                error = err;            
            }
        
            expect(error).toBeDefined();
            expect(error.message).toBe('user ' + inventedEmail + 'not found');
        });
    });
});