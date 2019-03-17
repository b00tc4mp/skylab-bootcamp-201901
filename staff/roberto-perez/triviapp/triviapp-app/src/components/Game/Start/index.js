import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
// import gameService from '../../../services/game';

import ExpandButton from '../ExpandButton';

import GameContext from '../GameContext';

function Start(props) {
	const { gameID, gameTitle, hostGame } = useContext(GameContext);

	let countDownTimeout;

	let fillHeight = 100;

	let initSeconds = 2;

	const countFill = useRef(null);

	const [count, setCount] = useState(initSeconds);

	// const [gameTitle, setGameTitle] = useState(title);

	useEffect(() => {
		countDown();

		return () => {
			clearTimeout(countDownTimeout);
		};
	}, [count]);

	const countDown = () => {
		const fill = countFill.current;

		fill.style.height = fillHeight - (fillHeight * count) / initSeconds + '%';

		if (count === 0) {
			clearTimeout(countDownTimeout);
			fill.style.height = '100%';
			setTimeout(() => {
				props.history.replace(`/game/${gameID}/getready`);
			}, 1000);
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	};

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">{gameTitle}</h1>
				<ExpandButton hostGame={hostGame} />
			</header>
			<div className="start-game">
				<div className="countdown">
					<div className="countdown__fill" ref={countFill} />
					<div className="countdown__digit">{count + 1}</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(Start);
