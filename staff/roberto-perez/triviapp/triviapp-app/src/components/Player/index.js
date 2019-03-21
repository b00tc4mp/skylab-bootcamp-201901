import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../services/game';
import authService from '../../services/auth';

import PlayerContext from './PlayerContext';
import feedback from '../../utils/feedback';

// import Pin from './Pin';
import YouAreIn from './YouAreIn';
import GetReady from './GetReady';
import GameBlock from './GameBlock';
import GameOver from './GameOver';

function Player(props) {
	const {
		match,
		match: {
			params: { gameId },
		},
	} = props;

	const [gameID, setGameID] = useState(gameId);

	const [timeOut, setTimeOut] = useState(false);

	useEffect(() => {
		gameService.onBeginNewGame(() => {
			props.history.replace(`/player/${gameID}/getready`);
		});
	}, []);

	useEffect(() => {
		gameService.onShowQuestion(() => {
			props.history.replace(`/player/${gameID}/gameblock`);
		});
	}, []);

	useEffect(() => {
		gameService.onNextQuestion(() => {
			setTimeOut(false);
			props.history.replace(`/player/${gameID}/getready`);
		});
	}, []);

	useEffect(() => {
		gameService.onGameOver(() => {
			props.history.replace(`/player/${gameID}/game-over`);
		});
	}, []);

	useEffect(() => {
		gameService.onTimeOut(() => {
			setTimeOut(true);
		});
	}, []);

	useEffect(() => {
		getGameByID();
	}, [gameID]);
	
	const userLoggedIn = JSON.parse(authService.userLoggedIn);

	const getGameByID = async () => {
		try {
			const game = await gameService.getGameByID(gameID);

			const userIsPlayer = game.users.some(_user => _user._id === userLoggedIn.id)

			if(userIsPlayer && !game.end) {
				gameService.onReconect(gameID);
			} else {
				props.history.replace(`/`);
			}

		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	return (
		<PlayerContext.Provider
			value={{
				gameID,
				timeOut,
			}}
		>
			<Switch>
				<Route path={`${match.url}/youarein`} render={() => <YouAreIn />} />
				<Route path={`${match.url}/getready`} render={() => <GetReady />} />
				<Route path={`${match.url}/gameblock`} render={() => <GameBlock />} />
				<Route path={`${match.url}/game-over`} render={() => <GameOver />} />
			</Switch>
		</PlayerContext.Provider>
	);
}

export default withRouter(Player);
