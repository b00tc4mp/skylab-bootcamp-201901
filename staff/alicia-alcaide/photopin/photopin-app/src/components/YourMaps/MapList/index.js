import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/icon_v2_black.png";
import literals from "./literals";
import "./index.css";

function MapList({ lang, maps }) {
  const { create } = literals[lang];
  return (
    <>
      <div className="uk-text-center uk-grid uk-grid-small uk-grid-match uk-flex-first uk-child-width-1-3@m uk-child-width-1-2@s">
        {maps.map(map => {
          return (
            <div key={map.id} className="uk-margin-small-bottom">
              <div className="uk-card uk-card-default uk-card-body">
                <Link className="card-link" to={`/map/${map.id}`}>
                  <h3 className="">{map.title}</h3>
                  <div>
                    <img src={map.coverImage} width="" height="" alt="" />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
        <div className="uk-margin-small-bottom">
          <div className="uk-card uk-card-default uk-card-body">
            <Link className="card-link" to="/mapform">
              <h3 className="uk-width-auto">{create}</h3>
              <div>
                <img src={logo} alt="logo-PhotoPin" width="180" height="180" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapList;
