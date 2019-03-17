import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// import LandingResults from '../LandingResults';
import Results from '../Results';
import quiz from '../../services/quiz';

function Landing() {
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
			console.error(error);
		}
	};

	return (
		<div className="container">
			<section>
				<header className="header-section">
					<h2 className="header-section__title">
						<span className="header-section__title-strong">Featured</span> The
						most popular
					</h2>
				</header>

				<Results quizzes={quizzes} loadMoreButton={loadMoreButton} loadMore={loadMore} />
			</section>
		</div>
	);
}

export default withRouter(Landing);
