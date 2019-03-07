import React, { useEffect } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";

export const Home = props => {
  useEffect(() => {
    if (!logic.getStoredtoken()) {
      props.history.push("/login");
    }
  }, []);
  return (
    <section style={styles.container}>
      <h3>Home</h3>
      <div>
        <h4>Date</h4>
        <div className="teams">
          <div className="team1">
            <h6>Team1</h6>
            <img src="IMG1" />
          </div>
          <div className="team2">
            <h6>Team2</h6>
            <img src="IMG2" />
          </div>
          <ul>Available Players</ul>
          <label>
            Are you available?
            <input type="checkbox" name="Availability" />
          </label>
          <ul>Players Chosen</ul>
          <span>Result</span>
        </div>
      </div>
    </section>
  );
};
