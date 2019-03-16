import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Match } from "../Match";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
      <ul className={styles.matches_list}>
        {matches &&
          matches.map(match => (
            <Card className={styles.card}>
              <CardContent>
                <Typography
                  className={styles.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <li className={styles.match} key={match.matchId}>
                    <Match
                      match={match}
                      handleSetAvailable={props.handleSetAvailable}
                      handleSetUnavailable={props.handleSetUnavailable}
                      playerlogged={props.playerlogged}
                    />
                  </li>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </ul>
    </section>
  );
};
