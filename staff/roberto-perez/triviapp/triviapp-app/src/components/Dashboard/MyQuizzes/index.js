import React, { useState, useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import quiz from '../../../services/quiz';

import MyQuizCard from './MyQuizCard';

import SearchResults from '../../SearchResults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyQuizzes() {
	const [quizzes, setQuizzes] = useState([]);
	const [offset, setOffset] = useState(1);
	const [loadMoreButton, setLoadMoreButton] = useState(false);

	useEffect(() => {
		handleListQuiz();
	}, [offset]);

	const handleListQuiz = async () => {
		
		try {
			const newQuizzes = await quiz.myQuizzes(offset);
			console.log(newQuizzes);
			setLoadMoreButton(!!newQuizzes.length);

			setQuizzes([...quizzes, ...newQuizzes]);
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

				<SearchResults />
			</section>
		</Fragment>
	);
}

export default withRouter(MyQuizzes);
