import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gameService from '../../../../services/game';

function CurrentQuestionResults(props) {
	// const nextQuestion = async () => {
	// 	try {
	// 		const game = await gameService.nextQuestion();
	// 		console.log(game);
	// 		props.history.push(`/game/${game.id}/questions/getready`);
	// 	} catch(error) {
	// 		console.log(error)
	// 	}
	// }

	const colors = ['red', 'blue', 'yellow', 'green'];

	return (
		<Fragment>
			<div className="current-quiz__countdown" />
			<div className="current-quiz__statistic-results">
				{props.results &&
					props.results.map((answer, index) => {
						return (
							<div key={index} className="answers-histogram">
								<div
									className={`answers-histogram__choice answers-histogram__choice--${
										colors[index]
									}`}
								>
									{answer.total}
									{answer.success && <FontAwesomeIcon icon="check" />}
									<div
										className={`answers-histogram__bar answers-histogram__bar--${
											answer.percent
										}`}
									/>
								</div>
							</div>
						);
					})}
			</div>

			{props.currentQuestionIndex + 1 >= props.totalQuestions ? (
				<div className="current-quiz__answers">
					<button className="start-button game-over" onClick={props.gameOver}>
						Get results
					</button>
				</div>
			) : (
				<div className="current-quiz__answers">
					<button className="start-button" onClick={props.nextQuestion}>
						Next
					</button>
				</div>
			)}
		</Fragment>
	);
}

export default withRouter(CurrentQuestionResults);
