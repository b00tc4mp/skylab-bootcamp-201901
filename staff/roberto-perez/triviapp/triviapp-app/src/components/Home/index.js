import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchResults from '../SearchResults';
import Header from '../Header';
import Aside from '../Aside';
import Menu from '../Menu';
import Footer from '../Footer';
import Login from '../Login';
import Signup from '../Signup';
import Quiz from '../Quiz';
import Dashboard from '../Dashboard';

function Home(props) {
	return (
		<div className="wrapper">
			<div className="search__content">
				<input className="search__input" type="search" placeholder="Search..." />
				<button className="search__button">
					<FontAwesomeIcon icon="search" />
				</button>
			</div>

			<Aside>
				<Menu />
			</Aside>

			<main className="main">
				<Header />
				<div className="content">
					<Switch>
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/quiz/:quizId" component={Quiz} />
						<Route path="/dashboard" component={Dashboard} />
						<div className="container">
							<Route path="/" component={SearchResults} />
						</div>
					</Switch>
					<Footer />
				</div>
			</main>
		</div>
	);
}

export default Home;
