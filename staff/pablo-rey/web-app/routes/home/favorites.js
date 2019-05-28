var express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();

router.get('/', urlencodedParser, (req, res) => {
  const {
    session: { logic },
  } = req;

  return logic
    .retrieveUser()
    .then(({ name, favs }) =>
      logic.retrieveFavDucks().then(ducks => {
        ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({
          url: `/home/duck/${id}`,
          id,
          title,
          image,
          price,
          isFav: favs.includes(id),
        }));
        res.render('home', { name, query: '', ducks });
      })
    )
    .catch(({ message }) => res.render('home', { message }));
});

router.post('/', urlencodedParser, (req, res) => {
  const {
    query: { query },
    body,
    session,
    session: { logic },
  } = req;

  session.query = query;

  if (body.toggleFav) {
    const id = body.toggleFav;
    return logic.toggleFavDuck(id).then(() => res.redirect(`/home/favorites`));
  } else res.redirect(req.url);
});

module.exports = router;