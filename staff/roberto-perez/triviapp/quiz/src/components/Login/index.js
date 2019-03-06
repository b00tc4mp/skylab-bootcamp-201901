import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Feedback from '../Feedback';

import auth from '../../services/auth';
import isAuthenticated from '../middlewares/isAuthenticated';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const login = async data => {
		try {
			const userId = await auth.login(data);
			console.log(userId);
			props.history.push('/home');
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		login({ email, password });
	};

	return (
		<section className="login">
			<div className="login__wrapper">
				<form onSubmit={handleSubmit}>
					<div className="login__container">
						<header className="login__header">
							<h2 className="login__title">Log in</h2>
						</header>
						<fieldset className="login__fieldset">
							<p className="login__p">
								<label className="login__label" htmlFor="user_email">
									Email
								</label>
								<input
									className="login__input"
									autoCorrect="off"
									autoCapitalize="off"
									placeholder="Email"
									autoFocus="autofocus"
									type="email"
									name="email"
									id="user_email"
									onChange={Event => setEmail(Event.target.value)}
								/>
							</p>
							<p>
								<label className="login__label" htmlFor="user_password">
									Password
								</label>
								<input
									className="login__input"
									placeholder="Password"
									type="password"
									name="password"
									id="user_password"
									onChange={Event => setPassword(Event.target.value)}
								/>
							</p>
							<button className="btn__link btn__link--green login__submit">
								Log in
							</button>
						</fieldset>
					</div>
				</form>
				{error && <Feedback message={error} />}
				<footer className="login__footer">
					¿New in Triviapp?{' '}
					<Link to="/signup" title="Sign up" className="login__signup">
						Sign up!
					</Link>
				</footer>
			</div>
		</section>
	);
}

export default withRouter(isAuthenticated(Login));
