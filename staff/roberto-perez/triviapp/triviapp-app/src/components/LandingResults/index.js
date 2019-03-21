import React, { useState, useEffect, Fragment } from 'react';

import feedback from '../../utils/feedback';
import quiz from '../../services/quiz';
import QuizCard from '../QuizCard';

function LandingResults(props) {
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
			const newQuizzes = await quiz.list(offset);

			setLoadMoreButton(!!newQuizzes.length);

			setQuizzes([...quizzes, ...newQuizzes]);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	return (
		<Fragment>
			<div className="quiz-grid">
				{quizzes.map((quiz, index) => (
					<QuizCard key={quiz.id} quiz={quiz} />
				))}
			</div>
			{loadMoreButton && (
				<button className="load-more" onClick={loadMore}>
					Load more
				</button>
			)}
		</Fragment>
	);
}

export default LandingResults;
