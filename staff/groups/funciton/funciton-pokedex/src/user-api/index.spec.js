

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        const email = 'Manuel@mail.com'
        const username = `marcuricarlos-${Math.random()}`
        const password = '123'
        const passwordConf = '123'

        it('should succeed on correct data', () =>
            userApi.register(email, username, password, passwordConf)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(email, username, password, passwordConf)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )

        it('should fail on not matching password confirmation', () => {
            try {
                userApi.register(email, username, password, 'blablabla')
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail on empty username', () => {
            try {
                userApi.register(email, '', password, passwordConf)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail on empty mail', () => {
            try {
                userApi.register('', username, password, passwordConf)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })



    })         // TODO more unit test cases
})

describe('authenticate', () => {
    it('should succeed on correct data', () => {
        const email = 'Manuel@mail.com'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConf = '123'
        let _id
        return userApi.register(email, username, password, passwordConf)
            .then(id => {
                _id = id
                return userApi.authenticate(username, password)
                    .then(({ id, token }) => {
                        expect(id).toBe(_id)
                        expect(token).toBeDefined()
                    })
            })
    })

    it('should fail auth on incorrect password', () => {
        let email = 'Manuel@mail.com'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConf = '123'
        let _id
        return userApi.register(email, username, password, passwordConf)
            .then(id => {
                _id = id
                return userApi.authenticate(username, '1234567')
                    .then(({ id, token }) => {
                        expect(id).toBe(_id)
                        expect(token).toBeDefined()
                    })
            })
            .catch(error => {
                expect(error).toBeDefined()
            })

    })
})



