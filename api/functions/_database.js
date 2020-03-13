
// para hacer la conexion con un servicio cloud firebase
const admin = require("firebase-admin");
const serviceAccount = require("../guias-e20fc-firebase-adminsdk-5qpnf-7464e3b130.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://guias-e20fc.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules

const database = admin.firestore();

module.exports = database;
// fin 








