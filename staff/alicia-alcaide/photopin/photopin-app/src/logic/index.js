const validate = require("photopin-validate");
const { LogicError, UnauthorizedError } = require("photopin-errors");
const photopinApi = require("../photopin-api");

const logic = {
  __userToken__: null,

  get isUserLoggedIn() {
    return !!this.__userToken__;
  },

  registerUser(name, surname, email, password) {
    validate.arguments([
      { name: "name", value: name, type: "string", notEmpty: true },
      { name: "surname", value: surname, type: "string", notEmpty: true },
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true }
    ]);

    validate.email(email);

    return (async () => {
      try {
        await photopinApi.registerUser(name, surname, email, password);
      } catch (error) {
        throw new LogicError(error);
      }
    })();
  },

  loginUser(email, password) {
    validate.arguments([
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true }
    ]);

    validate.email(email);

    return (async () => {
      try {
        const res = await photopinApi.authenticateUser(email, password);

        this.__userToken__ = res.token;
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  logoutUser() {
    this.__userToken__ = null;
    sessionStorage.clear();
  },

  retrieveUser() {
    return (async () => {
      try {
        return await photopinApi.retrieveUser(this.__userToken__);
      } catch (error) {
        throw new LogicError(error);
      }
    })();
  },

  updateUser(data) {
    validate.arguments([{ name: "data", value: data, type: "object", notEmpty: true }]);

    return (async () => {
      try {
        await photopinApi.updateUser(this.__userToken__, data);
      } catch (error) {
        throw new LogicError(error);
      }
    })();
  },

  removeUser() {
    return (async () => {
      try {
        await photopinApi.removeUser(this.__userToken__);
      } catch (error) {
        throw new LogicError(error);
      }
    })();
  },

  //--------------------------- PDTE TEST ------------------------------------------------

  retrieveUserMaps() {
    return (async () => {
      try {
        return await photopinApi.retrieveUserMaps(this.__userToken__);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  retrieveUserMap(mapId) {
    validate.arguments([{ name: "mapId", value: mapId, type: "string", notEmpty: true }]);

    return (async () => {
      try {
        return await photopinApi.retrieveUserMap(this.__userToken__, mapId);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  createMap(title, description, coverImage) {
    validate.arguments([
      { name: "title", value: title, type: "string", notEmpty: true },
      { name: "description", value: description, type: "string" },
      { name: "coverImage", value: coverImage, type: "string" }
    ]);

    return (async () => {
      try {
        return await photopinApi.createMap(this.__userToken__, title, description, coverImage);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  createCollection(mapId, title) {
    validate.arguments([
      { name: "mapId", value: mapId, type: "string", notEmpty: true },
      { name: "title", value: title, type: "string", notEmpty: true }
    ]);

    return (async () => {
      try {
        return await photopinApi.createCollection(this.__userToken__, mapId, title);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  createPin(mapId, collectionTitle, newPin) {
    validate.arguments([
      { name: "mapId", value: mapId, type: "string", notEmpty: true },
      { name: "collectionTitle", value: collectionTitle, type: "string", notEmpty: true },
      { name: "newPin", value: newPin, type: "object", notEmpty: true }
    ]);

    return (async () => {
      try {
        return await photopinApi.createPin(this.__userToken__, mapId, collectionTitle, newPin);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  updateMap(mapId, data) {
    validate.arguments([
      { name: "mapId", value: mapId, type: "string", notEmpty: true },
      { name: "data", value: data, type: "object", notEmpty: true }
    ]);

    return (async () => {
      try {
        await photopinApi.updateMap(this.__userToken__, mapId, data);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  updateCollection(mapId, collectionTitle, title) {
    validate.arguments([
      { name: "mapId", value: mapId, type: "string", notEmpty: true },
      { name: "collectionTitle", value: collectionTitle, type: "string", notEmpty: true },
      { name: "title", value: title, type: "string", notEmpty: true }
    ]);

    return (async () => {
      try {
        await photopinApi.updateCollection(this.__userToken__, mapId, collectionTitle, title);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  updatePin(pinId, title, description, urlImage, bestTimeOfYear, bestTimeOfDay, photographyTips, travelInformation) {
    validate.arguments([
      { name: "pinId", value: pinId, type: "string", notEmpty: true },
      { name: "title", value: title, type: "string", notEmpty: true },
      { name: "description", value: description, type: "string", notEmpty: false },
      { name: "urlImage", value: urlImage, type: "string", notEmpty: false },
      { name: "bestTimeOfYear", value: bestTimeOfYear, type: "string", notEmpty: false },
      { name: "bestTimeOfDay", value: bestTimeOfDay, type: "string", notEmpty: false },
      { name: "photographyTips", value: photographyTips, type: "string", notEmpty: false },
      { name: "travelInformation", value: travelInformation, type: "string", notEmpty: false }
    ]);

    return (async () => {
      try {
        await photopinApi.updatePin(
          this.__userToken__,
          pinId,
          title,
          description,
          urlImage,
          bestTimeOfYear,
          bestTimeOfDay,
          photographyTips,
          travelInformation
        );
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  removeMap(mapId) {
    validate.arguments([{ name: "mapId", value: mapId, type: "string", notEmpty: true }]);

    return (async () => {
      try {
        await photopinApi.removeMap(this.__userToken__, mapId);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  removeCollection(mapId, collectionTitle) {
    validate.arguments([
      { name: "mapId", value: mapId, type: "string", notEmpty: true },
      { name: "collectionTitle", value: collectionTitle, type: "string", notEmpty: true }
    ]);

    return (async () => {
      try {
        await photopinApi.removeCollection(this.__userToken__, mapId, collectionTitle);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  removePin(pinId) {
    validate.arguments([{ name: "pinId", value: pinId, type: "string", notEmpty: true }]);

    return (async () => {
      try {
        await photopinApi.removePin(this.__userToken__, pinId);
      } catch (error) {
        this.handleError(error);
      }
    })();
  },

  handleError(error) {
    if (error.status === 401) {
      this.logoutUser();
      throw new UnauthorizedError(error);
    }
    throw new LogicError(error);
  }
};

module.exports = logic;
