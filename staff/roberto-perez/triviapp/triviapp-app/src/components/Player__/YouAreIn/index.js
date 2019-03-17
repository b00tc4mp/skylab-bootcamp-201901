import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import gameService from '../../../services/game';

function YouAreIn(props) {

	return (
		<div className="player-game player-game--green">
			<div className="player-game__getready">
				<h2>You're in!</h2>
				<h4>See your name on screen?</h4>
			</div>
		</div>
	);
}

export default withRouter(YouAreIn);
