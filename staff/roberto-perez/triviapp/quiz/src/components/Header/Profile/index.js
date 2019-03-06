import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Profile(props) {
	
    const toggleMenu = (Event) => {
        
    };

	return (
		<div className="header__profile" onClick={toggleMenu}>
			<div className="user-profile">
				<button className="user-profile__button">
					<img
						src="https://lh3.googleusercontent.com/-0kr9v-5o9RM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcc3TZ7vPev4bzJ8FioZBz6Qs7Rpw/s64-c-mo/photo.jpg"
						className="user-profile__image"
						alt=""
					/>
				</button>

				<div className="user-dropdown">
					<div className="user-dropdown__details">
						<ul>
							<li className="user-dropdown__username">
								<strong>robert-z</strong>
							</li>
							<li className="user-dropdown__email">robert-z@hotmail.es</li>
						</ul>
					</div>
					<div className="user-dropdown__items">

                        <Link
							to="/user/settings"
							title="Settings"
							className="user-dropdown__list-item"
						>
							<FontAwesomeIcon icon="cog" /> Settings
						</Link>

                        <Link
							to="/logout"
							title="Log out"
							className="user-dropdown__list-item"
						>
							<FontAwesomeIcon icon="signOutAlt" /> Log out
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
