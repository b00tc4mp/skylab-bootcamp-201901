import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logic from "../../logic";

import Review from "../Review";

const UserProfile = ({
    history,
    match: {
        params: { username: _username }
    }
}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [username, setUsername] = useState("");
    const [adorableAvatar, setAdorableAvatar] = useState("");

    const notify = message => {
        toast.dismiss();
        toast.error(message);
    };

    useEffect(() => {
        retrieveUserInfo(_username);
        logic.isUserLoggedIn && getUsernameLogged();
        setAdorableAvatar(
            `https://api.adorable.io/avatars/285/${_username}.png`
        );
    }, [_username]);

    const retrieveUserInfo = username => {
        try {
            logic
                .retrieveUserInfoByUsername(username)
                .then(res => setUserInfo(res))
                .catch(error => {
                    setUserInfo([]);
                });
        } catch ({ message }) {
            notify(message);
        }
    };

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
                    <h2 className="header__title">
                        {userInfo.length !== 0
                            ? userInfo.username
                            : "USER NOT FOUND"}
                    </h2>
                </div>
                <div className="user-profile">
                    <div className="user-profile__info">
                        <img
                            className="avatar-profile"
                            src={adorableAvatar}
                            alt="default avatar"
                        />
                        <h2>
                            {userInfo.length !== 0
                                ? `${userInfo.name} ${userInfo.surname}`
                                : "USER NOT FOUND"}
                        </h2>
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
                    <div>
                        <div className="header">
                            <h2 className="header__title">USER REVIEWS</h2>
                        </div>
                        {userInfo.reviews
                            // .reverse()
                            .map((review, index) => (
                                <Review
                                    index={index + 1}
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
