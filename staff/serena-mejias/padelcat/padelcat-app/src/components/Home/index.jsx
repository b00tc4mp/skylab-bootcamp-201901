import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export const Home = props => {
  const [matches, setMatches] = useState("");
  const [availabilityPlayer, setAvailabilityPlayer] = useState("false");

  useEffect(() => {
    if (!logic.getStoredtoken()) {
      props.history.push("/login");
    }
    logic
      .retrieveMatches()
      .then(matches => setMatches(matches))
      .catch(error => {
        throw Error(error);
      });
    //logic.retrieveAvailabilityPlayers(matches.matchId)
  }, []);

  const { onCheck } = props;

  const handlecheckBox = e => {
    e.target.checked();
    onCheck();
  }
  return (
    <section className={styles.container}>
      <NavLink to={"/players"} className={styles.button}>
        <Button color="inherit">Ranking</Button>
      </NavLink>
      <ul>
        {matches &&
          matches.map(
            ({
              matchId,
              date,
              team1,
              imageTeam1,
              team2,
              imageTeam2,
              result,
              location
            }) => (
              <li className={styles.match} key={matchId}>
                <h4>{date}</h4>
                <div className="teams">
                  <div className="team1">
                    <h6>{team1}</h6>
                    <img src={imageTeam1} />
                  </div>
                  <div className="team2">
                    <h6>{team2}</h6>
                    <img src={imageTeam2} />
                  </div>
                  <ul>Available Players</ul>
                  <label>
                    Are you available?
                    <input type="checkbox" name="Availability" checked={availabilityPlayer} onChange={handlecheckBox} />
                  </label>
                  <div
                    id="drop_zone"
                    ondrop="dropHandler(event);"
                    ondragover="dragOverHandler(event);"
                  >
                    <p>Arrastra y suelta uno o más archivos a esta zona ...</p>
                  </div>
                  <span>{result}</span>
                  <span>{location}</span>
                </div>
              </li>
            )
          )}
      </ul>
    </section>
  );
};
