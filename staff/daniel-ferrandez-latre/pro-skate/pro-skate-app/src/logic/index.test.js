require("dotenv").config();

const { mongoose, models } = require("pro-skate-data");
const { User, Product } = models;

const {
  errors: {
  LogicError,
  RequirementError,
  ValueError,
  FormatError,
  UnauthorizedError
  }
} = require("pro-skate-common");
const chai = require("chai");
const { expect } = chai;
const dataApi = require(".");
const argon2 = require("argon2");

const {
  env: { MONGO_URL_LOGIC_TEST: url }
} = process;

describe("logic", () => {
  let name, surname, email, imageUrl, _password, age

  before(() => mongoose.connect(url, { useNewUrlParser: true }));
  after(async () => mongoose.disconnect());

})