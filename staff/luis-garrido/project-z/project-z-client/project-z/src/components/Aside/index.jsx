"use strict";

import React, { Fragment } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

const Aside = props => {
    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        props.history.push(`/${user.username}`);
    };

    const onSearchClick = () => {
        props.searchFocus.current.focus();
    };

    return (
        <Fragment>
            <div className="navbar-tablet__logo">
                <p className="navbar-tablet__logo--project">PROJECT</p>
                <p className="navbar-tablet__logo--z">Z</p>
            </div>
            <div className="navbar-tablet__icons" onClick={
                        logic.__userApiToken__ !== null
                            ? getUsernameLogged
                            : () => props.history.push(`/login`)
                    }>
                <i className="fas fa-user-ninja" />
            </div>
            <div className="navbar-tablet__icons" onClick={onSearchClick}>
                <i className="fas fa-search" />
            </div>
            <div className="navbar-tablet__icons">
                    <i
                        className="game-review-stars fas fa-star"
                        onClick={() => props.history.push("/random")}
                    />
                </div>
            <div className="navbar-tablet__icons" onClick={() => props.history.push("/")}>
                <i className="fas fa-dungeon" />
            </div>
            <div className="navbar-tablet__icons">
                <i className="fas fa-bookmark" />
            </div>
            <div className="navbar-tablet__icons" onClick={() => props.history.push("/ranking")}>
                <i className="fas fa-trophy" />
            </div>
        </Fragment>
    );
};

export default withRouter(Aside);
