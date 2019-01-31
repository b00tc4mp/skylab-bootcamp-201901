
const logic = {

    login: function (email, password, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        var user = users.find(function (user) {
            return user.email === email
        })

        if (!user) throw Error('user ' + email + ' not found')
        if (user.password !== password) throw Error('wrong password')

        var user = users.find(function (user) {
            return user.email === email
        })

        var loggedInUser = {
            name: user.name,
            surname: user.surname,
            email: user.email
        }
        callback(loggedInUser)
    },

    
    register: function (name, surname, email, password, passwordConfirmation, callback) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        var user = users.find(function (user) {
            return user.email === email
        })

        if (user) throw Error('user ' + email + ' already exists')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        })

        callback()
    },

    

    searchArtists(query, callback) {
        if  (typeof query !== 'string') throw TypeError (`${query} is not a string`)

        if (query === undefined) throw Error (`No results for ${query}`)

        if (!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    
    retrieveAlbums(artistId, callback) {
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artist is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

   

    retrieveTracks(albumId, callback) {
        if  (typeof albumId !== 'string') throw TypeError (`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('album is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

     

    retrieveTrack(trackId, callback) {
        if  (typeof trackId !== 'string') throw TypeError (`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('track is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    }
} 

    // retrieveFavoriteTracks(trackId,callback){
    //     if  (typeof trackId !== 'string') throw TypeError (`${trackId} is not a string`)

    //     if (!trackId.trim().length) throw Error('track is empty')

    //     if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

    //         user.push ({
    //             favoriteTracks : favoriteTracks
    //         })
           
    //         retrieveFavoriteTracks(trackId,callback)
    // }