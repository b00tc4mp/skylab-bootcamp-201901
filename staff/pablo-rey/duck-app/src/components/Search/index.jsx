import React from 'react'

function Search ({literals, selectedLanguage, cssClass, onSearch}) {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(e.target.searchText.value);
  }

  return (
    <form onSubmit={handleSearch} className={cssClass}>
      <input className={cssClass + '-input input'} type="text" name="searchText" />
      <button className={cssClass + '-button btn btn--small'}>{literals[selectedLanguage].buttonText}</button>
    </form>
  );
}

export default Search