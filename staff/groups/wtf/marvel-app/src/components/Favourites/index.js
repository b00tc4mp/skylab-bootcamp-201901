import React, { Component } from 'react';
import logic from '../Logic';
import './index.sass';

class Favourite extends Component {
  state = { userFavourites: undefined };
  componentDidMount() {
    return logic
      .retrieveFavourites()
      .then(userFavourites => this.setState({ userFavourites }));
  }

  handleItemChosen = id => {
    const {
      props: { onItem }
    } = this;

    onItem(id);
  };

  render() {
    const { userFavourites } = this.state;
    const { handleItemChosen } = this.props;
    return (
      <section className="favourites container margin-top has-text-centered">
        <nav className="panel list-group track">
          {userFavourites === undefined && <span>
                                              <i className=" favourite__loading fas fa-spinner fa-5x" />
                                           </span>}
          {userFavourites && userFavourites.length === 0 && (
            <h3 className="favourites__title white title is-4">
              No favourite characters added
            </h3> 
          )}
          {userFavourites && userFavourites.length > 0 &&
            userFavourites.map(({ id, name }) => (
              <a
                key={id}
                onClick={() => handleItemChosen(id)}
                data-id={id}
                className="favourite__item white title is-6 column is-three-fifths is-offset-one-fifth"
              >
                <span className="panel-icon">
                  <i className="fas fa-bolt" />
                </span>
                {name}
              </a>
            ))}
        </nav>
      </section>
    );
  }
}

export default Favourite;
