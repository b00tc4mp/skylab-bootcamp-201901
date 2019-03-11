import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import gameService from '../../../services/game';
import authService from '../../../services/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Welcome(props) {
	const [code, setCode] = useState('Connecting...');
	const [isHost, setIsHost] = useState(false);
	const [players, setPlayers] = useState([]);
	
	const {
		match: {
			params: { gameId },
		},
	} = props;

	useEffect(() => {
		console.log(props);
		getGameByQuizId(gameId);
	}, [props.match.params.gameId]);

	const getGameByQuizId = async () => {
		try {
			const game = await gameService.get(gameId);

			console.log(JSON.parse(authService.userLoggedIn).id);
			console.log(game.host);
			if (JSON.parse(authService.userLoggedIn).id !== game.host) {
				throw Error(
					'This quiz has been set to private. Ask the creator to share it with you to play',
				);
			}
			setIsHost(true);
			setCode(game.code);
			setPlayers(game.users);
		} catch (error) {
			console.error(error);
		}
	};

	const startGame = async () => {
		try {
			const game = await gameService.start(gameId);
			props.history.push(`/game/${gameId}/start`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="host-game">
			<header className="header-game-top">
				<h1 className="header-game-top__title">
					Join with Game PIN:{' '}
					<span className="header-game-top__pin">{code}</span>
				</h1>
				<button className="expand_button">
					<svg viewBox="0 0 24 24">
						<path
							id="play"
							d="m 3.4285714,15.428571 -3.42857145,0 0,8.571429 8.57142905,0 0,-3.428571 -5.1428577,0 0,-5.142858 z M -5e-8,8.5714287 l 3.42857145,0 0,-5.1428573 5.1428577,0 L 8.5714291,0 -4.9999999e-8,0 l 0,8.5714287 z M 20.571428,20.571429 l -5.142857,0 0,3.428571 L 24,24 l 0,-8.571429 -3.428572,0 0,5.142858 z M 15.428571,2e-7 l 0,3.4285714 5.142857,0 0,5.1428571 3.428572,0 L 24,2e-7 l -8.571429,0 z"
						>
							<animate
								id="animation-to"
								begin="indefinite"
								fill="freeze"
								attributeName="d"
								dur="0.15s"
								to="m 5.0000001e-8,18.857143 5.14285695,0 0,5.142857 3.428572,0 0,-8.571429 -8.571428950000001,0 0,3.428572 z M 5.142857,5.1428572 l -5.14285695,0 0,3.4285714 8.571428949999999,0 0,-8.571428500000001 -3.428572,0 0,5.142857100000001 z M 15.428571,24 l 3.428572,0 0,-5.142857 5.142857,0 0,-3.428572 -8.571429,0 0,8.571429 z m 3.428572,-18.8571428 0,-5.1428571 -3.428572,0 0,8.5714285 8.571429,0 0,-3.4285714 -5.142857,0 z"
							/>

							<animate
								id="animation-from"
								begin="indefinite"
								fill="freeze"
								attributeName="d"
								dur="0.15s"
								to="m 3.4285714,15.428571 -3.42857145,0 0,8.571429 8.57142905,0 0,-3.428571 -5.1428577,0 0,-5.142858 z M -5e-8,8.5714287 l 3.42857145,0 0,-5.1428573 5.1428577,0 L 8.5714291,0 -4.9999999e-8,0 l 0,8.5714287 z M 20.571428,20.571429 l -5.142857,0 0,3.428571 L 24,24 l 0,-8.571429 -3.428572,0 0,5.142858 z M 15.428571,2e-7 l 0,3.4285714 5.142857,0 0,5.1428571 3.428572,0 L 24,2e-7 l -8.571429,0 z"
							/>
						</path>
					</svg>
				</button>
			</header>
			<div className="join-game">
				<div className="join-game__statusbar">
					<div className="statusbar">
						<div className="statusbar__player-count">
							<span className="statusbar__player-number">
								{players.length}
							</span>
							Players
						</div>
						{isHost && (
							<button className="start-button" onClick={startGame}>
								Start
							</button>
						)}
					</div>
				</div>
				<div className="join-game__player-list">
					<div className="leaderboard">
						<h1 className="leaderboard__title">
							<FontAwesomeIcon icon="trophy" className="trophy" />
							Players
						</h1>
						<ol className="leaderboard__list">
							{players.map(player => {
								return (
									<li className="leaderboard__item" key={player._id}>
										<span className="leaderboard__player">
											{player.name}
										</span>
										<small className="leaderboard__points">0</small>
									</li>
								);
							})}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}

export default withRouter(Welcome);
