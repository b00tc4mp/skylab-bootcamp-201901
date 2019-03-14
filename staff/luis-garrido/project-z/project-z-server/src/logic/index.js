"use strict";

const {
    models: { User, Game, Boxart, Review }
} = require("project-z-data");
const bcrypt = require("bcrypt");
const {
    AuthError,
    EmptyError,
    DuplicateError,
    MatchingError,
    NotFoundError
} = require("project-z-errors");

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
     * Registers a user.
     *
     * @param {boolean} admin
     * @param {string} username
     * @param {string} avatar
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} passwordConfirmation
     * @returns {string} id
     *
     */
    registerUser(
        admin,
        username,
        avatar,
        name,
        surname,
        email,
        password,
        passwordConfirmation
    ) {
        if (typeof admin !== "boolean")
            throw TypeError(admin + " is not a boolean");

        if (typeof username !== "string")
            throw TypeError(username + " is not a string");

        if (!username.trim().length)
            throw new EmptyError("username cannot be empty");

        if (typeof avatar !== "string")
            throw TypeError(avatar + " is not a string");

        if (!avatar.trim().length)
            throw new EmptyError("avatar cannot be empty");

        if (typeof name !== "string")
            throw TypeError(name + " is not a string");

        // if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== "string")
            throw TypeError(surname + " is not a string");

        // if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== "string")
            throw TypeError(email + " is not a string");

        if (!email.trim().length) throw new EmptyError("email cannot be empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length)
            throw new EmptyError("password cannot be empty");

        if (typeof passwordConfirmation !== "string")
            throw TypeError(passwordConfirmation + " is not a string");

        if (!passwordConfirmation.trim().length)
            throw new EmptyError("password confirmation cannot be empty");

        if (password !== passwordConfirmation)
            throw new MatchingError("passwords do not match");

        // return User.findOne({ email })
        //     .then(user => {
        //         if (user) throw Error(`user with email ${email} already exists`)

        //         return bcrypt.hash(password, 10)
        //     })
        //     .then(hash => User.create({ name, surname, email, password: hash }))
        //     .then(({ id }) => id)

        return (async () => {
            let user = await User.findOne({ email });

            if (user)
                throw new DuplicateError(
                    `user with email ${email} already exists`
                );

            user = await User.findOne({ username });

            if (user)
                throw new DuplicateError(
                    `user with username ${username} already exists`
                );

            const hash = await bcrypt.hash(password, 10);

            const { id } = await User.create({
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password: hash
            });

            return id;
        })();
    },

    /**
     * Authenticates user by its credentials.
     *
     * @param {string} loggingData
     * @param {string} password
     * @returns {string} user.id
     *
     */
    authenticateUser(loggingData, password) {
        if (typeof loggingData !== "string")
            throw TypeError(loggingData + " is not a string");

        if (!loggingData.trim().length)
            throw new EmptyError("loggingData cannot be empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length)
            throw new EmptyError("password cannot be empty");

        const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailChecker;

        mailRegex.test(loggingData)
            ? (emailChecker = true)
            : (emailChecker = false);

        return (async () => {
            const user = emailChecker
                ? await User.findOne({ email: loggingData })
                : await User.findOne({ username: loggingData });

            if (!user)
                throw new NotFoundError(
                    emailChecker
                        ? `user with email ${loggingData} not found`
                        : `user with username ${loggingData} not found`
                );

            const match = await bcrypt.compare(password, user.password);

            if (!match) throw new AuthError("wrong credentials");

            const returnedUser = { id: user.id };

            return returnedUser;
        })();
    },

    /**
     * Retrieve user by its ID
     *
     * @param {string} userId
     * @returns {object} user
     *
     */
    retrieveUser(userId) {
        if (typeof userId !== "string")
            throw TypeError(`${userId} is not a string`);

        if (!userId.trim().length)
            throw new EmptyError("userId cannot be empty");

        return User.findById(userId)
            .select("-password -__v")
            .lean()
            .then(user => {
                if (!user)
                    throw new NotFoundError(`user with id ${userId} not found`);

                user.id = user._id.toString();

                delete user._id;

                return user;
            });
    },

    /**
     * Retrieve user by username
     *
     * @param {string} username
     * @returns {object} user
     *
     */
    retrieveUserByUsername(username) {
        if (typeof username !== "string")
            throw TypeError(`${username} is not a string`);

        if (!username.trim().length)
            throw new EmptyError("username cannot be empty");

        return User.find({ username })
            .select("-password -__v")
            .lean()
            .populate({ path: "reviews", populate: { path: "game" } })
            .then(userArray => {
                let user = userArray[0];
                if (!user)
                    throw new NotFoundError(
                        `user with id ${username} not found`
                    );

                user.id = user._id.toString();

                delete user._id;

                return user;
            });
    },

    // TODO updateUser and removeUser

    /**
     * Post game review
     *
     * @param {string} userId
     * @param {string} gameId
     * @param {object} review
     *
     * @returns {object} reviewAdded
     */
    postReview(userId, gameId, review) {
        if (typeof userId !== "string")
            throw TypeError(`${userId} is not a string`);

        if (!userId.trim().length)
            throw new EmptyError("userId cannot be empty");

        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length)
            throw new EmptyError("gameId cannot be empty");

        if (!(review instanceof Object))
            throw TypeError(`${review} is not an object`);

        if (!Object.keys(review).length)
            throw new EmptyError("review cannot be empty");

        const { text, score } = review;

        if (typeof text !== "string")
            throw TypeError(`${text} is not a string`);

        // if (!text.trim().length) throw new EmptyError("text cannot be empty");

        if (isNaN(score)) throw TypeError(`${score} is not a number`);

        if (score < 0 || score > 5)
            throw Error("score must be between 0 and 5");

        if (score % 1 !== 0) throw Error(`score should be an integer number`);

        return (async () => {
            let isUser = await User.findById(userId)
                .select("-password -__v")
                .lean();

            if (!isUser)
                throw new NotFoundError(
                    `user with id "${userId}" doesn't exist`
                );

            let isGame = await Game.findOne({ id: gameId })
                .select("-__v")
                .lean()
                .populate("reviews")
                .then(gameInfo => {
                    if (gameInfo === null)
                        throw new NotFoundError(
                            `${gameId} doesn't exist in database`
                        );

                    return gameInfo;
                });

            if (
                isGame.reviews.some(
                    review => review.author.toString() === userId
                )
            )
                throw new DuplicateError(`user reviewed this game before`);

            gameId = isGame._id;

            const postedReview = await Review.create({
                text,
                score,
                author: userId,
                game: gameId
            });

            let linkReviewToGame = await Game.findById({ _id: gameId });

            linkReviewToGame.reviews.push(postedReview._id);

            if (!linkReviewToGame.scores) linkReviewToGame.scores = [];
            linkReviewToGame.scores.push(score);

            linkReviewToGame.finalScore =
                linkReviewToGame.scores.reduce((a, b) => a + b) /
                linkReviewToGame.scores.length;

            await linkReviewToGame.save();

            let addReviewToAuthor = await User.findById({ _id: userId });

            addReviewToAuthor.reviews.push(postedReview._id);

            await addReviewToAuthor.save();

            let getReview = await Review.findById({ _id: postedReview._id })
                .select("-__v")
                .lean()
                .populate("author")
                .populate("game")
                .select("-__v")
                .lean();

            return getReview;
        })();
    },

    /**
     * Search games by name in our DB
     *
     * @param {string} query
     * @returns {object} games
     *
     */
    searchGames(query) {
        if (typeof query !== "string")
            throw TypeError(`${query} is not a string`);

        if (!query.trim().length) throw new EmptyError("query is empty");

        return Game.find(
            { $text: { $search: query } },
            // { game_title: { $regex: `${query}`, $options: "i" } }, // Alex alternative
            { score: { $meta: "textScore" } }
        )
            .sort({
                score: { $meta: "textScore" }
            })
            .limit(20)
            .select("-_id -__v")
            .lean()
            .then(games => {
                if (games.length === 0)
                    throw new NotFoundError(`no games found`);

                return games;
            })
            .then(async gameInfo => {
                const gameInfoMap = gameInfo.map(async oneGame => {
                    const cover = await Boxart.find({ id_game: oneGame.id })
                        .select("-_id -__v")
                        .lean();
                    oneGame.boxartUrl = cover[0].images.find(
                        image => image.side === "front"
                    ).filename;

                    if (oneGame.scores !== undefined) {
                        oneGame.finalScore =
                            oneGame.scores.reduce((a, b) => a + b) /
                            oneGame.scores.length;
                    }

                    return oneGame;
                });
                gameInfo = await Promise.all(gameInfoMap);
                return gameInfo;
            });
    },

    /**
     * Retrieve game info by game ID
     *
     * @param {String} gameId - The ID to retrieve game data.
     * @returns {Object} - Game info
     *
     */
    retrieveGameInfo(gameId) {
        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw new EmptyError("gameId is empty");

        if (isNaN(Number(gameId)))
            throw TypeError(`${gameId} should be a number`);

        if (!isNaN(Number(gameId)) && Number(gameId) < 1)
            throw Error(`${gameId} should be a bigger than 0 number`);

        if (!isNaN(Number(gameId)) && Number(gameId) % 1 !== 0)
            throw Error(`${gameId} should be an integer number`);

        return Game.findOne({ id: gameId })
            .select("-_id -__v")
            .lean()
            .populate({ path: "reviews", populate: { path: "author" } })
            .then(gameInfo => {
                if (gameInfo === null)
                    throw new NotFoundError(
                        `${gameId} doesn't exist in database`
                    );

                return gameInfo;
            })
            .then(async gameInfo => {
                const cover = await Boxart.find({ id_game: gameId })
                    .select("-_id -__v")
                    .lean();
                    
                    console.log(cover)
                if (cover.length === 0) {
                    gameInfo.boxartUrl =
                        false;
                } else {
                    gameInfo.boxartUrl = cover[0].images.find(
                        image => image.side === "front"
                    ).filename;
                }

                if (gameInfo.scores !== undefined) {
                    gameInfo.finalScore =
                        gameInfo.scores.reduce((a, b) => a + b) /
                        gameInfo.scores.length;
                }

                return gameInfo;
            });
    },

    /**
     * List games by final score
     *
     * @returns {object} games
     *
     */
    rankingGames() {
        return Game.find()
            .sort("-finalScore")
            .limit(10)
            .select("-_id -__v")
            .lean()
            .then(games => {
                if (games.length === 0)
                    throw new NotFoundError(`no games found`);

                return games;
            })
            .then(async gameInfo => {
                const gameInfoMap = gameInfo.map(async oneGame => {
                    const cover = await Boxart.find({ id_game: oneGame.id })
                        .select("-_id -__v")
                        .lean();
                    oneGame.boxartUrl = cover[0].images.find(
                        image => image.side === "front"
                    ).filename;

                    if (oneGame.scores !== undefined) {
                        oneGame.finalScore =
                            oneGame.scores.reduce((a, b) => a + b) /
                            oneGame.scores.length;
                    }

                    return oneGame;
                });
                gameInfo = await Promise.all(gameInfoMap);
                return gameInfo;
            });
    },

    retrieveRandomGame() {
        return Game.count()
            .then(count => {
                const random = Math.floor(Math.random() * count);
                return Game.findOne()
                    .skip(random)
                    .select("id -_id");
            })
            .then(response => response);
    },

    retrievePredictedScore(userId, gameId, body) {
        if (typeof userId !== "string")
            throw TypeError(`${userId} is not a string`);

        if (!userId.trim().length)
            throw new EmptyError("userId cannot be empty");

        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length)
            throw new EmptyError("gameId cannot be empty");

        // if (!(body instanceof Object))
        //     throw TypeError(`${body} is not an object`);

        // if (!body.trim().length)
        //     throw new EmptyError("body cannot be empty");

        const { gameInfo: { finalScore, developers, genres, platform, publishers } } = body;

        return User.findById(userId)
            .populate({ path: "reviews", populate: { path: "game" } })
            .select("reviews -_id")
            .lean()
            .then(user => {
                if (!user)
                    throw new NotFoundError(`user with id ${userId} not found`);

                const { reviews } = user;

                const dataToTrain = reviews.map(review => {
                    const input = {};

                    // if (!!review.game.finalScore) input.f = review.game.finalScore;
                    // if (!!review.game.developers)
                    //     input.d = review.game.developers[0];
                    if (!!review.game.genres)
                        input.g = review.game.genres[0];
                    // if (!!review.game.platform) input.pl = review.game.platform[0];
                    // if (!!review.game.publishers)
                    //     input.pu = review.game.publishers[0];

                    const outputKey = `star${review.score.toString()}`;
                    const output = {};
                    output[outputKey] = 1;

                    return { input, output };
                });

                const brain = require("brain.js");

                const precog = new brain.NeuralNetwork({
                    // iterations: 40000,

                    activation: "sigmoid",
                    //  leakyReluAlpha: 0.01,
                    hiddenLayers: [4]
                });

                console.log("Training IA : ", precog.train(dataToTrain));

                const dataToPrecog = {};
                // if(!!finalScore) dataToPrecog.f = finalScore
                if (!!genres) dataToPrecog.g = genres[0];

                const precogScore = precog.run(dataToPrecog);
                console.log(dataToTrain)
                console.log('precog data: ', dataToPrecog)
                console.log(genres)
                
                console.log("Running IA : ", precogScore);

                return precogScore;
            });
    }
};

