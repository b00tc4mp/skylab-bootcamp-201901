import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Join from './Join';

function Game() {
	
		return (
			<Switch>
				<Route path="/:gameId" render={() => <Join />} />
			</Switch>
		);
	
}

export default Game;
