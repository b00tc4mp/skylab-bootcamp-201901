import React, { useEffect, useState } from "react";
import logic from "../../logic";
import styles from "./index.module.scss";

export const Home = props => {
  const [matches, setMatches] = useState("");

  useEffect(() => {
    if (!logic.getStoredtoken()) {
      props.history.push("/login");
    }
    
    logic
    .retrieveMatches()
    .then(matches =>
      setMatches(
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
          }) => ({
              matchId,
              date,
              team1,
              imageTeam1,
              team2,
              imageTeam2,
              result,
              location
            })
          )
        )
      )
      .catch(error => {
        throw Error(error);
      });
  }, []);
  return (
    <section style={styles.container}>
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
                    <input type="checkbox" name="Availability" />
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