module.exports = logic;

// -------- SPOTIFY EXAMPLES ----------------

// /**
//  * Search artists.
//  *
//  * @param {string} query
//  * @returns {Promise}
//  */
// searchArtists(query) {
//     if (typeof query !== "string")
//         throw TypeError(`${query} is not a string`);

//     if (!query.trim().length) throw Error("query is empty");

//     return spotifyApi.searchArtists(query);
// },

// /**
//  * Retrieves an artist.
//  *
//  * @param {string} artistId
//  */
// retrieveArtist(artistId) {
//     if (typeof artistId !== "string")
//         throw TypeError(`${artistId} is not a string`);

//     if (!artistId.trim().length) throw Error("artistId is empty");

//     return spotifyApi.retrieveArtist(artistId);
// },

// /**
//  * Toggles a artist from non-favorite to favorite, and viceversa.
//  *
//  * @param {string} userId - The id of the user toggling the artist.
//  * @param {string} artistId - The id of the artist to toggle in favorites.
//  */
// toggleFavoriteArtist(userId, artistId) {
//     // TODO validate arguments

//     return users.findById(userId).then(user => {
//         const { favoriteArtists = [] } = user;

//         const index = favoriteArtists.findIndex(
//             _artistId => _artistId === artistId
//         );

//         if (index < 0) favoriteArtists.push(artistId);
//         else favoriteArtists.splice(index, 1);

