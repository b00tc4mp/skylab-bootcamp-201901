
const { mongoose, models: { User, Product } } = require("pro-skate-data");
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
require('dotenv').config()
const {
  env: { MONGO_URL_LOGIC_TEST: url }
} = process;

describe("data-api", () => {
  let name, surname, email, imageUrl, _password, age

  before(() => mongoose.connect(url, { useNewUrlParser: true }));
  after(async () => mongoose.disconnect());

  beforeEach(async () => {
    await User.deleteMany();
    name = `name-${Math.random()}`;
    surname = `surname-${Math.random()}`;
    email = `email-${Math.random()}@mail.com`;
    imageUrl = `http://-${Math.random()}@mail.com`;
    _password = `password-${Math.random()}`;
    age = `${Math.floor(Math.random() * 100)}`;
  });

  describe("user test", () => {

    describe("create user", async ()=> {
      beforeEach( async ()=> {
        User.deleteMany()

      })

      it.only("should succeed on correct data", async function() {

        const res = await dataApi.createUser(name, surname, email, _password, age, imageUrl );
        const { message } = res
        expect(message).to.equal('Ok, user registered.');

        const users = await User.find();

        expect(users).to.exist;
        expect(users).to.have.lengthOf(1);
        const [user] = users;

        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        // expect(user.imageUrl).to.equal(imageUrl);
        expect(user.password).to.exist;
        expect(user.age).to.equal(parseInt(age));
        expect(user.cart).to.be.an("array");
        expect(user.wishlist).to.be.an("array");
        expect(user.historic).to.be.an("array");
        expect(await argon2.verify(user.password, _password)).to.be.true;
      });

      describe("on already existing user", () => {

        beforeEach(
          async () => {
            await User.create({ name, surname, email, password: _password, age, imageUrl}) 
        });

        it("should fail on retrying to register", async () => {
          try {
              await dataApi.createUser(name, surname, email, _password, age, imageUrl );
            throw Error("should not reach this point");
          } catch (error) {
            expect(error).not.to.be.undefined;
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with email "${email}" already exists`);
          }
        });

      });

    });

    describe("authenticate user", () => {
      beforeEach(async () => {
        const hash = await argon2.hash(_password);
        await User.create({ name, surname, email, imageUrl, password: hash, age });
      });
  
      it("should succeed on correct credentials", async () => {
        
        const token  = await dataApi.authenticate(email, _password);
  
        expect(token).to.exist;
        expect(token).to.be.a("string");
  
      });
  
      it("should fail on non-existing user", async () => {
        try {
          await dataApi.authenticate((email = "unexisting-user@mail.com"), _password);
          throw Error("should not reach this point");
        } catch (error) {
          expect(error).not.to.be.undefined;
          expect(error).to.be.instanceOf(Error);
          expect(error.message).to.equal(`user with email "${email}" does not exist`);
        }
      });
    });
  
    describe("retrieve user", () => {
      let user, token
  
      beforeEach(async () => {
        user = await User.create({name, surname, email, password: await argon2.hash(_password), age})
        token  = await dataApi.authenticate(email, _password)
    });
  
      it("should succeed on correct id from existing user", async () => {
        
        const _user = await dataApi.retrieveUser(token);
        expect(_user.id).to.be.undefined;
        expect(_user.name).to.equal(name);
        expect(_user.surname).to.equal(surname);
        expect(_user.email).to.equal(email);
        expect(_user.age).to.equal(parseInt(age));
        expect(_user.password).to.be.undefined;
      });
    });
  
    describe("update user", () => {
      User.deleteMany()
      let user, _user, token
      
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
        token = await dataApi.authenticate(email, password)
        
  
      });
  
      it("should succeed on update user correct id from existing user", async () => {
        const _name = `name-updated-${Math.random()}`;
        const _surname = `surname-${Math.random()}`;
        const _email = `email-${Math.random()}@mail.com`;
        const _age = `${Math.floor(Math.random() * 100)}`;
  
        await dataApi.updateUser(token,  _name,  _surname,  _email, _age );
        const _user_ = await User.findOne({ name: _name });
  
        
        expect(_user_.name).to.equal(_name);
        expect(_user_.surname).to.equal(_surname);
        expect(_user_.email).to.equal(_email);
        expect(_user_.age).to.equal(parseInt(_age));
      });
  
      it("should fail unexinting user", async () => {
  
        const _name = `name-updated-${Math.random()}`;
        const _surname = `surname-${Math.random()}`;
        const _email = `email-${Math.random()}@mail.com`;
        const _age = `${Math.floor(Math.random() * 100)}`;
  
        await User.findOneAndDelete(user.id);
        try {
          await dataApi.updateUser(token,  _name, surname, _email, _age );
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equal(`That user doesn't exist`);
        }
      });
  
    });
  
    describe("Delete User", () => {
      let token
      beforeEach(async () => {
        await User.create({ name, surname, email, password: await argon2.hash(_password), age });
        token = await dataApi.authenticate( email,  _password )
  
      });
  
      it("should delete user on correct token", async () => {
        await dataApi.deleteUser(token);
  
        const userDb = await User.findOne({ email });
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
          await dataApi.deleteUser(token);
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equals(`This user doesn't exist`);
        }
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
        password: _password,
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
        const _productDb = await dataApi.retrieveProduct(productDb._id.toString());
        expect(_productDb).not.to.be.undefined;
        expect(_productDb._id).not.to.be.undefined;
        expect(productDb.imagesUrl).to.deep.equal(prod_imagesUrl);
        expect(productDb.description).to.equal(prod_description);
        expect(productDb.price).to.equal(parseInt(prod_price));
        expect(productDb.tag).to.deep.equal(prod_tag);
      });

      it("should fail to try to retrieve product on worn data", async () => {
        const { id: idDeletedPorduct } = await Product.findOne({ name: prod_name });
        await Product.findByIdAndDelete(idDeletedPorduct);
        try {
          await dataApi.retrieveProduct(idDeletedPorduct);
          throw Error("should not reach this point");
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`Product with id ${idDeletedPorduct} doesn't exist`);
        }
      });
    });

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
        const allProducts = await dataApi.retrieveAllProducts();
        expect(allProducts).not.to.be.undefined;
        expect(allProducts).to.have.lengthOf(arrayAllProducts.length);

      });

      it("should fail on trying to retrieve all products when product collection empty", async () => {
        await Product.deleteMany();
        const allProducts = await dataApi.retrieveAllProducts();
        expect(allProducts).to.be.empty;
      });
    });

    describe("toggle wishlist", () => {
      let arrayAllProducts, arrayPromiseProducts, user, token

      beforeEach(async () => {
        User.deleteMany()
        Product.deleteMany()
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

        token = await dataApi.authenticate( email, password ) 

      });

      it("should add to wishlist on correct data", async () => {
      
        const allProducts = await Product.find();
        const productId1 = allProducts[0].id;
        const productId2 = allProducts[1].id;
        const productId3 = allProducts[2].id;
        const productId4 = allProducts[3].id;

        await dataApi.toggleWhishProduct( token , productId4);
        await dataApi.toggleWhishProduct( token , productId4);
        await dataApi.toggleWhishProduct( token , productId1);
        await dataApi.toggleWhishProduct( token , productId2);
        await dataApi.toggleWhishProduct( token , productId3);

        user = await User.findById(user.id);
        expect(user.wishlist[0]._id.toString()).to.equal(productId1);
        expect(user.wishlist[1]._id.toString()).to.equal(productId2);
        expect(user.wishlist[2]._id.toString()).to.equal(productId3);
        expect(user.wishlist).to.have.lengthOf(3);

      });




    });

    describe('retrieve wishlist', () => {
      let allProducts, arrayAllProducts, arrayPromiseProducts, _user, _productId1, _productId2, _productId3, _productId4, token

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
        
        token = await dataApi.authenticate( email, password ) 

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



        await dataApi.toggleWhishProduct(token, _productId1);
        await dataApi.toggleWhishProduct(token, _productId2);
        await dataApi.toggleWhishProduct(token, _productId3);
        await dataApi.toggleWhishProduct(token, _productId4);
        await dataApi.toggleWhishProduct(token, _productId4);

      });

      it("should retrieve historic on correct user id", async () => {
        
        const _user_ = await User.findById(_user.id)
        const whishlistBd = await dataApi.retrieveWishList( token )
        expect(whishlistBd[0]._id.toString()).to.equal(_user_.wishlist[0]._id.toString())
        expect(whishlistBd[1]._id.toString()).to.equal(_user_.wishlist[1]._id.toString())
        expect(whishlistBd[2]._id.toString()).to.equal(_user_.wishlist[2]._id.toString())
        
      });

      it("should fail on wrong userId", async () => {
        const _user_ = await User.findById(_user.id).lean()
        const idDeleted = _user_._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await dataApi.retrieveWishList(token);
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });
    });

    describe("add product to cart", () => {
      let arrayAllProducts, arrayPromiseProducts, user, token

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
        token = await dataApi.authenticate( email, password ) 
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


        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId2, quantity2);
        await dataApi.addProductToCart( token , _productId3, quantity3);
       

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

        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId1, '4');

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

        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId2, quantity2);
        await dataApi.addProductToCart( token , _productId3, quantity3);
        await dataApi.addProductToCart( token , _productId3, '0');
        await dataApi.addProductToCart( token , _productId4, '5');
        await dataApi.addProductToCart( token , _productId4, '0');

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
          await dataApi.addProductToCart( token , productId1, '3');
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`user with id "${idDeletedUser}" doesn't exists`);
        }
      });

      it("should fail on wrong productId", async () => {
        const allProducts = await Product.find();
        const idDeletedProduct = allProducts[0]._id.toString();
        Product.findByIdAndDelete(idDeletedProduct);

        try {
          await dataApi.addProductToCart(token, idDeletedProduct, '5');
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`product with id "${idDeletedProduct}" doesn't exists`);
        }
      });

    
    });

    describe('retrieve cart products', () => {
      let arrayAllProducts, arrayPromiseProducts, user, quantity1, quantity3, _productId1, token
      
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
        
        token = await dataApi.authenticate( email, password ) 
        
        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId2, quantity2);
        await dataApi.addProductToCart( token , _productId3, quantity3);

      });

      it("should add to cart on correct data", async () => {
        _user = await User.findById(user.id).lean();
        const cart = await dataApi.retrieveCart(token)


        expect(cart[0].productId._id.toString())
        .to.equal(_user.cart[0].productId._id.toString())
        expect(cart[0].quantity).to.equal(parseInt(quantity1))
        expect(cart[0].quantity).to.equal(parseInt(quantity1))
        await dataApi.addProductToCart( token , _productId1, quantity3);
        const _cart = await dataApi.retrieveCart(token)
        expect(_cart[0].quantity).to.equal(parseInt(quantity3))
        expect(_cart).to.have.lengthOf(3)
      });

      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await dataApi.retrieveCart(token);
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('checkout cart products', () => {
      let arrayAllProducts, arrayPromiseProducts, user, token

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

        token = await dataApi.authenticate( email, password ) 

        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId2, quantity2);
        await dataApi.addProductToCart( token , _productId3, quantity3);


      });

      it("should checkout cart on correct data", async () => {
        
        await dataApi.checkoutCart(token)
        const _user = await User.findById(user.id)
        
        expect(_user.cart).not.to.have.length
        expect(_user.historic).to.have.lengthOf(3)
        
      });



      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)
        try {
          await dataApi.checkoutCart(token);
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('retrieve historic', () => {
      let arrayAllProducts, arrayPromiseProducts, user, _productId1, _productId2, _productId3, token

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

        token = await dataApi.authenticate( email, require('dotenv').config() ) 

        await dataApi.addProductToCart( token , _productId1, quantity1);
        await dataApi.addProductToCart( token , _productId2, quantity2);
        await dataApi.addProductToCart( token , _productId3, quantity3);

        await dataApi.checkoutCart( token )

      });

      it("should retrieve historic on correct user id", async () => {
        
        const _user = await User.findById(user.id)
        const historic = await dataApi.retrieveHistoric(token)

        expect(historic[0].productId._id.toString()).to.equal(_user.historic[0].productId._id.toString())
        expect(historic[1].productId._id.toString()).to.equal(_user.historic[1].productId._id.toString())
        expect(historic[2].productId._id.toString()).to.equal(_user.historic[2].productId._id.toString())
        
      });

      it("should fail on wrong userId", async () => {
        const _user = await User.findById(user.id).lean()
        const idDeleted = _user._id.toString()
        await User.findByIdAndDelete(idDeleted)

        try {
          await dataApi.retrieveHistoric(token);
        } catch (err) {
          expect(err).to.instanceOf(Error);
          expect(err.message).to.equal(`user with id "${idDeleted}" doesn't exists`);
        }
      });

    });

    describe('retrieve products by tag',  () => {
      let arrayAllProducts1, arrayAllProducts2, arrayAllProducts3, arrayPromiseProducts, user, tag1, tag2, tag3, tag4, token

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
          
          const productsDbTag1 = await dataApi.retrieveProductsByTag(tag1)
          
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

          const productsDbTag2 = await dataApi.retrieveProductsByTag(tag2)

          expect(productsDbTag2[0].tag[1]).to.equal('tag2')
          expect(productsDbTag2[1].tag[1]).to.equal('tag2')
          expect(productsDbTag2[2].tag[1]).to.equal('tag2')
          expect(productsDbTag2[3].tag[1]).to.equal('tag2')
          expect(productsDbTag2[4].tag[1]).to.equal('tag2')
          expect(productsDbTag2[5].tag[1]).to.equal('tag2')

          expect(productsDbTag2).to.have.lengthOf(6)

          const productsDbTag3 = await dataApi.retrieveProductsByTag(tag3)

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



  });



});

