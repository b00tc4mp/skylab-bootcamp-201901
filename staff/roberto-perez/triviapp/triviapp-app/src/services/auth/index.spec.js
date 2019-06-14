'use strict';

// const httpStatus = require('http-status');
import auth from '.';
import userApi from '../../api/user-api';
const bcrypt = require('bcrypt');
const { mongoose, User } = require('triviapp-data');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

userApi.url = REACT_APP_BASE_URL_API;

describe('Auth', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

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

		it('should succeed on valid data', async () =>{
				const user = await auth.signup(data);
				expect(user).toBeDefined()
				expect(user.name).toBe(data.name);
				expect(user.surname).toBe(data.surname);
				expect(user.email).toBe(data.email);

		});

		it('should fail with already registered user', async () => {
			await auth.signup(data);

			try {
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					`User with email ${data.email} already exists`,
				);
			}
		});

		it('should fail on undefined name', async () => {
			try {
				data.name = undefined;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					undefined + ' is not a string',
				);
			}
		});

		it('should fail on numeric name', async () => {
			try {
				data.name = 10;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					10 + ' is not a string',
				);
			}
			
		});
		
		it('should fail on boolean name', async () => {
			try {
				data.name = true;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					true + ' is not a string'
				);
			}
		});

		it('should fail on object name', async () => {
			try {
				data.name = {};
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					{} + ' is not a string'
				);
			}
			
		});

		it('should fail on array name', async () => {
			try {
				data.name = [];
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					[] + ' is not a string'
				);
			}
		});

		it('should fail on empty name', async () => {
			try {
				data.name = '';
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					'name is empty or blank'
				);
			}
		});

		it('should fail on undefined surname', async () => {
			try {
				data.surname = undefined;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					undefined + ' is not a string'
				);
			}
		});

		it('should fail on numeric surname', async () => {
			try {
				data.surname = 10;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					10 + ' is not a string'
				);
			}
		});

		it('should fail on boolean surname', async () => {
			try {
				data.surname = false;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					false + ' is not a string'
				);
			}
		});

		it('should fail on object surname', async () => {
			try {
				data.surname = {};
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					{} + ' is not a string'
				);
			}
		});

		it('should fail on array surname', async () => {
			try {
				data.surname = [];
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					[] + ' is not a string'
				);
			}
		});

		it('should fail on empty surname', async () => {
			try {
				data.surname = '';
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					'surname is empty or blank'
				);
			}
		});

		it('should fail on undefined email', async () => {
			try {
				data.email = undefined;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					undefined + ' is not a string'
				);
			}
			
		});

		it('should fail on numeric email', async () => {
			try {
				data.email = 10;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					10 + ' is not a string'
				);
			}
		});

		it('should fail on boolean email', async () => {
			try {
				data.email = false;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					false + ' is not a string'
				);
			}
		});

		it('should fail on object email', async () => {
			try {
				data.email = {};
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					{} + ' is not a string'
				);
			}
		});

		it('should fail on array email', async () => {
			try {
				data.email = [];
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					[] + ' is not a string'
				);
			}
		});

		it('should fail on empty email', async () => {
			try {
				data.email = '';
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					'email is empty or blank'
				);
			}
			
		});

		it('should fail on undefined password', async () => {
			try {
				data.password = undefined;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					undefined + ' is not a string'
				);
			}
		});

		it('should fail on numeric password', async () => {
			try {
				data.password = 10;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					10 + ' is not a string'
				);
			}
		});

		it('should fail on boolean password', async () => {
			try {
				data.password = false;
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					false + ' is not a string'
				);
			}
		});

		it('should fail on object password', async () => {
			try {
				data.password = {};
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					{} + ' is not a string'
				);
			}
		});

		it('should fail on array password', async () => {
			try {
				data.password = [];
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					[] + ' is not a string'
				);
			}
		});

		it('should fail on empty password', async () => {
			try {
				data.password = '';
				await auth.signup(data);
			} catch (err) {
				expect(err.message).toEqual(
					'password is empty or blank'
				);
			}
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

			return await auth.signup(data);
		});

		it('should return a token when email and password matches', async () => {
			const { token, user } = await auth.login({
				email: data.email,
				password: data.password,
			});

			expect(user).toBeDefined();
			expect(token).toBeDefined();
		});

		it('should report error when email and password are not provided', async () => {
			try {
				await auth.login({});
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when password is not provided', async () => {
			data.password = undefined;
			try {
				await auth.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when email is not provided', async () => {
			data.email = undefined;
			try {
				await auth.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on incorrect password', async () => {
			data.password = 'qwerty';
			try {
				await auth.login(data);
			} catch (err) {
				// expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on numeric email', async () => {
            data.email = 10;
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual(10 + ' is not a string');
            }
		});

		it('should fail on boolean email', async () => {
			data.email = false;
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on object email', async () => {
			data.email = {};
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual({} + ' is not a string');
            }
		});

		it('should fail on array email', async () => {
			data.email = [];
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual([] + ' is not a string');
            }
		});

		it('should fail on empty email', async () => {
			data.email = '';
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on numeric password', async () => {
			data.password = 10;
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual(10 + ' is not a string');
            }
		});

		it('should fail on boolean password', async () => {
			data.password = false;
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual('Incorrect email or password');
            }
		});

		it('should fail on object password', async () => {
			data.password = {};
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual({} + ' is not a string');
            }
		});

		it('should fail on array password', async () => {
			data.password = [];
            try {
				await auth.login(data);
			} catch (err) {
				expect(err.message).toEqual([] + ' is not a string');
            }
		});

		it('should fail on empty password', async () => {
			data.password = '';
            try {
				await auth.login(data);
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

			userSaved = await auth.signup(data);
			return userSaved;
		});

		it('should return a user', async () => {

            const { token } = await auth.login({
				email: data.email,
				password: data.password,
            });
            

			const user = await auth.retrieveUser();
			
			expect(user).toBeDefined();
			expect(user.id).toBe(userSaved.id);
			expect(user.name).toBe(userSaved.name);
			expect(user.surname).toBe(userSaved.surname);
			expect(user.email).toBe(userSaved.email);
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

			userAdd = await auth.signup(data);
			return userAdd;
		});

		it('should succeed on valid data', async () => {
			let data2 = {
				name: 'Enquesta numero 2',
				surname: 'Lorem ipsum dolor is amet....',
				email: 'robert-z@hotmail.es.',
				image: 'image2',
			};
			
			const { token } = await auth.login({
                email: data.email,
                password: data.password,
            });
			
			const userUpdated = await auth.updateUser(data2);
			
			expect(userUpdated.name).toBe(data2.name);
			expect(userUpdated.surname).toBe(data2.surname);
			expect(userUpdated.email).toBe(data2.email);
			// expect(userUpdated.picture).toBe(data.image);
		});

		it('should return the same User if we pass a empty object', async () => {
			const { token } = await auth.login({
                email: data.email,
                password: data.password,
            });
			const userUpdated = await auth.updateUser({});
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
				const { token } = await auth.login({
                    email: data.email,
                    password: data.password,
                });
				await auth.updateUser(data2);
			} catch (err) {
				expect(err.message).toEqual(
					'Passwords do not match',
				);
			}
		});
    });



	afterAll(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()));
});
