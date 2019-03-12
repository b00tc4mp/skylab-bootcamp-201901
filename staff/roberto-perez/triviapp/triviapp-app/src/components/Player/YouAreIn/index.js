import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import socketApi from '../../../services/socket';

function YouAreIn(props) {

	useState(() => {
		socketApi.startGameHandler(game => {
			props.history.push(`/player/${game.id}/start`);
		});
	}, []);

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
