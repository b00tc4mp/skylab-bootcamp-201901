import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import auth from '../../services/auth';

import Profile from './Profile';

function Header() {
	return (
		<header className="header">
			<div className="header__content-left">
				<div className="header__menu">
					<div className="nav-bars">
						<span className="nav-bars__bar" />
					</div>
					MENU
				</div>
			</div>
			<div className="header__content-right">
				<div className="header__search">
					<button className="header__search-button toggle-search">
						<FontAwesomeIcon icon="search" />
					</button>
				</div>
				<div className="header__logo">
					<h1 className="header__logo-title">
						TRIVI<span>APP</span>
					</h1>
				</div>
				{auth.isUserLoggedIn || (
					<Fragment>
						<Link
							to="/signup"
							title="Sign up"
							className="btn__link header__btn-signup black"
						>
							Sign up
						</Link>

						<Link
							to="/login"
							title="Log in"
							className="btn__link btn__link--green header__btn-login"
						>
							Log in
						</Link>
					</Fragment>
				)}

				{auth.isUserLoggedIn && (
					<Profile />
				)}
			</div>
		</header>
	);
}

export default Header;
