import React, { Component } from "react";

class Favourite extends Component {

  handleItemChosen = id => {
      const { props : { onItem }} = this;
      
      //como pasar title como name? (({ id, name: title }) => ({ id, title }))
      onItem(id);
  }  

  handleBackToSearch = () => {
      const { props: {onToSearch} }
      onToSearch()
  } 


  render() {
    return (
      <section className="favourites container margin-top">
        <div className="level is-mobile">
          <h4 className="level-item">Favourites</h4>
          <div className="level-item">
            <button
              onClick={handleBackToSearch}
              className="button is-dark is-small is-rounded"
            >
              <i className="fas fa-chevron-circle-left" />&nbsp;&nbsp;Back to
              Search
            </button>
          </div>
        </div>
        <nav className="panel list-group track">
          {userFavourites.map(({ id, name }) => {
            return (
              <a
                onClick={() => handleItemChosen(id)}
                data-id={id}
                className="panel-block"
              >
                <span className="panel-icon">
                  <i className="fas fa-music" aria-hidden="true" />
                </span>
                {name}
              </a>
            );
          })}
        </nav>
      </section>
    );
  }
}

export default Favourite;
