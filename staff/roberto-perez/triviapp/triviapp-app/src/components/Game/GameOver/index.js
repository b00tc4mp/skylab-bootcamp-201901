import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import gameService from '../../../services/game';

import GameContext from '../GameContext';

function GameOver(props) {

	const { gameID } = useContext(GameContext);


	const [podium, setPodium] = useState([]);

	useEffect(() => {
		getPodium();
	}, []);

	const getPodium = async () => {
		console.log('GAMEOVER!');
		try {
			const gamePodium = await gameService.getPodium(gameID);

			const p = Object.keys(gamePodium).map(pod => {
				return { user: gamePodium[pod].user, score: gamePodium[pod].score };
			});
			p.sort((a, b) => {
				return b.score - a.score;
			})
			
			setPodium(p);
		} catch (error) {
			console.log(error);
		}
	};

	const leaveGame = async () => {
		try {
			await gameService.leaveGame(gameID);
			props.history.replace(`/`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">Podium</h1>
			</header>
			<div className="end-game-results">
				<div className="current-quiz__answers">
					<button className="start-button" onClick={leaveGame}>
						Return
					</button>
				</div>

				<div className="scoreboard-podiums">
					<div className="scoreboard-podiums__podium">
						<div className="scoreboard-podiums__podium-base scoreboard-podiums__podium-base--second is-expanding">
							<div className="scoreboard-podiums__podium-name">
								{podium[1] && podium[1].user.name}
							</div>
							<div className="scoreboard-podiums__podium-rank">2</div>
							<div className="scoreboard-podiums__podium-info">
								<span>{podium[1] && podium[1].score + 'points'}</span>
							</div>
						</div>
					</div>

					<div className="scoreboard-podiums__podium">
						<div className="scoreboard-podiums__podium-base scoreboard-podiums__podium-base--first">
							<div className="scoreboard-podiums__podium-name">
								{podium[0] && podium[0].user.name}
							</div>
							<div className="scoreboard-podiums__podium-rank">1</div>
							<div className="scoreboard-podiums__podium-info">
								<span>{podium[0] && podium[0].score + 'points'}</span>
							</div>
						</div>
					</div>

					<div className="scoreboard-podiums__podium">
						<div className="scoreboard-podiums__podium-base scoreboard-podiums__podium-base--third is-expanding">
							<div className="scoreboard-podiums__podium-name">
								{podium[2] && podium[2].user.name}
							</div>
							<div className="scoreboard-podiums__podium-rank">3</div>
							<div className="scoreboard-podiums__podium-info">
								<span>{podium[2] && podium[2].score + 'points'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(GameOver);
