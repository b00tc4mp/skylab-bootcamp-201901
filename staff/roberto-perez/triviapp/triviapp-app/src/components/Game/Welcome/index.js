import React, { useEffect, useState, Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../../services/game';
// import authService from '../../../services/auth';

import ExpandButton from '../ExpandButton';

import GameContext from '../GameContext';

function Welcome(props) {

	const { gameID, code, players, hostGame } = useContext(GameContext);

	// const [players, setPlayers] = useState([]);

	// useEffect(() => {
	// 	setPlayers(players);
	// }, [players]);

	const startGame = async () => {
		try {
			await gameService.startGame(gameID);

			props.history.push(`/game/${gameID}/start`);
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
				<ExpandButton hostGame={hostGame} />
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
						<button
							className="start-button"
							disabled={players.length <= 0 ? true : false}
							onClick={startGame}
						>
							Start
						</button>
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
		</Fragment>
	);
}

export default withRouter(Welcome);
