import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import questionService from '../../../../services/question';

function EditQuestion(props) {
	const [title, setTitle] = useState('');
	const [time, setTime] = useState('');
	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer3, setAnswer3] = useState('');
	const [answer4, setAnswer4] = useState('');
	const [answercheck1, setAnswerCheck1] = useState(false);
	const [answercheck2, setAnswerCheck2] = useState(false);
	const [answercheck3, setAnswerCheck3] = useState(false);
	const [answercheck4, setAnswerCheck4] = useState(false);
	// const [answers, setAnswers] = useState([]);
	const [error, setError] = useState('');

	const {
		match: {
			params: { quizId, questionId },
		},
	} = props;

	useEffect(() => {
		getQuestionById(questionId);
	}, [props.match.params.quizId]);

	const getQuestionById = async (questionId) => {
		try {
			const question = await questionService.get(quizId, questionId);
			setTitle(question.title);
			setTime(question.time);
			setAnswer1(question.answers[0].title);
			setAnswer2(question.answers[1].title);
			setAnswer3(question.answers[2].title);
			setAnswer4(question.answers[3].title);
			setAnswerCheck1(question.answers[0].success);
			setAnswerCheck2(question.answers[1].success);
			setAnswerCheck3(question.answers[2].success);
			setAnswerCheck4(question.answers[3].success);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const edit = async data => {
		try {
			const question = await questionService.edit(quizId, questionId, data);
			console.log(question);
			props.history.push(`/dashboard/create/quiz/${quizId}/overview`);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		let answers = [
			{
				title: answer1,
				success: answercheck1,
			},
			{
				title: answer2,
				success: answercheck2,
			},
			{
				title: answer3,
				success: answercheck3,
			},
			{
				title: answer4,
				success: answercheck4,
			},
		];
		// console.log(answers);
		edit({ title, time, answers });
	};
	return (
		<section>
			<form onSubmit={handleSubmit}>
				<div className="form__container">
					<header className="form__header">
						<h2 className="form__title">Add question</h2>
					</header>
					<fieldset className="form__fieldset">
						<p className="form__p">
							<label className="form__label" htmlFor="question_title">
								Question
							</label>
							<input
								className="form__input"
								autoCorrect="off"
								autoCapitalize="off"
								placeholder="Question"
								autoFocus="autofocus"
								type="text"
								name="question"
								id="question_title"
								defaultValue={title}
								onChange={Event => setTitle(Event.target.value)}
							/>
						</p>
						<p className="form__p">
							<label className="form__label" htmlFor="question_time">
								Time limit
							</label>
							<input
								className="form__input"
								placeholder="Time limit"
								type="number"
								name="time"
								id="question_time"
								defaultValue={time}
								onChange={Event => setTime(Event.target.value)}
							/>
						</p>

						<p className="form__p">
							<label className="form__label" htmlFor="answer_1">
								Answer 1
							</label>
							<input
								className="form__input"
								placeholder="Answer 1"
								type="text"
								name="answer_1"
								id="answer_1"
								defaultValue={answer1}
								onChange={Event => setAnswer1(Event.target.value)}
							/>
							<input
								type="checkbox"
								checked={answercheck1}
								name="answer_1_success"
								onChange={Event => setAnswerCheck1(!answercheck1)}
							/>
						</p>
						<p className="form__p">
							<label className="form__label" htmlFor="answer_2">
								Answer 2
							</label>
							<input
								className="form__input"
								placeholder="Answer 2"
								type="text"
								name="answer_2"
								id="answer_2"
								defaultValue={answer2}
								onChange={Event => setAnswer2(Event.target.value)}
							/>
							<input
								type="checkbox"
								checked={answercheck2}
								name="answer_2_success"
								onChange={Event => setAnswerCheck2(!answercheck2)}
							/>
						</p>
						<p className="form__p">
							<label className="form__label" htmlFor="answer_3">
								Answer 3
							</label>
							<input
								className="form__input"
								placeholder="Answer 3"
								type="text"
								name="answer_3"
								id="answer_3"
								defaultValue={answer3}
								onChange={Event => setAnswer3(Event.target.value)}
							/>
							<input
								type="checkbox"
								checked={answercheck3}
								name="answer_3_success"
								onChange={Event => setAnswerCheck3(!answercheck3)}
							/>
						</p>
						<p className="form__p">
							<label className="form__label" htmlFor="answer_4">
								Answer 4
							</label>
							<input
								className="form__input"
								placeholder="Answer 3"
								type="text"
								name="answer_4"
								id="answer_4"
								defaultValue={answer4}
								onChange={Event => setAnswer4(Event.target.value)}
							/>
							<input
								type="checkbox"
								name="answer_4_success"
								checked={answercheck4}
								onChange={Event => setAnswerCheck4(!answercheck4)}
							/>
						</p>
						<button className="btn__link btn__link--green form__submit">
							Next
						</button>
					</fieldset>
				</div>
			</form>
		</section>
	);
}

export default withRouter(EditQuestion);
