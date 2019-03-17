import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../Header';
import Aside from '../Aside';
import Menu from '../Menu';
import Footer from '../Footer';
import Login from '../Login';
import Signup from '../Signup';
import Quiz from '../Quiz';
import Dashboard from '../Dashboard';
import Landing from '../Landing';
import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';
import UserProfile from '../UserProfile';
import NotFound from '../NotFound';

function Home(props) {
	const searchRef = useRef(null);
	const wrapperRef = useRef(null);

	useEffect(() => {
		wrapperRef.current.addEventListener('click', hideSearch, false);
		return () => {
			wrapperRef.current.removeEventListener('click', hideSearch, false);
		};
	}, []);

	const hideSearch = Event => {
		wrapperRef.current.classList.remove('wrapper--show');
		searchRef.current.classList.remove('search__content--open');
		searchRef.current.children[0].value = '';
	};

	const showSearch = () => {
		wrapperRef.current.classList.add('wrapper--show');
		searchRef.current.classList.add('search__content--open');
	};

	return (
		<Fragment>
			
			<SearchForm searchRef={searchRef} hideSearch={hideSearch} />

			<div className="wrapper" ref={wrapperRef}>
				<Aside>
					<Menu />
				</Aside>

				<main className="main">
					<Header showSearch={showSearch} />
					<div className="content">
						<Switch>
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/login" component={Login} />
							<Route path="/quiz/:quizId" component={Quiz} />
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/search/:query" component={SearchResults} />
							<Route exact path="/user/profile" component={UserProfile} />
							<Route path="/" component={Landing} />
							<Route path="*" component={NotFound} />
						</Switch>
						<Footer />
					</div>
				</main>
			</div>
		</Fragment>
	);
}

export default Home;
