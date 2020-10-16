const admin = require('firebase-admin');
const serviceAccount = require('../admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fancytodo-d5871.firebaseio.com",
    authDomain: "fancytodo-d5871.firebaseapp.com",
    });

var db = admin.database();

module.exports = db