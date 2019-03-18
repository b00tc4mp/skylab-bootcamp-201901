import React, { useState, useEffect, Fragment } from 'react';

import authService from '../../services/auth';
import quiz from '../../services/quiz';
import Answer from './Answer';
import QuizInfo from './QuizInfo';

function Quiz(props) {
	const [currentQuiz, setCurrentQuiz] = useState('');
	const [questions, setQuestions] = useState([]);
	const [isOwner, setIsOwner] = useState(false);

	useEffect(() => {
		const {
			match: {
				params: { quizId },
			},
		} = props;

		getQuizById(quizId);
	}, [props.match.params.quizId]);

	const getQuizById = async quizId => {
		try {
			const newQuiz = await quiz.get(quizId);

			if(newQuiz.author._id === authService.userLoggedIn.id) {
				setIsOwner(true)
			}

			setCurrentQuiz(newQuiz);
			
			setQuestions(newQuiz.questions);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">

			<section className="quiz-details">
				
				<QuizInfo quiz={currentQuiz} />

				<div className="quiz-details__questions">
					<header>
						<h4 className="quiz-details__questions-title">
							Questions ({questions.length})
						</h4>
					</header>

					{questions.map((question, index) => {
						return (
							<div className="question-detail" key={question._id}>
								<div className="question-detail__wrap">
									<div className="question-detail__text">
										<span className="question-detail__number">
											Q{index + 1}:{' '}
										</span>
										<span>{question.title}</span>
									</div>
									<div className="question-detail__answers question-detail__answers--open">
										<ul className="question-detail__answers-list">
											{question.answers.map((answers, indexAnswer) => {
													if(answers.title !== '') {
														return (<Answer key={answers._id} isOwner={isOwner} answers={answers} index={indexAnswer} />)
													}
												},
											)}
										</ul>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

export default Quiz;
