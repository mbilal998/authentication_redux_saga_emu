const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.notifyUsercreation = functions.firestore.document("/{users}/{id}")
    .onCreate((snap, context) => {
        console.log(snap);
        const collection = context.params.users;
        const id = context.params.id;
        console.log("I am Here for reason");
        console.log(collection);
        console.log(id);
        return null;
    });
