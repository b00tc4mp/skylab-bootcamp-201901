import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Pin from './Pin';
import Start from './Start';


function Player({ match }) {
	return (
		<Switch>
			<Route path={`${match.url}/pin`} render={() => <Pin />} />
			<Route path={`${match.url}/:gameId/start`} render={() => <Start />} />
		</Switch>
	);
}

export default withRouter(Player);
