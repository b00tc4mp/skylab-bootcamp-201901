import React, { Component } from "react";

class Home extends Component {
    state = { match: null }
  render() {
    componentDidMount(() => {
      if (!logic.getStoredtoken()) {
        props.history.push("/login");
      }
    });

    return (
      <section>
        <h3>Home</h3>
        <div>
            <h4>{date}</h4>
        </div>
      </section>
    );
  }
}

export default Home;
