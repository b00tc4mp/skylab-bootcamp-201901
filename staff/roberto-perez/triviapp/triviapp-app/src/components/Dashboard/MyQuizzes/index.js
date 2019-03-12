import React, { useState, useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import quiz from '../../../services/quiz';

import MyQuizCard from './MyQuizCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyQuizzes() {
	const [quizzes, setQuizzes] = useState([]);

	useEffect(() => {
		handleListQuiz();
	}, []);

	const handleListQuiz = async () => {
		try {
			const quizzes = await quiz.list();
			setQuizzes(quizzes);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
			<section className="quizz-actions">
				<Link
					to="/dashboard/create/quiz"
					title="Create Quiz"
					className="quizz-actions__create quizz-actions__link btn-link-action"
				>
					<FontAwesomeIcon icon="plus" />
					Create Quiz
				</Link>
			</section>
			<section>
				<header className="header-section">
					<h2 className="header-section__title">
						<span className="header-section__title-strong">My quizzes</span>
					</h2>
				</header>

				<div className="quiz-grid">
					{quizzes.map((quiz, index) => (
						<MyQuizCard key={quiz.id} quiz={quiz} />
					))}
				</div>
			</section>
		</Fragment>
	);
}

export default withRouter(MyQuizzes);
