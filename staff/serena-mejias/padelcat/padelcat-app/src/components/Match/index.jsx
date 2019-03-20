import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import Place from "@material-ui/icons/Place";
import Close from "@material-ui/icons/Close";
import styles from "./index.module.scss";
import ChosenPairs from "../ChosenPairs";
import { Form, Values } from "react-final-form";
import logic from "../../logic";
import { find, get } from "lodash";

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
  const { _id, admin } = props.playerlogged;

  const handleSetAvailable = matchId => {
    props.handleSetAvailable(matchId);
    setAvailable(true);
  };

  const handleSetUnavailable = matchId => {
    props.handleSetUnavailable(matchId);
    setAvailable(false);
  };

  const getPlayerById = position => {
    const player = find(props.players, {
      _id: playersChosen.players[position]
    });
    return player ? player.name : "";
  };

  const onSubmit = e => {
    try {
      logic.addChosenPlayers(e, matchId);
      window.location.reload();
    } catch (error) {
      throw Error(error);
    }
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
      <h4 className={styles.date}>{date}</h4>
      <div className={styles.teams}>
        <div className={styles.team}>
          <img src={imageTeam1} />
          <h6 className={styles.teamName}>{team1}</h6>
        </div>
        <div className={styles.team}>
          <img src={imageTeam2} />
          <h6 className={styles.teamName}>{team2}</h6>
        </div>
      </div>
      <div className={styles.result}>{result}</div>
      {admin && (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.chosePlayers} onSubmit={handleSubmit}>
              <div className={styles.selects}>
                <div className={styles.select}>
                  <label value="firstPair">1st Match</label>
                  <ChosenPairs
                    selectName="firstPair"
                    players={playersAvailable}
                    match={"firstMatch"}
                  />
                </div>
                <div className={styles.select}>
                  <label value="secondPair">2nd Match</label>
                  <ChosenPairs
                    selectName="secondPair"
                    players={playersAvailable}
                    match={"secondMatch"}
                  />
                </div>
                <div className={styles.select}>
                  <label value="thirdPair">3rd Match</label>
                  <ChosenPairs
                    selectName="thirdPair"
                    players={playersAvailable}
                    match={"thirdMatch"}
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <Fab
                  variant="contained"
                  color="primary"
                  size="small"
                  className={styles.availableButton}
                  type="submit"
                >
                  <CheckCircleOutline />
                </Fab>
                <Fab
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={`${styles.availableButton} ${styles.unavailable}`}
                  onClick={form.reset}
                >
                  <Close />
                </Fab>
              </div>
            </form>
          )}
        />
      )}
      <div className={styles.chosen_pairs}>
        <div className={styles.match}>
          <h4>1st Match</h4>
          {get(playersChosen, ["players", "firstPair-firstPlayer"]) && (
            <span>
              {getPlayerById("firstPair-firstPlayer")} -{" "}
              {getPlayerById("firstPair-secondPlayer")}
            </span>
          )}
        </div>
        <div className={styles.match}>
          <h4>2nd Match</h4>
          {get(playersChosen, ["players", "secondPair-firstPlayer"]) && (
            <span>
              {getPlayerById("secondPair-firstPlayer")} -{" "}
              {getPlayerById("secondPair-secondPlayer")}
            </span>
          )}
        </div>
        <div className={styles.match}>
          <h4>3rd Match</h4>
          {get(playersChosen, ["players", "thirdPair-firstPlayer"]) && (
            <span>
              {getPlayerById("thirdPair-firstPlayer")} -{" "}
              {getPlayerById("thirdPair-secondPlayer")}
            </span>
          )}
        </div>
      </div>
      {!admin && (
        <div className={styles.availability}>
          Are you available?
          <Fab
            variant="contained"
            color="primary"
            size="small"
            className={styles.availableButton}
            onClick={() => {
              handleSetAvailable(matchId);
            }}
            disabled={available}
          >
            <CheckCircleOutline />
          </Fab>
          <Fab
            variant="contained"
            color="secondary"
            size="small"
            className={`${styles.availableButton} ${styles.unavailable}`}
            onClick={() => {
              handleSetUnavailable(matchId);
            }}
            disabled={!available}
          >
            <Close />
          </Fab>
        </div>
      )}

      <div className={styles.location}>
        <Place /> <span>{location}</span>
      </div>
    </div>
  );
};
