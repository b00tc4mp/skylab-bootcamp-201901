import React from 'react';

import QuizCard from '../QuizCard';

function SearchResults(props) {

    const { quizzes } = props;

	return (
		<div className="quiz-grid">
			{quizzes.map((quiz, index) => (
				<QuizCard key={quiz.id} quiz={quiz} />
			))}
		</div>
	);
}

export default SearchResults;
