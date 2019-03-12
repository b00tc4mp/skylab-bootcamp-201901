import React, { useState } from "react";

export default function ChosenPairs(props) {
    const[playersChosen, setPlayersChosen] = useState("");
  
    const {playersAvailable} = props.match;
    return (
    <section>
      <select>
        <option value={""} />
        {playersAvailable &&
          playersAvailable.map(playerAvailable => (
            <option value={"player"}>{playerAvailable}</option>
          ))}
      </select>
      <select>
        <option value={""} />
        {playersAvailable &&
          playersAvailable.map(playerAvailable => (
            <option value={"player"}>{playerAvailable}</option>
          ))}
      </select>
    </section>
  );
};
