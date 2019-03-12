import React, { Fragment, useState } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Login = ({ history, gameId, refresh }) => {
    const fullStar = "game-review-stars fas fa-star";
    const emptyStar = "game-review-stars far fa-star";

    const [reviewText, setReviewText] = useState("");
    const [reviewScore, setReviewScore] = useState("");
    const [starClass1, setStarClass1] = useState(emptyStar);
    const [starClass2, setStarClass2] = useState(emptyStar);
    const [starClass3, setStarClass3] = useState(emptyStar);
    const [starClass4, setStarClass4] = useState(emptyStar);
    const [starClass5, setStarClass5] = useState(emptyStar);
    
    const scoreWithStars = () => {
        let stars = [];
        stars.push(
            <i
                className={starClass1}
                key={1}
                onClick={() => {
                    setReviewScore(1);

                    setStarClass1(fullStar);
                    setStarClass2(emptyStar);
                    setStarClass3(emptyStar);
                    setStarClass4(emptyStar);
                    setStarClass5(emptyStar);
                }}
            />
        );
        stars.push(
            <i
                className={starClass2}
                key={2}
                onClick={() => {
                    setReviewScore(2);

                    setStarClass1(fullStar);
                    setStarClass2(fullStar);
                    setStarClass3(emptyStar);
                    setStarClass4(emptyStar);
                    setStarClass5(emptyStar);
                }}
            />
        );
        stars.push(
            <i
                className={starClass3}
                key={3}
                onClick={() => {
                    setReviewScore(3);

                    setStarClass1(fullStar);
                    setStarClass2(fullStar);
                    setStarClass3(fullStar);
                    setStarClass4(emptyStar);
                    setStarClass5(emptyStar);
                }}
            />
        );
        stars.push(
            <i
                className={starClass4}
                key={4}
                onClick={() => {
                    setReviewScore(4);

                    setStarClass1(fullStar);
                    setStarClass2(fullStar);
                    setStarClass3(fullStar);
                    setStarClass4(fullStar);
                    setStarClass5(emptyStar);
                }}
            />
        );
        stars.push(
            <i
                className={starClass5}
                key={5}
                onClick={() => {
                    setReviewScore(5);

                    setStarClass1(fullStar);
                    setStarClass2(fullStar);
                    setStarClass3(fullStar);
                    setStarClass4(fullStar);
                    setStarClass5(fullStar);
                }}
            />
        );

        return stars;
    };

    // FULL STAR // <i class="fas fa-star"></i>
    // EMPTY STAR // <i class="far fa-star"></i>
    // HALF STAR // <i class="fas fa-star-half-alt"></i>

    const handleReviewTextInput = ({ target: { value: reviewText } }) => {
        setReviewText(reviewText);
    };

    const handleReviewScoreInput = ({ target: { value: reviewScore } }) => {
        setReviewScore(reviewScore);
    };

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            logic
                .postReview(gameId, reviewText, reviewScore)
                .then(() => {
                    setReviewText("");
                    setReviewScore("");
                    refresh(gameId);
                })
                .catch(error => {
                    // setFeedbackLogin(error.message);
                });
        } catch ({ message }) {
            // setFeedbackLogin(message);
        }
    };

    return (
        <Fragment>
            <div className="forms">
                <form className="review-form" onSubmit={handleLoginSubmit}>
                    <div>
                        <input
                            className="review-form__input"
                            type="text"
                            name="reviewText"
                            placeholder="Write your review..."
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={reviewText}
                            onChange={handleReviewTextInput}
                        />
                    </div>
                    <div>
                        <p>{scoreWithStars()}</p>
                    </div>
                    <div>
                        <input
                            className="review-form__input"
                            type="text"
                            name="reviewScore"
                            placeholder="score"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            value={reviewScore}
                            onChange={handleReviewScoreInput}
                        />
                    </div>
                    <button className="review-form__button">Rate!</button>
                </form>
            </div>
        </Fragment>
    );
};

export default withRouter(Login);
