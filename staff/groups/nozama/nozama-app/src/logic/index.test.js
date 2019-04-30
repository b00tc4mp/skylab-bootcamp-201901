import userApi from '../data/user-api';
import logic from '.';
import { RequirementError } from '../common/errors';
import productApi from '../data/product-api';

const randomString = (length = 20) => Number(Math.random() * 9 ** length).toString(35);

describe('logic', () => {
  describe('logicUser', () => {
    let name, surname, password, email;
    let id, token;

    beforeEach(() => {
      name = randomString();
      surname = randomString();
      password = randomString();
      email = `${randomString()}@mail.com`;
    });

    describe('registerUser', () => {
      it('should register a new user data on correct params', () => {
        return logic
          .registerUser(email, password, name, surname)
          .then(res => expect(res).toBe(undefined))
          .then(() => userApi.auth(email, password))
          .then(res => {
            const {
              data: { id, token },
            } = res;
            return userApi.retrieve(id, token);
          })
          .then(res => {
            const { data } = res;
            expect(data.username).toBe(email);
            expect(data.password).toBeUndefined();
            expect(data.name).toBe(name);
            expect(data.surname).toBe(surname);
          });
      });

      describe('fail param', () => {
        it('must return a promise', () =>
          expect(
            logic.registerUser(email, password, name, surname) instanceof Promise
          ).toBeTruthy());

        it('fails if no email', () =>
          expect(() => logic.registerUser(undefined, password, name, surname)).toThrowError(
            new RequirementError(`email is not optional`)
          ));

        it('fails if email is blank', () =>
          expect(() => logic.registerUser('  \t\n', password, name, surname)).toThrowError(
            Error(`email is empty`)
          ));

        it('fails if no password', () =>
          expect(() => logic.registerUser(email, undefined, name, surname)).toThrowError(
            new RequirementError(`password is not optional`)
          ));

        it('fails if password is blank', () =>
          expect(() => logic.registerUser(email, '  \t\n', name, surname)).toThrowError(
            Error(`password is empty`)
          ));

        it('fails if no name', () =>
          expect(() => logic.registerUser(email, password, undefined, surname)).toThrowError(
            new RequirementError(`name is not optional`)
          ));

        it('fails if name is blank', () =>
          expect(() => logic.registerUser(email, password, '  \t\n', surname)).toThrowError(
            Error(`name is empty`)
          ));

        it('fails if no surname', () =>
          expect(() => logic.registerUser(email, password, name, undefined)).toThrowError(
            new RequirementError(`surname is not optional`)
          ));

        it('fails if surname is blank', () =>
          expect(() => logic.registerUser(email, password, name, '  \t\n')).toThrowError(
            Error(`surname is empty`)
          ));
      });
    });

    describe('loginUser', () => {
      it('must login on correct user data', () =>
        userApi
          .create(email, password, { name, surname })
          .then(res => expect(res.status).toBe('OK'))
          .then(() => logic.loginUser(email, password))
          .then(res => {
            expect(typeof res).toBe('boolean');
            expect(res).toBeTruthy();
            expect(typeof logic.userId).toBe('string');
            expect(typeof logic.token).toBe('string');
          }));

      describe('fails with wrong data', () => {
        beforeEach(() =>
          userApi
            .create(email, password, { name, surname })
            .then(res => expect(res.status).toBe('OK'))
        );

        it('must return an error message on wrong user data', () => {
          const wrongUsername = randomString();
          return logic.loginUser(wrongUsername, password).then(res => {
            expect(typeof res).toBe('string');
            expect(res).toBe(`user with username "${wrongUsername}" does not exist`);
            expect(logic.userId).toBeNull();
            expect(logic.token).toBeNull();
          });
        });

        it('must return an error message on wrong user password', () => {
          const wrongPassword = randomString();
          return logic.loginUser(email, wrongPassword).then(res => {
            expect(typeof res).toBe('string');
            expect(res).toBe('username and/or password wrong');
            expect(logic.userId).toBeNull();
            expect(logic.token).toBeNull();
          });
        });
      });

      describe('fail param', () => {
        it('must return a promise', () =>
          userApi
            .create(email, password, { name, surname })
            .then(res => expect(res.status).toBe('OK'))
            .then(() => expect(logic.loginUser(email, password) instanceof Promise).toBeTruthy()));

        it('fails if no email', () =>
          expect(() => logic.loginUser(undefined, password)).toThrowError(
            new RequirementError(`email is not optional`)
          ));

        it('fails if email is blank', () =>
          expect(() => logic.loginUser('  \t\n', password)).toThrowError(Error(`email is empty`)));

        it('fails if no password', () =>
          expect(() => logic.loginUser(email, undefined)).toThrowError(
            new RequirementError(`password is not optional`)
          ));

        it('fails if password is blank', () =>
          expect(() => logic.loginUser(email, '  \t\n')).toThrowError(Error(`password is empty`)));
      });
    });

    describe('retrieveUser', () => {
      it('must retrieve on correct user data', () =>
        userApi
          .create(email, password, {
            name,
            surname,
          })
          .then(({ status }) => expect(status).toBe('OK'))
          .then(() => userApi.auth(email, password))
          .then(res => {
            expect(res.status).toBe('OK');
            logic.userId = res.data.id;
            logic.token = res.data.token;
          })
          .then(() => logic.retrieveUser())
          .then(user => {
            const originalUser = {
              name,
              surname,
              username: email,
              id: logic.userId,
            };
            expect(user).toEqual(originalUser);
          }));
    });
  });

  describe('logic-product', () => {
    function expectsProduct(product) {
      const {
        imageSmall,
        imageLarge,
        productId,
        modelNumber,
        displayProductId,
        productName,
        subtitle,
        originalPrice,
        displayCurrency,
        isNew,
        isSale,
        isSoldOut,
        isExclusive,
        isAppExclusive,
        isEarlyAccess,
        orderable,
        badgeText,
        badgeColor,
        badgeType,
        purchaseLimit,
        isPreorderable,
        commingSoonDate,
        pushTag,
      } = product;
      expect(typeof imageSmall).toBe('string');
      expect(typeof imageLarge).toBe('string');
      expect(typeof productId).toBe('string');
      expect(typeof modelNumber).toBe('string');
      expect(typeof displayProductId).toBe('string');
      expect(typeof productName).toBe('string');
      expect(typeof subtitle).toBe('string');
      expect(typeof originalPrice).toBe('number');
      expect(typeof displayCurrency).toBe('string');
      expect(typeof isNew).toBe('boolean');
      expect(typeof isSale).toBe('boolean');
      expect(typeof isSoldOut).toBe('boolean');
      expect(typeof isExclusive).toBe('boolean');
      expect(typeof isAppExclusive).toBe('boolean');
      expect(typeof isEarlyAccess).toBe('boolean');
      expect(typeof orderable).toBe('boolean');
      expect(typeof badgeText).toBe('string');
      expect(typeof badgeColor).toBe('string');
      expect(typeof badgeType).toBe('string');
      expect(typeof purchaseLimit).toBe('number');
      expect(typeof isPreorderable).toBe('boolean');
      expect(commingSoonDate instanceof Date).toBeTruthy();
      expect(typeof pushTag).toBe('string');
    }

    function expectsDetail(productDetail) {
      const {
        campaign,
        relatedProducts,
        productRecommendations,
        variationsRef,
        imageSmall,
        imagesSmall,
        imageLarge,
        imagesLarge,
        isMi,
        productId,
        modelNumber,
        productName,
        subtitle,
        countOfColors,
        originalPrice,
        displayCurrency,
        isNew,
        isSale,
        isSoldOut,
        isExclusive,
        orderable,
        badgeText,
        badgeColor,
        badgeType,
        purchaseLimit,
        isPreorderable,
        isBackorderable,
        commingSoonDate,
        isCommingSoon,
        pushTag,
        category,
        productType,
        sizeCategory,
        stockLevel,
        lowOnStockMessage,
        colorName,
        searchColor,
        color1Hex,
        color2Hex,
        gender,
        outOfStockAllSizes,
        outOfStockAllColors,
        descriptionHeadline,
        shortDescription,
        descriptionBullets,
        modelInfo,
        variations,
      } = productDetail;
      if (campaign) expect(typeof campaign).toBe('string');
      if (relatedProducts) expect(typeof relatedProducts).toBe('string');
      if (productRecommendations) expect(typeof productRecommendations).toBe('string');
      if (variationsRef) expect(typeof variationsRef).toBe('string');
      expect(typeof imageSmall).toBe('string');
      expect(imagesSmall instanceof Array).toBeTruthy();
      expect(typeof imageLarge).toBe('string');
      expect(imagesLarge instanceof Array).toBeTruthy();
      expect(typeof isMi).toBe('boolean');
      expect(typeof productId).toBe('string');
      expect(typeof modelNumber).toBe('string');
      expect(typeof productName).toBe('string');
      expect(typeof subtitle).toBe('string');
      expect(typeof countOfColors).toBe('number');
      expect(typeof originalPrice).toBe('number');
      expect(typeof displayCurrency).toBe('string');
      expect(typeof isNew).toBe('boolean');
      expect(typeof isSale).toBe('boolean');
      expect(typeof isSoldOut).toBe('boolean');
      expect(typeof isExclusive).toBe('boolean');
      expect(typeof orderable).toBe('boolean');
      expect(typeof badgeText).toBe('string');
      expect(typeof badgeColor).toBe('string');
      expect(typeof badgeType).toBe('string');
      expect(typeof purchaseLimit).toBe('number');
      expect(typeof isPreorderable).toBe('boolean');
      expect(typeof isBackorderable).toBe('boolean');
      expect(commingSoonDate instanceof Date).toBeTruthy();
      expect(typeof isCommingSoon).toBe('boolean');
      expect(typeof pushTag).toBe('string');
      expect(typeof category).toBe('string');
      expect(productType instanceof Array).toBeTruthy();
      expect(typeof sizeCategory).toBe('string');
      expect(typeof stockLevel).toBe('number');
      expect(typeof lowOnStockMessage).toBe('string');
      expect(typeof colorName).toBe('string');
      expect(searchColor instanceof Array).toBeTruthy();
      expect(typeof color1Hex).toBe('string');
      expect(typeof color2Hex).toBe('string');
      expect(typeof gender).toBe('string');
      expect(typeof outOfStockAllSizes).toBe('boolean');
      expect(typeof outOfStockAllColors).toBe('boolean');
      expect(typeof descriptionHeadline).toBe('string');
      expect(typeof shortDescription).toBe('string');
      expect(descriptionBullets instanceof Array).toBeTruthy();
      if (modelInfo) expect(typeof modelInfo).toBe('string');
      expect(variations instanceof Array).toBeTruthy();
      variations.forEach(item => {
        expect(typeof item.size).toBe('string')
        expect(typeof item.orderable).toBe('boolean')
        expect(typeof item.productId).toBe('string')
        expect(typeof item.stockLevel).toBe('number')
        expect(typeof item.stockStatus).toBe('string')
      })
    }
    it('should retrieve all objects with proper equivalence of properties', () => {
      logic.allProducts().then(products => {
        products.forEach(product => {
          expectsProduct(product);
        });
      });
    });

    it('should retrieve products from text search with proper equivalence of properties', () => {
      logic.searchProduct("Shoes").then(products => {
        products.forEach(product => {
          expectsProduct(product);
        });
        return products;
      });
    });

    it('should retrieve one object by product_id with proper equivalence of properties', () => {
      let randomProductId;
      productApi
        .all()
        .then(products => products.map(product => product.product_id))
        .then(productsId => {
          randomProductId = productsId[Math.floor(Math.random() * productsId.length)];
          return logic.findProduct(randomProductId);
        })
        .then(product => {
          expect(product.productId).toBe(randomProductId);
          expectsProduct(product);
        });
    });

    it('should retrieve the details of one product with proper equivalence of properties', () => {
      let randomProductId;
      let infoProduct;
      return productApi
        .all()
        .then(products => products.map(product => product.product_id))
        .then(productsId => {
          randomProductId = productsId[Math.floor(Math.random() * productsId.length)];
          return logic.findProduct(randomProductId);
        })
        .then(_infoProduct => (infoProduct = _infoProduct))
        .then(() => logic.detailProduct(randomProductId))
        .then(productDetail => {
          expectsDetail(productDetail);
        });
    });
  });
});
