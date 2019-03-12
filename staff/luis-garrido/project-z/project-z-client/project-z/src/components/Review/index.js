import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const { REACT_APP_THUMB: gameCover } = process.env;

const Review = ({ review, printFrom }) => {
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

    return (
        <article>
            <div>
                {review.author !== null ? (
                    review.author.username !== undefined ? (
                        <p>
                            {" "}
                            Author:{" "}
                            <Link to={`/user/${review.author.username}`}>
                                {review.author.username}
                            </Link>
                        </p>
                    ) : (
                        ""
                    )
                ) : (
                    <p> Author: Anonymous</p>
                )}
                {review.game.game_title && (
                    <p>
                        Title:{" "}
                        <Link to={`/game/${review.game.id}`}>
                            {review.game.game_title}
                        </Link>
                    </p>
                )}
                <p>Date: {`${y} / ${m} / ${d} - ${h}:${min}:${s}`}</p>
                <p>Score: {starScores(review.score)}</p>
                {review.text && <p>Text: {review.text}</p>}
                <p>{printFrom}</p>
                <p>------------------</p>
            </div>
        </article>
    );
};

export default withRouter(Review);
