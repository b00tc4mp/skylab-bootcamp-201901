import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
export const Ranking = props => {
  const [players, setPlayers] = useState("");

  useEffect(() => {
      console.log('sa');
      
    logic
      .retrievePlayers()
      .then(players => {
        console.log(players);

        setPlayers(players);
      })
      .catch(error => {
        throw Error(error);
      });
  }, []);

  return (
    <section>
      <ul>
        {players &&
          players.map(({ name, score }) => (
            <li className={styles.player} key={players.id}>
              <h6>{name}</h6>
              <span>{score}</span>
            </li>
          ))}
      </ul>
    </section>
  );
};
export default Ranking;