//         user.favoriteArtists = favoriteArtists;

//         return users.update(user);
//     });
// },

// addCommentToArtist(userId, artistId, text) {
//     // TODO validate userId, token, artistId and text

//     const comment = {
//         userId,
//         artistId,
//         text,
//         date: new Date()
//     };

//     return spotifyApi
//         .retrieveArtist(artistId)
//         .then(({ error }) => {
//             if (error) throw Error(error.message);
//         })
//         .then(() => artistComments.add(comment))
//         .then(() => comment.id);
// },

// listCommentsFromArtist(userId, artistId) {
//     // TODO validate arguments

//     return users.findById(userId).then(user => {
//         if (!user) throw Error(`user with id ${userId} not found`);

//         return artistComments.find({ artistId });
//     });
// },

// /**
//  * Retrieves albums from artist.
//  *
//  * @param {string} artistId
//  */
// retrieveAlbums(artistId) {
//     if (typeof artistId !== "string")
//         throw TypeError(`${artistId} is not a string`);

//     if (!artistId.trim().length) throw Error("artistId is empty");

//     return spotifyApi.retrieveAlbums(artistId);
// },

// /**
//  * Retrieves an album.
//  *
//  * @param {string} albumId
//  */
// retrieveAlbum(albumId) {
//     if (typeof albumId !== "string")
//         throw TypeError(`${albumId} is not a string`);

