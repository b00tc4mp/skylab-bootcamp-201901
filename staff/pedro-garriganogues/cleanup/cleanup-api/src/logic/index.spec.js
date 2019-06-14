'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Product, Order } } = require('cleanUp-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { DB_URL } } = process


describe('logic', () => {
    before(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([Product.deleteMany(), Order.deleteMany()])
    );

    describe('register user', () => {
        const name = 'Test'
        const surname = 'Test'
        const email = `Test-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirmation = password

        it("should succeed on valid data", async () => {
            const i = await logic.registerUser(
                name,
                surname,
                email,
                password,
                passwordConfirmation
            );
            const user = await User.findOne({ email });
            expect(user.name).toBe(name);
            expect(user.surname).toBe(surname);
            expect(user.email).toBe(email);
            expect(user.password).toBe(password);

        });

        it("should fail on undefined name", () => {
            const name = undefined;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation);
            }).toThrow(TypeError(name + " is not a string"));
        });

        it('should fail on diferent passwords name', () => {
            const name = undefined;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = 'diferentpassword'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it("should fail on null name", () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password


            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('undefined is not a string'))
        });

        it("should fail on {object} name", () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password


            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError('undefined is not a string'))
        });


        it("should fail on [array] name", () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password


            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError('undefined is not a string'))
        });

        it('should fail on empty name', () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('undefined is not a string'))
        })


        describe('authenticate user', () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                bcrypt.hash(password, 10)
                    .then(hash => User.create({ name, surname, email, password: hash }))
            )

            it('should succeed on correct credentials', () =>
                logic.authenticateUser(email, password)
                    .then(id => expect(id).toBeDefined())
            )
        })

        describe('retrieve user', () => {
            const name = null;
            const surname = 'Test'
            const email = `Test-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            let userId

            beforeEach(() =>
                bcrypt.hash(password, 10)
                    .then(hash => User.create({ name, surname, email, password: hash }))
                    .then(({ id }) => userId = id)
            )



            it('should succeed on correct credentials', () =>
                logic.retrieveUser(userId)
                    .then(user => {
                        expect(user.id).toBe(userId)
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)

                    })
            )
        })
    })








})