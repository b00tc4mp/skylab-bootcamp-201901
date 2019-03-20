import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logic from "../../logic";

import Review from "../Review";
import { lookup } from "dns";

const { REACT_APP_THUMB: gameCover } = process.env;

const NoResults = ({
    history,
    match: {
        params: { username: _username }
    }
}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [username, setUsername] = useState("");
    const [adorableAvatar, setAdorableAvatar] = useState("");

    const notify = message => {
        toast.dismiss()
        toast.error(message)
    };

    useEffect(() => {
        setAdorableAvatar(
            `https://api.adorable.io/avatars/285/${_username}.png`
        );
    }, [_username]);

    return (
        <Fragment>
            <div className="review-page">
                <div className="header">
                    <h2 className="header__title">{'NO RESULTS'}</h2>
                </div>
                <div className="user-profile">
                    <div className="user-profile__info">
                        <img
                            className="avatar-profile"
                            src={adorableAvatar}
                            alt="default avatar"
                        />
                        <h2>{'NO RESULTS ON THAT SEARCH'}</h2>
                        <p>You may want to try luck with a <Link to="/random">RANDOM GAME</Link>!</p>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(NoResults);
