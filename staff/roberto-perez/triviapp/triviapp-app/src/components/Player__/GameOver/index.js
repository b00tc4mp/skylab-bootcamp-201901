import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../../services/game';

function GameOver(props) {
	const [points, setPoints] = useState(null);

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
		try {
			const score = await gameService.getScore(props.gameId);

			const p = Object.keys(score).map(pod => {
				return { user: score[pod].user, score: score[pod].score };
			});

			console.log(p);
			setPoints(p);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
			{points && (
				<div className="player-game player-game--green">
					<div className="player-game__getready game-result">
						<h2>{points[0].score} points</h2>
						<h4>
							<Link to="/" className="btn-return">Return</Link>
						</h4>
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default withRouter(GameOver);
