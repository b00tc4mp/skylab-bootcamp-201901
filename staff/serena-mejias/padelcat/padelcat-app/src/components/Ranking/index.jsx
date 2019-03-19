import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export const Ranking = props => {
  const [players, setPlayers] = useState("");

  useEffect(() => {
    logic
      .retrievePlayers()
      .then(players => {
        const normalPlayers = players.filter(player => player.name !== "admin");
        setPlayers(normalPlayers);
      })
      .catch(error => {
        throw Error(error);
      });
  }, []);
  return (
    <section>
      <ul>
        {players &&
          players
            .sort((a, b) => b.score - a.score)
            .map(({ name, score }) => (
              <li className={styles.player} key={players.id}>
                <div className={styles.player_details}>
                  <h6 className={styles.player_name}>{name}</h6>
                  <span className={styles.player_score}>{score}</span>
                </div>
              </li>
            ))}
      </ul>
    </section>
  );
};
export default Ranking;
