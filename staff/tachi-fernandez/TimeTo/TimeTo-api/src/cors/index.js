'use strict'

function cors(req, res, next) {
    res.set('access-control-allow-credentials', true)
   res.set(
     "access-control-allow-headers",
     "Accept, Authorization, Origin, Content-Type, Retry-After"
   );
    res.set('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    res.set("access-control-allow-origin", "*");
    res.set('access-control-max-age', 604800)

   next();
 }

module.exports = cors