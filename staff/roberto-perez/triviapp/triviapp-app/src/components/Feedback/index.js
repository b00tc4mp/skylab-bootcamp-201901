import React from 'react';

function Feedback({ message }) {
	if (message) {
		return (
			<section className="feedback">
				<div className="feedback__wrapper">{message}</div>
			</section>
		);
	}
	return '';
}

export default Feedback;
