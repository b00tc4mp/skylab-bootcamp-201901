import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gameService from '../../../services/game';

import PlayerContext from '../PlayerContext';

function GameBlock(props) {
	const { gameID, timeOut } = useContext(PlayerContext);

	const [currentQuestion, setCurrentQuestion] = useState(null);

	const [answers, setAnswers] = useState([]);

	const [answerSuccess, setAnswerSuccess] = useState(null);

	const [totalAnswers, setTotalAnswers] = useState(0);

	useEffect(() => {
		getGameByID(gameID);
	}, []);

	const getGameByID = async () => {
		try {
			const game = await gameService.getGameByID(gameID);

			const gameAnswers = [];

			game.currentQuestion.answers.map((answer) => {
				if (answer.title !== '') {
					gameAnswers.push(answer);
				}
			});

			setCurrentQuestion(game.currentQuestion);

			setAnswers(gameAnswers);

			setTotalAnswers(gameAnswers.length);

			setAnswerSuccess(null);
		} catch (error) {
			console.error(error);
		}
	};

	const answerSelected = async answer => {
		try {
			if (answerSuccess === null) {
				await gameService.answeQuestion(
					gameID,
					currentQuestion._id,
					answer,
				);

				setAnswerSuccess(answer.success);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const colors = ['red', 'blue', 'yellow', 'green'];

	return (
		<Fragment>
			<div className="current-quiz">
				<div className="current-quiz__wrapper">
					<Fragment>
						{timeOut && (
							<div className="player-game player-game--red">
								<div className="player-game__getready game-result">
									<h2>TimeOut</h2>
									<h4>
										<FontAwesomeIcon icon="clock" />
									</h4>
								</div>
							</div>
						)}

						{answerSuccess !== null && answerSuccess === true && (
							<div className="player-game player-game--green">
								<div className="player-game__getready game-result">
									<h2>Correct</h2>
									<h4>
										<FontAwesomeIcon icon="check-circle" />
									</h4>
								</div>
							</div>
						)}

						{answerSuccess !== null && answerSuccess === false && (
							<div className="player-game player-game--red">
								<div className="player-game__getready game-result">
									<h2>Incorrect</h2>
									<h4>
										<FontAwesomeIcon icon="times" />
									</h4>
								</div>
							</div>
						)}
					</Fragment>

					<div
						className={`current-quiz__choices-player current-quiz__choices-player--${totalAnswers}`}
					>
						{answers.map((answer, index) => {
							return (
								<button
									key={answer._id}
									className={`current-quiz__item current-quiz__item--${
										colors[index]
									}`}
									onClick={() => answerSelected(answer)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(GameBlock);
