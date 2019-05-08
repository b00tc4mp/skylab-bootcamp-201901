// 
const unirest = require('unirest');
const mongo = require('mongodb').MongoClient;
const {MONGO_URI, MONGO_DBNAME, RAPIDAPI_APIKEY} = require('./config');


/**
 * Retrieve the details of every product in general product list present in mongodb
 * Runs several times until all details are present. Be careful in maxItemsEveryRun 
 * to prevent request with timeout and fails that will be reduce the amount of free request avaliable
 * 
 * @param {string} collectionGeneral Product list Collection name 
 * @param {string} collectionDetail Product detail collection name
 * @param {number} maxItemsEveryRun Max items to retrieve in every run 
 */
function retrieveDetails (collectionGeneral, collectionDetail, maxItemsEveryRun) {
  mongo.connect(MONGO_URI, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db(MONGO_DBNAME);
    const colProducts = db.collection(collectionGeneral);
    const colDetail = db.collection(collectionDetail);
  
    colProducts.find().toArray((err, items) => {
      let productsId = items.map(item => item.product_id);
      productsId.sort();
      colDetail.find().toArray((err, items) => {
        let detailId = items.map(item => item.product_id);
        let needToRetrieve = productsId.filter(pid => !detailId.includes(pid));
        console.log(needToRetrieve, "Need to retrieve length: ", needToRetrieve.length);
        for (let ii = 0, ll = Math.min(maxItemsEveryRun, needToRetrieve.length); ii < ll; ii++) {
          unirest
            .get(
              'https://apidojo-adidas-v1.p.rapidapi.com/products/detail?lang=en-US&product_id=' +
                needToRetrieve[ii]
            )
            .header('X-RapidAPI-Host', 'apidojo-adidas-v1.p.rapidapi.com')
            .header('X-RapidAPI-Key', RAPIDAPI_APIKEY)
            .end(function(result) {
              colDetail.insertOne(result.body);
            });
        }
      });
    });
  });
}

retrieveDetails('adidas_products','adidas_detail', 6)
