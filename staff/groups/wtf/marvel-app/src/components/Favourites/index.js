import React, { Component } from "react";
import logic from "../Logic";

class Favourite extends Component {
  state = { userFavourites: [] };

  componentDidMount() {
    return logic.retrieveFavourites()
      .then(userFavourites => this.setState({userFavourites}));
  }

  handleItemChosen = id => {
    const {
      props: { onItem }
    } = this;

    onItem(id);
  };

  render() {
    const {
      state: { userFavourites }, handleItemChosen, handleToHome
    } = this;

    return (
      <section className="favourites container margin-top">
        <div className="level is-mobile">
          <h4 className="level-item">Favourites</h4>
          <div className="level-item">
            <button
              onClick={handleToHome}
              className="button is-dark is-small is-rounded"
            >
              <i className="fas fa-chevron-circle-left" />
              &nbsp;&nbsp;Back to Search
            </button>
          </div>
        </div>
        <nav className="panel list-group track">
          {
            userFavourites.map(({id, name}) =>  {
              console.log(id)
              console.log(name)
            return (<a
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
          })  
          }
        </nav>
      </section>
    );
  }
}

export default Favourite;
