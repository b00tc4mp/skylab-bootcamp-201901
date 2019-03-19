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
	const asideRef = useRef(null);
	const mainRef = useRef(null);

	useEffect(() => {
		wrapperRef.current.addEventListener('click', hideAll, false);
		return () => {
			wrapperRef.current.removeEventListener('click', hideAll, false);
		};
	}, []);

	const hideAll = Event => {
		wrapperRef.current.classList.remove('wrapper--show');
		searchRef.current.classList.remove('search__content--open');
		asideRef.current.classList.remove('sidebar--show');
		mainRef.current.classList.remove('main--hide');
		searchRef.current.children[0].value = '';
	};

	const showSearch = () => {
		wrapperRef.current.classList.add('wrapper--show');
		searchRef.current.classList.add('search__content--open');
	};


	const showMenu = () => {
		wrapperRef.current.classList.add('wrapper--show');
		asideRef.current.classList.add('sidebar--show');
		mainRef.current.classList.add('main--hide');
	};

	

	return (
		<Fragment>
			<SearchForm searchRef={searchRef} hideSearch={hideAll} />

			<div className="wrapper" ref={wrapperRef}>

				<aside className="sidebar" ref={asideRef}>
					<div className="sidebar__scrolling-content">
						<div className="sidebar__scrolling-content-scroll">
							<Menu />
						</div>
					</div>
				</aside>

				<main className="main" ref={mainRef}>
					<Header showSearch={showSearch}  showMenu={showMenu} wrapperRef={wrapperRef} asideRef={asideRef} />

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
