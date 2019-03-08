import React from 'react';

function Feedback({ message }) {
	return (
		<section className="feedback">
			<div className="feedback__wrapper">{message}</div>
		</section>
	);
}

export default Feedback;
