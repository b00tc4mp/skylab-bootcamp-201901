import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

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
			{/* <div className="search__content">
					<input
						className="search__input"
						type="search"
						placeholder="Search..."
						value=""
					/>
					<button className="search__button">
						<i className="fas fa-search" />
					</button>
				</div> */}

			<Aside>
				<Menu />
			</Aside>

			<main className="main">
				<Header />
				<div className="content">
					<Switch>
						<Route exact path="/signup" render={() => <Signup />} />
						<Route exact path="/login" render={() => <Login />} />
						<Route path="/quiz/:quizId" component={Quiz} />
						<Route path="/dashboard" render={() => <Dashboard />} />
						<Route path="/" render={() => <SearchResults />} />
					</Switch>
					<Footer />
				</div>
			</main>
		</div>
	);
}

export default Home;
