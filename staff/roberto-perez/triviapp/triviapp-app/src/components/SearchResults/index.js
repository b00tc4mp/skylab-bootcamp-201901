import React, { useState, useEffect } from 'react';

import quiz from '../../services/quiz';
import QuizCard from '../QuizCard';

function SearchResults(props) {
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
		<div className="container">
			<div className="quiz-grid">
				{quizzes.map((quiz, index) => (
					<QuizCard key={quiz.id} quiz={quiz} />
				))}
			</div>
		</div>
	);
}

export default SearchResults;
