import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styles from "./index.module.scss";
import ChosenPairs from "../ChosenPairs"

export const Match = props => {
  const [available, setAvailable] = useState(false);
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

  const { _id } = props.playerlogged;

  const handleSetAvailable = matchId => {
    props.handleSetAvailable(matchId);
    setAvailable(true);
  };

  const handleSetUnavailable = matchId => {
    props.handleSetUnavailable(matchId);
    setAvailable(false);
  };

  const handlePlayerChosen = e => e.target.value;

  useEffect(() => {
    if (playersAvailable.filter(playerId => playerId === _id).length) {
      return setAvailable(true);
    } else {
      return setAvailable(false);
    }
  }, [props]);

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
        <form>
          <label>
            1st Match
            <ChosenPairs match={props.match}/>
          </label>
          <label>
            2nd Match
            <ChosenPairs match={props.match}/>
          </label>
          <label>
            3rd Match
            <ChosenPairs match={props.match}/>
          </label>
        </form>
        <div>
          Are you available?
          <Button
            variant="contained"
            color="primary"
            className={styles.availableButton}
            onClick={() => {
              handleSetAvailable(matchId);
            }}
            disabled={available}
          >
            I'm available
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={`${styles.availableButton} ${styles.unavailable}`}
            onClick={() => {
              handleSetUnavailable(matchId);
            }}
            disabled={!available}
          >
            I'm NOT available
          </Button>
        </div>

        <span>{result}</span>
        <span>{location}</span>
      </div>
    </div>
  );
};
