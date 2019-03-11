"use strict";

import React, { Fragment } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

const Aside = props => {
    return (
        <Fragment>
            <div className='navbar-tablet__logo'>
                <h2>P</h2>
            </div>
            <div className="navbar-tablet__icons">
                <i className="fas fa-user-ninja" />
            </div>
            <div className="navbar-tablet__icons">
                <i className="fas fa-search" />
            </div>
            <div className="navbar-tablet__icons">
                <i className="fas fa-dungeon" />
            </div>
            <div className="navbar-tablet__icons">
                <i className="fas fa-bookmark" />
            </div>
        </Fragment>
    );
};

export default Aside
