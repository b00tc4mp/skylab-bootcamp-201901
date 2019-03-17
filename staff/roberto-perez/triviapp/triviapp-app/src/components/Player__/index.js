import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../services/game';

// import Pin from './Pin';
import YouAreIn from './YouAreIn';
import GetReady from './GetReady';
import GameBlock from './GameBlock';
import GameResults from './GameResults';
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
			props.history.push(`/player/${gameID}/getready`);
		});
	}, []);

	useEffect(() => {
		gameService.onShowQuestion(() => {
			props.history.push(`/player/${gameID}/gameblock`);
		});
	}, []);

	useEffect(() => {
		gameService.onNextQuestion(() => {
			setTimeOut(false)
			props.history.push(`/player/${gameID}/getready`);
		});
	}, []);

	useEffect(() => {
		gameService.onGameOver(() => {
			props.history.push(`/player/${gameID}/game-over`);
		});
	}, []);

	useEffect(() => {
		gameService.onTimeOut(() => {
			setTimeOut(true)
		});
	}, []);

	return (
		<Switch>
			<Route
				path={`${match.url}/youarein`}
				render={() => <YouAreIn gameId={gameID} />}
			/>
			<Route
				path={`${match.url}/getready`}
				render={() => <GetReady gameId={gameID} />}
			/>
			<Route
				path={`${match.url}/gameblock`}
				render={() => <GameBlock gameId={gameID} timeOut={timeOut} />}
			/>
			<Route
				path={`${match.url}/gameresults`}
				render={() => <GameResults gameId={gameID} />}
			/>
			<Route
				path={`${match.url}/game-over`}
				render={() => <GameOver gameId={gameID} />}
			/>
		</Switch>
	);
}

export default withRouter(Player);
