"use strict";

import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logic from "../../logic";
import "./index.sass";

const Footer = ({ history, searchFocus }) => {
    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        history.push(`/${user.username}`);
    };

    const onSearchClick = () => {
        searchFocus.current.focus();
    };

    const notify = message => {
        toast.dismiss();
        toast.error(message);
    };

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
            <div className="nav-mobile">
                <div onClick={onProfileClick} className="nav-mobile__icons">
                    <i className="fas fa-user-ninja" />
                </div>
                <div
                    className="nav-mobile__icons"
                    onClick={() => history.push("/ranking")}
                >
                    <i className="fas fa-trophy" />
                </div>
                <div
                    onClick={() => history.push("/")}
                    className="nav-mobile__icons"
                >
                    <i className="fas fa-house-damage" />
                </div>
                <div className="nav-mobile__icons">
                    <i
                        className="fas fa-random"
                        onClick={() => history.push("/random")}
                    />
                </div>
                <div onClick={onSearchClick} className="nav-mobile__icons">
                    <i className="fas fa-search" />
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
