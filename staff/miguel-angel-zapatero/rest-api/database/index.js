const { MongoClient } = require('mongodb')

const state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  return (async ()=> {
    try {
        const client = await MongoClient.connect(url, {useNewUrlParser: true})
        state.db = client.db()
        return done()
    } catch (error) {
        return done(error)
    }
  })()

//   MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
//     if (err) return done(err)
//     state.db = db
//     done()
//   })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}