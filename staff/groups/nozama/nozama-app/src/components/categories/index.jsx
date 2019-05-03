import React from 'react';

function Categories(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Categories
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {this.props.categories.map(category => (
          <a key="category" className="dropdown-item" href="#">
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Categories;
