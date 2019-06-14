"use strict";

import projectZApi from ".";

require("dotenv").config();
// require('isomorphic-fetch')

// const projectZApi = require("./index.js");
// const expect = require("expect");
const bcrypt = require("bcrypt");

const {
    mongoose,
    models: { User, Game }
} = require("project-z-data");

const {
    AuthError,
    EmptyError,
    DuplicateError,
    MatchingError,
    NotFoundError
} = require("project-z-errors");

// jest.setTimeout(10000);

const {
    env: { TEST_DB_URL }
} = process;

describe("project z api", () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }));

    let username,
        name,
        surname,
        email,
        password,
        passwordConfirmation,
        admin,
        avatar,
        userId,
        _token;

    beforeEach(async () => {
        const wait = await Promise.all([User.deleteMany()]);
        username = `quinwacca-${Math.random()}`;
        name = "Luis";
        surname = "Garrido";
        email = `luisgarrido-${Math.random()}@mail.com`;
        password = `123-${Math.random()}`;
        passwordConfirmation = password;
        admin = false;
        avatar = "10";
    });

    describe("register user", () => {
        it("should succeed on valid data", async () => {
            let id;
            try {
                id = await projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            } catch (error) {
                console.error(error.message);
            }
            expect(id).toBeDefined();
            expect(typeof id).toBe("string");

            const user = await User.findOne({ email });

            expect(user).toBeDefined();

            expect(user.admin).toBe(admin);
            expect(user.username).toBe(username);
            expect(user.avatar).toBe(avatar);
            expect(user.name).toBe(name);
            expect(user.surname).toBe(surname);
            expect(user.email).toBe(email);

            const match = await bcrypt.compare(password, user.password);

            expect(match).toBeTruthy();
        });

        it("should fail on already existing user", async () => {
            await User.create({
                username,
                name,
                surname,
                email,
                password,
                admin,
                avatar
            });

            await projectZApi
                .registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                )
                .then(() => {
                    throw Error("should not have passed by here");
                })
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(
                        `user with email ${email} already exists`
                    );
                });
        });

        it("should fail on non-matching password and its confirmation", () =>
            projectZApi
                .registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    `non-matching ${password}`,
                    admin,
                    avatar
                )
                .then(() => {
                    throw Error("should not have passed by here");
                })
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe("passwords do not match");
                }));

        // TODO more unit test cases

        it("should fail on numeric admin", () => {
            const admin = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on string admin", () => {
            const admin = "true";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on object admin", () => {
            const admin = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on array admin", () => {
            const admin = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(admin + " is not a boolean"));
        });

        it("should fail on undefined username", () => {
            const username = undefined;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on empty username", () => {
            const username = "";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(new EmptyError("username is empty or blank"));
        });

        it("should fail on numeric username", () => {
            const username = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on boolean username", () => {
            const username = true;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on object username", () => {
            const username = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on array username", () => {
            const username = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(username + " is not a string"));
        });

        // it("should fail on undefined avatar", () => {
        //     const avatar = undefined;

        //     expect(() => {
        //         projectZApi.registerUser(
        //             username,
        //             name,
        //             surname,
        //             email,
        //             password,
        //             passwordConfirmation,
        //             admin,
        //             avatar
        //         );
        //     }).toThrow(TypeError(avatar + " is not a string"));
        // });

        it("should fail on empty avatar", () => {
            const avatar = "";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(new EmptyError("avatar is empty or blank"));
        });

        it("should fail on numeric avatar", () => {
            const avatar = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on boolean avatar", () => {
            const avatar = true;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on object avatar", () => {
            const avatar = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on array avatar", () => {
            const avatar = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(avatar + " is not a string"));
        });

        it("should fail on numeric name", () => {
            const name = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on boolean name", () => {
            const name = true;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on object name", () => {
            const name = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on array name", () => {
            const name = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(name + " is not a string"));
        });

        it("should fail on numeric surname", () => {
            const surname = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on boolean surname", () => {
            const surname = false;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on object surname", () => {
            const surname = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on array surname", () => {
            const surname = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(surname + " is not a string"));
        });

        it("should fail on empty email", () => {
            const email = "";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(new EmptyError("email is empty or blank"));
        });

        it("should fail on undefined email", () => {
            const email = undefined;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on numeric email", () => {
            const email = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on boolean email", () => {
            const email = false;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on object email", () => {
            const email = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on array email", () => {
            const email = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on empty password", () => {
            const password = "";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(new EmptyError("password is empty or blank"));
        });

        it("should fail on undefined password", () => {
            const password = undefined;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on numeric password", () => {
            const password = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on boolean password", () => {
            const password = false;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on object password", () => {
            const password = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on array password", () => {
            const password = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on empty password confirmation", () => {
            const passwordConfirmation = "";

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(
                new EmptyError("passwordConfirmation is empty or blank")
            );
        });

        it("should fail on undefined password confirmation", () => {
            const passwordConfirmation = undefined;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on numeric password confirmation", () => {
            const passwordConfirmation = 10;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on boolean password confirmation", () => {
            const passwordConfirmation = false;

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on object password confirmation", () => {
            const passwordConfirmation = {};

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });

        it("should fail on array password confirmation", () => {
            const passwordConfirmation = [];

            expect(() => {
                projectZApi.registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation,
                    admin,
                    avatar
                );
            }).toThrow(TypeError(passwordConfirmation + " is not a string"));
        });
    });

    describe("authenticate user", () => {
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
            projectZApi
                .authenticateUser(email, password)
                .then(({ token }) => expect(token).toBeDefined()));

        it("should succeed on correct credentials when authenticate with username", () =>
            projectZApi
                .authenticateUser(username, password)
                .then(({ token }) => expect(token).toBeDefined()));

        it("should fail on authenticate with incorrect email", async () => {
            let errorCatched;
            const email = "fake@email.com";

            try {
                const auth = await projectZApi.authenticateUser(
                    email,
                    password
                );
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(
                `user with email ${email} not found`
            );
        });

        it("should fail on authenticate with incorrect username", async () => {
            let errorCatched;
            const username = "fakeUsername69";

            try {
                const auth = await projectZApi.authenticateUser(
                    username,
                    password
                );
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(
                `user with username ${username} not found`
            );
        });

        it("should fail on authenticate with incorrect password", async () => {
            let errorCatched;
            const password = "fakePassword69";

            try {
                const auth = await projectZApi.authenticateUser(
                    username,
                    password
                );
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(`wrong credentials`);
        });

        it("should fail on empty authenticate data", () => {
            const email = "";

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(new EmptyError("loggingData is empty or blank"));
        });

        it("should fail on undefined authenticate data", () => {
            const email = undefined;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on numeric authenticate data", () => {
            const email = 10;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on boolean authenticate data", () => {
            const email = false;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on object authenticate data", () => {
            const email = {};

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on array authenticate data", () => {
            const email = [];

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(email + " is not a string"));
        });

        it("should fail on empty password", () => {
            const password = "";

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(new EmptyError("password is empty or blank"));
        });

        it("should fail on undefined password", () => {
            const password = undefined;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on numeric password", () => {
            const password = 10;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on boolean password", () => {
            const password = false;

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on object password", () => {
            const password = {};

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });

        it("should fail on array password", () => {
            const password = [];

            expect(() => {
                projectZApi.authenticateUser(email, password);
            }).toThrow(TypeError(password + " is not a string"));
        });
        // TODO more unit test cases
    });

    describe("retrieve user", () => {
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
                    .then(({ id }) => (userId = id))
                    .then(() => projectZApi.authenticateUser(email, password))
                    .then(({ token }) => {
                        _token = token;
                    })
            )
        );

        it("should succeed on correct credentials", () =>
            projectZApi.retrieveUser(_token).then(user => {
                expect(user.id).toBe(userId);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.email).toBe(email);
            }));

        it("should fail on incorrect userId", async () => {
            let errorCatched;
            const userId = "5c7d5fdbba3aed8dc820ece0";

            try {
                const auth = await projectZApi.retrieveUser(userId);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(`jwt malformed`);
        });

        it("should fail on empty userId", () => {
            const userId = "";

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(new Error("token is empty or blank"));
        });

        it("should fail on undefined userId", () => {
            const userId = undefined;

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on numeric userId", () => {
            const userId = 10;

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on boolean userId", () => {
            const userId = false;

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on object userId", () => {
            const userId = {};

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        it("should fail on array userId", () => {
            const userId = [];

            expect(() => {
                projectZApi.retrieveUser(userId);
            }).toThrow(TypeError(userId + " is not a string"));
        });

        // TODO more unit test cases
    });

    describe("retrieve user by username", () => {
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

        it("should succeed on correct username", () =>
            projectZApi.retrieveUserInfoByUsername(username).then(user => {
                expect(user.username).toBe(username);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.email).toBe(email);

                expect(user.save).toBeUndefined();
            }));

        it("should fail on incorrect username", async () => {
            let errorCatched;
            const username = "5c7d5fdbba3aed8dc820ece0";

            try {
                const auth = await projectZApi.retrieveUserInfoByUsername(
                    username
                );
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(
                `user with id ${username} not found`
            );
        });

        it("should fail on empty username", () => {
            const username = "";

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(new EmptyError("username is empty or blank"));
        });

        it("should fail on undefined username", () => {
            const username = undefined;

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on numeric username", () => {
            const username = 10;

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on boolean username", () => {
            const username = false;

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on object username", () => {
            const username = {};

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(TypeError(username + " is not a string"));
        });

        it("should fail on array username", () => {
            const username = [];

            expect(() => {
                projectZApi.retrieveUserInfoByUsername(username);
            }).toThrow(TypeError(username + " is not a string"));
        });
    });
  
    // --------------------- SEARCH -----------------------

    describe("search game", () => {
        it("should succeed on matching query", () => {
            const query = "braid";

            return projectZApi.searchGames(query).then(games => {
                expect(games).toBeDefined();
                expect(games instanceof Array).toBeTruthy();
                expect(games.length).toBeGreaterThan(0);

                expect(games[0].game_title.toLowerCase()).toContain(query);
                expect(games[0].boxartUrl).toBeDefined();
            });
        });

        it("should fail when no games found", async () => {
            const query = "marcsarrocaadventures";

            let errorCatched;

            try {
                const test = await projectZApi.searchGames(query);
                console.log(`NOT SHOULD PASS BY HERE`);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(`no games found`);
        });

        it("should fail on empty query", () => {
            const query = "";

            expect(() => projectZApi.searchGames(query)).toThrow(
                new EmptyError("query is empty or blank")
            );
        });

        it("should fail on undefined query", () => {
            const query = undefined;

            expect(() =>
                projectZApi
                    .searchGames(query)
                    .toThrow(TypeError(`${query} is not a string`))
            );
        });

        it("should fail on numeric query", () => {
            const query = 10;

            expect(() =>
                projectZApi
                    .searchGames(query)
                    .toThrow(TypeError(`${query} is not a string`))
            );
        });

        it("should fail on boolean query", () => {
            const query = false;

            expect(() =>
                projectZApi
                    .searchGames(query)
                    .toThrow(TypeError(`${query} is not a string`))
            );
        });

        it("should fail on object query", () => {
            const query = {};

            expect(() =>
                projectZApi
                    .searchGames(query)
                    .toThrow(TypeError(`${query} is not a string`))
            );
        });

        it("should fail on array query", () => {
            const query = [];

            expect(() =>
                projectZApi
                    .searchGames(query)
                    .toThrow(TypeError(`${query} is not a string`))
            );
        });
    });

    //----------------RETRIEVE GAME INFO------------------

    describe("retrieve game info", () => {
        it("should succeed on retrieving info", () => {
            const gameId = "17111";
            const gameTitle = "The Witness";

            return projectZApi.retrieveGameInfo(gameId).then(gameInfo => {
                expect(gameInfo).toBeDefined();
                expect(gameInfo instanceof Object).toBeTruthy();

                expect(gameInfo.id.toString()).toBe(gameId);
                expect(gameInfo.game_title).toBe(gameTitle);
                expect(gameInfo.boxartUrl).toBeDefined();
            });
        });

        it("should fail when no games found", async () => {
            const gameId = "189189189189";

            let errorCatched;

            try {
                const test = await projectZApi.retrieveGameInfo(gameId);
                console.log(`NOT SHOULD PASS BY HERE`);
            } catch (error) {
                errorCatched = error;
            }

            expect(errorCatched instanceof Error).toBe(true);
            expect(errorCatched.message).toBe(
                `${gameId} doesn't exist in database`
            );
        });

        it("should fail on non-number string gameId", () => {
            const gameId = "fakeId";

            expect(() => projectZApi.retrieveGameInfo(gameId)).toThrow(
                TypeError(`${gameId} should be a number`)
            );
        });

        it("should fail on gameId lower than 1", () => {
            const gameId = "0";

            expect(() => projectZApi.retrieveGameInfo(gameId)).toThrow(
                Error(`${gameId} should be a bigger than 0 number`)
            );
        });

        it("should fail on float number gameId", () => {
            const gameId = "1.3";

            expect(() => projectZApi.retrieveGameInfo(gameId)).toThrow(
                Error(`${gameId} should be an integer number`)
            );
        });

        it("should fail on empty gameId", () => {
            const gameId = "";

            expect(() => projectZApi.retrieveGameInfo(gameId)).toThrow(
                new EmptyError("gameId is empty or blank")
            );
        });

        it("should fail on undefined gameId", () => {
            const gameId = undefined;

            expect(() =>
                projectZApi
                    .retrieveGameInfo(gameId)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on numeric gameId", () => {
            const gameId = 10;

            expect(() =>
                projectZApi
                    .retrieveGameInfo(gameId)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on boolean gameId", () => {
            const gameId = false;

            expect(() =>
                projectZApi
                    .retrieveGameInfo(gameId)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on object gameId", () => {
            const gameId = {};

            expect(() =>
                projectZApi
                    .retrieveGameInfo(gameId)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on array gameId", () => {
            const gameId = [];

            expect(() =>
                projectZApi
                    .retrieveGameInfo(gameId)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });
    });

    //--------------- POST REVIEW ------------------------------

    describe("Post Review", () => {
        const gameId = "17111"; // The Witness

        const text = "esta mu bien";
        const score = 4;

        let idReviewer;
        let _token;
        let hash;

        beforeEach(async () => {
            hash = await bcrypt.hash(password, 10);
            idReviewer = await User.create({
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password: hash
            });
            const { token } = await projectZApi.authenticateUser(
                email,
                password
            );
            _token = token;
        });

        it("should post a review with success", async () => {
            let test = await projectZApi
                .postReview(_token, gameId, text, score)
                .then(async () => {
                    let isGame = await Game.findOne({ id: gameId })
                        .select("-__v")
                        .populate("reviews");
                    expect(() =>
                        isGame.reviews.some(
                            reviews => reviews.author.toString() === idReviewer
                        )
                    ).toBeTruthy();
                    // expect(isGame.finalScore).toBe(score);
                    // expect(isGame.scores.length).toBe(1);

                    isGame.scores = undefined;
                    isGame.reviews = [];

                    await isGame.save();
                });
        });

        it("should fail when same user tries to review twice a game", async () => {
            let test = await projectZApi
                .postReview(_token, gameId, text, score)
                .then(async () => {
                    let isGame = await Game.findOne({ id: gameId })
                        .select("-__v")
                        .populate("reviews");
                    expect(() =>
                        isGame.reviews.some(
                            reviews => reviews.author.toString() === idReviewer
                        )
                    ).toBeTruthy();
                    expect(isGame.finalScore).toBe(score);
                    expect(isGame.scores.length).toBe(1);
                });

            expect(
                async () =>
                    await projectZApi
                        .postReview(_token, gameId, text, score)
                        .toThrow(
                            new DuplicateError("user reviewed this game before")
                        )
            );

            let isGame = await Game.findOne({ id: gameId });

            isGame.scores = undefined;
            isGame.reviews = [];

            await isGame.save();
        });

        it("should fail on empty token", () => {
            const _token = "";

            expect(() =>
                projectZApi.postReview(_token, gameId, text, score)
            ).toThrow(new EmptyError("token is empty or blank"));
        });

        it("should fail on undefined token", () => {
            const _token = undefined;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${userId} is not a string`))
            );
        });

        it("should fail on numeric token", () => {
            const _token = 10;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${userId} is not a string`))
            );
        });

        it("should fail on boolean token", () => {
            const _token = false;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${userId} is not a string`))
            );
        });

        it("should fail on object token", () => {
            const _token = {};

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${userId} is not a string`))
            );
        });

        it("should fail on array token", () => {
            const _token = [];

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${userId} is not a string`))
            );
        });

        it("should fail on empty gameId", () => {
            const gameId = "";

            expect(() =>
                projectZApi.postReview(_token, gameId, text, score)
            ).toThrow(new EmptyError("gameId is empty or blank"));
        });

        it("should fail on undefined gameId", () => {
            const gameId = undefined;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on numeric gameId", () => {
            const gameId = 10;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on boolean gameId", () => {
            const gameId = false;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on object gameId", () => {
            const gameId = {};

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on array gameId", () => {
            const gameId = [];

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${gameId} is not a string`))
            );
        });

        it("should fail on undefined text review", () => {
            const text = undefined;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${text} is not a string`))
            );
        });

        it("should fail on numeric text review", () => {
            const text = 3;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${text} is not a string`))
            );
        });

        it("should fail on boolean text review", () => {
            const text = false;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${text} is not a string`))
            );
        });

        it("should fail on object text review", () => {
            const text = {};

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${text} is not a string`))
            );
        });

        it("should fail on array text review", () => {
            const text = [];

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${text} is not a string`))
            );
        });

        it("should fail on undefined score review", () => {
            const score = undefined;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${score} is not a number`))
            );
        });

        it("should fail on string score review", () => {
            const score = "asd";

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${score} is not a number`))
            );
        });

        it("should fail on boolean score review", () => {
            const score = false;

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${score} is not a number`))
            );
        });

        it("should fail on object score review", () => {
            const score = {};

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${score} is not a number`))
            );
        });

        it("should fail on array score review", () => {
            const score = [];

            expect(() =>
                projectZApi
                    .postReview(_token, gameId, text, score)
                    .toThrow(TypeError(`${score} is not a number`))
            );
        });

        it("should fail on bigger than 5 score review", () => {
            const score = 6;

            expect(() =>
                projectZApi.postReview(_token, gameId, text, score)
            ).toThrow(Error("score must be between 0 and 5"));
        });

        it("should fail on smaller than score review", () => {
            const score = -1;

            expect(() =>
                projectZApi.postReview(_token, gameId, text, score)
            ).toThrow(Error("score must be between 0 and 5"));
        });

        it("should fail on non integer score review", () => {
            const score = 1.2;

            expect(() =>
                projectZApi.postReview(_token, gameId, text, score)
            ).toThrow(Error("score should be an integer number"));
        });
    });

    //-----------------RANKING GAMES ----------------------

    describe("Ranking Games", () => {
        it("should get a list of games", () => {
            return projectZApi.retrieveBestScored().then(games => {
                expect(games).toBeDefined();
                // expect(games instanceof Array).toBeTruthy();
                // expect(games.length).toBeGreaterThan(0);

                // expect(games[0].game_title.toLowerCase()).toContain(query);
                // expect(games[0].boxartUrl).toBeDefined();
            });
        });
    });

    // ------------------ RANDOM ---------------------

    describe("Random Game", () => {
        it("should get a random game id", () => {
            return projectZApi.getRandomGame().then(gameId => {
                expect(gameId).toBeDefined();
                expect(gameId.id).toBeDefined();
                expect(isNaN(Number(gameId.id))).toBeFalsy();
            });
        });
    });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("update user", () => {
    //             const name = "Manuel";
    //             const surname = "Barzi";
    //             const email = `manuelbarzi-${Math.random()}@mail.com`;
    //             const password = `password-${Math.random()}`;

    //             let userId, token;

    //             beforeEach(() =>
    //                 musicApi
    //                     .registerUser(name, surname, email, password, password)
    //                     .then(id => (userId = id))
    //                     .then(() => musicApi.authenticateUser(email, password))
    //                     .then(_token => (token = _token))
    //             );

    //             it("should succeed on correct data", () => {
    //                 const data = { name: "Pepito", surname: "Grillo", age: 32 };

    //                 return musicApi
    //                     .updateUser(token, data)
    //                     .then(() => musicApi.retrieveUser(token))
    //                     .then(user => {
    //                         expect(user.id).toBe(userId);
    //                         expect(user.name).toBe(data.name);
    //                         expect(user.surname).toBe(data.surname);
    //                         expect(user.age).toBe(data.age);
    //                         expect(user.email).toBe(email);
    //                     });
    //             });

    //             // TODO more unit test cases
    //         });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("remove user", () => {
    //             const name = "Manuel";
    //             const surname = "Barzi";
    //             const email = `manuelbarzi-${Math.random()}@mail.com`;
    //             const password = `password-${Math.random()}`;

    //             let userId, token;

    //             beforeEach(() =>
    //                 musicApi
    //                     .registerUser(
    //                         name,
    //                         surname,
    //                         email,
    //                         password,
    //                         passwordConfirmation
    //                     )
    //                     .then(id => (userId = id))
    //                     .then(() => musicApi.authenticateUser(email, password))
    //                     .then(_token => (token = _token))
    //             );

    //             it("should succeed on correct data", () => {
    //                 return musicApi
    //                     .remove(token, email, password, passwordConfirmation)
    //                     .then(() => musicApi.retrieveUser(token))
    //                     .then(() => {
    //                         throw Error("should not pass by here");
    //                     })
    //                     .catch(({ message }) =>
    //                         expect(message).toBe(
    //                             `user with id \"${userId}\" does not exist`
    //                         )
    //                     );
    //             });

    //             // TODO more unit test cases
    //         });

    //     describe("search artists", () => {
    //         it("should succeed on mathing query", () => {
    //             const query = "madonna";

    //             return musicApi.searchArtists(query).then(artists => {
    //                 expect(artists).toBeDefined();
    //                 expect(artists instanceof Array).toBeTruthy();
    //                 expect(artists.length).toBeGreaterThan(0);

    //                 artists.forEach(({ name }) =>
    //                     expect(name.toLowerCase()).toContain(query)
    //                 );
    //             });
    //         });

    //         it("should fail on empty query", () => {
    //             const query = "";

    //             expect(() => musicApi.searchArtists(query)).toThrowError(
    //                 "query is empty"
    //             );
    //         });
    //     });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("retrieve artist", () => {
    //             it("should succeed on mathing query", () => {
    //                 const artistId = "6tbjWDEIzxoDsBA1FuhfPW"; // madonna

    //                 return musicApi
    //                     .retrieveArtist(artistId)
    //                     .then(({ id, name }) => {
    //                         expect(id).toBe(artistId);
    //                         expect(name).toBe("Madonna");
    //                     });
    //             });

    //             it("should fail on empty artistId", function() {
    //                 const artistId = "";

    //                 expect(() => musicApi.retrieveArtist(artistId)).toThrowError(
    //                     "artistId is empty"
    //                 );
    //             });
    //         });

    //     false &&
    //         describe("add comment to artist", () => {
    //             const name = "Manuel";
    //             const surname = "Barzi";
    //             const email = `manuelbarzi-${Math.random()}@mail.com`;
    //             const password = `password-${Math.random()}`;

    //             let userId, token;

    //             const artistId = "6tbjWDEIzxoDsBA1FuhfPW"; // madonna
    //             const text = `text ${Math.random()}`;

    //             beforeEach(() =>
    //                 musicApi
    //                     .registerUser(name, surname, email, password, password)
    //                     .then(id => (userId = id))
    //                     .then(() => musicApi.authenticateUser(email, password))
    //                     .then(_token => (token = _token))
    //             );

    //             it("should succeed on mathing query", () => {
    //                 return musicApi
    //                     .addCommentToArtist(token, artistId, text)
    //                     .then(id => {
    //                         expect(id).toBeDefined();
    //                         expect(typeof id === "string").toBeTruthy();
    //                     });
    //             });
    //         });

    //     false &&
    //         describe("list comments from artist", () => {
    //             const name = "Manuel";
    //             const surname = "Barzi";
    //             const email = `manuelbarzi-${Math.random()}@mail.com`;
    //             const password = `password-${Math.random()}`;

    //             let userId, token;

    //             const artistId = "6tbjWDEIzxoDsBA1FuhfPW"; // madonna
    //             const text = `text ${Math.random()}`;

    //             let commendId;

    //             beforeEach(() =>
    //                 musicApi
    //                     .registerUser(name, surname, email, password, password)
    //                     .then(id => (userId = id))
    //                     .then(() => musicApi.authenticateUser(email, password))
    //                     .then(_token => (token = _token))
    //                     .then(() =>
    //                         musicApi.addCommentToArtist(token, artistId, text)
    //                     )
    //                     .then(id => (commendId = id))
    //             );

    //             it("should succeed on mathing query", () =>
    //                 musicApi
    //                     .listCommentsFromArtist(token, artistId)
    //                     .then(comments => {
    //                         expect(comments.length).toBeGreaterThan(0);

    //                         const comment = comments.find(
    //                             ({ id }) => id === commendId
    //                         );

    //                         expect(comment.id).toBe(commendId);
    //                         expect(comment.userId).toBe(userId);
    //                         expect(comment.artistId).toBe(artistId);
    //                         expect(comment.text).toBe(text);
    //                         expect(comment.date).toBeDefined();
    //                         expect(comment.date instanceof Date).toBeTruthy();
    //                     }));
    //         });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("retrieve albums", () => {
    //             it("should succeed on mathing query", () => {
    //                 const artistId = "6tbjWDEIzxoDsBA1FuhfPW"; // madonna

    //                 return musicApi.retrieveAlbums(artistId).then(albums => {
    //                     expect(albums).toBeDefined();
    //                     expect(albums instanceof Array).toBeTruthy();
    //                     expect(albums.length).toBeGreaterThan(0);
    //                 });
    //             });

    //             it("should fail on empty artistId", function() {
    //                 const artistId = "";

    //                 expect(() => musicApi.retrieveAlbums(artistId)).toThrowError(
    //                     "artistId is empty"
    //                 );
    //             });
    //         });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("retrieve album", () => {
    //             it("should succeed on mathing query", () => {
    //                 const albumId = "4hBA7VgOSxsWOf2N9dJv2X"; // Rebel Heart Tour (Live)

    //                 return musicApi.retrieveAlbum(albumId).then(({ id, name }) => {
    //                     expect(id).toBe(albumId);
    //                     expect(name).toBe("Rebel Heart Tour (Live)");
    //                 });
    //             });

    //             it("should fail on empty albumId", function() {
    //                 const albumId = "";

    //                 expect(() => musicApi.retrieveAlbum(albumId)).toThrowError(
    //                     "albumId is empty"
    //                 );
    //             });
    //         });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("retrieve tracks", () => {
    //             it("should succeed on mathing query", () => {
    //                 const albumId = "4hBA7VgOSxsWOf2N9dJv2X"; // Rebel Heart Tour (Live)

    //                 return musicApi.retrieveTracks(albumId).then(tracks => {
    //                     expect(tracks).toBeDefined();
    //                     expect(tracks instanceof Array).toBeTruthy();
    //                     expect(tracks.length).toBeGreaterThan(0);
    //                 });
    //             });

    //             it("should fail on empty albumId", function() {
    //                 const albumId = "";

    //                 expect(() => musicApi.retrieveTracks(albumId)).toThrowError(
    //                     "albumId is empty"
    //                 );
    //             });
    //         });

    //     // TODO build endpoint for this in API first! (it does not exist yet)
    //     false &&
    //         describe("retrieve track", () => {
    //             it("should succeed on mathing query", () => {
    //                 const trackId = "5U1tMecqLfOkPDIUK9SVKa"; // Rebel Heart Tour Intro - Live
    //                 const trackName = "Rebel Heart Tour Intro - Live";

    //                 return musicApi.retrieveTrack(trackId).then(track => {
    //                     expect(track).toBeDefined();

    //                     const { id, name } = track;

    //                     expect(id).toBe(trackId);
    //                     expect(name).toBe(trackName);
    //                 });
    //             });

    //             it("should fail on empty trackId", function() {
    //                 const trackId = "";

    //                 expect(() => musicApi.retrieveTrack(trackId)).toThrowError(
    //                     "trackId is empty"
    //                 );
    //             });
    //         });

    afterAll(() =>
        Promise.all([User.deleteMany()]).then(() => mongoose.disconnect())
    );
});
