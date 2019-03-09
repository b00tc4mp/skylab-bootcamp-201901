import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import quiz from '../../../../services/quiz';
import imageService from '../../../../services/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

function EditQuizDescription(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);

	const {
		match: {
			params: { quizId },
		},
	} = props;

	const onDrop = useCallback(acceptedFiles => {
		// Do something with the files
		setImage(acceptedFiles[0]);
		console.log(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
		edit(quizId, { title, description });
	};

	return (


		<section>
			<form onSubmit={handleSubmit}>
				<div className="form__container">
					<header className="form__header">
						<h2 className="form__title">Edit quiz</h2>
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
										value={title}
										onChange={Event => setTitle(Event.target.value)}
									/>
								</p>

								<p className="form__p no-margin">
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
										value={description}
										onChange={Event => setDescription(Event.target.value)}
									/>
								</p>
							</fieldset>

							<div className="media-uploader">
								<div className="media-uploader__body" {...getRootProps()}>
									{/* <input
										type="file"
										id="image-uploader"
										className="image-uploader no-display"
										accept="image/gif, image/jpeg, image/jpg, image/png"
										onChange={onChangeImage}
									/> */}
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
					</div>
					<button className="btn__link btn__link--green create-quiz__submit">
						Ok, go!
					</button>
				</div>
			</form>
		</section>
	);
}

export default withRouter(EditQuizDescription);
