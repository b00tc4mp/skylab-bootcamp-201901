'use strict';

require('dotenv').config();
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const expect = require('expect');
const { User } = require('triviapp-data');
const mongoose = require('../../../config/mongoose');
const auth = require('.');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

describe('Auth', () => {

	before(() => mongoose.connect());

	beforeEach(() => Promise.all([User.deleteMany()]));

	describe('POST /v1/auth/register', () => {
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
			const { id } = await auth.signupUser(data);

			const user = await User.get(id);

			const match = await bcrypt.compare(data.password, user.password);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(user.name).toBe(data.name);
			expect(user.surname).toBe(data.surname);
			expect(user.email).toBe(data.email);
			expect(match).toBeTruthy();
		});

		it('should fail with already registered user', async () => {
			await User.create(data);

			try {
				await auth.signupUser(data);
			} catch (err) {
				expect(err).toBeInstanceOf(AlreadyExistsError);
				expect(err.message).toEqual(
					`User with email ${data.email} already exists`,
				);
			}
		});

		it('should fail on undefined name', () => {
			data.name = undefined;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric name', () => {
			data.name = 10;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});
		//
		it('should fail on boolean name', () => {
			data.name = true;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(true + ' is not a string'));
		});

		it('should fail on object name', () => {
			data.name = {};
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array name', () => {
			data.name = [];
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty name', () => {
			data.name = '';
			expect(() => {
				auth.signupUser(data);
			}).toThrow(Error('name is empty or blank'));
		});

		it('should fail on undefined surname', () => {
			data.surname = undefined;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric surname', () => {
			data.surname = 10;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean surname', () => {
			data.surname = false;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object surname', () => {
			data.surname = {};
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array surname', () => {
			data.surname = [];
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty surname', () => {
			data.surname = '';
			expect(() => {
				auth.signupUser(data);
			}).toThrow(Error('surname is empty or blank'));
		});

		it('should fail on undefined email', () => {
			data.email = undefined;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric email', () => {
			data.email = 10;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean email', () => {
			data.email = false;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object email', () => {
			data.email = {};
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array email', () => {
			data.email = [];
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty email', () => {
			data.email = '';
			expect(() => {
				auth.signupUser(data);
			}).toThrow(Error('email is empty or blank'));
		});

		it('should fail on undefined password', () => {
			data.password = undefined;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric password', () => {
			data.password = 10;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean password', () => {
			data.password = false;
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError(false + ' is not a string'));
		});

		it('should fail on object password', () => {
			data.password = {};
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array password', () => {
			data.password = [];
			expect(() => {
				auth.signupUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty password', () => {
			data.password = '';
			expect(() => {
				auth.signupUser(data);
			}).toThrow(Error('password is empty or blank'));
		});
	});

	describe('POST /v1/auth/login', () => {
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
			const { token, user } = await auth.loginUser({
				email: data.email,
				password: data.password,
			});

			expect(user).toBeDefined();
			expect(token).toBeDefined();
		});

		it('should report error when email and password are not provided', async () => {
			try {
				await auth.loginUser({});
			} catch (err) {
				expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when password is not provided', async () => {
			data.password = undefined;
			try {
				await auth.loginUser(data);
			} catch (err) {
				expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should report error when email is not provided', async () => {
			data.email = undefined;
			try {
				await auth.loginUser(data);
			} catch (err) {
				expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on incorrect password', async () => {
			data.password = 'qwerty';
			try {
				await auth.loginUser(data);
			} catch (err) {
				expect(err).toBeInstanceOf(UnauthorizedError);
				expect(err.message).toEqual(`Incorrect email or password`);
			}
		});

		it('should fail on numeric email', () => {
			data.email = 10;
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean email', () => {
			data.email = false;
			expect(() => {
				auth.loginUser(data);
			}).toThrow(new UnauthorizedError('Incorrect email or password'));
		});

		it('should fail on object email', () => {
			data.email = {};
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array email', () => {
			data.email = [];
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty email', () => {
			data.email = '';
			expect(() => {
				auth.loginUser(data);
			}).toThrow(new UnauthorizedError('Incorrect email or password'));
		});

		it('should fail on numeric password', () => {
			data.password = 10;
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError(10 + ' is not a string'));
		});

		it('should fail on boolean password', () => {
			data.password = false;
			expect(() => {
				auth.loginUser(data);
			}).toThrow(new UnauthorizedError('Incorrect email or password'));
		});

		it('should fail on object password', () => {
			data.password = {};
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError({} + ' is not a string'));
		});

		it('should fail on array password', () => {
			data.password = [];
			expect(() => {
				auth.loginUser(data);
			}).toThrow(TypeError([] + ' is not a string'));
		});

		it('should fail on empty password', () => {
			data.password = '';
			expect(() => {
				auth.loginUser(data);
			}).toThrow(new UnauthorizedError('Incorrect email or password'));
		});
	});

	describe('GET /v1/auth/user', () => {
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
			const user = await auth.retrieveUser(userSaved._id.toString());
			
			expect(user).toBeDefined();
			expect(user.id).toBe(userSaved._id.toString());
			expect(user.name).toBe(userSaved.name);
			expect(user.surname).toBe(userSaved.surname);
			expect(user.email).toBe(userSaved.email);
		});

		it('should fail when userID is not an ObjectId', async () => {
			try {
				await auth.retrieveUser('xxxxxxxxx');
			} catch (err) {
				expect(err.message).toEqual(
					'Cast to ObjectId failed for value "xxxxxxxxx" at path "_id" for model "User"',
				);
			}
		});
	});


	describe('POST /v1/auth/user', () => {
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
			let data = {
				name: 'Enquesta numero 2',
				surname: 'Lorem ipsum dolor is amet....',
				email: 'robert-z@hotmail.es.',
				image: 'image2',
			};
			
			const currentUser = await User.get(userAdd._id);
			
			const userUpdated = await auth.updateUser(currentUser._id, data);
			
			expect(userUpdated.name).toBe(data.name);
			expect(userUpdated.surname).toBe(data.surname);
			expect(userUpdated.email).toBe(data.email);
			// expect(userUpdated.picture).toBe(data.image);
		});

		it('should return the same User if we pass a empty object', async () => {
			const currentUser = await User.get(userAdd._id);
			const userUpdated = await auth.updateUser(currentUser._id, {});
			expect(userUpdated.name).toBe(data.name);
			expect(userUpdated.surname).toBe(data.surname);
			expect(userUpdated.email).toBe(data.email);
			// expect(userUpdated.picture).toBe(data.image);
		});

		it('should fail if password not match', async () => {
			let data = {
				password: 'xxxxxx',
				confirmPassword: 'aaaaaaaaa',
			};

			try {
				const currentUser = await User.get(userAdd._id);
				await auth.updateUser(currentUser._id, data);
			} catch (err) {
				expect(err.message).toEqual(
					'Passwords do not match',
				);
			}
		});
	});

	after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()));
});
