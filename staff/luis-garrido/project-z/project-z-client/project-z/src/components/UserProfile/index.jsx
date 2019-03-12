import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";

import Review from "../Review";

const { REACT_APP_THUMB: gameCover } = process.env;

const UserProfile = props => {
    const [userInfo, setUserInfo] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        retrieveUserInfo(props.match.params.username);
        getUsernameLogged();
    }, [props.match.params.username]);

    const retrieveUserInfo = async username =>
        setUserInfo(await logic.retrieveUserInfoByUsername(username));

    const handleLogout = () => {
        props.history.push("/logout");
    };

    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        setUsername(user.username);
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">USER PROFILE</h1>
                </div>
                <div className="user-profile">
                    <h2>{`${userInfo.name} ${userInfo.surname}`}</h2>
                    <p>{userInfo.username}</p>
                    <h2>{userInfo.email}</h2>
                </div>
                {username === userInfo.username && (
                    <button onClick={handleLogout} className="menu__link">
                        <i className="fas fa-lock" />
                        Logout
                    </button>
                )}
                {userInfo.reviews && !!userInfo.reviews.length && (
                    <div>
                        <h2>Reviews</h2>
                        {userInfo.reviews.map(review => (
                            <Review key={review._id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default withRouter(UserProfile);
