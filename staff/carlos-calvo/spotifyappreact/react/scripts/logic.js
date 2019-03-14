const logic = {
    /**
     * Search artists.
     * 
     * @param {string} query 
     * @param {function} callback 
     */
    searchArtists(query, callback) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if(query.length == 0) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     * @param {function} callback 
     */
    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if(!artistId.trim().length) throw Error('artistId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    /**
     * Checks albumId to be a string and callback to be a function.
     * Calls callback to tread albumID.
     * @param {string} albumId 
     * @param {function} callback 
     */
    retrieveSongs(albumId, callback){
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if(!albumId.trim().length) throw Error('albumId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveSongs(albumId, callback)
    },

    /**
     * Checks trackId to be a string and callback to be a function.
     * Calls callback to tread trackId.
     * @param {string} trackId 
     * @param {function} callback 
     */
    retrieveTrack(trackId, callback){
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if(!trackId.trim().length) throw Error('trackId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    },
    /**
     * Checks email and password matching. If matches callback is executed.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {function} callback 
     */
    login: function (email, password, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if(!(callback instanceof Function)) throw new TypeError ('callback not a function')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        var user = users.find(function (user) {
            return user.email === email;
        });

        if (!user) throw Error('user ' + email + ' not found');

        if (user.password !== password) throw Error('wrong password');


        var loggedInUser = {
            name: user.name,
            surname: user.surname,
            email: user.email
        };

        callback(loggedInUser);
    },

    /**
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirmation 
     * @param {function} callback 
     */
    register: function (name, surname, email, password, passwordConfirmation, callback) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string');

        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string');

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty');

        if(!(callback instanceof Function)) throw new TypeError ('callback not a function')

        var user = users.find(function (user) {
            return user.email === email;
        });

        if (user) throw Error('user ' + email + ' already exists');

        if (password !== passwordConfirmation) throw Error('passwords do not match');

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });

        callback();
    },


    toggleFavorite: function(email, id){

        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id cannot be empty');

        //check de campos
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        //Check that users exists

        let emailindex = -1;
        let found= false;

        for(let i = 0; i < users.length && !found; i++){
            if(users[i].email == email) {
                emailindex = i
                found = true
            }
        }

        if(emailindex == -1) throw new Error ('email user does not exist')

        //Si existe id en el array, lo borro, sinó lo añado

        let favindex = -1
        for(let i = 0; i < users[emailindex].favorites.length; i++){
            if(id == users[emailindex].favorites[i]){ //case where id is found, case remove from favorites
                users[emailindex].favorites.splice(i,1)
                favindex = i
            }
        }
        if(favindex == -1){ //case not found --> add to favorites
            users[emailindex].favorites.push(id)
        }

    }
}
