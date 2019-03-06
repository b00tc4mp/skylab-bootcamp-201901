import auth from '.';

describe('Auth', () => {
	describe('register user', () => {
		let data = {
			name: 'Manuel',
			surname: 'Barzi',
			email: `manuelbarzi@mail.com-${Math.random()}`,
			password: '123123',
		};

		it('should succeed on valid data', () =>
			auth.signup(data).then(result => expect(result).toBeUndefined()));

		it('should fail on undefined name', () => {
			let data = {
                surname: 'Barzi',
                email: `manuelbarzi@mail.com-${Math.random()}`,
                password: '123123',
            };

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail on numeric name', () => {
			const name = 10;
			const surname = 'Barzi';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(name + ' is not a string'));
		});

		it('should fail on boolean name', () => {
			const name = true;
			const surname = 'Barzi';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(name + ' is not a string'));
		});

		it('should fail on object name', () => {
			const name = {};
			const surname = 'Barzi';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(name + ' is not a string'));
		});

		it('should fail on array name', () => {
			const name = [];
			const surname = 'Barzi';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(name + ' is not a string'));
		});

		it('should fail on empty name', () => {
			const name = '';
			const surname = 'Barzi';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(Error('name cannot be empty'));
		});

		it('should fail on undefined surname', () => {
			const name = 'Manuel';
			const surname = undefined;
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(surname + ' is not a string'));
		});

		it('should fail on numeric surname', () => {
			const name = 'Manuel';
			const surname = 10;
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(surname + ' is not a string'));
		});

		it('should fail on boolean surname', () => {
			const name = 'Manuel';
			const surname = false;
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(surname + ' is not a string'));
		});

		it('should fail on object surname', () => {
			const name = 'Manuel';
			const surname = {};
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(surname + ' is not a string'));
		});

		it('should fail on array surname', () => {
			const name = 'Manuel';
			const surname = [];
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(surname + ' is not a string'));
		});

		it('should fail on empty surname', () => {
			const name = 'Manuel';
			const surname = '';
			const email = 'manuelbarzi@mail.com';
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(Error('surname cannot be empty'));
		});

		it('should fail on undefined email', () => {
			const name = 'Manuel';
			const surname = 'Barzi';
			const email = undefined;
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(email + ' is not a string'));
		});

		it('should fail on numeric email', () => {
			const name = 'Manuel';
			const surname = 'Barzi';
			const email = 123;
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(email + ' is not a string'));
		});

		it('should fail on boolean email', () => {
			const name = 'Manuel';
			const surname = 'Barzi';
			const email = true;
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(email + ' is not a string'));
		});

		it('should fail on object email', () => {
			const name = 'Manuel';
			const surname = 'Barzi';
			const email = {};
			const password = '123123';

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(email + ' is not a string'));
		});

		it('should fail on array email', () => {
			let data = {
                name: 'Manuel',
                surname: 'Barzi',
                email: [],
                password: '123123'
            }

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(data.email + ' is not a string'));
		});

		it('should fail on empty email', () => {
            let data = {
                name: 'Manuel',
                surname: 'Barzi',
                email: '',
                password: '123123'
            }

			expect(() => {
				auth.signup(data);
			}).toThrow(Error('email cannot be empty'));
		});

		it('should fail on numeric password', () => {
			let data = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@mail.com',
                password: 123
            }

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(data.password + ' is not a string'));
		});

		it('should fail on boolean password', () => {
			let data = {
				name: 'Manuel',
				surname: 'Barzi',
				email: 'manuelbarzi@mail.com',
				password: true,
			};

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(data.password + ' is not a string'));
		});

		it('should fail on object password', () => {
			let data = {
				name: 'Manuel',
				surname: 'Barzi',
				email: 'manuelbarzi@mail.com',
				password: {},
			};

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(data.password + ' is not a string'));
		});

		it('should fail on array password', () => {
			let data = {
				name: 'Manuel',
				surname: 'Barzi',
				email: 'manuelbarzi@mail.com',
				password: [],
			};

			expect(() => {
				auth.signup(data);
			}).toThrow(TypeError(data.password + ' is not a string'));
		});

		it('should fail on empty password', () => {
			let data = {
				name: 'Manuel',
				surname: 'Barzi',
				email: 'manuelbarzi@mail.com',
				password: '',
			};

			expect(() => {
				auth.signup(data);
			}).toThrow(Error('password cannot be empty'));
		});
	});

	describe('login user', () => {
		let data = {
			name: 'Manuel',
			surname: 'Barzi',
			email: `manuelbarzi@mail.com-${Math.random()}`,
			password: '123123',
		};

		beforeEach(() => auth.signup(data));

		it('should succeed on correct credentials', () =>
			auth.login({ email: data.email, password: data.password }).then(() => {
				expect(auth.__userId__).toBeDefined();
				expect(auth.__userApiToken__).toBeDefined();
			}));
	});
});
