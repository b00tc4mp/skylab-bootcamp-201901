var express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();

router.get('/:id', (req, res) => {
  const {
    params: { id },
    session: { query, logic },
  } = req;

  return logic.retrieveUser().then(({ name, favs = [] }) =>
    logic
      .retrieveDuck(id)
      .then(({ title, imageUrl: image, description, price }) => ({
        id,
        title,
        image,
        description,
        price,
        isFav: favs.includes(id),
      }))
      .then(duck => res.render('home', { query, name, duck }))
  );
});

router.post('/:id', urlencodedParser, (req, res) => {
  const {
    params: { id },
    body,
    session: { logic },
  } = req;
  if (body.toggleFav) {
    return logic.toggleFavDuck(id).then(() => res.redirect(req.url));
  } else res.redirect(req.url);
});

module.exports = router;
