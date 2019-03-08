import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import quiz from '../../../../services/quiz';
import imageService from '../../../../services/image';

function CreateQuizDescription(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);

	const create = async data => {
		try {
			
			// const imageUploaded = await imageService.upload(image);
			// debugger
			const addQuiz = await quiz.create(data);
			console.log(addQuiz);
			props.history.push(`/dashboard/create/quiz/${addQuiz.id}/overview`);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		create({ title, description });
	};

	const onChangeImage = Event => {
		const file = Event.target.files[0];
		setImage(file)

		

		// files.forEach((file, i) => {
		// 	formData.append(i, file);
		// });

		// fetch(`${API_URL}/image-upload`, {
		// 	method: 'POST',
		// 	body: formData,
		// })
		// 	.then(res => res.json())
		// 	.then(images => {
		// 		this.setState({
		// 			uploading: false,
		// 			images,
		// 		});
		// 	});
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<div className="form__container">
					<header className="form__header">
						<h2 className="form__title">Create quiz</h2>
					</header>

					<div className="create-quiz">
						<div className="create-quiz__wrap">
							<fieldset className="form__fieldset">
								<p className="form__p">
									<label
										className="form__label"
										htmlFor="question_title"
									>
										Title
									</label>
									<input
										className="form__input"
										placeholder="Title"
										type="text"
										name="title"
										id="quiz_title"
										onChange={Event => setTitle(Event.target.value)}
									/>
								</p>

								<p className="form__p">
									<label
										className="form__label"
										htmlFor="question_title"
									>
										Description
									</label>
									<textarea
										className="form__textarea"
										placeholder="Description"
										name="description"
										onChange={Event =>
											setDescription(Event.target.value)
										}
									/>
								</p>
							</fieldset>
							<div className="media-uploader placeholder">
								<div className="media-uploader__body">
									<input
										type="file"
										className="image-uploader no-display"
										accept="image/gif, image/jpeg, image/jpg, image/png"
										onChange={onChangeImage}
									/>
								</div>
							</div>
						</div>
					</div>
					<button className="btn__link btn__link--green create-quiz__submit">
						Ok, go!
					</button>
				</div>
			</form>
		</section>
	);
}

export default withRouter(CreateQuizDescription);
