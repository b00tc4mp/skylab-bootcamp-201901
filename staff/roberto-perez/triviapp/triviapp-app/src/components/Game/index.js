import React, { useRef, useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import requireAuth from '../middlewares/requireAuth';
import gameService from '../../services/game';
import authService from '../../services/auth';

import Welcome from './Welcome';
import Start from './Start';
import GetReady from './GetReady';
import GameBlock from './GameBlock';
import GameOver from './GameOver';

import GameContext from './GameContext';

function Game(props) {
	const {
		match,
		match: {
			params: { gameId },
		},
	} = props;

	const hostGame = useRef(null);

	// const [gameInfo, setGameInfo] = useState({
	// 	gameTitle: '',
	// 	players: [],
	// 	code: 'Connecting...',
	// 	totalQuestions: 0,
	// 	currentQuestion: null,
	// 	currentQuestionIndex: 0,
	// 	totalUsers: 0,
	// });

	const [game, setGame] = useState(null);
	const [gameID, setGameID] = useState(gameId);
	const [gameTitle, setGameTitle] = useState('');
	const [players, setPlayers] = useState([]);
	const [code, setCode] = useState('Connecting...');
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [totalUsers, setTotalUsers] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	useEffect(() => {
		getGameByID(gameID);
	}, [gameId]);

	useEffect(() => {
		gameService.onPlayerJoinedRoom(() => {
			getGameByID();
		});
	}, []);

	const getGameByID = async () => {
		try {
			const game = await gameService.getGameByID(gameID);

			if (authService.userLoggedIn.id !== game.host) {
				throw Error(
					'This quiz has been set to private. Ask the creator to share it with you to play',
				);
			} 
			
			gameService.onReconect(gameID);
			

			if (game.end) {
				props.history.replace(`/`);
			}

			const _currentQuestionIndex = game.quiz.questions.findIndex(
				question => question._id === game.currentQuestion._id,
			);

			setGame(game);

			setCurrentQuestionIndex(_currentQuestionIndex);

			setGameTitle(game.quiz.title);

			setCode(game.code);

			setPlayers(game.users);

			setTotalQuestions(game.quiz.questions.length);

			setCurrentQuestion(game.currentQuestion);
		} catch (error) {
			console.log(error);
		}
	};

	const nextQuestion = async () => {
		try {
			const game = await gameService.nextQuestion(gameID);

			const _currentQuestionIndex = game.quiz.questions.findIndex(
				question => question._id === game.currentQuestion._id,
			);

			setCurrentQuestionIndex(_currentQuestionIndex);

			setCurrentQuestion(game.currentQuestion);

			if (currentQuestion) {
				props.history.replace(`/game/${gameID}/getready`);
			} else {
				props.history.replace(`/game/${gameID}/gameover`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const gameOver = async () => {
		console.log('GAMEOVER!');
		try {
			props.history.replace(`/game/${gameId}/game-over`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GameContext.Provider
			value={{
				gameID,
				currentQuestionIndex,
				gameTitle,
				code,
				players,
				totalQuestions,
				currentQuestion,
				hostGame,
			}}
		>
			{game && currentQuestion && (
				<section className="host-game" ref={hostGame}>
					<Switch>
						<Route
							exact
							path={`${match.url}/welcome`}
							render={() => <Welcome />}
						/>
						<Route
							exact
							path={`${match.url}/start`}
							render={() => <Start />}
						/>
						<Route
							exact
							path={`${match.url}/getready`}
							render={() => <GetReady />}
						/>
						<Route
							exact
							path={`${match.url}/gameblock`}
							render={() => (
								<GameBlock
									nextQuestion={nextQuestion}
									gameOver={gameOver}
								/>
							)}
						/>
						<Route
							exact
							path={`${match.url}/game-over`}
							render={() => <GameOver />}
						/>
					</Switch>
				</section>
			)}
		</GameContext.Provider>
	);
}

export default withRouter(requireAuth(Game));
