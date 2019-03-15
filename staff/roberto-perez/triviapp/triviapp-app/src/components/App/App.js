import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
	faClock
} from '@fortawesome/free-solid-svg-icons';

import Home from '../Home';
import Game from '../Game/';
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
	faClock
);


function App() {
	return (
		<Switch>
			<Route exact path="/pin" render={() => <Pin />} />
			<Route path="/game/:gameId" render={() => <Game />} />
			<Route path="/player/:gameId" render={() => <Player />} />
			<Route path="/" render={() => <Home />} />
		</Switch>
	);
}

export default App;
