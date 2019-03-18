import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import auth from '../../services/auth';

function JoinGameButton() {

	if(auth.isUserLoggedIn) {
		return (
			<section className="quizz-actions">
				<Link
					to="/pin"
					title="Create Quiz"
					className="quizz-actions__create quizz-actions__link btn-link-action"
				>
					<FontAwesomeIcon icon="gamepad" />
					Join game
				</Link>
			</section>
		);
	}

	return '';
	
}

export default JoinGameButton;
