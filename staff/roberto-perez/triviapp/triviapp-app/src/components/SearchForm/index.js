import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchForm(props) {

	const [query, setQuery] = useState('');

	const handleSearchSubmit = Event => {
		Event.preventDefault();
		
		props.hideSearch();

		props.history.replace(`/search/${query}`);
	};
	

	return (
		<form className="search__content" ref={props.searchRef} onSubmit={handleSearchSubmit}>
			<input className="search__input" type="search" placeholder="Search..." onChange={Event => setQuery(Event.target.value)} />
			<button className="search__button">
				<FontAwesomeIcon icon="search" />
			</button>
		</form>
	);
}

export default withRouter(SearchForm);
