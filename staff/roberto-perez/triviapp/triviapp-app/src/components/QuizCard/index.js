import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import auth from '../../services/auth';

import PlayGame from '../PlayGame';

function QuizCard(props) {
	const {
		quiz: { id, title, questions, picture, author, games },
	} = props;

	let imgSrc = './images/default-quiz.png';

	if(picture) {
		imgSrc = picture;
	}

	const userLoggedIn = JSON.parse(auth.userLoggedIn);

	return (
		<div className="quiz">
			<figure className="quiz__figure">
				<Link to={`/quiz/${id}`} title={title} className="menu__link">
					<img src={imgSrc} alt={title} className="quiz__image" />
				</Link>
				<div className="btn-favorite">
					<i className="far fa-star" />
				</div>
				{(userLoggedIn && (userLoggedIn.id === author._id)) && (
					<div className="btn-edit-quiz">
						<Link to={`dashboard/create/quiz/${id}/overview`}>
							<FontAwesomeIcon icon="pen" /> Edit
						</Link>
					</div>
				)}
			</figure>
			<div className="quiz__info">
				<div className="quiz__info-content">
					<header>
						<h3 className="quiz__title">
							<Link
								to={`/quiz/${id}`}
								title={title}
								className="quiz__title-link"
							>
								{title}
							</Link>
						</h3>
					</header>
					<footer className="quiz__footer">
						<div>
							by{' '}
							<span
								rel="author"
								className="quiz__author"
							>
								{author.name}
							</span>
						</div>
						<div className="quiz__stats">
							{(userLoggedIn && questions.length > 0) && (<PlayGame id={id} />)}
							<span className="purple">{questions.length}Qs</span>
							<span className="red">
								{games} play{games > 1 && 's'}
							</span>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default QuizCard;
