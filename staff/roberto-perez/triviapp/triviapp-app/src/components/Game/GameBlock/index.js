import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../../services/game';

// import socketApi from '../../../services/socket';

import ExpandButton from '../ExpandButton';
import CurrentQuestion from './CurrentQuestion';
import CurrentQuestionResults from './CurrentQuestionResults';

import GameContext from '../GameContext';

function GameBlock(props) {
	const {
		gameID,
		players,
		currentQuestion,
		totalQuestions,
		currentQuestionIndex,
		hostGame
	} = useContext(GameContext);

	let countDownTimeout;
	// const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
	const [count, setCount] = useState(currentQuestion.time);
	// const [answers, setAnswers] = useState(props.currentQuestion.answers);
	const [results, setResults] = useState([]);

	const [showResults, setShowResults] = useState(false);

	const colors = ['red', 'blue', 'yellow', 'green'];

	useEffect(() => {
		countDown();

		return () => {
			clearTimeout(countDownTimeout);
		};
	}, [count]);

	useEffect(() => {
		gameService.showQuestionToPlayer(gameID);

		return () => {
			clearTimeout(countDownTimeout);
		};
	}, []);

	const countDown = async () => {
		if (count === 0) {
			showResultsScreen();
			await gameService.showTimeOutScreen(gameID);
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	};

	const showResultsScreen = async () => {
		clearTimeout(countDownTimeout);

		const _results = await gameService.showQuestionsResults(
			gameID,
			currentQuestion._id,
		);

		setResults(_results);

		setShowResults(true);
	};

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">{currentQuestion.title}</h1>
				<ExpandButton hostGame={hostGame} />
			</header>

			<div className="current-quiz">
				<div className="current-quiz__wrapper">
					<div className="current-quiz__details">
						{showResults ? (
							<CurrentQuestionResults
								nextQuestion={props.nextQuestion}
								gameOver={props.gameOver}
								currentQuestionIndex={currentQuestionIndex}
								totalQuestions={totalQuestions}
								results={results}
							/>
						) : (
							<CurrentQuestion
								image={currentQuestion.picture}
								totalUsers={players.length}
								showResultsScreen={showResultsScreen}
								count={count}
							/>
						)}
					</div>
					<div className="current-quiz__choices">
						{currentQuestion &&
							currentQuestion.answers.map((answer, index) => {
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
								return '';
							})}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(GameBlock);
