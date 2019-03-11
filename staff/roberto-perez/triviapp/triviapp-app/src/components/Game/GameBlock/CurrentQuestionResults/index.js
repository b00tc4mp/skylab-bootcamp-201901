import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

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

	return (
		<Fragment>
			<div className="current-quiz__countdown" />
			<div className="current-quiz__statistic-results">
				<div className="answers-histogram">
					<div className="answers-histogram__choice answers-histogram__choice--red">
						0<div className="answers-histogram__bar answers-histogram__bar--10" />
					</div>
				</div>

				<div className="answers-histogram">
					<div className="answers-histogram__choice answers-histogram__choice--yellow">
						1<div className="answers-histogram__bar answers-histogram__bar--20" />
					</div>
				</div>

				<div className="answers-histogram">
					<div className="answers-histogram__choice answers-histogram__choice--blue">
						2<i className="fas fa-check" />
						<div className="answers-histogram__bar answers-histogram__bar--60" />
					</div>
				</div>

				<div className="answers-histogram">
					<div className="answers-histogram__choice answers-histogram__choice--green">
						0<div className="answers-histogram__bar answers-histogram__bar--10" />
					</div>
				</div>
			</div>
			<div className="current-quiz__answers">
				<button className="start-button" onClick={props.nextQuestion}>Next</button>
			</div>
		</Fragment>
	);
}

export default withRouter(CurrentQuestionResults);
