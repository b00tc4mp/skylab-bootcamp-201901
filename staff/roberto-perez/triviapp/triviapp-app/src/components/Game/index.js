import React, { useRef } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import Start from './Start';
import GetReady from './GetReady';
import GameBlock from './GameBlock';
import Questions from './Questions';

function Game({ match }) {
	const hostGame = useRef(null);

	return (
		<section className="host-game" ref={hostGame}>
			<Switch>
				<Route
					path={`${match.url}/:gameId/welcome`}
					render={() => <Welcome hostGame={hostGame} />}
				/>

				<Route
					path={`${match.url}/:gameId/start`}
					render={() => <Start hostGame={hostGame} />}
				/>

				<Route
					path={`${match.url}/:gameId/questions`}
					render={() => <Questions hostGame={hostGame} />}
				/>
			</Switch>
		</section>
	);
}

export default withRouter(Game);
