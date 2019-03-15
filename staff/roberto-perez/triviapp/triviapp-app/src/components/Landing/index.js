import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import SearchResults from '../SearchResults';

function Landing() {
	return (
		<div className="container">
			<section>
				<header className="header-section">
					<h2 className="header-section__title">
						<span className="header-section__title-strong">Featured</span> The
						most popular
					</h2>
				</header>

				<SearchResults />
			</section>
		</div>
	);
}

export default withRouter(Landing);
