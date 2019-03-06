import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="build">
					Build with <FontAwesomeIcon icon="heart" /> by {' '}
					<a href="https://github.com/robert-z" className="build__author black">
						robert-z
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
