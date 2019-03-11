import React, { Fragment } from 'react';

function CurrentQuestion({count}) {
	return (
		<Fragment>
			<div className="current-quiz__countdown">
				<div className="current-quiz__countdown-digit">{count}</div>
			</div>
			<div className="current-quiz__image-container">
				<img
					src="https://assets.awwwards.com/awards/media/cache/optimize/submissions/2019/02/5c5f0480554d4130295365.jpg"
					alt=""
					className="current-quiz__image"
				/>
			</div>
			<div className="current-quiz__answers">
				<span className="current-quiz__answers-number">0</span>
				Answers
			</div>
		</Fragment>
	);
}

export default CurrentQuestion;
