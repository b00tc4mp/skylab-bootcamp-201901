import React, { useState, useEffect, useRef, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

function GetReady(props) {
	let countDownTimeout;

    let fillHeight = 100;
    let initSeconds = 5;

	const countFill = useRef(null);

	const [count, setCount] = useState(initSeconds);

	const {
		match: {
			params: { gameId },
		},
	} = props;

	useEffect(() => {
		countDown();
	}, [count]);

	const countDown = () => {
		const fill = countFill.current;

		fill.style.height = fillHeight - (fillHeight * count) / initSeconds + '%';

		if (count === 0) {
			clearTimeout(countDownTimeout);
			fill.style.height = '100%';
			setTimeout(() => {
				props.history.push(`/game/${gameId}/getready`);
			}, 1000);
			return;
		}

		countDownTimeout = setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	};

	return (
		<Fragment>
			<header className="header-game-top">
				<h1 className="header-game-top__title">
					Our Solar System: Where are the Small Worlds
				</h1>
				<button className="expand_button">
					<svg viewBox="0 0 24 24">
						<path
							id="play"
							d="m 3.4285714,15.428571 -3.42857145,0 0,8.571429 8.57142905,0 0,-3.428571 -5.1428577,0 0,-5.142858 z M -5e-8,8.5714287 l 3.42857145,0 0,-5.1428573 5.1428577,0 L 8.5714291,0 -4.9999999e-8,0 l 0,8.5714287 z M 20.571428,20.571429 l -5.142857,0 0,3.428571 L 24,24 l 0,-8.571429 -3.428572,0 0,5.142858 z M 15.428571,2e-7 l 0,3.4285714 5.142857,0 0,5.1428571 3.428572,0 L 24,2e-7 l -8.571429,0 z"
						>
							<animate
								id="animation-to"
								begin="indefinite"
								fill="freeze"
								attributeName="d"
								dur="0.15s"
								to="m 5.0000001e-8,18.857143 5.14285695,0 0,5.142857 3.428572,0 0,-8.571429 -8.571428950000001,0 0,3.428572 z M 5.142857,5.1428572 l -5.14285695,0 0,3.4285714 8.571428949999999,0 0,-8.571428500000001 -3.428572,0 0,5.142857100000001 z M 15.428571,24 l 3.428572,0 0,-5.142857 5.142857,0 0,-3.428572 -8.571429,0 0,8.571429 z m 3.428572,-18.8571428 0,-5.1428571 -3.428572,0 0,8.5714285 8.571429,0 0,-3.4285714 -5.142857,0 z"
							/>

							<animate
								id="animation-from"
								begin="indefinite"
								fill="freeze"
								attributeName="d"
								dur="0.15s"
								to="m 3.4285714,15.428571 -3.42857145,0 0,8.571429 8.57142905,0 0,-3.428571 -5.1428577,0 0,-5.142858 z M -5e-8,8.5714287 l 3.42857145,0 0,-5.1428573 5.1428577,0 L 8.5714291,0 -4.9999999e-8,0 l 0,8.5714287 z M 20.571428,20.571429 l -5.142857,0 0,3.428571 L 24,24 l 0,-8.571429 -3.428572,0 0,5.142858 z M 15.428571,2e-7 l 0,3.4285714 5.142857,0 0,5.1428571 3.428572,0 L 24,2e-7 l -8.571429,0 z"
							/>
						</path>
					</svg>
				</button>
			</header>
			<div className="start-game">
				<div className="countdown">
					<div className="countdown__fill" ref={countFill} />
					<div className="countdown__digit">{count + 1}</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withRouter(GetReady);
