import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Random = props => {
    useEffect(() => {
        getRandomGame();
    });

    const getRandomGame = async () => {
        const randomGame = await logic.getRandomGame();

        props.history.push(`/game/${randomGame.id.toString()}`);
    };

    return null;
};

export default withRouter(Random);
