import React, { Component } from "react";
import logic from "../Logic";

class Favourite extends Component {
  state = { userFavourites: [] };

  componentDidMount() {
    return logic.retrieveFavourites()
      .then(userFavourites => this.setState({userFavourites}));
  }

  handleItemChosen = id => {
    const {props: { onItem } } = this;

    onItem(id);
  };

  render() {
    const { state: { userFavourites }, handleItemChosen, handleToHome} = this

    return (
      <section className="favourites container margin-top">
        <nav className="panel list-group track">
          {
            userFavourites.map(({id, name}) =>  {

            return (<a onClick={() => handleItemChosen(id)} data-id={id}className="panel-block">
                <span className="panel-icon">
                  <i class="fas fa-bolt"></i>
                </span>
                {name}
              </a>)
          })  
          }
        </nav>
      </section>
    );
  }
}

export default Favourite;
