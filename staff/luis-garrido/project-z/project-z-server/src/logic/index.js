"use strict";

const {
    models: { User, Game, Boxart, Review, Platform }
} = require("project-z-data");
const bcrypt = require("bcrypt");
const {
    AuthError,
    EmptyError,
    DuplicateError,
    MatchingError,
    NotFoundError
} = require("project-z-errors");
const validate = require("project-z-validation");

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
        admin = false,
        username,
        avatar,
        name,
        surname,
        email,
        password,
        passwordConfirmation
    ) {
        validate([
            { key: "admin", value: admin, type: Boolean },
            { key: "username", value: username, type: String },
            { key: "avatar", value: avatar, type: String },
            { key: "name", value: name, type: String, optional: true },
            { key: "surname", value: surname, type: String, optional: true },
            { key: "email", value: email, type: String },
            { key: "password", value: password, type: String },

            {
                key: "passwordConfirmation",
                value: passwordConfirmation,
                type: String
            }
        ]);

        if (password !== passwordConfirmation)
            throw new MatchingError("passwords do not match");

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
        validate([
            { key: "loggingData", value: loggingData, type: String },
            { key: "password", value: password, type: String }
        ]);

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
        validate([{ key: "userId", value: userId, type: String }]);

        return User.findById(userId)
            .select("-password -__v")
            .lean()
            .populate("reviews")
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
        validate([{ key: "username", value: username, type: String }]);

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
     * Search games by name in our DB
     *
     * @param {string} query
     * @returns {object} games
     *
     */
    searchGames(query) {
        validate([{ key: "query", value: query, type: String }]);

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
                    const platformName = await Platform.find({
                        id: oneGame.platform
                    })
                        .select("name")
                        .lean();
                    oneGame.platformName = platformName[0].name;
                    return oneGame;
                });
                gameInfo = await Promise.all(gameInfoMap);
                return gameInfo;
            })
            .then(async gameInfo => {
                const gameInfoMap = gameInfo.map(async oneGame => {
                    const cover = await Boxart.find({ id_game: oneGame.id })
                        .select("-_id -__v")
                        .lean();
                    if (cover.length === 0) {
                        oneGame.boxartUrl = false;
                    } else {
                        oneGame.boxartUrl = cover[0].images.find(
                            image => image.side === "front"
                        ).filename;
                    }

                    if (oneGame.scores !== undefined) {
                        oneGame.finalScore =
                            oneGame.scores.reduce((a, b) => a + b) /
                            oneGame.scores.length;
                    }

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
        validate([{ key: "gameId", value: gameId, type: String }]);

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

                if (cover.length === 0) {
                    gameInfo.boxartUrl = false;
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
     * Post game review
     *
     * @param {string} userId
     * @param {string} gameId
     * @param {object} review
     *
     * @returns {object} reviewAdded
     */
    postReview(userId, gameId, review) {
        let { title, text, score } = review;
        console.log(title);
        validate([
            { key: "userId", value: userId, type: String },
            { key: "gameId", value: gameId, type: String },
            { key: "review", value: review, type: Object },
            { key: "text", value: text, type: String, optional: true },
            { key: "title", value: title, type: String, optional: true },
            { key: "score", value: score, type: Number }
        ]);

        if (text === "no text") text = "";
        if (title === "no text") title = "";

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
                    if (gameInfo === null || gameInfo.length === 0)
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

            let boxart = await Boxart.find({ id_game: gameId })
                .select("-_id -__v")
                .lean();

            if (boxart.length === 0) {
                boxart = false;
            } else {
                boxart = boxart[0].images.find(image => image.side === "front")
                    .filename;
            }

            gameId = isGame._id;

            const postedReview = await Review.create({
                text,
                score,
                title,
                author: userId,
                game: gameId,
                boxart
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
     * List games by final score
     *
     * @returns {object} games
     *
     */
    rankingGames(limit) {
        return Game.find()
            .sort("-finalScore")
            .limit(Number(limit))
            .select("-_id -__v")
            .lean()
            .then(games => {
                if (games.length === 0)
                    throw new NotFoundError(`no games found`);

                return games;
            })
            .then(async gameInfo => {
                const gameInfoMap = gameInfo.map(async oneGame => {
                    const platformName = await Platform.find({
                        id: oneGame.platform
                    })
                        .select("name")
                        .lean();
                    oneGame.platformName = platformName[0].name;
                    return oneGame;
                });
                gameInfo = await Promise.all(gameInfoMap);
                return gameInfo;
            })
            .then(async gameInfo => {
                const gameInfoMap = gameInfo.map(async oneGame => {
                    const cover = await Boxart.find({ id_game: oneGame.id })
                        .select("-_id -__v")
                        .lean();
                    if (cover.length === 0) {
                        oneGame.boxartUrl = false;
                    } else {
                        oneGame.boxartUrl = cover[0].images.find(
                            image => image.side === "front"
                        ).filename;
                    }

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

    retrieveAllUsers() {
        return User.find().populate({ path: "reviews", populate: { path: "game author" } })
    },

    retrieveEuclideanDistance(userReviews, otherUserReviews) {
        validate([
            { key: "userReviews", value: userReviews, type: Object },
            { key: "otherUserReviews", value: otherUserReviews, type: Object }
        ]);

        let euclideanDistances = [];
        let sumSquares = 0;
        let noGamesCoincidence = true;

        userReviews.forEach(userReview => {
            otherUserReviews.find(otherUserReview => {
                if (
                    otherUserReview.game._id.toString() ===
                    userReview.game.toString()
                ) {
                    noGamesCoincidence = false;
                    let distance = Math.abs(
                        userReview.score - otherUserReview.score
                    );
                    euclideanDistances.push({
                        game: userReview.game,
                        distance
                    });
                    sumSquares += distance * distance;
                }
                return (
                    otherUserReview.game._id.toString() ===
                    userReview.game.toString()
                );
            });
        });

        console.log(euclideanDistances);
        console.log("sumSquares : " + sumSquares);

        const euclideanDistance = Math.sqrt(sumSquares);

        console.log("euclidean distance : " + euclideanDistance);

        let euclideanSimilarity = 1 / (1 + euclideanDistance);

        if (noGamesCoincidence) euclideanSimilarity++;

        console.log("euclidean similarity : ", euclideanSimilarity);

        return {
            euclideanSimilarity,
            userComparing: otherUserReviews[0].author
        };
    },

    retrievePredictedScore(userId, gameId, body) {
        validate([
            { key: "userId", value: userId, type: String },
            { key: "gameId", value: gameId, type: String },
            { key: "body", value: body, type: Object }
        ]);

        const {
            gameInfo: { finalScore, developers, genres, platform, publishers }
        } = body;

        const dataToPrecog = {
            finalScore: [finalScore],
            developers,
            genres,
            platform: [platform],
            publishers
        };

        return User.findById(userId)
            .populate({ path: "reviews", populate: { path: "game" } })
            .select("reviews -_id")
            .lean()
            .then(user => {
                if (!user)
                    throw new NotFoundError(`user with id ${userId} not found`);

                const { reviews } = user;

                const dataToTrain = {
                    finalScore: [],
                    developers: [],
                    genres: [],
                    platform: [],
                    publishers: []
                };

                const likeGames = {
                    userScore: [],
                    finalScore: [],
                    developers: [],
                    genres: [],
                    platform: [],
                    publishers: []
                };

                const dislikeGames = {
                    userScore: [],
                    finalScore: [],
                    developers: [],
                    genres: [],
                    platform: [],
                    publishers: []
                };

                const preparingData = reviews.map(review => {
                    dataToTrain.finalScore.push([review.game.finalScore]);
                    dataToTrain.developers.push(review.game.developers);
                    dataToTrain.genres.push(review.game.genres);
                    dataToTrain.platform.push(review.game.platform);
                    dataToTrain.publishers.push(review.game.publishers);
                    if (review.score === 5 || review.score === 4) {
                        likeGames.userScore.push([review.score]);
                        likeGames.finalScore.push([review.game.finalScore]);
                        likeGames.developers.push(review.game.developers);
                        likeGames.genres.push(review.game.genres);
                        likeGames.platform.push(review.game.platform);
                        likeGames.publishers.push(review.game.publishers);
                    } else if (review.score === 2 || review.score === 1) {
                        dislikeGames.userScore.push([review.score]);
                        dislikeGames.finalScore.push([review.game.finalScore]);
                        dislikeGames.developers.push(review.game.developers);
                        dislikeGames.genres.push(review.game.genres);
                        dislikeGames.platform.push(review.game.platform);
                        dislikeGames.publishers.push(review.game.publishers);
                    }
                });

                // console.log(reviews[0]);
                // console.log("Training IA : ", dataToTrain);
                // console.log("Likes : ", likeGames);
                // console.log("Dislikes : ", dislikeGames);
                // console.log("Data to process :", dataToPrecog);

                let genreScore = 0;

                if (genres !== null) {
                    const calculatingGenreScore = genres.map(genre => {
                        let kgenre = 0;
                        likeGames.genres.forEach((genreLike, index) => {
                            let jgenre = 0;
                            if (genreLike !== null) {
                                for (let i = 0; i < genreLike.length; i++) {
                                    if (genre === genreLike[i]) {
                                        console.log(
                                            `${genre} is like ${genreLike[i]}`
                                        );
                                        // if (likeGames.userScore[index]=='5') jgenre++
                                        jgenre++;
                                    }
                                    if (i === genreLike.length - 1) {
                                        kgenre += jgenre;
                                    }
                                }
                            }
                        });
                        console.log("genre coincidence : " + kgenre);
                        console.log("genre leng: " + likeGames.genres.length);
                        if (kgenre !== 0)
                            genreScore = kgenre / likeGames.genres.length;
                    });
                }
                console.log("genresocre: " + genreScore);

                let platformScore = 0;

                if (platform !== null) {
                    // const calculatingPlatformScore = platform.map(platform => {
                    let kplatform = 0;
                    likeGames.platform.forEach((platformLike, index) => {
                        let jplatform = 0;
                        for (let i = 0; i < platformLike.length; i++) {
                            if (platform === platformLike[i]) {
                                console.log(
                                    `${platform} is like ${platformLike[i]}`
                                );
                                if (likeGames.userScore[index] == "5")
                                    jplatform++;
                                jplatform++;
                            }
                            if (i === platformLike.length - 1) {
                                kplatform += jplatform;
                            }
                        }
                    });
                    console.log("platform coincidence: " + kplatform);
                    console.log("platform leng: " + likeGames.platform.length);
                    if (kplatform !== 0)
                        platformScore = kplatform / likeGames.platform.length;
                    // });
                }
                console.log("platformsocre: " + platformScore);

                let developerScore = 0;

                if (developers !== null) {
                    const calculatingGenreScore = developers.map(developer => {
                        let kdeveloper = 0;
                        likeGames.developers.forEach((developerLike, index) => {
                            let jdeveloper = 0;
                            if (developerLike !== null) {
                                for (let i = 0; i < developerLike.length; i++) {
                                    if (developer === developerLike[i]) {
                                        console.log(
                                            `${developer} is like ${
                                                developerLike[i]
                                            }`
                                        );
                                        if (likeGames.userScore[index] == "5")
                                            jdeveloper++;
                                        jdeveloper++;
                                    }
                                    if (i === developerLike.length - 1) {
                                        kdeveloper += jdeveloper;
                                    }
                                }
                            }
                            // console.log("PUNTUACON : "+likeGames.userScore[index])
                        });
                        console.log("developer coincidence : " + kdeveloper);
                        console.log(
                            "developer leng: " + likeGames.developers.length
                        );
                        if (kdeveloper !== 0)
                            developerScore =
                                kdeveloper / likeGames.developers.length;
                    });
                }
                console.log("developerscore: " + developerScore);

                // const dataToPrecog = {};
                // if(!!finalScore) dataToPrecog.f = finalScore
                // if (!!genres) dataToPrecog.g = genres[0].toString();

                let finalScoreDeviation = 10;
                if (finalScore) finalScoreDeviation *= finalScore;
                else finalScoreDeviation = 30;

                console.log("FINAK SCREkas: " + finalScore);

                const precogScore =
                    (platformScore * 30 +
                        genreScore * 50 +
                        developerScore * 50 +
                        finalScoreDeviation) /
                    100;
                console.log("PRECOG SCORE: " + precogScore);
                return precogScore;
            });
    }

    // trials() {

    //     const dataToTrain = reviews.map(review => {
    //         const input = {};

    //         // if (!!review.game.finalScore) input.f = review.game.finalScore;
    //         // if (!!review.game.developers)
    //         //     input.d = review.game.developers[0];
    //         if (!!review.game.genres)
    //             input.g = review.game.genres[0].toString();
    //         // if (!!review.game.platform) input.pl = review.game.platform[0];
    //         // if (!!review.game.publishers)
    //         //     input.pu = review.game.publishers[0];

    //         const outputKey = `star${review.score.toString()}`;
    //         const output = {};
    //         output[outputKey] = 1;

    //         return { input, output };
    //     });

    //     const brain = require("brain.js");

    //     const precog = new brain.NeuralNetwork({
    //         // iterations: 40000,

    //         activation: "sigmoid",
    //         //  leakyReluAlpha: 0.01,
    //         hiddenLayers: [4]
    //     });

    //     console.log("Training IA : ", precog.train(dataToTrain));

    //     const dataToPrecog = {};
    //     // if(!!finalScore) dataToPrecog.f = finalScore
    //     if (!!genres) dataToPrecog.g = genres[0].toString();

    //     const precogScore = precog.run(dataToPrecog);
    //     console.log(dataToTrain);
    //     console.log("precog data: ", dataToPrecog);
    //     console.log(genres);

    //     console.log("Running IA : ", precogScore);

    //     return precogScore;

    // }
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
