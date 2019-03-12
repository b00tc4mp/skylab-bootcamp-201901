import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import gameService from '../../../services/game';
import authService from '../../../services/auth';
import socketApi from '../../../services/socket';

import ExpandButton from '../ExpandButton';

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
		getGameByQuizId(gameId);
	}, [props.match.params.gameId]);

	useState(() => {
		socketApi.joinGameHandler(game => {
			getGameByQuizId();
		});
	}, []);

	const getGameByQuizId = async () => {
		try {
			const game = await gameService.get(gameId);

			if (authService.userLoggedIn.id !== game.host) {
				throw Error(
					'This quiz has been set to private. Ask the creator to share it with you to play',
				);
			}

			if (game.gameStarted) props.history.push(`/game/${gameId}/start`);

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
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">
					Join with Game PIN:{' '}
					<span className="header-game-top__pin">{code}</span>
				</h1>
				<ExpandButton hostGame={props.hostGame} />
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
								console.log(player);
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
		</Fragment>
	);
}

export default withRouter(Welcome);
