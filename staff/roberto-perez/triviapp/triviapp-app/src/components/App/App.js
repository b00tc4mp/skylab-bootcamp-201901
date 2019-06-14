import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHeart,
	faSearch,
	faCheck,
	faTimes,
	faCog,
	faSignOutAlt,
	faTrashAlt,
	faPen,
	faPlus,
	faTachometerAlt,
	faDownload,
	faPlayCircle,
	faCogs,
	faTrophy,
	faGamepad,
	faCheckCircle,
	faClock,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import Home from '../Home';
import Game from '../Game';
import Player from '../Player/';
import Pin from '../Player/Pin';

library.add(
	faHeart,
	faSearch,
	faCheck,
	faTimes,
	faCog,
	faSignOutAlt,
	faTrashAlt,
	faPen,
	faPlus,
	faTachometerAlt,
	faDownload,
	faPlayCircle,
	faCogs,
	faTrophy,
	faGamepad,
	faCheckCircle,
	faClock,
	faUserCircle,
);

function App() {
	return (
		<Fragment>
			<ToastContainer />
			<Switch>
				<Route exact path="/pin" render={() => <Pin />} />
				<Route path="/game/:gameId" render={() => <Game />} />
				<Route path="/player/:gameId" render={() => <Player />} />
				<Route path="/" render={() => <Home />} />
			</Switch>
		</Fragment>
	);
}

export default App;
