import React, { useState, useEffect, Fragment } from 'react';

import quiz from '../../services/quiz';
import Answer from './Answer';
import QuizInfo from './QuizInfo';

function Loading(props) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(props.isLoading)
	}, [props]);

	return (
		<Fragment>
			{isLoading && (
				<div className="player-game player-game--black">
					<div className="player-game__getready">
						<div className="loadingspinner" />
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default Loading;
