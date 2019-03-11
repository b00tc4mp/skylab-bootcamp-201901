import React, { useRef, useState, useEffect, Fragment } from 'react';

import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../../services/game';

import GetReady from '../GetReady';
import GameBlock from '../GameBlock';

function Questions(props) {
	
	const hostGame = useRef(null);

	const [currentQuestion, setCurrentQuestion] = useState(gameService.currentQuestion);

	const nextQuestion = async () => {
		try {
			const game = await gameService.next();
			setCurrentQuestion(gameService.currentQuestion);

			if(currentQuestion) {
				props.history.push(`/game/${game.id}/questions/getready`);
			} else {
				props.history.push(`/game/${game.id}/gameover`);
			}

		} catch(error) {
			console.log(error)
		}
	}

	return (
		<section className="host-game" ref={hostGame}>
			<Switch>
				<Route
					path={`/game/:gameId/questions/getready`}
					render={() => <GetReady hostGame={hostGame} currentQuestion={currentQuestion} />}
				/>

				<Route
					path={`/game/:gameId/questions/gameblock`}
					render={() => <GameBlock hostGame={hostGame} currentQuestion={currentQuestion} nextQuestion={nextQuestion} />}
				/>
			</Switch>
		</section>
	);
}

export default withRouter(Questions);
