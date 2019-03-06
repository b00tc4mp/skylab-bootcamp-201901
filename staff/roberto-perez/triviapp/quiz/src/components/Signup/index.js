import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Feedback from '../Feedback';

import auth from '../../services/auth';
import isAuthenticated from '../middlewares/isAuthenticated';

function Signup(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const signup = async data => {
		try {
			await auth.signup(data);
			props.history.push('/login');
		} catch (error) {
			setError(error.message)
		}
	};

	const handleSubmit = async Event => {
		Event.preventDefault();
		signup({ name, surname, email, password });
	};

	return (
		<section className="login">
			<div className="login__wrapper">
				<form onSubmit={handleSubmit}>
					<div className="login__container">
						<header className="login__header">
							<h2 className="login__title">Sign up</h2>
						</header>
						<fieldset className="login__fieldset">
							<p className="login__p">
								<label className="login__label" htmlFor="user_name">
									Name
								</label>
								<input
									className="login__input"
									placeholder="Name"
									type="text"
									name="name"
									id="user_name"
									onChange={Event => setName(Event.target.value)}
								/>
							</p>
							<p className="login__p">
								<label className="login__label" htmlFor="user_surname">
									Surname
								</label>
								<input
									className="login__input"
									placeholder="Surname"
									type="text"
									name="surname"
									id="user_surname"
									onChange={Event => setSurname(Event.target.value)}
								/>
							</p>
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
								Sign up
							</button>
						</fieldset>

						<div className="login__terms">
							<small>
								By signing up, you agree to our terms of use, privacy
								policy, and cookie policy.
							</small>
						</div>
					</div>
				</form>
				{error && <Feedback message={error} />}
				<footer className="login__footer">
					Have an account?{' '}
					<Link to="/login" title="Log in" className="login__signup">
						Log in!
					</Link>
				</footer>
			</div>
		</section>
	);
}

export default withRouter(isAuthenticated(Signup));
