import React from "react";
import { Field } from "react-final-form";
export default function ChosenPairs(props) {

  const { selectorName, players } = props;
  return (
    <section>
      <Field name={`${selectorName}-firstPlayer`} component="select">
        <option />
        {players &&
          players.map(({ id, name }) => (
            <option value={id}>{name}</option>
          ))}
      </Field>
      <Field name={`${selectorName}-secondPlayer`} component="select">
        <option />
        {players &&
          players.map(({ id, name }) => (
            <option value={id}>{name}</option>
          ))}
      </Field>
    </section>
  );
}
