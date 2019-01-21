describe('login', function() {

    describe('Errors when empty filds', function() {
        it('should throw an error when login parameters are not difined', function() {
        
            expect(function(){login()}).toThrow(Error('Fill all the gaps'));
            expect(function(){login('daniel@mail.com')}).toThrow(Error('Fill all the gaps'));
        })        

        it('should throw an error with wrong mail', function() {
           var inventedEmail='invented@mail.com'
        

            expect(function(){
                login(inventedEmail,'123', function(){})
            }).toThrow(Error('user ' + inventedEmail + ' not found'))
           
        })
        it('should throw an error with wrong pasword', function() {
                  
              expect(function(){
                 login('johndoe@mail.com','123', function(){})
             }).toThrow(Error('wrong password'))
            
         })
    });
    
});

describe('register', function(){
    it('should succeed on valid data', function(){
        var resgistered;

        var registeringName='John';
        var registeringSurname='Wayne';
        var registeringEmail='jw@mail.com';
        var registeringPassword='p4ssw0rd';

        register(registeringName, registeringSurname, registeringEmail , registeringPassword,registeringPassword, function(){
            resgistered=true;
        });

        expect(registered).toBeTruthy()

        var registeredUser=user.find(function(user){return user.mail===registeredEmail});

        expect(registeredUser).toBeDefined();
        expect(registeredUser.name).toBe(registeringName);
        expect(registeredUser.surname).toBe(registeringSurame);
        expect(registeredUser.email).toBe(registeringEmail);
        expect(registeredUser.password).toBe(registeringPassword);
    });
});