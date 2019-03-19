import React, { useState, useEffect, Fragment } from 'react';

import QuizCard from '../QuizCard';
import Loading from '../Loading';

function Results(props) {
	const [quizzes, setQuizzes] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setQuizzes(props.quizzes);
	}, [props]);

	useEffect(() => {
		if (quizzes && quizzes.length >= 0) {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}, [quizzes]);

	console.log(quizzes);

	return (
		<Fragment>
			<Loading isLoading={isLoading} />
			{quizzes.length > 0 ? (
				<Fragment>
					<div className="quiz-grid">
						{quizzes.map(quiz => (
							<QuizCard key={quiz.id} quiz={quiz} />
						))}
					</div>
					<div>
						{props.loadMoreButton && (
							<button className="load-more" onClick={props.loadMore}>
								Load more
							</button>
						)}
					</div>
				</Fragment>
			) : (
				<section className="login not-results">
					<p>Oops! No results found.</p>
				</section>
			)}
		</Fragment>
	);
}

export default Results;