describe('retrieve', () => {
    const email = 'Manuel@mail.com'
    const password = '123'
    const passwordConfirmation = '123'
    let _id, _token, username

    beforeAll(() => {
        username = `marcuricarlos-${Math.random()}`

        return userApi.register(email, username, password, passwordConfirmation)
            .then(id => _id = id)
            .then(() => userApi.authenticate(username, password))
            .then(({ token }) => _token = token)
    });

    it('should succeed on correct data', () =>
        userApi.retrieve(_id, _token).then(user => {
            expect(user.id).toBe(_id);
            expect(user.username).toBe(username);
            expect(user.email).toBe(email)

        }));

    it('should fail on incorrect ID', () => {
        const _idRetrieve = 'xxxx';
        return userApi
            .retrieve(_idRetrieve, _token)
            .then(() => {
                throw Error('should not have passed by here');
            })
            .catch(error => {
                expect(error).toBeDefined();
                expect(error.message).toBe(
                    `token id \"${_id}\" does not match user \"${_idRetrieve}\"`
                );
            });
    });

    it('should fail on incorrect ID', () => {
        const _tokenRetrieve = 'xxxx';
        return userApi
            .retrieve(_id, _tokenRetrieve)
            .then(() => {
                throw Error('should not have passed by here');
            })
            .catch(error => {
                expect(error).toBeDefined();
                expect(error.message).toBe(`invalid token`);
            });
    });

    it('should succeed when ID is not a string', () => {
        const _idRetrieve = 12345;
        try {
            userApi.retrieve(_idRetrieve, _token);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe(`${_idRetrieve} is not a string`);
        }
    });

    it('should succeed when ID is empty', () => {
        const _idRetrieve = '';
        try {
            userApi.retrieve(_idRetrieve, _token);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('id is empty');
        }
    });

    it('should succeed when token is not a string', () => {
        const _tokenRetrieve = 12345;
        try {
            userApi.retrieve(_id, _tokenRetrieve);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe(`${_tokenRetrieve} is not a string`);
        }
    });

    it('should succeed when token is empty', () => {
        const _tokenRetrieve = '';
        try {
            userApi.retrieve(_id, _tokenRetrieve);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('token is empty');
        }
    });

    describe('update', () => {
        const email = 'Manuel@mail.com'
        const password = '123'
        const passwordConfirmation = '123'
        let _id, _token, username

        beforeAll(() => {
            username = `marcuricarlos-${Math.random()}`

            return userApi.register(email, username, password, passwordConfirmation)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        });

        it('should succeed on correct data', () => {
            const data = { username: 'Pepito', age: 32 };

            return userApi
                .update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id);
                    //expect(user.username).toBe(data.name);
                    expect(user.age).toBe(data.age);
                });
        });

        it('should fail when ID is not a string', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 };
            let _idUpdate = 12;
            try {
                userApi.update(_idUpdate, _token, data);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe(`${_idUpdate} is not a string`);
            }
        });

        it('should fail when ID is empty', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 };
            let _idUpdate = '';
            try {
                userApi.update(_idUpdate, _token, data);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('id is empty');
            }
        });

        it('should fail when token is not a string', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 };
            let _tokenUpdate = 12;
            try {
                userApi.update(_id, _tokenUpdate, data);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe(`${_tokenUpdate} is not a string`);
            }
        });

        it('should fail when token is empty', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 };
            let _tokenUpdate = '';
            try {
                userApi.update(_id, _tokenUpdate, data);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('token is empty');
            }
        });
    });


    describe('update KO token', () => {
        const email = 'Manuel@mail.com'
        const password = '123'
        const passwordConfirmation = '123'
        let _id, username

        beforeAll(() => {
            username = `marcuricarlos-${Math.random()}`

            return userApi.register(email, username, password, passwordConfirmation)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        });

        it('should fail in incorrect token', () => {
            let _tokenUpdate = 'KO';
            return userApi.update(_id, _tokenUpdate)
                .then(() => {
                })

                .catch(error => expect(error).toBeDefined())

        });
    });


    describe('remove', () => {
        const email = 'Manuel@mail.com'
        const password = '123'
        const passwordConfirmation = '123'
        let _id, _token, username

        beforeAll(() => {
            username = `marcuricarlos-${Math.random()}`

            return userApi.register(email, username, password, passwordConfirmation)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        });

        it('should succeed on correct data', () => {
            return userApi
                .remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here');
                })
                .catch(({ message }) =>
                    expect(message).toBe(`user with id \"${_id}\" does not exist`)
                );
        });

        it('should fail if user not exist', () => {
            const badUser = `lolailo-${Math.random()}`;
            return userApi
                .remove(_id, _token, badUser, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here');
                })
                .catch(({ message }) =>
                    expect(message).toBe(`user with id \"${_id}\" does not exist`)
                );
        });

        it('should fail with incorrect username/password', () => {

            const email = 'Manuel@mail.com'
            const username = `manuelbarziFail-${Math.random()}`;
            const password = '123Fail';
            const passwordConfirmation = '123Fail'

            return userApi
                .register(email, username, password, passwordConfirmation)
                .then(() => userApi.authenticate(username, password))
                .then(({ id, token }) => {
                    return userApi
                        .remove(id, token, username + 'xxx', password)
                        .then(() => userApi.retrieve(id, token))
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(`username and/or password wrong`)
                        );
                });
        });

        it('should fail when ID is not a string', () => {
            let _idUpdate = 12;
            try {
                userApi.remove(_idUpdate, _token, username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe(`${_idUpdate} is not a string`);
            }
        });

        it('should fail when ID is empty', () => {
            let _idUpdate = '';
            try {
                userApi.remove(_idUpdate, _token, username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('id is empty');
            }
        });

        it('should fail when token is not a string', () => {
            let _tokenUpdate = 12;
            try {
                userApi.remove(_id, _tokenUpdate, username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe(`${_tokenUpdate} is not a string`);
            }
        });

        it('should fail when token is empty', () => {
            let _tokenUpdate = '';
            try {
                userApi.remove(_id, _tokenUpdate, username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('token is empty');
            }
        });
    });

});




