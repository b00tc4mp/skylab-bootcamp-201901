import React from "react";
import { Field } from "react-final-form";
export default function ChosenPairs(props) {

  const { selectName, players } = props;
  console.log(players)
  
  return (
    <section>
      <Field name={`${selectName}-firstPlayer`} component="select">
        <option />
        {players &&
          players.map((player) => (
            <option value={player.id}>{player.name}</option>
          ))}
      </Field>
      <Field name={`${selectName}-secondPlayer`} component="select">
        <option />
        {players &&
          players.map((player) => (
            <option value={player.id}>{player.name}</option>
          ))}
      </Field>
    </section>
  );
}
