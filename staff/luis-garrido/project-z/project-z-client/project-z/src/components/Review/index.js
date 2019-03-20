import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const {
    REACT_APP_THUMB: gameCover,
    REACT_APP_NOT_FOUND_IMAGE_URL: notFoundImage
} = process.env;

const Review = ({ index, history, review, printFrom }) => {
    const [y, setY] = useState("");
    const [m, setM] = useState("");
    const [d, setD] = useState("");
    const [h, setH] = useState("");
    const [min, setMin] = useState("");
    const [s, setS] = useState("");
    const [printedFrom, setPrintedFrom] = useState("");

    useEffect(() => {
        setPrintedFrom(printFrom);

        const date = new Date(review.date);

        setY(date.getFullYear());
        setM(date.getMonth() + 1);
        setD(date.getDate());

        let hour = date.getHours();
        if (Number(hour) < 10) hour = "0" + hour;
        setH(hour);

        let minutes = date.getMinutes();
        if (Number(minutes) < 10) minutes = "0" + minutes;
        setMin(minutes);

        let seconds = date.getSeconds();
        if (Number(seconds) < 10) seconds = "0" + seconds;
        setS(seconds);
    });

    const starScores = score => {
        let stars = [];
        for (let i = 0; i < score; i++) {
            stars.push(
                <i key={i} className="game-profile-stars fas fa-star" />
            );
        }
        return stars;
    };
    console.log(review);

    const reviewClass =
        index % 2 === 0
            ? "review-card review-card--background-even"
            : "review-card";

    // onClick={() => history.push(`/game/${review.game.id}`)}

    return (
        <article className={reviewClass}>
            <div>
                {review.author !== null ? (
                    printFrom === "gameProfile" ||
                    printFrom === "landingPage" ? (
                        <div>
                            <img
                                onClick={() =>
                                    history.push(`/${review.author.username}`)
                                }
                                className="avatar-review"
                                src={`https://api.adorable.io/avatars/285/${
                                    review.author.username
                                }.png`}
                                alt="default avatar"
                            />
                        </div>
                    ) : (
                        ""
                    )
                ) : (
                    <div>
                        <img
                            className="avatar-review"
                            src={`https://api.adorable.io/avatars/285/anonymous.png`}
                            alt="default avatar"
                        />
                    </div>
                )}

                {(printFrom === "userProfile" || printFrom === "landingPage") &&
                    (review.boxart ? (
                        <img
                            onClick={() =>
                                history.push(`/game/${review.game.id}`)
                            }
                            className="review-card__image"
                            src={`${gameCover}${review.boxart}`}
                            alt={review.game.game_title}
                        />
                    ) : (
                        <img
                            onClick={() =>
                                history.push(`/game/${review.game.id}`)
                            }
                            className="review-card__image"
                            src={notFoundImage}
                            alt={review.game.game_title}
                        />
                    ))}
            </div>
            <div>
                {(printFrom === "userProfile" ||
                    printFrom === "landingPage") && (
                    <h3>
                        <Link to={`/game/${review.game.id}`}>
                            {review.game.game_title}
                        </Link>
                    </h3>
                )}

                {review.author !== null ? (
                    printFrom === "gameProfile" ? (
                        <h3>
                            <Link to={`/${review.author.username}`}>
                                {review.author.username}
                            </Link>
                        </h3>
                    ) : printFrom === "landingPage" ? (
                        <h3>
                            <Link to={`/${review.author.username}`}>
                                <span className="review-landing">
                                    {review.author.username}
                                </span>
                            </Link>
                        </h3>
                    ) : (
                        ""
                    )
                ) : (
                    <h3>Anonymous</h3>
                )}

                <p>{starScores(review.score)}</p>
                {review.title && (
                    <h3 className="review-card__title">{review.title}</h3>
                )}

                <p className="review-card__date">{`${y}/${m}/${d}`}</p>
                {review.text && <p>{review.text}</p>}
            </div>
        </article>
    );
};

export default withRouter(Review);
