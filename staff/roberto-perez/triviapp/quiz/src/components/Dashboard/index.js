import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import requireAuth from '../middlewares/requireAuth';
import CreateQuiz from './CreateQuiz';

function Dashboard() {
	return (
		<section>
			<Switch>
				<Route path="/dashboard/create/quiz" render={() => <CreateQuiz />} />
			</Switch>
		</section>
	);
}

export default requireAuth(withRouter(Dashboard));
