

var admin = require("firebase-admin");
var topic = "/topics/bill"
var serviceAccount = require("../bilido-firebase-adminsdk-hbatx-198d568356.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilido.firebaseio.com"
});



