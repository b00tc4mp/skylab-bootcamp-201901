import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import requireAuth from '../middlewares/requireAuth';
import CreateQuizDescription from './CreateQuizDescription';
import EditQuizDescription from './EditQuizDescription';
import Overview from './Overview';

function Dashboard() {
	return (
		<section>
			<Switch>
				<Route
					exact
					path="/dashboard/create/quiz"
					render={() => <CreateQuizDescription />}
				/>
				<Route
					exact
					path="/dashboard/edit/:quizId/description"
					render={() => <EditQuizDescription />}
				/>

				<Route
					path="/dashboard/create/quiz/:quizId/overview"
					component={Overview}
				/>
			</Switch>
		</section>
	);
}

export default requireAuth(withRouter(Dashboard));
