import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import literals from "./literals";
import logic from "../../logic";
import MapList from "./MapList";

class YourMaps extends Component {
  state = { maps: [] };

  componentDidMount() {
    logic.isUserLoggedIn &&
      logic
        .retrieveUserMaps()
        .then(maps => this.setState({ maps }))
        .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const {
      state: { maps },
      props: { lang }
    } = this;

    const { title } = literals[lang];

    return (
      <>
        {!logic.isUserLoggedIn && <Redirect to="/logout" />}
        <h2 className="uk-text-center uk-margin-medium-bottom uk-margin-remove-top">{title}</h2>
        {maps && <MapList lang={lang} maps={maps} />}
      </>
    );
  }
}

export default withRouter(YourMaps);
