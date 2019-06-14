import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../services/game';

function PlayGame(props) {

	const create = async () => {
		try {
			const game = await gameService.create(props.id);
			props.history.push(`/game/${game.id}/welcome`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button className="quiz__play" onClick={create}>
			<FontAwesomeIcon icon="play-circle" /> Play
		</button>
	);
}

export default withRouter(PlayGame);
