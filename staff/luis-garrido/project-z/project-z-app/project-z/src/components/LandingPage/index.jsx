import React, { Fragment } from "react";

import logic from "../../logic";

import TopLanding from "../TopLanding";
import RecommendedReviews from "../RecommendedReviews";

const LandingPage = () => {
    return (
        <Fragment>
            <div className="landing-page">
                <TopLanding />
                {logic.isUserLoggedIn && <RecommendedReviews />}
            </div>
        </Fragment>
    );
};

export default LandingPage;
