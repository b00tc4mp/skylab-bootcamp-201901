'use strict'

import userApi from '../user-api'
import youtubeApi from '../youtube-api';

/**
 * Abstraction of business logic.
 */
const logic = {
    __userId__: null,
    __userApiToken__: null,

    __mytoken__:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTk1N2QyNTUzOTM1MDAwOWMxMzhiYyIsImlhdCI6MTU0OTM1OTE5NiwiZXhwIjoxNTQ5MzYyNzk2fQ.d1AYGq4dMg6ANYmYnxR990DEUlCoEYoS8jVd48VhAPc',

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

    popularResults(/*aqui es donde se podria meter lo de cambiar la region de los resultados populares*/) {
        return youtubeApi.mostPopular(/*aqui es donde se podria meter lo de cambiar la region de los resultados populares*/)

            .then(items => items)
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
        return userApi.retrieveAllUsers(this.__mytoken__)
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

    deleteComments(videoId, text) {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(user => {
                const { comments } = user

                let deletedComment = comments[videoId].comment.includes(text)
                console.log(deletedComment)
                //return userApi.update(this.__userId__, this.__userApiToken__,  deletedComment: '' )
            })
            .then(() => {})
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