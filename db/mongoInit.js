module.exports = function () {

  const mongodb = require('mongodb');
  const http = require('http');
  const nconf = require('nconf');

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
  nconf.argv().env().file('db/keys.json');

// Connect to a MongoDB server provisioned over at
// MongoLab.  See the README for more info.

  const user = nconf.get('mongoUser');
  const pass = nconf.get('mongoPass');
  const host = nconf.get('mongoHost');
  const port = nconf.get('mongoPort');

  let uri = `mongodb://${user}:${pass}@${host}:${port}`;
  if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
  }
  console.log(uri);

  mongodb.MongoClient.connect(uri, (err, db) => {
      if (err) {
        throw err;
      }
//TODO hier muss dann die db  an die routen übergeben werden. bzw module die es nutzen
      const database = db.db('v-app');
      const collection = database.collection("test");
      collection.insert({"dschmidt": "test", "gestartetam:": new Date()}, (err) => {

        if (err) {
          throw err;
        }

      });
    }
  );
};
