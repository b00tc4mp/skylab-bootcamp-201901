'use strict';

require('dotenv').config();
const mongoose = require('../../../config/mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const expect = require('expect');
const { User } = require('../../models/user.model');
const auth = require('.');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

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

	after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()));
});
