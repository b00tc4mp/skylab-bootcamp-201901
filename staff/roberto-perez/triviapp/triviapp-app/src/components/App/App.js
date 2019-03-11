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
	faTrophy
} from '@fortawesome/free-solid-svg-icons';

import Home from '../Home';
import Game from '../Game/';
import Player from '../Player/';

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
	faTrophy
);


function App() {
	return (
		<Switch>
			<Route path="/game" render={() => <Game />} />
			<Route path="/player" render={() => <Player />} />
			<Route path="/" render={() => <Home />} />
		</Switch>
	);
}

export default App;
