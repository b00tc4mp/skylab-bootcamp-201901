import userApi from '.';

describe('user api', () => {
    describe('register', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const username = `manuelbarzi-${Math.random()}`;
        const password = '123';

        it('should succeed on correct data', () =>
            userApi
                .register(name, surname, username, password)
                .then(id => expect(id).toBeDefined()));

        it('should fail on already existing user', () =>
            userApi
                .register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here');
                })
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`user with username \"${username}\" already exists`);
                }));
        it('should fail when name is empty', () => {
            try {
                return userApi.register('', surname, username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('name is empty');
            }
        });

        it('should fail when surname is empty', () => {
            try {
                return userApi.register(name, '', username, password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('surname is empty');
            }
        });

        it('should fail when username is empty', () => {
            try {
                return userApi.register(name, surname, '', password);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('username is empty');
            }
        });

        it('should fail when username is empty', () => {
            try {
                return userApi.register(name, surname, username, '');
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('password is empty');
            }
        });
    });

    describe('authenticate', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const username = `manuelbarzi-${Math.random()}`;
        const password = '123';

        let _id;

        beforeAll(() => userApi.register(name, surname, username, password).then(id => (_id = id)));

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password).then(({ id, token }) => {
                expect(id).toBe(_id);
                expect(token).toBeDefined();
            }));

        it('should fail when username is incorrect', () => {
            const newUsername = 'xxx';
            return userApi
                .authenticate(newUsername, password)
                .then(() => {
                    throw Error('should not have passed by here');
                })
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(
                        `user with username \"${newUsername}\" does not exist`
                    );
                });
        });

        it('should fail when password is incorrect', () => {
            const newPassword = 'xxx';
            return userApi
                .authenticate(username, newPassword)
                .then(() => {
                    throw Error('should not have passed by here');
                })
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`username and/or password wrong`);
                });
        });
    });

    describe('retrieve', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const username = `manuelbarzi-${Math.random()}`;
        const password = '123';

        let _id, _token;

        beforeAll(() =>
            userApi
                .register(name, surname, username, password)
                .then(id => (_id = id))
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => (_token = token))
        );

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token).then(user => {
                expect(user.id).toBe(_id);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.username).toBe(username);
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
    });

    describe('update', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const username = `manuelbarzi-${Math.random()}`;
        const password = '123';

        let _id, _token;

        beforeAll(() =>
            userApi
                .register(name, surname, username, password)
                .then(id => (_id = id))
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => (_token = token))
        );

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 };

            return userApi
                .update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id);
                    expect(user.name).toBe(data.name);
                    expect(user.surname).toBe(data.surname);
                    expect(user.age).toBe(data.age);
                    expect(user.username).toBe(username);
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

        it('should fail when data is not an object', () => {
            const data = 'object?';

            expect(() => userApi.update(_id, _token, data)).toThrowError(
                `${data} is not an object`
            );
        });
    });

    describe('remove', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const username = `manuelbarzi-${Math.random()}`;
        const password = '123';

        let _id, _token;

        beforeAll(() =>
            userApi
                .register(name, surname, username, password)
                .then(id => (_id = id))
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => (_token = token))
        );

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

            const name = 'ManuelFail';
            const surname = 'BarziFail';
            const username = `manuelbarziFail-${Math.random()}`;
            const password = '123Fail';

            return userApi
                .register(name, surname, username , password)
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
