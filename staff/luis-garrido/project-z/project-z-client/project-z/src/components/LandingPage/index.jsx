import React, { Fragment, useState, useEffect } from "react";

import logic from "../../logic";

import TopLanding from "../TopLanding";

const LandingPage = props => {
    return (
        <Fragment>
            <div className="landing-page">
                <TopLanding />
            </div>
        </Fragment>
    );
};

export default LandingPage;
