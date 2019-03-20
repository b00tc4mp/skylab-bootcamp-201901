"use strict";

import React, { Fragment } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logic from "../../logic";
import "./index.sass";

const Footer = props => {
    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        props.history.push(`/${user.username}`);
    };

    const onSearchClick = () => {
        props.searchFocus.current.focus();
    };

    const notify = message => {
        toast.dismiss()
        toast.error(message)
    };

    const onProfileClick = () => {
        if( logic.__userApiToken__ !== null ) {
            logic.retrieveUserInfo()
            .then(() => getUsernameLogged())
            .catch(({ message }) => notify(message))
        }
        else {
            props.history.push(`/login`)
        }

    }

    return (
        <Fragment>
            <div className="nav-mobile">
                <div
                    onClick={onProfileClick}
                    className="nav-mobile__icons"
                >
                    <i className="fas fa-user-ninja" />
                </div>
                <div
                    className="nav-mobile__icons"
                    onClick={() => props.history.push("/ranking")}
                >
                    <i className="fas fa-trophy" />
                </div>
                <div
                    onClick={() => props.history.push("/")}
                    className="nav-mobile__icons"
                >
                    <i className="fas fa-house-damage" />
                </div>
                <div className="nav-mobile__icons">
                    <i
                        className="fas fa-random"
                        onClick={() => props.history.push("/random")}
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
