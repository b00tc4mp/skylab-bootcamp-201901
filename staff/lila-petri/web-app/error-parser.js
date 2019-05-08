function errorParser(err, req, res, next) {
    
    console.error(err.stack);
    res.status(500).send('Something broke!');
    res.render('error', { error: err });
    next()
}

module.exports = errorParser