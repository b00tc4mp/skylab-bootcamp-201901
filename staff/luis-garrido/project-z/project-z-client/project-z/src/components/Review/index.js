import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const { REACT_APP_THUMB: gameCover } = process.env;

const Review = ({ review }) => {
    const [date, setDate] = useState("");
    const [y, setY] = useState("");
    const [m, setM] = useState("");
    const [d, setD] = useState("");
    const [h, setH] = useState("");
    const [min, setMin] = useState("");
    const [s, setS] = useState("");

    useEffect(() => {
        const date = new Date(review.date);

        setY(date.getFullYear());
        setM(date.getMonth() + 1);
        setD(date.getDate());
        setH(date.getHours());
        setMin(date.getMinutes());
        setS(date.getSeconds());
    });

    const starScores = score => {
        let stars = [];
        for (let i = 0; i < score; i++) {
            stars.push(
                <i
                    key={Math.random()}
                    className="game-profile-stars fas fa-star"
                />
            );
        }
        return stars;
    };

    return (
        <article>
            <div>
                <p>
                    Author:{" "}
                    {review.author !== null ? (
                        <Link to={`/user/${review.author.username}`}>
                            {review.author.username}
                        </Link>
                    ) : (
                        "anon"
                    )}
                </p>
                <p>Date: {`${y} / ${m} / ${d} - ${h}:${min}:${s}`}</p>
                <p>Score: {starScores(review.score)}</p>
                <p>Text: {review.text}</p>
                <p>------------------</p>
            </div>
        </article>
    );
};

export default withRouter(Review);
