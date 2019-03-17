import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import gameService from '../../../../services/game';

function CurrentQuestion(props) {

	const {
		picture,
		count,
		totalUsers,
		showResultsScreen,
		match: {
			params: { gameId },
		},
	} = props;

	const [countAnswer, setCountAnswer] = useState(0);
	
	useEffect(() => {
		gameService.onAnswerQuestion(() => {

			let currentAnswer = countAnswer + 1;

			setCountAnswer(currentAnswer);

			if(totalUsers === currentAnswer) {
				showResultsScreen();
			}
		});
	}, [countAnswer]);


	return (
		<Fragment>
			<div className="current-quiz__countdown">
				<div className="current-quiz__countdown-digit">{count}</div>
			</div>
			<div className="current-quiz__image-container">
				{picture && (<img
					src={picture}
					alt=""
					className="current-quiz__image"
				/>)}
			</div>
			<div className="current-quiz__answers">
				<span className="current-quiz__answers-number">{countAnswer}</span>
				Answers
			</div>
		</Fragment>
	);
}

export default withRouter(CurrentQuestion);
