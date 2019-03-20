import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import Card from "../../components/Card";
import logic from "../../logic";

const Favorites = () => {
  const { user } = useContext(UserContext);
  const { token } = user;
  const [userFavorites, setUserFavorites] = useState([]);

  const retrieveUserFavs = () => {
    logic.retrieveUser(token).then(user => {
      setUserFavorites(user.favorites);
      window.scrollTo(0, 0);
    });
  };
  useEffect(() => {
    retrieveUserFavs();
  }, []);
  return (
    <div className="load">
      {userFavorites &&
        userFavorites
          .reverse()
          .map(userFavorite => (
            <Card
              key={userFavorite._id}
              title={userFavorite.title}
              image={userFavorite.image}
              description={userFavorite.description}
              comments={userFavorite.comments}
              postId={userFavorite._id}
              userFavorites={userFavorites}
              call={retrieveUserFavs}
              countfavs={userFavorite.countfavs}
              date={userFavorite.date}
            />
          ))}
    </div>
  );
};

export default Favorites;
