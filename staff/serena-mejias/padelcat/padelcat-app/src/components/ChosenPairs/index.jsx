import React from "react";
import { Field } from "react-final-form";
import styles from "./index.module.scss";

export default function ChosenPairs(props) {
  // const onChosenPair = () => {
  //   return props.playersChosen;
  // };

  const { players, selectName } = props;
debugger
  return (
    <section className={styles.select_pair}>
      <Field className={styles.select_player} name={`${selectName}-firstPlayer`} component="select">
        <option />
        {players &&
          players.map(player => (
            <option value={player.id}>{player.name}</option>
          ))}
      </Field>
      <Field className={styles.select_player} name={`${selectName}-secondPlayer`} component="select">
        <option />
        {players &&
          players.map(player => (
            <option value={player.id}>{player.name}</option>
          ))}
      </Field>
    </section>
  );
}
