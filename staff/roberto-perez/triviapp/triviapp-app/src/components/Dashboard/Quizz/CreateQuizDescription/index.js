import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import quiz from '../../../../services/quiz';
import imageService from '../../../../services/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import Feedback from '../../../Feedback';

function CreateQuizDescription(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);


	const onDrop = useCallback(async acceptedFiles => {
		setUploading(true);
		const imageUploaded = await imageService.upload(acceptedFiles[0]);
		setImage(imageUploaded.secure_url);
		setUploading(false);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	
	const create = async data => {
		try {
			if (image) {
				data.picture = image;
			}
			const addQuiz = await quiz.create(data);
			props.history.push(`/dashboard/create/quiz/${addQuiz.id}/overview`);
		} catch (error) {
			setError(error.message);
		}
	};


	const handleSubmit = async Event => {
		Event.preventDefault();
		create({ title, description });
	};


	return (
		<section className="create-quiz-wrap">
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
										onChange={Event =>
											setDescription(Event.target.value)
										}
									/>
								</p>
							</fieldset>

							<div className="media-uploader">
								<div className="media-uploader__body" {...getRootProps()}>
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
						{error && <Feedback message={error} />}
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
