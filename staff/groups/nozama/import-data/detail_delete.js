// Dirty temp function to remove duplicates in detail

const mongo = require('mongodb').MongoClient;
const {MONGO_URI, MONGO_DBNAME} = require('./config');
mongo.connect(MONGO_URI, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  const db = client.db(MONGO_DBNAME);
  const colDetail = db.collection('adidas_detail');
  colDetail.find().toArray((err, items) => {
    let detailId = items.map(item => item.product_id);
    let duplicated = [];
    detailId.forEach((item, index, array) => {
      if (array.indexOf(item) < index && item != undefined) duplicated.push(item);
    });

    console.log('duplicated', duplicated, duplicated.length);
    let promiseArray = [];
    for (let ii = 0, ll = Math.min(100, duplicated.length); ii < ll; ii++) {
      promiseArray.push(colDetail.findOneAndDelete({ product_id: duplicated[ii] }));
    }
    Promise.all(promiseArray).then(res => {
      console.log(res);
      client.close();
    });
  });
});
