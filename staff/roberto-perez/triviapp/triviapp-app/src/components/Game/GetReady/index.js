import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ExpandButton from '../ExpandButton';

import GameContext from '../GameContext';

function GetReady(props) {
	
	const { gameID, currentQuestionIndex, currentQuestion, totalQuestions, hostGame } = useContext(GameContext);

	let countDownTimeout;

	const initSeconds = 5;

	const [count, setCount] = useState(initSeconds);

	useEffect(() => {
		countDown();

		return () => {
			clearTimeout(countDownTimeout);
		};
	}, [count]);

	const countDown = () => {
		if (count === 0) {
			clearTimeout(countDownTimeout);

			props.history.replace(`/game/${gameID}/gameblock`);
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	};

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">
					Question {currentQuestionIndex + 1} of {totalQuestions}
				</h1>
				<ExpandButton hostGame={hostGame} />
			</header>

			<div className="progressbar">
				<div className="progressbar__bar" />
			</div>

			<div className="start-game">
				<div className="ready-question">
					<h3>{currentQuestion && currentQuestion.title}</h3>
				</div>
			</div>

			<footer className="footer-game">
				Win up to <strong>100</strong> points!
			</footer>
		</Fragment>
	);
}

export default withRouter(GetReady);
