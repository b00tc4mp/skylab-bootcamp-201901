import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styles from "./index.module.scss";
export const Match = props => {
  const [available, setAvailable] = useState(false);
  const handleSetAvailable = matchId => {
    props.handleSetAvailable(matchId);
    setAvailable(true);
  };

  const handleSetUnavailable = matchId => {
    props.handleSetUnavailable(matchId);
    setAvailable(false);
  };

  const {
    matchId,
    date,
    team1,
    imageTeam1,
    team2,
    imageTeam2,
    result,
    location,
    playersAvailable,
    playersChosen
  } = props.match;
  return (
    <div>
      <h4>{date}</h4>
      <div className="teams match">
        <div className="team1">
          <img src={imageTeam1} />
          <h6>{team1}</h6>
        </div>
        <div className="team2">
          <img src={imageTeam2} />
          <h6>{team2}</h6>
        </div>
      </div>
      <div>
        <ul>
          {playersAvailable &&
            playersAvailable.map(playerAvailable => (
              <li
                className={styles.playerAvailable}
                key={playerAvailable.playerId}
              >
                <p>{playerAvailable}</p>
              </li>
            ))}
        </ul>
        <div>
          Are you available?
          {!available && (
            <Button
              variant="contained"
              color="primary"
              className={styles.availableButton}
              onClick={() => {
                handleSetAvailable(matchId);
              }}
            >
              I'm available
            </Button>
          )}
          {available && (
            <Button
              variant="contained"
              color="secondary"
              className={`${styles.availableButton} ${styles.unavailable}`}
              onClick={() => {
                handleSetUnavailable(matchId);
              }}
            >
              I'm NOT available
            </Button>
          )}
        </div>

        <span>{result}</span>
        <span>{location}</span>
      </div>
    </div>
  );
};
