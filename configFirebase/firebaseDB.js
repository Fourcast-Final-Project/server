const admin = require('firebase-admin');
const serviceAccount = require('../admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fourcast-pizza.firebaseio.com",
    authDomain: "fourcast-pizza.firebaseapp.com",
    });

var db = admin.database();

module.exports = db