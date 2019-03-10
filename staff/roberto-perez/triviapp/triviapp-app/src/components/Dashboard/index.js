import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import requireAuth from '../middlewares/requireAuth';
import CreateQuizDescription from './Quizz/CreateQuizDescription';
import EditQuizDescription from './Quizz/EditQuizDescription';
import CreateQuestion from './Question/CreateQuestion';
import EditQuestion from './Question/EditQuestion';
import Overview from './Overview';
import MyQuizzes from './MyQuizzes';

function Dashboard() {
	return (
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
					exact
					path="/dashboard/create/quiz/:quizId/overview"
					component={Overview}
				/>
				<Route
					exact
					path="/dashboard/edit/:quizId/question/"
					component={CreateQuestion}
				/>
				<Route
					exact
					path="/dashboard/edit/:quizId/question/:questionId"
					component={EditQuestion}
				/>
				<Route exact path="/dashboard" component={MyQuizzes} />
			</Switch>
	);
}

export default withRouter(requireAuth(Dashboard));
