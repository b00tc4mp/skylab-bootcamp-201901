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
import { lightGreen } from "@material-ui/core/colors";

export const Home = props => {
  const [matches, setMatches] = useState("");
  const [players, setPlayers] = useState([]);

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
    logic.retrievePlayers().then(players => {
      setPlayers(players);
    });
  }, []);

  return (
    <section className={styles.container}>
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
                {console.log(match)}
                  <li className={styles.match} key={match.matchId}>
                    {players.length > 0 && (
                      <Match
                        match={match}
                        handleSetAvailable={props.handleSetAvailable}
                        handleSetUnavailable={props.handleSetUnavailable}
                        playerlogged={props.playerlogged}
                        players={players}
                      />
                    )}
                  </li>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </ul>
    </section>
  );
};
