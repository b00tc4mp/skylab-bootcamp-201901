import React from "react";
import { Field } from "react-final-form";

export default function ChosenPairs(props) {
  // const onChosenPair = () => {
  //   return props.playersChosen;
  // };

  const { players, selectName } = props;
  
  return (
    <section>
      <Field name={`${selectName}-firstPlayer`} component="select">
        <option />
        {players && players.map( player => <option value={player.id}>{player.name}</option>)}
      </Field>
      <Field name={`${selectName}-secondPlayer`} component="select">
        <option />
        {players && players.map( player => <option value={player.id}>{player.name}</option>)}
      </Field>
    </section>
  );
}
