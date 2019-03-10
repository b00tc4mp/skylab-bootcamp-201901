import React, { Component } from 'react';
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
	faCogs
} from '@fortawesome/free-solid-svg-icons';

import Home from '../Home';
import Game from '../Game/Game';

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
	faCogs
);

class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/game" render={() => <Game />} />
				<Route path="/" render={() => <Home />} />
			</Switch>
		);
	}
}

export default App;
