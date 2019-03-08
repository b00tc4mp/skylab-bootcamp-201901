import React, { useState, useEffect } from 'react';

import quiz from '../../services/quiz';
import SearchResults from '../SearchResults';

function Home(props) {
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
		<section>
			<div className="container">
				<header className="header-section">
					<h2 className="header-section__title">
						<span className="header-section__title-strong">Featured</span> The
						most popular
					</h2>
				</header>

				<SearchResults quizzes={quizzes} />

				<button className="load-more">Load more</button>
			</div>
		</section>
	);
}

export default Home;
