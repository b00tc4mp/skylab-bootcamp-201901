'use strict'

import userApi from '../user-api'
import youtubeApi from '../youtube-api';

/**
 * Abstraction of business logic.
 */
const logic = {
    __userId__: null,
    __userApiToken__: null,
    __videoId__: null,
    __storage__:null,

    // __mytoken__:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTk1N2QyNTUzOTM1MDAwOWMxMzhiYyIsImlhdCI6MTU0OTQ5NTQwMiwiZXhwIjoxNTQ5NDk5MDAyfQ.ui5kwZTMXL2hkKjk-d4ngNQbckHq7xq5yHYyI6hLSYM',

    set storage(storage){
        this.__storage__=storage
    },

    set __userId__(id){
        if(id)this.__storage__.setItem('user-id', id)
        else this.__storage__.removeItem('user-id')
    },

    get __userId__(){
        return this.__storage__.getItem('user-id')
    },

    set __userApiToken__(token){
        if(token)this.__storage__.setItem('user-token', token)
        else this.__storage__.removeItem('user-token')
    },

    get __userApiToken__(){
        if(this.__storage__.getItem('user-token')) return this.__storage__.getItem('user-token')
        else {
            this.__userApiToken__='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTk1N2QyNTUzOTM1MDAwOWMxMzhiYyIsImlhdCI6MTU0OTUyNjY5OSwiZXhwIjoxNTQ5NTMwMjk5fQ.zL16UlsGgLZdYkeS1XakC5R0Sr6td94U-XW06D-E6N0'
            return this.__storage__.getItem('user-token')
        }
    },

    
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
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

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },

    get userLoggedIn() {
        return !!this.__userId__
    },

    logout() {
        this.__userId__ = null
        // this.__userApiToken__ = null
    },

    authenticateUser(email, password){
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then((data) => {
                this.__userId__= data.id
                this.__userApiToken__=data.token
                
            return data
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username }) => ({
                id,
                name,
                surname,
                email: username
            }))
    },

    /**
     * Updates a users data. 
     * Uses: creating user playlists, to dislike and like a video, comenting, etc.
     * 
     * 
     * @param {object} data 
     */
    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + ' is not an object')

        return userApi.update(data, this.__userApiToken__, this.__userId__)
            .then(() => { })  //en este caso no se obtiene respuesta de la api
    },

    /**
     * Deletes all users data from the api.
     * 
     * @param {string} username 
     * @param {string} password 
     */
    removeUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.remove(this.__userId__, this.__userApiToken__, email, password)
            .then(() => { }) //aqui tampoco esperamos respuesta
    },

    //he hecho que para borrar su usuario la parsona tiene que confirmarlo con el email i el password


    /**
     * 
     * @param {string} query 
     */
    searchVideo(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return youtubeApi.search(query)
            .then(items => ({   //opcion sin destructuring
                items
            }))
    },

    popularResults() {
        return youtubeApi.mostPopular()

            .then(items => items)
            .catch(Error)
    },

    watchVideo(videoId) {
        return youtubeApi.watchVideo(videoId)
          .then(items => ({   //opcion sin destructuring
            items
        }))  
    },

    commentVideo(videoId, text) {
        if (typeof videoId !== 'string') throw TypeError(videoId + ' is not a string')

        if(!videoId.trim().length) throw Error('text is empty')

        if (typeof text !== 'string') throw TypeError(text + ' is not a string')

        if(!text.trim().length) throw Error('text is empty')

        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(user => {
                const { comments = {} } = user

                const comment = {
                    text,
                    date: new Date()
                }

                const videoComments = comments[videoId]

                if (videoComments) {
                    videoComments.push(comment)
                } else {
                    comments[videoId] = [comment]
                }

                console.log(comments)

                return userApi.update(this.__userId__, this.__userApiToken__, {comments})

            })
            .then(() => {})
    },

    showComments(videoId) {
        return userApi.retrieveAllUsers(this.__userApiToken__)
            .then((data) => {
                const myUsers = data.filter(user => !!user.appId)
      // myUsers.forEach(user => console.log(user.comments))
                // console.log(myUsers)
                // myUsers.forEach(user => console.log(user.comments))
                // console.log(myUsers)
                const allComments = myUsers.filter(user => user.comments && !!user.comments[videoId])

                console.log(allComments)

                return allComments
            })
    },

    deleteComments(videoId, date) {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(user => {
                const { comments } = user
                if (comments) {
                    if (comments[videoId]) {
                         // const commentToDelete = comments[videoId].find(element=> element.date === date)
                        // console.log(commentToDelete)
                        
                        const index = comments[videoId].findIndex(element=> element.date === date)

                        comments[videoId].splice(index, 1)

                        return userApi.update(this.__userId__, this.__userApiToken__, {comments})
                    }
                }
            })
    },

    likeVideo(videoId) {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(user => {
                const { likes = [] } = user

                if (likes) {
                    if (likes.includes(videoId)) {
                        function indexOfLike(videoId, element) {
                            return element === videoId
                        }

                        const index = likes.findIndex(indexOfLike)

                        likes.splice(index, 1)

                    } else {
                        likes.push(videoId)
                    }
                } else {
                    likes[0] = [videoId]
                }
                
                userApi.update(this.__userId__, this.__userApiToken__, { likes })
                return likes
            })  
    },

    retrieveLikes() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(user => user)
    }

    // dislikeVideo(videoId) {
    //     return userApi.retrieve(this.__userId__, this.__userApiToken__)
    //         .then(user => {
    //             const { dislikes = {} } = user

    //             if (dislikes) {
    //                 dislikes.push(videoId)
    //             } else {
    //                 dislikes[0] = [videoId]
    //             }
                
    //             return userApi.update(this.__userId__, this.__userApiToken__, { dislikes })
    //         })
    //     .then(() => {})  
    // },

    // checkReview(videoId) {
    //     return userApi.retrieve(this.__userId__, this.__userApiToken__)
    //         .then(user => {

    //         })
    // }

}

export default logic