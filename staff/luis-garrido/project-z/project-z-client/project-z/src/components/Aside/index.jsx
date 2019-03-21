"use strict";

import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logic from "../../logic";
import "./index.sass";

const Aside = ({ history, searchFocus }) => {
    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        history.push(`/${user.username}`);
    };

    const onSearchClick = () => {
        searchFocus.current.focus();
    };

    const notify = message => toast(message);

    const onProfileClick = () => {
        if (logic.__userApiToken__ !== null) {
            logic
                .retrieveUserInfo()
                .then(() => getUsernameLogged())
                .catch(({ message }) => notify(message));
        } else {
            history.push(`/login`);
        }
    };

    return (
        <Fragment>
            <div
                className="navbar-tablet__logo"
                onClick={() => history.push("/")}
            >
                <p className="navbar-tablet__logo--project">PROJECT</p>
                <p className="navbar-tablet__logo--z">Z</p>
            </div>
            <div className="navbar-tablet__icons" onClick={onProfileClick}>
                <i className="fas fa-user-ninja" />
            </div>
            <div className="navbar-tablet__icons" onClick={onSearchClick}>
                <i className="fas fa-search" />
            </div>
            <div className="navbar-tablet__icons">
                <i
                    className="fas fa-random"
                    onClick={() => history.push("/random")}
                />
            </div>
            <div
                className="navbar-tablet__icons"
                onClick={() => history.push("/")}
            >
                <i className="fas fa-house-damage" />
            </div>

            <div
                className="navbar-tablet__icons"
                onClick={() => history.push("/ranking")}
            >
                <i className="fas fa-trophy" />
            </div>
        </Fragment>
    );
};

export default withRouter(Aside);
