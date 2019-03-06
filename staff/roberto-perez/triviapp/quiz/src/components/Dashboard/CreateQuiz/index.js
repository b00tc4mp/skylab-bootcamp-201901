import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import quizApi from '../../../quiz-api';

function CreateQuiz(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
	const [error, setError] = useState(null);

    const create = async data => {
		try {
			const quiz = await quizApi.createQuiz(data);
			console.log(quiz);
			props.history.push(`/create/quiz/${quiz.id}/overview`);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		create({ title, description });
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

export default withRouter(CreateQuiz);
