import React, { useState, useEffect, Fragment } from 'react';

import QuizCard from '../QuizCard';

function Results(props) {
	const [quizzes, setQuizzes] = useState(props.quizzes);

	useEffect(() => {
        setQuizzes(props.quizzes);
	}, [props]);

	return (
		<Fragment>
			<div className="quiz-grid">
				{quizzes.map(quiz => (
					<QuizCard key={quiz.id} quiz={quiz} />
				))}
			</div>
			{props.loadMoreButton && (
				<button className="load-more" onClick={props.loadMore}>
					Load more
				</button>
			)}
		</Fragment>
	);
}

export default Results;
