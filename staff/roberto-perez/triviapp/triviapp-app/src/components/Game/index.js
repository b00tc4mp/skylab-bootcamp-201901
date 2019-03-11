import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import Start from './Start';
import GetReady from './GetReady';
import GameBlock from './GameBlock';

function Game({ match }) {
	return (
		<section className="host-game">
			<Switch>
				<Route path={`${match.url}/:gameId/welcome`} render={() => <Welcome />} />
				
				<Route
					path={`${match.url}/:gameId/start`}
					render={() => <Start />}
				/>

				<Route
					path={`${match.url}/:gameId/getready`}
					render={() => <GetReady />}
				/>

				<Route
					path={`${match.url}/:gameId/gameblock`}
					render={() => <GameBlock />}
				/>
			</Switch>
		</section>
	);
}

export default withRouter(Game);
