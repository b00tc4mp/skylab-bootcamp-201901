import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../services/game';

// import Pin from './Pin';
import YouAreIn from './YouAreIn';
import GetReady from './GetReady';
import GameBlock from './GameBlock';
import GameResults from './GameResults';

function Player(props) {
	const {
		match,
		match: {
			params: { gameId },
		},
	} = props;

	const [gameID, setGameID] = useState(gameId);

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
			console.log('NEXT!!!!!!');
			props.history.push(`/player/${gameID}/getready`);
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
				render={() => <GameBlock gameId={gameID} />}
			/>
			<Route
				path={`${match.url}/gameresults`}
				render={() => <GameResults gameId={gameID} />}
			/>
		</Switch>
	);
}

export default withRouter(Player);
