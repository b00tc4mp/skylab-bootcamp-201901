import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import quiz from '../../../services/quiz';
import questionService from '../../../services/question';
import requiereAuth from '../../middlewares/requireAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			console.log(newQuiz)
			setCurrentQuiz(newQuiz);
			setQuestions(newQuiz.questions);
		} catch (error) {
			console.error(error.message);
			props.history.push(`/dashboard`);
		}
	};

	const deleteQuizzById = async quizId => {
		try {
			await quiz.delete(quizId);
			props.history.push(`/dashboard`);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteQuestionById = async questionId => {
		try {
			await questionService.delete(quizId, questionId);

			const questionsArr = questions.filter(_question => {
				return _question._id !== questionId;
			});

			questionsArr.length <= 0 ? setQuestions([]) : setQuestions(questionsArr);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteQuizz = questionId => {
		deleteQuizzById(questionId);
	};

	const handleDeleteQuestion = questionId => {
		deleteQuestionById(questionId);
	};

	return (
		<Fragment>
			<section>
				<header className="header-section">
					<h1 className="login__title">Description</h1>
				</header>
				<section className="content-quiz">
					<figure className="content-quiz__figure" />
					<div className="content-quiz__info">
						<h1 className="content-quiz__title">{currentQuiz.title}</h1>
						<p className="content-quiz__description">
							{currentQuiz.description}
						</p>
					</div>
					<aside className="content-quiz__actions">
						<Link
							to={`/dashboard/edit/${quizId}/description`}
							title="Editar"
							className="content-quiz__edit-btn"
						>
							<FontAwesomeIcon icon="pen" />
						</Link>
						<button
							onClick={() => handleDeleteQuizz(quizId)}
							className="content-quiz__delete-btn"
						>
							<FontAwesomeIcon icon="trash-alt" />
						</button>
					</aside>
				</section>
			</section>

			<header className="header-section">
				<h2 className="login__title">Game creator</h2>
			</header>

			{questions.map((question, index) => {
				return (
					<section className="content-question" key={question._id}>
						<figure className="content-question__figure">
							<span className="content-question__figure-info">
								{index + 1}
							</span>
						</figure>
						<div className="content-question__info">
							<h4 className="content-question__title">
								Q{index + 1}: {question.title}
							</h4>
						</div>
						<aside className="content-question__actions">
							<Link
								to={`/dashboard/edit/${quizId}/question/${question._id}`}
								title="Editar"
								className="content-question__edit-btn"
							>
								<FontAwesomeIcon icon="pen" />
							</Link>
							<button
								onClick={() => handleDeleteQuestion(question._id)}
								className="content-question__delete-btn"
							>
								<FontAwesomeIcon icon="trash-alt" />
							</button>
						</aside>
					</section>
				);
			})}

			<div className="content-add-question">
				<Link
					to={`/dashboard/edit/${quizId}/question/`}
					title="Crear"
					className="content-add-question__link"
				>
					<span className="content-add-question__icon-wrap">
						<FontAwesomeIcon icon="plus" />
					</span>
					<span className="content-actions__text">Add question</span>
				</Link>
			</div>
		</Fragment>
	);
}

export default requiereAuth(Overview);
