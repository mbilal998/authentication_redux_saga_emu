const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.logUserCreation = functions.firestore.document("/{collectionName}/{id}")
    .onCreate(async (snap, context) => {
        const collection = context.params.collectionName;
        const id = context.params.id;
        if (collection === 'users') {
            const info = await admin.firestore().collection('users').doc(id).get();
            const fullname = info._fieldsProto.firstname.stringValue + ' ' + info._fieldsProto.lastname.stringValue
            await admin.firestore().collection("users").doc(id).update({
                fullname: fullname,
            });
            const activities = admin.firestore().collection('logs');
            return activities.add({
                activity: 'User  Created On Signup',
                user_doc_id: id,
            });
        }
    });

exports.logUserUpdate = functions.firestore.document("/{collectionName}/{id}")
    .onUpdate(async (snap, context) => {
        const collection = context.params.collectionName;
        const id = context.params.id;
        if (collection === 'users') {
            const info = await admin.firestore().collection('users').doc(id).get();
            const fullname = info._fieldsProto.firstname.stringValue + ' ' + info._fieldsProto.lastname.stringValue
            await admin.firestore().collection("users").doc(id).update({
                fullname: fullname,
            });
            const activities = admin.firestore().collection('logs');
            return activities.add({
                activity: 'User Updated On Profile Updated',
                user_doc_id: id
            });
        }
    });

exports.getrandmNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
})
