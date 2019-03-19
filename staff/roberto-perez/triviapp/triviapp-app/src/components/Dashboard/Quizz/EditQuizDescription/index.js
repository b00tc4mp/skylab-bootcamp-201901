import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import quizService from '../../../../services/quiz';
import imageService from '../../../../services/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import feedback from '../../../../utils/feedback';

function EditQuizDescription(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState(null);

	const {
		match: {
			params: { quizId },
		},
	} = props;

	const onDrop = useCallback(async acceptedFiles => {
		try {
			setUploading(true);
			const imageUploaded = await imageService.upload(acceptedFiles[0]);
			await quizService.editQuizPicture(quizId, imageUploaded.secure_url);
			setImage(imageUploaded.secure_url);
			setUploading(false);
		} catch (error) {
			feedback(error.message, 'error');
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	useEffect(() => {
		getQuizById(quizId);
	}, [props.match.params.quizId]);

	const getQuizById = async quizId => {
		try {
			const newQuiz = await quizService.get(quizId);
			setTitle(newQuiz.title);
			setDescription(newQuiz.description);
			setImage(newQuiz.picture);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	const edit = async (quizId, data) => {
		try {
			const editedQuiz = await quizService.edit(quizId, data);
			feedback('Quiz edited Successfully!', 'success')
			props.history.push(`/dashboard/create/quiz/${editedQuiz.id}/overview`);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		edit(quizId, { title, description });
	};

	return (
		<section className="create-quiz-wrap">
			<div className="form__wrapper">
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
											value={title}
											onChange={Event =>
												setTitle(Event.target.value)
											}
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
											onChange={Event =>
												setDescription(Event.target.value)
											}
										/>
									</p>
								</fieldset>

								<div className="media-uploader">
									<div
										className="media-uploader__body"
										{...getRootProps()}
									>
										<input name="file" {...getInputProps()} />

										<label
											className="media-uploader__label"
											htmlFor="image-uploader"
										>
											{uploading && (
												<div className="media-uploader__loading">
													<FontAwesomeIcon
														className="fa-spinner"
														icon="cog"
													/>
												</div>
											)}
											{image ? (
												<img
													src={image}
													alt="Preview"
													className="media-uploader__image-preview"
												/>
											) : (
												<div className="media-uploader__star">
													<FontAwesomeIcon icon="download" />
													<div>Select a file or drag here</div>
												</div>
											)}
										</label>
									</div>
								</div>
							</div>
						</div>
						<button className="btn__link btn__link--green btn-submit">
							Ok, save!
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default withRouter(EditQuizDescription);