//     if (!albumId.trim().length) throw Error("albumId is empty");

//     return spotifyApi.retrieveAlbum(albumId);
// },

// /**
//  * Toggles a album from non-favorite to favorite, and viceversa.
//  *
//  * @param {string} albumId - The id of the album to toggle in favorites.
//  */
// toggleFavoriteAlbum(userId, albumId) {
//     // TODO validate

//     return users.findById(userId).then(user => {
//         const { favoriteAlbums = [] } = user;

//         const index = favoriteAlbums.findIndex(
//             _albumId => _albumId === albumId
//         );

//         if (index < 0) favoriteAlbums.push(albumId);
//         else favoriteAlbums.splice(index, 1);

//         user.favoriteAlbums = favoriteAlbums;

//         return users.update(user);
//     });
// },

// /**
//  * Retrieves tracks from album.
//  *
//  * @param {string} albumId
//  */
// retrieveTracks(albumId) {
//     if (typeof albumId !== "string")
//         throw TypeError(`${albumId} is not a string`);

//     if (!albumId.trim().length) throw Error("albumId is empty");

//     return spotifyApi.retrieveTracks(albumId);
// },

// /**
//  * Retrieves track.
//  *
//  * @param {string} trackId
//  */
// retrieveTrack(trackId) {
//     if (typeof trackId !== "string")
//         throw TypeError(`${trackId} is not a string`);

//     if (!trackId.trim().length) throw Error("trackId is empty");

//     return spotifyApi.retrieveTrack(trackId);
// },

// /**
//  * Toggles a track from non-favorite to favorite, and viceversa.
//  *
//  * @param {string} trackId - The id of the track to toggle in favorites.
//  */
// toggleFavoriteTrack(userId, trackId) {
//     // TODO validate arguments

//     return users.findById(userId).then(user => {
//         const { favoriteTracks = [] } = user;

//         const index = favoriteTracks.findIndex(
//             _trackId => _trackId === trackId
//         );

//         if (index < 0) favoriteTracks.push(trackId);
//         else favoriteTracks.splice(index, 1);

//         user.favoriteTracks = favoriteTracks;

//         return users.update(user);
//     });
// }
