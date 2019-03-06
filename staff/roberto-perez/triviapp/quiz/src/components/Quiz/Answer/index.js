import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = ['red', 'blue', 'yellow', 'green'];

function Answer(props) {

    const { answers, index } = props;

	return (
		<li key={answers._id} className="question-detail__answers-item">
			<div className="question-detail__answer">
				<span
					className={`question-detail__answer-color question-detail__answer-color--${
						colors[index]
					}`}
				/>
				{answers.title}
			</div>
			<div
				className={`question-detail__choice question-detail__choice--${
					answers.success
				}`}
			>
				{answers.success ? (
					<FontAwesomeIcon icon="check" />
				) : (
					<FontAwesomeIcon icon="times" />
				)}
			</div>
		</li>
	);
}

export default Answer;
