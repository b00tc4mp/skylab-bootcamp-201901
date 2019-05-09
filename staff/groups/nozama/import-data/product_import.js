const unirest = require('unirest');
const mongo = require('mongodb').MongoClient;
const {MONGO_URI, MONGO_DBNAME, RAPIDAPI_APIKEY} = require('./config');

/**
 * Retrieve from rapidAPI adidas api the general product list searching by text (e.g. Shoes)
 * and save to database
 * 
 * @param {string} collectionName Name of the collection in database
 * @param {string} searchText text to search in API (e.g. Shoes) (mandatory)
 * @param {string} searchCategory Category for search in API (e.g. Shoe) (Mandatory)
 * @param {number} page Page number  
 * @param {number} limit Max number of results in this page (Max. 50)
 */
function retrieveProducts (collectionName, searchText, searchCategory, page, limit) {
mongo.connect(MONGO_URI, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  const db = client.db(MONGO_DBNAME);
  const collection = db.collection();


  unirest
    .get(
      `https://apidojo-adidas-v1.p.rapidapi.com/products/list?lang=en-US&sort_option_id=newest-to-oldest&page=${page}&limit=${limit}&query=${searchText}&category=${searchCategory}`
    )
    .header('X-RapidAPI-Host', 'apidojo-adidas-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', RAPIDAPI_APIKEY)
    .end(function(result) {
      let res = result.body;

      collection.insertMany(res._embedded.models, (err, res) => console.log(err, res));
    });
});
}

retrieveProducts('adidas_products', 'Shoe', 'Shoes', 1, 50);
