import React, { Fragment, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import logic from "../../logic";

import RankingCard from "../RankingCard";
import Review from "../Review";

const RecommendedReviews = props => {
    const [ranking, setRanking] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [newbieMessage, setNewbieMessage] = useState(null);

    useEffect(() => {
        getRanking();
        logic.isUserLoggedIn && getSimilarUsersReviews();
    }, []);

    const getRanking = async () => {
        setRanking(await logic.retrieveBestScored("5"));
    };

    const getSimilarUsersReviews = async () => {
        const user = await logic.retrieveUserInfo();
        if (user.reviews.length === 0) {
            setNewbieMessage(
                <p>
                    Start rating games to receive personalized reviews from
                    similar users!
                </p>
            );
            return false;
        }
        const {
            similarityList,
            allUsers
        } = await logic.retrieveSimilarUsersReviews();

        console.log(allUsers);
        console.log(similarityList);

        let _similarUsers = [];

        if (user.reviews.length === 0) return "";
        // for (let i = 0; i < similarityList.length; i++) {
        for (let i = 0; i < 10; i++) {
            let similarUsers = allUsers.find(user => {
                return user.username === similarityList[i].usernameComparing;
            });
            _similarUsers.push(similarUsers);
            if (similarityList.length - 1 === i) i = 10;
        }

        let _recommendations = [];

        if (_similarUsers.length > 0) {
            for (let i = 0; i < _similarUsers.length; i++) {
                const recommend = _similarUsers[i].reviews.filter(review => {
                    return review.score > 3;
                });
                for (let j = 0; j < recommend.length; j++) {
                    _recommendations.push(recommend[j]);
                }
            }
        }

        console.log(_recommendations);
        console.log(user);
        let _filterRecommendations = [];

        if (_recommendations.length > 0) {
            _filterRecommendations = _recommendations.filter(recReview => {
                if (
                    user.reviews.some(userReview => {
                        return userReview.game === recReview.game._id;
                    })
                )
                    return false;
                else return true;
            });
        }

        console.log(_filterRecommendations);
        let _filterFive = [];

        if (_filterRecommendations.length > 0) {
            for (let i = 0; i < 5; i++) {
                _filterFive.push(
                    _filterRecommendations.splice(
                        Math.floor(
                            Math.random() * _filterRecommendations.length - 1
                        ),
                        1
                    )[0]
                );
            }
        }

        console.log(_filterFive);

        setRecommendations(_filterFive);
    };
    console.log(recommendations);
    return (
        <Fragment>
            <div className="top-landing">
                <div className="header">
                    <h2 className="header__title">Recommended Reviews</h2>
                </div>
                <div className="top-landing__results">
                    {recommendations.length ? (
                        recommendations
                            // .reverse()
                            .map((recommendation, index) => {
                                if (recommendation === undefined) return "";
                                return (
                                    <Review
                                        index={index + 1}
                                        key={recommendation._id}
                                        review={recommendation}
                                        printFrom={"landingPage"}
                                    />
                                );
                            })
                    ) : (
                        <div className="no-recommendations">
                            <p>No more recommendations for now.</p>
                            <p> Keep calm and <Link to="/random">RATE GAMES</Link>!</p>
                        </div>
                    )}
                    {newbieMessage && (
                        <p className="welcome">{newbieMessage}</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default RecommendedReviews;
