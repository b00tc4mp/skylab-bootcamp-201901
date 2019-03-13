"use strict";

import React, { Fragment } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

const Footer = props => {
    const getUsernameLogged = async () => {
        const lol = await logic.retrieveUserInfo();
        props.history.push(`/user/${lol.username}`);
    };

    const onSearchClick = () => {
        props.searchFocus.current.focus();
    };

    return (
        <Fragment>
            <div className="nav-mobile">
                <div
                    onClick={
                        logic.__userApiToken__ !== null
                            ? getUsernameLogged
                            : () => props.history.push(`/login`)
                    }
                    className="nav-mobile__icons"
                >
                    <i className="fas fa-user-ninja" />
                </div>
                <div onClick={onSearchClick} className="nav-mobile__icons">
                    <i className="fas fa-search" />
                </div>
                <div className="nav-mobile__icons">
                    <i
                        className="game-review-stars fas fa-star"
                        onClick={() => props.history.push("/random")}
                    />
                </div>
                <div
                    onClick={() => props.history.push("/")}
                    className="nav-mobile__icons"
                >
                    <i className="fas fa-dungeon" />
                </div>
                <div className="nav-mobile__icons">
                    <i className="fas fa-bookmark" />
                </div>
            </div>

            <div className="footer">
                <div className="nav-mobile__icons">
                    Build with (heart) by QWc
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Footer);
