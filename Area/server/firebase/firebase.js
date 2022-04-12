const admin = require('firebase-admin');
const serviceAccount = require('./credential.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aera-63506-default-rtdb.europe-west1.firebasedatabase.app"
});
const db = admin.database();
const ref = db.ref("users/");



module.exports = { admin, db, ref};