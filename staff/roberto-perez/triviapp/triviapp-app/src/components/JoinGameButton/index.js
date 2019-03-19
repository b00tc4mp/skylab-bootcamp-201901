import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import auth from '../../services/auth';

function JoinGameButton() {

	if(auth.isUserLoggedIn) {
		return (
				<Link
					to="/pin"
					title="Join Game"
					className="quizz-actions__create btn-link-join-game quizz-actions__link btn-link-action"
				>
					<FontAwesomeIcon icon="gamepad" />
					Join game
				</Link>
		);
	}

	return '';
	
}

export default JoinGameButton;
