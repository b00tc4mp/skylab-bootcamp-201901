import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import auth from '../../services/auth';

function Menu() {
	return (
		<nav className="nav">
			<ul className="nav__menu">
				{auth.isUserLoggedIn || (
					<Fragment>
						<li className="nav__menu-item">
							<Link to="/signup" title="Sign up" className="nav__menu-link">
								Sign up
							</Link>
						</li>
						<li className="nav__menu-item">
							<Link to="/login" title="Log in" className="nav__menu-link">
								Log in
							</Link>
						</li>
					</Fragment>
				)}
			</ul>
		</nav>
	);
}

export default Menu;
