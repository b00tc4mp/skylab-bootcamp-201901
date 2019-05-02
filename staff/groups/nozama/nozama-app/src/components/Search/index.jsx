import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search(props) {
  const [text, setText] = useState('');

  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <input
            className="form-control"
            type="text"
            onChange={e => setText(e.target.value)}
            value={text}
            placeholder="Search"
          />
        </div>
        <div className="col-2">
          <Link to={'/search/' + text} className="btn btn-primary">
            <i className="fas fa-search" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Search;
