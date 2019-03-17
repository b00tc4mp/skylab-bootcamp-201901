import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import quiz from '../../../services/quiz';

import Results from '../../Results';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyQuizzes() {
	const [quizzes, setQuizzes] = useState([]);
	const [offset, setOffset] = useState(1);
	const [loadMoreButton, setLoadMoreButton] = useState(false);

	useEffect(() => {
		handleListQuiz();
	}, [offset]);

	const loadMore = () => {
		setOffset(prevOffset => prevOffset + 1);
	};

	const handleListQuiz = async () => {
		
		try {
			const newQuizzes = await quiz.myQuizzes(offset);

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

				<Results quizzes={quizzes} loadMoreButton={loadMoreButton} loadMore={loadMore} />
			</section>
		</Fragment>
	);
}

export default withRouter(MyQuizzes);
