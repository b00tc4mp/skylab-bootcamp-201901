import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import questionService from '../../../../services/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

function EditQuestion(props) {
	const [title, setTitle] = useState('');
	const [time, setTime] = useState('10');
	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer3, setAnswer3] = useState('');
	const [answer4, setAnswer4] = useState('');
	const [answercheck1, setAnswerCheck1] = useState(false);
	const [answercheck2, setAnswerCheck2] = useState(false);
	const [answercheck3, setAnswerCheck3] = useState(false);
	const [answercheck4, setAnswerCheck4] = useState(false);
	const [image, setImage] = useState(null);
	// const [answers, setAnswers] = useState([]);
	const [error, setError] = useState('');

	const {
		match: {
			params: { quizId, questionId },
		},
	} = props;

	const onDrop = useCallback(acceptedFiles => {
		// Do something with the files
		setImage(acceptedFiles[0]);
		console.log(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	useEffect(() => {
		getQuestionById(questionId);
	}, [props.match.params.quizId]);

	const getQuestionById = async questionId => {
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
						<h2 className="form__title">Edit question</h2>
					</header>

					<div className="create-quiz">
						<div className="create-quiz__wrap">
							<fieldset className="form__fieldset">
								<div className="form__p">
									<label
										className="form__label"
										htmlFor="question_title"
									>
										Question
									</label>
									<input
										className="form__input"
										placeholder="Question"
										type="text"
										name="question"
										id="question_title"
										defaultValue={title}
										onChange={Event => setTitle(Event.target.value)}
									/>
								</div>
								<div className="form__p">
									<label
										className="form__label"
										htmlFor="question_time"
									>
										Time limit
									</label>

									<label className="form__select" htmlFor="questions_seconds">
										<select
											onChange={Event =>
												setTime(Event.target.value)
											}
											value={time}
											id="questions_seconds"
										>
											<option value="10">10 sec</option>
											<option value="15">15 sec</option>
											<option value="20">20 sec</option>
											<option value="25">25 sec</option>
											<option value="30">30 sec</option>
											<option value="35">35 sec</option>
										</select>
									</label>
								</div>
							</fieldset>

							<div className="media-uploader">
								<div className="media-uploader__body" {...getRootProps()}>
									<input name="file" {...getInputProps()} />

									<label
										className="media-uploader__label"
										htmlFor="image-uploader"
									>
										<img src="#" alt="Preview" className="hidden" />
										<div className="media-uploader__star">
											<FontAwesomeIcon icon="download" />
											{isDragActive ? (
												<div>Select a file or drag here</div>
											) : (
												<div className="media-uploader__notimage">
													Drag 'n' drop some files here, or
													click to select files
												</div>
											)}
										</div>
										<div className="media-uploader__response hidden">
											<div className="media-uploader__messages" />
											<progress
												className="media-uploader__progress"
												value="0"
											>
												<span>0</span>%
											</progress>
										</div>
									</label>
								</div>
							</div>
						</div>
						<div className="create-quiz__answers">
							<fieldset className="form__fieldset">
								<div className="form__p">
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
									<div className="create-quiz__answer-check">
										<input
											type="checkbox"
											name="answer_1_success"
											id="checkbox1"
											checked={answercheck1}
											onChange={Event =>
												setAnswerCheck1(!answercheck1)
											}
										/>
										<label htmlFor="checkbox1" />
									</div>
								</div>

								<div className="form__p">
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
									<div className="create-quiz__answer-check">
										<input
											type="checkbox"
											name="answer_3_success"
											id="checkbox3"
											checked={answercheck3}
											onChange={Event =>
												setAnswerCheck3(!answercheck3)
											}
										/>
										<label htmlFor="checkbox3" />
									</div>
								</div>
							</fieldset>
							<fieldset className="form__fieldset">
								<div className="form__p">
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
									<div className="create-quiz__answer-check">
										<input
											type="checkbox"
											name="answer_2_success"
											id="checkbox2"
											checked={answercheck2}
											onChange={Event =>
												setAnswerCheck2(!answercheck2)
											}
										/>
										<label htmlFor="checkbox2" />
									</div>
								</div>

								<div className="form__p">
									<label className="form__label" htmlFor="answer_1">
										Answer 4
									</label>
									<input
										className="form__input"
										placeholder="Answer 4"
										type="text"
										name="answer_4"
										id="answer_4"
										defaultValue={answer4}
										onChange={Event => setAnswer4(Event.target.value)}
									/>
									<div className="create-quiz__answer-check">
										<input
											type="checkbox"
											name="answer_4_success"
											id="checkbox4"
											checked={answercheck4}
											onChange={Event =>
												setAnswerCheck4(!answercheck4)
											}
										/>
										<label htmlFor="checkbox4" />
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<button className="btn__link btn__link--green create-quiz__submit">
						Next
					</button>
				</div>
			</form>
		</section>
	);
}

export default withRouter(EditQuestion);
