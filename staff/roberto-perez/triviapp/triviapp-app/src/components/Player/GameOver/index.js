import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../../services/game';

import PlayerContext from '../PlayerContext';

import feedback from '../../../utils/feedback';

function GameOver(props) {
	
	const { gameID, timeOut } = useContext(PlayerContext);

	const [points, setPoints] = useState(null);

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
		try {
			const score = await gameService.getScore(gameID);

			const p = Object.keys(score).map(pod => {
				return { user: score[pod].user, score: score[pod].score };
			});

			setPoints(p);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	const leaveGame = async () => {
		try {
			await gameService.leaveGame(gameID);
			props.history.replace(`/`);
		} catch (error) {
			feedback(error.message, 'error');
		}
	}

	return (
		<Fragment>
			{points && (
				<div className="player-game player-game--green">
					<div className="player-game__getready game-result">
						<h2>{points[0].score} points</h2>
						<h4>
							<button to="/" onClick={leaveGame} className="btn-return">Return</button>
						</h4>
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default withRouter(GameOver);
