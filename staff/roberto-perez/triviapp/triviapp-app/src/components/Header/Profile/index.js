import React, { useState, useRef, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import auth from '../../../services/auth';

function Profile(props) {
	const wrapperRef = useRef(null);
	const [isHidden, setisHidden] = useState(true);

	const currentUser = auth.userLoggedIn;

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	const handleClickOutside = Event => {
		if (wrapperRef.current && !wrapperRef.current.contains(Event.target)) {
			setisHidden(true);
		}
	};

	const toggleHidden = () => {
		setisHidden(!isHidden);
	};

	const logOut = Event => {
		Event.preventDefault();

		auth.logOutUser();

		props.history.push('/');
	};

	return (
		<div className="header__profile">
			<div className="user-profile user-profile--open" ref={wrapperRef}>
				<button className="user-profile__button" onClick={toggleHidden}>
					{currentUser.picture ? (
						<img
							src={currentUser.picture}
							className="user-profile__image"
							alt=""
						/>
					) : (
						<img
							src="https://lh3.googleusercontent.com/-0kr9v-5o9RM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcc3TZ7vPev4bzJ8FioZBz6Qs7Rpw/s64-c-mo/photo.jpg"
							className="user-profile__image"
							alt=""
						/>
					)}
				</button>

				{!isHidden && (
					<div className="user-dropdown user-dropdown--open">
						<div className="user-dropdown__details">
							<ul>
								<li className="user-dropdown__username">
									<strong>{currentUser.name}</strong>
								</li>
								<li className="user-dropdown__email">
									{currentUser.email}
								</li>
							</ul>
						</div>
						<div className="user-dropdown__items">
							<Link
								to="/dashboard"
								title="Settings"
								className="user-dropdown__list-item"
								onClick={toggleHidden}
							>
								<FontAwesomeIcon icon="tachometer-alt" /> Dashboard
							</Link>

							<Link
								to="/user/profile"
								title="Profile"
								className="user-dropdown__list-item"
								onClick={toggleHidden}
							>
								<FontAwesomeIcon icon="user-circle" /> Profile
							</Link>

							<a
								href="/"
								title="Log out"
								className="user-dropdown__list-item"
								onClick={logOut}
							>
								<FontAwesomeIcon icon="sign-out-alt" /> Log out
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default withRouter(Profile);
