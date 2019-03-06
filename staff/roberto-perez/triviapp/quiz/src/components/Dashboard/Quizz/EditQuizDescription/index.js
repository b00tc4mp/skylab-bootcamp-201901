import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import quiz from '../../../services/quiz';

function EditQuizDescription(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
	const [error, setError] = useState(null);
	

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
			setTitle(newQuiz.title);
			setDescription(newQuiz.description);
		} catch (error) {
			console.error(error);
		}
	};
	
	const edit = async (quizId, data) => {
		try {
			const editedQuiz = await quiz.edit(quizId, data);
			console.log(editedQuiz);
			props.history.push(`/dashboard/create/quiz/${editedQuiz.id}/overview`);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		edit(quizId, {title, description});
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<div className="login__container">
					<header className="login__header">
						<h2 className="login__title">Create trivi</h2>
					</header>
					<fieldset className="login__fieldset">
						<p className="login__p">
							<label className="login__label" htmlFor="quiz_title">
								Title
							</label>
							<input
								className="login__input"
								autoCorrect="off"
								autoCapitalize="off"
								placeholder="Title"
								autoFocus="autofocus"
								type="text"
								name="title"
								id="quiz_title"
								value={title}
								onChange={Event => setTitle(Event.target.value)}
							/>
						</p>
						<p>
							<label className="login__label" htmlFor="quiz_description">
								Description
							</label>
							<textarea
								className="quiz_description"
								placeholder="Description"
								name="description"
								onChange={Event => setDescription(Event.target.value)}
								value={description}
							/>
						</p>
						<button className="btn__link btn__link--green login__submit">
							Ok, go!
						</button>
					</fieldset>
				</div>
			</form>
		</section>
	);
}

export default withRouter(EditQuizDescription);
