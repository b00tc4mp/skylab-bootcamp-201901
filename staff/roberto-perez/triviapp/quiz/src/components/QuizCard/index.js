import React from 'react';
import { Link } from 'react-router-dom';

function QuizCard(props) {
	const {
		quiz: { id, title, author },
	} = props;

	return (
		<div className="quiz">
			<figure className="quiz__figure">
				<Link to={`/quiz/${id}`} title={title} className="menu__link">
					<img
						src="https://assets.awwwards.com/awards/media/cache/optimize/submissions/2019/02/5c5f0480554d4130295365.jpg"
						alt=""
						className="quiz__image"
					/>
				</Link>
				<div className="btn-favorite">
					<i className="far fa-star" />
				</div>
				<div className="btn-likeit">
					<i className="far fa-heart" />
					<span className="btn-likeit__number">54</span>
				</div>
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
							<Link
								to={`/author/${author._id}`}
								rel="author"
								className="quiz__author"
							>
								{author.name}
							</Link>
						</div>
						<div className="quiz__stats">
							<span className="purple">24Qs</span>
							<span className="red">2.3k plays</span>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default QuizCard;
