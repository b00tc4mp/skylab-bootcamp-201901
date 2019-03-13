import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styles from "./index.module.scss";
import ChosenPairs from "../ChosenPairs";
import { Form, Field } from "react-final-form";
import logic from "../../logic";

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

  const handleChosenPairsSubmit = e => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.value);

    // logic.addPlayersChosen();
  };

  const hanldeFirstPair = () => {
    //onChosenPair()
  };
  // const isInvalidChosenPairs = () => {
  //   return (
  //     !playerAvailable
  //   );
  // };

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
        <Form
          onSubmit={handleChosenPairsSubmit}
          initialValues={{ firstPair: "", secondPair: "", thirdPair: "" }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label value="firstPair">1st Match</label>
                <Field name="firstPairFirstPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"firstPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
                <Field name="firstPairSecondPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"secondPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
              </div>
              <div>
                <label value="secondPair">2nd Match</label>
                <Field name="secondPairFirstPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"firstPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
                <Field name="secondPairSecondPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"secondPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
              </div>
              <div>
                <label value="thirdPair">3rd Match</label>
                <Field name="thirdPairFirstPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"firstPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
                <Field name="thirdPairSecondPlayer" component="select">
                  <option />
                  {playersAvailable &&
                    playersAvailable.map(playerAvailable => (
                      <option value={"secondPlayer"}>{playerAvailable}</option>
                    ))}
                </Field>
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
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
