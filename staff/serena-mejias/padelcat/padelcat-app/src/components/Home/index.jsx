import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Match } from "../Match";

export const Home = props => {
  const [matches, setMatches] = useState("");

  useEffect(() => {
    
    if (!logic.getStoredtoken()) {
      props.history.push("/login");
    }
    logic
      .getMatchesWithData()
      .then(matches => setMatches(matches))
      .catch(error => {
        throw Error(error);
      });
  }, []);

  return (
    <section className={styles.container}>
      <NavLink to={"/players"} className={styles.button}>
        <Button color="primary">Ranking</Button>
      </NavLink>
      <ul>
        {matches &&
          matches.map(match => (
            <li className={styles.match} key={match.matchId}>
              <Match
                match={match}
                handleSetAvailable={props.handleSetAvailable}
                handleSetUnavailable={props.handleSetUnavailable}
                playerlogged={props.playerlogged}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};
