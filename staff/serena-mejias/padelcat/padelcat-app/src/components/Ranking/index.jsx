import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export const Ranking = props => {
  const [players, setPlayers] = useState("");

  useEffect(() => {
    console.log("sa");

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
      <NavLink to={"/home"} className={styles.button}>
        <Button color="inherit">Home</Button>
      </NavLink>
      <ul>
        {players &&
          players.sort((a,b)=> {
            debugger
            b.score - a.score}).map(({ name, score }) => (
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
