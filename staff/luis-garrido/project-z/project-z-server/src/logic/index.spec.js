"use strict";

require("dotenv").config();
require("isomorphic-fetch");

const {
    mongoose,
    models: { User }
} = require("project-z-data");
const {
    AuthError,
    EmptyError,
    DuplicateError,
    MatchingError,
    NotFoundError
} = require("project-z-errors");

const expect = require("expect");
const bcrypt = require("bcrypt");

const logic = require(".");

const {
    env: { TEST_DB_URL }
} = process;

describe("logic", () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }));

    beforeEach(() => Promise.all([User.deleteMany()]));

    describe("register user", () => {
        const admin = false;
        const username = "quinwacca";
        const avatar = "10";
        const name = "Luis";
        const surname = "Garrido";
        const email = `luisgarrido-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;
        const passwordConfirm = password;

        it("should succeed on register user", async () => {
            const id = await logic.registerUser(
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password,
                passwordConfirm
            );

            expect(id).toBeDefined();
            expect(typeof id).toBe("string");

            const user = await User.findOne({ email });

            expect(user.admin).toBe(admin);
            expect(user.username).toBe(username);
            expect(user.avatar).toBe(avatar);
            expect(user.name).toBe(name);
            expect(user.surname).toBe(surname);
            expect(user.email).toBe(email);

            const match = await bcrypt.compare(password, user.password);

            expect(match).toBeTruthy();
        });

        it("should fail on not matching password", () => {
            const passwordConfirm = "notTheSamePassword";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirm
                );
            }).toThrow(new MatchingError("passwords do not match"));
        });

        it("should fail on registering user with existing username", async () => {
            const id = await logic.registerUser(
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password,
                passwordConfirm
            );

            expect(id).toBeDefined();
            expect(typeof id).toBe("string");

            const email2 = `luisgarrido-${Math.random()}@mail.com`;

            let errorCatched;

            try {
                const id2 = await logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email2,
                    password,
                    passwordConfirm
                );
            } catch (error) {
                errorCatched = error;
            }
            expect(errorCatched instanceof DuplicateError).toBe(true);
            expect(errorCatched.message).toBe(
                `user with username ${username} already exists`
            );
        });

        it("should fail on registering user with existing email", async () => {
            const id = await logic.registerUser(
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password,
                passwordConfirm
            );

            expect(id).toBeDefined();
            expect(typeof id).toBe("string");

            const username2 = `Hulio`;

            let errorCatched;

            try {
                const id2 = await logic.registerUser(
                    admin,
                    username2,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirm
                );
            } catch (error) {
                errorCatched = error;
            }
            expect(errorCatched instanceof DuplicateError).toBe(true);
            expect(errorCatched.message).toBe(
                `user with email ${email} already exists`
            );
        });

        it("should fail on undefined admin", () => {
            const admin = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on numeric admin", () => {
            const admin = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on string admin", () => {
            const admin = "true";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on object admin", () => {
            const admin = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on array admin", () => {
            const admin = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on undefined username", () => {
            const username = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on empty username", () => {
            const username = "";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(new EmptyError("username cannot be empty"));
        });

        it("should fail on numeric username", () => {
            const username = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on boolean username", () => {
            const username = true;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on object username", () => {
            const username = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on array username", () => {
            const username = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on undefined avatar", () => {
            const avatar = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on empty avatar", () => {
            const avatar = "";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(new EmptyError("avatar cannot be empty"));
        });

        it("should fail on numeric avatar", () => {
            const avatar = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on boolean avatar", () => {
            const avatar = true;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on object avatar", () => {
            const avatar = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on array avatar", () => {
            const avatar = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on undefined name", () => {
            const name = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on numeric name", () => {
            const name = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on boolean name", () => {
            const name = true;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on object name", () => {
            const name = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on array name", () => {
            const name = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on undefined surname", () => {
            const surname = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on numeric surname", () => {
            const surname = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on boolean surname", () => {
            const surname = false;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on object surname", () => {
            const surname = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on array surname", () => {
            const surname = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on empty email", () => {
            const email = "";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(new EmptyError("email cannot be empty"));
        });

        it("should fail on undefined email", () => {
            const email = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on numeric email", () => {
            const email = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on boolean email", () => {
            const email = false;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on object email", () => {
            const email = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on array email", () => {
            const email = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on empty password", () => {
            const password = "";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(new EmptyError("password cannot be empty"));
        });

        it("should fail on undefined password", () => {
            const password = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on numeric password", () => {
            const password = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on boolean password", () => {
            const password = false;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on object password", () => {
            const password = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on array password", () => {
            const password = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    password
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on empty password confirmation", () => {
            const passwordConfirmation = "";

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(new EmptyError("password confirmation cannot be empty"));
        });

        it("should fail on undefined password confirmation", () => {
            const passwordConfirmation = undefined;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on numeric password confirmation", () => {
            const passwordConfirmation = 10;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on boolean password confirmation", () => {
            const passwordConfirmation = false;

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on object password confirmation", () => {
            const passwordConfirmation = {};

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on array password confirmation", () => {
            const passwordConfirmation = [];

            expect(() => {
                logic.registerUser(
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });
    });

    describe("authenticate user", () => {
        const admin = false;
        const username = "quinwacca";
        const avatar = "10";
        const name = "Luis";
        const surname = "Garrido";
        const email = `luisgarrido-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;

        beforeEach(() =>
            bcrypt.hash(password, 10).then(hash =>
                User.create({
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password: hash
                })
            )
        );

        it("should succeed on correct credentials when authenticate with email", () =>
            logic
                .authenticateUser(email, password)
                .then(id => expect(id).toBeDefined()));

        it("should succeed on correct credentials when authenticate with username", () =>
            logic
                .authenticateUser(username, password)
                .then(id => expect(id).toBeDefined()));

        it("should fail on authenticate with incorrect email", async () => {
            let errorCatched;
            const email = "fake@email.com";

            try {
                const auth = await logic.authenticateUser(email, password);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof NotFoundError).toBe(true);
            expect(errorCatched.message).toBe(
                `user with email ${email} not found`
            );
        });

        it("should fail on authenticate with incorrect username", async () => {
            let errorCatched;
            const username = "fakeUsername69";

            try {
                const auth = await logic.authenticateUser(username, password);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof NotFoundError).toBe(true);
            expect(errorCatched.message).toBe(
                `user with username ${username} not found`
            );
        });

        it("should fail on authenticate with incorrect password", async () => {
            let errorCatched;
            const password = "fakePassword69";

            try {
                const auth = await logic.authenticateUser(username, password);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof AuthError).toBe(true);
            expect(errorCatched.message).toBe(`wrong credentials`);
        });

        it("should fail on empty authenticate data", () => {
            const email = "";

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(new EmptyError("loggingData cannot be empty"));
        });

        it("should fail on undefined authenticate data", () => {
            const email = undefined;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on numeric authenticate data", () => {
            const email = 10;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on boolean authenticate data", () => {
            const email = false;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on object authenticate data", () => {
            const email = {};

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on array authenticate data", () => {
            const email = [];

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on empty password", () => {
            const password = "";

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(new EmptyError("password cannot be empty"));
        });

        it("should fail on undefined password", () => {
            const password = undefined;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on numeric password", () => {
            const password = 10;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on boolean password", () => {
            const password = false;

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on object password", () => {
            const password = {};

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on array password", () => {
            const password = [];

            expect(() => {
                logic.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });
    });

    describe("retrieve user", () => {
        const admin = false;
        const username = "quinwacca";
        const avatar = "10";
        const name = "Luis";
        const surname = "Garrido";
        const email = `luisgarrido-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;

        let userId;

        beforeEach(() =>
            bcrypt.hash(password, 10).then(hash =>
                User.create({
                    admin,
                    username,
                    avatar,
                    name,
                    surname,
                    email,
                    password: hash
                }).then(({ id }) => (userId = id))
            )
        );

        it("should succeed on correct credentials", () =>
            logic.retrieveUser(userId).then(user => {
                expect(user.id).toBe(userId);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.email).toBe(email);

                expect(user.save).toBeUndefined();
            }));

        it("should fail on incorrect userId", async () => {
            let errorCatched;
            const userId = "5c7d5fdbba3aed8dc820ece0";

            try {
                const auth = await logic.retrieveUser(userId);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof NotFoundError).toBe(true);
            expect(errorCatched.message).toBe(
                `user with id ${userId} not found`
            );
        });

        it("should fail on empty userId", () => {
            const userId = "";

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(new EmptyError("userId cannot be empty"));
        });

        it("should fail on undefined userId", () => {
            const userId = undefined;

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on numeric userId", () => {
            const userId = 10;

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on boolean userId", () => {
            const userId = false;

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on object userId", () => {
            const userId = {};

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on array userId", () => {
            const userId = [];

            expect(() => {
                logic.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });
    });

    // TODO updateUser and removeUser

    after(() =>
        Promise.all([User.deleteMany()]).then(() => mongoose.disconnect())
    );
});

//     false && describe('search artists', () => {
//         it('should succeed on mathing query', () => {
//             const query = 'madonna'

//             return logic.searchArtists(query)
//                 .then(artists => {
//                     expect(artists).toBeDefined()
//                     expect(artists instanceof Array).toBeTruthy()
//                     expect(artists.length).toBeGreaterThan(0)

//                     artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
//                 })
//         })

//         it('should fail on empty query', () => {
//             const query = ''

//             expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
//         })
//     })

//     false && describe('retrieve artist', () => {
//         it('should succeed on mathing query', () => {
//             const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

//             return logic.retrieveArtist(artistId)
//                 .then(({ id, name }) => {
//                     expect(id).toBe(artistId)
//                     expect(name).toBe('Madonna')
//                 })
//         })

//         it('should fail on empty artistId', function () {
//             const artistId = ''

//             expect(() => logic.retrieveArtist(artistId)).toThrowError('artistId is empty')
//         })
//     })

//     false && describe('toggle favorite artist', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi-${Math.random()}@mail.com`
//         const password = `123-${Math.random()}`
//         const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

//         let userId

//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(hash => User.create({ name, surname, email, password: hash }))
//                 .then(({ id }) => userId = id)
//         )

//         it('should succeed on correct data', () =>
//             logic.toggleFavoriteArtist(userId, artistId)
//                 .then(() => User.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteArtists).toBeDefined()
//                     expect(user.favoriteArtists.length).toBe(1)
//                     expect(user.favoriteArtists[0]).toBe(artistId)

//                     return logic.toggleFavoriteArtist(userId, artistId)
//                 })
//                 .then(() => User.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteArtists).toBeDefined()
//                     expect(user.favoriteArtists.length).toBe(0)
//                 })
//         )
//     })

//     false && describe('add comment to artist', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi-${Math.random()}@mail.com`
//         const password = `123-${Math.random()}`
//         const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
//         const text = `comment ${Math.random()}`

//         let userId

//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(hash => User.create({ name, surname, email, password: hash }))
//                 .then(({ id }) => userId = id)
//         )

//         it('should succeed on correct data', () =>
//             logic.addCommentToArtist(userId, artistId, text)
//                 .then(({ id }) => {
//                     expect(id).toBeDefined()

//                     return artistComments.retrieve(id)
//                         .then(_comment => {
//                             expect(_comment.id).toBe(id)
//                             expect(_comment.userId).toBe(userId)
//                             expect(_comment.artistId).toBe(artistId)
//                             expect(_comment.text).toBe(text)
//                             expect(_comment.date).toBeDefined()
//                             expect(_comment.date instanceof Date).toBeTruthy()
//                         })
//                 })
//         )
//     })

//     false && describe('list comments from artist', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi-${Math.random()}@mail.com`
//         const password = `123-${Math.random()}`
//         const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
//         const text = `comment ${Math.random()}`
//         const text2 = `comment ${Math.random()}`
//         const text3 = `comment ${Math.random()}`
//         let comment, comment2, comment3

//         let userId

//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(hash => User.create({ name, surname, email, password: hash }))
//                 .then(({ id }) => userId = id)
//                 .then(() => artistComments.add(comment = { userId, artistId, text }))
//                 .then(() => artistComments.add(comment2 = { userId, artistId, text: text2 }))
//                 .then(() => artistComments.add(comment3 = { userId, artistId, text: text3 }))
//         )

//         it('should succeed on correct data', () =>
//             logic.listCommentsFromArtist(userId, artistId)
//                 .then(comments => {
//                     expect(comments).toBeDefined()
//                     expect(comments.length).toBe(3)

//                     comments.forEach(({ id, userId: _userId, artistId: _artistId, date }) => {
//                         expect(id).toBeDefined()
//                         expect(_userId).toEqual(userId)
//                         expect(_artistId).toEqual(artistId)
//                         expect(date).toBeDefined()
//                         expect(date instanceof Date).toBeTruthy()
//                     })

//                     expect(comments[0].text).toEqual(text)
//                     expect(comments[1].text).toEqual(text2)
//                     expect(comments[2].text).toEqual(text3)
//                 })
//         )
//     })

//     false && describe('retrieve albums', () => {
//         it('should succeed on mathing query', () => {
//             const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

//             return logic.retrieveAlbums(artistId)
//                 .then(albums => {
//                     expect(albums).toBeDefined()
//                     expect(albums instanceof Array).toBeTruthy()
//                     expect(albums.length).toBeGreaterThan(0)
//                 })
//         })

//         it('should fail on empty artistId', function () {
//             const artistId = ''

//             expect(() => logic.retrieveAlbums(artistId)).toThrowError('artistId is empty')
//         })
//     })

//     false && describe('retrieve album', () => {
//         it('should succeed on mathing query', () => {
//             const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

//             return logic.retrieveAlbum(albumId)
//                 .then(({ id, name }) => {
//                     expect(id).toBe(albumId)
//                     expect(name).toBe('Rebel Heart Tour (Live)')
//                 })
//         })

//         it('should fail on empty albumId', function () {
//             const albumId = ''

//             expect(() => logic.retrieveAlbum(albumId)).toThrowError('albumId is empty')
//         })
//     })

//     false && describe('toggle favorite album', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi-${Math.random()}@mail.com`
//         const password = `123-${Math.random()}`
//         const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

//         let userId

//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(hash => User.create({ name, surname, email, password: hash }))
//                 .then(({ id }) => userId = id)
//         )

//         it('should succeed on correct data', () =>
//             logic.toggleFavoriteAlbum(userId, albumId)
//                 .then(() => users.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteAlbums).toBeDefined()
//                     expect(user.favoriteAlbums.length).toBe(1)
//                     expect(user.favoriteAlbums[0]).toBe(albumId)

//                     return logic.toggleFavoriteAlbum(userId, albumId)
//                 })
//                 .then(() => users.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteAlbums).toBeDefined()
//                     expect(user.favoriteAlbums.length).toBe(0)
//                 })
//         )
//     })

//     false && describe('retrieve tracks', () => {
//         it('should succeed on mathing query', () => {
//             const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

//             return logic.retrieveTracks(albumId)
//                 .then(tracks => {
//                     expect(tracks).toBeDefined()
//                     expect(tracks instanceof Array).toBeTruthy()
//                     expect(tracks.length).toBeGreaterThan(0)
//                 })
//         })

//         it('should fail on empty albumId', function () {
//             const albumId = ''

//             expect(() => logic.retrieveTracks(albumId)).toThrowError('albumId is empty')
//         })
//     })

//     false && describe('retrieve track', () => {
//         it('should succeed on mathing query', () => {
//             const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
//             const trackName = 'Rebel Heart Tour Intro - Live'

//             return logic.retrieveTrack(trackId)
//                 .then(track => {
//                     expect(track).toBeDefined()

//                     const { id, name } = track

//                     expect(id).toBe(trackId)
//                     expect(name).toBe(trackName)
//                 })
//         })

//         it('should fail on empty trackId', function () {
//             const trackId = ''

//             expect(() => logic.retrieveTrack(trackId)).toThrowError('trackId is empty')
//         })
//     })

//     false && describe('toggle favorite track', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi-${Math.random()}@mail.com`
//         const password = `123-${Math.random()}`
//         const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live)

//         let userId

//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(hash => User.create({ name, surname, email, password: hash }))
//                 .then(({ id }) => userId = id)
//         )

//         it('should succeed on correct data', () =>
//             logic.toggleFavoriteTrack(userId, trackId)
//                 .then(() => users.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteTracks).toBeDefined()
//                     expect(user.favoriteTracks.length).toBe(1)
//                     expect(user.favoriteTracks[0]).toBe(trackId)

//                     return logic.toggleFavoriteTrack(userId, trackId)
//                 })
//                 .then(() => users.findById(userId))
//                 .then(user => {
//                     expect(user.id).toBe(userId)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)

//                     expect(user.favoriteTracks).toBeDefined()
//                     expect(user.favoriteTracks.length).toBe(0)
//                 })
//         )
//     })
