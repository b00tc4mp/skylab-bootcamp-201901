import React, { useState, useEffect, useRef, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import gameService from '../../../services/game';

import ExpandButton from '../ExpandButton';

function GetReady(props) {

	const {
		match: {
			params: { gameId },
		},
	} = props;

	let countDownTimeout;

	let fillHeight = 100;
	let initSeconds = 5;

	const countFill = useRef(null);

	const [count, setCount] = useState(initSeconds);
	const [title, setTitle] = useState('');

	useEffect(() => {
		countDown();
	}, [count]);

	useEffect(() => {
		getGameByQuizId();
	}, []);

	const getGameByQuizId = async () => {
		try {
			const game = await gameService.get(gameId);
			setTitle(game.quiz.title);
		} catch (error) {
			console.error(error);
		}
	};


	const countDown = () => {
		const fill = countFill.current;

		fill.style.height = fillHeight - (fillHeight * count) / initSeconds + '%';

		if (count === 0) {
			clearTimeout(countDownTimeout);
			fill.style.height = '100%';
			setTimeout(() => {
				props.history.push(`/game/${gameId}/questions/getready`);
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
				<h1 className="header-game-top__title">
					{title}
				</h1>
				<ExpandButton hostGame={props.hostGame} />
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

export default withRouter(GetReady);
