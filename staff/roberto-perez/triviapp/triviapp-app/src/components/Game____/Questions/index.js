import React, { useRef, useState, useEffect, Fragment } from 'react';

import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../../services/game';

import GetReady from '../GetReady';
import GameBlock from '../GameBlock';
import GameOver from '../GameOver';

function Questions(props) {
	const hostGame = useRef(null);

	const [totalQuestions, setTotalQuestions] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [totalUsers, setTotalUsers] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
		console.log('GET!');
		try {
			const game = await gameService.get(props.gameID);

			const _currentQuestionIndex = game.quiz.questions.findIndex(
				question => question._id === game.currentQuestion._id,
			);

			setCurrentQuestionIndex(_currentQuestionIndex);

			setCurrentQuestion(game.currentQuestion);

			setTotalQuestions(game.quiz.questions.length);

			setTotalUsers(game.users.length);
		} catch (error) {
			console.error(error);
		}
	};

	const nextQuestion = async () => {
		console.log('NEXT!');
		try {
			const game = await gameService.next(props.gameID);

			const _currentQuestionIndex = game.quiz.questions.findIndex(
				question => question._id === game.currentQuestion._id,
			);

			setCurrentQuestionIndex(_currentQuestionIndex);

			setCurrentQuestion(game.currentQuestion);

			if (currentQuestion) {
				props.history.push(`/game/${game.id}/questions/getready`);
			} else {
				props.history.push(`/game/${game.id}/gameover`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	

	return (
		<section className="host-game" ref={hostGame}>
			<Switch>
				{currentQuestion && (
					<Route
						path={`/game/:gameId/questions/getready`}
						render={() => (
							<GetReady
								hostGame={hostGame}
								currentQuestionIndex={currentQuestionIndex}
								totalQuestions={totalQuestions}
								currentQuestion={currentQuestion}
							/>
						)}
					/>
				)}
				{currentQuestion && (
					<Route
						path={`/game/:gameId/questions/gameblock`}
						render={() => (
							<GameBlock
								hostGame={hostGame}
								currentQuestion={currentQuestion}
								currentQuestionIndex={currentQuestionIndex}
								totalQuestions={totalQuestions}
								nextQuestion={nextQuestion}
								gameOver={props.gameOver}
								totalUsers={totalUsers}
							/>
						)}
					/>
				)}
			</Switch>
		</section>
	);
}

export default withRouter(Questions);
