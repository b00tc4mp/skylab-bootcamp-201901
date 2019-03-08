import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function QuizInfo(props) {
	console.log(props)
	const {
		quiz: { title, description, author },
	} = props;

	return (
		<div className="quiz-details__content">
			<div className="quiz-details-header">
				<div className="quiz-details-header__image">
					<figure className="quiz-details-header__figure">
						<img
							src="https://assets.awwwards.com/awards/media/cache/optimize/submissions/2019/02/5c5f0480554d4130295365.jpg"
							alt=""
							className="quiz__image"
						/>
					</figure>
				</div>
				<div className="quiz-details-header__info">
					<header>
						<h3 className="quiz-details-header__title">{title}</h3>
					</header>

					<div className="quiz-details-header__action-buttons-wrapper">
						<div className="quiz-details-header__action-buttons-group">
							<button
								className="btn__link btn__link--green green quiz-details-header__action-buttons-play"
								disabled
							>
								Play
							</button>
						</div>
						<div className="quiz-details-header__action-buttons-group">
							<button className="quiz-details-header__action-buttons-favorite">
								<i className="far fa-star" />
							</button>
						</div>
					</div>

					<div className="quiz-details-header__pescription">{description}</div>

					<ul className="quiz-details-header__statistics">
						<li>
							<span className="strong">55</span> favorites
						</li>
						<li>
							<span className="strong">15k</span> plays
						</li>
						<li>
							<span className="strong">23.5k</span> players
						</li>
					</ul>
					{author && (
						<footer className="quiz-footer">
							by{' '}
							<Link
								to={`/author/${author._id}`}
								rel="author"
								title={author.name}
								className="quiz__author"
							>
								{author.name}
							</Link>
						</footer>
					)}
				</div>
			</div>
		</div>
	);
}

export default QuizInfo;
