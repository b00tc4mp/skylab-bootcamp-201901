import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyQuizzes() {
	return (
		<div className="container">
			<section className="quizz-actions">
				<Link to="/dashboard/create/quiz" title="Create Quiz" className="quizz-actions__create quizz-actions__link btn-link-action">
					<FontAwesomeIcon icon="plus" />Create Quiz
				</Link>
			</section>
		</div>
	);
}

export default withRouter(MyQuizzes);
