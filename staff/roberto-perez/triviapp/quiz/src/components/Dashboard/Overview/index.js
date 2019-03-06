import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import quiz from '../../../services/quiz';
import requiereAuth from '../../middlewares/requireAuth';

function Overview(props) {
	const [currentQuiz, setCurrentQuiz] = useState('');
	const [questions, setQuestions] = useState([]);

	const {
		match: {
			params: { quizId },
		},
	} = props;

	useEffect(() => {
		getQuizById(quizId);
	}, [props.match.params.quizId]);

	const getQuizById = async quizId => {
		try {
			const newQuiz = await quiz.get(quizId);
				setCurrentQuiz(newQuiz);
				setQuestions(newQuiz.questions);
		} catch (error) {
			console.error(error.message);
			props.history.push(`/dashboard`);
		}
	};

	const deleteQuizzById = async quizId => {
		try {
			const newQuiz = await quiz.delete(quizId);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteQuizz = (quizId) => {
		deleteQuizzById(quizId);
	};

	return (
		<div className="container">
		<Link to={`/dashboard/edit/${quizId}/description`} title="Editar" className="login__signup">
								Editar
							</Link>
			<button onClick={() => handleDeleteQuizz(quizId)}>Delete</button>

			{currentQuiz.title}
			<br />
			{currentQuiz.description}

			<h2>Game creator</h2>

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
							<Link to={`/dashboard/edit/${quizId}/question/${question._id}`} title="Editar" className="login__signup">
								Editar
							</Link>
							<Link to={`/dashboard/edit/${quizId}/question/${question._id}/delete`} title="Delete" className="login__signup">
								Delete
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default requiereAuth(Overview);
