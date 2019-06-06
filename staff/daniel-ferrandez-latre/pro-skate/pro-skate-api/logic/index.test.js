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
const { expect } = require("chai");
const logic = require(".");
const argon2 = require("argon2");

const {
  env: { MONGO_URL_LOGIC_TEST: url }
} = process;

describe("logic", () => {
  let name, surname, email, imageUrl, password, age

  before(() => mongoose.connect(url, { useNewUrlParser: true }));
  after(async () => mongoose.disconnect());

  beforeEach(async () => {
    await User.deleteMany();
    name = `name-${Math.random()}`;
    surname = `surname-${Math.random()}`;
    email = `email-${Math.random()}@mail.com`;
    imageUrl = `http://-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    age = `${Math.floor(Math.random() * 100)}`;
  });

  describe("user test", () => {

    describe("register user", async ()=> {
      beforeEach( async ()=> User.deleteMany())

      it("should succeed on correct data", async function() {

        const res = await logic.registerUser(name, surname, email, password, age, imageUrl );
        expect(res).to.be.undefined;

        const users = await User.find();

        expect(users).to.exist;
        expect(users).to.have.lengthOf(1);
        const [user] = users;

        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        expect(user.imageUrl).to.equal(imageUrl);
        expect(user.password).to.exist;
        expect(user.age).to.equal(parseInt(age));
        expect(user.cart).to.be.an("array");
        expect(user.wishlist).to.be.an("array");
        expect(user.historic).to.be.an("array");
        expect(await argon2.verify(user.password, password)).to.be.true;
      });

      describe("on already existing user", () => {
        beforeEach(
          async () => await User.create({ name, surname, email, imageUrl, password, age })
        );

        it("should fail on retrying to register", async () => {
          try {
            await logic.registerUser(name, surname, email, password, age, imageUrl );
            throw Error("should not reach this point");
          } catch (error) {
            expect(error).not.to.be.undefined;
            expect(error).to.be.instanceOf(LogicError);
            expect(error.message).to.equal(`user with email "${email}" already exists`);
          }
        });
      });

      it("should fail on undefined name", () => {
        const name = undefined;

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          RequirementError,
          `name is not optional`
        );
      });

      it("should fail on empty name", () => {
        const name = "";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "name is empty"
        );
      });

      it("should fail on blank name", () => {
        const name = " \t    \n";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "name is empty"
        );
      });

      it("should fail on undefined surname", () => {
        const surname = undefined;

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          RequirementError,
          `surname is not optional`
        );
      });

      it("should fail on null surname", () => {
        const surname = null;

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          RequirementError,
          `surname is not optional`
        );
      });

      it("should fail on empty surname", () => {
        const surname = "";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "surname is empty"
        );
      });

      it("should fail on blank surname", () => {
        const surname = " \t    \n";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "surname is empty"
        );
      });

      it("should fail on undefined email", () => {
        const email = undefined;

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          RequirementError,
          `email is not optional`
        );
      });

      it("should fail on null email", () => {
        const email = null;

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          RequirementError,
          `email is not optional`
        );
      });

      it("should fail on empty email", () => {
        const email = "";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "email is empty"
        );
      });

      it("should fail on blank email", () => {
        const email = " \t    \n";

        expect(() => logic.registerUser(name, surname, email, password, age, imageUrl )).to.throw(
          ValueError,
          "email is empty"
        );
      });
    });

    describe("authenticate user", () => {
      beforeEach(async () => {
        const hash = await argon2.hash(password);
        await User.create({ name, surname, email, imageUrl, password: hash, age });
      });

      it("should succeed on correct credentials", async () => {
        const { sub: id, isAdmin } = await logic.authenticateUser(email, password);
        expect(id).to.exist;
        expect(id).to.be.a("string");
        expect(isAdmin).to.be.false

        const user = await User.findById(id);

        expect(id).to.equal(user.id);
      });

      it("should fail on non-existing user", async () => {
        try {
          await logic.authenticateUser((email = "unexisting-user@mail.com"), password);
          throw Error("should not reach this point");
        } catch (error) {
          expect(error).not.to.be.undefined;
          expect(error).to.be.instanceOf(LogicError);

          expect(error.message).to.equal(`user with email "${email}" does not exist`);
        }
      });

      it("should fail on undefined email", () => {
        const email = undefined;

        expect(() => logic.authenticateUser(email, password)).to.throw(
          RequirementError,
          `email is not optional`
        );
      });

      it("should fail on null email", () => {
        const email = null;

        expect(() => logic.authenticateUser(email, password)).to.throw(
          RequirementError,
          `email is not optional`
        );
      });

      it("should fail on empty email", () => {
        const email = "";

        expect(() => logic.authenticateUser(email, password)).to.throw(
          ValueError,
          "email is empty"
        );
      });

      it("should fail on blank email", () => {
        const email = " \t    \n";

        expect(() => logic.authenticateUser(email, password)).to.throw(
          ValueError,
          "email is empty"
        );
      });

      it("should fail on non-email email", () => {
        const nonEmail = "non-email";
        expect(() => logic.authenticateUser(nonEmail, password)).to.throw(
          FormatError,
          `${nonEmail} is not an e-mail`
        );
      });

      it("should fail on undefined password", () => {
        const password = undefined;

        expect(() => logic.authenticateUser(email, password)).to.throw(
          RequirementError,
          `password is not optional`
        );
      });

      it("should fail on null password", () => {
        const password = null;

        expect(() => logic.authenticateUser(email, password)).to.throw(
          RequirementError,
          `password is not optional`
        );
      });

      it("should fail on empty password", () => {
        const password = "";

        expect(() => logic.authenticateUser(email, password)).to.throw(
          ValueError,
          "password is empty"
        );
      });

      it("should fail on blank password", () => {
        const password = " \t    \n";

        expect(() => logic.authenticateUser(email, password)).to.throw(
          ValueError,
          "password is empty"
        );
      });
    });

    describe("retrieve user", () => {
      let user;

      beforeEach(
        async () =>
          (user = await User.create({
            name,
            surname,
            email,
            password: await argon2.hash(password),
            age
          }))
      );

      it("should succeed on correct id from existing user", async () => {
        const _user = await logic.retrieveUser(user.id);
        expect(_user.id).to.be.undefined;
        expect(_user.name).to.equal(name);
        expect(_user.surname).to.equal(surname);
        expect(_user.email).to.equal(email);
        expect(_user.age).to.equal(parseInt(age));
        expect(_user.password).to.be.undefined;
      });

      it("should fail on worn user id", async () => {
        const idUserDeleted = user.id;
        await User.findByIdAndDelete(user.id);
        try {
          await logic.retrieveUser(idUserDeleted);
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).not.to.be.undefined;
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`User with id ${idUserDeleted} doesn't exist`);
        }
      });

      it("should fail on undefined id", () => {
        const id = undefined;

        expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on null id", () => {
        const id = null;

        expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on empty id", () => {
        const id = "";

        expect(() => logic.retrieveUser(id)).to.throw(ValueError, "id is empty");
      });

      it("should fail on blank id", () => {
        const id = " \t    \n";

        expect(() => logic.retrieveUser(id)).to.throw(ValueError, "id is empty");
      });
    });

    describe("Update user", () => {
      User.deleteMany()
      let user, _user
      
      beforeEach(async () => {
        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });
      });

      it("should succeed on correct id from existing user", async () => {
        _name = `name-${Math.random()}`;
        _surname = `surname-${Math.random()}`;
        _email = `email-${Math.random()}@mail.com`;
        _password = `password-${Math.random()}`;
        _age = `${Math.floor(Math.random() * 100)}`;

        const isUserUpdated = await logic.updateUser(user.id, { name: _name, surname: _surname, email: _email, age: _age });
        _user = await User.findById(user.id);

        expect(isUserUpdated).to.be.true;
        expect(_user.id).to.equal(user.id);
        expect(_user.name).to.equal(_name);
        expect(_user.surname).to.equal(_surname);
        expect(_user.email).to.equal(_email);
        expect(_user.age).to.equal(parseInt(_age));
      });

      it("should fail unexinting user", async () => {
        const userDb = await User.findById(user.id).lean();

        await User.findOneAndDelete(user.id);
        try {
          await logic.updateUser(user.id, { name, surname, email, age });
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equal(`That user doesn't exist`);
        }
      });

      it("should fail on undefined id", () => {
        const id = undefined;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on null id", () => {
        const id = null;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on empty id", () => {
        const id = "";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });

      it("should fail on blank id", () => {
        const id = " \t    \n";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });

      it("should fail on undefined data", () => {
        const data = undefined;

        expect(() => logic.updateUser(user.id, data)).to.throw(
          RequirementError,
          `data is not optional`
        );
      });

      it("should fail on null data", () => {
        const data = null;

        expect(() => logic.updateUser(user.id, data)).to.throw(
          RequirementError,
          `data is not optional`
        );
      });
    });

    describe("Delete User", () => {
      let id;
      beforeEach(async () => {
        await User.create({ name, surname, email, password: await argon2.hash(password), age });
        const { _id } = await User.findOne({ email }).lean();

        id = _id.toString();
      });

      it("should delete user on correct id", async () => {
        const isDeletedUser = await logic.deleteUser(id);

        expect(isDeletedUser).to.be.true;
        const userDb = await User.findById(id);
        expect(userDb).to.be.null;
      });

      it("should fail on unexisting id", async () => {
        try {
          User.create({
            name,
            surname,
            email: "danbang@gmail.com",
            password: await argon2.hash(password),
            age
          });
          const userDb = await User.findOne({ email });
          const deletedUserId = userDb.id;
          await User.findByIdAndDelete(deletedUserId);
          await logic.deleteUser(deletedUserId);
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.exist;
        }
      });

      it("should fail on undefined id", () => {
        const id = undefined;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on null id", () => {
        const id = null;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on empty id", () => {
        const id = "";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });

      it("should fail on blank id", () => {
        const id = " \t    \n";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });
    });
  });

  describe("product test", () => {
    Product.deleteMany()
    let userId, prod_name, prod_imagesUrl, prod_description, prod_price, prod_tag, prod_imageUrlMain

    beforeEach(async () => {
      await Product.deleteMany();
      await User.create({
        name,
        surname,
        email,
        password: await argon2.hash(password),
        age,
        isAdmin: true
      });
      const { _id } = await User.findOne({ email }).lean();
      userId = _id.toString();

      prod_name = `name-${Math.random()}`;
      prod_imageUrlMain = `http://main-image${Math.random()}.com`;
      prod_imagesUrl = [
        `http://${Math.random()}.com`,
        `http://${Math.random()}.com`,
        `http://${Math.random()}.com`
      ];
      prod_description = `description-${Math.random()}`;
      prod_size = `${Math.floor(Math.random() * ((46 - 36) + 36))}`;
      prod_price = `${Math.floor(Math.random() * 100)}`;
      prod_tag = [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`];
    });

    describe("retrieve product", () => {
      beforeEach(async () => {
        await Product.create({
          name: prod_name,
          imageUrlMain : prod_imageUrlMain,
          imagesUrl: prod_imagesUrl,
          description: prod_description,
          size: prod_size,
          price: prod_price,
          tag: prod_tag
        });
      });

      it("should retrieve product on correct data", async () => {
        let productDb = await Product.findOne({ name: prod_name });
        productDb = await logic.retrieveProduct(productDb.id);
        expect(productDb).not.to.be.undefined;
        expect(productDb.id).not.to.be.undefined;
        expect(productDb.name).to.equal(prod_name);
        expect(productDb.imagesUrl).to.deep.equal(prod_imagesUrl);
        expect(productDb.description).to.equal(prod_description);
        expect(productDb.price).to.equal(parseInt(prod_price));
        expect(productDb.tag).to.deep.equal(prod_tag);
      });

      it("should fail to try to retrieve product on worn data", async () => {
        const { id: idDeletedPorduct } = await Product.findOne({ name: prod_name });
        await Product.findByIdAndDelete(idDeletedPorduct);
        try {
          await logic.retrieveProduct(idDeletedPorduct);
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`Product with id ${idDeletedPorduct} doesn't exist`);
        }
      });

      it("should fail on undefined id", () => {
        const id = undefined;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on null id", () => {
        const id = null;

        expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`);
      });

      it("should fail on empty id", () => {
        const id = "";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });

      it("should fail on blank id", () => {
        const id = " \t    \n";

        expect(() => logic.updateUser(id, {})).to.throw(ValueError, "id is empty");
      });
    });
    //To finish
    describe("retrieve all products", () => {
      let arrayAllProducts, arrayPromiseProducts;

      beforeEach(async () => {
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );
      });

      it("should retrieve all products on correct data", async () => {
        const allProducts = await logic.retrieveAllProducts();
        expect(allProducts).not.to.be.undefined;
        expect(allProducts).to.have.lengthOf(arrayAllProducts.length);

        allProducts.forEach(productDb => {
          const productPromise = arrayPromiseProducts.find(
            _product => _product.id === productDb.id
          );
          expect(productDb.id).to.equal(productPromise.id);
          expect(productDb.name).to.equal(productPromise.name);
          expect(productDb.imagesUrl).to.deep.equal(productPromise.imagesUrl);
          expect(productDb.tag).to.deep.equal(productPromise.tag);
          expect(productDb.price).to.equal(productPromise.price);
        });
      });

      it("should fail on trying to retrieve all products when product collection empty", async () => {
        await Product.deleteMany();
        const allProducts = await logic.retrieveAllProducts();
        expect(allProducts).to.be.empty;
      });
    });

    describe("toggle wishlist", () => {
      let arrayAllProducts, arrayPromiseProducts, user;

      beforeEach(async () => {
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );

        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });
      });

      it("should add to wishlist on correct data", async () => {
        const allProducts = await Product.find();
        const productId1 = allProducts[0].id;
        const productId2 = allProducts[1].id;
        const productId3 = allProducts[2].id;
        const productId4 = allProducts[3].id;

        await logic.toggleWhishProduct(user.id, productId4);
        await logic.toggleWhishProduct(user.id, productId4);
        await logic.toggleWhishProduct(user.id, productId1);
        await logic.toggleWhishProduct(user.id, productId2);
        await logic.toggleWhishProduct(user.id, productId3);

        user = await User.findById(user.id);
        expect(user.wishlist[0]._id.toString()).to.equal(productId1);
        expect(user.wishlist[1]._id.toString()).to.equal(productId2);
        expect(user.wishlist[2]._id.toString()).to.equal(productId3);
        expect(user.wishlist).to.have.lengthOf(3);
      });

      it("should fail on wrong userId", async () => {
        const idDeletedUser = user.id;
        User.findByIdAndDelete(idDeletedUser);

        const allProducts = await Product.find();
        const productId1 = allProducts[0].id;

        try {
          await logic.toggleWhishProduct(idDeletedUser, productId1);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeletedUser}" doesn't exists`);
        }
      });

      it("should fail on wrong productId", async () => {
        const allProducts = await Product.find();
        const idDeletedProduct = allProducts[0]._id.toString();
        Product.findByIdAndDelete(idDeletedProduct);

        try {
          await logic.toggleWhishProduct(user.id, idDeletedProduct);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`product with id "${idDeletedProduct}" doesn't exists`);
        }
      });

      it("should fail on wrong userId", async () => {
        const idDeletedUser = user.id;
        User.findByIdAndDelete(idDeletedUser);

        const allProducts = await Product.find();
        const productId1 = allProducts[0].id;

        try {
          await logic.toggleWhishProduct(idDeletedUser, productId1);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeletedUser}" doesn't exists`);
        }
      });
    });

    describe('retrieve wishlist', () => {
      let allProducts, arrayAllProducts, arrayPromiseProducts, _user, _productId1, _productId2, _productId3, _productId4

      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );
        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        _user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });
        
        allProducts = await Product.find();

        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];
        const productId4 = allProducts[3];

        let quantity1 = '1';
         _productId1 = productId1._id.toString();
        let quantity2 = '2';
        _productId2 = productId2._id.toString();
        let quantity3 = '3';
        _productId3 = productId3._id.toString();

        _productId4 = productId4._id.toString();



        await logic.toggleWhishProduct(_user.id, _productId1);
        await logic.toggleWhishProduct(_user.id, _productId2);
        await logic.toggleWhishProduct(_user.id, _productId3);
        await logic.toggleWhishProduct(_user.id, _productId4);
        await logic.toggleWhishProduct(_user.id, _productId4);

        await logic.addProductToCart(_user.id, _productId1, quantity1);
        await logic.addProductToCart(_user.id, _productId2, quantity2);
        await logic.addProductToCart(_user.id, _productId3, quantity3);

        await logic.checkoutCart(_user._id.toString())

      });

      it("should retrieve historic on correct user id", async () => {
        
        const _user_ = await User.findById(_user.id)
        const whishlistBd = await logic.retrieveWhishList(_user._id.toString())
        expect(whishlistBd[0]._id.toString()).to.equal(_user_.wishlist[0]._id.toString())
        expect(whishlistBd[1]._id.toString()).to.equal(_user_.wishlist[1]._id.toString())
        expect(whishlistBd[2]._id.toString()).to.equal(_user_.wishlist[2]._id.toString())
        
      });

      it("should fail on wrong userId", async () => {
        const _user_ = await User.findById(_user.id).lean()
        const idDeleted = _user_._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await logic.retrieveWhishList(idDeleted);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });
    });

    describe("add product to cart", () => {
      let arrayAllProducts, arrayPromiseProducts, user;

      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );

        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });
      });

      it("should add to cart on correct data", async () => {
        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];

        let quantity1 = '1';
        let _productId1 = productId1._id.toString();
        let quantity2 = '2';
        let _productId2 = productId2._id.toString();
        let quantity3 = '3';
        let _productId3 = productId3._id.toString();


        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId2, quantity2);
        await logic.addProductToCart(user.id, _productId3, quantity3);
        // await logic.addProductToCart(user.id, _productId3, quantity3);

        _user = await User.findById(user.id).lean();

        expect(_user.cart[0].productId._id.toString()).to.equal(_productId1)

        expect(_user.cart[0].quantity).to.equal(parseInt(quantity1));
        expect(_user.cart[1].productId._id.toString()).to.equal(_productId2)
        expect(_user.cart[1].quantity).to.equal(parseInt(quantity2));
        expect(_user.cart[2].productId._id.toString()).to.equal(_productId3)
        expect(_user.cart[2].quantity).to.equal(parseInt(quantity3));
        expect(_user.cart).to.have.lengthOf(3);


      });

      it("should update product quantity to cart on correct data", async () => {
        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];

        let quantity1 = '1';
        let _productId1 = productId1._id.toString();

        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId1, '4');

        _user = await User.findById(user.id).lean();

        expect(_user.cart[0].productId._id.toString()).to.equal(_productId1)
        expect(_user.cart[0].quantity).to.equal(parseInt('4'))
        expect(_user.cart).to.have.lengthOf(1)
      });

      it("should remove to cart on correct data", async () => {
        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];
        const productId4 = allProducts[4];
        let quantity1 = '1';
        let _productId1 = productId1._id.toString();
        let quantity2 = '2';
        let _productId2 = productId2._id.toString();
        let quantity3 = '3';
        let _productId3 = productId3._id.toString();
        let quantity4 = '4';
        let _productId4 = productId4._id.toString();

        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId2, quantity2);
        await logic.addProductToCart(user.id, _productId3, quantity3);
        await logic.addProductToCart(user.id, _productId3, '0');
        await logic.addProductToCart(user.id, _productId4, '5');
        await logic.addProductToCart(user.id, _productId4, '0');

        _user = await User.findById(user.id).lean();

        expect(_user.cart[0].productId._id.toString()).to.equal(_productId1)

        expect(_user.cart[0].quantity).to.equal(parseInt(quantity1))
        expect(_user.cart[1].productId._id.toString()).to.equal(_productId2)
        expect(_user.cart[1].quantity).to.equal(parseInt(quantity2))

        expect(_user.cart).to.have.lengthOf(2)
      });

      it("should fail on wrong userId", async () => {
        const idDeletedUser = user.id;
        User.findByIdAndDelete(idDeletedUser);

        const allProducts = await Product.find();
        const productId1 = allProducts[0].id;

        try {
          await logic.addProductToCart(idDeletedUser, productId1, '3');
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeletedUser}" doesn't exists`);
        }
      });

      it("should fail on wrong productId", async () => {
        const allProducts = await Product.find();
        const idDeletedProduct = allProducts[0]._id.toString();
        Product.findByIdAndDelete(idDeletedProduct);

        try {
          await logic.addProductToCart(user.id, idDeletedProduct, '5');
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`product with id "${idDeletedProduct}" doesn't exists`);
        }
      });

      it("should fail on undefined userId", () => {
        const id = undefined;

        expect(() => logic.addProductToCart(id, {})).to.throw(RequirementError, `idUser is not optional`);
      });

      it("should fail on null userId", () => {
        const id = null;

        expect(() => logic.addProductToCart(id, {})).to.throw(RequirementError, `idUser is not optional`);
      });

      it("should fail on empty userId", () => {
        const id = "";

        expect(() => logic.addProductToCart(id, {})).to.throw(ValueError, "idUser is empty");
      });

      it("should fail on blank userId", () => {
        const id = " \t    \n";

        expect(() => logic.addProductToCart(id, {})).to.throw(ValueError, "idUser is empty");
      });


    
    });

    describe('retrieve cart products', () => {
      let arrayAllProducts, arrayPromiseProducts, user, quantity1, quantity3, _productId1
      debugger
      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );

        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `melocoton`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });

        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];

        quantity1 = '1';
        _productId1 = productId1._id.toString();
        let quantity2 = '2';
        let _productId2 = productId2._id.toString();
        quantity3 = '3';
        let _productId3 = productId3._id.toString();
        debugger
        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId2, quantity2);
        await logic.addProductToCart(user.id, _productId3, quantity3);


      });

      it("should add to cart on correct data", async () => {
        _user = await User.findById(user.id).lean();
        const cart = await logic.retrieveCart(_user._id.toString())


        expect(cart[0].productId._id.toString())
        .to.equal(_user.cart[0].productId._id.toString())
        expect(cart[0].quantity).to.equal(parseInt(quantity1))
        expect(cart[0].quantity).to.equal(parseInt(quantity1))
        await logic.addProductToCart(_user._id.toString(), _productId1, quantity3);
        const _cart = await logic.retrieveCart(_user._id.toString())
        expect(_cart[0].quantity).to.equal(parseInt(quantity3))
        expect(_cart).to.have.lengthOf(3)
      });

      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await logic.retrieveCart(idDeleted);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('checkout cart products', () => {
      let arrayAllProducts, arrayPromiseProducts, user;

      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );
        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });

        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];

        let quantity1 = '1';
        let _productId1 = productId1._id.toString();
        let quantity2 = '2';
        let _productId2 = productId2._id.toString();
        let quantity3 = '3';
        let _productId3 = productId3._id.toString();

        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId2, quantity2);
        await logic.addProductToCart(user.id, _productId3, quantity3);


      });

      it("should checkout cart on correct data", async () => {
        
        const isCheckout = await logic.checkoutCart(user._id.toString())
        const _user = await User.findById(user.id)
        
        expect(isCheckout).to.be.true
        expect(_user.cart).not.to.have.length
        expect(_user.historic).to.have.lengthOf(3)
        
      });



      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await logic.checkoutCart(idDeleted);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('retrieve historic', () => {
      let arrayAllProducts, arrayPromiseProducts, user, _productId1, _productId2, _productId3

      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        arrayAllProducts = new Array(10).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
            })
        );

        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts.map(async product =>
            arrayPromiseProducts.push(await Product.create(product))
          )
        );
        name = `name-${Math.random()}`;
        surname = `surname-${Math.random()}`;
        email = `email-${Math.random()}@mail.com`;
        password = `password-${Math.random()}`;
        age = `${Math.floor(Math.random() * 100)}`;
        user = await User.create({
          name,
          surname,
          email,
          password: await argon2.hash(password),
          age
        });

        const allProducts = await Product.find();
        
        const productId1 = allProducts[0];
        const productId2 = allProducts[1];
        const productId3 = allProducts[2];

        let quantity1 = '1';
         _productId1 = productId1._id.toString();
        let quantity2 = '2';
        _productId2 = productId2._id.toString();
        let quantity3 = '3';
        _productId3 = productId3._id.toString();

        await logic.addProductToCart(user.id, _productId1, quantity1);
        await logic.addProductToCart(user.id, _productId2, quantity2);
        await logic.addProductToCart(user.id, _productId3, quantity3);

        await logic.checkoutCart(user._id.toString())

      });

      it("should retrieve historic on correct user id", async () => {
        
        const _user = await User.findById(user.id)
        const historic = await logic.retrieveHistoric(_user._id.toString())

        expect(historic[0].productId._id.toString()).to.equal(_user.historic[0].productId._id.toString())
        expect(historic[1].productId._id.toString()).to.equal(_user.historic[1].productId._id.toString())
        expect(historic[2].productId._id.toString()).to.equal(_user.historic[2].productId._id.toString())
        
      });

      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await logic.retrieveHistoric(idDeleted);
        } catch (err) {
          expect(err).to.instanceOf(LogicError);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('retrieve products by tag',  () => {
      let arrayAllProducts1, arrayAllProducts2, arrayAllProducts3, arrayPromiseProducts, user, tag1, tag2, tag3, tag4

      beforeEach(async () => {
        Product.deleteMany();
        User.deleteMany()
        tag1 = `tag1`
        tag2 = `tag2`
        tag3 = `tag3`
        tag4 = `tag4`

        arrayAllProducts1 = new Array(3).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [tag1]
            })
        );
 
        arrayAllProducts2 = new Array(3).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [tag1, tag2]
            })
        );

        arrayAllProducts3 = new Array(3).fill().map(
          product =>
            (product = {
              name: `name-${Math.random()}`,
              imageUrlMain: prod_imageUrlMain,
              imagesUrl: [
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`,
                `http://${Math.random()}.com`
              ],
              description: `description-${Math.random()}`,
              size: prod_size,
              price: `${Math.floor(Math.random() * 100)}`,
              tag: [tag1, tag2, tag3]
            })
        );
          
        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts1.map( async product =>
            arrayPromiseProducts.push(await Product.create(product)))
        );
        arrayPromiseProducts = [];

        await Promise.all(
          arrayAllProducts2.map( async product =>
            arrayPromiseProducts.push(await Product.create(product)))
        );
       
        arrayPromiseProducts = [];
        await Promise.all(
          arrayAllProducts3.map( async product =>
            arrayPromiseProducts.push(await Product.create(product)))
        );
        

        arrayAllProducts = await Product.find();
        });
  
        
        
        it("should retrieve products by tag on correct data", async () => {
          
          const productsDbTag1 = await logic.retrieveProductsByTag(tag1)
          expect(productsDbTag1[0].tag[0]).to.equal('tag1')
          expect(productsDbTag1[1].tag[0]).to.equal('tag1')
          expect(productsDbTag1[2].tag[0]).to.equal('tag1')
          expect(productsDbTag1[3].tag[0]).to.equal('tag1')
          expect(productsDbTag1[4].tag[0]).to.equal('tag1')
          expect(productsDbTag1[5].tag[0]).to.equal('tag1')
          expect(productsDbTag1[6].tag[0]).to.equal('tag1')
          expect(productsDbTag1[7].tag[0]).to.equal('tag1')
          expect(productsDbTag1[8].tag[0]).to.equal('tag1')

          expect(productsDbTag1).to.have.lengthOf(9)

          const productsDbTag2 = await logic.retrieveProductsByTag(tag2)

          expect(productsDbTag2[0].tag[1]).to.equal('tag2')
          expect(productsDbTag2[1].tag[1]).to.equal('tag2')
          expect(productsDbTag2[2].tag[1]).to.equal('tag2')
          expect(productsDbTag2[3].tag[1]).to.equal('tag2')
          expect(productsDbTag2[4].tag[1]).to.equal('tag2')
          expect(productsDbTag2[5].tag[1]).to.equal('tag2')

          expect(productsDbTag2).to.have.lengthOf(6)

          const productsDbTag3 = await logic.retrieveProductsByTag(tag3)

          expect(productsDbTag3[0].tag[2]).to.equal('tag3')
          expect(productsDbTag3[1].tag[2]).to.equal('tag3')
          expect(productsDbTag3[2].tag[2]).to.equal('tag3')

          expect(productsDbTag3).to.have.lengthOf(3)
   
        });
        
        it('should return undefined on wrong data', async ()=>{
          const productDbByTag = await logic.retrieveProductsByTag(tag4)
          const emptyArray = []
          expect(productDbByTag).to.lengthOf(0)
        })
    })

    describe('retrieve products by price',  () => {
          let arrayAllProducts1, arrayAllProducts2, arrayAllProducts3, arrayPromiseProducts, price1, price2, price3, price4
    
          beforeEach(async () => {
            Product.deleteMany();
            User.deleteMany()
            price1 = 50
            price2 = 100
            price3 = 150
            price4 = 200
    
            arrayAllProducts1 = new Array(3).fill().map(
              product =>
                (product = {
                  name: `name-${Math.random()}`,
                  imageUrlMain: prod_imageUrlMain,
                  imagesUrl: [
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`
                  ],
                  description: `description-${Math.random()}`,
                  size: prod_size,
                  price: price1,
                  tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
                })
            );
     
            arrayAllProducts2 = new Array(3).fill().map(
              product =>
                (product = {
                  name: `name-${Math.random()}`,
                  imageUrlMain: prod_imageUrlMain,
                  imagesUrl: [
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`
                  ],
                  description: `description-${Math.random()}`,
                  size: prod_size,
                  price: price2,
                  tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
                })
            );
    
            arrayAllProducts3 = new Array(3).fill().map(
              product =>
                (product = {
                  name: `name-${Math.random()}`,
                  imageUrlMain: prod_imageUrlMain,
                  imagesUrl: [
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`,
                    `http://${Math.random()}.com`
                  ],
                  description: `description-${Math.random()}`,
                  size: prod_size,
                  price: price3,
                  tag: [`tag1-${Math.random()}`, `tag2-${Math.random()}`, `tag3-${Math.random()}`]
                })
            );
              
            arrayPromiseProducts = [];
    
            await Promise.all(
              arrayAllProducts1.map( async product =>
                arrayPromiseProducts.push(await Product.create(product)))
            );
            arrayPromiseProducts = [];
    
            await Promise.all(
              arrayAllProducts2.map( async product =>
                arrayPromiseProducts.push(await Product.create(product)))
            );
           
            arrayPromiseProducts = [];
            await Promise.all(
              arrayAllProducts3.map( async product =>
                arrayPromiseProducts.push(await Product.create(product)))
            );
            
            arrayAllProducts = await Product.find();

            });
            
            it("should retrieve products by tag on correct data", async () => {
              
              const productsDbPrice1 = await logic.retrieveProductsByPrice(price1.toString())
              expect(productsDbPrice1[0].price).to.equal(price1)
              expect(productsDbPrice1[1].price).to.equal(price1)
              expect(productsDbPrice1[2].price).to.equal(price1)

              expect(productsDbPrice1).to.have.lengthOf(3)

              const productsDbPrice2 = await logic.retrieveProductsByPrice(price2.toString())
              expect(productsDbPrice2[0].price).to.equal(price2)
              expect(productsDbPrice2[1].price).to.equal(price2)
              expect(productsDbPrice2[2].price).to.equal(price2)

              expect(productsDbPrice2).to.have.lengthOf(3)

              const productsDbPrice3 = await logic.retrieveProductsByPrice(price3.toString())
              expect(productsDbPrice3[0].price).to.equal(price3)
              expect(productsDbPrice3[1].price).to.equal(price3)
              expect(productsDbPrice3[2].price).to.equal(price3)

              expect(productsDbPrice3).to.have.lengthOf(3)
    
            });
            
            it('should return undefined on wrong data', async ()=>{
              const productDbByPrice = await logic.retrieveProductsByPrice(price4.toString())
              expect(productDbByPrice).to.lengthOf(0)
            })

    });

  });

});
