import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyQuizCard(props) {
	const {
		quiz: { id, title, author, picture },
	} = props;

	return (
		<div className="quiz">
			<figure className="quiz__figure">
				<Link
					to={`/dashboard/create/quiz/${id}/overview`}
					title={title}
					className="menu__link"
				>
					<img src={picture} alt={title} className="quiz__image" />
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
								to={`/dashboard/create/quiz/${id}/overview`}
								title={title}
								className="quiz__title-link"
							>
								{title}
							</Link>
						</h3>
					</header>
					<footer className="quiz__footer">
						<div>
							<Link
								to={`/author/${author._id}`}
								rel="author"
								className="quiz__author"
							>
								<FontAwesomeIcon icon="play-circle" /> Play
							</Link>
						</div>
						<div className="quiz__stats">
							<Link
								to={`/dashboard/create/quiz/${id}/overview`}
								title="Editar"
								className="content-quiz__edit-btn"
							>
								<FontAwesomeIcon icon="pen" />
							</Link>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default MyQuizCard;
