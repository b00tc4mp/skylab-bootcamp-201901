"use strict";

import instaApi from ".";

describe("instaApi", () => {
  describe("register user", () => {
    const name = "Marc  ";
    const username = `hulio-${Math.random()}`;
    const email = `hulio-${Math.random()}@mail.com`;
    const password = `password-${Math.random()}`;

    it("should succeed on correct data", () =>
      instaApi
        .registerUser(name, username, email, password, password)
        .then(name => expect(name).toBeDefined()));

    it("should fail on already existing user", () =>
      instaApi
        .registerUser(name, username, email, password, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`user with email ${email} already exists`);
        }));

    it("should fail on non-matching password and its confirmation", () =>
      instaApi
        .registerUser(
          name,
          username,
          email,
          password,
          `non-matching ${password}`
        )
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe("passwords do not match");
        }));
  });

  describe("authenticate user", () => {
    const name = "Marc  ";
    const username = `hulio-${Math.random()}`;
    const email = `hulio-${Math.random()}@mail.com`;
    const password = `password-${Math.random()}`;

    beforeEach(() =>
      instaApi.registerUser(name, username, email, password, password)
    );

    it("should succeed on correct data", () =>
      instaApi
        .authenticateUser(email, password)
        .then(token => expect(token).toBeDefined()));
  });

  describe("retrieve user", () => {
    const name = "Marc  ";
    const username = `hulio-${Math.random()}`;
    const email = `hulio-${Math.random()}@mail.com`;
    const password = `password-${Math.random()}`;

    let _token;

    beforeEach(
      () =>
        instaApi
          .registerUser(name, username, email, password, password)
          .then(() => instaApi.authenticateUser(email, password))
          .then(({ token }) => {
            _token = token;
          })
      // .then(id => (userId = id))
      // .then(_token => (token = _token))
    );

    it("should succeed on correct data", () =>
      instaApi.retrieveUser(_token).then(user => {
        expect(user.name).toBe(name);
        expect(user.username).toBe(username);
        expect(user.email).toBe(email);
      }));
  });
});
