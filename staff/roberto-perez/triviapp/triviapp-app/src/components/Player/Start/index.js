import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import authService from '../../../services/auth';

function Start(props) {
	return (
		<div className="player-game player-game--green">
			<div className="player-game__getready">
				<h2>Get ready!</h2>
				<div className="loadingspinner"></div>
				<h4>Loading...</h4>
			</div>
		</div>
	);
}

export default withRouter(Start);
