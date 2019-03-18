import React, { useState, useEffect, Fragment } from 'react';

import quiz from '../../services/quiz';
import Results from '../Results';
import JoinGameButton from '../JoinGameButton';

function SearchResults(props) {
	
	const {
		match: {
			params: { query },
		},
	} = props;

	const [quizzes, setQuizzes] = useState([]);
	const [offset, setOffset] = useState(1);
	const [loadMoreButton, setLoadMoreButton] = useState(false);

	useEffect(() => {
		handleListQuiz();
	}, [query]);

	useEffect(() => {
		handleListQuizOffset();
	}, [offset]);

	const loadMore = () => {
		setOffset(prevOffset => prevOffset + 1);
	};

	const handleListQuizOffset = async () => {
		try {
			const newQuizzes = await quiz.search(query, offset);

			setLoadMoreButton(!!newQuizzes.length);

			setQuizzes([...quizzes, ...newQuizzes]);
		} catch (error) {
			console.error(error);
		}
	};

	const handleListQuiz = async () => {
		try {
			const newQuizzes = await quiz.search(query, offset);
			setQuizzes(newQuizzes);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<JoinGameButton />
			<Results quizzes={quizzes} loadMoreButton={loadMoreButton} loadMore={loadMore} />
		</div>
	);
}

export default SearchResults;
