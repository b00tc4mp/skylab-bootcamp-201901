'use strict'

// const httpStatus = require('http-status');
import userApi from '.';
const bcrypt = require('bcrypt');
const { mongoose, User } = require('triviapp-data');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

userApi.url = REACT_APP_BASE_URL_API;

describe('User API' , () => {
    
    beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }))

    beforeEach(() => Promise.all([User.deleteMany()]));

    describe('Signup', () => {
		let data = {};

		beforeEach(() => {
			data = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};
		});

		it('should succeed on valid data', async () => {

			const { id } = await userApi.signup(data);

			const user = await User.get(id);

			const match = await bcrypt.compare(data.password, user.password);

			
			expect(typeof id).toBe('string');
			expect(user.name).toBe(data.name);
			expect(user.surname).toBe(data.surname);
			expect(user.email).toBe(data.email);
			expect(match).toBeTruthy();
        });
        
        it('should fail with already registered user', async () => {
			await User.create(data);

			try {
				await userApi.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					`User with email ${data.email} already exists`,
				);
			}
		});

		it('should fail on undefined name', () => {
			data.name = undefined;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric name', () => {
			data.name = 10;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});
		//
		it('should fail on boolean name', () => {
			data.name = true;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(true + ' is not a string'));
		});

		it('should fail on object name', () => {
			data.name = {};
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array name', () => {
			data.name = [];
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty name', () => {
			data.name = '';
			expect(() => {
				userApi.signup(data);
			}).toThrow(Error('name is empty or blank'));
		});

		it('should fail on undefined surname', () => {
			data.surname = undefined;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric surname', () => {
			data.surname = 10;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean surname', () => {
			data.surname = false;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object surname', () => {
			data.surname = {};
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array surname', () => {
			data.surname = [];
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty surname', () => {
			data.surname = '';
			expect(() => {
				userApi.signup(data);
			}).toThrow(Error('surname is empty or blank'));
		});

		it('should fail on undefined email', () => {
			data.email = undefined;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric email', () => {
			data.email = 10;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean email', () => {
			data.email = false;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object email', () => {
			data.email = {};
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array email', () => {
			data.email = [];
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty email', () => {
			data.email = '';
			expect(() => {
				userApi.signup(data);
			}).toThrow(Error('email is empty or blank'));
		});

		it('should fail on undefined password', () => {
			data.password = undefined;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric password', () => {
			data.password = 10;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean password', () => {
			data.password = false;
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object password', () => {
			data.password = {};
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array password', () => {
			data.password = [];
			expect(() => {
				userApi.signup(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty password', () => {
			data.password = '';
			expect(() => {
				userApi.signup(data);
			}).toThrow(Error('password is empty or blank'));
		});

    });


    describe('LogIn', () => {
		let data = {};

		beforeEach(async () => {
			data = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userAdd = new User(data);
			const savedUser = await userAdd.save();
			return savedUser.normalize();
		});

		it('should return a token when email and password matches', async () => {
			const { token, user } = await userApi.login({
				email: data.email,
				password: data.password,
			});

			expect(user).toBeDefined();
			expect(token).toBeDefined();
		});

		it('should report error when email and password are not provided', async () => {
			try {
				await userApi.login({});
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when password is not provided', async () => {
			data.password = undefined;
			try {
				await userApi.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when email is not provided', async () => {
			data.email = undefined;
			try {
				await userApi.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on incorrect password', async () => {
			data.password = 'qwerty';
			try {
				await userApi.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on numeric email', async () => {
            data.email = 10;
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual(10 + ' is not a string');
            }
		});

		it('should fail on boolean email', async () => {
			data.email = false;
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on object email', async () => {
			data.email = {};
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual({} + ' is not a string');
            }
		});

		it('should fail on array email', async () => {
			data.email = [];
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual([] + ' is not a string');
            }
		});

		it('should fail on empty email', async () => {
			data.email = '';
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on numeric password', async () => {
			data.password = 10;
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual(10 + ' is not a string');
            }
		});

		it('should fail on boolean password', async () => {
			data.password = false;
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on object password', async () => {
			data.password = {};
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual({} + ' is not a string');
            }
		});

		it('should fail on array password', async () => {
			data.password = [];
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual([] + ' is not a string');
            }
		});

		it('should fail on empty password', async () => {
			data.password = '';
            try {
				await userApi.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});
    });
    


    describe('retrieve user', () => {
		let data = {};
		let userSaved;
		beforeEach(async () => {
			data = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userAdd = new User(data);
			const user = await userAdd.save();
			userSaved = user;
			return user;
		});

		it('should return a user', async () => {

            const { token } = await userApi.login({
				email: data.email,
				password: data.password,
            });
            

			const user = await userApi.retrieveUser(token, userSaved._id);
			
			expect(user).toBeDefined();
			expect(user.id).toBe(userSaved._id.toString());
			expect(user.name).toBe(userSaved.name);
			expect(user.surname).toBe(userSaved.surname);
			expect(user.email).toBe(userSaved.email);
		});

		it('should fail when userID is not an ObjectId', async () => {
			try {
                const { token } = await userApi.login({
                    email: data.email,
                    password: data.password,
                });

				await userApi.retrieveUser(token, 'xxxxxxxxx');
			} catch (err) {
                expect(err.message).toEqual('Cast to ObjectId failed for value "xxxxxxxxx" at path "_id" for model "User"');
			}
		});
    });
    


    describe('Update user', () => {
		let data = {};
		let userAdd;
		beforeEach(async () => {
			data = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
				image: 'image1',
			};

			const _user = new User(data);
			const user = await _user.save();
			userAdd = user;
			return user;
		});

		it('should succeed on valid data', async () => {
			let data2 = {
				name: 'Enquesta numero 2',
				surname: 'Lorem ipsum dolor is amet....',
				email: 'robert-z@hotmail.es.',
				image: 'image2',
			};
			
			const { token } = await userApi.login({
                email: data.email,
                password: data.password,
            });
			
			const userUpdated = await userApi.updateUser(token, data2);
			
			expect(userUpdated.name).toBe(data2.name);
			expect(userUpdated.surname).toBe(data2.surname);
			expect(userUpdated.email).toBe(data2.email);
			// expect(userUpdated.picture).toBe(data.image);
		});

		it('should return the same User if we pass a empty object', async () => {
			const { token } = await userApi.login({
                email: data.email,
                password: data.password,
            });
			const userUpdated = await userApi.updateUser(token, {});
			expect(userUpdated.name).toBe(data.name);
			expect(userUpdated.surname).toBe(data.surname);
			expect(userUpdated.email).toBe(data.email);
			// expect(userUpdated.picture).toBe(data.image);
		});

		it('should fail if password not match', async () => {
			let data2 = {
				password: 'xxxxxx',
				confirmPassword: 'aaaaaaaaa',
			};

			try {
				const { token } = await userApi.login({
                    email: data.email,
                    password: data.password,
                });
				await userApi.updateUser(token, data2);
			} catch (err) {
				expect(err.message).toEqual(
					'Passwords do not match',
				);
			}
		});
    });
    
    
    afterAll(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()));

});