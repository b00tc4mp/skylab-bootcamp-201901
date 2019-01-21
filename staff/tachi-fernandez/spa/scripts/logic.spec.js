describe('logic', function(){

    describe("login" , function(){

        it("should login with all the parameters well executed" , function(){

            var expected = users.find(function(user) {return user.email === "jhondoe@MediaList.com"; });

            var loggedInUser;

            login(expected.email,expected.password , function(users){
                loggedInUser = user

                expected(loggedInUser).toBeDefined();
                expected(loggedInUser.name).toEqual(expected.name);
                expected(loggedInUser.surname).toEqual(expected.surname);
                expected(loggedInUser.email).toEqual(expected.email);
                expected(loggedInUser.password).toBeUndefined();
                expected(loggedInUser).not.toEqual(expected);

                    
                

            });

        });




        });




});