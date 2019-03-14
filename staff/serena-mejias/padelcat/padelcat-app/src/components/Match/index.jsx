import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styles from "./index.module.scss";
import ChosenPairs from "../ChosenPairs";
import { Form, Field, Values } from "react-final-form";
import logic from "../../logic";
import { log } from "util";

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

  const onSubmit = e => {
    console.log(e);
    logic.addChosenPlayers(playersChosen, matchId);
  };

  useEffect(() => {
    if (playersAvailable.filter(player => player._id === _id).length) {
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
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label value="firstPair">1st Match</label>
                <ChosenPairs
                  selectName="firstPair"
                  players={playersAvailable}
                  match={"firstMatch"}
                />
              </div>
              <div>
                <label value="secondPair">2nd Match</label>
                <ChosenPairs
                  selectName="secondPair"
                  players={playersAvailable}
                  match={"secondMatch"}
                />
              </div>
              <div>
                <label value="thirdPair">3rd Match</label>
                <ChosenPairs
                  selectName="thirdPair"
                  players={playersAvailable}
                  match={"thirdMatch"}
                />
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
          <div>
            <h4>1st Match</h4>
            {playersChosen &&
              playersChosen.playersId &&
              playersChosen.playersId.playersId && (
                <p>
                  {playersChosen.playersId.playersId["firstPair-firstPlayer"]} - {playersChosen.playersId.playersId["firstPair-secondPlayer"]}
                </p>
              )}
            <h4>2nd Match</h4>
            {playersChosen &&
              playersChosen.playersId &&
              playersChosen.playersId.playersId && (
                <p>
                  {playersChosen.playersId.playersId["secondPair-firstPlayer"]} - {playersChosen.playersId.playersId["secondPair-secondPlayer"]}
                </p>
              )}
            <h4>3rd Match</h4>
            {playersChosen &&
              playersChosen.playersId &&
              playersChosen.playersId.playersId && (
                <p>
                  {playersChosen.playersId.playersId["thirdPair-firstPlayer"]} - {playersChosen.playersId.playersId["thirdPair-secondPlayer"]}
                </p>
              )}
          </div>
        </div>
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
