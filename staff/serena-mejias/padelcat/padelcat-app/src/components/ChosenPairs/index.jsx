import React, { useState } from "react";
import { Form, Field } from "react-final-form";
export default function ChosenPairs(props) {
  const onChosenPair = () => {
    return props.playersChosen;
  };

  const { playersAvailable } = props.match;
  return (
    <section>
      <Field name="firstChosePair" component="select">
        <option />
        {playersAvailable &&
          playersAvailable.map(playerAvailable => (
            <option value={"firstPlayer"}>{playerAvailable}</option>
          ))}
      </Field>
      <Field name="firstChosePair" component="select">
        <option />
        {playersAvailable &&
          playersAvailable.map(playerAvailable => (
            <option value={"secondPlayer"}>{playerAvailable}</option>
          ))}
      </Field>
    </section>
  );
}
