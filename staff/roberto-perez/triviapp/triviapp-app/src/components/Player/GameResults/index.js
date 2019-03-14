import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../../services/game';

function GameResults(props) {
	const {
		match: {
			params: { gameId },
		},
	} = props;

	const [success, setSuccess] = useState(null);

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
		try {
			const answer = await gameService.getLastAnswer(gameId);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
			{success && (
				<div className="player-game player-game--green">
					<div className="player-game__getready game-result">
						<h2>Correct</h2>
						<h4>
							<FontAwesomeIcon icon="check-circle" />
						</h4>
					</div>
				</div>
			)}

			{!success || (
				<div className="player-game player-game--red">
					<div className="player-game__getready game-result">
						<h2>Correct</h2>
						<h4>
							<FontAwesomeIcon icon="times" />
						</h4>
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default withRouter(GameResults);
