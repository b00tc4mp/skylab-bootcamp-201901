'use strict';

var axios = require('axios');

var singingLabApi = {
    url: 'NO-URL',

    /**
     * Setter/getter function: 
     * 
     * Sets the token when the function is called with a parameter and get's it when no parameter is introduced  
     * 
     * @param {string} token
     * 
     * @returns {<string>}
    */
    token: function token(_token) {
        if (_token) {
            this._token = _token;

            return;
        }

        return this._token;
    },


    /**
     * 
     * Register user
     * 
     * @param {string} name - user's name
     * @param {string} surname - user's password
     * @param {string} address - an address
     * @param {string} email - a email to log in 
     * @param {string} password - a password to log in
     * 
     * @throws {Error} - If invalid type of input or if user already exists
     * 
     * @returns {Promise<boolean>}
     */
    registerUser: function registerUser(name, surname, address, email, password) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if ((address = address.trim()).length === 0) throw Error('user address is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this.url + '/register', { name: name, surname: surname, address: address, email: email, password: password }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Authenticates an user
     * 
     * @param {string} email - user's email
     * @param {string} password - user's password
     * 
     * @throws {Error} - Throws error on invalid type of input, unexpected response status or unable to reach server
     * 
     * @returns {Promise<string>}
     */
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token(token);

                return id;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     *
     * Retrieves an user
     * 
     * @param {string} id - The id of the user
     * 
     * @throws {Error} - If no valid id is found, error on response status or unable to reach the server
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser: function retrieveUser(id) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token() } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Update user info
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone 
     * @param {string} address 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<User>}
     */
    updateUser: function updateUser(id, name, surname, phone, address, email, password, newEmail, newPassword) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

            if (typeof phone !== 'string') throw Error('user phone is not a string');

            if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank');

            if (typeof address !== 'string') throw Error('user address is not a string');

            if ((address = address.trim()).length === 0) throw Error('user address is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.patch(_this4.url + '/users/' + id, { name: name, surname: surname, phone: phone, address: address, email: email, password: password, newEmail: newEmail, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this4.token() } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Unregisters a user
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser: function unregisterUser(id, email, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.delete(_this5.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this5.token() }, data: { email: email, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Lists categories
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Category]>} 
    */
    listCategories: function listCategories() {
        var _this6 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this6.url + '/categories').then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Lists products
     *  
     * @param {string} categoryId
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listProducts: function listProducts(categoryId) {
        var _this7 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this7.url + '/categories/' + categoryId).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
      * Retrieves product
      * 
      * @param {string} productId
      * 
      * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
      * 
      * @returns {Promise<Product>} 
      */
    retrieveProduct: function retrieveProduct(productId) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            if (typeof productId !== 'string') throw Error('user productId is not a string');

            if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank');

            return axios.get(_this8.url + '/categories/products/' + productId).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     *  
     * Lists all products
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listAllProducts: function listAllProducts() {
        var _this9 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this9.url + '/products').then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Lists products by id
     * 
     * @param {Array} cart
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listProductsByIds: function listProductsByIds(cart) {
        var _this10 = this;

        // TODO GET url?ids=id1,id2,id2,id4

        return Promise.resolve().then(function () {
            var ids = cart.join(',');

            return axios.get(_this10.url + '/products/?ids=' + ids).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * Creates an order
     * 
     * @param {string} paymentMethod 
     * @param {string} status 
     * @param {Array} products
     * @param {string} userId
     * @param {string} orderAdress 
     * @param {string} submitDate 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<Order>}
     */
    createOrder: function createOrder(paymentMethod, status, products, userId, orderAdress, submitDate) {
        var _this11 = this;

        return Promise.resolve().then(function () {
            if (typeof paymentMethod !== 'string') throw Error('paymentMethod is not a string');

            if (!(paymentMethod = paymentMethod.trim())) throw Error('paymentMethod is empty or blank');

            if (typeof status !== 'string') throw Error('status is not a string');

            if ((status = status.trim()).length === 0) throw Error('status is empty or blank');

            if (!Array.isArray(products)) throw Error('products should be an array');

            if (!products.length) throw Error('no products where found');

            if (orderAdress !== undefined) {
                if (typeof orderAdress !== 'string') throw Error('orderAdress is not a string');

                if ((orderAdress = orderAdress.trim()).length === 0) throw Error('orderAdress is empty or blank');
            }

            if (submitDate !== undefined) {
                if (typeof submitDate !== 'string') throw Error('submitDate is not a string');

                if (!(submitDate = submitDate.trim()).length) throw Error('submitDate is empty or blank');
            }

            return axios.post(_this11.url + '/order', { paymentMethod: paymentMethod, status: status, products: products, userId: userId, orderAdress: orderAdress, submitDate: submitDate }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }
};

module.exports = singingLabApi;
