const userApi = {
    url: 'https://skylabcoders.herokuapp.com/api',

    register(name, surname, username, password) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`);
        if (!name.trim().length) throw Error('name is empty');

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`);
        if (!surname.trim().length) throw Error('surname is empty');

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`);
        if (!username.trim().length) throw Error('username is empty');

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`);
        if (!password.trim().length) throw Error('password is empty');

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, username, password, favorites: [] })
        })
            .then(response => response.json())
            .then(response => {

                const { status } = response;

                if (status === 'OK') return response.data.id;

                throw Error(response.error);
            });
    },

    authenticate(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`);
        if (!username.trim().length) throw Error('username is empty');

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`);
        if (!password.trim().length) throw Error('password is empty');


        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {

                const { status } = response;

                if (status === 'OK') return response.data;

                throw Error(response.error);
            });
    },

    retrieve(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`);
        if (!id.trim().length) throw Error('id is empty');

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`);
        if (!token.trim().length) throw Error('token is empty');

        return fetch(`${this.url}/user/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {

                const { status } = response;

                if (status === 'OK') return response.data;

                throw Error(response.error);
            });
    },

    update(id, token, data) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`);
        if (!id.trim().length) throw Error('id is empty');

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`);
        if (!token.trim().length) throw Error('token is empty');

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`);

        return fetch(`${this.url}/user/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {

                const { status } = response;

                if (status === 'OK') return;

                throw Error(response.error);
            });
    },

    remove(id, token, username, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`);
        if (!id.trim().length) throw Error('id is empty');

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`);
        if (!token.trim().length) throw Error('token is empty');

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`);
        if (!username.trim().length) throw Error('username is empty');

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`);
        if (!password.trim().length) throw Error('password is empty');

        return fetch(`${this.url}/user/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {

                const { status } = response;

                if (status === 'OK') return;

                throw Error(response.error);
            });
    }
};

export default userApi;
