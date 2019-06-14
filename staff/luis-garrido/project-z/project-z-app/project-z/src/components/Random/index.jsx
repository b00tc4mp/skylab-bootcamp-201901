import { useEffect } from "react";
import { withRouter } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

const Random = ({ history }) => {
    useEffect(() => {
        getRandomGame();
    });

    const getRandomGame = async () => {
        const randomGame = await logic.getRandomGame();
        history.push(`/game/${randomGame.id.toString()}`);
    };

    return null;
};

export default withRouter(Random);
