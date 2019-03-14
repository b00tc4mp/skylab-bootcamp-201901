import React, { useRef, useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../services/game';
import authService from '../../services/auth';

import Welcome from './Welcome';
import Start from './Start';
import Questions from './Questions';

function Game(props) {

	const {
		match,
		match: {
			params: { gameId },
		},
	} = props;

	
	const hostGame = useRef(null);

	const [gameID, setGameID] = useState(gameId);
	const [title, setTitle] = useState(gameId);
	const [code, setCode] = useState('Connecting...');
	const [isHost, setIsHost] = useState(false);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		getGameByQuizId();
	}, [props.match.params.gameId]);

	useEffect(() => {
		gameService.onPlayerJoinedRoom(() => {
			getGameByQuizId();
		});
	}, []);

	const getGameByQuizId = async () => {
		try {
			const game = await gameService.get(gameId);

			if (authService.userLoggedIn.id !== game.host) {
				throw Error(
					'This quiz has been set to private. Ask the creator to share it with you to play',
				);
			}

			if (game.gameStarted) props.history.push(`/game/${gameId}/start`);

			setIsHost(true);
			
			setTitle(game.quiz.title);

			setCode(game.code);

			setPlayers(game.users);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="host-game" ref={hostGame}>
			<Switch>
				<Route
					exact
					path={`${match.url}/welcome`}
					render={() => <Welcome hostGame={hostGame} gameID={gameID} players={players} isHost={isHost} code={code} />}
				/>

				<Route
					exact
					path={`${match.url}/start`}
					render={() => <Start hostGame={hostGame} gameID={gameID} title={title} />}
				/>

				<Route
					path={`${match.url}/questions`}
					render={() => <Questions hostGame={hostGame} gameID={gameID} title={title} />}
				/>
			</Switch>
		</section>
	);
}

export default withRouter(Game);
