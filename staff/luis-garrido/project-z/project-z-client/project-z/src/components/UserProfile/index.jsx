import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";

import Review from "../Review";

const { REACT_APP_THUMB: gameCover } = process.env;

const UserProfile = ({
    history,
    match: {
        params: { username: _username }
    }
}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [username, setUsername] = useState("");
    const [adorableAvatar, setAdorableAvatar] = useState("");

    useEffect(() => {
        retrieveUserInfo(_username);
        logic.isUserLoggedIn && getUsernameLogged();
        setAdorableAvatar(
            `https://api.adorable.io/avatars/285/${_username}.png`
        );
    }, [_username]);

    const retrieveUserInfo = async username =>
        setUserInfo(await logic.retrieveUserInfoByUsername(username));

    const handleLogout = () => {
        history.push("/logout");
    };

    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        setUsername(user.username);
    };

    return (
        <Fragment>
            <div className="review-page">
                <div className="header">
                    <h1 className="header__title">{userInfo.username}</h1>
                </div>
                <div className="user-profile">
                    <div className="user-profile__info">
                        <img
                            className="avatar-profile"
                            src={adorableAvatar}
                            alt="default avatar"
                        />
                        <h2>{`${userInfo.name} ${userInfo.surname}`}</h2>
                    </div>
                    <div className="user-profile__logout">
                        {username === userInfo.username && (
                            <button onClick={handleLogout} className="logout">
                                <i className="fas fa-lock" /> Logout
                            </button>
                        )}
                    </div>
                </div>
                {userInfo.reviews && !!userInfo.reviews.length && (
                    <div><div className="header">
                    <h2 className="header__title">USER REVIEWS</h2>
                </div>
                        {userInfo.reviews.reverse().map((review,index) => (
                            <Review
                                index={index+1}
                                key={review._id}
                                review={review}
                                printFrom={"userProfile"}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default withRouter(UserProfile);
