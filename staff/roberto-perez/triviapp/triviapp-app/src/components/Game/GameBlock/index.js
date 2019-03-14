import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../../services/game';

import socketApi from '../../../services/socket';


import ExpandButton from '../ExpandButton';
import CurrentQuestion from './CurrentQuestion';
import CurrentQuestionResults from './CurrentQuestionResults';

function GameBlock(props) {
	let countDownTimeout;
	const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
	const [count, setCount] = useState(props.currentQuestion.time);
	const [answers, setAnswers] = useState(props.currentQuestion.answers);

	const [showResults, setShowResults] = useState(false);

	const colors = ['red', 'blue', 'yellow', 'green'];

	const {
		match: {
			params: { gameId },
		},
	} = props;

	useEffect(() => {
		countDown();
	}, [count]);

	useEffect(() => {
		gameService.showQuestionToPlayer(gameId);
	}, []);

	const countDown = () => {
		if (count === 0) {
			showResultsScreen()
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	};

	const showResultsScreen = async () => {
		clearTimeout(countDownTimeout);
		const results = await gameService.showQuestionsResults(currentQuestion._id, gameId);
		console.log("##############")
		console.log(results);
		console.log("##############")
		setShowResults(true);
	}

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">{currentQuestion.title}</h1>
				<ExpandButton hostGame={props.hostGame} />
			</header>

			<div className="current-quiz">
				<div className="current-quiz__wrapper">
					<div className="current-quiz__details">
						{showResults ? (
							<CurrentQuestionResults nextQuestion={props.nextQuestion} />
						) : (
							<CurrentQuestion image={currentQuestion.picture} totalUsers={props.totalUsers} showResultsScreen={showResultsScreen} count={count} />
						)}
					</div>
					<div className="current-quiz__choices">
						{answers.map((answer, index) => {
							console.log(answer);
							if (answer.title !== '') {
								return (
									<div
										key={answer._id}
										className={`current-quiz__item current-quiz__item--${
											colors[index]
										}`}
									>
										{answer.title}
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(GameBlock);
