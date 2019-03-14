import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ExpandButton from '../ExpandButton';

function GetReady(props) {

    let countDownTimeout;
    const initSeconds = 5;
    const [count, setCount] = useState(initSeconds);
	// const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);

	const {
		match: {
			params: { gameId },
		},
	} = props;
	
	
    
    useEffect(() => {
		countDown();
	}, [count]);

	const countDown = () => {
		

		if (count === 0) {
            clearTimeout(countDownTimeout);
            
			props.history.push(`/game/${gameId}/questions/gameblock`);
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
    };
    
	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">Question 1 of {props.totalQuestions}</h1>
				<ExpandButton hostGame={props.hostGame} />
			</header>

			<div className="progressbar">
				<div className="progressbar__bar" />
			</div>

			<div className="start-game">
				<div className="ready-question">
					<h3>{props.currentQuestion.title}</h3>
				</div>
			</div>

			<footer className="footer-game">
				Win up to <strong>100</strong> points!
			</footer>
		</Fragment>
	);
}

export default withRouter(GetReady);
