import React, { useState } from 'react';

function Search(props) {
  const [text, setText] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    props.onSearch(text);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Search" />
        </div>
        <div className="col-sm-2 col-xs-3">
          <button type="button" className="btn btn-primary" onClick={handleSearch}>
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;