import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";

const { REACT_APP_THUMB: gameCover } = process.env;

const UserProfile = props => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        retrieveUserInfo(props.match.params.username);
    }, [props.match.params.username]);

    const retrieveUserInfo = async username =>
        setUserInfo(await logic.retrieveUserInfoByUsername(username));

    const handleLogout = () => {
        logic.logOutUser();
        sessionStorage.clear();

        props.history.push("/");
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">USER PROFILE</h1>
                </div>
                <div className="user-profile">
                    <h2>{userInfo.name}</h2>
                    <p>{userInfo.username}</p>
                    <h2>{userInfo.email}</h2>
                </div>
                {logic.__userApiUsername__ === userInfo.username && (
                    <button onClick={handleLogout} className="menu__link">
                        <i className="fas fa-lock" />
                        Logout
                    </button>
                )}
            </div>
        </Fragment>
    );
};

export default withRouter(UserProfile);
